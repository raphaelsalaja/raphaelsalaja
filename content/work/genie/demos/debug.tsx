"use client";

import { Slider } from "@base-ui/react/slider";
import type { Rect } from "@web-kits/springboard";
import {
  createDriver,
  type Edge,
  GENIE_DURATION,
  genieFunnel,
  genieMesh,
  genieOpacity,
  geniePhases,
  HANDOFF,
  type Mesh,
} from "@web-kits/springboard";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Control, ControlButton } from "@/components/controls";
import styles from "./debug.module.css";
import {
  AppWindow,
  desktop,
  Lights,
  place,
  Screen,
  tapped,
  tint,
  useDrag,
} from "./desktop";
import { GENIE_RECORDING } from "./recording";
import { SPEED, SPEEDS, type Speed } from "./shared";

const [SCREEN_W, SCREEN_H] = GENIE_RECORDING.screen;
const [WINDOW_X, WINDOW_Y, WINDOW_W, WINDOW_H] = GENIE_RECORDING.window;
const TARGET_SIZE = 140;
const START = {
  window: { x: WINDOW_X / SCREEN_W, y: WINDOW_Y / SCREEN_H },
  target: { x: 930 / SCREEN_W, y: 960 / SCREEN_H },
};
const SIZE = {
  window: { width: WINDOW_W / SCREEN_W, height: WINDOW_H / SCREEN_W },
  target: { width: TARGET_SIZE / SCREEN_W, height: TARGET_SIZE / SCREEN_W },
};
const KNOT = 7;

const point = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;

function wireframe(mesh: Mesh) {
  const { columns, rows, points } = mesh;
  const at = (c: number, r: number) => {
    const k = (r * columns + c) * 4;
    return point(points[k + 2], points[k + 3]);
  };
  const paths: string[] = [];
  for (let r = 0; r < rows; r++)
    paths.push(
      `M${Array.from({ length: columns }, (_, c) => at(c, r)).join("L")}`,
    );
  for (let c = 0; c < columns; c++)
    paths.push(
      `M${Array.from({ length: rows }, (_, r) => at(c, r)).join("L")}`,
    );
  return paths.join("");
}

// Both sides as one closed shape: down the near side and back up the far one.
function outline(near: number[], far: number[]) {
  let d = curve(near);
  for (let i = far.length - 2; i >= 0; i -= 2)
    d += `L${point(far[i], far[i + 1])}`;
  return `${d}Z`;
}

function curve(side: number[]) {
  let d = "";
  for (let i = 0; i < side.length; i += 2)
    d += `${i ? "L" : "M"}${point(side[i], side[i + 1])}`;
  return d;
}

const knot = (x: number, y: number) =>
  `M${point(x - KNOT, y)}a${KNOT} ${KNOT} 0 1 0 ${KNOT * 2} 0a${KNOT} ${KNOT} 0 1 0 ${-KNOT * 2} 0`;

// Where an element is, in points of the recorded screen.
function rectIn(node: HTMLElement, screen: HTMLElement, scale: number) {
  const a = node.getBoundingClientRect();
  const b = screen.getBoundingClientRect();
  return {
    x: (a.left - b.left) / scale,
    y: (a.top - b.top) / scale,
    width: a.width / scale,
    height: a.height / scale,
  };
}

// The Dock's edge for a target anywhere: the side of the window it's furthest
// beyond. Overlapping the window, it falls back to the bottom.
function edgeFor(from: Rect, to: Rect): Edge {
  const gaps: [Edge, number][] = [
    ["bottom", to.y - (from.y + from.height)],
    ["top", from.y - (to.y + to.height)],
    ["right", to.x - (from.x + from.width)],
    ["left", from.x - (to.x + to.width)],
  ];
  const [edge, gap] = gaps.reduce((a, b) => (b[1] > a[1] ? b : a));
  return gap > 0 ? edge : "bottom";
}

const share = (value: number) => `${Math.round(value * 100)}%`;

type GenieFrame = {
  progress: number;
  rows: number;
  bend: number;
  slide: number;
};

function createStore() {
  let frame: GenieFrame = { progress: 0, rows: 0, bend: 0, slide: 0 };
  const listeners = new Set<() => void>();
  return {
    get: () => frame,
    set(next: GenieFrame) {
      frame = next;
      for (const listener of listeners) listener();
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// A window and a target on the recorded 1800 by 1169 point screen. Both drag,
// and the funnel follows them.
function useGenie() {
  const stage = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const funnelPath = useRef<SVGPathElement>(null);
  const knots = useRef<SVGPathElement>(null);
  const meshPath = useRef<SVGPathElement>(null);
  const areaPath = useRef<SVGPathElement>(null);
  const haloPath = useRef<SVGPathElement>(null);
  const chart = useRef<SVGSVGElement>(null);
  const [store] = useState(createStore);
  const [funnel, setFunnel] = useState(true);
  const [wire, setWire] = useState(false);
  const [fade, setFade] = useState(true);
  const [blur, setBlur] = useState(true);
  const [speed, setSpeed] = useState<Speed>("1×");
  const [at, setAt] = useState(START);
  const settings = useRef({ funnel, wire, fade, blur });
  settings.current = { funnel, wire, fade, blur };
  const driver = useRef<ReturnType<typeof createDriver>>(null);

  // Re-measures and redraws the current frame, mid-drag included.
  const remeasure = useCallback(() => {
    const current = driver.current;
    if (!current) return;
    current.reset();
    current.set(current.progress);
  }, []);
  const onDragWindow = useDrag(
    stage,
    win,
    (next) => setAt((current) => ({ ...current, window: next })),
    remeasure,
  );
  const onDragTarget = useDrag(
    stage,
    target,
    (next) => setAt((current) => ({ ...current, target: next })),
    remeasure,
  );

  useEffect(() => {
    const paint = (progress: number) => {
      if (win.current)
        win.current.style.visibility =
          progress >= HANDOFF ? "hidden" : "visible";
      const screen = stage.current;
      if (!screen?.clientWidth || !win.current || !target.current) return;
      const scale = screen.clientWidth / SCREEN_W;
      const from = rectIn(win.current, screen, scale);
      const to = rectIn(target.current, screen, scale);
      const edge = edgeFor(from, to);
      const mesh = genieMesh(progress, from, to, edge);
      const phases = geniePhases(progress, from, to, edge);
      // With the target to the side, the mesh is two rows by many columns.
      store.set({
        progress,
        rows: Math.max(mesh.rows, mesh.columns),
        bend: phases.bent,
        slide: phases.poured,
      });

      const { funnel, wire, fade, blur } = settings.current;
      if (chart.current)
        plot(chart.current, progress, { fade, blur }, from, to, edge);
      let sides = "";
      let dots = "";
      let area = "";
      if (funnel) {
        const [near, far] = genieFunnel(from, to, edge);
        sides = curve(near) + curve(far);
        area = outline(near, far);
        for (const side of [near, far])
          dots +=
            knot(side[0], side[1]) + knot(side.at(-2) ?? 0, side.at(-1) ?? 0);
        // The fades run from the window's end of the funnel to the target's.
        const ends = {
          x1: (near[0] + far[0]) / 2,
          y1: (near[1] + far[1]) / 2,
          x2: ((near.at(-2) ?? 0) + (far.at(-2) ?? 0)) / 2,
          y2: ((near.at(-1) ?? 0) + (far.at(-1) ?? 0)) / 2,
        };
        for (const gradient of screen.querySelectorAll("linearGradient"))
          for (const [key, value] of Object.entries(ends))
            gradient.setAttribute(key, value.toFixed(1));
      }
      funnelPath.current?.setAttribute("d", sides);
      haloPath.current?.setAttribute("d", sides);
      areaPath.current?.setAttribute("d", area);
      knots.current?.setAttribute("d", dots);
      meshPath.current?.setAttribute(
        "d",
        wire && progress > 0 ? wireframe(mesh) : "",
      );
      // The rows fade with the window, or they'd sit on the target at the end.
      meshPath.current?.style.setProperty(
        "opacity",
        fade ? `${genieOpacity(progress)}` : "",
      );
    };
    const created = createDriver(() => {
      const screen = stage.current;
      if (!screen || !win.current || !target.current) return null;
      const scale = screen.clientWidth / SCREEN_W;
      return {
        source: win.current,
        target: target.current,
        bounds: screen,
        scale,
        fade: settings.current.fade,
        blur: settings.current.blur,
        clip: true,
        edge: edgeFor(
          rectIn(win.current, screen, scale),
          rectIn(target.current, screen, scale),
        ),
      };
    }, paint);
    driver.current = created;
    created.set(0);
    const observer = new ResizeObserver(remeasure);
    if (stage.current) observer.observe(stage.current);
    return () => {
      observer.disconnect();
      created.dispose();
    };
  }, [remeasure, store]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a new overlay or position redraws the current frame
  useEffect(remeasure, [funnel, wire, fade, blur, at]);

  const seconds = GENIE_DURATION / SPEED[speed];

  return {
    stage,
    win,
    target,
    funnelPath,
    knots,
    meshPath,
    areaPath,
    haloPath,
    chart,
    onDragWindow,
    onDragTarget,
    store,
    at,
    funnel,
    setFunnel,
    wire,
    setWire,
    fade,
    setFade,
    blur,
    setBlur,
    speed,
    setSpeed,
    moved: at !== START,
    seconds,
    play: (to: 0 | 1) => driver.current?.play(to, seconds),
    set: (progress: number) => driver.current?.set(progress),
    reset: () => {
      driver.current?.set(0);
      setAt(START);
    },
  };
}

type Genie = ReturnType<typeof useGenie>;

const useGenieFrame = ({ store }: Genie) =>
  useSyncExternalStore(store.subscribe, store.get, store.get);

function GenieStage({ genie }: { genie: Genie }) {
  const id = useId().replace(/[^\w-]/g, "");
  const viewBox = `0 0 ${SCREEN_W} ${SCREEN_H}`;
  return (
    <Screen ref={genie.stage} aspect={SCREEN_W / SCREEN_H}>
      <svg
        className={styles.underlay}
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${id}-area`} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--blue)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--blue)" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          ref={genie.areaPath}
          data-kind="Area"
          style={{ fill: `url(#${id}-area)` }}
        />
      </svg>
      <div className={desktop.windows}>
        {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: the yellow light is the keyboard route, and its click bubbles here */}
        <div
          ref={genie.win}
          className={desktop.window}
          style={{
            ...place({ ...SIZE.window, ...genie.at.window }),
            ...tint("files"),
          }}
          onPointerDown={genie.onDragWindow}
          onClick={(event) => {
            if (tapped(event)) genie.play(1);
          }}
        >
          <AppWindow lights={<Lights label="Files" />} />
        </div>
      </div>
      {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: Restore in the panel is the keyboard route */}
      <div
        ref={genie.target}
        className={styles.target}
        style={place({ ...SIZE.target, ...genie.at.target })}
        onPointerDown={genie.onDragTarget}
        onClick={(event) => {
          if (tapped(event)) genie.play(0);
        }}
      >
        Target
      </div>
      <svg
        className={styles.overlay}
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${id}-side`} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--blue)" stopOpacity="0.3" />
            <stop offset="1" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
        <path
          ref={genie.meshPath}
          data-kind="Mesh"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={genie.haloPath}
          data-kind="Halo"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={genie.funnelPath}
          data-kind="Funnel"
          vectorEffect="non-scaling-stroke"
          style={{ stroke: `url(#${id}-side)` }}
        />
        <path
          ref={genie.knots}
          data-kind="Knots"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Screen>
  );
}

const TICKS = 41;

// A timeline: the played part filled, a playhead to drag, and times either side.
function Scrubber({ genie }: { genie: Genie }) {
  const { progress } = useGenieFrame(genie);
  const total = Math.round(genie.seconds * 1000);
  return (
    <Slider.Root
      className={styles.scrubber}
      value={progress}
      min={0}
      max={1}
      step={0.001}
      thumbAlignment="edge"
      onValueChange={(next) => genie.set(next as number)}
    >
      <span className={styles.time}>{Math.round(progress * total)}ms</span>
      <Slider.Control className={styles.scrubControl}>
        <Slider.Track className={styles.scrubTrack}>
          <div className={styles.ruler} aria-hidden>
            {Array.from({ length: TICKS }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: ticks are fixed and never reorder
              <span key={i} data-major={i % 10 === 0 || undefined} />
            ))}
          </div>
          <Slider.Indicator className={styles.played} />
          <Slider.Thumb className={styles.playhead} aria-label="Progress" />
        </Slider.Track>
      </Slider.Control>
      <span className={styles.time}>{total}ms</span>
    </Slider.Root>
  );
}

const SAMPLES = 64;

// Each phase over the whole run, 0 to 1 across and up, with the playhead.
function plot(
  svg: SVGSVGElement,
  progress: number,
  effects: { fade: boolean; blur: boolean },
  from: Rect,
  to: Rect,
  edge: Edge,
) {
  let bend = "";
  let slide = "";
  let opacity = "";
  let blur = "";
  for (let i = 0; i <= SAMPLES; i++) {
    const p = i / SAMPLES;
    const { bent, poured } = geniePhases(p, from, to, edge);
    const step = i ? "L" : "M";
    bend += `${step}${point(p * 100, (1 - bent) * 100)}`;
    slide += `${step}${point(p * 100, (1 - poured) * 100)}`;
    const faded = genieOpacity(p);
    if (effects.fade) opacity += `${step}${point(p * 100, (1 - faded) * 100)}`;
    if (effects.blur) blur += `${step}${point(p * 100, faded * 100)}`;
  }
  const paths: Record<string, string> = {
    Bend: bend,
    Slide: slide,
    Opacity: opacity,
    Blur: blur,
    Playhead: `M${(progress * 100).toFixed(2)} 0V100`,
  };
  for (const path of svg.querySelectorAll("path"))
    path.setAttribute("d", paths[path.dataset.kind ?? ""] ?? "");
}

function Readout({ genie }: { genie: Genie }) {
  const { rows, bend, slide } = useGenieFrame(genie);
  return (
    <div className={styles.readout}>
      <svg
        ref={genie.chart}
        className={styles.chart}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path data-kind="Opacity" vectorEffect="non-scaling-stroke" />
        <path data-kind="Blur" vectorEffect="non-scaling-stroke" />
        <path data-kind="Slide" vectorEffect="non-scaling-stroke" />
        <path data-kind="Bend" vectorEffect="non-scaling-stroke" />
        <path data-kind="Playhead" vectorEffect="non-scaling-stroke" />
      </svg>
      <dl className={styles.stats}>
        <div>
          <dt>Rows</dt>
          <dd>{rows || "–"}</dd>
        </div>
        <div data-kind="Bend">
          <dt>Bend</dt>
          <dd>{share(bend)}</dd>
        </div>
        <div data-kind="Slide">
          <dt>Slide</dt>
          <dd>{share(slide)}</dd>
        </div>
      </dl>
    </div>
  );
}

function Group({
  title,
  grow,
  children,
}: {
  title: string;
  grow?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={styles.group}
      data-grow={grow || undefined}
      aria-label={title}
    >
      <div className={styles.heading} aria-hidden>
        {title}
      </div>
      {children}
    </section>
  );
}

export function GenieDebug() {
  const genie = useGenie();
  return (
    <div className={styles.lab}>
      <div className={styles.stageColumn}>
        <GenieStage genie={genie} />
        <Scrubber genie={genie} />
      </div>
      <div className={styles.panel}>
        <Group title="Readout" grow>
          <Readout genie={genie} />
        </Group>
        <Group title="Playback">
          <div className={styles.pair}>
            <ControlButton onClick={() => genie.play(1)}>
              Minimise
            </ControlButton>
            <ControlButton onClick={() => genie.play(0)}>Restore</ControlButton>
          </div>
          <Control
            label="Speed"
            options={SPEEDS}
            value={genie.speed}
            onChange={genie.setSpeed}
          />
        </Group>
        <Group title="Display">
          <div className={styles.pair}>
            <ControlButton
              aria-pressed={genie.funnel}
              onClick={() => genie.setFunnel((value) => !value)}
            >
              Funnel
            </ControlButton>
            <ControlButton
              aria-pressed={genie.wire}
              onClick={() => genie.setWire((value) => !value)}
            >
              Mesh
            </ControlButton>
            <ControlButton
              aria-pressed={genie.fade}
              onClick={() => genie.setFade((value) => !value)}
            >
              Fade
            </ControlButton>
            <ControlButton
              aria-pressed={genie.blur}
              onClick={() => genie.setBlur((value) => !value)}
            >
              Blur
            </ControlButton>
          </div>
        </Group>
        <ControlButton disabled={!genie.moved} onClick={genie.reset}>
          Reset
        </ControlButton>
      </div>
    </div>
  );
}
