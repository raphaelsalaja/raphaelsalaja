"""Fits springs to each channel extract.py pulls out of a run, and scores the
springs MorphAnimationSettings declares against the same samples.

    /tmp/glass/venv/bin/python fit.py out/after

A channel is normalised to progress from its first value to its settled one.
The kick is an offset that starts and ends at 0, so it's fitted as a spring
released from 0 with a velocity instead.
"""

import json
import math
import sys
from pathlib import Path

import numpy as np
from scipy.optimize import least_squares

from extract import frame_record
from summarise import runs


def step(t, response, ratio):
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


def impulse(t, response, ratio, v0):
    """Offset of a spring at rest at 0, started with velocity v0."""
    t = np.maximum(t, 0)
    w = 2 * math.pi / response
    wd = w * math.sqrt(max(1 - ratio * ratio, 1e-9))
    return v0 * np.exp(-ratio * w * t) * np.sin(wd * t) / wd


def fit_step(t, p):
    def residual(x):
        return step(t - x[2], x[0], x[1]) - p

    best = None
    for r0 in (0.25, 0.35, 0.5):
        for z0 in (0.7, 0.85, 1.0):
            s = least_squares(residual, [r0, z0, 0.05], bounds=([0.05, 0.3, -0.1], [2, 1.5, 0.3]))
            rms = float(np.sqrt(np.mean(s.fun**2)))
            if best is None or rms < best[0]:
                best = (rms, *s.x)
    return best


def fit_fixed(t, p, response, ratio):
    s = least_squares(lambda x: step(t - x[0], response, ratio) - p, [0.05], bounds=([-0.1], [0.3]))
    e = s.fun
    return float(np.sqrt(np.mean(e**2))), float(s.x[0]), float(np.max(np.abs(e)))


def fit_impulse(t, y):
    def residual(x):
        return impulse(t - x[3], x[0], x[1], x[2]) - y

    peak = y[np.argmax(np.abs(y))]
    s = least_squares(residual, [0.35, 0.8, peak * 10, 0.05], bounds=([0.05, 0.2, -1e5, -0.1], [2, 0.999, 1e5, 0.3]))
    return float(np.sqrt(np.mean(s.fun**2))), *s.x


def channels(frames):
    """Each channel as (t seconds, values), from the frames where the morph exists."""
    out = {}
    for r in frames:
        if len(r["shapes"]) < 2 or len(r["morphs"]) < 2:
            continue
        t = r["t"] / 1000
        dest, src = r["shapes"][0], r["shapes"][1]
        kick = next((k[1] for k in r["kick"] if k[1] != 0), 0.0)
        pop = r["morphs"][0]
        fade_in = next(f for f in pop["fades"] if f["source"] == "popover")
        for name, value in {
            "popover width": dest[2],
            "popover height": dest[3],
            "popover centre x": dest[0] + dest[2] / 2,
            "popover centre y": dest[1] + dest[3] / 2 - r["kick"][1][1],
            "source width": src[2],
            "source height": src[3],
            "source centre x": src[0] + src[2] / 2,
            "morph scale": pop["scale"],
            "popover opacity": fade_in["opacity"],
            "popover blur": fade_in["blur"] or 0,
            "reparenting": r["reparenting"][-1] if r["reparenting"] else None,
            "kick y": r["kick"][1][1],
            "source kick y": r["kick"][2][1] if len(r["kick"]) > 2 else 0,
            "lens displacement": r.get("displacement") or 0,
            "lens blur": r.get("lensBlur") or 0,
        }.items():
            if value is not None:
                out.setdefault(name, ([], []))
                out[name][0].append(t)
                out[name][1].append(value)
    return {k: (np.array(a), np.array(b)) for k, (a, b) in out.items()}


DECLARED = {
    "mainEjectSpring": (0.5, 0.75),
    "mainEjectSpring at speed 0.7": (0.5 * 0.7, 0.75),
    "mainAbsorbSpring": (0.7, 0.8),
    "mainAbsorbSpring at speed 0.7": (0.7 * 0.7, 0.8),
    "liquidMorph width": (0.3, 0.8),
    "liquidMorphShrink width": (0.3, 0.9),
}

IMPULSES = {"kick y", "source kick y", "lens displacement", "lens blur"}


def main():
    folder = Path(sys.argv[1])
    report = []
    for label, frames in runs(folder):
        records = [frame_record(f, label["t"]) for f in frames]
        data = channels(records)
        if not data:
            continue
        print(f"== {label['marker']} ({len(records)} frames)")
        run = {"marker": label["marker"], "channels": {}}
        for name, (t, v) in data.items():
            if name in IMPULSES:
                if np.max(np.abs(v)) < 0.5:
                    continue
                rms, response, ratio, v0, t0 = fit_impulse(t, v)
                print(f"  {name:20s} peak {v[np.argmax(np.abs(v))]:8.2f}  fit r={response:.3f} z={ratio:.3f} v0={v0:9.2f} t0={t0 * 1000:6.1f}ms rms={rms:.3f}")
                run["channels"][name] = {"peak": float(v[np.argmax(np.abs(v))]), "response": response, "dampingRatio": ratio, "velocity": v0, "start": t0, "rms": rms}
                continue
            if abs(v[-1] - v[0]) < 1e-3:
                continue
            p = (v - v[0]) / (v[-1] - v[0])
            rms, response, ratio, t0 = fit_step(t, p)
            line = f"  {name:20s} {v[0]:8.2f} -> {v[-1]:8.2f}  fit r={response:.3f} z={ratio:.3f} t0={t0 * 1000:6.1f}ms rms={rms:.4f}"
            scores = {}
            for spring, (dr, dz) in DECLARED.items():
                scores[spring] = fit_fixed(t, p, dr, dz)
            bestname = min(scores, key=lambda k: scores[k][0])
            line += f" | best declared {bestname} rms={scores[bestname][0]:.4f}"
            print(line)
            run["channels"][name] = {
                "from": float(v[0]), "to": float(v[-1]), "response": response, "dampingRatio": ratio, "start": t0, "rms": rms,
                "declared": {k: {"rms": s[0], "start": s[1], "max": s[2]} for k, s in scores.items()},
            }
        report.append(run)
    (folder / "fit.json").write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main()
