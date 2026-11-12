"""Measures each strip of a BLUR_PROBE run.

    PROBE=gaussianBlur:16:1,variableBlur:1.5:0.5 RUN=probe ./run.sh
    /tmp/glass/venv/bin/python probe.py out/probe gaussianBlur:16:1,variableBlur:1.5:0.5

The middle row of each strip is fitted with one Gaussian, then with the
two-Gaussian mix fit.py uses under the edge, so a filter whose kernel isn't
Gaussian shows up as a better second fit.
"""

import sys
from math import sqrt
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.optimize import least_squares

from fit import WIDTH, bars, fit_row


def single(x, v):
    best = None
    for s0 in (1, 5, 15, 30):
        r = least_squares(
            lambda p: p[1] * bars(x, p[0]) + p[2] - v, [s0, 1, 0], bounds=([0, 0, -1], [80, 2, 1])
        )
        if best is None or r.cost < best.cost:
            best = r
    return best.x[0], sqrt(2 * best.cost / len(v))


def main(run, spec):
    pixels = np.asarray(Image.open(run / "screen.png").convert("RGB"), dtype=float) / 255
    scale = pixels.shape[1] / WIDTH
    grey = pixels.mean(axis=2)
    for i, item in enumerate(spec.split(",")):
        y = 70 + i * 96 + 40
        line = grey[int(y * scale)]
        x = (np.arange(line.size) + 0.5) / scale
        m = (x > 4) & (x < WIDTH - 4)
        s, rms = single(x[m], line[m])
        mix = fit_row(x[m], line[m])
        print(
            f"{item:24} one σ {s:6.2f} rms {rms:.4f}   two σ {mix['sa']:5.2f}/{mix['sb']:5.2f}"
            f" w {mix['w']:.3f} rms {mix['rms']:.4f}"
        )


if __name__ == "__main__":
    main(Path(sys.argv[1]), sys.argv[2])
