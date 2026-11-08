"""Measures the popover's corner radius from a recording over black.

    /tmp/glass/venv/bin/python radius.py out/after-black.mp4

The glass is the only thing brighter than the background, so each frame's
silhouette is a threshold. Below a corner of radius r, a rounded rect misses
little at its top corners, and how far the silhouette sits in from its sides 8
points below its top gives r. The open popover's corner is continuous rather
than circular, but at that depth the two differ by under a tenth of a point.

Each frame's scale comes from its width against the open popover's, and the
predicted radius blends from a circle on the square bounds the morph starts
from to the popover's 34 points, then scales with it.
"""

import json
import math
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

SCALE = 3  # pixels per point on the iPhone 18 Pro
POPOVER = (235.333, 620, 156.667, 220)  # its open frame in points, from the samples
RADIUS = 34  # _UIPopoverView's _customCornerRadius
LABEL = 32


def frames(video: Path):
    folder = Path(tempfile.mkdtemp())
    subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(video), "-fps_mode", "passthrough", str(folder / "%05d.png")],
        check=True, stderr=subprocess.DEVNULL,
    )
    times = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "frame=pts_time", "-of", "csv=p=0", str(video)],
        capture_output=True, text=True, check=True,
    ).stdout.split()
    for i, path in enumerate(sorted(folder.glob("*.png"))):
        yield float(times[i].strip(",")), np.asarray(Image.open(path).convert("L"), dtype=np.int16)


def popover_box(mask):
    """The bounding box of the silhouette above the button's row."""
    # Between the status bar and the button, which sits at y 762 pt.
    top = int(560 * SCALE)
    region = mask[top : int(756 * SCALE), int(200 * SCALE) :]
    ys, xs = np.nonzero(region)
    if len(xs) < 200:
        return None
    left = int(200 * SCALE)
    return xs.min() + left, ys.min() + top, xs.max() + 1 + left, ys.max() + 1 + top


DEPTH = 8  # points below the top edge


def inset(r, d):
    """How far a circular corner of radius r sits in from the side, d below the top."""
    if d >= r:
        return 0.0
    return r - math.sqrt(r * r - (r - d) ** 2)


def corner_radius(mask, box):
    """Solves the radius whose inset matches the silhouette's, at both top corners."""
    x0, y0, x1, y1 = box
    row = mask[y0 + DEPTH * SCALE, x0:x1]
    lit = np.nonzero(row)[0]
    if not len(lit):
        return None
    measured = (lit[0] + (x1 - x0 - 1 - lit[-1])) / 2 / SCALE
    lo, hi = DEPTH, 400.0
    for _ in range(60):
        mid = (lo + hi) / 2
        if inset(mid, DEPTH) < measured:
            lo = mid
        else:
            hi = mid
    return lo


def main():
    video = Path(sys.argv[1])
    W, H = POPOVER[2], POPOVER[3]
    s0 = LABEL / 2 / max(W, H)
    rows = []
    for t, image in frames(video):
        mask = image > 40
        box = popover_box(mask)
        if not box:
            continue
        x0, y0, x1, y1 = box
        width = (x1 - x0) / SCALE
        height = (y1 - y0) / SCALE
        s = width / W
        p = (s - s0) / (1 - s0)
        if not 0.15 < p < 1.1:
            continue
        measured = corner_radius(mask, box)
        if measured is None:
            continue
        bounds_height = W + (H - W) * p
        predicted = (W / 2 + (RADIUS - W / 2) * p) * s
        # A radius can't be more than half the shape's shorter side.
        predicted = min(predicted, min(width, bounds_height * s) / 2)
        rows.append({"t": t, "p": p, "width": width, "height": height, "measured": measured, "predicted": predicted})
        print(f"{t:7.3f} p={p:5.3f} {width:6.1f} x {height:6.1f}  r measured {measured:6.2f}  predicted {predicted:6.2f}")
    errors = np.array([r["measured"] - r["predicted"] for r in rows])
    print(f"{len(rows)} frames, mean error {errors.mean():+.2f} pt, RMS {np.sqrt((errors**2).mean()):.2f} pt")
    Path(video.with_suffix(".radius.json")).write_text(json.dumps(rows, indent=1))


if __name__ == "__main__":
    main()
