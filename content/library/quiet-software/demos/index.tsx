import { Figure, figure, plot } from "@/components/writing/figure";

export { QuietDemo } from "./demo";

const START = 24;
const END = 456;
const LOUD = 52;
const QUIET = 116;
const MOMENT = 304;

const bump = (x: number, at: number, width: number) =>
  Math.exp(-(((x - at) / width) ** 2));

function line(y: (x: number) => number) {
  let d = "";
  for (let x = START; x <= END; x += 1.5) {
    d += `${x === START ? "M" : "L"}${x.toFixed(1)} ${y(x).toFixed(2)}`;
  }
  return d;
}

const loud = line(
  (x) =>
    LOUD -
    (5 * Math.sin(x * 0.29) + 3 * Math.sin(x * 0.83 + 1)) *
      (0.6 + 0.4 * Math.sin(x * 0.031)) -
    18 * bump(x, 96, 5) +
    14 * bump(x, 182, 4) -
    20 * bump(x, 268, 5) +
    12 * bump(x, 352, 4) -
    16 * bump(x, 420, 5),
);

const quiet = line((x) => QUIET - 10 * bump(x, MOMENT, 9));

export function NoiseFigure() {
  return (
    <Figure
      label="Two lines. The first jitters and spikes the whole way across. The second stays flat, with one small rise where the thing you came for happens."
      viewBox="0 0 480 140"
    >
      <text className={figure.text} x={START} y={14}>
        Built to be noticed
      </text>
      <path
        className={`${figure.line} ${figure.draw}`}
        d={loud}
        pathLength={1}
      />
      <text className={figure.text} x={START} y={QUIET - 22}>
        Quiet
      </text>
      <path
        className={`${figure.line} ${figure.draw}`}
        d={quiet}
        pathLength={1}
      />
      <circle className={figure.dot} cx={MOMENT} cy={QUIET - 10} r={2.5} />
      <text
        className={figure.quiet}
        x={MOMENT}
        y={QUIET - 22}
        textAnchor="middle"
      >
        The thing you came for
      </text>
    </Figure>
  );
}

const CHART = { x: START, y: 128, width: END - START, height: 104 };

const products = [
  { name: "Loud", fn: (t: number) => 0.15 + 0.8 * Math.exp(-3.2 * t) },
  {
    name: "Quiet",
    fn: (t: number) => 0.45 + 0.4 * (1 - Math.exp(-2.5 * t)),
  },
];

export function LastsFigure() {
  return (
    <Figure
      label="Two lines over time. The loud product starts high and falls away. The quiet product starts lower and keeps rising, crossing above the loud one early and staying there."
      viewBox="0 0 480 140"
      labels={["First five minutes", "Five hundredth minute"]}
    >
      <text className={figure.quiet} x={START} y={10}>
        How much you want to open it
      </text>
      <path className={figure.axis} d={`M${START} ${CHART.y}H${END}`} />
      {products.map(({ name, fn }) => (
        <g key={name}>
          <path
            className={`${figure.line} ${figure.draw}`}
            d={plot(fn, CHART)}
            pathLength={1}
          />
          <text
            className={figure.text}
            x={END}
            y={CHART.y - CHART.height * fn(1) - 10}
            textAnchor="end"
          >
            {name}
          </text>
        </g>
      ))}
    </Figure>
  );
}
