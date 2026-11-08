# Fits a spring to every channel of a sampled SpringBoard transition.
#   python3 fit_open.py animations.jsonl [marker]
#
# Each channel is normalised to progress from its first to its last value, then
# matched against the closed-form step response of a spring with a response,
# a damping ratio and a start time, by grid search.
import json
import math
import sys

import numpy as np


def step(t, response, ratio):
    """Progress of a spring released from rest at 0 towards 1, as UIKit defines it."""
    t = np.maximum(t, 0)
    w = 2 * math.pi / response
    if abs(ratio - 1) < 1e-9:
        return 1 - (1 + w * t) * np.exp(-w * t)
    if ratio < 1:
        wd = w * math.sqrt(1 - ratio * ratio)
        return 1 - np.exp(-ratio * w * t) * (np.cos(wd * t) + ratio * w / wd * np.sin(wd * t))
    s = w * math.sqrt(ratio * ratio - 1)
    r1, r2 = -ratio * w + s, -ratio * w - s
    return 1 - (r2 * np.exp(r1 * t) - r1 * np.exp(r2 * t)) / (r2 - r1)


def fit(t, p):
    best = None
    starts = np.arange(-0.05, 0.12, 0.001)
    grid = t[None, :] - starts[:, None]
    for response in np.arange(0.15, 1.0, 0.003):
        for ratio in np.arange(0.6, 1.5, 0.01):
            e = step(grid, response, ratio) - p[None, :]
            rms = np.sqrt(np.mean(e * e, axis=1))
            i = int(np.argmin(rms))
            if best is None or rms[i] < best[0]:
                best = (float(rms[i]), response, ratio, starts[i])
    return best


def fixed(t, p, response, ratio):
    best = None
    for t0 in np.arange(-0.05, 0.12, 0.0005):
        e = step(t - t0, response, ratio) - p
        rms = float(np.sqrt(np.mean(e * e)))
        if best is None or rms < best[0]:
            best = (rms, t0, float(np.max(np.abs(e))))
    return best


def series(path, marker):
    rows = [json.loads(line) for line in open(path)]
    t0 = [r for r in rows if r.get("marker") == marker][-1]["t"]
    later = [r["t"] for r in rows if r.get("marker") in ("tap", "home", "probe:animateWithDuration") and r["t"] > t0]
    t1 = later[0] if later else math.inf
    out = {}
    for r in rows:
        if "sample" not in r or not t0 <= r["t"] < t1:
            continue
        # Callback time fits the settings better than the display link's target time.
        t = r["t"] - t0
        by = {}
        for s in r["sample"]:
            by.setdefault(s["class"], []).append(s)
        overlay = [s for s in by.get("SBFluidSwitcherSpaceOverlayAccessoryView", []) if s["opacity"] > 0]
        folder = by.get("SBRootFolderView")
        if overlay:
            o = overlay[0]
            x, y, w, h = o["frame"]
            channels = {
                "scale": o["scale"][0],
                "height": o["bounds"][1],
                "centerX": x + w / 2,
                "centerY": y + h / 2,
                "cornerRadius": o["cornerRadius"],
                "screenRadius": o["cornerRadius"] * o["scale"][0],
            }
            for k, v in channels.items():
                out.setdefault(k, []).append((t, v))
        if folder:
            out.setdefault("homeScale", []).append((t, folder[0]["frame"][2] / 402))
    return out


if __name__ == "__main__":
    path = sys.argv[1]
    marker = sys.argv[2] if len(sys.argv) > 2 else "tap"
    card = tuple(float(x) for x in sys.argv[3].split("/")) if len(sys.argv) > 3 else (0.24, 1.0)
    # genieFullScreen*RowZoomUpSettings and homeScreenScaleSettings in
    # SBFluidSwitcherAnimationSettings.
    expected = {k: card for k in ["scale", "height", "centerX", "centerY", "cornerRadius", "screenRadius"]}
    expected["homeScale"] = (0.7, 0.88)
    # The home press blocks the main thread for the first frames of the close,
    # so it starts from the open's resting values rather than its first sample.
    rest = {"scale": 1, "height": 874, "centerX": 201, "centerY": 437, "homeScale": 0.88} if marker == "home" else {}
    report = {}
    for name, points in series(path, marker).items():
        t = np.array([p[0] for p in points])
        v = np.array([p[1] for p in points])
        start = rest.get(name, v[0])
        if abs(v[-1] - start) < 1e-6:
            continue
        p = (v - start) / (v[-1] - start)
        v = np.concatenate([[start], v])
        rms, response, ratio, t0 = fit(t, p)
        e_rms, e_t0, e_max = fixed(t, p, *expected[name])
        report[name] = {
            "from": float(v[0]),
            "to": float(v[-1]),
            "fit": {"response": round(float(response), 3), "dampingRatio": round(float(ratio), 2),
                    "start": round(float(t0), 4), "rms": rms},
            "settings": {"response": expected[name][0], "dampingRatio": expected[name][1],
                         "start": round(float(e_t0), 4), "rms": e_rms, "max": e_max},
        }
        print(f"{name:13} {v[0]:9.3f} -> {v[-1]:9.3f}  fit r={response:.3f} z={ratio:.2f} t0={t0:+.3f} "
              f"rms={rms:.4f} | settings r={expected[name][0]} z={expected[name][1]} t0={e_t0:+.4f} "
              f"rms={e_rms:.4f} max={e_max:.4f}")
    json.dump(report, open(path.replace(".jsonl", f"-{marker}-fit.json"), "w"), indent=1)
