"""Turns samples.jsonl into one series per run of the morph's moving parts.

    python3 extract.py out/after           prints each run's frames
    python3 extract.py out/after out.json  and writes them as JSON

Every value is read from the presentation tree the hook walked:

  shapes      the CASDFElementLayers the lens unions, in window points: the
              popover's and the source's, each as x, y, width, height after
              its own transform
  kick        the KickView's y translation, the whole morph's offset
  lens        the LensingLayer's displacementMap amount and gaussianBlur radius
  fades       each MagicMorphTransformLayer: what it shows, opacity and blur
  popover     the _UIPopoverView's frame and opacity
"""

import json
import sys
from pathlib import Path

from summarise import runs


def transformed(layer):
    x, y, w, h = layer["frame"]
    return [round(v, 3) for v in (x, y, w, h)]


def filter_value(layer, name, key):
    for f in layer.get("filters", []):
        if f.get("name") == name:
            return f.get(key)
    return None


def source_of(name: str) -> str:
    if "_UIPopoverView" in name:
        return "popover"
    if "PivotView" in name:
        return "pivot"
    if "GlassInteractionView" in name:
        return "glass"
    return name.split("source = ")[-1][:40]


def frame_record(frame, start):
    layers = frame["layers"]
    out = {"t": round((frame["t"] - start) * 1000, 2)}
    # The lens's own SDF elements sit directly under the LensingSDFLayer.
    shapes, inside_lens, lens_depth = [], False, None
    morphs, fades, kicks = [], [], []
    current_morph = None
    for layer in layers:
        name = layer["name"]
        depth = layer["depth"]
        if inside_lens and depth <= lens_depth:
            inside_lens = False
        if "LensingSDFLayer#" in name:
            inside_lens, lens_depth = True, depth
            out["lensProps"] = {k: layer["props"].get(k) for k in ("gaussianRadius", "smoothness", "effectOffset")}
            continue
        if inside_lens and name == "CASDFElementLayer":
            shapes.append(transformed(layer))
        if name.endswith("#LiquidMorphAnimation.LensingLayer"):
            out["displacement"] = filter_value(layer, "displacementMap", "inputAmount")
            out["lensBlur"] = filter_value(layer, "gaussianBlur", "inputRadius")
        if "KickView" in name:
            t = layer.get("transform")
            kicks.append([round(t[4], 4), round(t[5], 4)] if t else [0, 0])
        if name.startswith("UIKit.MagicMorphView/_UIMultiLayer"):
            t = layer.get("transform")
            current_morph = {"frame": transformed(layer), "scale": round(t[0], 5) if t else 1, "fades": []}
            morphs.append(current_morph)
        if "MagicMorphTransformLayer" in name and current_morph is not None:
            t = layer.get("transform")
            current_morph["fades"].append(
                {
                    "source": source_of(name),
                    "opacity": round(layer["opacity"], 5),
                    "blur": filter_value(layer, "gaussianBlur", "inputRadius"),
                    "scale": round(t[0], 5) if t else 1,
                    "frame": transformed(layer),
                }
            )
        if name.startswith("_UIPopoverView/_UIMultiLayer"):
            out["popover"] = {"frame": transformed(layer), "opacity": layer["opacity"]}
        if name.startswith("UIKit._UIReparentingView"):
            fades.append(round(layer["opacity"], 5))
        if name.startswith("SwiftUI._UIInheritedView/SwiftUI.SDFLayer"):
            out["button"] = transformed(layer)
    out["shapes"] = shapes
    out["kick"] = kicks
    out["morphs"] = morphs
    out["reparenting"] = fades
    return out


def main():
    folder = Path(sys.argv[1])
    result = []
    for label, frames in runs(folder):
        start = label["t"]
        series = [frame_record(f, start) for f in frames]
        result.append({"marker": label["marker"], "source": label.get("source"), "frames": series})
        print(f"== {label['marker']} source={label.get('source')}")
        for r in series:
            if not r["morphs"] and not r["shapes"]:
                continue
            shapes = " | ".join(" ".join(f"{v:7.2f}" for v in s) for s in r["shapes"])
            fades = " ".join(
                f"[{m['scale']:.3f} " + " ".join(f"{f['source'][:3]} a{f['opacity']:.3f} b{(f['blur'] or 0):.2f}" for f in m["fades"]) + "]"
                for m in r["morphs"]
            )
            print(
                f"{r['t']:7.1f} kick={r['kick']} disp={r.get('displacement') or 0:7.2f} blur={r.get('lensBlur') or 0:5.2f}"
                f" shapes={shapes}\n          {fades} rep={r['reparenting']}"
            )
    if len(sys.argv) > 2:
        Path(sys.argv[2]).write_text(json.dumps(result))


if __name__ == "__main__":
    main()
