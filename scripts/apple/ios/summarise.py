# Prints every animation in a settings class as one line: springs as response
# and damping ratio, basic animations as duration, curve and control points.
#   python3 summarise.py settings.jsonl Class ...
import json
import math
import sys


def walk(value, prefix, out):
    if isinstance(value, dict):
        if "animationType" in value and "stiffness" in value:
            if value["animationType"] == 1:
                m, k, c = value["mass"], value["stiffness"], value["damping"]
                out.append(f"  {prefix:48} spring m={m} k={k} c={c} -> response={2 * math.pi / math.sqrt(k / m):.4f} "
                           f"ratio={c / (2 * math.sqrt(k * m)):.4f} delay={value['delay']} speed={value['speed']}")
            else:
                a, b = value["controlPoint1Settings"], value["controlPoint2Settings"]
                out.append(f"  {prefix:48} basic duration={value['duration']} curve={value['curve']} "
                           f"delay={value['delay']} cp=({a['x']}, {a['y']}, {b['x']}, {b['y']})")
            return
        if "response" in value and "dampingRatio" in value:
            out.append(f"  {prefix:48} fluid response={value['response']} ratio={value['dampingRatio']}"
                       + (f" tracking={value.get('trackingResponse')}/{value.get('trackingDampingRatio')}"
                          if "trackingResponse" in value else ""))
            return
        for key, item in value.items():
            if not key.startswith("$"):
                walk(item, f"{prefix}.{key}".strip("."), out)
    elif isinstance(value, (int, float)) and not isinstance(value, bool):
        out.append(f"  {prefix:48} = {value}")


rows = {}
for line in open(sys.argv[1]):
    if line.startswith("{"):
        row = json.loads(line)
        if "$class" in row:
            rows[row["$class"]] = row
for name in sys.argv[2:]:
    if name.startswith("~"):
        print("\n".join(c for c in rows if name[1:].lower() in c.lower()))
        continue
    out = []
    walk(rows.get(name, {}), "", out)
    print(f"== {name}")
    print("\n".join(out))
