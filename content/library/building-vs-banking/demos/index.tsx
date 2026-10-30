import { Figure, figure } from "@/components/writing/figure";

const START = 24;
const END = 456;
const DAYS = 12;

const days = Array.from(
  { length: DAYS },
  (_, i) => START + (i * (END - START)) / (DAYS - 1),
);

const rows = [
  { name: "Building for the work", note: "Paid along the way", y: 48 },
  { name: "Building for the exit", note: "Paid once, if at all", y: 112 },
];

export function PayoffFigure() {
  const [work, exit] = rows;

  return (
    <Figure
      label="Two lines covering the same years of work. Building for the work, every day along the line is filled in. Building for the exit, every day is empty except the last one, which might never come."
      viewBox="0 0 480 136"
      labels={["Day one", "Years later"]}
    >
      {rows.map(({ name, note, y }) => (
        <g key={name}>
          <text className={figure.text} x={START} y={y - 20}>
            {name}
          </text>
          <text className={figure.quiet} x={END} y={y - 20} textAnchor="end">
            {note}
          </text>
          <path
            className={`${figure.line} ${figure.draw}`}
            d={`M${START} ${y}H${END}`}
            pathLength={1}
          />
        </g>
      ))}
      {days.map((x) => (
        <circle key={x} className={figure.dot} cx={x} cy={work.y} r={3} />
      ))}
      {days.slice(0, -1).map((x) => (
        <circle key={x} className={figure.hollow} cx={x} cy={exit.y} r={3} />
      ))}
      <circle className={figure.dashed} cx={END} cy={exit.y} r={8} />
      <circle className={figure.dot} cx={END} cy={exit.y} r={3} />
    </Figure>
  );
}

const LOOP = { x: 128, y: 72, r: 40 };
const RUN = { from: 296, to: 456, y: 72 };

const around = (degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  return {
    x: LOOP.x + Math.cos(angle) * LOOP.r,
    y: LOOP.y + Math.sin(angle) * LOOP.r,
    angle,
  };
};

const loop = [
  { name: "Make it", at: -90, dx: 0, dy: -12, anchor: "middle" },
  { name: "Someone loves it", at: 30, dx: 8, dy: 18, anchor: "start" },
  { name: "Make more", at: 150, dx: -8, dy: 18, anchor: "end" },
] as const;

const run = ["Raise", "Grow", "Exit"];

function chevron(degrees: number) {
  const { x, y, angle } = around(degrees);
  const tx = -Math.sin(angle);
  const ty = Math.cos(angle);
  const nx = Math.cos(angle);
  const ny = Math.sin(angle);
  const point = (back: number, side: number) =>
    `${(x - tx * back + nx * side).toFixed(2)} ${(y - ty * back + ny * side).toFixed(2)}`;
  return `M${point(4, 3.5)}L${point(0, 0)}L${point(4, -3.5)}`;
}

export function ThreadFigure() {
  return (
    <Figure
      label="Two shapes. Building is a loop: make it, someone loves it, make more, and back to the start. Banking is a straight line from raise to grow to exit, and then it stops."
      viewBox="0 0 480 160"
    >
      <circle
        className={`${figure.line} ${figure.draw}`}
        cx={LOOP.x}
        cy={LOOP.y}
        r={LOOP.r}
        pathLength={1}
      />
      {[-30, 90, 210].map((degrees) => (
        <path key={degrees} className={figure.line} d={chevron(degrees)} />
      ))}
      {loop.map(({ name, at, dx, dy, anchor }) => {
        const { x, y } = around(at);
        return (
          <g key={name}>
            <circle className={figure.dot} cx={x} cy={y} r={3} />
            <text
              className={figure.quiet}
              x={x + dx}
              y={y + dy}
              textAnchor={anchor}
            >
              {name}
            </text>
          </g>
        );
      })}
      <path
        className={`${figure.line} ${figure.draw}`}
        d={`M${RUN.from} ${RUN.y}H${RUN.to}`}
        pathLength={1}
      />
      {run.map((name, i) => {
        const x = RUN.from + (i * (RUN.to - RUN.from)) / (run.length - 1);
        return (
          <g key={name}>
            <circle className={figure.dot} cx={x} cy={RUN.y} r={3} />
            <text
              className={figure.quiet}
              x={x}
              y={RUN.y - 12}
              textAnchor="middle"
            >
              {name}
            </text>
          </g>
        );
      })}
      <text className={figure.text} x={LOOP.x} y={148} textAnchor="middle">
        Building
      </text>
      <text
        className={figure.text}
        x={(RUN.from + RUN.to) / 2}
        y={148}
        textAnchor="middle"
      >
        Banking
      </text>
    </Figure>
  );
}
