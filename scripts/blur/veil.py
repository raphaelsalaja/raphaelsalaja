"""Predicts the soft edge from the layer tree's recipe and scores it against the
Simulator's captures, channel by channel.

    /tmp/glass/venv/bin/python veil.py          score every run
    /tmp/glass/venv/bin/python veil.py fit      refit the sharp blur, out/sharp.json

Replay's veil sits under the Pocket in the tree, so both of the Pocket's blurs
see the veil already painted, and the wide one smears the veil's fade down the
edge. That leaves one thing the tree doesn't give: how the variable blur's
standard deviation follows the mask. `fit` finds that as one table shared by
every run.
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter1d
from scipy.optimize import minimize

from fit import BAR, LEFT, WIDTH
from model import blend

OUT = Path(__file__).parent / "out"
WIDE = 1.850 * 16
STEP = 0.25
GRID = np.arange(0, WIDTH, STEP) + STEP / 2

WEIGHTS = {
    False: {"normal": 0.25, "lighten": 0.6, "darken": 0.4, "veil": 0.5, "ink": 1.0},
    True: {"normal": 0.0, "lighten": 0.4, "darken": 0.6, "veil": 0.6, "ink": 0.0},
}
BARS = [(0, 0, 0), (1, 1, 1)] * 3 + [(0, 0, 0)]
COLOURS = [
    (1, 0.23, 0.19), (1, 0.8, 0), (0.2, 0.78, 0.35), (0.2, 0.68, 0.9),
    (0, 0.48, 1), (0.69, 0.32, 0.87), (1, 0.18, 0.33),
]
RUNS = {
    "soft-bare": (102, False, BARS),
    "soft": (156, False, BARS),
    "soft-dark": (102, True, BARS),
    "soft-colour": (102, False, COLOURS),
    "soft-colour-dark": (102, True, COLOURS),
}
KNOTS = np.array([0, 0.025, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])


def glyphs(y, x):
    """Columns with status bar, back button, title or button glyphs in them."""
    out = np.zeros_like(x, dtype=bool)
    if y < 54:
        out |= (x < 160) | (x > 270)
    if 58 < y < 114:
        out |= ((x > 160) & (x < 245)) | (x > 330)
    return out | (x < 8) | (x > WIDTH - 8)


def mask(run):
    a = np.asarray(Image.open(OUT / run / "mask-00.png").convert("RGB"), dtype=float)[:, 0, 0] / 255
    return lambda t: float(np.interp(t, (np.arange(a.size) + 0.5) / a.size, a))


def content(palette):
    """The columns on the fine grid, one row per channel."""
    index = np.clip(((GRID - LEFT) // BAR).astype(int), 0, 6)
    return np.asarray(palette, dtype=float)[index].T


def blur(c, sigma):
    """A Gaussian over the screen only, renormalised at its sides."""
    if sigma < 1e-3:
        return c
    s = sigma / STEP
    ones = np.ones_like(c)
    return gaussian_filter1d(c, s, axis=-1, mode="constant") / gaussian_filter1d(ones, s, axis=-1, mode="constant")


def smear(run):
    """The veil's fade after the wide blur, renormalised at both ends."""
    height, dark, _ = RUNS[run]
    w, m = WEIGHTS[dark], mask(run)
    ys = np.arange(0, height, STEP) + STEP / 2
    veil = w["veil"] * np.array([m(y / height) for y in ys])
    s = WIDE / STEP
    out = gaussian_filter1d(veil, s, mode="constant") / gaussian_filter1d(np.ones_like(ys), s, mode="constant")
    return lambda y: float(np.interp(y, ys, out))


def sharp():
    table = json.loads((OUT / "sharp.json").read_text())
    return lambda m: float(np.interp(m, table["m"], np.clip(table["sigma"], 0, None)))


def rows(run):
    """Each row's sharp backdrop and wide backdrop, both under the veil."""
    height, dark, palette = RUNS[run]
    w, m, vb = WEIGHTS[dark], mask(run), smear(run)
    c = content(palette)
    wide = blur(c, WIDE)
    for y in np.arange(1, height, 2.0):
        mm = m(y / height)
        v = w["veil"] * mm
        yield y, mm, c * (1 - v) + w["ink"] * v, wide * (1 - vb(y)) + w["ink"] * vb(y), w


def screen(run):
    img = np.asarray(Image.open(OUT / run / "screen.png").convert("RGB"), dtype=float) / 255
    scale = img.shape[1] / WIDTH
    return lambda y: (img[int(y * scale)][(GRID * scale).astype(int)].T)[:, ~glyphs(y, GRID)]


def score(run, s):
    row = screen(run)
    errors = []
    for y, mm, flat, wide, w in rows(run):
        out = blend(blur(flat, s(mm)), wide, mm, w)
        errors.append(out[:, ~glyphs(y, GRID)] - row(y))
    e = np.concatenate(errors, axis=1)
    return float(np.sqrt(np.mean(e**2)))


def fit():
    sigmas = np.arange(0, 3.6, 0.02)
    curves = []
    for run in RUNS:
        row = screen(run)
        for y, mm, flat, wide, w in rows(run):
            k = ~glyphs(y, GRID)
            a = row(y)
            e = [np.sum((blend(blur(flat, s), wide, mm, w)[:, k] - a) ** 2) for s in sigmas]
            curves.append((run, mm, np.array(e), a.size))

    def loss(knots):
        totals = {}
        for run, mm, e, n in curves:
            t = totals.setdefault(run, [0.0, 0])
            t[0] += np.interp(np.interp(mm, KNOTS, knots), sigmas, e)
            t[1] += n
        return sum(t[0] / t[1] for t in totals.values())

    start = np.interp(KNOTS, [0, 0.05, 0.1, 0.2, 0.5, 1], [0, 0.47, 0.6, 0.85, 1.5, 2.88])
    best = minimize(loss, start, method="Nelder-Mead", options={"maxiter": 20000, "xatol": 1e-4, "fatol": 1e-10})
    best = minimize(loss, best.x, method="Powell")
    sigma = np.clip(best.x, 0, None).round(3)
    (OUT / "sharp.json").write_text(json.dumps({"m": KNOTS.tolist(), "sigma": sigma.tolist()}))
    print(dict(zip(KNOTS.tolist(), sigma.tolist())))


if __name__ == "__main__":
    if sys.argv[1:] == ["fit"]:
        fit()
    else:
        table = sharp()
        for run in sys.argv[1:] or RUNS:
            print(f"{run:17s} 3.24 x mask {score(run, lambda m: 3.24 * m):.4f}   fitted table {score(run, table):.4f}")
