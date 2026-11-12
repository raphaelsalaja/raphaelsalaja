import {
  type AppGeometry,
  card,
  createAppTransition,
  genieSprings,
  type MeshVertex,
  meshPoint,
  value,
} from "@web-kits/springboard";
import { marks as base, Chart } from "@/components/chart";
import styles from "@/content/work/genie/demos/figures.module.css";

// Figures for the app open, all drawn from the port on the 402 × 874 point
// iPhone the recordings were made on, with Safari opening from the Dock.

type Point = readonly [number, number];

const round = (n: number) => Math.round(n * 10) / 10;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const line = (points: readonly Point[]) =>
  `M${points.map(([x, y]) => `${x} ${y}`).join("L")}`;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const W = 402;
const H = 874;
const ICON_RADIUS = 16.64;
const SAFARI: AppGeometry = {
  screen: { x: 0, y: 0, width: W, height: H },
  icon: { x: 125, y: 773.333, width: 64, height: 64 },
  iconRadius: ICON_RADIUS,
  screenRadius: 62,
};
const START = SAFARI.icon.width / W;

// Four phones in a row, each 150 high
const PHONE_H = 150;
const PHONE_S = PHONE_H / H;
const PHONE_W = W * PHONE_S;
const SLOT_W = 140;

function phone(index: number) {
  const left = index * SLOT_W + (SLOT_W - PHONE_W) / 2;
  const at = (x: number, y: number): Point => [
    round(left + x * PHONE_S),
    round(y * PHONE_S),
  ];
  return { at, middle: index * SLOT_W + SLOT_W / 2 };
}

function Phone({ at }: { at: (x: number, y: number) => Point }) {
  const [x, y] = at(0, 0);
  const [icon, iconTop] = at(SAFARI.icon.x, SAFARI.icon.y);
  const size = SAFARI.icon.width * PHONE_S;
  return (
    <>
      <rect
        className={base.faint}
        x={x}
        y={y}
        width={round(PHONE_W)}
        height={PHONE_H}
        rx={round(62 * PHONE_S)}
      />
      <rect
        className={base.ghost}
        x={icon}
        y={iconTop}
        width={round(size)}
        height={round(size)}
        rx={round(ICON_RADIUS * PHONE_S)}
      />
    </>
  );
}

function Labels({
  middle,
  name,
  spec,
}: {
  middle: number;
  name: string;
  spec: string;
}) {
  return (
    <>
      <text
        className={base.name}
        x={middle}
        y={PHONE_H + 22}
        textAnchor="middle"
      >
        {name}
      </text>
      <text
        className={base.spec}
        x={middle}
        y={PHONE_H + 36}
        textAnchor="middle"
      >
        {spec}
      </text>
    </>
  );
}

const CROPS = [0, 0.3, 0.65, 1];

export function Crop() {
  return (
    <Chart
      title="Scale and Crop"
      aria-label="Safari's card at four points of the open, each over the whole app scaled to the card's width. At the icon the app is scaled to 0.16 and only its middle 46 percent shows, a square. A third of the way it's scaled to 0.41 and 62 percent shows, two thirds of the way 0.71 and 81 percent, and at the end the whole app shows at full size."
    >
      <svg className={base.svg} viewBox="0 0 560 190" aria-hidden="true">
        {CROPS.map((progress, i) => {
          const { at, middle } = phone(i);
          const frame = card(SAFARI, progress);
          const cx = frame.x + frame.width / 2;
          const cy = frame.y + frame.height / 2;
          const [ax, ay] = at(
            cx - (W * frame.scale) / 2,
            cy - (H * frame.scale) / 2,
          );
          const [bx, by] = at(frame.x, frame.y);
          const shown = frame.layerHeight / H;
          return (
            <g key={progress}>
              <Phone at={at} />
              <rect
                className={base.sheet}
                x={ax}
                y={ay}
                width={round(W * frame.scale * PHONE_S)}
                height={round(H * frame.scale * PHONE_S)}
              />
              <rect
                className={styles.body}
                x={bx}
                y={by}
                width={round(frame.width * PHONE_S)}
                height={round(frame.height * PHONE_S)}
                rx={round(lerp(ICON_RADIUS, 62, progress) * PHONE_S)}
              />
              <Labels
                middle={middle}
                name={`Scale ${frame.scale.toFixed(2)}`}
                spec={`${Math.round(shown * 100)}% of the height`}
              />
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}

// The open sampled at a moment, from a fresh transition.
function openAt(seconds: number) {
  const transition = createAppTransition(() => SAFARI);
  transition.show(0);
  return transition.sample(seconds);
}

const OUTLINE = range(25).map((i) => i / 24);

function outline(
  mesh: readonly MeshVertex[],
  at: (x: number, y: number) => Point,
) {
  const edge = (s: (k: number) => number, t: (k: number) => number) =>
    OUTLINE.map((k) => {
      const p = meshPoint(mesh, s(k), t(k));
      return at(p.x, p.y);
    });
  return `${line([
    ...edge(
      (k) => k,
      () => 0,
    ),
    ...edge(
      () => 1,
      (k) => k,
    ),
    ...edge(
      (k) => 1 - k,
      () => 1,
    ),
    ...edge(
      () => 0,
      (k) => 1 - k,
    ),
  ])}Z`;
}

const MESH_TIMES = [0.03, 0.06, 0.1, 0.16];

export function Mesh() {
  return (
    <Chart
      title="Mesh Over the Frame"
      aria-label="Safari opening from the Dock at 30, 60, 100 and 160 milliseconds. The card's nine vertices and the surface Core Animation fills between them are drawn over the dashed frame my first port drew. The bottom row lags behind the top, so the card leaves the icon as a taper, wide at the top and narrow at the bottom, and its corners sit well inside the frame until it lands."
    >
      <svg className={base.svg} viewBox="0 0 560 190" aria-hidden="true">
        {MESH_TIMES.map((seconds, i) => {
          const { at, middle } = phone(i);
          const frame = openAt(seconds);
          const [fx, fy] = at(frame.x, frame.y);
          const bottom = frame.y + frame.height;
          const above = Math.max(
            bottom - frame.mesh[6].y,
            bottom - frame.mesh[8].y,
          );
          const rows = range(3).map((r) =>
            line(
              range(3).map((c) =>
                at(frame.mesh[r * 3 + c].x, frame.mesh[r * 3 + c].y),
              ),
            ),
          );
          const columns = range(3).map((c) =>
            line(
              range(3).map((r) =>
                at(frame.mesh[r * 3 + c].x, frame.mesh[r * 3 + c].y),
              ),
            ),
          );
          return (
            <g key={seconds}>
              <Phone at={at} />
              <rect
                className={base.cut}
                x={fx}
                y={fy}
                width={round(frame.width * PHONE_S)}
                height={round(frame.height * PHONE_S)}
              />
              <path className={styles.body} d={outline(frame.mesh, at)} />
              <path
                className={styles.rows}
                d={[...rows, ...columns].join("")}
              />
              {frame.mesh.map((vertex, v) => {
                const [x, y] = at(vertex.x, vertex.y);
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: the mesh always has the same nine vertices
                  <circle key={v} className={base.knot} cx={x} cy={y} r={1.4} />
                );
              })}
              <Labels
                middle={middle}
                name={`${Math.round(seconds * 1000)} ms`}
                spec={`${Math.round(above)} pt above the frame`}
              />
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}

// Two plots side by side, from 0 to 1 over `end` seconds
const PLOT = { w: 250, gap: 60, top: 34, bottom: 150 };

function plot(
  index: number,
  end: number,
  max = 1,
  top = PLOT.top,
  bottom = PLOT.bottom,
) {
  const x0 = index * (PLOT.w + PLOT.gap);
  return {
    x0,
    x1: x0 + PLOT.w,
    px: (t: number) => round(x0 + (t / end) * PLOT.w),
    py: (v: number) => round(bottom - (v / max) * (bottom - top)),
  };
}

const ROW_NAMES = ["Top", "Middle", "Bottom"];
const ROW_STYLES = [base.lineStrong, base.lineMuted, base.lineAccent];
const ROWS_END = 0.8;

export function Rows() {
  return (
    <Chart
      title="Row Springs"
      legend={[
        { label: "Top row", kind: "ink" },
        { label: "Middle row", kind: "muted" },
        { label: "Bottom row", kind: "accent" },
      ]}
      aria-label="The springs the top, middle and bottom rows of Safari's mesh ride from the Dock. Opening, the top row is fastest at 0.139 seconds, then the middle at 0.282 and the bottom at 0.341, so the card stretches up away from the icon. Closing it's the other way round: the bottom row, nearest the icon, is fastest at 0.194 seconds, then the middle at 0.277 and the top at 0.478, so the card funnels back in."
    >
      <svg className={base.svg} viewBox="0 0 560 186" aria-hidden="true">
        {[true, false].map((open, i) => {
          const { x0, x1, px, py } = plot(i, ROWS_END);
          const springs = genieSprings(SAFARI, open);
          const steps = range(161).map((k) => (k / 160) * ROWS_END);
          return (
            <g key={String(open)}>
              <text className={base.name} x={x0} y={12}>
                {open ? "Opening" : "Closing"}
              </text>
              <path className={base.axis} d={`M${x0} ${py(0)}H${x1}`} />
              <path className={base.guide} d={`M${x0} ${py(1)}H${x1}`} />
              {springs.map((s, row) => (
                <g key={ROW_NAMES[row]}>
                  <path
                    className={ROW_STYLES[row]}
                    d={line(steps.map((t) => [px(t), py(value(s, t))]))}
                  />
                  <text
                    className={base.tag}
                    x={x0 + 140}
                    y={py(0.62) + row * 16}
                  >
                    {`${ROW_NAMES[row]} ${s.response.toFixed(3)} s`}
                  </text>
                </g>
              ))}
              {[0, 0.4, 0.8].map((t) => (
                <text
                  key={t}
                  className={styles.caps}
                  x={px(t)}
                  y={PLOT.bottom + 20}
                  textAnchor={t ? (t === ROWS_END ? "end" : "middle") : "start"}
                >
                  {`${Math.round(t * 1000)} ms`}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}

// The Simulator test: a 3 × 3 mesh with the right edge's middle vertex pulled
// out by 0.15 of the width.
const SQUARE = 120;
const PULL = 0.15;
const DRAWN = 0.101;
const TEST: MeshVertex[] = range(9).map((v) => {
  const row = Math.floor(v / 3);
  const column = v % 3;
  const pulled = v === 5 ? PULL : 0;
  return {
    x: (column / 2 + pulled) * SQUARE,
    y: (row / 2) * SQUARE,
    u: 0,
    v: 0,
  };
});

export function Edge() {
  const left = 160;
  const top = 4;
  const at = (x: number, y: number): Point => [round(left + x), round(top + y)];
  const curve = range(49).map((k) => {
    const p = meshPoint(TEST, 1, k / 48);
    return at(p.x, p.y);
  });
  const peak = meshPoint(TEST, 1, 0.5);
  const [vx, vy] = at(TEST[5].x, TEST[5].y);
  const [dx] = at((1 + DRAWN) * SQUARE, 0);
  const [ex] = at(SQUARE, 0);
  const midY = round(top + SQUARE / 2);
  return (
    <Chart
      title="Pulled Edge Test"
      legend={[
        { label: "B-spline", kind: "accent" },
        { label: "Straight lines", kind: "muted" },
        { label: "Drawn by the Simulator", kind: "dot" },
      ]}
      aria-label="A square mesh of 3 by 3 vertices with the right edge's middle vertex pulled out by 0.15 of the width. Joined by straight lines, the edge would come to a point at 0.15. Core Animation drew a smooth bulge reaching 0.101, and a cubic B-spline through the same vertices reaches 0.1, drawn on top of it."
    >
      <svg className={base.svg} viewBox="0 0 560 128" aria-hidden="true">
        <path
          className={styles.edge}
          d={`${line([at(0, 0), ...curve, at(0, SQUARE)])}Z`}
        />
        <path
          className={base.guide}
          d={line([at(SQUARE, 0), [vx, vy], at(SQUARE, SQUARE)])}
        />
        <path className={base.lineAccent} d={line(curve)} />
        {TEST.map((vertex, v) => {
          const [x, y] = at(vertex.x, vertex.y);
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: the test mesh always has the same nine vertices
            <circle key={v} className={base.knot} cx={x} cy={y} r={1.6} />
          );
        })}
        <circle className={styles.sample} cx={dx} cy={midY} r={2.2} />
        <path className={base.dimension} d={`M${ex} ${midY}H${vx}`} />
        <text className={base.tag} x={vx + 10} y={vy - 14}>
          {`Vertex ${PULL}`}
        </text>
        <text className={base.tag} x={vx + 10} y={vy + 4}>
          {`Drawn ${DRAWN}`}
        </text>
        <text className={base.tag} x={vx + 10} y={vy + 22}>
          {`B-spline ${((peak.x - SQUARE) / SQUARE).toFixed(3)}`}
        </text>
      </svg>
    </Chart>
  );
}

// Corner radii as drawn on the screen, in points
const CORNER_STYLES = {
  springboard: base.lineStrong,
  interpolate: base.lineMuted,
  scaled: base.lineAccent,
};
const CORNERS_END = 0.6;
const CORNERS_MAX = 120;
const CORNERS_TOP = 24;
const CORNERS_BOTTOM = 124;

function cornersOf(open: boolean) {
  const transition = createAppTransition(() => SAFARI);
  if (open) transition.show(0);
  else {
    transition.show(-10);
    transition.sample(-1);
    transition.hide(0);
  }
  return range(121).map((k) => {
    const t = (k / 120) * CORNERS_END;
    const frame = transition.sample(t);
    return {
      t,
      springboard: frame.radius,
      interpolate: lerp(ICON_RADIUS, 62, frame.progress),
      scaled: (ICON_RADIUS * frame.scale) / START,
    };
  });
}

export function Corners() {
  return (
    <Chart
      title="Corner Radius"
      legend={[
        { label: "SpringBoard", kind: "ink" },
        { label: "Interpolated", kind: "muted" },
        { label: "Scaled with the card", kind: "accent" },
      ]}
      aria-label="Safari's corner radius on the screen, in points, opening and closing. SpringBoard's radius first heads for half the screen's width and is then retargeted to the screen's 62 points opening, or the icon's corners closing. Interpolating from 16.64 to 62 points follows it closely opening but runs well under it early in the close. Scaling the icon's radius with the card ends at 104.5 points, far too round."
    >
      <svg className={base.svg} viewBox="0 0 560 160" aria-hidden="true">
        {[true, false].map((open, i) => {
          const { x0, x1, px, py } = plot(
            i,
            CORNERS_END,
            CORNERS_MAX,
            CORNERS_TOP,
            CORNERS_BOTTOM,
          );
          const samples = cornersOf(open);
          return (
            <g key={String(open)}>
              <text className={base.name} x={x0} y={12}>
                {open ? "Opening" : "Closing"}
              </text>
              <path className={base.axis} d={`M${x0} ${py(0)}H${x1}`} />
              {[62, ICON_RADIUS].map((r) => (
                <g key={r}>
                  <path className={base.guide} d={`M${x0} ${py(r)}H${x1}`} />
                  <text
                    className={styles.caps}
                    x={x1}
                    y={py(r) - 4}
                    textAnchor="end"
                  >
                    {`${r} pt`}
                  </text>
                </g>
              ))}
              {(["springboard", "interpolate", "scaled"] as const).map(
                (key) => (
                  <path
                    key={key}
                    className={CORNER_STYLES[key]}
                    d={line(samples.map((s) => [px(s.t), py(s[key])]))}
                  />
                ),
              )}
              {[0, 0.3, 0.6].map((t) => (
                <text
                  key={t}
                  className={styles.caps}
                  x={px(t)}
                  y={CORNERS_BOTTOM + 20}
                  textAnchor={
                    t ? (t === CORNERS_END ? "end" : "middle") : "start"
                  }
                >
                  {`${Math.round(t * 1000)} ms`}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </Chart>
  );
}
