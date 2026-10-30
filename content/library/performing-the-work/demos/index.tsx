import type { ReactNode } from "react";
import { Figure, figure } from "@/components/writing/figure";

const TOP = 28;
const WIDTH = 62;
const HEIGHT = 80;
const STEP = 74;
const HERO = 4;

const forty = Array.from({ length: 8 }, (_, i) => ({
  y: TOP + 12 + i * 8,
  trim: (i % 3) * 6,
}));

const row = (x: number, y: number, length: number, className: string) => (
  <g key={`${x}-${y}`}>
    <circle className={className} cx={x + 12} cy={y} r={2.5} />
    <path className={className} d={`M${x + 20} ${y}H${x + 20 + length}`} />
  </g>
);

const states: { name: string; draw: (x: number) => ReactNode }[] = [
  {
    name: "Empty",
    draw: (x) => (
      <>
        <circle
          className={figure.faint}
          cx={x + WIDTH / 2}
          cy={TOP + 36}
          r={6}
        />
        <path
          className={figure.faint}
          d={`M${x + 18} ${TOP + 52}H${x + WIDTH - 18}`}
        />
      </>
    ),
  },
  {
    name: "Loading",
    draw: (x) =>
      [0, 1, 2].map((i) => (
        <path
          key={i}
          className={figure.faint}
          d={`M${x + 10} ${TOP + 18 + i * 14}H${x + WIDTH - 10 - i * 8}`}
        />
      )),
  },
  {
    name: "Error",
    draw: (x) => (
      <>
        <path
          className={figure.faint}
          d={`M${x + WIDTH / 2} ${TOP + 28}l7 12h-14z`}
        />
        <path
          className={figure.faint}
          d={`M${x + 14} ${TOP + 54}H${x + WIDTH - 14}`}
        />
      </>
    ),
  },
  {
    name: "One item",
    draw: (x) => row(x, TOP + 18, 26, figure.faint),
  },
  {
    name: "Three items",
    draw: (x) =>
      [30, 22, 26].map((length, i) =>
        row(x, TOP + 18 + i * 16, length, figure.line),
      ),
  },
  {
    name: "Forty items",
    draw: (x) =>
      forty.map(({ y, trim }) => (
        <path
          key={y}
          className={figure.faint}
          d={`M${x + 10} ${y}H${x + WIDTH - 10 - trim}`}
        />
      )),
  },
];

function corners(x: number, y: number, w: number, h: number, size = 8) {
  return [
    `M${x} ${y + size}V${y}H${x + size}`,
    `M${x + w - size} ${y}H${x + w}V${y + size}`,
    `M${x + w} ${y + h - size}V${y + h}H${x + w - size}`,
    `M${x + size} ${y + h}H${x}V${y + h - size}`,
  ].join("");
}

export function StatesFigure() {
  const hero = 24 + HERO * STEP;

  return (
    <Figure
      label="Six states of the same list: empty, loading, error, one item, three items and forty items. Only the three item state is framed, as the one that gets posted."
      viewBox="0 0 480 136"
    >
      {states.map(({ name, draw }, i) => {
        const x = 24 + i * STEP;
        const isHero = i === HERO;
        return (
          <g key={name}>
            <rect
              className={isHero ? figure.plane : figure.dashed}
              x={x}
              y={TOP}
              width={WIDTH}
              height={HEIGHT}
              rx={6}
            />
            {draw(x)}
            <text
              className={isHero ? figure.text : figure.quiet}
              x={x + WIDTH / 2}
              y={TOP + HEIGHT + 22}
              textAnchor="middle"
            >
              {name}
            </text>
          </g>
        );
      })}
      <path
        className={`${figure.line} ${figure.draw}`}
        d={corners(hero - 6, TOP - 6, WIDTH + 12, HEIGHT + 12)}
        pathLength={1}
      />
      <text
        className={figure.text}
        x={hero + WIDTH / 2}
        y={TOP - 14}
        textAnchor="middle"
      >
        The clip
      </text>
    </Figure>
  );
}

const STAIR = { x: 24, y: 36, run: 64, slope: 28, drop: 28 };

const slide = [
  "Share what you made",
  "Pick what will post well",
  "Build what posted well",
  "Stretch it for the clip",
  "The feed is the client",
].map((name, i) => ({
  name,
  x: STAIR.x + i * (STAIR.run + STAIR.slope),
  y: STAIR.y + i * STAIR.drop,
}));

const stair = slide
  .map(({ x, y }, i) => {
    const flat = `H${x + STAIR.run}`;
    if (i === 0) return `M${x} ${y}${flat}`;
    const from = x - STAIR.slope;
    const middle = from + STAIR.slope / 2;
    return `C${middle} ${y - STAIR.drop} ${middle} ${y} ${x} ${y}${flat}`;
  })
  .join("");

export function SlideFigure() {
  const last = slide.length - 1;

  return (
    <Figure
      label="A line that steps down five times: share what you made, pick what will post well, build what posted well, stretch it for the clip, and finally the feed is the client."
      viewBox="0 0 480 172"
    >
      <path
        className={`${figure.line} ${figure.draw}`}
        d={stair}
        pathLength={1}
      />
      {slide.map(({ name, x, y }, i) => (
        <g key={name}>
          <circle className={figure.dot} cx={x} cy={y} r={3} />
          <text
            className={i === last ? figure.text : figure.quiet}
            x={i === last ? x + STAIR.run : x}
            y={i === last ? y + 20 : y - 10}
            textAnchor={i === last ? "end" : "start"}
          >
            {name}
          </text>
        </g>
      ))}
    </Figure>
  );
}

const USES = 10;
const LONGEST = 600;
const BLOCK = 36;
const PITCH = (456 - 24 - BLOCK) / (USES - 1);

const speeds = [
  { name: "600ms, because it reads well in a clip", ms: 600, y: 44 },
  { name: "200ms, because someone waits for it", ms: 200, y: 108 },
];

export function LoopFigure() {
  return (
    <Figure
      label="Two rows of ten uses across a day. Each use is a block as wide as the animation. At 600 milliseconds, the blocks add up to six seconds of waiting. At 200 milliseconds, two seconds."
      viewBox="0 0 480 128"
      labels={["First use", "Tenth use"]}
    >
      {speeds.map(({ name, ms, y }) => (
        <g key={name}>
          <text className={figure.text} x={24} y={y - 16}>
            {name}
          </text>
          <text className={figure.quiet} x={456} y={y - 16} textAnchor="end">
            {(ms * USES) / 1000}s waiting
          </text>
          <path className={figure.guide} d={`M24 ${y}H456`} />
          {Array.from({ length: USES }, (_, i) => 24 + i * PITCH).map((x) => (
            <rect
              key={x}
              className={figure.plane}
              x={x}
              y={y - 6}
              width={(ms / LONGEST) * BLOCK}
              height={12}
              rx={3}
            />
          ))}
        </g>
      ))}
    </Figure>
  );
}
