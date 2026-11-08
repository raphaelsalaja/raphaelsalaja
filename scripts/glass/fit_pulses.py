"""Fits the three parts of the morph that go out and come back: the kick, the
lens's displacement and the lens's SDF blur.

    /tmp/glass/venv/bin/python fit_pulses.py out/after

AnimationKit's strings name them in pairs, "Kick" and "Unkick", "Lens on" and
"Lens off", so each is fitted as a spring whose target is set to an amount at
one moment and back to 0 at a later one:

    y(t) = amount * (step(t - on) - step(t - off))

The blur is clamped at 20, the most the LensingSDFLayer ever reads.
"""

import json
import sys
from pathlib import Path

import numpy as np
from scipy.optimize import least_squares

from extract import frame_record
from fit import step
from summarise import runs


def pulse(t, amount, on, off, response, ratio):
    return amount * (step(t - on, response, ratio) - step(t - off, response, ratio))


def fit_pulse(t, y, clamp=None, spring=None):
    def model(x):
        if spring:
            amount, on, off = x
            response, ratio = spring
        else:
            amount, on, off, response, ratio = x
        v = pulse(t, amount, on, off, response, ratio)
        return np.minimum(v, clamp) if clamp is not None else v

    peak = y[np.argmax(np.abs(y))]
    best = None
    for off in (0.05, 0.1, 0.15, 0.25):
        x0 = [peak * 1.5, 0.0, off] + ([] if spring else [0.35, 0.8])
        lower = [-1e4, -0.1, -0.1] + ([] if spring else [0.05, 0.3])
        upper = [1e4, 0.4, 0.8] + ([] if spring else [2.0, 1.5])
        s = least_squares(lambda x: model(x) - y, x0, bounds=(lower, upper))
        rms = float(np.sqrt(np.mean(s.fun**2)))
        if best is None or rms < best[0]:
            best = (rms, list(map(float, s.x)))
    return best


def series(frames, start):
    out = {"kick": [], "source kick": [], "displacement": [], "lens blur": [], "sdf blur": []}
    for f in frames:
        r = frame_record(f, start)
        t = r["t"] / 1000
        if len(r["kick"]) > 1:
            out["kick"].append((t, r["kick"][1][1]))
        if len(r["kick"]) > 2:
            out["source kick"].append((t, r["kick"][2][1]))
        if r.get("displacement") is not None:
            out["displacement"].append((t, r["displacement"]))
        if r.get("lensBlur") is not None:
            out["lens blur"].append((t, r["lensBlur"]))
        if r.get("lensProps"):
            out["sdf blur"].append((t, r["lensProps"]["gaussianRadius"]))
    return {k: (np.array([a for a, _ in v]), np.array([b for _, b in v])) for k, v in out.items() if v}


def main():
    folder = Path(sys.argv[1])
    report = []
    for label, frames in runs(folder):
        data = series(frames, label["t"])
        if not data:
            continue
        run = {}
        print(f"== {label['marker']}")
        for name, (t, y) in data.items():
            if np.max(np.abs(y)) < 0.5:
                continue
            clamp = 20 if name == "sdf blur" else None
            rms, x = fit_pulse(t, y, clamp)
            amount, on, off, response, ratio = x
            line = f"  {name:13s} peak {y[np.argmax(np.abs(y))]:7.2f}  amount {amount:8.2f} on {on * 1000:6.1f}ms off {off * 1000:6.1f}ms r={response:.3f} z={ratio:.3f} rms={rms:.3f}"
            fixed = {}
            for spring_name, spring in {"kick 0.35/0.8": (0.35, 0.8), "kick at speed 0.7": (0.245, 0.8)}.items():
                frms, fx = fit_pulse(t, y, clamp, spring)
                fixed[spring_name] = {"rms": frms, "amount": fx[0], "on": fx[1], "off": fx[2]}
                line += f" | {spring_name} rms={frms:.3f}"
            print(line)
            run[name] = {"amount": amount, "on": on, "off": off, "response": response, "dampingRatio": ratio, "rms": rms, "fixed": fixed}
        report.append({"marker": label["marker"], "pulses": run})
    (folder / "pulses.json").write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main()
