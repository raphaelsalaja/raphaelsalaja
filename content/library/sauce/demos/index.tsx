import { curve, Figure, figure } from "@/components/writing/figure";

const START = 24;
const STEP = 52;

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const trend = [96, 52, 108, 44, 92, 36, 104, 40];
const sauce = [82, 80, 80, 78, 78, 76, 76, 74];

const LAST = years.length - 1;
const LABEL = START + STEP * LAST + 16;

const points = (values: number[]) =>
  values.map((y, i): [number, number] => [START + i * STEP, y]);

export function TrendFigure() {
  const onTrend = points(trend);
  const own = points(sauce);

  return (
    <Figure
      label="Eight years along the bottom. A faint line jumps up and down every year, and the well-dressed product sits on it each time. A second line, the one with sauce, stays at nearly the same height the whole way across."
      viewBox="0 0 480 152"
    >
      <path className={figure.faint} d={curve(onTrend)} />
      {onTrend.map(([x, y]) => (
        <circle key={x} className={figure.hollow} cx={x} cy={y} r={3} />
      ))}
      <path
        className={`${figure.line} ${figure.draw}`}
        d={curve(own)}
        pathLength={1}
      />
      {own.map(([x, y]) => (
        <circle key={x} className={figure.dot} cx={x} cy={y} r={3} />
      ))}
      <text className={figure.text} x={LABEL} y={trend[LAST] + 3}>
        Well dressed
      </text>
      <text className={figure.text} x={LABEL} y={sauce[LAST] + 3}>
        Sauce
      </text>
      {years.map((year, i) => (
        <text
          key={year}
          className={figure.quiet}
          x={START + i * STEP}
          y={144}
          textAnchor="middle"
        >
          {year}
        </text>
      ))}
    </Figure>
  );
}

const SCREEN = { width: 60, height: 44, gap: 12, x: 30 };

type Screen = {
  rx: number;
  title: [number, number, number];
  button: [number, number, number, number, number];
};

const borrowed: Screen[] = [
  { rx: 2, title: [8, 12, 30], button: [8, 30, 20, 8, 0] },
  { rx: 14, title: [16, 16, 28], button: [30, 28, 22, 10, 5] },
  { rx: 6, title: [22, 10, 24], button: [8, 32, 44, 6, 3] },
  { rx: 0, title: [8, 22, 36], button: [36, 8, 16, 8, 2] },
  { rx: 18, title: [12, 14, 22], button: [20, 28, 24, 10, 0] },
  { rx: 9, title: [8, 10, 40], button: [8, 24, 14, 14, 7] },
];

const owned: Screen[] = [28, 34, 22, 30, 26, 36].map((length) => ({
  rx: 8,
  title: [8, 12, length],
  button: [8, 30, 20, 8, 4],
}));

const screenRows = [
  { name: "A new decision on every screen", y: 32, screens: borrowed },
  { name: "The same decisions on every screen", y: 112, screens: owned },
];

export function RepeatFigure() {
  return (
    <Figure
      label="Two rows of six small screens. In the first, every screen has a different corner radius, a different title position and a different button. In the second, every screen uses the same radius, the same title position and the same button, with different content."
      viewBox="0 0 480 164"
    >
      {screenRows.map(({ name, y, screens }, row) => (
        <g key={name}>
          <text className={figure.text} x={SCREEN.x} y={y - 12}>
            {name}
          </text>
          {screens.map(({ rx, title, button }, i) => {
            const x = SCREEN.x + i * (SCREEN.width + SCREEN.gap);
            const [tx, ty, length] = title;
            const [bx, by, bw, bh, br] = button;
            return (
              <g key={x}>
                <rect
                  className={figure.plane}
                  x={x}
                  y={y}
                  width={SCREEN.width}
                  height={SCREEN.height}
                  rx={rx}
                />
                <path
                  className={figure.line}
                  d={`M${x + tx} ${y + ty}H${x + tx + length}`}
                />
                <rect
                  className={figure.faint}
                  x={x + bx}
                  y={y + by}
                  width={bw}
                  height={bh}
                  rx={br}
                />
                {row === 1 && (
                  <circle
                    className={figure.dot}
                    cx={x + 52}
                    cy={y + 12}
                    r={2}
                  />
                )}
              </g>
            );
          })}
        </g>
      ))}
    </Figure>
  );
}

const CURVE = { base: 112, center: 240, spread: 64, height: 76 };
const VIEW = 372;

const seen = (x: number) =>
  CURVE.base -
  CURVE.height * Math.exp(-(((x - CURVE.center) / CURVE.spread) ** 2));

const bell = Array.from({ length: 217 }, (_, i) => {
  const x = 24 + i * 2;
  return `${i === 0 ? "M" : "L"}${x} ${seen(x).toFixed(2)}`;
}).join("");

export function AverageFigure() {
  const peak = seen(CURVE.center);

  return (
    <Figure
      label="A bell curve of every interface a model has seen. A dot at the peak is what the model gives you. Another dot, far out near the edge of the curve, is a point of view."
      viewBox="0 0 480 144"
    >
      <path className={figure.axis} d={`M24 ${CURVE.base}H456`} />
      <path
        className={figure.guide}
        d={`M${CURVE.center} ${peak}V${CURVE.base}`}
      />
      <path
        className={`${figure.line} ${figure.draw}`}
        d={bell}
        pathLength={1}
      />
      <circle className={figure.dot} cx={CURVE.center} cy={peak} r={3} />
      <text
        className={figure.text}
        x={CURVE.center}
        y={peak - 14}
        textAnchor="middle"
      >
        What a model gives you
      </text>
      <circle className={figure.dot} cx={VIEW} cy={seen(VIEW)} r={3} />
      <text
        className={figure.text}
        x={VIEW}
        y={seen(VIEW) - 14}
        textAnchor="middle"
      >
        A point of view
      </text>
      <text
        className={figure.quiet}
        x={CURVE.center}
        y={CURVE.base + 20}
        textAnchor="middle"
      >
        Everything it has seen
      </text>
    </Figure>
  );
}
