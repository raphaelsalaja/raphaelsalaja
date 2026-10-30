import type { CSSProperties } from "react";
import { Figure, figure } from "@/components/writing/figure";
import styles from "./styles.module.css";

export { MatchDemo } from "./demo";

const CX = 150;
const HALF_W = 96;
const HALF_H = 30;
const TOP = 42;
const GAP = 50;

type Point = [number, number];

function iso(cy: number) {
  const l: Point = [CX - HALF_W, cy];
  const t: Point = [CX, cy - HALF_H];
  const b: Point = [CX, cy + HALF_H];
  return (u: number, v: number): Point => [
    l[0] + u * (t[0] - l[0]) + v * (b[0] - l[0]),
    l[1] + u * (t[1] - l[1]) + v * (b[1] - l[1]),
  ];
}

const poly = (points: Point[]) =>
  `M${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`;

const line = (points: Point[]) =>
  `M${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}`;

const range = (from: number, to: number, steps: number) =>
  Array.from({ length: steps + 1 }, (_, i) => from + ((to - from) * i) / steps);

const layers = [
  {
    name: "Radius, shadow",
    note: "What gets copied",
    detail: (p: ReturnType<typeof iso>) => (
      <path
        className={figure.faint}
        d={poly([p(0.16, 0.16), p(0.84, 0.16), p(0.84, 0.84), p(0.16, 0.84)])}
      />
    ),
  },
  {
    name: "Spacing",
    note: "8, 12, 16, 24",
    detail: (p: ReturnType<typeof iso>) =>
      range(0.2, 0.8, 3).flatMap((u) =>
        range(0.2, 0.8, 3).map((v) => {
          const [x, y] = p(u, v);
          return (
            <circle
              key={`${u}-${v}`}
              className={figure.dot}
              cx={x}
              cy={y}
              r={1}
            />
          );
        }),
      ),
  },
  {
    name: "Type",
    note: "13 on 20, weight 450",
    detail: (p: ReturnType<typeof iso>) =>
      [
        [0.3, 0.72],
        [0.5, 0.8],
        [0.7, 0.56],
      ].map(([v, end]) => (
        <path
          key={v}
          className={figure.line}
          d={line([p(0.2, v), p(end, v)])}
        />
      )),
  },
  {
    name: "Timing",
    note: "180ms in, 120ms out",
    detail: (p: ReturnType<typeof iso>) => (
      <path
        className={figure.line}
        d={line(
          range(0, 1, 40).map((t) =>
            p(0.15 + 0.7 * t, 0.85 - 0.7 * (1 - (1 - t) ** 3)),
          ),
        )}
      />
    ),
  },
];

export function LayersFigure() {
  return (
    <figure
      className={figure.figure}
      aria-label="An interface drawn as four stacked layers. From above you only see the top one, radius and shadow. Pulled apart, it shows spacing, type and timing underneath."
    >
      <svg
        className={figure.svg}
        viewBox="0 0 480 232"
        fill="none"
        aria-hidden="true"
      >
        {layers
          .map((layer, i) => {
            const cy = TOP + GAP * i;
            const p = iso(cy);
            return (
              <g
                key={layer.name}
                className={i > 0 ? styles.layer : undefined}
                style={{ "--collapse": `${-GAP * i}px` } as CSSProperties}
              >
                <path
                  className={figure.plane}
                  d={poly([p(0, 0), p(1, 0), p(1, 1), p(0, 1)])}
                />
                {layer.detail(p)}
                <g className={i > 0 ? styles.label : undefined}>
                  <path
                    className={figure.guide}
                    d={`M${CX + HALF_W + 8} ${cy}H300`}
                  />
                  <text className={figure.text} x={308} y={cy - 2}>
                    {layer.name}
                  </text>
                  <text className={figure.quiet} x={308} y={cy + 11}>
                    {layer.note}
                  </text>
                </g>
              </g>
            );
          })
          .reverse()}
      </svg>
    </figure>
  );
}

const FRAMES = 8;
const FRAME = { width: 48, height: 64, gap: 6, y: 24 };
const MENU = { dx: 6, dy: 16, width: 36, height: 40 };
const SHADOW_FROM = 3;
const CONTENT_FROM = 5;
const STRIP_X = (480 - FRAMES * FRAME.width - (FRAMES - 1) * FRAME.gap) / 2;

const frames = Array.from({ length: FRAMES }, (_, i) => ({
  x: STRIP_X + i * (FRAME.width + FRAME.gap),
  scale: 1 - (1 - i / (FRAMES - 1)) ** 3,
  shadow: i >= SHADOW_FROM,
  content: i >= CONTENT_FROM,
}));

const notes = [
  { frame: 0, text: "Starts at the button", anchor: "start" },
  { frame: SHADOW_FROM, text: "Shadow arrives", anchor: "middle" },
  { frame: CONTENT_FROM, text: "Then the content", anchor: "middle" },
] as const;

export function FramesFigure() {
  return (
    <Figure
      label="Eight frames of a menu opening, about 117 milliseconds at 60 frames a second. It grows from the button that opened it, the shadow arrives on the fourth frame, and the content appears on the sixth."
      viewBox="0 0 480 116"
      labels={["0ms", "117ms"]}
    >
      {frames.map(({ x, scale, shadow, content }) => {
        const mx = x + MENU.dx;
        const my = FRAME.y + MENU.dy;
        const width = MENU.width * scale;
        const height = MENU.height * scale;
        return (
          <g key={x}>
            <rect
              className={figure.faint}
              x={x}
              y={FRAME.y}
              width={FRAME.width}
              height={FRAME.height}
              rx={4}
            />
            <rect
              className={figure.hollow}
              x={mx}
              y={FRAME.y + 6}
              width={14}
              height={6}
              rx={2}
            />
            {shadow && (
              <rect
                className={figure.faint}
                x={mx + 1.5}
                y={my + 2.5}
                width={width}
                height={height}
                rx={3}
              />
            )}
            {scale > 0 && (
              <rect
                className={figure.plane}
                x={mx}
                y={my}
                width={width}
                height={height}
                rx={3}
              />
            )}
            {content &&
              [22, 26, 18].map((length, line) => (
                <path
                  key={length}
                  className={figure.faint}
                  d={`M${mx + 6} ${my + 9 + line * 9}h${length * scale}`}
                />
              ))}
          </g>
        );
      })}
      {notes.map(({ frame, text, anchor }) => {
        const { x } = frames[frame];
        return (
          <text
            key={text}
            className={figure.quiet}
            x={anchor === "start" ? x : x + FRAME.width / 2}
            y={FRAME.y + FRAME.height + 18}
            textAnchor={anchor}
          >
            {text}
          </text>
        );
      })}
    </Figure>
  );
}
