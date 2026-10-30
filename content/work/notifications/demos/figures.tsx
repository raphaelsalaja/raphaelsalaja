"use client";

import { type CSSProperties, useId } from "react";
import base from "@/content/work/command-menu/demos/figures.module.css";
import styles from "./figures.module.css";

const COS = Math.cos(Math.PI / 6);
const BLUE = "#3d6df2";
const ORANGE = "#ef7d1c";

function points(list: [number, number][]) {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

function tone(color: string) {
  return { "--figure-accent": color } as CSSProperties;
}

export function Layers() {
  const id = useId();
  const width = 520;
  const depth = 68;
  const k = 0.5;
  const ox = 240;
  const oy = 172;
  const gap = 54;
  const iso = (x: number, y: number, z: number): [number, number] => [
    ox + (x - y) * k * COS,
    oy + (x + y) * k * 0.5 - z,
  ];
  const rect = (x0: number, y0: number, x1: number, y1: number, z: number) =>
    points([iso(x0, y0, z), iso(x1, y0, z), iso(x1, y1, z), iso(x0, y1, z)]);
  const left = iso(0, 0, 0)[0] - depth * k * COS;
  const right = iso(width, 0, 0)[0];

  const stripes = Array.from({ length: 18 }, (_, index) => {
    const c = width * 0.32 + index * 24;
    return { c, opacity: 0.1 + 0.6 * smoothstep(0.32, 1, c / width) };
  });

  const layers = [
    {
      name: "Content",
      spec: "icon · title · description · action",
      draw: (z: number) => (
        <>
          <polygon
            className={base.sheet}
            points={rect(0, 0, width, depth, z)}
          />
          <polygon className={styles.dot} points={rect(16, 16, 32, 32, z)} />
          <polygon className={base.ink} points={rect(40, 18, 150, 26, z)} />
          <polygon className={base.faint} points={rect(40, 40, 270, 47, z)} />
          <polygon className={base.plate} points={rect(436, 20, 504, 48, z)} />
        </>
      ),
    },
    {
      name: "Border",
      spec: "1px · CSS mask · neutral → tone",
      draw: (z: number) => (
        <polygon
          className={styles.ring}
          stroke={`url(#${id}-ring)`}
          points={rect(0, 0, width, depth, z)}
        />
      ),
    },
    {
      name: "Tint",
      spec: "WebGL · fade × pattern × wipe",
      draw: (z: number) => (
        <>
          <polygon
            className={base.sheet}
            points={rect(0, 0, width, depth, z)}
          />
          <g clipPath={`url(#${id}-clip)`}>
            {stripes.map(({ c, opacity }) => (
              <polyline
                key={c}
                className={styles.stripe}
                style={{ opacity }}
                points={points([iso(c, 0, z), iso(c - depth, depth, z)])}
              />
            ))}
          </g>
        </>
      ),
    },
    {
      name: "Surface",
      spec: "520 × 68 · r14 · two shadows",
      draw: (z: number) => (
        <polygon className={base.plate} points={rect(0, 0, width, depth, z)} />
      ),
    },
  ].map((layer, index, all) => ({
    ...layer,
    z: (all.length - 1 - index) * gap,
  }));
  const tintZ = layers[2].z;

  return (
    <figure
      className={base.figure}
      style={tone(ORANGE)}
      aria-label="An exploded view of the warning notification: the surface, the shader tint, the border, and the content, stacked from bottom to top."
    >
      <svg className={base.svg} viewBox="0 0 560 330" aria-hidden="true">
        <defs>
          <clipPath id={`${id}-clip`}>
            <polygon points={rect(width * 0.32, 0, width, depth, tintZ)} />
          </clipPath>
          <linearGradient
            id={`${id}-ring`}
            gradientUnits="userSpaceOnUse"
            x1={left}
            x2={right}
          >
            <stop offset="0.35" stopColor="var(--figure-line)" />
            <stop offset="1" stopColor="var(--figure-accent)" />
          </linearGradient>
        </defs>

        {[
          [0, 0],
          [width, 0],
          [width, depth],
        ].map(([cx, cy]) => {
          const [x, y] = iso(cx, cy, 0);
          return (
            <path
              key={`${cx}-${cy}`}
              className={base.guide}
              d={`M${x} ${y}V${y - layers[0].z}`}
            />
          );
        })}

        {[...layers].reverse().map((layer) => (
          <g key={layer.name}>{layer.draw(layer.z)}</g>
        ))}

        {layers.map((layer) => {
          const [x, y] = iso(0, depth, layer.z);
          return (
            <g key={layer.name}>
              <path className={base.leader} d={`M${x} ${y}H196`} />
              <circle className={base.knot} cx={x} cy={y} r="1.5" />
              <text className={base.name} x="190" y={y - 2} textAnchor="end">
                {layer.name}
              </text>
              <text className={base.spec} x="190" y={y + 10} textAnchor="end">
                {layer.spec}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function Recipe() {
  const id = useId();
  const width = 116;
  const height = 44;
  const top = 34;
  const panels = [
    { name: "Fade", spec: "smoothstep 0.32 → 1" },
    { name: "Pattern", spec: "one per type · 0 → 1" },
    { name: "Wipe", spec: "right → left · 0.9s" },
    { name: "Tint", spec: "base + pattern × gain" },
  ].map((panel, index) => ({ ...panel, x: 2 + index * 148 }));

  const fade = Array.from({ length: 9 }, (_, index) => {
    const offset = index / 8;
    return { offset, value: smoothstep(0.32, 1, offset) };
  });

  return (
    <figure
      className={base.figure}
      style={tone(ORANGE)}
      aria-label="The tint is a horizontal fade, multiplied by a pattern, multiplied by a wipe that runs from right to left when the card arrives. The warning card's stripes stand in for the pattern."
    >
      <svg className={base.svg} viewBox="0 0 560 120" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-fade`}>
            {fade.map(({ offset, value }) => (
              <stop
                key={offset}
                offset={offset}
                stopColor="var(--figure-accent)"
                stopOpacity={value * 0.5}
              />
            ))}
          </linearGradient>
          <pattern
            id={`${id}-stripes`}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect
              width="5"
              height="10"
              fill="var(--figure-accent)"
              opacity="0.35"
            />
          </pattern>
          <mask id={`${id}-mask`}>
            <rect
              y={top}
              width={width}
              height={height}
              fill={`url(#${id}-bright)`}
            />
          </mask>
          <linearGradient id={`${id}-bright`}>
            {fade.map(({ offset, value }) => (
              <stop
                key={offset}
                offset={offset}
                stopColor="#fff"
                stopOpacity={value}
              />
            ))}
          </linearGradient>
          {panels.map((panel) => (
            <clipPath key={panel.name} id={`${id}-${panel.name}`}>
              <rect x={panel.x} y={top} width={width} height={height} rx="8" />
            </clipPath>
          ))}
        </defs>

        {panels.map((panel, index) => (
          <g key={panel.name}>
            <rect
              className={base.plate}
              x={panel.x}
              y={top}
              width={width}
              height={height}
              rx="8"
            />
            <g clipPath={`url(#${id}-${panel.name})`}>
              {panel.name === "Fade" && (
                <rect
                  x={panel.x}
                  y={top}
                  width={width}
                  height={height}
                  fill={`url(#${id}-fade)`}
                />
              )}
              {panel.name === "Pattern" && (
                <rect
                  x={panel.x}
                  y={top}
                  width={width}
                  height={height}
                  fill={`url(#${id}-stripes)`}
                />
              )}
              {panel.name === "Wipe" && (
                <>
                  <rect
                    x={panel.x + width * 0.45}
                    y={top}
                    width={width * 0.55}
                    height={height}
                    className={styles.wash}
                  />
                  <path
                    className={base.lineAccent}
                    d={`M${panel.x + width * 0.45} ${top}V${top + height}`}
                  />
                  <path
                    className={base.leader}
                    d={`M${panel.x + width - 10} ${top + height / 2}H${panel.x + width * 0.45 + 10}m5 -3l-5 3l5 3`}
                  />
                </>
              )}
              {panel.name === "Tint" && (
                <g transform={`translate(${panel.x} 0)`}>
                  <rect
                    y={top}
                    width={width}
                    height={height}
                    fill={`url(#${id}-fade)`}
                  />
                  <rect
                    y={top}
                    width={width}
                    height={height}
                    fill={`url(#${id}-stripes)`}
                    mask={`url(#${id}-mask)`}
                  />
                </g>
              )}
            </g>
            <text className={base.name} x={panel.x} y={top - 10}>
              {panel.name}
            </text>
            <text className={base.spec} x={panel.x} y={top + height + 16}>
              {panel.spec}
            </text>
            {index < panels.length - 1 && (
              <text
                className={base.formula}
                x={panel.x + width + 16}
                y={top + height / 2 + 4}
                textAnchor="middle"
              >
                {index === panels.length - 2 ? "=" : "×"}
              </text>
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function Hover() {
  const plot = { top: 30, bottom: 140 };
  const height = plot.bottom - plot.top;

  const ease = { left: 40, right: 250, end: 0.4 };
  const ex = (t: number) =>
    ease.left + (t / ease.end) * (ease.right - ease.left);
  const ey = (value: number) => plot.bottom - value * height;
  const easing = Array.from({ length: 81 }, (_, index) => {
    const t = (index / 80) * ease.end;
    return [ex(t), ey(1 - Math.exp(-10 * t))] as [number, number];
  });

  const glow = { left: 310, right: 520, reach: 210 };
  const gx = (d: number) =>
    glow.left +
    ((d + glow.reach) / (glow.reach * 2)) * (glow.right - glow.left);
  const profile = Array.from({ length: 81 }, (_, index) => {
    const d = -glow.reach + (index / 80) * glow.reach * 2;
    return [gx(d), ey(Math.exp(-(d * d) / 9800))] as [number, number];
  });

  return (
    <figure
      className={base.figure}
      style={tone(BLUE)}
      aria-label="Left: hover eases toward one, reaching 63 percent after 100 milliseconds. Right: the glow around the cursor falls off as a gaussian with a 70 pixel radius."
    >
      <svg className={base.svg} viewBox="0 0 560 200" aria-hidden="true">
        <path
          className={base.axis}
          d={`M${ease.left} ${plot.bottom}H${ease.right}`}
        />
        <path
          className={base.guide}
          d={`M${ease.left} ${ey(1)}H${ease.right}`}
        />
        <polyline className={base.lineAccent} points={points(easing)} />
        <path
          className={base.guide}
          d={`M${ex(0.1)} ${plot.bottom}V${ey(0.632)}`}
        />
        <circle className={base.knot} cx={ex(0.1)} cy={ey(0.632)} r="2" />
        <text className={base.spec} x={ex(0.1) + 6} y={ey(0.632) + 12}>
          63% at 100ms
        </text>
        {[0, 0.1, 0.2, 0.3, 0.4].map((t) => (
          <text
            key={t}
            className={base.spec}
            x={ex(t)}
            y={plot.bottom + 14}
            textAnchor="middle"
          >
            {Math.round(t * 1000)}ms
          </text>
        ))}
        <text className={base.name} x={ease.left} y={plot.top - 12}>
          Hover · 1 − e^(−10t)
        </text>

        <path
          className={base.axis}
          d={`M${glow.left} ${plot.bottom}H${glow.right}`}
        />
        <polyline className={base.lineAccent} points={points(profile)} />
        {[-70, 70].map((d) => (
          <path
            key={d}
            className={base.guide}
            d={`M${gx(d)} ${plot.bottom}V${ey(Math.exp(-0.5))}`}
          />
        ))}
        <path
          className={base.dimension}
          d={`M${gx(-70)} ${ey(Math.exp(-0.5))}H${gx(70)}`}
        />
        <text
          className={base.spec}
          x={gx(0)}
          y={ey(Math.exp(-0.5)) - 6}
          textAnchor="middle"
        >
          ±70px
        </text>
        {[-200, -100, 0, 100, 200].map((d) => (
          <text
            key={d}
            className={base.spec}
            x={gx(d)}
            y={plot.bottom + 14}
            textAnchor="middle"
          >
            {d}
          </text>
        ))}
        <text className={base.name} x={glow.left} y={plot.top - 12}>
          Glow · distance from cursor
        </text>

        <text className={base.formula} x="280" y="190" textAnchor="middle">
          drift = speed × (1 + 1.5 × hover)
        </text>
      </svg>
    </figure>
  );
}

export function Ripple() {
  const id = useId();
  const scale = 120 / 520;
  const frames = [
    { ms: 0, label: "Press", state: "open" },
    { ms: 120, label: "Ring", state: "open" },
    { ms: 260, label: "Leaves", state: "leaving" },
    { ms: 700, label: "Gap closed", state: "gone" },
  ].map((frame, index) => ({ ...frame, x: 8 + index * 140 }));
  const top = 40;
  const height = 34;

  return (
    <figure
      className={base.figure}
      style={tone(BLUE)}
      aria-label="Four frames: Action is pressed, a ring spreads from the button, the card leaves at 260 milliseconds, and by 700 milliseconds the card below has moved up."
    >
      <svg className={base.svg} viewBox="0 0 560 170" aria-hidden="true">
        {frames.map((frame) => {
          const t = frame.ms / 1000;
          const radius = 560 * t * scale;
          const life = 1 - smoothstep(0, 0.7, t);
          const cx = frame.x + 103;
          const cy = top + height / 2;
          const below = frame.state === "gone" ? top : top + height + 10;
          return (
            <g key={frame.ms}>
              <clipPath id={`${id}-${frame.ms}`}>
                <rect x={frame.x} y={top} width="120" height={height} rx="8" />
              </clipPath>

              {frame.state !== "gone" && (
                <g
                  className={
                    frame.state === "leaving" ? styles.leaving : undefined
                  }
                  style={{ transformOrigin: `${frame.x + 60}px ${cy}px` }}
                >
                  <rect
                    className={base.plate}
                    x={frame.x}
                    y={top}
                    width="120"
                    height={height}
                    rx="8"
                  />
                  <g clipPath={`url(#${id}-${frame.ms})`}>
                    {radius > 0 && (
                      <>
                        <circle
                          className={styles.fill}
                          cx={cx}
                          cy={cy}
                          r={radius}
                          opacity={life}
                        />
                        <circle
                          className={styles.ringLine}
                          cx={cx}
                          cy={cy}
                          r={radius}
                          opacity={life}
                        />
                      </>
                    )}
                  </g>
                  <rect
                    className={base.ink}
                    x={frame.x + 10}
                    y={top + 10}
                    width="40"
                    height="5"
                    rx="2.5"
                  />
                  <rect
                    className={base.faint}
                    x={frame.x + 10}
                    y={top + 20}
                    width="62"
                    height="4"
                    rx="2"
                  />
                  <rect
                    className={frame.ms === 0 ? styles.pressed : base.plate}
                    x={frame.x + 92}
                    y={top + 10}
                    width="22"
                    height="14"
                    rx="4"
                  />
                </g>
              )}

              <rect
                className={base.plate}
                x={frame.x}
                y={below}
                width="120"
                height={height}
                rx="8"
              />
              <rect
                className={base.ink}
                x={frame.x + 10}
                y={below + 10}
                width="40"
                height="5"
                rx="2.5"
              />
              <rect
                className={base.faint}
                x={frame.x + 10}
                y={below + 20}
                width="62"
                height="4"
                rx="2"
              />
              <rect
                className={base.plate}
                x={frame.x + 92}
                y={below + 10}
                width="22"
                height="14"
                rx="4"
              />
              {frame.state === "gone" && (
                <path
                  className={base.leader}
                  d={`M${frame.x + 60} ${top + height + 30}V${top + height + 6}m-3 5l3 -5l3 5`}
                />
              )}

              <text className={base.name} x={frame.x} y={top - 14}>
                {`${frame.ms}ms`}
              </text>
              <text className={base.spec} x={frame.x} y={top + height * 2 + 30}>
                {frame.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const TYPES = [
  {
    name: "Success",
    color: "#17b890",
    pattern: "Aurora",
    note: "Soft clouds drift left. The check draws itself in.",
  },
  {
    name: "Information",
    color: "#3d6df2",
    pattern: "Contours",
    note: "The slowest drift of the five.",
  },
  {
    name: "Reminder",
    color: "#7b5cf5",
    pattern: "Halftone",
    note: "Breathes every 2.6s. The bell rings once.",
  },
  {
    name: "Error",
    color: "#e1265f",
    pattern: "Pixels",
    note: "Twinkles on a 2.4s cycle. Shakes once, 350ms in.",
  },
  {
    name: "Warning",
    color: "#ef7d1c",
    pattern: "Stripes",
    note: "Hazard stripes, marching 0.6 periods a second.",
  },
];

function hash(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function Patterns() {
  const id = useId();
  const width = 100;
  const height = 44;
  const top = 30;
  const panels = [
    { pattern: "Stripes", type: "Warning", spec: "30px · 0.6/s" },
    { pattern: "Halftone", type: "Reminder", spec: "7px grid · r ≤ 3.5" },
    { pattern: "Aurora", type: "Success", spec: "noise · 90px" },
    { pattern: "Contours", type: "Information", spec: "24 levels · 1px" },
    { pattern: "Pixels", type: "Error", spec: "6px cells · twinkle" },
  ].map((panel, index) => ({
    ...panel,
    x: 2 + index * 114.5,
    color: TYPES.find((type) => type.name === panel.type)?.color ?? BLUE,
  }));
  const fade = Array.from({ length: 9 }, (_, index) => {
    const offset = index / 8;
    return { offset, value: smoothstep(0.32, 1, offset) };
  });

  const draw = (pattern: string, x0: number) => {
    if (pattern === "Stripes") {
      return (
        <>
          <pattern
            id={`${id}-stripes`}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect
              width="5"
              height="10"
              fill="var(--figure-accent)"
              opacity="0.45"
            />
          </pattern>
          <rect
            x={x0}
            y={top}
            width={width}
            height={height}
            fill={`url(#${id}-stripes)`}
          />
        </>
      );
    }
    if (pattern === "Halftone") {
      const cell = 6;
      return Array.from({ length: (width / cell) * 8 }, (_, index) => {
        const i = index % (width / cell);
        const j = Math.floor(index / (width / cell));
        const cx = x0 + (i + 0.5) * cell;
        const cy = top + (j + 0.5) * cell;
        const wave = 0.5 + 0.5 * Math.sin((i + j) * 0.5);
        const r =
          2.6 *
          smoothstep(0.2, 1, (i + 0.5) / (width / cell)) *
          (0.7 + 0.3 * wave);
        return r > 0.2 ? (
          <circle
            key={`${i}-${j}`}
            cx={cx}
            cy={cy}
            r={r}
            fill="var(--figure-accent)"
            opacity="0.55"
          />
        ) : null;
      });
    }
    if (pattern === "Aurora") {
      return (
        <g filter={`url(#${id}-blur)`} fill="var(--figure-accent)">
          <ellipse cx={x0 + 58} cy={top + 14} rx="22" ry="12" opacity="0.4" />
          <ellipse cx={x0 + 84} cy={top + 32} rx="20" ry="13" opacity="0.5" />
          <ellipse cx={x0 + 94} cy={top + 8} rx="12" ry="9" opacity="0.35" />
        </g>
      );
    }
    if (pattern === "Contours") {
      return Array.from({ length: 10 }, (_, line) => {
        const d = Array.from({ length: 26 }, (_, step) => {
          const px = x0 + step * 4;
          const py =
            top -
            4 +
            line * 6 +
            3.5 * Math.sin(step * 0.32 + line * 0.7) +
            1.5 * Math.sin(step * 0.71 + line * 1.3);
          return `${step ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`;
        }).join("");
        return (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--figure-accent)"
            strokeWidth="0.75"
            opacity="0.7"
          />
        );
      });
    }
    const cell = 5;
    return Array.from({ length: (width / cell) * 9 }, (_, index) => {
      const i = index % (width / cell);
      const j = Math.floor(index / (width / cell));
      const h = hash(i, j);
      const lit = h < smoothstep(0.3, 1, (i + 0.5) / (width / cell));
      return lit ? (
        <rect
          key={`${i}-${j}`}
          x={x0 + i * cell + 0.75}
          y={top + j * cell + 0.75}
          width="3.5"
          height="3.5"
          fill="var(--figure-accent)"
          opacity={0.25 + 0.5 * hash(j, i)}
        />
      ) : null;
    });
  };

  return (
    <figure
      className={base.figure}
      aria-label="The five patterns: stripes on warning, halftone on reminder, aurora on success, contours on information, and pixels on error."
    >
      <svg className={base.svg} viewBox="0 0 560 110" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-bright`}>
            {fade.map(({ offset, value }) => (
              <stop
                key={offset}
                offset={offset}
                stopColor="#fff"
                stopOpacity={value}
              />
            ))}
          </linearGradient>
          <filter
            id={`${id}-blur`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {panels.map((panel) => (
          <g key={panel.pattern} style={tone(panel.color)}>
            <clipPath id={`${id}-${panel.pattern}-clip`}>
              <rect x={panel.x} y={top} width={width} height={height} rx="8" />
            </clipPath>
            <mask id={`${id}-${panel.pattern}-mask`}>
              <rect
                x={panel.x}
                y={top}
                width={width}
                height={height}
                fill={`url(#${id}-bright)`}
              />
            </mask>
            <rect
              className={base.plate}
              x={panel.x}
              y={top}
              width={width}
              height={height}
              rx="8"
            />
            <g
              clipPath={`url(#${id}-${panel.pattern}-clip)`}
              mask={`url(#${id}-${panel.pattern}-mask)`}
            >
              {draw(panel.pattern, panel.x)}
            </g>
            <text className={base.name} x={panel.x} y={top - 10}>
              {panel.pattern}
            </text>
            <text className={base.spec} x={panel.x} y={top + height + 16}>
              {panel.spec}
            </text>
            <text className={base.tag} x={panel.x} y={top + height + 30}>
              {panel.type}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function Types() {
  return (
    <figure className={base.figure} aria-label="The five types">
      <dl className={styles.types}>
        {TYPES.map((type) => (
          <div key={type.name} className={styles.type}>
            <dt className={styles.typeName}>
              <span
                className={styles.swatch}
                style={{ "--swatch": type.color } as CSSProperties}
              />
              {type.name}
            </dt>
            <dd className={styles.typeSpec}>
              {type.color} · {type.pattern}
            </dd>
            <dd className={styles.typeNote}>{type.note}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
