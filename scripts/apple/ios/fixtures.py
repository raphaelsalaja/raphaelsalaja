# Writes the UIKit and SpringBoard fixtures in content/work/apple/fixtures from
# the Simulator captures.
#   python3 fixtures.py <out27> <content/work/apple/fixtures>
import json
import sys
from pathlib import Path

src, dst = Path(sys.argv[1]), Path(sys.argv[2])


def rows(name):
    return [json.loads(line) for line in open(src / name)]


def after(log, marker, until=("tap", "home", "probe:animateWithDuration")):
    t0 = [r["t"] for r in log if r.get("marker") == marker][-1]
    later = [r["t"] for r in log if r.get("marker") in until and r["t"] > t0]
    t1 = later[0] if later else float("inf")
    return t0, [r for r in log if "sample" in r and t0 <= r["t"] < t1]


def card(log, marker):
    t0, samples = after(log, marker)
    out = {"t": [], "scale": [], "height": [], "centerX": [], "centerY": [], "cornerRadius": [], "homeScale": []}
    for r in samples:
        by = {}
        for v in r["sample"]:
            by.setdefault(v["class"], []).append(v)
        overlay = [v for v in by.get("SBFluidSwitcherSpaceOverlayAccessoryView", []) if v["opacity"] > 0]
        folder = by.get("SBRootFolderView")
        if not overlay or not folder:
            continue
        o = overlay[0]
        x, y, w, h = o["frame"]
        out["t"].append(round(r["t"] - t0, 6))
        out["scale"].append(o["scale"][0])
        out["height"].append(o["bounds"][1])
        out["centerX"].append(x + w / 2)
        out["centerY"].append(y + h / 2)
        out["cornerRadius"].append(o["cornerRadius"])
        out["homeScale"].append(folder[0]["frame"][2] / 402)
    return out


def probe(log):
    result = [r["probe"] for r in log if "probe" in r][-1]
    marks = [(r["marker"][6:], r["t"]) for r in log if r.get("marker", "").startswith("probe:")]
    calls = []
    for (name, t0), (_, t1) in zip(marks, marks[1:]):
        for r in log:
            if r.get("class") in ("CASpringAnimation", "CABasicAnimation") and t0 <= r["t"] < t1 \
                    and r.get("keyPath") == "position":
                calls.append({"call": name, **{k: r.get(k) for k in
                              ("class", "duration", "mass", "stiffness", "damping", "timing")}})
    return {**result, "animations": calls}


def transitions(log):
    marks = [(r["marker"][11:], r["t"]) for r in log if r.get("marker", "").startswith("transition:")]
    out = {}
    for (name, t0), (_, t1) in zip(marks, marks[1:]):
        series = {"t": [], "incoming": [], "outgoing": [], "source": []}
        for r in log:
            if "sample" not in r or not t0 <= r["t"] < t1:
                continue
            by = {v["class"]: v for v in r["sample"]}
            a, b, s = by.get("SBHookScreenA"), by.get("SBHookScreenB"), by.get("SBHookSource")
            if not a or not b:
                continue
            series["t"].append(round(r["t"] - t0, 6))
            series["incoming"].append(b["frame"][1] if name.startswith("sheet") else b["frame"][0])
            series["outgoing"].append(a["frame"][0])
            series["source"].append(s["frame"][2] if s else None)
        out[name] = series
    return out


def genie(log, width=402, height=874):
    """Each open and close's mesh on the screen, with the crop's progress read
    off the mesh itself (the samples lag the property values by a frame)."""
    marks = [i for i, r in enumerate(log) if r.get("marker") in ("tap", "home")]
    runs, icon, app = [], None, None
    for n, i in enumerate(marks):
        mark = log[i]
        end = marks[n + 1] if n + 1 < len(marks) else len(log)
        if mark["marker"] == "tap":
            x, y = [float(v) for v in mark["iconFrame"].strip("{}").split("}")[0].strip("{").split(",")]
            icon, app = [round(x, 3), round(y, 3), 64, 64], mark["bundle"]
        # The animated perform is mode 3. Its first 18 springs are the vertex
        # coordinates, six a row, and the last is the layout spring.
        segment = log[i:end]
        springs = [r["genieSpring"]["response"] for r in segment if "genieSpring" in r and r["mode"] == 3]
        responses = [round(springs[row * 6], 6) for row in range(3)]
        samples = []
        for r in segment:
            for m in r.get("sample", []):
                if m.get("class") != "genieMesh" or not m["vertices"]:
                    continue
                layer = m["vertices"][3][1] * 2 * height
                p = 1 - (layer - height) / (width - height)
                if not 0.001 < p < 0.999:
                    continue
                fx, fy, fw, fh = m["frame"]
                samples.append({
                    "progress": round(p, 6),
                    "vertices": [[round(fx + v[2] * fw, 3), round(fy + v[3] * fh, 3)] for v in m["vertices"]],
                })
        runs.append({"app": app, "open": mark["marker"] == "tap", "icon": icon, "responses": responses, "samples": samples})
    # `meshtest`: a 3×3 mesh with the left edge's middle vertex pulled out by
    # 0.15, and where Core Animation drew that edge, down its upper half.
    left = json.load(open(src / "meshtest.json"))["left"]
    edge = [[t, round(min(left, key=lambda p: abs(p[0] - t))[1], 4)] for t in (0.1, 0.25, 0.4, 0.5)]
    return {"screen": [width, height], "runs": runs, "meshTest": {"pull": -0.15, "edge": edge}}


openclose = rows("animations-openclose.jsonl")
json.dump(genie(rows("animations-genie.jsonl")), open(dst / "genie.json", "w"))
springboard = {
    "screen": [402, 874],
    "icon": [308, 391, 64, 64],
    "iconCornerRadius": 16.64,
    "displayCornerRadius": 62,
    "open": card(openclose, "tap"),
    "close": card(openclose, "home"),
}
json.dump(springboard, open(dst / "springboard.json", "w"))

uikit = {"probe": probe(openclose), "transitions": transitions(rows("transitions.jsonl"))}
json.dump(uikit, open(dst / "uikit.json", "w"))
print({k: len(v["t"]) for k, v in springboard.items() if isinstance(v, dict)},
      {k: len(v["t"]) for k, v in uikit["transitions"].items()}, len(uikit["probe"]["animations"]))
