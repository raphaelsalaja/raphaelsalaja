"""Fits the scroll edge effect row by row from a screenshot of the bars.

    /tmp/glass/venv/bin/python fit.py out/soft-bare

Under the edge, each row of the 60-point black and white bars is modelled as
a mix of two blurred copies of the sharp bars, scaled and offset to allow for
any tint:

    row(x) = k * ((1 - w) * G(sa) * bars + w * G(sb) * bars) + c

G(s) is a Gaussian with standard deviation s points, the same thing CSS
blur(s) draws. Each row is fitted in sRGB values and in linear light, and the
better of the two says which space the effect blends in. Glyphs in the status
bar and the tab bar are left out of the fit.
"""

import json
import sys
from math import sqrt
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.optimize import least_squares
from scipy.special import erf

WIDTH = 402
LEFT = -9
BAR = 60


def bars(x, sigma):
    out = np.zeros_like(x)
    for i in range(1, 8, 2):
        a, b = LEFT + i * BAR, LEFT + (i + 1) * BAR
        if sigma < 1e-3:
            out += ((x >= a) & (x < b)).astype(float)
        else:
            s = sigma * sqrt(2)
            out += 0.5 * (erf((x - a) / s) - erf((x - b) / s))
    return out


def linear(v):
    return np.where(v <= 0.04045, v / 12.92, ((v + 0.055) / 1.055) ** 2.4)


def keep(y, x):
    """Columns free of glyphs at row y, in points."""
    ok = (x > 4) & (x < WIDTH - 4)
    if y < 54:
        ok &= ~((x > 40) & (x < 140)) & ~((x > 290) & (x < 400))
    if y > 786:
        ok &= ~((x > 62) & (x < 340))
    return ok


def fit_row(x, v):
    def model(p):
        sa, sb, w, k, c = p
        return k * ((1 - w) * bars(x, sa) + w * bars(x, sb)) + c

    best = None
    for sb0 in (4, 10, 20, 30):
        r = least_squares(
            lambda p: model(p) - v,
            [0.5, sb0, 0.5, 1, 0],
            bounds=([0, 0, 0, 0, -0.5], [10, 60, 1, 2, 1]),
        )
        if best is None or r.cost < best.cost:
            best = r
    sa, sb, w, k, c = best.x
    if sa > sb:
        sa, sb, w = sb, sa, 1 - w
    rms = sqrt(2 * best.cost / len(v))
    return {"sa": sa, "sb": sb, "w": w, "k": k, "c": c, "rms": rms}


def main(run):
    image = Image.open(run / "screen.png").convert("RGB")
    pixels = np.asarray(image, dtype=float) / 255
    scale = pixels.shape[1] / WIDTH
    height = pixels.shape[0] / scale
    grey = pixels.mean(axis=2)
    rows = list(np.arange(1, 170, 2)) + list(np.arange(height - 170, height - 1, 2))
    out = []
    for y in rows:
        py = int(y * scale)
        line = grey[py]
        x = (np.arange(line.size) + 0.5) / scale
        m = keep(y, x)
        srgb = fit_row(x[m][::2], line[m][::2])
        lin = fit_row(x[m][::2], linear(line[m][::2]))
        out.append({"y": round(float(y), 2), "srgb": srgb, "linear": lin})
        print(
            f"y {y:6.1f}  sRGB sa {srgb['sa']:5.2f} sb {srgb['sb']:5.2f} w {srgb['w']:.3f}"
            f" k {srgb['k']:.3f} c {srgb['c']:+.3f} rms {srgb['rms']:.4f}"
            f"  | linear rms {lin['rms']:.4f}"
        )
    (run / "fit.json").write_text(json.dumps(out, indent=1))


if __name__ == "__main__":
    main(Path(sys.argv[1]))
