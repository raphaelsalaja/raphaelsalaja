"""Scores a browser capture of @web-kits/blur against one of the Simulator's
soft edges, channel by channel.

    /tmp/glass/venv/bin/python web.py capture.png 20 [soft-bare]

The capture is the test page at 402 points wide, with the edge starting the
given number of points from the top of the image. The columns run the full
height, so every row of the edge can be laid over the same row of Apple's,
wherever the strip sits on the page. The run sets the edge height and content.
"""

import base64
import json
import sys
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image

from fit import WIDTH
from veil import OUT, RUNS, glyphs


P3_TO_SRGB = np.array([
    [1.2249, -0.2247, 0],
    [-0.0420, 1.0419, 0],
    [-0.0197, -0.0786, 1.0979],
])


def decode(v):
    return np.where(v <= 0.04045, v / 12.92, ((v + 0.055) / 1.055) ** 2.4)


def encode(v):
    v = np.clip(v, 0, 1)
    return np.where(v <= 0.0031308, v * 12.92, 1.055 * v ** (1 / 2.4) - 0.055)


def rgb(path):
    """The capture in sRGB. Chromium's CDP screenshots come back in the
    display's P3 without a profile, so those are converted."""
    path = Path(path)
    if path.suffix == ".json":
        image = Image.open(BytesIO(base64.b64decode(json.loads(path.read_text())["data"])))
        pixels = np.asarray(image.convert("RGB"), dtype=float) / 255
        pixels = encode(decode(pixels) @ P3_TO_SRGB.T)
    else:
        pixels = np.asarray(Image.open(path).convert("RGB"), dtype=float) / 255
    return pixels, pixels.shape[1] / WIDTH


def main(capture, offset, run):
    height = RUNS[run][0]
    web, ws = rgb(capture)
    ref, rs = rgb(OUT / run / "screen.png")
    x = np.arange(8, WIDTH - 8, 1 / 3)
    errors, bands = [], {}
    for y in np.arange(0.5, height, 1):
        a = ref[int(y * rs), (x * rs).astype(int)]
        b = web[int((y + offset) * ws), (x * ws).astype(int)]
        e = (b - a)[~glyphs(y, x)]
        errors.append(e)
        bands.setdefault(int(y // 17), []).append(e)
    every = np.concatenate(errors)
    print(f"rms {np.sqrt(np.mean(every**2)):.4f}  worst {np.abs(every).max():.4f}")
    for band, es in sorted(bands.items()):
        es = np.concatenate(es)
        print(f"  y {band * 17:3d}-{band * 17 + 17:3d}  rms {np.sqrt(np.mean(es**2)):.4f}  mean {es.mean():+.4f}")


if __name__ == "__main__":
    main(sys.argv[1], float(sys.argv[2]), sys.argv[3] if len(sys.argv) > 3 else "soft-bare")
