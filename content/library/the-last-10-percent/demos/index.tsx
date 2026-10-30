import { Figure, figure } from "@/components/writing/figure";
import styles from "./styles.module.css";

export { LastTenPercentDemo } from "./demo";

const WIDTH = 480;
const HEIGHT = 184;
const START = 24;
const END = WIDTH - 24;
const SPLIT = START + (END - START) * 0.9;
const TOP = 44;
const FLOOR = 152;
const AXIS = 176;
const LOOPS = 15;
const STEPS = 1200;

function knot() {
  const span = END - SPLIT;
  const turns = Math.PI * 2 * LOOPS;
  let d = `M${START} ${FLOOR}C${START + 72} ${TOP + 8} ${SPLIT - 200} ${TOP} ${SPLIT} ${TOP}`;

  for (let i = 1; i <= STEPS; i++) {
    const p = i / STEPS;
    const theta = p * turns + Math.sin(p * 19) * 0.9;
    const envelope = Math.sin(Math.PI * p) ** 0.55;
    const cx = SPLIT + span * p;
    const rx =
      Math.min(cx - SPLIT, END - cx, span * 0.42) *
      (0.75 + 0.25 * Math.sin(theta * 0.31));
    const ry = 30 * envelope * (0.7 + 0.3 * Math.sin(theta * 0.17 + 1.3));
    const x = cx - rx * Math.cos(theta);
    const y = TOP - ry * Math.sin(theta + 0.5 * Math.sin(theta * 0.23));
    d += `L${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return d;
}

const path = knot();

export function LastTenPercent() {
  return (
    <figure
      className={styles.figure}
      aria-label="A line climbs quickly and levels off across most of the width, then breaks into a dense scribble over the last tenth."
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        aria-hidden="true"
      >
        <path className={styles.guide} d={`M${SPLIT} ${AXIS}V${TOP - 32}`} />
        <path className={styles.axis} d={`M${START} ${AXIS}H${END}`} />
        {[START, SPLIT, END].map((x) => (
          <path key={x} className={styles.axis} d={`M${x} ${AXIS - 3}v6`} />
        ))}
        <path className={styles.line} d={path} pathLength={1} />
      </svg>
      <div className={styles.labels} aria-hidden="true">
        <span>Layout, type, states</span>
        <span>The last 10%</span>
      </div>
    </figure>
  );
}

const TRIGGER = { dx: 16, y: 16, width: 56, height: 18 };
const MENU = { dx: 16, y: 44, width: 140, height: 72, rx: 8 };
const STAGES = [0.3, 0.6];

const origins = [
  {
    name: "From the center",
    x: 24,
    at: (px: number) => ({
      x: px + MENU.dx + MENU.width / 2,
      y: MENU.y + MENU.height / 2,
    }),
  },
  {
    name: "From the button",
    x: 264,
    at: (px: number) => ({
      x: px + TRIGGER.dx + TRIGGER.width / 2,
      y: MENU.y,
    }),
  },
];

export function OriginFigure() {
  return (
    <Figure
      label="The same button and menu twice. On the left, the menu grows outward from its own center. On the right, it grows down out of the button that opened it."
      viewBox="0 0 480 144"
    >
      {origins.map(({ name, x: px, at }, i) => {
        const origin = at(px);
        const menuX = px + MENU.dx;
        return (
          <g key={name}>
            <rect
              className={figure.hollow}
              x={px + TRIGGER.dx}
              y={TRIGGER.y}
              width={TRIGGER.width}
              height={TRIGGER.height}
              rx={6}
            />
            <rect
              className={figure.plane}
              x={menuX}
              y={MENU.y}
              width={MENU.width}
              height={MENU.height}
              rx={MENU.rx}
            />
            {STAGES.map((scale) => (
              <rect
                key={scale}
                className={figure.faint}
                x={origin.x + (menuX - origin.x) * scale}
                y={origin.y + (MENU.y - origin.y) * scale}
                width={MENU.width * scale}
                height={MENU.height * scale}
                rx={MENU.rx * scale}
              />
            ))}
            {i === 1 && (
              <path
                className={figure.guide}
                d={`M${origin.x} ${TRIGGER.y + TRIGGER.height}V${origin.y}`}
              />
            )}
            <circle className={figure.dot} cx={origin.x} cy={origin.y} r={3} />
            <text
              className={figure.text}
              x={px + 96}
              y={136}
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
