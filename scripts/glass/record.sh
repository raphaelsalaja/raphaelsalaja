#!/bin/zsh
# Launches one configuration and records an open and a close.
#
#   RUN=after-48 GLASS_LABEL=48 ./record.sh after
#   ./record.sh menu        a native Menu, opened through its interaction
set -euo pipefail
HERE=${0:A:h}
VARIANT=${1:-after}
OUT=$("$HERE/run.sh" "$VARIANT" | tail -n 1)
sleep 3
if [[ $VARIANT == menu ]]; then
  echo "menu 1.4" > "$OUT/command.txt"; sleep 2.5
  echo "tree open" > "$OUT/command.txt"; sleep 0.5
  echo "menu-close 1.4" > "$OUT/command.txt"; sleep 2.5
else
  echo "toggle 1.4" > "$OUT/command.txt"; sleep 2.5
  echo "tree open" > "$OUT/command.txt"; sleep 0.5
  echo "toggle 1.4" > "$OUT/command.txt"; sleep 2.5
fi
echo "$OUT"
