import { MORPH } from "@web-kits/springboard";
import { marks as base, Chart } from "@/components/chart";
import { Video } from "@/components/video";
import styles from "./figures.module.css";
import { CLOSING, OPENING, type Run, replay } from "./recording";

type Point = readonly [number, number];

const round = (n: number) => Math.round(n * 10) / 10;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const line = (points: Point[]) =>
  `M${points.map(([x, y]) => `${x} ${y}`).join("L")}`;

const ORDERS = [
  {
    name: "Menu",
    spec: "Two shapes, lens and field",
    src: "menu",
  },
  {
    name: "Label as Source",
    spec: "Two shapes, lens and field",
    src: "after",
  },
  {
    name: "Button as Source",
    spec: "One shape, no field",
    src: "before",
  },
];

export function Order() {
  return (
    <Chart title="Where the Source Goes" panelClassName={styles.order}>
      {ORDERS.map(({ name, spec, src }) => (
        <div key={src} className={styles.clip}>
          <Video
            className={styles.video}
            src={`/media/work/glass-menu/${src}.mp4`}
            poster={`/media/work/glass-menu/${src}.jpg`}
            width={604}
            height={560}
            aria-label={`${name}: the glass button opening its popover and closing it again, at half speed.`}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.spec}>{spec}</p>
        </div>
      ))}
    </Chart>
  );
}

const END = 0.6;
const PLOT_W = 252;
const TOP = 30;
const BASE = 114;

function Plot({ run, x }: { run: Run; x: number }) {
  const sample = replay(run.open);
  const tx = (t: number) => round(x + (t / END) * PLOT_W);
  const ty = (v: number) => round(BASE - v * (BASE - TOP));
  const times = range(121).map((i) => (i / 120) * END);
  const frames = times.map(sample);
  const peak = Math.max(...frames.map((frame) => Math.abs(frame.lens)));
  const curve = (pick: (frame: (typeof frames)[number]) => number) =>
    line(times.map((t, i) => [tx(t), ty(pick(frames[i]))]));

  return (
    <g>
      <text className={base.name} x={x} y={12}>
        {run.open ? "Opening" : "Closing"}
      </text>
      <path className={base.axis} d={`M${x} ${ty(0)}h${PLOT_W}`} />
      <path className={base.guide} d={`M${x} ${ty(1)}h${PLOT_W}`} />
      <path
        className={base.lineMuted}
        d={curve((f) => Math.abs(f.lens) / peak)}
      />
      <path
        className={base.lineAccent}
        d={curve((f) => f.field / MORPH.field)}
      />
      <path className={base.lineStrong} d={curve((f) => f.progress)} />
      {[0, 0.2, 0.4, 0.6].map((t) => (
        <text
          key={t}
          className={base.spec}
          x={tx(t)}
          y={BASE + 18}
          textAnchor={t === 0 ? "start" : t === END ? "end" : "middle"}
        >
          {t ? `${Math.round(t * 1000)} ms` : "0"}
        </text>
      ))}
    </g>
  );
}

export function Phases() {
  return (
    <Chart
      title="Morph Phases"
      legend={[
        { label: "Progress", kind: "ink" },
        { label: "Field blur", kind: "accent" },
        { label: "Lens", kind: "muted" },
      ]}
      aria-label="The port's main spring, field blur and lens over the first 600 milliseconds of an opening and a closing. Opening, the field blur reaches its cap of 20 points 119 milliseconds after the tap and holds it until 315, while the lens peaks at 195. Closing, the cap lasts 38 milliseconds and the lens peaks at 134."
    >
      <svg className={base.svg} viewBox="0 0 560 142" aria-hidden="true">
        <Plot run={OPENING} x={8} />
        <Plot run={CLOSING} x={300} />
      </svg>
    </Chart>
  );
}
