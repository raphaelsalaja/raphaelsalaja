# Fits springs to the push, pop, sheet and zoom steps sampled by the
# `transitions` command in sbhook.m.
#   python3 fit_transitions.py transitions.jsonl
import json
import sys

import numpy as np

from fit_open import fit, fixed


def steps(path):
    rows = [json.loads(line) for line in open(path)]
    marks = [(r["marker"][11:], r["t"]) for r in rows if r.get("marker", "").startswith("transition:")]
    for (name, t0), (_, t1) in zip(marks, marks[1:]):
        yield name, [r for r in rows if "sample" in r and t0 <= r["t"] < t1], t0


def channel(samples, t0, cls, read, index=0):
    out = []
    for r in samples:
        views = [v for v in r["sample"] if v["class"] == cls]
        if len(views) > index:
            out.append((r["t"] - t0, read(views[index])))
    return out


CHANNELS = {
    "push": [("incoming x", "SBHookScreenB", lambda v: v["frame"][0], (0.5, 1.0)),
             ("outgoing x", "SBHookScreenA", lambda v: v["frame"][0], (0.5, 1.0))],
    "pop": [("outgoing x", "SBHookScreenB", lambda v: v["frame"][0], (0.5, 1.0)),
            ("incoming x", "SBHookScreenA", lambda v: v["frame"][0], (0.5, 1.0))],
    "sheet": [("sheet y", "SBHookScreenB", lambda v: v["frame"][1], (0.3441, 1.0))],
    "sheet-dismiss": [("sheet y", "SBHookScreenB", lambda v: v["frame"][1], (0.3441, 1.0))],
    "zoom": [("source width", "SBHookSource", lambda v: v["frame"][2], (0.4, 1.0))],
    "zoom-pop": [("source width", "SBHookSource", lambda v: v["frame"][2], (0.4, 1.0))],
}

if __name__ == "__main__":
    report = {}
    for name, samples, t0 in steps(sys.argv[1]):
        for label, cls, read, expected in CHANNELS.get(name, []):
            points = channel(samples, t0, cls, read)
            if len(points) < 5:
                continue
            t = np.array([p[0] for p in points])
            v = np.array([p[1] for p in points])
            if abs(v[-1] - v[0]) < 1e-6:
                continue
            p = (v - v[0]) / (v[-1] - v[0])
            rms, response, ratio, start = fit(t, p)
            e_rms, e_start, e_max = fixed(t, p, *expected)
            report[f"{name} {label}"] = {
                "from": float(v[0]), "to": float(v[-1]),
                "fit": {"response": round(float(response), 3), "dampingRatio": round(float(ratio), 2),
                        "start": round(float(start), 4), "rms": rms},
                "expected": {"response": expected[0], "dampingRatio": expected[1], "rms": e_rms, "max": e_max},
            }
            print(f"{name:14} {label:13} {v[0]:8.2f} -> {v[-1]:8.2f}  fit r={response:.3f} z={ratio:.2f} "
                  f"t0={start:+.3f} rms={rms:.4f} | expected {expected} rms={e_rms:.4f}")
    json.dump(report, open(sys.argv[1].replace(".jsonl", "-fit.json"), "w"), indent=1)
