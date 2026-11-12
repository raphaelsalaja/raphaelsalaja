// Injected into the Simulator's SpringBoard with DYLD_INSERT_LIBRARIES.
// Writes every PTSettings and _UISettings default to settings.jsonl, one class
// per line, and every CAAnimation added to a layer to animations.jsonl.
//
// A class that crashes while being read is named in settings-progress.txt, so
// the next launch skips it instead of crashing again.
#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>
#import <objc/message.h>
#import <objc/runtime.h>

static NSString *OUT = @OUT_DIR;
static NSFileHandle *animationLog;
static dispatch_queue_t logQueue;

static NSFileHandle *appending(NSString *name) {
  NSString *path = [OUT stringByAppendingPathComponent:name];
  if (![NSFileManager.defaultManager fileExistsAtPath:path])
    [NSFileManager.defaultManager createFileAtPath:path contents:nil attributes:nil];
  NSFileHandle *handle = [NSFileHandle fileHandleForWritingAtPath:path];
  [handle seekToEndOfFile];
  return handle;
}

// JSON has no NaN or infinity, and the writer throws on them.
static id finite(id value) {
  if ([value isKindOfClass:NSNumber.class]) {
    double d = [value doubleValue];
    return isfinite(d) ? value : [NSString stringWithFormat:@"%g", d];
  }
  if ([value isKindOfClass:NSArray.class]) {
    NSMutableArray *a = [NSMutableArray array];
    for (id v in value) [a addObject:finite(v)];
    return a;
  }
  if ([value isKindOfClass:NSDictionary.class]) {
    NSMutableDictionary *d = [NSMutableDictionary dictionary];
    for (id k in value) d[[k description]] = finite(value[k]);
    return d;
  }
  if ([value isKindOfClass:NSString.class] || value == NSNull.null) return value;
  return [value description];
}

static void writeLine(NSFileHandle *handle, id object) {
  NSData *json = nil;
  @try {
    json = [NSJSONSerialization dataWithJSONObject:finite(object) options:NSJSONWritingSortedKeys error:nil];
  } @catch (__unused NSException *e) {
  }
  if (!json) return;
  [handle writeData:json];
  [handle writeData:[@"\n" dataUsingEncoding:NSUTF8StringEncoding]];
  [handle synchronizeFile];
}

#pragma mark - Settings

static id serialise(id value, int depth);

static NSArray *SKIPPED_KEYS;

static NSDictionary *properties(id obj, Class stop, int depth) {
  NSMutableDictionary *out = [NSMutableDictionary dictionary];
  for (Class c = [obj class]; c && c != stop && c != NSObject.class; c = class_getSuperclass(c)) {
    unsigned count = 0;
    objc_property_t *props = class_copyPropertyList(c, &count);
    for (unsigned i = 0; i < count; i++) {
      NSString *key = @(property_getName(props[i]));
      if (out[key] || [key hasPrefix:@"_"] || [SKIPPED_KEYS containsObject:key]) continue;
      const char *attributes = property_getAttributes(props[i]);
      // Blocks and raw pointers can't be read safely through KVC.
      if (attributes && (strstr(attributes, "T@?") || strstr(attributes, "T^") || strstr(attributes, "T*"))) continue;
      @try {
        out[key] = serialise([obj valueForKey:key], depth + 1) ?: NSNull.null;
      } @catch (NSException *e) {
        out[key] = [NSString stringWithFormat:@"<error %@>", e.name];
      }
    }
    free(props);
  }
  return out;
}

static id serialise(id value, int depth) {
  if (!value) return NSNull.null;
  if ([value isKindOfClass:NSNumber.class] || [value isKindOfClass:NSString.class]) return value;
  if ([value isKindOfClass:NSValue.class]) return [value description];
  if ([value isKindOfClass:CAMediaTimingFunction.class]) {
    float p[4][2];
    for (int i = 0; i < 4; i++) [value getControlPointAtIndex:i values:p[i]];
    return [NSString stringWithFormat:@"cubic-bezier(%.9g, %.9g, %.9g, %.9g)", p[1][0], p[1][1], p[2][0], p[2][1]];
  }
  if ([value isKindOfClass:UIColor.class]) return [value description];
  if (CFGetTypeID((__bridge CFTypeRef)value) == CGColorGetTypeID()) return @"<CGColor>";
  if ([value isKindOfClass:NSArray.class] || [value isKindOfClass:NSSet.class] ||
      [value isKindOfClass:NSOrderedSet.class]) {
    NSMutableArray *a = [NSMutableArray array];
    for (id v in value) [a addObject:serialise(v, depth + 1)];
    return a;
  }
  if ([value isKindOfClass:NSDictionary.class]) {
    NSMutableDictionary *d = [NSMutableDictionary dictionary];
    for (id k in value) d[[k description]] = serialise(value[k], depth + 1);
    return d;
  }
  if (depth > 5) return [value description];
  NSString *image = @(class_getImageName([value class]) ?: "").lastPathComponent;
  if ([@[ @"Foundation", @"CoreFoundation", @"libobjc.A.dylib", @"UIKitCore" ] containsObject:image] &&
      ![NSStringFromClass([value class]) containsString:@"Settings"])
    return [value description];
  NSMutableDictionary *d = [properties(value, nil, depth) mutableCopy];
  d[@"$class"] = NSStringFromClass([value class]);
  return d;
}

static BOOL inherits(Class cls, Class base) {
  for (Class c = class_getSuperclass(cls); c; c = class_getSuperclass(c))
    if (c == base) return YES;
  return NO;
}

static void dumpSettings(void) {
  NSString *progressPath = [OUT stringByAppendingPathComponent:@"settings-progress.txt"];
  NSString *previous = [NSString stringWithContentsOfFile:progressPath encoding:NSUTF8StringEncoding error:nil] ?: @"";
  NSMutableSet *done = [NSMutableSet set];
  NSMutableSet *crashed = [NSMutableSet set];
  for (NSString *line in [previous componentsSeparatedByString:@"\n"]) {
    if ([line hasPrefix:@"start "]) [crashed addObject:[line substringFromIndex:6]];
    if ([line hasPrefix:@"done "]) {
      NSString *name = [line substringFromIndex:5];
      [done addObject:name];
      [crashed removeObject:name];
    }
  }
  if ([previous containsString:@"finished"]) return;

  NSFileHandle *progress = appending(@"settings-progress.txt");
  NSFileHandle *settings = appending(@"settings.jsonl");
  for (NSString *name in crashed) writeLine(settings, @{@"$class" : name, @"$error" : @"crashed while reading"});

  Class pt = NSClassFromString(@"PTSettings");
  Class ui = NSClassFromString(@"_UISettings");
  unsigned count = 0;
  Class *classes = objc_copyClassList(&count);
  for (unsigned i = 0; i < count; i++) {
    Class cls = classes[i];
    if (!((pt && inherits(cls, pt)) || (ui && inherits(cls, ui)))) continue;
    NSString *name = NSStringFromClass(cls);
    if ([done containsObject:name] || [crashed containsObject:name]) continue;
    [progress writeData:[[NSString stringWithFormat:@"start %@\n", name] dataUsingEncoding:NSUTF8StringEncoding]];
    [progress synchronizeFile];
    NSMutableDictionary *entry = [NSMutableDictionary dictionary];
    @try {
      id s = nil;
      if ([cls instancesRespondToSelector:@selector(initWithDefaultValues)])
        s = ((id(*)(id, SEL))objc_msgSend)([cls alloc], @selector(initWithDefaultValues));
      else {
        s = [[cls alloc] init];
        if ([s respondsToSelector:@selector(setDefaultValues)])
          ((void (*)(id, SEL))objc_msgSend)(s, @selector(setDefaultValues));
      }
      [entry addEntriesFromDictionary:properties(s, pt ?: ui, 0)];
    } @catch (NSException *e) {
      entry[@"$error"] = e.reason ?: e.name;
    }
    entry[@"$class"] = name;
    entry[@"$image"] = @(class_getImageName(cls) ?: "?").lastPathComponent;
    writeLine(settings, entry);
    [progress writeData:[[NSString stringWithFormat:@"done %@\n", name] dataUsingEncoding:NSUTF8StringEncoding]];
  }
  free(classes);
  [progress writeData:[@"finished\n" dataUsingEncoding:NSUTF8StringEncoding]];
  [progress synchronizeFile];
  NSLog(@"[sbhook] settings dump finished");
}

#pragma mark - Animation log

static id describeValue(id v) {
  if (!v) return NSNull.null;
  if ([v isKindOfClass:NSNumber.class]) return v;
  if (CFGetTypeID((__bridge CFTypeRef)v) == CGColorGetTypeID()) return @"<CGColor>";
  if ([v isKindOfClass:NSValue.class]) return [v description];
  if ([v isKindOfClass:NSArray.class]) {
    NSMutableArray *a = [NSMutableArray array];
    for (id x in v) [a addObject:describeValue(x)];
    return a;
  }
  NSString *d = [v description];
  return [d substringToIndex:MIN(d.length, 160)];
}

static NSMutableDictionary *describeAnimation(CAAnimation *a) {
  NSMutableDictionary *d = [NSMutableDictionary dictionary];
  d[@"class"] = NSStringFromClass(a.class);
  d[@"duration"] = @(a.duration);
  d[@"beginTime"] = @(a.beginTime);
  d[@"speed"] = @(a.speed);
  if (a.timingFunction) d[@"timing"] = serialise(a.timingFunction, 0);
  if (a.fillMode) d[@"fillMode"] = a.fillMode;
  if ([a isKindOfClass:CAPropertyAnimation.class]) {
    CAPropertyAnimation *p = (id)a;
    d[@"keyPath"] = p.keyPath ?: NSNull.null;
    if (p.additive) d[@"additive"] = @YES;
  }
  if ([a isKindOfClass:CABasicAnimation.class]) {
    CABasicAnimation *b = (id)a;
    d[@"from"] = describeValue(b.fromValue);
    d[@"to"] = describeValue(b.toValue);
    if (b.byValue) d[@"by"] = describeValue(b.byValue);
  }
  if ([a isKindOfClass:CASpringAnimation.class]) {
    CASpringAnimation *s = (id)a;
    d[@"mass"] = @(s.mass);
    d[@"stiffness"] = @(s.stiffness);
    d[@"damping"] = @(s.damping);
    d[@"initialVelocity"] = @(s.initialVelocity);
    d[@"settlingDuration"] = @(s.settlingDuration);
    d[@"perceptualDuration"] = @(s.perceptualDuration);
    d[@"bounce"] = @(s.bounce);
  }
  if ([a isKindOfClass:CAKeyframeAnimation.class]) {
    CAKeyframeAnimation *k = (id)a;
    d[@"values"] = describeValue(k.values);
    if (k.keyTimes) d[@"keyTimes"] = k.keyTimes;
    if (k.calculationMode) d[@"calculationMode"] = k.calculationMode;
  }
  if ([a isKindOfClass:CAAnimationGroup.class]) {
    NSMutableArray *children = [NSMutableArray array];
    for (CAAnimation *c in ((CAAnimationGroup *)a).animations) [children addObject:describeAnimation(c)];
    d[@"animations"] = children;
  }
  return d;
}

static NSString *viewPath(CALayer *layer) {
  NSMutableArray *parts = [NSMutableArray array];
  CALayer *l = layer;
  for (int i = 0; l && i < 5; i++, l = l.superlayer) {
    id delegate = l.delegate;
    NSString *name = delegate ? NSStringFromClass([delegate class]) : NSStringFromClass(l.class);
    if (l.name) name = [name stringByAppendingFormat:@"#%@", l.name];
    [parts addObject:name];
  }
  return [parts componentsJoinedByString:@" < "];
}

static void (*originalAddAnimation)(CALayer *, SEL, CAAnimation *, NSString *);

static void addAnimation(CALayer *self, SEL _cmd, CAAnimation *animation, NSString *key) {
  originalAddAnimation(self, _cmd, animation, key);
  if (!animation) return;
  NSMutableDictionary *entry = describeAnimation(animation);
  entry[@"t"] = @(CACurrentMediaTime());
  entry[@"key"] = key ?: NSNull.null;
  entry[@"layer"] = viewPath(self);
  CGRect b = self.bounds;
  entry[@"bounds"] = [NSString stringWithFormat:@"%gx%g", b.size.width, b.size.height];
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}

#pragma mark - Commands

// Writing "tap <bundle id>" or "home" to command.txt drives SpringBoard the way
// a finger would: -[SBIconView performTap] is the icon's own tap handler.
static void collectIconViews(UIView *view, NSMutableArray *out) {
  if ([NSStringFromClass(view.class) isEqualToString:@"SBIconView"]) [out addObject:view];
  for (UIView *child in view.subviews) collectIconViews(child, out);
}

static NSString *bundleIdentifier(UIView *iconView) {
  @try {
    id icon = [iconView valueForKey:@"icon"];
    if ([icon respondsToSelector:NSSelectorFromString(@"applicationBundleID")])
      return [icon valueForKey:@"applicationBundleID"];
  } @catch (__unused NSException *e) {
  }
  return nil;
}

static void marker(NSString *name, NSDictionary *extra) {
  NSMutableDictionary *entry = [@{@"marker" : name, @"t" : @(CACurrentMediaTime())} mutableCopy];
  if (extra) [entry addEntriesFromDictionary:extra];
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}

#pragma mark - Frame sampling

// Every frame, records where the named views are on screen as drawn, read from
// their presentation layers, since SpringBoard moves them a frame at a time
// rather than with CAAnimations.
static NSArray<NSString *> *sampledClasses;
static CFTimeInterval sampleUntil;
static CADisplayLink *sampleLink;

static void collectViews(UIView *view, NSMutableArray *out) {
  NSString *name = NSStringFromClass(view.class);
  for (NSString *wanted in sampledClasses)
    if ([name isEqualToString:wanted]) [out addObject:view];
  for (UIView *child in view.subviews) collectViews(child, out);
}

static NSArray *allWindows(void) {
  NSMutableArray *windows = [NSMutableArray array];
  for (UIScene *scene in UIApplication.sharedApplication.connectedScenes)
    if ([scene isKindOfClass:UIWindowScene.class]) [windows addObjectsFromArray:((UIWindowScene *)scene).windows];
  return windows;
}

// The app open draws the card through a CAMeshTransform rebuilt every frame from
// one spring per vertex coordinate. Vertices are in the unit square of the
// container layer, so the container's frame is logged alongside.
typedef struct {
  CGPoint from;
  double x, y, z;
} MeshVertex;

static id plain(id value) {
  if (![value isKindOfClass:NSValue.class] || [value isKindOfClass:NSNumber.class]) return value;
  const char *type = [value objCType];
  if (strstr(type, "CGPoint")) {
    CGPoint p = [value CGPointValue];
    return @[ @(p.x), @(p.y) ];
  }
  if (strstr(type, "CGSize")) {
    CGSize s = [value CGSizeValue];
    return @[ @(s.width), @(s.height) ];
  }
  return [value description];
}

static id ivar(id object, const char *name) {
  Ivar v = class_getInstanceVariable([object class], name);
  return v ? object_getIvar(object, v) : nil;
}

static NSDictionary *genieMesh(UIView *view, CALayer *root) {
  UIView *container = ivar(view, "_containerView");
  if (!container) return nil;
  CALayer *layer = container.layer.presentationLayer ?: container.layer;
  CGRect frame = [layer convertRect:layer.bounds toLayer:root];
  NSMutableArray *vertices = [NSMutableArray array];
  id mesh = [layer valueForKey:@"meshTransform"];
  if (mesh) {
    size_t count = ((size_t (*)(id, SEL))objc_msgSend)(mesh, NSSelectorFromString(@"vertexCount"));
    for (size_t i = 0; i < count; i++) {
      MeshVertex v = ((MeshVertex(*)(id, SEL, size_t))objc_msgSend)(mesh, NSSelectorFromString(@"vertexAtIndex:"), i);
      [vertices addObject:@[ @(v.from.x), @(v.from.y), @(v.x), @(v.y) ]];
    }
  }
  NSMutableArray *springs = [NSMutableArray array];
  for (id property in ivar(view, "_animatableProperties")) [springs addObject:[property valueForKey:@"presentationValue"]];
  id bounds = ivar(view, "_boundsProperty");
  return @{
    @"class" : @"genieMesh",
    @"id" : [NSString stringWithFormat:@"%p", view],
    @"frame" : @[ @(frame.origin.x), @(frame.origin.y), @(frame.size.width), @(frame.size.height) ],
    @"vertices" : vertices,
    @"springs" : springs,
    @"bounds" : bounds ? [bounds valueForKey:@"presentationValue"] : NSNull.null,
  };
}

static NSDictionary *genieAttributes(id attributes) {
  NSMutableDictionary *out = [NSMutableDictionary dictionary];
  for (NSString *key in @[
         @"active", @"iconPosition", @"windowPosition", @"initialVelocity", @"windowSize", @"minimizedSize",
         @"minimizedScale", @"containerSize", @"minimumOutsetSize", @"genieScale", @"multiplier", @"rows", @"columns",
         @"vertexCount", @"genieAmount", @"scaleProgress", @"minimizedProgress", @"meshContainerOutset"
       ]) {
    @try {
      out[key] = plain([attributes valueForKey:key]) ?: NSNull.null;
    } @catch (__unused NSException *e) {
    }
  }
  id settings = [attributes valueForKey:@"layoutSettings"];
  if (settings) out[@"layoutSettings"] = @{@"response" : [settings valueForKey:@"response"], @"dampingRatio" : [settings valueForKey:@"dampingRatio"]};
  return out;
}

@interface SBHookSampler : NSObject
@end

@implementation SBHookSampler
+ (void)frame:(CADisplayLink *)link {
  CFTimeInterval now = CACurrentMediaTime();
  if (now > sampleUntil) {
    [link invalidate];
    sampleLink = nil;
    return;
  }
  NSMutableArray *views = [NSMutableArray array];
  for (UIWindow *window in allWindows()) collectViews(window, views);
  NSMutableArray *items = [NSMutableArray array];
  for (UIView *view in views) {
    CALayer *layer = view.layer.presentationLayer ?: view.layer;
    CALayer *root = view.window.layer.presentationLayer ?: view.window.layer;
    CGRect frame = [layer convertRect:layer.bounds toLayer:root];
    CATransform3D t = layer.transform;
    if ([NSStringFromClass(view.class) isEqualToString:@"SBSwitcherGenieEffectView"]) {
      NSDictionary *mesh = genieMesh(view, root);
      if (mesh) [items addObject:mesh];
    }
    [items addObject:@{
      @"class" : NSStringFromClass(view.class),
      @"id" : [NSString stringWithFormat:@"%p", view],
      @"frame" : @[ @(frame.origin.x), @(frame.origin.y), @(frame.size.width), @(frame.size.height) ],
      @"bounds" : @[ @(layer.bounds.size.width), @(layer.bounds.size.height) ],
      @"scale" : @[ @(t.m11), @(t.m22) ],
      @"cornerRadius" : @(layer.cornerRadius),
      @"opacity" : @(layer.opacity),
      @"hidden" : @(view.hidden || layer.hidden),
      @"window" : NSStringFromClass(view.window.class),
    }];
  }
  NSDictionary *entry = @{@"sample" : items, @"t" : @(now), @"target" : @(link.targetTimestamp)};
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}
@end

static void startSampling(double seconds, NSArray *classes) {
  sampledClasses = classes;
  sampleUntil = CACurrentMediaTime() + seconds;
  if (sampleLink) return;
  sampleLink = [CADisplayLink displayLinkWithTarget:SBHookSampler.class selector:@selector(frame:)];
  sampleLink.preferredFrameRateRange = CAFrameRateRangeMake(120, 120, 120);
  [sampleLink addToRunLoop:NSRunLoop.mainRunLoop forMode:NSRunLoopCommonModes];
}

static void tree(UIView *view, int depth, NSMutableString *out) {
  CALayer *layer = view.layer.presentationLayer ?: view.layer;
  CGRect frame = [layer convertRect:layer.bounds toLayer:view.window.layer];
  [out appendFormat:@"%*s%@ %@ r=%g a=%g%@\n", depth * 2, "", NSStringFromClass(view.class),
                    NSStringFromCGRect(frame), layer.cornerRadius, layer.opacity, view.hidden ? @" hidden" : @""];
  if (depth > 40) return;
  for (UIView *child in view.subviews) tree(child, depth + 1, out);
}

#pragma mark - UIKit probes

// Calls UIKit's own scroll physics and spring APIs and records what they return
// or what CASpringAnimation they produce, so the ports can be checked against
// Apple's code rather than a description of it.
static void probe(void) {
  NSMutableDictionary *result = [NSMutableDictionary dictionary];

  UIScrollView *scroll = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 0, 402, 874)];
  scroll.contentSize = CGSizeMake(402, 2000);
  result[@"decelerationRateNormal"] = @(UIScrollViewDecelerationRateNormal);
  result[@"decelerationRateFast"] = @(UIScrollViewDecelerationRateFast);
  result[@"defaultDecelerationRate"] = @(scroll.decelerationRate);
  SEL coefficient = NSSelectorFromString(@"_currentRubberBandCoefficient");
  if ([scroll respondsToSelector:coefficient])
    result[@"rubberBandCoefficient"] = @(((double (*)(id, SEL))objc_msgSend)(scroll, coefficient));
  SEL rubber = NSSelectorFromString(@"_rubberBandOffsetWithoutDecorationForOffset:maxOffset:minOffset:range:outside:");
  if ([scroll respondsToSelector:rubber]) {
    NSMutableArray *rows = [NSMutableArray array];
    for (int r = 0; r < 2; r++) {
      double range = r == 0 ? 402 : 874;
      for (double over = 0; over <= 3000; over += over < 100 ? 5 : 50) {
        BOOL outside = NO;
        double offset = 1126 + over;
        double banded = ((double (*)(id, SEL, double, double, double, double, BOOL *))objc_msgSend)(
            scroll, rubber, offset, 1126, 0, range, &outside);
        [rows addObject:@[ @(range), @(over), @(banded - 1126), @(outside) ]];
      }
    }
    result[@"rubberBand"] = rows;
  }

  UIView *host = allWindows().firstObject;
  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
  view.hidden = YES;
  [host addSubview:view];
  void (^move)(void) = ^{
    view.center = CGPointMake(view.center.x + 100, view.center.y);
  };
  marker(@"probe:animateWithDuration", nil);
  [UIView animateWithDuration:0.5 animations:move];
  marker(@"probe:usingSpringWithDamping 0.5 0.8", nil);
  [UIView animateWithDuration:0.5 delay:0 usingSpringWithDamping:0.8 initialSpringVelocity:0 options:0
                   animations:move completion:nil];
  marker(@"probe:springDuration 0.5 bounce 0", nil);
  [UIView animateWithSpringDuration:0.5 bounce:0 initialSpringVelocity:0 delay:0 options:0 animations:move
                         completion:nil];
  marker(@"probe:springDuration 0.5 bounce 0.3", nil);
  [UIView animateWithSpringDuration:0.5 bounce:0.3 initialSpringVelocity:0 delay:0 options:0 animations:move
                         completion:nil];
  marker(@"probe:UISpringTimingParameters init", nil);
  UIViewPropertyAnimator *animator =
      [[UIViewPropertyAnimator alloc] initWithDuration:0.5 timingParameters:[[UISpringTimingParameters alloc] init]];
  [animator addAnimations:move];
  [animator startAnimation];
  marker(@"probe:UISpringTimingParameters dampingRatio 1", nil);
  animator = [[UIViewPropertyAnimator alloc] initWithDuration:0.5
                                             timingParameters:[[UISpringTimingParameters alloc] initWithDampingRatio:1]];
  [animator addAnimations:move];
  [animator startAnimation];
  marker(@"probe:done", nil);
  [view removeFromSuperview];

  dispatch_async(logQueue, ^{
    writeLine(animationLog, @{@"probe" : result, @"t" : @(CACurrentMediaTime())});
  });
}

#pragma mark - UIKit transitions

// Plain views with a class of their own, so the sampler can pick out each
// screen of a push, sheet or zoom by name.
@interface SBHookScreenA : UIView
@end
@implementation SBHookScreenA
@end
@interface SBHookScreenB : UIView
@end
@implementation SBHookScreenB
@end
@interface SBHookSource : UIView
@end
@implementation SBHookSource
@end

@interface SBHookController : UIViewController
@property(nonatomic) Class viewClass;
@end
@implementation SBHookController
- (void)loadView {
  self.view = [[self.viewClass alloc] initWithFrame:UIScreen.mainScreen.bounds];
  self.view.backgroundColor = self.viewClass == SBHookScreenA.class ? UIColor.systemBlueColor : UIColor.systemOrangeColor;
}
@end

static UIWindow *transitionWindow;

static SBHookController *screen(Class viewClass) {
  SBHookController *controller = [SBHookController new];
  controller.viewClass = viewClass;
  return controller;
}

// Pushes, pops, presents and zooms real view controllers in a window of their
// own, sampling every screen for each step.
static void transitions(void) {
  NSArray *classes = @[
    @"SBHookScreenA", @"SBHookScreenB", @"SBHookSource", @"UIDimmingView", @"_UIParallaxDimmingView",
    @"UIDropShadowView", @"_UISheetDropShadowView"
  ];
  UIWindowScene *scene = ((UIWindow *)allWindows().firstObject).windowScene;
  SBHookController *root = screen(SBHookScreenA.class);
  UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:root];
  nav.navigationBarHidden = YES;
  transitionWindow = [[UIWindow alloc] initWithWindowScene:scene];
  transitionWindow.windowLevel = UIWindowLevelAlert + 100;
  transitionWindow.rootViewController = nav;
  transitionWindow.hidden = NO;
  SBHookSource *source = [[SBHookSource alloc] initWithFrame:CGRectMake(40, 300, 120, 120)];
  source.backgroundColor = UIColor.whiteColor;
  source.layer.cornerRadius = 20;
  [root.view addSubview:source];

  NSArray *steps = @[
    @[ @"push", ^{ [nav pushViewController:screen(SBHookScreenB.class) animated:YES]; } ],
    @[ @"pop", ^{ [nav popViewControllerAnimated:YES]; } ],
    @[ @"sheet", ^{ [root presentViewController:screen(SBHookScreenB.class) animated:YES completion:nil]; } ],
    @[ @"sheet-dismiss", ^{ [root dismissViewControllerAnimated:YES completion:nil]; } ],
    @[ @"zoom", ^{
      SBHookController *detail = screen(SBHookScreenB.class);
      detail.preferredTransition = [UIViewControllerTransition zoomWithOptions:nil
                                                            sourceViewProvider:^UIView *(id context) {
                                                              return source;
                                                            }];
      [nav pushViewController:detail animated:YES];
    } ],
    @[ @"zoom-pop", ^{ [nav popViewControllerAnimated:YES]; } ],
  ];
  for (NSUInteger i = 0; i < steps.count; i++) {
    NSString *name = steps[i][0];
    void (^step)(void) = steps[i][1];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((1 + 2.0 * i) * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      startSampling(1.6, classes);
      marker([@"transition:" stringByAppendingString:name], nil);
      step();
    });
  }
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((2 + 2.0 * steps.count) * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
                   marker(@"transition:done", nil);
                   transitionWindow.hidden = YES;
                   transitionWindow = nil;
                 });
}

// Draws a black layer through a known 3x3 CAMeshTransform, with the middle of
// the left edge pushed out and the middle of the top pulled in, so a screenshot
// shows how Core Animation fills between vertices.
typedef struct {
  unsigned int indices[4];
  float w[4];
} MeshFace;

static UIWindow *meshWindow;

static void meshTest(void) {
  UIWindowScene *scene = nil;
  for (UIScene *s in UIApplication.sharedApplication.connectedScenes)
    if ([s isKindOfClass:UIWindowScene.class]) scene = (UIWindowScene *)s;
  meshWindow = [[UIWindow alloc] initWithWindowScene:scene];
  meshWindow.windowLevel = 100000;
  meshWindow.backgroundColor = UIColor.whiteColor;
  meshWindow.hidden = NO;
  CALayer *layer = [CALayer layer];
  layer.frame = CGRectMake(51, 137, 300, 600);
  layer.backgroundColor = UIColor.blackColor.CGColor;
  [meshWindow.layer addSublayer:layer];
  Class meshClass = NSClassFromString(@"CAMutableMeshTransform");
  id mesh = ((id (*)(id, SEL))objc_msgSend)(meshClass, NSSelectorFromString(@"meshTransform"));
  for (int i = 0; i <= 2; i++)
    for (int j = 0; j <= 2; j++) {
      MeshVertex v = {CGPointMake(j / 2.0, i / 2.0), j / 2.0, i / 2.0, 0};
      if (i == 1 && j == 0) v.x = -0.15;
      if (i == 0 && j == 1) v.y = 0.1;
      ((void (*)(id, SEL, MeshVertex))objc_msgSend)(mesh, NSSelectorFromString(@"addVertex:"), v);
    }
  for (unsigned int i = 0; i < 2; i++)
    for (unsigned int j = 0; j < 2; j++) {
      MeshFace f = {{i * 3 + j, i * 3 + j + 1, (i + 1) * 3 + j + 1, (i + 1) * 3 + j}, {0, 0, 0, 0}};
      ((void (*)(id, SEL, MeshFace))objc_msgSend)(mesh, NSSelectorFromString(@"addFace:"), f);
    }
  [mesh setValue:@"none" forKey:@"depthNormalization"];
  [layer setValue:mesh forKey:@"meshTransform"];
  marker(@"meshtest", @{@"frame" : NSStringFromCGRect(layer.frame)});
}

static void run(NSString *command) {
  if ([command isEqualToString:@"meshtest"]) {
    meshTest();
    return;
  }
  if ([command isEqualToString:@"meshtest off"]) {
    meshWindow.hidden = YES;
    meshWindow = nil;
    return;
  }
  NSArray *parts = [command componentsSeparatedByString:@" "];
  if ([parts.firstObject isEqualToString:@"sample"] && parts.count > 2) {
    startSampling([parts[1] doubleValue], [parts[2] componentsSeparatedByString:@","]);
    marker(@"sample", @{@"classes" : parts[2]});
    return;
  }
  if ([parts.firstObject isEqualToString:@"tree"]) {
    NSMutableString *out = [NSMutableString string];
    for (UIWindow *window in allWindows()) {
      [out appendFormat:@"== %@ level=%g hidden=%d\n", NSStringFromClass(window.class), window.windowLevel, window.hidden];
      tree(window, 1, out);
    }
    [out writeToFile:[OUT stringByAppendingPathComponent:@"tree.txt"] atomically:YES encoding:NSUTF8StringEncoding
               error:nil];
    return;
  }
  if ([parts.firstObject isEqualToString:@"tap"] && parts.count > 1) {
    NSMutableArray *views = [NSMutableArray array];
    for (UIScene *scene in UIApplication.sharedApplication.connectedScenes)
      if ([scene isKindOfClass:UIWindowScene.class])
        for (UIWindow *window in ((UIWindowScene *)scene).windows) collectIconViews(window, views);
    for (UIView *view in views) {
      if (![bundleIdentifier(view) isEqualToString:parts[1]] || !view.window) continue;
      CGRect frame = [view convertRect:view.bounds toView:nil];
      marker(@"tap", @{@"bundle" : parts[1], @"iconFrame" : NSStringFromCGRect(frame)});
      ((void (*)(id, SEL))objc_msgSend)(view, NSSelectorFromString(@"performTap"));
      return;
    }
    marker(@"tap-missing", @{@"bundle" : parts[1], @"count" : @(views.count)});
  } else if ([parts.firstObject isEqualToString:@"home"]) {
    SEL press = NSSelectorFromString(@"_simulateHomeButtonPressWithCompletion:");
    id app = UIApplication.sharedApplication;
    if (![app respondsToSelector:press]) {
      marker(@"home-missing", nil);
      return;
    }
    marker(@"home", nil);
    ((void (*)(id, SEL, id))objc_msgSend)(app, press, nil);
  } else if ([parts.firstObject isEqualToString:@"probe"]) {
    probe();
  } else if ([parts.firstObject isEqualToString:@"transitions"]) {
    transitions();
  }
}

static void watchCommands(void) {
  NSString *path = [OUT stringByAppendingPathComponent:@"command.txt"];
  dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
  dispatch_source_set_timer(timer, DISPATCH_TIME_NOW, 100 * NSEC_PER_MSEC, 10 * NSEC_PER_MSEC);
  dispatch_source_set_event_handler(timer, ^{
    NSString *command = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
    if (!command.length) return;
    [NSFileManager.defaultManager removeItemAtPath:path error:nil];
    for (NSString *line in [command componentsSeparatedByString:@"\n"]) {
      NSString *trimmed = [line stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
      if (trimmed.length) run(trimmed);
    }
  });
  dispatch_resume(timer);
  static dispatch_source_t retained;
  retained = timer;
}

#pragma mark - Genie effect

// The app open draws through SBSwitcherGenieEffectView. Logging what it's given
// each frame, and who asked once per run, ties the samples to the code.
static void (*originalSetRadius)(id, SEL, double);
static void (*originalLayoutGenie)(id, SEL, id);
static BOOL loggedGenieStack;

static void setRadius(id self, SEL _cmd, double radius) {
  originalSetRadius(self, _cmd, radius);
  NSDictionary *entry = @{@"genieRadius" : @(radius), @"t" : @(CACurrentMediaTime())};
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}

static void layoutGenie(id self, SEL _cmd, id attributes) {
  originalLayoutGenie(self, _cmd, attributes);
  NSMutableDictionary *entry = [@{@"genie" : [attributes description] ?: @"", @"t" : @(CACurrentMediaTime())} mutableCopy];
  if (!loggedGenieStack) {
    loggedGenieStack = YES;
    entry[@"stack"] = [NSThread.callStackSymbols subarrayWithRange:NSMakeRange(0, MIN(40, NSThread.callStackSymbols.count))];
  }
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}

static void (*originalPerformGenie)(id, SEL, id, long long, id);

static NSArray *springValues(id view) {
  NSMutableArray *values = [NSMutableArray array];
  for (id property in ivar(view, "_animatableProperties")) [values addObject:[property valueForKey:@"value"]];
  return values;
}

static BOOL insideGenie;

static void performGenie(id self, SEL _cmd, id attributes, long long mode, id completion) {
  NSArray *before = springValues(self);
  insideGenie = YES;
  originalPerformGenie(self, _cmd, attributes, mode, completion);
  insideGenie = NO;
  NSDictionary *entry = @{
    @"performGenie" : genieAttributes(attributes),
    @"mode" : @(mode),
    @"frame" : NSStringFromCGRect([self convertRect:[self bounds] toView:nil]),
    @"before" : before,
    @"after" : springValues(self),
    @"t" : @(CACurrentMediaTime())
  };
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}

// Each vertex coordinate gets its own spring through this call, so logging its
// settings gives the per-vertex responses straight from SpringBoard.
static void (*originalAnimateWithSettings)(id, SEL, id, long long, id, id);

static void animateWithSettings(id self, SEL _cmd, id settings, long long mode, id animations, id completion) {
  if (insideGenie) {
    NSDictionary *entry = @{
      @"genieSpring" : @{
        @"response" : [settings valueForKey:@"response"],
        @"dampingRatio" : [settings valueForKey:@"dampingRatio"],
        @"retargetImpulse" : [settings valueForKey:@"retargetImpulse"],
      },
      @"mode" : @(mode),
      @"t" : @(CACurrentMediaTime())
    };
    dispatch_async(logQueue, ^{
      writeLine(animationLog, entry);
    });
  }
  originalAnimateWithSettings(self, _cmd, settings, mode, animations, completion);
}

static void hookGenie(void) {
  Class view = NSClassFromString(@"SBSwitcherGenieEffectView");
  if (!view) return;
  Method perform = class_getInstanceMethod(view, NSSelectorFromString(@"_performGenieWithAttributes:mode:completion:"));
  if (perform) originalPerformGenie = (void *)method_setImplementation(perform, (IMP)performGenie);
  Method animate = class_getClassMethod(UIView.class, NSSelectorFromString(@"sb_animateWithSettings:mode:animations:completion:"));
  if (animate) originalAnimateWithSettings = (void *)method_setImplementation(animate, (IMP)animateWithSettings);
  Method radius = class_getInstanceMethod(view, NSSelectorFromString(@"_setContinuousCornerRadius:"));
  if (radius) originalSetRadius = (void *)method_setImplementation(radius, (IMP)setRadius);
  Method layout = class_getInstanceMethod(view, NSSelectorFromString(@"_layoutContentAndContainerViewWithAttributes:"));
  if (layout) originalLayoutGenie = (void *)method_setImplementation(layout, (IMP)layoutGenie);
}

__attribute__((constructor)) static void sbhookInit(void) {
  if (![NSBundle.mainBundle.bundleIdentifier isEqualToString:@"com.apple.springboard"]) return;
  SKIPPED_KEYS = @[
    @"hash", @"superclass", @"description", @"debugDescription", @"parent", @"parentSettings", @"observers",
    @"keyObservers", @"archiveDictionary", @"rootSettings", @"settingsControllerModule"
  ];
  logQueue = dispatch_queue_create("sbhook.log", DISPATCH_QUEUE_SERIAL);
  animationLog = appending(@"animations.jsonl");
  writeLine(animationLog, @{@"marker" : @"springboard-launch", @"t" : @(CACurrentMediaTime())});

  Method m = class_getInstanceMethod(CALayer.class, @selector(addAnimation:forKey:));
  originalAddAnimation = (void *)method_setImplementation(m, (IMP)addAnimation);

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 10 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
    dumpSettings();
    hookGenie();
    watchCommands();
  });
  NSLog(@"[sbhook] loaded, writing to %@", OUT);
}
