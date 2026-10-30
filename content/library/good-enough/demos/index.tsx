import { Figure, figure } from "@/components/writing/figure";

export { PressDemo } from "./demo";

const LINE = 80;
const SPLIT = 240;

const decisions = [
  { name: "Settings copy", x: 48, felt: false },
  { name: "Empty state", x: 112, felt: false },
  { name: "Onboarding", x: 176, felt: false },
  { name: "Menu timing", x: 304, felt: true },
  { name: "Button press", x: 368, felt: true },
  { name: "Type alignment", x: 432, felt: true },
];

export function ContactFigure() {
  return (
    <Figure
      label="A line of decisions. Settings copy, the empty state and onboarding sit on the reversible side. Menu timing, the button press and type alignment sit on the side people feel on every use."
      viewBox="0 0 480 128"
      labels={["Reversible, rarely felt", "Felt on every use"]}
    >
      <path
        className={`${figure.line} ${figure.draw}`}
        d={`M24 ${LINE}H456`}
        pathLength={1}
      />
      <path className={figure.guide} d={`M${SPLIT} 32V120`} />
      <text className={figure.text} x={SPLIT} y={20} textAnchor="middle">
        Good enough stops here
      </text>
      {decisions.map(({ name, x, felt }, i) => (
        <g key={name}>
          <circle
            className={felt ? figure.dot : figure.hollow}
            cx={x}
            cy={LINE}
            r={3}
          />
          <text
            className={figure.quiet}
            x={x}
            y={i % 2 === 0 ? LINE - 12 : LINE + 20}
            textAnchor="middle"
          >
            {name}
          </text>
        </g>
      ))}
    </Figure>
  );
}

const CALLS = 40;
const LEVEL = 40;
const STRIDE = 432 / CALLS;
const BEND = 0.0066;

const calls = Array.from({ length: CALLS + 1 }).reduce<[number, number][]>(
  (path, _, i) => {
    if (i === 0) return [[24, LEVEL]];
    const [x, y] = path[i - 1];
    const angle = i * BEND;
    path.push([x + STRIDE * Math.cos(angle), y + STRIDE * Math.sin(angle)]);
    return path;
  },
  [],
);

export function AddsUpFigure() {
  const [endX, endY] = calls[CALLS];

  return (
    <Figure
      label="A dashed straight line shows where you meant to go. A solid line made of forty short segments starts on it, and each segment bends a tiny bit further down, until the end sits well below the dashed line."
      viewBox="0 0 480 132"
      labels={["One call", "Forty calls"]}
    >
      <path className={figure.guide} d={`M24 ${LEVEL}H456`} />
      <text className={figure.quiet} x={456} y={LEVEL - 10} textAnchor="end">
        Where you meant to go
      </text>
      <path
        className={`${figure.line} ${figure.draw}`}
        d={`M${calls.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}`}
        pathLength={1}
      />
      {calls.map(([x, y]) => (
        <circle
          key={x}
          className={figure.dot}
          cx={x.toFixed(2)}
          cy={y.toFixed(2)}
          r={1.5}
        />
      ))}
      <text className={figure.text} x={endX} y={endY + 20} textAnchor="end">
        Where you ended up
      </text>
    </Figure>
  );
}
