#!/bin/zsh
# Builds Harness.swift and blurhook.m for the iOS 27 Simulator, launches one
# variant on a booted iPhone 18 Pro with the hook, waits for tree.json and takes
# a screenshot.
#
#   ./run.sh soft                    BLUR_EDGE=soft, logs go to out/soft
#   CONTENT=rows SCHEME=dark ./run.sh automatic
#   PROBE=gaussianBlur:16:0.25 RUN=probe ./run.sh   strips of known filters
#   ABLATE=Replay RUN=no-replay ./run.sh soft       switch layers off first
set -euo pipefail

export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
HERE=${0:A:h}
EDGE=${1:-automatic}
OUT=$HERE/out/${RUN:-$EDGE}
BUILD=$HERE/build
DEVICE=${DEVICE:-iPhone 18 Pro}
SDK=$(xcrun --sdk iphonesimulator --show-sdk-path)
TARGET=arm64-apple-ios27.0-simulator
ID=com.raphaelsalaja.blur

mkdir -p "$OUT" "$BUILD/Blur.app"
rm -f "$OUT"/*(N)

xcrun --sdk iphonesimulator swiftc -sdk "$SDK" -target $TARGET -parse-as-library -O \
  "$HERE/Harness.swift" -o "$BUILD/Blur.app/Blur"
cat > "$BUILD/Blur.app/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleIdentifier</key><string>$ID</string>
  <key>CFBundleExecutable</key><string>Blur</string>
  <key>CFBundleName</key><string>Blur</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>1.0</string>
  <key>CFBundleVersion</key><string>1</string>
  <key>MinimumOSVersion</key><string>27.0</string>
  <key>UIDeviceFamily</key><array><integer>1</integer></array>
  <key>UILaunchScreen</key><dict/>
  <key>UIApplicationSceneManifest</key><dict>
    <key>UIApplicationSupportsMultipleScenes</key><false/>
  </dict>
</dict></plist>
PLIST
codesign -s - --force "$BUILD/Blur.app" >/dev/null 2>&1

xcrun --sdk iphonesimulator clang -isysroot "$SDK" -target $TARGET -dynamiclib -fobjc-arc \
  -framework Foundation -framework UIKit -framework QuartzCore -framework CoreGraphics -framework ImageIO \
  "-DOUT_DIR=\"$OUT\"" "$HERE/blurhook.m" -o "$BUILD/blurhook.dylib"
codesign -s - --force "$BUILD/blurhook.dylib" >/dev/null 2>&1

xcrun simctl boot "$DEVICE" 2>/dev/null || true
xcrun simctl bootstatus "$DEVICE" -b >/dev/null
xcrun simctl install "$DEVICE" "$BUILD/Blur.app"
xcrun simctl terminate "$DEVICE" $ID 2>/dev/null || true
[[ -n ${PROBE:-} ]] && export SIMCTL_CHILD_BLUR_PROBE=$PROBE
[[ -n ${ABLATE:-} ]] && export SIMCTL_CHILD_BLUR_ABLATE=$ABLATE
SIMCTL_CHILD_BLUR_EDGE=$EDGE \
SIMCTL_CHILD_BLUR_CONTENT=${CONTENT:-bars} \
SIMCTL_CHILD_BLUR_SCHEME=${SCHEME:-light} \
SIMCTL_CHILD_BLUR_TITLE=${TITLE:-large} \
SIMCTL_CHILD_BLUR_CHROME=${CHROME:-full} \
SIMCTL_CHILD_DYLD_INSERT_LIBRARIES="$BUILD/blurhook.dylib" \
  xcrun simctl launch "$DEVICE" $ID >/dev/null

for _ in {1..40}; do [[ -f $OUT/tree.json ]] && break; sleep 0.25; done
xcrun simctl io "$DEVICE" screenshot "$OUT/screen.png" >/dev/null 2>&1
echo "$OUT"
