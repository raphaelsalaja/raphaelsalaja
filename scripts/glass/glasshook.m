// Injected into Harness.swift's app with SIMCTL_CHILD_DYLD_INSERT_LIBRARIES.
// Built from the pieces of ../apple/ios/sbhook.m that apply to an app: every
// CAAnimation added to a layer goes to animations.jsonl, and commands written
// to command.txt open the popover and sample it.
//
// SwiftUI's glass has no UIView class of its own, so the sampler walks every
// layer in the app's windows each frame instead of picking views by name.
#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>
#import <objc/message.h>
#import <objc/runtime.h>

static NSString *OUT = @OUT_DIR;
static NSFileHandle *animationLog;
static NSFileHandle *sampleLog;
static dispatch_queue_t logQueue;

static NSFileHandle *appending(NSString *name) {
  NSString *path = [OUT stringByAppendingPathComponent:name];
  if (![NSFileManager.defaultManager fileExistsAtPath:path])
    [NSFileManager.defaultManager createFileAtPath:path contents:nil attributes:nil];
  NSFileHandle *handle = [NSFileHandle fileHandleForWritingAtPath:path];
  [handle seekToEndOfFile];
  return handle;
}

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
}

static void marker(NSString *name, NSDictionary *extra) {
  NSMutableDictionary *entry = [@{@"marker" : name, @"t" : @(CACurrentMediaTime())} mutableCopy];
  if (extra) [entry addEntriesFromDictionary:extra];
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
    writeLine(sampleLog, entry);
  });
}

static NSArray *allWindows(void) {
  NSMutableArray *windows = [NSMutableArray array];
  for (UIScene *scene in UIApplication.sharedApplication.connectedScenes)
    if ([scene isKindOfClass:UIWindowScene.class]) [windows addObjectsFromArray:((UIWindowScene *)scene).windows];
  return windows;
}

#pragma mark - Values

static id describeValue(id v) {
  if (!v) return NSNull.null;
  if ([v isKindOfClass:NSNumber.class] || [v isKindOfClass:NSString.class]) return v;
  if (CFGetTypeID((__bridge CFTypeRef)v) == CGColorGetTypeID()) {
    CGColorRef c = (__bridge CGColorRef)v;
    const CGFloat *p = CGColorGetComponents(c);
    NSMutableArray *a = [NSMutableArray array];
    for (size_t i = 0; i < CGColorGetNumberOfComponents(c); i++) [a addObject:@(p[i])];
    return a;
  }
  if ([v isKindOfClass:NSValue.class]) {
    const char *type = [v objCType];
    if (strstr(type, "CGPoint")) {
      CGPoint p = [v CGPointValue];
      return @[ @(p.x), @(p.y) ];
    }
    if (strstr(type, "CGSize")) {
      CGSize s = [v CGSizeValue];
      return @[ @(s.width), @(s.height) ];
    }
    if (strstr(type, "CGRect")) {
      CGRect r = [v CGRectValue];
      return @[ @(r.origin.x), @(r.origin.y), @(r.size.width), @(r.size.height) ];
    }
    if (strstr(type, "CATransform3D")) {
      CATransform3D t = [v CATransform3DValue];
      return @[ @(t.m11), @(t.m12), @(t.m21), @(t.m22), @(t.m41), @(t.m42) ];
    }
    return [v description];
  }
  if ([v isKindOfClass:NSArray.class]) {
    NSMutableArray *a = [NSMutableArray array];
    for (id x in v) [a addObject:describeValue(x)];
    return a;
  }
  if ([v isKindOfClass:CAMediaTimingFunction.class]) {
    float p[4][2];
    for (int i = 0; i < 4; i++) [v getControlPointAtIndex:i values:p[i]];
    return [NSString stringWithFormat:@"cubic-bezier(%.9g, %.9g, %.9g, %.9g)", p[1][0], p[1][1], p[2][0], p[2][1]];
  }
  NSString *d = [v description];
  return [d substringToIndex:MIN(d.length, 200)];
}

// CAFilter is private, and its inputs are only reachable through KVC.
static NSArray *FILTER_KEYS;

static id describeFilters(NSArray *filters) {
  if (!filters.count) return nil;
  NSMutableArray *out = [NSMutableArray array];
  for (id f in filters) {
    NSMutableDictionary *d = [NSMutableDictionary dictionary];
    @try {
      d[@"name"] = [f valueForKey:@"name"] ?: NSNull.null;
      d[@"type"] = [f valueForKey:@"type"] ?: NSNull.null;
    } @catch (__unused NSException *e) {
      d[@"description"] = [f description];
    }
    for (NSString *key in FILTER_KEYS) {
      @try {
        id value = [f valueForKey:key];
        if (value) d[key] = describeValue(value);
      } @catch (__unused NSException *e) {
      }
    }
    [out addObject:d];
  }
  return out;
}

// The glass shapes are signed distance fields drawn by CASDFLayer and
// CASDFElementLayer, private classes whose shape lives in their own properties
// rather than in cornerRadius. Every property they declare is read each frame.
static NSMutableDictionary<NSString *, NSArray *> *propertyCache;

static NSArray *declaredProperties(Class cls) {
  NSString *key = NSStringFromClass(cls);
  if (propertyCache[key]) return propertyCache[key];
  NSMutableArray *names = [NSMutableArray array];
  for (Class c = cls; c && c != CALayer.class && c != NSObject.class; c = class_getSuperclass(c)) {
    unsigned count = 0;
    objc_property_t *props = class_copyPropertyList(c, &count);
    for (unsigned i = 0; i < count; i++) {
      const char *attributes = property_getAttributes(props[i]);
      if (attributes && (strstr(attributes, "T@?") || strstr(attributes, "T^") || strstr(attributes, "T*"))) continue;
      NSString *name = @(property_getName(props[i]));
      if ([@[ @"hash", @"superclass", @"description", @"debugDescription" ] containsObject:name]) continue;
      [names addObject:name];
    }
    free(props);
  }
  propertyCache[key] = names;
  return names;
}

static NSDictionary *layerProperties(CALayer *layer) {
  NSMutableDictionary *out = [NSMutableDictionary dictionary];
  for (NSString *name in declaredProperties(layer.class)) {
    @try {
      id value = [layer valueForKey:name];
      out[name] = describeValue(value);
    } @catch (__unused NSException *e) {
    }
  }
  return out;
}

#pragma mark - Animation log

static NSMutableDictionary *describeAnimation(CAAnimation *a) {
  NSMutableDictionary *d = [NSMutableDictionary dictionary];
  d[@"class"] = NSStringFromClass(a.class);
  d[@"duration"] = @(a.duration);
  d[@"beginTime"] = @(a.beginTime);
  d[@"speed"] = @(a.speed);
  if (a.timingFunction) d[@"timing"] = describeValue(a.timingFunction);
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
  }
  if ([a isKindOfClass:CAKeyframeAnimation.class]) {
    CAKeyframeAnimation *k = (id)a;
    d[@"values"] = describeValue(k.values);
    if (k.keyTimes) d[@"keyTimes"] = k.keyTimes;
  }
  if ([a isKindOfClass:CAAnimationGroup.class]) {
    NSMutableArray *children = [NSMutableArray array];
    for (CAAnimation *c in ((CAAnimationGroup *)a).animations) [children addObject:describeAnimation(c)];
    d[@"animations"] = children;
  }
  return d;
}

static NSString *layerName(CALayer *l) {
  id delegate = l.delegate;
  NSString *name = delegate ? NSStringFromClass([delegate class]) : NSStringFromClass(l.class);
  if (delegate) name = [name stringByAppendingFormat:@"/%@", NSStringFromClass(l.class)];
  if (l.name) name = [name stringByAppendingFormat:@"#%@", l.name];
  return name;
}

static NSString *layerPath(CALayer *layer) {
  NSMutableArray *parts = [NSMutableArray array];
  CALayer *l = layer;
  for (int i = 0; l && i < 6; i++, l = l.superlayer) [parts addObject:layerName(l)];
  return [parts componentsJoinedByString:@" < "];
}

static BOOL logging = NO;
static void (*originalAddAnimation)(CALayer *, SEL, CAAnimation *, NSString *);

static void addAnimation(CALayer *self, SEL _cmd, CAAnimation *animation, NSString *key) {
  originalAddAnimation(self, _cmd, animation, key);
  if (!animation || !logging) return;
  NSMutableDictionary *entry = describeAnimation(animation);
  entry[@"t"] = @(CACurrentMediaTime());
  entry[@"key"] = key ?: NSNull.null;
  entry[@"layer"] = layerPath(self);
  entry[@"id"] = [NSString stringWithFormat:@"%p", self];
  CGRect b = self.bounds;
  entry[@"bounds"] = @[ @(b.size.width), @(b.size.height) ];
  dispatch_async(logQueue, ^{
    writeLine(animationLog, entry);
  });
}

#pragma mark - Frame sampling

static CFTimeInterval sampleUntil;
static CADisplayLink *sampleLink;

// One record per visible layer, read from the presentation tree, in window
// points.
static void walk(CALayer *model, CALayer *root, NSString *window, int depth, NSMutableArray *out) {
  CALayer *layer = model.presentationLayer ?: model;
  if (layer.hidden || depth > 80) return;
  CGRect frame = [layer convertRect:layer.bounds toLayer:root];
  NSMutableDictionary *d = [@{
    @"id" : [NSString stringWithFormat:@"%p", model],
    @"name" : layerName(model),
    @"depth" : @(depth),
    @"window" : window,
    @"frame" : @[ @(frame.origin.x), @(frame.origin.y), @(frame.size.width), @(frame.size.height) ],
    @"bounds" : @[ @(layer.bounds.size.width), @(layer.bounds.size.height) ],
    @"opacity" : @(layer.opacity),
  } mutableCopy];
  if (layer.cornerRadius) d[@"cornerRadius"] = @(layer.cornerRadius);
  if (layer.cornerCurve && ![layer.cornerCurve isEqualToString:kCACornerCurveCircular]) d[@"cornerCurve"] = layer.cornerCurve;
  CATransform3D t = layer.transform;
  if (!CATransform3DIsIdentity(t)) d[@"transform"] = describeValue([NSValue valueWithCATransform3D:t]);
  if (layer.masksToBounds) d[@"masks"] = @YES;
  if (layer.shadowOpacity) {
    d[@"shadow"] = @{
      @"opacity" : @(layer.shadowOpacity),
      @"radius" : @(layer.shadowRadius),
      @"offset" : @[ @(layer.shadowOffset.width), @(layer.shadowOffset.height) ],
      @"color" : describeValue((__bridge id)layer.shadowColor),
    };
  }
  if (layer.backgroundColor) d[@"background"] = describeValue((__bridge id)layer.backgroundColor);
  id filters = describeFilters(layer.filters);
  if (filters) d[@"filters"] = filters;
  id backgroundFilters = describeFilters(layer.backgroundFilters);
  if (backgroundFilters) d[@"backgroundFilters"] = backgroundFilters;
  if (layer.compositingFilter) d[@"compositingFilter"] = describeValue(layer.compositingFilter);
  if (layer.mask) d[@"mask"] = layerName(layer.mask);
  if ([NSStringFromClass(layer.class) containsString:@"SDF"] || [NSStringFromClass(layer.class) containsString:@"Portal"])
    d[@"props"] = layerProperties(layer);
  [out addObject:d];
  for (CALayer *child in model.sublayers) walk(child, root, window, depth + 1, out);
}

@interface GlassHookSampler : NSObject
@end

@implementation GlassHookSampler
+ (void)frame:(CADisplayLink *)link {
  CFTimeInterval now = CACurrentMediaTime();
  if (now > sampleUntil) {
    [link invalidate];
    sampleLink = nil;
    logging = NO;
    marker(@"sample-end", nil);
    return;
  }
  NSMutableArray *layers = [NSMutableArray array];
  for (UIWindow *window in allWindows()) {
    if (window.hidden) continue;
    walk(window.layer, window.layer, NSStringFromClass(window.class), 0, layers);
  }
  NSDictionary *entry = @{@"layers" : layers, @"t" : @(now), @"target" : @(link.targetTimestamp)};
  dispatch_async(logQueue, ^{
    writeLine(sampleLog, entry);
  });
}
@end

static void startSampling(double seconds) {
  sampleUntil = CACurrentMediaTime() + seconds;
  logging = YES;
  if (sampleLink) return;
  sampleLink = [CADisplayLink displayLinkWithTarget:GlassHookSampler.class selector:@selector(frame:)];
  sampleLink.preferredFrameRateRange = CAFrameRateRangeMake(120, 120, 120);
  [sampleLink addToRunLoop:NSRunLoop.mainRunLoop forMode:NSRunLoopCommonModes];
}

#pragma mark - Settings

// The morph reads its springs and lens from PTSettings subclasses in
// AnimationKit and UIKitCore. Each one is built with its defaults and written
// to settings.jsonl, nested settings included.
static id serialise(id value, int depth);

static NSDictionary *settingsProperties(id obj, int depth) {
  NSMutableDictionary *out = [NSMutableDictionary dictionary];
  Class stop = NSClassFromString(@"PTSettings");
  for (Class c = [obj class]; c && c != stop && c != NSObject.class; c = class_getSuperclass(c)) {
    unsigned count = 0;
    objc_property_t *props = class_copyPropertyList(c, &count);
    for (unsigned i = 0; i < count; i++) {
      NSString *key = @(property_getName(props[i]));
      if (out[key] || [key hasPrefix:@"_"] ||
          [@[ @"hash", @"superclass", @"description", @"debugDescription", @"parent", @"parentSettings", @"observers",
              @"keyObservers", @"archiveDictionary", @"rootSettings", @"settingsControllerModule" ] containsObject:key])
        continue;
      const char *attributes = property_getAttributes(props[i]);
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
  if ([value isKindOfClass:NSValue.class] || [value isKindOfClass:CAMediaTimingFunction.class]) return describeValue(value);
  if ([value isKindOfClass:NSArray.class]) {
    NSMutableArray *a = [NSMutableArray array];
    for (id v in value) [a addObject:serialise(v, depth + 1)];
    return a;
  }
  if (depth > 5) return [value description];
  NSString *className = NSStringFromClass([value class]);
  if (![className containsString:@"Settings"] && ![className containsString:@"Spec"]) return [value description];
  NSMutableDictionary *d = [settingsProperties(value, depth) mutableCopy];
  d[@"$class"] = NSStringFromClass([value class]);
  return d;
}

static BOOL inherits(Class cls, Class base) {
  for (Class c = class_getSuperclass(cls); c; c = class_getSuperclass(c))
    if (c == base) return YES;
  return NO;
}

static void dumpSettings(NSString *filter) {
  NSFileHandle *settings = appending(@"settings.jsonl");
  Class pt = NSClassFromString(@"PTSettings");
  unsigned count = 0;
  Class *classes = objc_copyClassList(&count);
  for (unsigned i = 0; i < count; i++) {
    Class cls = classes[i];
    if (!pt || !inherits(cls, pt)) continue;
    NSString *name = NSStringFromClass(cls);
    NSString *image = @(class_getImageName(cls) ?: "?").lastPathComponent;
    if (![name.lowercaseString containsString:filter.lowercaseString] &&
        ![image.lowercaseString containsString:filter.lowercaseString])
      continue;
    NSMutableDictionary *entry = [NSMutableDictionary dictionary];
    @try {
      id s = nil;
      if ([cls instancesRespondToSelector:@selector(initWithDefaultValues)])
        s = ((id(*)(id, SEL))objc_msgSend)([cls alloc], @selector(initWithDefaultValues));
      else
        s = [[cls alloc] init];
      [entry addEntriesFromDictionary:settingsProperties(s, 0)];
    } @catch (NSException *e) {
      entry[@"$error"] = e.reason ?: e.name;
    }
    entry[@"$class"] = name;
    entry[@"$image"] = image;
    writeLine(settings, entry);
  }
  free(classes);
  marker(@"settings", @{@"filter" : filter});
}

#pragma mark - Commands

static void tree(CALayer *model, int depth, NSMutableString *out) {
  CALayer *layer = model.presentationLayer ?: model;
  CGRect frame = [layer convertRect:layer.bounds toLayer:nil];
  [out appendFormat:@"%*s%@ %@ r=%g a=%g%@%@%@\n", depth * 2, "", layerName(model), NSStringFromCGRect(frame),
                    layer.cornerRadius, layer.opacity, layer.hidden ? @" hidden" : @"",
                    layer.filters.count ? [@" filters=" stringByAppendingString:[describeFilters(layer.filters) description]] : @"",
                    layer.backgroundFilters.count
                        ? [@" backgroundFilters=" stringByAppendingString:[describeFilters(layer.backgroundFilters) description]]
                        : @""];
  if (depth > 80) return;
  for (CALayer *child in model.sublayers) tree(child, depth + 1, out);
}

static void collect(UIView *view, NSMutableArray *out) {
  if ([view.accessibilityIdentifier isEqualToString:@"glass.source"]) [out addObject:view];
  for (UIView *child in view.subviews) collect(child, out);
}

// A native Menu opens through its UIContextMenuInteraction rather than a binding.
static BOOL openMenu(void) {
  for (UIWindow *window in allWindows()) {
    NSMutableArray *stack = [NSMutableArray arrayWithObject:window];
    while (stack.count) {
      UIView *view = stack.lastObject;
      [stack removeLastObject];
      [stack addObjectsFromArray:view.subviews];
      for (id interaction in view.interactions) {
        if (![interaction isKindOfClass:UIContextMenuInteraction.class]) continue;
        CGPoint centre = CGPointMake(CGRectGetMidX(view.bounds), CGRectGetMidY(view.bounds));
        SEL present = NSSelectorFromString(@"_presentMenuAtLocation:");
        if ([interaction respondsToSelector:present]) {
          marker(@"menu-interaction", @{@"view" : NSStringFromClass(view.class),
                                        @"frame" : NSStringFromCGRect([view convertRect:view.bounds toView:nil])});
          ((void (*)(id, SEL, CGPoint))objc_msgSend)(interaction, present, centre);
          return YES;
        }
      }
    }
  }
  return NO;
}

static void dismissMenu(void) {
  for (UIWindow *window in allWindows()) {
    NSMutableArray *stack = [NSMutableArray arrayWithObject:window];
    while (stack.count) {
      UIView *view = stack.lastObject;
      [stack removeLastObject];
      [stack addObjectsFromArray:view.subviews];
      for (id interaction in view.interactions)
        if ([interaction isKindOfClass:UIContextMenuInteraction.class]) [interaction dismissMenu];
    }
  }
}

static void run(NSString *command) {
  NSArray *parts = [command componentsSeparatedByString:@" "];
  NSString *verb = parts.firstObject;
  double seconds = parts.count > 1 ? [parts[1] doubleValue] : 1.2;
  if ([verb isEqualToString:@"toggle"]) {
    NSMutableArray *sources = [NSMutableArray array];
    for (UIWindow *window in allWindows()) collect(window, sources);
    UIView *source = sources.firstObject;
    startSampling(seconds);
    marker(@"toggle", @{@"source" : source ? NSStringFromCGRect([source convertRect:source.bounds toView:nil]) : NSNull.null});
    [NSNotificationCenter.defaultCenter postNotificationName:@"glass.toggle" object:nil];
  } else if ([verb isEqualToString:@"menu"]) {
    startSampling(seconds);
    marker(@"menu", nil);
    if (!openMenu()) marker(@"menu-missing", nil);
  } else if ([verb isEqualToString:@"menu-close"]) {
    startSampling(seconds);
    marker(@"menu-close", nil);
    dismissMenu();
  } else if ([verb isEqualToString:@"sample"]) {
    startSampling(seconds);
    marker(@"sample", nil);
  } else if ([verb isEqualToString:@"props"] && parts.count > 1) {
    // Every property a matching view's own classes declare, below UIView.
    NSMutableArray *found = [NSMutableArray array];
    for (UIWindow *window in allWindows()) {
      NSMutableArray *stack = [NSMutableArray arrayWithObject:window];
      while (stack.count) {
        UIView *view = stack.lastObject;
        [stack removeLastObject];
        [stack addObjectsFromArray:view.subviews];
        if (![NSStringFromClass(view.class) containsString:parts[1]]) continue;
        NSMutableDictionary *d = [NSMutableDictionary dictionary];
        for (Class c = view.class; c && c != UIView.class; c = class_getSuperclass(c)) {
          unsigned count = 0;
          objc_property_t *props = class_copyPropertyList(c, &count);
          for (unsigned i = 0; i < count; i++) {
            const char *attributes = property_getAttributes(props[i]);
            if (attributes && (strstr(attributes, "T@?") || strstr(attributes, "T^") || strstr(attributes, "T*"))) continue;
            NSString *name = @(property_getName(props[i]));
            @try {
              d[name] = describeValue([view valueForKey:name]);
            } @catch (__unused NSException *e) {
            }
          }
          free(props);
          unsigned ivars = 0;
          Ivar *list = class_copyIvarList(c, &ivars);
          for (unsigned i = 0; i < ivars; i++) {
            const char *type = ivar_getTypeEncoding(list[i]);
            NSString *name = [@"ivar:" stringByAppendingString:@(ivar_getName(list[i]))];
            if (type && (type[0] == 'd' || type[0] == 'f')) {
              ptrdiff_t offset = ivar_getOffset(list[i]);
              d[name] = type[0] == 'd' ? @(*(double *)((__bridge void *)view + offset))
                                       : @(*(float *)((__bridge void *)view + offset));
            } else if (type && type[0] == '@') {
              id value = object_getIvar(view, list[i]);
              if (value) d[name] = describeValue(value);
            }
          }
          free(list);
        }
        d[@"$class"] = NSStringFromClass(view.class);
        d[@"$frame"] = NSStringFromCGRect([view convertRect:view.bounds toView:nil]);
        [found addObject:d];
      }
    }
    NSFileHandle *handle = appending(@"props.jsonl");
    for (id d in found) writeLine(handle, d);
  } else if ([verb isEqualToString:@"settings"]) {
    dumpSettings(parts.count > 1 ? parts[1] : @"Morph");
  } else if ([verb isEqualToString:@"tree"]) {
    NSMutableString *out = [NSMutableString string];
    for (UIWindow *window in allWindows()) {
      [out appendFormat:@"== %@ level=%g hidden=%d\n", NSStringFromClass(window.class), window.windowLevel, window.hidden];
      tree(window.layer, 1, out);
    }
    NSString *name = parts.count > 1 ? [NSString stringWithFormat:@"tree-%@.txt", parts[1]] : @"tree.txt";
    [out writeToFile:[OUT stringByAppendingPathComponent:name] atomically:YES encoding:NSUTF8StringEncoding error:nil];
  }
}

static void watchCommands(void) {
  NSString *path = [OUT stringByAppendingPathComponent:@"command.txt"];
  dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
  dispatch_source_set_timer(timer, DISPATCH_TIME_NOW, 50 * NSEC_PER_MSEC, 5 * NSEC_PER_MSEC);
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

__attribute__((constructor)) static void glasshookInit(void) {
  if (![NSBundle.mainBundle.bundleIdentifier isEqualToString:@"com.raphaelsalaja.glass"]) return;
  FILTER_KEYS = @[
    @"inputRadius", @"inputAmount", @"inputScale", @"inputBias", @"inputColorMatrix", @"inputNormalizeEdges",
    @"inputHardEdges", @"inputQuality", @"inputIntermediateBitDepth", @"inputColor", @"inputValues", @"inputOffset",
    @"inputAngle", @"inputHeight", @"inputCurvature", @"inputRefraction", @"inputDispersion", @"inputThickness",
    @"inputEdgeWidth", @"inputLightAngle", @"inputLightIntensity", @"inputMaskImage", @"inputCornerRadius",
    @"inputShape", @"inputBlurRadius", @"inputSaturation", @"inputBrightness", @"inputSpecular"
  ];
  propertyCache = [NSMutableDictionary dictionary];
  logQueue = dispatch_queue_create("glasshook.log", DISPATCH_QUEUE_SERIAL);
  animationLog = appending(@"animations.jsonl");
  sampleLog = appending(@"samples.jsonl");
  marker(@"launch", @{@"variant" : NSProcessInfo.processInfo.environment[@"GLASS_VARIANT"] ?: @"after"});
  Method m = class_getInstanceMethod(CALayer.class, @selector(addAnimation:forKey:));
  originalAddAnimation = (void *)method_setImplementation(m, (IMP)addAnimation);
  dispatch_async(dispatch_get_main_queue(), ^{
    watchCommands();
  });
}
