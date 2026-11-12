#!/bin/zsh
# Records the Simulator's screen through one open and one close.
#
#   ./video.sh after out/after.mp4
#   GLASS_BACKGROUND=black ./video.sh after out/after-black.mp4
set -euo pipefail
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
HERE=${0:A:h}
VARIANT=${1:-after}
FILE=${2:-$HERE/out/$VARIANT.mp4}
DEVICE=${DEVICE:-iPhone 18 Pro}
OUT=$(RUN=video-$VARIANT "$HERE/run.sh" "$VARIANT" | tail -n 1)
sleep 3
rm -f "$FILE"
xcrun simctl io "$DEVICE" recordVideo --codec=h264 --force "$FILE" &
RECORDER=$!
sleep 1.5
if [[ $VARIANT == menu ]]; then
  echo "menu 1.4" > "$OUT/command.txt"; sleep 1.8
  echo "menu-close 1.4" > "$OUT/command.txt"; sleep 1.8
else
  echo "toggle 1.4" > "$OUT/command.txt"; sleep 1.8
  echo "toggle 1.4" > "$OUT/command.txt"; sleep 1.8
fi
kill -INT $RECORDER
wait $RECORDER 2>/dev/null || true
echo "$FILE"
