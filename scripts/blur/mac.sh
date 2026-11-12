#!/bin/zsh
# Builds Mac.swift and blurhook.m for macOS, launches one variant with the
# hook, waits for tree.json and captures the window.
#
#   ./mac.sh soft              logs go to out/mac-soft
#   SCHEME=dark ./mac.sh soft
set -euo pipefail

export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
HERE=${0:A:h}
EDGE=${1:-automatic}
OUT=$HERE/out/${RUN:-mac-$EDGE}
BUILD=$HERE/build/mac

mkdir -p "$OUT" "$BUILD"
rm -f "$OUT"/*(N)

xcrun swiftc -parse-as-library -O "$HERE/Mac.swift" -o "$BUILD/BlurMac"
xcrun clang -dynamiclib -fobjc-arc -framework Foundation -framework AppKit -framework QuartzCore \
  -framework CoreGraphics -framework ImageIO "-DOUT_DIR=\"$OUT\"" "$HERE/blurhook.m" -o "$BUILD/blurhook.dylib"
codesign -s - --force "$BUILD/blurhook.dylib" >/dev/null 2>&1

pkill -x BlurMac 2>/dev/null || true
BLUR_EDGE=$EDGE BLUR_SCHEME=${SCHEME:-light} BLUR_ABLATE=${ABLATE:-} \
  DYLD_INSERT_LIBRARIES="$BUILD/blurhook.dylib" "$BUILD/BlurMac" >/dev/null 2>&1 &

for _ in {1..40}; do [[ -f $OUT/windows.txt ]] && break; sleep 0.25; done
screencapture -o -x -l "$(head -1 "$OUT/windows.txt")" "$OUT/screen.png" || true
pkill -x BlurMac 2>/dev/null || true
echo "$OUT"
