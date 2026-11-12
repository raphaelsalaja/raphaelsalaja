"""Prints what samples.jsonl recorded, a frame at a time.

    python3 summarise.py out/after            every layer name seen, with counts
    python3 summarise.py out/after Lensing    each frame's layers matching a name
"""

import json
import sys
from collections import Counter
from pathlib import Path


def runs(folder: Path):
    """Splits the samples into one list per toggle, menu or sample marker."""
    current, label = [], None
    for line in (folder / "samples.jsonl").open():
        entry = json.loads(line)
        if "marker" in entry:
            if entry["marker"] in ("toggle", "menu", "menu-close", "sample"):
                if current:
                    yield label, current
                current, label = [], entry
            continue
        current.append(entry)
    if current:
        yield label, current


def main():
    folder = Path(sys.argv[1])
    wanted = sys.argv[2:] or None
    for label, frames in runs(folder):
        start = label["t"] if label else frames[0]["t"]
        print(f"== {label and label['marker']} {len(frames)} frames")
        if not wanted:
            names = Counter(layer["name"].split("#")[0] for f in frames for layer in f["layers"])
            for name, count in names.most_common():
                print(f"  {count:5d} {name[:140]}")
            continue
        for f in frames:
            hits = [l for l in f["layers"] if any(w in l["name"] for w in wanted)]
            for l in hits:
                x, y, w, h = l["frame"]
                extra = {k: l[k] for k in ("opacity", "cornerRadius", "transform") if k in l}
                props = l.get("props", {})
                keep = {k: v for k, v in props.items() if not isinstance(v, str) or len(v) < 80}
                print(
                    f"  {(f['t'] - start) * 1000:7.1f} {l['id'][-6:]} {l['name'].split('/')[-1][:40]:40s}"
                    f" {x:7.2f} {y:7.2f} {w:7.2f} {h:7.2f} {extra} {keep if '-p' in sys.argv[0:1] else ''}"
                )


if __name__ == "__main__":
    main()
