import type { Rect } from "@web-kits/springboard";
import { genieMesh, geniePhases, type Mesh } from "@web-kits/springboard";
import { marks as base, Chart } from "@/components/chart";
import styles from "./figures.module.css";
import { GENIE_RECORDING } from "./recording";

type Point = readonly [number, number];
type Map = (x: number, y: number) => Point;

const [WX, WY, WW, WH] = GENIE_RECORDING.window;
const [IX, IY, IW, IH] = GENIE_RECORDING.icon;
const WINDOW: Rect = { x: WX, y: WY, width: WW, height: WH };
const SLOT: Rect = { x: IX, y: IY, width: IW, height: IH };
const SCREEN_H = GENIE_RECORDING.screen[1];
/** The part of the recorded screen the window passes through, in points. */
const CROP = { x: 270, y: 120, width: 860, height: 1060 };

const round = (n: number) => Math.round(n * 10) / 10;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const line = (points: Point[]) =>
  `M${points.map(([x, y]) => `${x} ${y}`).join("L")}`;

/** Maps recorded screen points into a panel `width` wide from (x, y). */
function panel(x: number, y: number, width: number) {
  const s = width / CROP.width;
  const at: Map = (px, py) => [
    round(x + (px - CROP.x) * s),
    round(y + (py - CROP.y) * s),
  ];
  return { at, height: CROP.height * s };
}

const vertex = (mesh: Mesh, column: number, row: number): Point => {
  const k = (row * mesh.columns + column) * 4;
  return [mesh.points[k + 2], mesh.points[k + 3]];
};

function silhouette(mesh: Mesh, at: Map) {
  const side = (column: number) =>
    range(mesh.rows).map((row) => at(...vertex(mesh, column, row)));
  return `${line([...side(0), ...side(mesh.columns - 1).reverse()])}Z`;
}

function rowLines(mesh: Mesh, at: Map) {
  return range(mesh.rows)
    .map((row) =>
      line(
        range(mesh.columns).map((column) => at(...vertex(mesh, column, row))),
      ),
    )
    .join("");
}

/** Redraws one of the recording's outlines, which are in screen points. */
function retrace(path: string, at: Map) {
  return path.replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (_, x, y) =>
    at(Number(x), Number(y)).join(" "),
  );
}

function Screen({ at }: { at: Map }) {
  const [left, bottom] = at(CROP.x, SCREEN_H);
  const [right] = at(CROP.x + CROP.width, SCREEN_H);
  const [x, y] = at(SLOT.x, SLOT.y);
  const [x2, y2] = at(SLOT.x + SLOT.width, SLOT.y + SLOT.height);
  return (
    <>
      <path className={base.axis} d={`M${left} ${bottom}H${right}`} />
      <rect
        className={base.ghost}
        x={x}
        y={y}
        width={x2 - x}
        height={y2 - y}
        rx={1.5}
      />
    </>
  );
}

const STAGES = [0, 0.25, 0.5, 0.75];
const STAGE_W = 116;
const STAGE_GAP = (560 - STAGE_W * STAGES.length) / (STAGES.length - 1);

export function MeshRows() {
  return (
    <Chart
      title="Mesh Rows by Progress"
      aria-label="The Dock's mesh for the recorded window at four points of a minimise. At the start it's a rectangle cut into 5 rows. A quarter of the way through, the sides have started to bend towards the Dock slot and it has 8 rows. Halfway, the window has narrowed into a funnel over the slot with 16 rows. Three quarters of the way, most of it has gone into the slot and 10 rows are left."
    >
      <svg className={base.svg} viewBox="0 0 560 186" aria-hidden="true">
        {STAGES.map((progress, i) => {
          const { at, height } = panel(i * (STAGE_W + STAGE_GAP), 0, STAGE_W);
          const mesh = genieMesh(progress, WINDOW, SLOT);
          const middle = i * (STAGE_W + STAGE_GAP) + STAGE_W / 2;
          return (
            <g key={progress}>
              <Screen at={at} />
              <path className={styles.body} d={silhouette(mesh, at)} />
              <path className={styles.rows} d={rowLines(mesh, at)} />
              {range(mesh.rows).flatMap((row) =>
                range(mesh.columns).map((column) => {
                  const [x, y] = at(...vertex(mesh, column, row));
                  return (
                    <circle
                      key={`${row}-${column}`}
                      className={base.knot}
                      cx={x}
                      cy={y}
                      r={1.25}
                    />
                  );
                }),
              )}
              <text
                className={base.name}
                x={middle}
                y={height + 20}
                textAnchor="middle"
              >
                {`Progress ${progress}`}
              </text>
              <text
                className={base.spec}
                x={middle}
                y={height + 34}
                textAnchor="middle"
              >
                {`${mesh.rows} rows`}
              </text>
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}

const FRAMES = [0.12, 0.27, 0.42, 0.57, 0.72].map((target) =>
  GENIE_RECORDING.outlines.reduce((best, outline) =>
    Math.abs(outline[0] - target) < Math.abs(best[0] - target) ? outline : best,
  ),
);
const FRAME_W = 96;
const FRAME_GAP = (560 - FRAME_W * FRAMES.length) / (FRAMES.length - 1);
const FRAME_TOP = 0;

export function Recorded() {
  return (
    <Chart
      title="Port Against Recording"
      legend={[
        { label: "Port", kind: "ink" },
        { label: "Recorded frame", kind: "fill" },
      ]}
      aria-label="Five frames from a screen recording of a real minimise, each with the window's recorded outline filled in blue and the ported mesh's outline drawn over it in black. The two lines sit on top of each other in every frame."
    >
      <svg className={base.svg} viewBox="0 0 560 140" aria-hidden="true">
        {FRAMES.map(([progress, path], i) => {
          const left = i * (FRAME_W + FRAME_GAP);
          const { at, height } = panel(left, FRAME_TOP, FRAME_W);
          const mesh = genieMesh(progress, WINDOW, SLOT);
          return (
            <g key={progress}>
              <Screen at={at} />
              <path className={styles.recorded} d={retrace(path, at)} />
              <path className={styles.port} d={silhouette(mesh, at)} />
              <text
                className={base.spec}
                x={left + FRAME_W / 2}
                y={FRAME_TOP + height + 20}
                textAnchor="middle"
              >
                {progress.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}

const PLOT = { x0: 72, x1: 488, top: 24, base: 112 };
const px = (t: number) => PLOT.x0 + t * (PLOT.x1 - PLOT.x0);
const py = (v: number) => PLOT.base - v * (PLOT.base - PLOT.top);

export function Phases() {
  const steps = range(201).map((i) => i / 200);
  const phases = steps.map((t) => geniePhases(t, WINDOW, SLOT));
  const curve = (pick: (p: (typeof phases)[number]) => number) =>
    line(steps.map((t, i) => [round(px(t)), round(py(pick(phases[i])))]));
  const { settled } = phases[0];
  const x = round(px(settled));

  return (
    <Chart
      title="Bend and Slide Phases"
      legend={[
        { label: "Sides bend", kind: "ink" },
        { label: "Window slides", kind: "muted" },
      ]}
      aria-label="How far along each phase is across a minimise of the recorded window. The sides bend on an eased curve that finishes 0.5 of the way through. The slide starts at the same time on a longer eased curve, and it has covered the gap between the window and the slot at the moment the sides finish."
    >
      <svg className={base.svg} viewBox="0 0 560 148" aria-hidden="true">
        {[0, 1].map((v) => (
          <g key={v}>
            <path
              className={v ? base.guide : base.axis}
              d={`M${PLOT.x0} ${py(v)}H${PLOT.x1}`}
            />
            <text className={styles.caps} x={8} y={py(v) + 3.5}>
              {v ? "done" : "start"}
            </text>
          </g>
        ))}
        <path
          className={base.guide}
          d={`M${x} ${PLOT.top - 20}V${PLOT.base}`}
        />
        <path className={base.lineMuted} d={curve((p) => p.poured)} />
        <path className={base.lineStrong} d={curve((p) => p.bent)} />
        <text className={base.spec} x={x + 8} y={PLOT.top - 14}>
          {`${settled.toFixed(2)}, as the bottom edge reaches the slot`}
        </text>
        {[0, 0.5, 1].map((t) => (
          <text
            key={t}
            className={styles.caps}
            x={px(t)}
            y={PLOT.base + 18}
            textAnchor="middle"
          >
            {t}
          </text>
        ))}
        <text
          className={styles.caps}
          x={PLOT.x1}
          y={PLOT.base + 32}
          textAnchor="end"
        >
          progress
        </text>
      </svg>
    </Chart>
  );
}

const TIMES = [
  { label: "Minimise", track: GENIE_RECORDING.minimise, x: 8 },
  { label: "Restore", track: GENIE_RECORDING.restore, x: 300 },
];
const TIME_W = 252;
const TIME_END = 0.56;
const TIME_TOP = 44;
const TIME_BASE = 124;

function Timing({ label, track, x }: (typeof TIMES)[number]) {
  const tx = (t: number) => round(x + (t / TIME_END) * TIME_W);
  const ty = (v: number) => round(TIME_BASE - v * (TIME_BASE - TIME_TOP));
  const { fit } = track;
  const fitAt = (t: number) =>
    Math.min(Math.max((t - fit.delay) / fit.duration, 0), 1);
  const fitted = line(
    range(57).map((i) => {
      const t = (i / 56) * TIME_END;
      return [tx(t), ty(fitAt(t))];
    }),
  );

  return (
    <g>
      <text className={base.name} x={x} y={14}>
        {label}
      </text>
      <text className={base.spec} x={x} y={28}>
        {`${Math.round(fit.duration * 1000)} ms, ${(fit.rms * 100).toFixed(2)}% off a straight line`}
      </text>
      <path className={base.axis} d={`M${x} ${ty(0)}h${TIME_W}`} />
      <path className={base.guide} d={`M${x} ${ty(1)}h${TIME_W}`} />
      <path className={base.lineMuted} d={fitted} />
      {track.samples.map(([t, v]) => (
        <circle
          key={t}
          className={styles.sample}
          cx={tx(t)}
          cy={ty(v)}
          r={1.4}
        />
      ))}
      {[0, 0.25, 0.5].map((t) => (
        <text
          key={t}
          className={styles.caps}
          x={tx(t)}
          y={TIME_BASE + 18}
          textAnchor={t ? "middle" : "start"}
        >
          {`${t * 1000} ms`}
        </text>
      ))}
    </g>
  );
}

export function Linear() {
  return (
    <Chart
      title="Progress Over Time"
      aria-label="Progress against time for the recorded minimise and restore, one dot per frame at 120 frames a second, with a straight line fitted through them. Minimising takes 495 milliseconds and restoring 497, and the dots sit on the line."
    >
      <svg className={base.svg} viewBox="0 0 560 150" aria-hidden="true">
        {TIMES.map((time) => (
          <Timing key={time.label} {...time} />
        ))}
      </svg>
    </Chart>
  );
}

/** One quad of the funnel, exaggerated: wider at the top, leaning to the slot. */
const QUAD: [Point, Point, Point, Point] = [
  [0, 0],
  [160, 0],
  [138, 104],
  [64, 104],
];
const LINES = range(7).map((i) => i / 6);

const mix = (a: Point, b: Point, t: number): Point => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

function bilinear(u: number, v: number): Point {
  const [a, b, c, d] = QUAD;
  return mix(mix(a, b, u), mix(d, c, u), v);
}

/** Two affine triangles, split along the top-left to bottom-right diagonal. */
function triangles(u: number, v: number): Point {
  const [a, b, c, d] = QUAD;
  const [across, down] =
    u >= v
      ? [
          [a, b],
          [b, c],
        ]
      : [
          [d, c],
          [a, d],
        ];
  return [
    a[0] + u * (across[1][0] - across[0][0]) + v * (down[1][0] - down[0][0]),
    a[1] + u * (across[1][1] - across[0][1]) + v * (down[1][1] - down[0][1]),
  ];
}

const FILLS = [
  {
    name: "Two triangles",
    spec: "4.33 and 3.96 px off",
    map: triangles,
    x: 80,
  },
  {
    name: "Bilinear or projective",
    spec: "1.97 px off",
    map: bilinear,
    x: 320,
  },
];

export function Fills() {
  return (
    <Chart
      title="Triangles Against Bilinear"
      aria-label="A grid stretched across one quad of the funnel two ways. Split into two triangles, each grid line bends where it crosses the diagonal. With a bilinear fill, the lines stay smooth across the whole quad. Against the recording, the triangles were off by a median of 4.33 and 3.96 pixels and the bilinear fill by 1.97."
    >
      <svg className={base.svg} viewBox="0 0 560 160" aria-hidden="true">
        {FILLS.map(({ name, spec, map, x }) => {
          const at = (u: number, v: number): Point => {
            const [qx, qy] = map(u, v);
            return [round(x + qx), round(8 + qy)];
          };
          const steps = range(49).map((i) => i / 48);
          const grid = LINES.flatMap((t) => [
            line(steps.map((s) => at(t, s))),
            line(steps.map((s) => at(s, t))),
          ]).join("");
          return (
            <g key={name}>
              <path
                className={styles.edge}
                d={`${line(QUAD.map(([u, v]) => [x + u, 8 + v]))}Z`}
              />
              <path className={styles.texture} d={grid} />
              {map === triangles && (
                <path className={base.cut} d={line([at(0, 0), at(1, 1)])} />
              )}
              <text
                className={base.name}
                x={x + 80}
                y={134}
                textAnchor="middle"
              >
                {name}
              </text>
              <text
                className={base.spec}
                x={x + 80}
                y={148}
                textAnchor="middle"
              >
                {spec}
              </text>
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}
