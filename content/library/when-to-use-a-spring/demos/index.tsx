import { Figure, figure, plot } from "@/components/writing/figure";

export { SpringDemo } from "./demo";

const BASE = 152;
const TARGET = 60;
const WIDTH = 192;

const ease = (t: number) => 1 - (1 - t) ** 4;
const spring = (t: number) =>
  1 - Math.exp(-6 * t) * (Math.cos(10 * t) + 0.6 * Math.sin(10 * t));

const panels = [
  { name: "Ease-out", x: 24, fn: ease, note: "Arrives and stops" },
  { name: "Spring", x: 264, fn: spring, note: "Goes past, comes back" },
];

export function CurvesFigure() {
  return (
    <Figure
      label="Two curves. The ease-out rises to the target and stops. The spring rises past the target, comes back and settles."
      viewBox="0 0 480 184"
    >
      {panels.map(({ name, x, fn, note }) => (
        <g key={name}>
          <path className={figure.axis} d={`M${x} ${BASE}H${x + WIDTH}`} />
          <path className={figure.guide} d={`M${x} ${TARGET}H${x + WIDTH}`} />
          <path
            className={`${figure.line} ${figure.draw}`}
            d={plot(fn, { x, y: BASE, width: WIDTH, height: BASE - TARGET })}
            pathLength={1}
          />
          <text
            className={figure.quiet}
            x={x + WIDTH}
            y={TARGET - 24}
            textAnchor="end"
          >
            {note}
          </text>
          <text
            className={figure.text}
            x={x + WIDTH / 2}
            y={174}
            textAnchor="middle"
          >
            {name}
          </text>
        </g>
      ))}
    </Figure>
  );
}

const INTERRUPT = 0.16;
const EASE_DURATION = 0.5;
const SAMPLES = 400;

const interruptedEase = (t: number) => {
  if (t < INTERRUPT) return ease(t / EASE_DURATION);
  const from = ease(INTERRUPT / EASE_DURATION);
  return from * (1 - ease(Math.min((t - INTERRUPT) / EASE_DURATION, 1)));
};

function interruptedSpring() {
  const stiffness = 120;
  const damping = 2 * 0.55 * Math.sqrt(stiffness);
  const substeps = 8;
  const dt = 1 / (SAMPLES * substeps);
  let position = 0;
  let velocity = 0;
  const values = [0];

  for (let i = 1; i <= SAMPLES; i++) {
    for (let j = 0; j < substeps; j++) {
      const target = (i - 1) / SAMPLES < INTERRUPT ? 1 : 0;
      velocity += (stiffness * (target - position) - damping * velocity) * dt;
      position += velocity * dt;
    }
    values.push(position);
  }

  return values;
}

const springValues = interruptedSpring();

const trace = (x: number, value: (i: number) => number) =>
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const px = x + (WIDTH * i) / SAMPLES;
    const py = BASE - (BASE - TARGET) * value(i);
    return `${i === 0 ? "M" : "L"}${px.toFixed(2)} ${py.toFixed(2)}`;
  }).join("");

const turns = [
  {
    name: "Ease-out",
    x: 24,
    note: "Snaps into reverse",
    value: (i: number) => interruptedEase(i / SAMPLES),
  },
  {
    name: "Spring",
    x: 264,
    note: "Keeps its speed, turns around",
    value: (i: number) => springValues[i],
  },
];

export function InterruptFigure() {
  const at = Math.round(INTERRUPT * SAMPLES);

  return (
    <Figure
      label="Two curves that change direction at the same moment. The ease-out rises, then reverses with a sharp corner. The spring rises, slows, and turns around in a smooth arc."
      viewBox="0 0 480 196"
    >
      {turns.map(({ name, x, note, value }) => {
        const cx = x + WIDTH * INTERRUPT;
        const cy = BASE - (BASE - TARGET) * value(at);
        return (
          <g key={name}>
            <path className={figure.axis} d={`M${x} ${BASE}H${x + WIDTH}`} />
            <path className={figure.guide} d={`M${x} ${TARGET}H${x + WIDTH}`} />
            <path className={figure.guide} d={`M${cx} ${TARGET}V${BASE}`} />
            <path
              className={`${figure.line} ${figure.draw}`}
              d={trace(x, value)}
              pathLength={1}
            />
            <circle className={figure.dot} cx={cx} cy={cy} r={2.5} />
            <text
              className={figure.quiet}
              x={x + WIDTH}
              y={TARGET - 24}
              textAnchor="end"
            >
              {note}
            </text>
            <text
              className={figure.quiet}
              x={cx}
              y={BASE + 16}
              textAnchor="middle"
            >
              Changes its mind
            </text>
            <text
              className={figure.text}
              x={x + WIDTH / 2}
              y={188}
              textAnchor="middle"
            >
              {name}
            </text>
          </g>
        );
      })}
    </Figure>
  );
}
