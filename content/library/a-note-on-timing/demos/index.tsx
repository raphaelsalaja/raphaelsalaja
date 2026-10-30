import { curve, Figure, figure } from "@/components/writing/figure";
import styles from "./styles.module.css";

export { DurationDemo } from "./demo";

const AXIS = 176;

const moments = [
  { name: "Onboarding", ms: 600, x: 56 },
  { name: "Page", ms: 400, x: 132 },
  { name: "Sheet", ms: 300, x: 208 },
  { name: "Toast", ms: 240, x: 284 },
  { name: "Menu", ms: 180, x: 360 },
  { name: "Hover", ms: 100, x: 436 },
].map((moment) => ({ ...moment, y: AXIS - moment.ms * 0.2 }));

export function FrequencyFigure() {
  return (
    <Figure
      label="Durations fall as frequency rises: onboarding at 600 milliseconds, a page at 400, a sheet at 300, a toast at 240, a menu at 180 and a hover at 100."
      viewBox="0 0 480 184"
      labels={["Seen once", "Seen all day"]}
    >
      <path className={figure.axis} d={`M24 ${AXIS}H456`} />
      {moments.map(({ name, x, y }) => (
        <path key={name} className={figure.guide} d={`M${x} ${AXIS}V${y}`} />
      ))}
      <path
        className={`${figure.line} ${figure.draw}`}
        d={curve(moments.map(({ x, y }) => [x, y]))}
        pathLength={1}
      />
      {moments.map(({ name, ms, x, y }) => (
        <g key={name}>
          <circle className={figure.hollow} cx={x} cy={y} r={2.5} />
          <text className={figure.text} x={x} y={y - 20} textAnchor="middle">
            {name}
          </text>
          <text className={figure.quiet} x={x} y={y - 9} textAnchor="middle">
            {ms}ms
          </text>
        </g>
      ))}
    </Figure>
  );
}

const x = (ms: number) => 24 + ms * 1.44;

const rows = [
  { name: "In", ms: 200, y: 28 },
  { name: "Out", ms: 120, y: 64 },
];

export function AsymmetryFigure() {
  return (
    <Figure
      label="Two timelines. The menu takes 200 milliseconds to open and 120 to close."
      viewBox="0 0 480 116"
    >
      {rows.map(({ name, ms, y }) => (
        <g key={name}>
          <path className={figure.guide} d={`M24 ${y}H456`} />
          <path
            className={`${figure.line} ${figure.draw} ${name === "Out" ? styles.out : ""}`}
            d={`M24 ${y}H${x(ms)}`}
            pathLength={1}
          />
          <circle className={figure.dot} cx={x(ms)} cy={y} r={2.5} />
          <text className={figure.text} x={24} y={y - 10}>
            {name}
          </text>
          <text className={figure.quiet} x={x(ms) + 10} y={y + 3.5}>
            {ms}ms
          </text>
        </g>
      ))}
      <path className={figure.axis} d="M24 92H456" />
      {[0, 100, 200, 300].map((ms) => (
        <g key={ms}>
          <path className={figure.axis} d={`M${x(ms)} 89v6`} />
          <text
            className={figure.quiet}
            x={x(ms)}
            y={110}
            textAnchor={ms === 0 ? "start" : ms === 300 ? "end" : "middle"}
          >
            {ms === 300 ? "300ms" : ms}
          </text>
        </g>
      ))}
    </Figure>
  );
}
