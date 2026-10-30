import { Figure, figure, plot } from "@/components/writing/figure";

export { PassDemo } from "./demo";

const START = 24;
const WIDTH = 80;

const rows = [
  {
    name: "First result",
    y: 14,
    gaps: [12, 20, 9],
    heights: [38, 44, 40, 34],
    radii: [6, 11, 3, 8],
  },
  {
    name: "After the pass",
    y: 120,
    gaps: [16, 16, 16],
    heights: [40, 40, 40, 40],
    radii: [8, 8, 8, 8],
  },
];

export function SpacingFigure() {
  return (
    <Figure
      label="Two rows of four boxes. In the first result the gaps are 12, 20 and 9, and every box has a different height and radius. After the pass every gap is 16 and every box matches."
      viewBox="0 0 480 196"
    >
      {rows.map(({ name, y, gaps, heights, radii }) => {
        const top = y + 12;
        const marks = top + 56;
        let x = START;
        const boxes = heights.map((height, i) => {
          const box = { x, height, radius: radii[i] };
          x += WIDTH + (gaps[i] ?? 0);
          return box;
        });

        return (
          <g key={name}>
            <text className={figure.text} x={START} y={y}>
              {name}
            </text>
            {boxes.map((box) => (
              <rect
                key={box.x}
                className={figure.plane}
                x={box.x}
                y={top}
                width={WIDTH}
                height={box.height}
                rx={box.radius}
              />
            ))}
            {gaps.map((gap, i) => {
              const from = boxes[i].x + WIDTH;
              const to = from + gap;
              return (
                <g key={from}>
                  <path
                    className={figure.guide}
                    d={`M${from} ${top}V${marks}M${to} ${top}V${marks}`}
                  />
                  <path className={figure.axis} d={`M${from} ${marks}H${to}`} />
                  <text
                    className={figure.quiet}
                    x={(from + to) / 2}
                    y={marks + 13}
                    textAnchor="middle"
                  >
                    {gap}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Figure>
  );
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const backOut = (t: number) =>
  1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
const bounce = (t: number) => 1 - Math.exp(-4 * t) * Math.cos(14 * t);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

const CELL = { width: 104, height: 36, longest: 600 };
const motions = ["Card entrance", "Button hover", "Menu open"];
const columns = [112, 232, 352];

type Motion = { fn: (t: number) => number; ms: number } | null;

const passes: { name: string; base: number; motions: Motion[] }[] = [
  {
    name: "First result",
    base: 72,
    motions: [
      { fn: easeInOut, ms: 600 },
      { fn: backOut, ms: 300 },
      { fn: bounce, ms: 500 },
    ],
  },
  {
    name: "After the pass",
    base: 144,
    motions: [null, { fn: easeOut, ms: 160 }, { fn: easeOut, ms: 160 }],
  },
];

export function MotionFigure() {
  return (
    <Figure
      label="Three motions in two rows. In the first result, the card entrance eases in and out over 600 milliseconds, the button hover overshoots over 300, and the menu bounces over 500. After the pass, the card has no entrance and the button and menu share one ease-out at 160 milliseconds."
      viewBox="0 0 480 164"
    >
      {motions.map((name, i) => (
        <text key={name} className={figure.quiet} x={columns[i]} y={12}>
          {name}
        </text>
      ))}
      {passes.map(({ name, base, motions: row }) => (
        <g key={name}>
          <text className={figure.text} x={24} y={base - 14}>
            {name}
          </text>
          {row.map((motion, i) => {
            const x = columns[i];
            return (
              <g key={x}>
                <path
                  className={figure.guide}
                  d={`M${x} ${base}H${x + CELL.width}`}
                />
                {motion ? (
                  <>
                    <path
                      className={`${figure.line} ${figure.draw}`}
                      d={plot(motion.fn, {
                        x,
                        y: base,
                        width: (motion.ms / CELL.longest) * CELL.width,
                        height: CELL.height,
                      })}
                      pathLength={1}
                    />
                    <text className={figure.quiet} x={x} y={base + 14}>
                      {motion.ms}ms
                    </text>
                  </>
                ) : (
                  <text className={figure.quiet} x={x} y={base - 14}>
                    No entrance
                  </text>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </Figure>
  );
}
