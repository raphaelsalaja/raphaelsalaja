# Prints the numbers in one or more classes from settings.jsonl, with every
# nested spring collapsed to one line.
#   python3 flatten.py settings.jsonl SBFluidSwitcherAnimationSettings ...
import json
import sys

SPRING = ("dampingRatio", "response")


def spring(node):
    keys = ["response", "dampingRatio", "trackingResponse", "trackingDampingRatio",
            "retargetImpulse", "deceleration", "behaviorType"]
    parts = [f"{k}={node[k]:.6g}" for k in keys if isinstance(node.get(k), (int, float))]
    return "spring " + " ".join(parts)


def walk(node, path, out):
    if isinstance(node, dict):
        if all(k in node for k in SPRING):
            out.append((path, spring(node)))
            return
        for key in sorted(node):
            if key.startswith("$") and key != "$class":
                continue
            if key == "$class":
                continue
            walk(node[key], f"{path}.{key}" if path else key, out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, f"{path}[{i}]", out)
    elif isinstance(node, bool):
        return
    elif isinstance(node, (int, float)):
        out.append((path, f"{node:.6g}"))
    elif isinstance(node, str) and node.startswith("cubic-bezier"):
        out.append((path, node))


rows = {json.loads(l)["$class"]: json.loads(l) for l in open(sys.argv[1])}
for name in sys.argv[2:]:
    print(f"== {name} ({rows[name].get('$image')})")
    out = []
    walk(rows[name], "", out)
    for path, value in out:
        print(f"  {path} = {value}")
