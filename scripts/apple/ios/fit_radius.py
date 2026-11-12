# Fits the app open's and close's corner radius as SpringBoard drives it, read
# from -[SBFullScreenToHomeIconZoomSwitcherModifier cornerRadiiForIndex:]:
# while the genie phase runs, the layer heads for half the window's shorter
# side, and once _hasResetCornerRadius is set it is retargeted to its resting
# radius (the display's when opening, the icon's over the card's scale when
# closing). The spring keeps its velocity through the retarget.
#   python3 fit_radius.py animations.jsonl [tap|home]
import json
import math
import sys

import numpy as np


def simulate(times, start, genie, final, response, ratio, t0, delay, dt=1 / 1200):
    k = (2 * math.pi / response) ** 2
    c = 4 * math.pi * ratio / response
    x, v, t = start, 0.0, 0.0
    out = []
    end = max(times)
    samples = iter(sorted(times))
    nxt = next(samples)
    while t <= end + dt:
        while nxt is not None and t >= nxt:
            out.append(x)
            nxt = next(samples, None)
        if t >= t0:
            target = genie if t < t0 + delay else final
            a = -k * (x - target) - c * v
            v += a * dt
            x += v * dt
        t += dt
    return np.array(out)


marker = sys.argv[2] if len(sys.argv) > 2 else "tap"
rows = [json.loads(line) for line in open(sys.argv[1])]
t0_mark = [r for r in rows if r.get("marker") == marker][-1]["t"]
points = []
for r in rows:
    if "sample" not in r or not 0 <= r["t"] - t0_mark < 0.7:
        continue
    for s in r["sample"]:
        if s["class"] == "SBFluidSwitcherSpaceOverlayAccessoryView" and s["opacity"] > 0:
            points.append((r["t"] - t0_mark, s["cornerRadius"]))
t = np.array([p[0] for p in points])
y = np.array([p[1] for p in points])
# The close's first frames are lost to the home press, so it starts from the
# open's resting radius.
start, final = (62.0, y[-1]) if marker == "home" else (y[0], y[-1])
genie = 402 * 0.5
# genieCornerRadiusToAppResetDelay and genieCornerRadiusToHomeResetDelay.
settings_delay = 0.12 if marker == "home" else 0.06
card = (0.336, 1.0) if marker == "home" else (0.24, 1.0)

best = None
for response in np.arange(0.18, 0.42, 0.006):
    for ratio in [0.9, 0.95, 1.0, 1.05]:
        for delay in np.arange(0.0, 0.16, 0.005):
            for t0 in np.arange(0.06, 0.14, 0.0025):
                e = simulate(t, start, genie, final, response, ratio, t0, delay) - y
                rms = float(np.sqrt(np.mean(e * e)))
                if best is None or rms < best[0]:
                    best = (rms, response, ratio, delay, t0)
rms, response, ratio, delay, t0 = best
print(f"{marker}: radius {start:.2f} -> genie {genie} -> {final:.2f}: response={response:.3f} ratio={ratio} "
      f"delay={delay:.3f} start={t0:.4f} rms={rms:.3f}pt")
for d in [settings_delay, delay]:
    best_t0 = min(np.arange(0.06, 0.14, 0.0025), key=lambda s: float(np.sqrt(np.mean(
        (simulate(t, start, genie, final, *card, s, d) - y) ** 2))))
    e = simulate(t, start, genie, final, *card, best_t0, d) - y
    print(f"  card spring {card} delay={d:.3f} start={best_t0:.4f}: rms={np.sqrt(np.mean(e * e)):.3f}pt "
          f"max={np.max(np.abs(e)):.3f}pt")
