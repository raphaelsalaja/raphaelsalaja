"use client";

import { Slider } from "@base-ui/react/slider";
import {
  type AppGeometry,
  continuousRect,
  createAppTransition,
  drawMesh,
  genieAmount,
  genieSprings,
  type MeshVertex,
  meshPoint,
  type Spring,
  springboard,
  TILE_COLUMNS,
  TILE_ROWS,
  value,
} from "@web-kits/springboard";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Control, ControlButton } from "@/components/controls";
import lab from "@/content/work/genie/demos/debug.module.css";
import {
  SPEED,
  SPEEDS,
  type Speed,
  TILES,
} from "@/content/work/genie/demos/shared";
import genieFixture from "../fixtures/genie.json";
import styles from "./debug.module.css";

// The app open on the 402 × 874 point iPhone the recordings were made on,
// scrubbed by time, with the mesh and the recording drawn over it.

const W = 402;
const H = 874;
const ICON = 64;
const SCREEN_RADIUS = 62;
const SAMPLES = 96;
const STRIPS = Array.from({ length: TILE_COLUMNS * TILE_ROWS }, (_, i) => i);

type Direction = "in" | "out";
type Line = {
  label: string;
  color: string;
  dashed?: boolean;
  at: (t: number) => number;
};
type Stat = { label: string; value: string; color?: string };
type Display = Record<string, boolean>;

const point = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;
const ms = (seconds: number) => `${Math.round(seconds * 1000)}ms`;
const share = (v: number) => `${Math.round(v * 100)}%`;

/** When a spring from 0 first reaches `target`. */
function timeAt(s: Spring, target: number, velocity = 0) {
  let lo = 0;
  let hi = 3;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (value(s, mid, velocity) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// The app open

const COLUMNS = [30.333, 122.889, 215.444, 308];
const ROWS = [90, 190.333, 290.667, 391];
const DOCK = [31, 125, 219, 313];
const DOCK_Y = 773.333;
const RECORDED: Record<string, string> = {
  "30.333 290.667": "Calendar",
  "308 391": "Settings",
  "125 773.333": "Safari",
};
const APPS = [
  ...ROWS.flatMap((y) => COLUMNS.map((x) => ({ x, y }))),
  ...DOCK.map((x) => ({ x, y: DOCK_Y })),
].map((at, i) => ({
  ...at,
  key: `${at.x} ${at.y}`,
  name: RECORDED[`${at.x} ${at.y}`] ?? TILES[i % TILES.length].name,
  color: TILES[i % TILES.length].color,
}));
const START_APP = APPS.findIndex((app) => app.name === "Safari");

const geometryOf = (app: (typeof APPS)[number]): AppGeometry => ({
  screen: { x: 0, y: 0, width: W, height: H },
  icon: { x: app.x, y: app.y, width: ICON, height: ICON },
  iconRadius: 16.64,
  screenRadius: SCREEN_RADIUS,
});

/** A fresh run from rest, so any time can be drawn on its own. */
function appAt(g: AppGeometry, direction: Direction, t: number) {
  const transition = createAppTransition(() => g);
  if (direction === "out") {
    transition.show(-10);
    transition.sample(-1);
    transition.hide(0);
  } else transition.show(0);
  return { frame: transition.sample(t), transition };
}

function appLength(g: AppGeometry, direction: Direction) {
  for (let t = 0; t < 3; t += 1 / 60) {
    const { transition } = appAt(g, direction, t);
    if (transition.settled(t)) return t;
  }
  return 3;
}

function recordedRun(app: (typeof APPS)[number], direction: Direction) {
  return genieFixture.runs.find(
    (run) =>
      Math.abs(run.icon[0] - app.x) < 0.01 &&
      Math.abs(run.icon[1] - app.y) < 0.01 &&
      run.open === (direction === "in"),
  );
}

/**
 * The recorded frame nearest the playhead's crop, and the port at exactly
 * that crop, which is how the parity test lines them up.
 */
function matchRecording(app: number, direction: Direction, progress: number) {
  const run = recordedRun(APPS[app], direction);
  if (!run) return null;
  const open = direction === "in";
  const sample = run.samples.reduce((best, s) =>
    Math.abs(s.progress - progress) < Math.abs(best.progress - progress)
      ? s
      : best,
  );
  const layout = open ? springboard.open : springboard.close;
  const at = timeAt(layout, open ? sample.progress : 1 - sample.progress);
  const port = appAt(geometryOf(APPS[app]), direction, at).frame.mesh;
  const recorded = sample.vertices.map(([x, y]) => ({ x, y }));
  return {
    recorded,
    port,
    near: Math.abs(sample.progress - progress) < 0.08,
    off: Math.max(
      ...port.map((v, i) =>
        Math.hypot(v.x - recorded[i].x, v.y - recorded[i].y),
      ),
    ),
  };
}

function net(mesh: readonly { x: number; y: number }[]) {
  const at = (i: number, j: number) => mesh[i * 3 + j];
  let d = "";
  for (let i = 0; i < 3; i++)
    d += `M${[0, 1, 2].map((j) => point(at(i, j).x, at(i, j).y)).join("L")}`;
  for (let j = 0; j < 3; j++)
    d += `M${[0, 1, 2].map((i) => point(at(i, j).x, at(i, j).y)).join("L")}`;
  return d;
}

function surface(mesh: readonly MeshVertex[]) {
  const line = (f: (k: number) => { x: number; y: number }) =>
    `M${Array.from({ length: 17 }, (_, k) => {
      const p = f(k / 16);
      return point(p.x, p.y);
    }).join("L")}`;
  let d = "";
  for (let r = 0; r <= TILE_ROWS; r++)
    d += line((s) => meshPoint(mesh, s, r / TILE_ROWS));
  for (let c = 0; c <= TILE_COLUMNS; c++)
    d += line((t) => meshPoint(mesh, c / TILE_COLUMNS, t));
  return d;
}

const dots = (points: readonly { x: number; y: number }[], r: number) =>
  points
    .map(
      ({ x, y }) =>
        `M${point(x - r, y)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`,
    )
    .join("");

function AppStage({
  app,
  direction,
  time,
  display,
  onTap,
  onClose,
}: {
  app: number;
  direction: Direction;
  time: number;
  display: Display;
  onTap: (index: number) => void;
  onClose: () => void;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const strips = useRef<(HTMLDivElement | null)[]>([]);
  const g = geometryOf(APPS[app]);
  const { frame } = appAt(g, direction, time);
  const match = display.Recording
    ? matchRecording(app, direction, frame.progress)
    : null;

  useLayoutEffect(() => {
    const node = layer.current;
    if (!node) return;
    const radius = frame.radius / frame.scale;
    node.style.setProperty("--card-height", `${frame.layerHeight}px`);
    node.style.setProperty("--card-shift", `${(frame.layerHeight - H) / 2}px`);
    node.style.setProperty(
      "--card-clip",
      `path("${continuousRect(W, frame.layerHeight, radius)}")`,
    );
    drawMesh(strips.current, frame.mesh, W, frame.layerHeight);
  });

  const closed =
    direction === "out" ? time > 0 && frame.progress < 1e-3 : time === 0;

  return (
    <div className={styles.phoneBox}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: Close in the panel is the keyboard route */}
      <div
        className={styles.phone}
        onClick={() => {
          if (!closed) onClose();
        }}
      >
        <div
          className={styles.home}
          style={{ transform: `scale(${frame.home})` }}
          inert={closed ? undefined : true}
        >
          <div className={styles.dock} />
          {APPS.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={styles.icon}
              style={{
                left: item.x,
                top: item.y,
                background: item.color,
                visibility: index === app ? "hidden" : undefined,
              }}
              aria-label={`Open ${item.name}`}
              onClick={(event) => {
                event.stopPropagation();
                onTap(index);
              }}
            />
          ))}
        </div>
        <div
          ref={layer}
          className={styles.cardLayer}
          style={
            {
              "--card-color": APPS[app].color,
              opacity: display.Card ? 1 : 0,
            } as CSSProperties
          }
          aria-hidden
        >
          {STRIPS.map((index) => (
            <div
              key={index}
              ref={(node) => {
                strips.current[index] = node;
              }}
              className={styles.meshTile}
            >
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <span className={styles.bar} />
                  <span className={`${styles.bar} ${styles.barShort}`} />
                  <span className={styles.bar} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <svg className={styles.overlay} viewBox={`0 0 ${W} ${H}`} aria-hidden>
        {display.Frame && (
          <rect
            data-kind="Frame"
            x={frame.x}
            y={frame.y}
            width={frame.width}
            height={frame.height}
          />
        )}
        {display.Mesh && (
          <>
            <path data-kind="Surface" d={surface(frame.mesh)} />
            <path data-kind="Net" d={net(frame.mesh)} />
            <path data-kind="Vertex" d={dots(frame.mesh, 4)} />
          </>
        )}
        {match?.near && (
          <>
            <path data-kind="RecordedNet" d={net(match.recorded)} />
            <path data-kind="Recorded" d={dots(match.recorded, 7)} />
            <path data-kind="Matched" d={dots(match.port, 2)} />
          </>
        )}
      </svg>
    </div>
  );
}

function appLines(g: AppGeometry, direction: Direction): Line[] {
  const open = direction === "in";
  const layout = open ? springboard.open : springboard.close;
  const rows = genieSprings(g, open);
  const toward = (s: Spring) => (t: number) =>
    open ? value(s, t) : 1 - value(s, t);
  const colours = ["var(--orange)", "var(--green)", "var(--pink)"];
  return [
    { label: "Crop", color: "var(--blue)", at: toward(layout) },
    ...["Top row", "Middle row", "Bottom row"].map((label, i) => ({
      label,
      color: colours[i],
      at: toward(rows[i]),
    })),
    {
      label: "Radius",
      color: "var(--purple)",
      dashed: true,
      at: (t: number) =>
        appAt(g, direction, t).frame.radius /
        appAt(g, direction, t).frame.scale /
        (W / 2),
    },
    {
      label: "Home",
      color: "var(--gray-8)",
      dashed: true,
      at: (t: number) =>
        (1 - appAt(g, direction, t).frame.home) / (1 - springboard.home.scale),
    },
  ];
}

function appStats(
  app: (typeof APPS)[number],
  direction: Direction,
  time: number,
  display: Display,
): Stat[] {
  const g = geometryOf(app);
  const open = direction === "in";
  const rows = genieSprings(g, open);
  const { frame } = appAt(g, direction, time);
  const stats: Stat[] = [
    { label: "Crop", value: share(frame.progress), color: "var(--blue)" },
    { label: "Genie amount", value: genieAmount(g).toFixed(3) },
    ...["Top row", "Middle row", "Bottom row"].map((label, i) => ({
      label,
      value: ms(rows[i].response),
      color: ["var(--orange)", "var(--green)", "var(--pink)"][i],
    })),
    {
      label: "Radius",
      value: `${(frame.radius / frame.scale).toFixed(1)}pt`,
      color: "var(--purple)",
    },
  ];
  if (display.Recording) {
    const match = matchRecording(APPS.indexOf(app), direction, frame.progress);
    stats.push({
      label: "Off SpringBoard",
      value: match ? `${match.off.toFixed(2)}pt` : "Not recorded",
      color: match ? "var(--red)" : undefined,
    });
  }
  return stats;
}

// The lab

function useTimeline(lengthOf: (direction: Direction) => number) {
  const [direction, setDirection] = useState<Direction>("in");
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState<Speed>("1×");
  const rate = useRef(1);
  rate.current = SPEED[speed];
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return {
    direction,
    time,
    speed,
    setSpeed,
    play(next: Direction) {
      cancelAnimationFrame(frame.current);
      setDirection(next);
      const total = lengthOf(next);
      let t = 0;
      let last = 0;
      const tick = (now: number) => {
        const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
        last = now;
        t = Math.min(t + delta * rate.current, total);
        setTime(t);
        if (t < total) frame.current = requestAnimationFrame(tick);
      };
      setTime(0);
      frame.current = requestAnimationFrame(tick);
    },
    scrub(t: number) {
      cancelAnimationFrame(frame.current);
      setTime(t);
    },
  };
}

const TICKS = 41;

function Scrubber({
  time,
  length,
  onChange,
}: {
  time: number;
  length: number;
  onChange: (t: number) => void;
}) {
  return (
    <Slider.Root
      className={lab.scrubber}
      value={length ? time / length : 0}
      min={0}
      max={1}
      step={0.001}
      thumbAlignment="edge"
      onValueChange={(next) => onChange((next as number) * length)}
    >
      <span className={lab.time}>{ms(time)}</span>
      <Slider.Control className={lab.scrubControl}>
        <Slider.Track className={lab.scrubTrack}>
          <div className={lab.ruler} aria-hidden>
            {Array.from({ length: TICKS }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: ticks are fixed and never reorder
              <span key={i} data-major={i % 10 === 0 || undefined} />
            ))}
          </div>
          <Slider.Indicator className={lab.played} />
          <Slider.Thumb className={lab.playhead} aria-label="Time" />
        </Slider.Track>
      </Slider.Control>
      <span className={lab.time}>{ms(length)}</span>
    </Slider.Root>
  );
}

/** Values from −0.1 to 1.1 up the chart, so overshoot stays in view. */
const chartY = (v: number) => ((1.1 - v) / 1.2) * 100;

function Chart({
  lines,
  length,
  time,
}: {
  lines: Line[];
  length: number;
  time: number;
}) {
  const paths = useMemo(
    () =>
      lines.map((line) => {
        let d = "";
        for (let i = 0; i <= SAMPLES; i++) {
          const t = (i / SAMPLES) * length;
          d += `${i ? "L" : "M"}${point((t / length) * 100, chartY(line.at(t)))}`;
        }
        return { ...line, d };
      }),
    [lines, length],
  );
  return (
    <svg
      className={`${lab.chart} ${styles.chart}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        data-kind="Guide"
        d={`M0 ${chartY(0)}H100M0 ${chartY(1)}H100`}
        vectorEffect="non-scaling-stroke"
      />
      {paths.map((line) => (
        <path
          key={line.label}
          d={line.d}
          style={{ stroke: line.color }}
          strokeDasharray={line.dashed ? "3 3" : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path
        data-kind="Playhead"
        d={`M${((time / length) * 100).toFixed(2)} 0V100`}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <dl className={lab.stats}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className={styles.stat}>
            <span
              className={styles.swatch}
              style={{ background: stat.color ?? "transparent" }}
            />
            {stat.label}
          </dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={lab.group} aria-label={title}>
      <div className={lab.heading} aria-hidden>
        {title}
      </div>
      {children}
    </section>
  );
}

const DISPLAYS = ["Card", "Mesh", "Frame", "Recording"];

export function AppLab() {
  const [app, setApp] = useState(START_APP);
  const [display, setDisplay] = useState<Display>({
    Card: true,
    Mesh: true,
    Frame: false,
    Recording: true,
  });
  const g = geometryOf(APPS[app]);
  const timeline = useTimeline((direction) => appLength(g, direction));
  const { time, direction } = timeline;
  // biome-ignore lint/correctness/useExhaustiveDependencies: the icon's geometry follows `app`
  const length = useMemo(() => appLength(g, direction), [app, direction]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: the icon's geometry follows `app`
  const lines = useMemo(() => appLines(g, direction), [app, direction]);

  return (
    <div className={lab.lab} data-demo-id="apple-debug-app">
      <div className={lab.stageColumn}>
        <div className={styles.stage}>
          <AppStage
            app={app}
            direction={direction}
            time={time}
            display={display}
            onTap={(index) => {
              setApp(index);
              timeline.play("in");
            }}
            onClose={() => timeline.play("out")}
          />
        </div>
        <Scrubber time={time} length={length} onChange={timeline.scrub} />
      </div>
      <div className={lab.panel}>
        <Group title="Readout">
          <div className={lab.readout}>
            <Chart lines={lines} length={length} time={time} />
            <Stats stats={appStats(APPS[app], direction, time, display)} />
          </div>
        </Group>
        <Group title="Playback">
          <div className={lab.pair}>
            <ControlButton onClick={() => timeline.play("in")}>
              Open
            </ControlButton>
            <ControlButton onClick={() => timeline.play("out")}>
              Close
            </ControlButton>
          </div>
          <Control
            label="Speed"
            options={SPEEDS}
            value={timeline.speed}
            onChange={timeline.setSpeed}
          />
        </Group>
        <Group title="Display">
          <div className={styles.choices}>
            {DISPLAYS.map((name) => (
              <ControlButton
                key={name}
                aria-pressed={display[name]}
                onClick={() =>
                  setDisplay((current) => ({
                    ...current,
                    [name]: !current[name],
                  }))
                }
              >
                {name}
              </ControlButton>
            ))}
          </div>
        </Group>
      </div>
    </div>
  );
}
