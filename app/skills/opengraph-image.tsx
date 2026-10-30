import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import { ogFonts, ogSize } from "@/lib/og";

export const alt = "Skills";
export const size = ogSize;
export const contentType = "image/png";

const FRAME = 340;
const ARM = 28;
const MARK = "1.5px solid #cfceca";

const BASE = 200;
const HEIGHT = 70;
const TAPER = 18;
const SCALE = 1.05;
const YAW = (18 * Math.PI) / 180;

type Point = readonly [number, number];

function lift(x: number, y: number, z: number): Point {
  const dx = x - BASE / 2;
  const dy = y - BASE / 2;
  const rx = dx * Math.cos(YAW) - dy * Math.sin(YAW);
  const ry = dx * Math.sin(YAW) + dy * Math.cos(YAW);
  return [rx * SCALE, (ry * 0.5 - z) * SCALE];
}

function roundedRect(x: number, y: number, size: number, r: number): Point[] {
  const centers: [number, number, number][] = [
    [x + size - r, y + r, -90],
    [x + size - r, y + size - r, 0],
    [x + r, y + size - r, 90],
    [x + r, y + r, 180],
  ];
  return centers.flatMap(([cx, cy, start]) =>
    Array.from({ length: 11 }, (_, i) => {
      const angle = ((start + i * 9) * Math.PI) / 180;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as Point;
    }),
  );
}

function hull(points: Point[]) {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Point, a: Point, b: Point) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const build = (list: Point[]) => {
    const out: Point[] = [];
    for (const p of list) {
      while (
        out.length >= 2 &&
        cross(out[out.length - 2], out[out.length - 1], p) <= 0
      ) {
        out.pop();
      }
      out.push(p);
    }
    out.pop();
    return out;
  };
  return [...build(sorted), ...build([...sorted].reverse())];
}

const svgPoints = (points: Point[]) =>
  points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

function corner(style: CSSProperties) {
  return (
    <div style={{ position: "absolute", width: ARM, height: ARM, ...style }} />
  );
}

export default async function Image() {
  const top = BASE - TAPER * 2;
  const bounds = [
    ...roundedRect(0, 0, BASE, 30).map(([x, y]) => lift(x, y, 0)),
    ...roundedRect(TAPER, TAPER, top, 24).map(([x, y]) => lift(x, y, HEIGHT)),
  ];
  const xs = bounds.map(([x]) => x);
  const ys = bounds.map(([, y]) => y);
  const shiftX = ogSize.width / 2 - (Math.min(...xs) + Math.max(...xs)) / 2;
  const shiftY = ogSize.height / 2 - (Math.min(...ys) + Math.max(...ys)) / 2;
  const face = (points: Point[], z: number) =>
    points.map(([x, y]) => {
      const [px, py] = lift(x, y, z);
      return [px + shiftX, py + shiftY] as Point;
    });
  const base = face(roundedRect(0, 0, BASE, 30), 0);
  const cap = face(roundedRect(TAPER, TAPER, top, 24), HEIGHT);
  const dish = face(
    roundedRect(TAPER + 10, TAPER + 10, top - 20, 18),
    HEIGHT - 3,
  );
  const legend = ([u, v]: Point): Point => [BASE / 2 + u, BASE / 2 - v];
  const glyph = face(
    (
      [
        [-14, -42],
        [-5, -42],
        [14, 42],
        [5, 42],
      ] as Point[]
    ).map(legend),
    HEIGHT - 3,
  );
  const left = Math.min(...base.map(([x]) => x));
  const right = Math.max(...base.map(([x]) => x));
  const edge = (face([[BASE, BASE]], 0)[0][0] - left) / (right - left);
  const dishTop = Math.min(...dish.map(([, y]) => y));
  const dishBottom = Math.max(...dish.map(([, y]) => y));

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        fontFamily: "Inter",
        fontWeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: (ogSize.width - FRAME) / 2,
          top: (ogSize.height - FRAME) / 2,
          width: FRAME,
          height: FRAME,
        }}
      >
        {corner({ left: 0, top: 0, borderLeft: MARK, borderTop: MARK })}
        {corner({ right: 0, top: 0, borderRight: MARK, borderTop: MARK })}
        {corner({ left: 0, bottom: 0, borderLeft: MARK, borderBottom: MARK })}
        {corner({ right: 0, bottom: 0, borderRight: MARK, borderBottom: MARK })}
      </div>
      <svg
        width={ogSize.width}
        height={ogSize.height}
        viewBox={`0 0 ${ogSize.width} ${ogSize.height}`}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="contact" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient
            id="sides"
            x1={left}
            y1="0"
            x2={right}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#e9e8e6" />
            <stop offset={edge - 0.03} stopColor="#e2e1de" />
            <stop offset={edge + 0.03} stopColor="#d6d5d1" />
            <stop offset="1" stopColor="#cfceca" />
          </linearGradient>
          <linearGradient
            id="dish"
            x1="0"
            y1={dishTop}
            x2="0"
            y2={dishBottom}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f1f0ef" />
            <stop offset="1" stopColor="#f9f9f8" />
          </linearGradient>
        </defs>
        <polygon
          points={svgPoints(face(roundedRect(24, 4, BASE, 30), 0))}
          fill="#000000"
          opacity={0.14}
          filter="url(#shadow)"
        />
        <polygon
          points={svgPoints(base)}
          fill="#000000"
          opacity={0.14}
          filter="url(#contact)"
        />
        <polygon
          points={svgPoints(hull([...base, ...cap]))}
          fill="url(#sides)"
        />
        <polygon
          points={svgPoints(cap)}
          fill="#fdfdfc"
          stroke="#ffffff"
          strokeOpacity={0.8}
          strokeWidth={1.5}
        />
        <polygon points={svgPoints(dish)} fill="url(#dish)" />
        <polygon
          points={svgPoints(glyph)}
          fill="#343433"
          stroke="#343433"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 52,
          display: "flex",
          fontSize: 40,
          letterSpacing: -0.9,
          color: "#343433",
        }}
      >
        Skills
      </div>
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
