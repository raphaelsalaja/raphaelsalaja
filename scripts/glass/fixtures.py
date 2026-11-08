"""Writes the observed morph as the fixture the package's parity tests and the
post's figures read.

    python3 fixtures.py out/after-clean out/before

Times are seconds from the toggle. Every rect is in window points, as the
presentation layer drew it, kick included.
"""

import json
import sys
from pathlib import Path

from extract import frame_record
from summarise import runs

HERE = Path(__file__).parent
TARGETS = [
    HERE / "../../content/work/glass-menu/fixtures/glass.json",
    HERE / "../../../springboard/packages/springboard/src/fixtures/glass.json",
]


def box(frame):
    x, y, w, h = frame
    return [round(x + w / 2, 3), round(y + h / 2, 3), round(w, 3), round(h, 3)]


def series(folder):
    out = []
    for label, frames in runs(Path(folder)):
        rows = []
        for f in frames:
            r = frame_record(f, label["t"])
            if len(r["morphs"]) < 1:
                continue
            popover = r["morphs"][0]
            source = r["morphs"][1] if len(r["morphs"]) > 1 else None
            fade = next((x for x in popover["fades"] if x["source"] == "popover"), None)
            kicks = r["kick"] + [[0, 0]] * 3
            rows.append(
                {
                    "t": round(r["t"] / 1000, 5),
                    "popover": box(popover["frame"]),
                    "scale": popover["scale"],
                    "opacity": fade["opacity"] if fade else None,
                    "source": box(source["frame"]) if source else None,
                    "kick": kicks[1][1],
                    "sourceKick": kicks[2][1],
                    "lens": r.get("displacement"),
                    "lensBlur": r.get("lensBlur"),
                    "field": (r.get("lensProps") or {}).get("gaussianRadius"),
                }
            )
        out.append({"open": len(out) == 0, "frames": rows})
    return out


def main():
    after, before = sys.argv[1], sys.argv[2]
    fixture = {
        "device": "iPhone 18 Pro, iOS 27.0 (24A434)",
        "button": [314, 762, 56, 46],
        "buttonRadius": 23,
        "popover": [235.333, 620, 156.667, 220],
        "popoverRadius": 34,
        # The "+" image's frame, from where the popover's morph starts.
        "label": [326.333, 769.333, 32, 32],
        "after": series(after),
        "before": series(before),
    }
    for target in TARGETS:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(fixture, separators=(",", ":")))
        print(target.resolve(), len(target.read_text()))


if __name__ == "__main__":
    main()
