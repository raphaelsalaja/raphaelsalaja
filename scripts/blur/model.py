"""A forward model of the soft scroll edge, fitted to the screenshots.

    /tmp/glass/venv/bin/python model.py

Each row of the bars under the top edge is rebuilt from the layer tree:

    veil   Replay paints what's behind the scroll view (white here) at
           opacity * a(y), where a(y) is measured from the run with Pocket off
    blur   Pocket's variableBlur, standard deviation kv * 1.5 * m(y) points,
           where m(y) is its mask image
    fill   a second blur of kb * 16 points blended over the result: normal at
           0.25, lighten at 0.6 and darken at 0.4, each scaled by m(y) when
           inputFade is on

kv and kb turn variableBlur's radius units into Gaussian standard deviations.
They're fitted to the run with Replay off, then the whole model is scored on
the untouched run.
"""

import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.optimize import least_squares

from fit import WIDTH, bars

OUT = Path(__file__).parent / "out"
LIGHT = {"normal": 0.25, "lighten": 0.6, "darken": 0.4, "veil": 0.5}


def screen(run):
    pixels = np.asarray(Image.open(OUT / run / "screen.png").convert("RGB"), dtype=float) / 255
    return pixels.mean(axis=2), pixels.shape[1] / WIDTH


def mask(run, name):
    a = np.asarray(Image.open(OUT / run / name).convert("RGB"), dtype=float)[:, 0, 0] / 255
    return lambda t: np.interp(t, (np.arange(a.size) + 0.5) / a.size, a)


def blend(v, b, f, o):
    n = v + o["normal"] * f * (b - v)
    l = n + o["lighten"] * f * np.maximum(0, b - n)
    return l - o["darken"] * f * np.maximum(0, l - b)


def predict(x, veil, m, kv, kb, o, fade=True):
    content = bars(x, 0) * (1 - veil) + veil
    # Blurring a veiled row is the veil plus the blurred bars scaled down.
    v = bars(x, kv * 1.5 * m) * (1 - veil) + veil
    b = bars(x, kb * 16) * (1 - veil) + veil
    del content
    return blend(v, b, m if fade else 1.0, o)


def rows(grey, scale, height, step=2):
    for y in np.arange(1, height, step):
        line = grey[int(y * scale)]
        x = (np.arange(line.size) + 0.5) / scale
        keep = (x > 4) & (x < WIDTH - 4)
        if y < 54:
            keep &= ~((x > 40) & (x < 140)) & ~((x > 290) & (x < 400))
        yield y, x[keep][::3], line[keep][::3]


def veil_curve(height):
    """Replay's opacity down the edge, read off the black bars with Pocket off."""
    grey, scale = screen("soft-off-Pocket")
    ys = np.arange(0.5, height, 0.5)
    centres = [21, 141, 261]
    values = [np.mean([grey[int(y * scale), int(c * scale)] for c in centres]) for y in ys]
    return lambda y: np.interp(y, ys, values)


def main():
    height = 102
    m = mask("soft-bare", "mask-00.png")

    grey, scale = screen("soft-off-Replay")
    data = list(rows(grey, scale, height, 4))

    def residual(p):
        kv, kb = p
        return np.concatenate(
            [predict(x, 0.0, m(y / height), kv, kb, LIGHT) - v for y, x, v in data]
        )

    fit = least_squares(residual, [2, 2], bounds=([0.5, 0.5], [4, 4]))
    kv, kb = fit.x
    rms = np.sqrt(np.mean(fit.fun**2))
    print(f"Replay off   kv {kv:.3f}  kb {kb:.3f}  rms {rms:.4f}")

    def without_fade(p):
        return np.concatenate(
            [predict(x, 0.0, m(y / height), *p, LIGHT, fade=False) - v for y, x, v in data]
        )

    alt = least_squares(without_fade, [2, 2], bounds=([0.5, 0.5], [4, 4]))
    print(f"  fade off   kv {alt.x[0]:.3f}  kb {alt.x[1]:.3f}  rms {np.sqrt(np.mean(alt.fun**2)):.4f}")

    veil = veil_curve(height)
    grey, scale = screen("soft-bare")
    full = list(rows(grey, scale, height, 2))
    errors = [predict(x, veil(y), m(y / height), kv, kb, LIGHT) - v for y, x, v in full]
    worst = max(float(np.abs(e).max()) for e in errors)
    print(f"Whole edge   rms {np.sqrt(np.mean(np.concatenate(errors) ** 2)):.4f}  worst {worst:.4f}")

    ys = np.arange(0, height + 0.5, height / 20)
    (OUT / "model.json").write_text(
        json.dumps(
            {
                "kv": kv,
                "kb": kb,
                "height": height,
                "veil": [[float(y), float(veil(y))] for y in ys],
                "mask": [[float(y), float(m(y / height))] for y in ys],
            },
            indent=1,
        )
    )


if __name__ == "__main__":
    main()
