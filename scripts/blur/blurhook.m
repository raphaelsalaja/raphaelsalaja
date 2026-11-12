// Injected into Harness.swift's app with SIMCTL_CHILD_DYLD_INSERT_LIBRARIES.
// Three seconds after launch it writes every layer in the app's windows to
// tree.json, with each layer's filters, background filters and mask. Mask
// images, whether a layer's contents or a filter's inputMaskImage, are saved as
// PNGs beside it with their alpha read down the middle column to ramps.json.
//
// The same file builds for macOS, where it walks each window's frame view so
// the titlebar and toolbar are included.
#import <Foundation/Foundation.h>
#import <ImageIO/ImageIO.h>
#import <QuartzCore/QuartzCore.h>
#import <TargetConditionals.h>
#import <objc/runtime.h>
#if TARGET_OS_OSX
#import <AppKit/AppKit.h>
#else
#import <UIKit/UIKit.h>
#endif

static NSString *OUT = @OUT_DIR;
static int imageCount = 0;
static NSMutableDictionary *ramps;

// Each window's root layer, keyed by the window's class.
static NSArray<NSArray *> *rootLayers(void) {
  NSMutableArray *roots = [NSMutableArray array];
#if TARGET_OS_OSX
  for (NSWindow *window in NSApp.windows) {
    CALayer *layer = window.contentView.superview.layer ?: window.contentView.layer;
    if (layer) [roots addObject:@[ NSStringFromClass(window.class), layer ]];
  }
#else
  for (UIScene *scene in UIApplication.sharedApplication.connectedScenes)
    if ([scene isKindOfClass:UIWindowScene.class])
      for (UIWindow *window in ((UIWindowScene *)scene).windows)
        [roots addObject:@[ NSStringFromClass(window.class), window.layer ]];
#endif
  return roots;
}

static NSArray *alphaColumn(CGImageRef image, BOOL vertical) {
  size_t w = CGImageGetWidth(image), h = CGImageGetHeight(image);
  if (!w || !h) return @[];
  uint8_t *pixels = calloc(w * h * 4, 1);
  CGColorSpaceRef space = CGColorSpaceCreateDeviceRGB();
  CGContextRef ctx = CGBitmapContextCreate(pixels, w, h, 8, w * 4, space, kCGImageAlphaPremultipliedLast);
  CGContextDrawImage(ctx, CGRectMake(0, 0, w, h), image);
  NSMutableArray *out = [NSMutableArray array];
  // Bitmap rows run top to bottom in memory.
  if (vertical) {
    size_t x = w / 2;
    for (size_t y = 0; y < h; y++) [out addObject:@(pixels[(y * w + x) * 4 + 3] / 255.0)];
  } else {
    size_t y = h / 2;
    for (size_t x = 0; x < w; x++) [out addObject:@(pixels[(y * w + x) * 4 + 3] / 255.0)];
  }
  CGContextRelease(ctx);
  CGColorSpaceRelease(space);
  free(pixels);
  return out;
}

static NSString *saveImage(CGImageRef image, NSString *label) {
  NSString *name = [NSString stringWithFormat:@"mask-%02d.png", imageCount++];
  NSURL *url = [NSURL fileURLWithPath:[OUT stringByAppendingPathComponent:name]];
  CGImageDestinationRef dest = CGImageDestinationCreateWithURL((__bridge CFURLRef)url, CFSTR("public.png"), 1, NULL);
  CGImageDestinationAddImage(dest, image, NULL);
  CGImageDestinationFinalize(dest);
  CFRelease(dest);
  ramps[name] = @{
    @"label" : label,
    @"size" : @[ @(CGImageGetWidth(image)), @(CGImageGetHeight(image)) ],
    @"vertical" : alphaColumn(image, YES),
    @"horizontal" : alphaColumn(image, NO),
  };
  return name;
}

static id describeValue(id v, NSString *label) {
  if (!v) return NSNull.null;
  if ([v isKindOfClass:NSNumber.class] || [v isKindOfClass:NSString.class]) return v;
  CFTypeID type = CFGetTypeID((__bridge CFTypeRef)v);
  if (type == CGColorGetTypeID()) {
    CGColorRef c = (__bridge CGColorRef)v;
    const CGFloat *p = CGColorGetComponents(c);
    NSMutableArray *a = [NSMutableArray array];
    for (size_t i = 0; i < CGColorGetNumberOfComponents(c); i++) [a addObject:@(p[i])];
    return a;
  }
  if (type == CGImageGetTypeID()) return @{@"image" : saveImage((__bridge CGImageRef)v, label)};
  if ([v isKindOfClass:NSValue.class]) {
    const char *t = [v objCType];
    if (strstr(t, "Point")) {
      CGPoint p;
      [v getValue:&p size:sizeof p];
      return @[ @(p.x), @(p.y) ];
    }
    if (strstr(t, "Size")) {
      CGSize s;
      [v getValue:&s size:sizeof s];
      return @[ @(s.width), @(s.height) ];
    }
    if (strstr(t, "Rect")) {
      CGRect r;
      [v getValue:&r size:sizeof r];
      return @[ @(r.origin.x), @(r.origin.y), @(r.size.width), @(r.size.height) ];
    }
    // CAColorMatrix is 20 floats: four rows of RGBA weights plus a bias.
    NSUInteger size = 0;
    NSGetSizeAndAlignment(t, &size, NULL);
    if (size == 80) {
      float m[20];
      [v getValue:m size:sizeof m];
      NSMutableArray *a = [NSMutableArray array];
      for (int i = 0; i < 20; i++) [a addObject:@(m[i])];
      return a;
    }
    return [v description];
  }
  if ([v isKindOfClass:NSArray.class]) {
    NSMutableArray *a = [NSMutableArray array];
    for (id x in v) [a addObject:describeValue(x, label)];
    return a;
  }
  NSString *d = [v description];
  return [d substringToIndex:MIN(d.length, 400)];
}

static NSArray *propertyNames(Class cls, Class stop) {
  NSMutableArray *names = [NSMutableArray array];
  for (Class c = cls; c && c != stop && c != NSObject.class; c = class_getSuperclass(c)) {
    unsigned count = 0;
    objc_property_t *props = class_copyPropertyList(c, &count);
    for (unsigned i = 0; i < count; i++) {
      const char *a = property_getAttributes(props[i]);
      if (a && (strstr(a, "T@?") || strstr(a, "T^") || strstr(a, "T*"))) continue;
      NSString *name = @(property_getName(props[i]));
      if ([@[ @"hash", @"superclass", @"description", @"debugDescription" ] containsObject:name]) continue;
      [names addObject:name];
    }
    free(props);
  }
  return names;
}

// CAFilter keeps its inputs in a private dictionary rather than in properties,
// so the known input keys are tried one by one through KVC.
static NSArray *FILTER_KEYS;

static id describeFilters(NSArray *filters, NSString *label) {
  if (!filters.count) return nil;
  NSMutableArray *out = [NSMutableArray array];
  for (id f in filters) {
    NSMutableDictionary *d = [NSMutableDictionary dictionary];
    d[@"class"] = NSStringFromClass([f class]);
    d[@"description"] = describeValue(f, label);
    // Archiving writes every input the filter holds, including ones not in
    // FILTER_KEYS.
    @try {
      NSData *data = [NSKeyedArchiver archivedDataWithRootObject:f requiringSecureCoding:NO error:nil];
      id plist = [NSPropertyListSerialization propertyListWithData:data options:0 format:NULL error:nil];
      NSMutableArray *keys = [NSMutableArray array];
      for (id object in plist[@"$objects"])
        if ([object isKindOfClass:NSString.class] || [object isKindOfClass:NSNumber.class])
          [keys addObject:[object description]];
      d[@"archivedKeys"] = [[NSSet setWithArray:keys].allObjects sortedArrayUsingSelector:@selector(compare:)];
    } @catch (__unused NSException *e) {
    }
    for (NSString *key in FILTER_KEYS) {
      @try {
        id value = [f valueForKey:key];
        if (value) d[key] = describeValue(value, [label stringByAppendingFormat:@" %@", key]);
      } @catch (__unused NSException *e) {
      }
    }
    [out addObject:d];
  }
  return out;
}

static NSString *layerName(CALayer *l) {
  id delegate = l.delegate;
  NSString *name = NSStringFromClass(l.class);
  if (delegate) name = [NSString stringWithFormat:@"%@/%@", NSStringFromClass([delegate class]), name];
  if (l.name) name = [name stringByAppendingFormat:@"#%@", l.name];
  return name;
}

static NSMutableDictionary *describeLayer(CALayer *layer, CALayer *root, int depth);

static void walk(CALayer *layer, CALayer *root, int depth, NSMutableArray *out) {
  if (depth > 120) return;
  [out addObject:describeLayer(layer, root, depth)];
  for (CALayer *child in layer.sublayers) walk(child, root, depth + 1, out);
}

static NSMutableDictionary *describeLayer(CALayer *layer, CALayer *root, int depth) {
  NSString *name = layerName(layer);
  CGRect frame = root ? [layer convertRect:layer.bounds toLayer:root] : layer.frame;
  NSMutableDictionary *d = [@{
    @"name" : name,
    @"depth" : @(depth),
    @"frame" : @[ @(frame.origin.x), @(frame.origin.y), @(frame.size.width), @(frame.size.height) ],
    @"opacity" : @(layer.opacity),
  } mutableCopy];
  if (layer.hidden) d[@"hidden"] = @YES;
  if (layer.backgroundColor) d[@"background"] = describeValue((__bridge id)layer.backgroundColor, name);
  if (layer.contents) d[@"contents"] = describeValue(layer.contents, [name stringByAppendingString:@" contents"]);
  if (layer.compositingFilter) d[@"compositingFilter"] = describeValue(layer.compositingFilter, name);
  id filters = describeFilters(layer.filters, name);
  if (filters) d[@"filters"] = filters;
  id background = describeFilters(layer.backgroundFilters, name);
  if (background) d[@"backgroundFilters"] = background;
  if ([layer isKindOfClass:CAGradientLayer.class]) {
    CAGradientLayer *g = (id)layer;
    d[@"gradient"] = @{
      @"type" : g.type,
      @"colors" : describeValue(g.colors, name),
      @"locations" : g.locations ?: NSNull.null,
      @"start" : @[ @(g.startPoint.x), @(g.startPoint.y) ],
      @"end" : @[ @(g.endPoint.x), @(g.endPoint.y) ],
    };
  }
  if (layer.animationKeys.count) d[@"animations"] = layer.animationKeys;
  CALayer *presentation = layer.presentationLayer;
  if (filters && presentation) d[@"presentationFilters"] = describeFilters(presentation.filters, name);
  NSString *cls = NSStringFromClass(layer.class);
  if (filters || background || [cls containsString:@"Backdrop"] || [cls containsString:@"Portal"] ||
      [cls containsString:@"SDF"]) {
    NSMutableDictionary *props = [NSMutableDictionary dictionary];
    for (NSString *key in propertyNames(layer.class, CALayer.class)) {
      @try {
        props[key] = describeValue([layer valueForKey:key], name);
      } @catch (__unused NSException *e) {
      }
    }
    d[@"props"] = props;
  }
  if (layer.mask) {
    NSMutableArray *mask = [NSMutableArray array];
    walk(layer.mask, nil, 0, mask);
    d[@"mask"] = mask;
  }
  return d;
}

static void dump(NSString *file) {
  ramps = [NSMutableDictionary dictionary];
  NSMutableArray *windows = [NSMutableArray array];
  for (NSArray *root in rootLayers()) {
    NSMutableArray *layers = [NSMutableArray array];
    walk(root[1], root[1], 0, layers);
    [windows addObject:@{@"window" : root[0], @"layers" : layers}];
  }
  NSMutableArray *methods = [NSMutableArray array];
  Class filter = NSClassFromString(@"CAFilter");
  unsigned count = 0;
  Method *list = class_copyMethodList(filter, &count);
  for (unsigned i = 0; i < count; i++) [methods addObject:NSStringFromSelector(method_getName(list[i]))];
  free(list);
  id types = [filter respondsToSelector:@selector(filterTypes)] ? [filter performSelector:@selector(filterTypes)] : @[];
  NSMutableDictionary *tree = [@{@"windows" : windows, @"filterMethods" : methods, @"filterTypes" : types} mutableCopy];
#if TARGET_OS_OSX
  // screencapture -l takes a window number.
  NSMutableArray *numbers = [NSMutableArray array];
  for (NSWindow *window in NSApp.windows)
    if (window.isVisible) [numbers addObject:@(window.windowNumber)];
  tree[@"windowNumbers"] = numbers;
  [[numbers componentsJoinedByString:@"\n"] writeToFile:[OUT stringByAppendingPathComponent:@"windows.txt"]
                                             atomically:YES
                                               encoding:NSUTF8StringEncoding
                                                  error:nil];
#endif
  NSJSONWritingOptions o = NSJSONWritingPrettyPrinted | NSJSONWritingSortedKeys;
  [[NSJSONSerialization dataWithJSONObject:tree options:o error:nil]
      writeToFile:[OUT stringByAppendingPathComponent:file]
       atomically:YES];
  [[NSJSONSerialization dataWithJSONObject:ramps options:o error:nil]
      writeToFile:[OUT stringByAppendingPathComponent:@"ramps.json"]
       atomically:YES];
}

// BLUR_ABLATE is a comma-separated list of layer names to switch off before
// the screenshot: "Replay" hides that layer, "Pocket.filters" strips the
// layer's filters and "Pocket.mask" drops its variableBlur mask so the blur
// runs at full radius everywhere.
static void ablate(CALayer *layer, NSArray<NSString *> *names) {
  for (NSString *entry in names) {
    NSArray *parts = [entry componentsSeparatedByString:@"."];
    if (![layer.name isEqualToString:parts[0]]) continue;
    if (parts.count == 1) layer.hidden = YES;
    else if ([parts[1] isEqualToString:@"filters"]) layer.filters = nil;
    else if ([parts[1] isEqualToString:@"mask"]) {
      for (id f in layer.filters) [f setValue:nil forKey:@"inputMaskImage"];
      layer.filters = layer.filters;
    }
  }
  for (CALayer *child in layer.sublayers) ablate(child, names);
}

__attribute__((constructor)) static void start(void) {
  const char *off = getenv("BLUR_ABLATE");
  if (off && *off) {
    NSArray *names = [@(off) componentsSeparatedByString:@","];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [CATransaction begin];
      [CATransaction setDisableActions:YES];
      for (NSArray *root in rootLayers()) ablate(root[1], names);
      [CATransaction commit];
    });
  }
  FILTER_KEYS = @[
    @"name", @"type", @"enabled", @"inputRadius", @"inputMaskImage", @"inputNormalizeEdges", @"inputNormalizeEdgesTransparent",
    @"inputHardEdges", @"inputQuality", @"inputIntermediateBitDepth", @"inputDither", @"inputAmount", @"inputScale",
    @"inputBias", @"inputColorMatrix", @"inputReversed", @"inputColor", @"inputColor0", @"inputColor1", @"inputAngle",
    @"inputPoints", @"inputValues", @"inputOffset", @"inputTransparent", @"inputEdgeMode", @"inputLevels",
    @"inputSourceSublayerName", @"inputPreserveAlpha", @"inputBlurRadius", @"inputGain", @"inputMinimum",
    @"inputMaximum", @"inputEDRHeadroom", @"inputMaskPremultiplied", @"inputUseCubicSampling", @"inputFade",
    @"inputBlurFillBlurRadius", @"inputBlurFillNormalOpacity", @"inputBlurFillLightenOpacity",
    @"inputBlurFillDarkenOpacity"
  ];
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    dump(@"tree.json");
  });
}
