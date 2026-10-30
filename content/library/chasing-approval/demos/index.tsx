import type { CSSProperties } from "react";
import { Figure, figure } from "@/components/writing/figure";
import styles from "./styles.module.css";

const LEFT = 128;
const RIGHT = 352;
const MIDDLE = 76;

const spread = [
  [-72, -40],
  [-40, -22],
  [-58, 8],
  [-20, 30],
  [-76, 38],
  [-8, -44],
  [14, -12],
  [34, 22],
  [60, -34],
  [72, 6],
  [46, 44],
  [-30, -4],
  [20, 46],
  [80, 36],
];

const dots = spread.map(([x, y], i) => {
  const angle = (i / spread.length) * Math.PI * 2;
  const radius = 16 + (i % 3) * 5;
  return {
    from: [x, y],
    to: [
      Number((Math.cos(angle) * radius).toFixed(2)),
      Number((Math.sin(angle) * radius * 0.8).toFixed(2)),
    ],
  };
});

export function DriftFigure() {
  return (
    <Figure
      label="Two fields of the same fourteen dots. On the left, each one sits somewhere different. On the right, they have all drifted toward a single point that already has attention, leaving the rest of the field empty."
      viewBox="0 0 480 160"
    >
      {dots.map(({ from: [x, y] }) => (
        <circle
          key={`left-${x}-${y}`}
          className={figure.dot}
          cx={LEFT + x}
          cy={MIDDLE + y}
          r={2.5}
        />
      ))}
      {dots.map(({ from, to }) => (
        <g key={`right-${from[0]}-${from[1]}`}>
          <path
            className={figure.guide}
            d={`M${RIGHT + from[0]} ${MIDDLE + from[1]}L${RIGHT + to[0]} ${MIDDLE + to[1]}`}
          />
          <circle
            className={figure.faint}
            cx={RIGHT + from[0]}
            cy={MIDDLE + from[1]}
            r={2.5}
          />
        </g>
      ))}
      <circle className={figure.hollow} cx={RIGHT} cy={MIDDLE} r={8} />
      <circle className={figure.dot} cx={RIGHT} cy={MIDDLE} r={4} />
      {dots.map(({ from, to }) => (
        <circle
          key={`drift-${from[0]}-${from[1]}`}
          className={`${figure.dot} ${styles.drift}`}
          style={
            {
              "--dx": `${from[0] - to[0]}px`,
              "--dy": `${from[1] - to[1]}px`,
            } as CSSProperties
          }
          cx={RIGHT + to[0]}
          cy={MIDDLE + to[1]}
          r={2.5}
        />
      ))}
      <text className={figure.text} x={LEFT} y={148} textAnchor="middle">
        Making what you care about
      </text>
      <text className={figure.text} x={RIGHT} y={148} textAnchor="middle">
        Making what gets noticed
      </text>
    </Figure>
  );
}

const ROOT = { x: 144, y: 80 };
const SPLIT = 264;
const END = 456;

const branches = [
  { reason: "Because I care about it", result: "Richer ideas", y: 40 },
  {
    reason: "Because it might get noticed",
    result: "More posturing",
    y: 120,
  },
];

export function ForkFigure() {
  return (
    <Figure
      label="A question, why am I making this, splits into two paths. Because I care about it leads to richer ideas. Because it might get noticed leads to more posturing."
      viewBox="0 0 480 152"
    >
      <text className={figure.text} x={24} y={ROOT.y + 3}>
        Why make this?
      </text>
      {branches.map(({ reason, result, y }, i) => {
        const bend = (SPLIT - ROOT.x) / 2;
        return (
          <g key={reason}>
            <path
              className={
                i === 0 ? `${figure.line} ${figure.draw}` : figure.faint
              }
              d={`M${ROOT.x} ${ROOT.y}C${ROOT.x + bend} ${ROOT.y} ${SPLIT - bend} ${y} ${SPLIT} ${y}H${END}`}
              pathLength={1}
            />
            <text className={figure.quiet} x={SPLIT + 8} y={y - 10}>
              {reason}
            </text>
            <text
              className={i === 0 ? figure.text : figure.quiet}
              x={END}
              y={y + 20}
              textAnchor="end"
            >
              {result}
            </text>
            <circle
              className={i === 0 ? figure.dot : figure.hollow}
              cx={END}
              cy={y}
              r={3}
            />
          </g>
        );
      })}
      <circle className={figure.dot} cx={ROOT.x} cy={ROOT.y} r={3.5} />
    </Figure>
  );
}
