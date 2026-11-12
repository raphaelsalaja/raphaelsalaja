#!/bin/zsh
# Builds Harness.swift and glasshook.m for the iOS 27 Simulator, installs the
# app on a booted iPhone 18 Pro and launches one variant with the hook.
#
#   ./run.sh after          launch, logs go to out/after
#   ./run.sh after toggle   then write a command to the hook
set -euo pipefail

export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
HERE=${0:A:h}
VARIANT=${1:-after}
OUT=$HERE/out/${RUN:-$VARIANT}
BUILD=$HERE/build
DEVICE=${DEVICE:-iPhone 18 Pro}
SDK=$(xcrun --sdk iphonesimulator --show-sdk-path)
TARGET=arm64-apple-ios27.0-simulator

mkdir -p "$OUT" "$BUILD/Glass.app"

xcrun --sdk iphonesimulator swiftc -sdk "$SDK" -target $TARGET -parse-as-library -O \
  "$HERE/Harness.swift" -o "$BUILD/Glass.app/Glass"
cat > "$BUILD/Glass.app/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleIdentifier</key><string>com.raphaelsalaja.glass</string>
  <key>CFBundleExecutable</key><string>Glass</string>
  <key>CFBundleName</key><string>Glass</string>
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
codesign -s - --force "$BUILD/Glass.app" >/dev/null 2>&1

xcrun --sdk iphonesimulator clang -isysroot "$SDK" -target $TARGET -dynamiclib -fobjc-arc \
  -framework Foundation -framework UIKit -framework QuartzCore -framework CoreGraphics \
  "-DOUT_DIR=\"$OUT\"" "$HERE/glasshook.m" -o "$BUILD/glasshook.dylib"
codesign -s - --force "$BUILD/glasshook.dylib" >/dev/null 2>&1

xcrun simctl boot "$DEVICE" 2>/dev/null || true
xcrun simctl bootstatus "$DEVICE" -b >/dev/null
xcrun simctl install "$DEVICE" "$BUILD/Glass.app"
xcrun simctl terminate "$DEVICE" com.raphaelsalaja.glass 2>/dev/null || true
rm -f "$OUT"/*.jsonl(N) "$OUT"/command.txt
SIMCTL_CHILD_GLASS_VARIANT=$VARIANT \
SIMCTL_CHILD_GLASS_LABEL=${GLASS_LABEL:-32} \
SIMCTL_CHILD_GLASS_ROWS=${GLASS_ROWS:-4} \
SIMCTL_CHILD_GLASS_BACKGROUND=${GLASS_BACKGROUND:-white} \
SIMCTL_CHILD_DYLD_INSERT_LIBRARIES="$BUILD/glasshook.dylib" \
  xcrun simctl launch "$DEVICE" com.raphaelsalaja.glass >/dev/null
echo "$OUT"
