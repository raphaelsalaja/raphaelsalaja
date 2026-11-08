"use client";

import { Slider } from "@base-ui/react/slider";
import { MORPH, type MorphFrame, type MorphShape } from "@web-kits/springboard";
import {
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Control, ControlButton } from "@/components/controls";
import lab from "@/content/work/genie/demos/debug.module.css";
import { SPEED, SPEEDS, type Speed } from "@/content/work/genie/demos/shared";
import styles from "./debug.module.css";
import { GEOMETRY, replay } from "./recording";

const DIRECTIONS = ["Open", "Close"] as const;
type Direction = (typeof DIRECTIONS)[number];
const TOGGLE = ["On", "Off"] as const;

/** Room around the morph, in points, with extra above for the popover's kick. */
const MARGIN = 20;
const KICK = 24;

/** The part of the recorded screen the morph passes through, in points. */
const VIEW = (() => {
  const { source, target } = GEOMETRY;
  const left = Math.min(source.x, target.x) - MARGIN;
  const top = Math.min(source.y, target.y) - MARGIN - KICK;
  const right =
    Math.max(source.x + source.width, target.x + target.width) + MARGIN;
  const bottom =
    Math.max(source.y + source.height, target.y + target.height) + MARGIN;
  return { x: left, y: top, width: right - left, height: bottom - top };
})();
const END = 0.8;
const SAMPLES = 800;
const TICKS = 41;

const point = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;
/** Points to one decimal, with no "-0.0" at rest. */
const pt = (value: number) =>
  `${(Math.abs(value) < 0.05 ? 0 : value).toFixed(1)} pt`;

function box({ x, y, width, height, radius, scale }: MorphShape) {
  const w = width * scale;
  const h = height * scale;
  return {
    x: x - w / 2,
    y: y - h / 2,
    width: w,
    height: h,
    rx: Math.min(radius * scale, w / 2, h / 2),
  };
}

const knot = (x: number, y: number, r = 1.6) =>
  `M${point(x - r, y)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

function useMorphLab() {
  const [direction, setDirection] = useState<Direction>("Open");
  const [speed, setSpeed] = useState<Speed>("1×");
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [field, setField] = useState(true);
  const [shapes, setShapes] = useState(true);
  // A replay only runs forwards, so the run is played once and scrubbed.
  const run = useMemo(() => {
    const sample = replay(direction === "Open");
    return Array.from({ length: SAMPLES + 1 }, (_, i) =>
      sample((i / SAMPLES) * END),
    );
  }, [direction]);
  const scale = useRef(SPEED[speed]);
  scale.current = SPEED[speed];

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const step = ((now - last) / 1000) * scale.current;
      last = now;
      setT((current) => {
        const next = Math.min(current + step, END);
        if (next >= END) setPlaying(false);
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return {
    direction,
    setDirection(next: Direction) {
      setDirection(next);
      setT(0);
      setPlaying(false);
    },
    speed,
    setSpeed,
    t,
    scrub(next: number) {
      setPlaying(false);
      setT(next);
    },
    play() {
      setT(0);
      setPlaying(true);
    },
    frame: run[Math.round((t / END) * SAMPLES)],
    run,
    field,
    setField,
    shapes,
    setShapes,
  };
}

type MorphLab = ReturnType<typeof useMorphLab>;

function Stage({ lab: morph }: { lab: MorphLab }) {
  const id = useId().replace(/[^\w-]/g, "");
  const { frame, field, shapes } = morph;
  const popover = box(frame.popover);
  const source = box(frame.source);
  const { target, pivot } = GEOMETRY;
  const blur = field ? frame.field / 2 : 0;
  return (
    <div className={styles.stage}>
      <svg
        className={styles.svg}
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
        aria-hidden
      >
        <defs>
          <filter
            id={`${id}-field`}
            x={VIEW.x}
            y={VIEW.y}
            width={VIEW.width}
            height={VIEW.height}
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation={blur} result="blurred" />
            <feColorMatrix
              in="blurred"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 24 -11"
              result="shape"
            />
            <feGaussianBlur in="shape" stdDeviation={6} result="spread" />
            <feOffset in="spread" dy={3} result="drop" />
            <feFlood className={styles.shadow} result="dark" />
            <feComposite in="dark" in2="drop" operator="in" result="shadow" />
            <feFlood className={styles.glass} result="glass" />
            <feComposite in="glass" in2="shape" operator="in" result="body" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="body" />
            </feMerge>
          </filter>
        </defs>
        <rect
          className={styles.ghost}
          x={target.x}
          y={target.y}
          width={target.width}
          height={target.height}
          rx={GEOMETRY.targetRadius}
        />
        <g filter={`url(#${id}-field)`}>
          <rect {...popover} />
          <rect {...source} />
        </g>
        {shapes && (
          <>
            <rect className={styles.outline} {...popover} />
            <rect className={styles.outline} {...source} />
            <rect
              className={styles.ghost}
              x={pivot.x}
              y={pivot.y}
              width={pivot.width}
              height={pivot.height}
            />
            <path
              className={styles.knots}
              d={
                knot(frame.popover.x, frame.popover.y) +
                knot(frame.source.x, frame.source.y)
              }
            />
          </>
        )}
      </svg>
    </div>
  );
}

function Scrubber({ lab: morph }: { lab: MorphLab }) {
  return (
    <Slider.Root
      className={lab.scrubber}
      value={morph.t}
      min={0}
      max={END}
      step={0.001}
      thumbAlignment="edge"
      onValueChange={(next) => morph.scrub(next as number)}
    >
      <span className={lab.time}>{Math.round(morph.t * 1000)}ms</span>
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
      <span className={lab.time}>{END * 1000}ms</span>
    </Slider.Root>
  );
}

// The kick is what's left of the popover's height once its path is taken off.
function kickOf({ popover, progress }: MorphFrame) {
  const { target, pivot } = GEOMETRY;
  const from = pivot.y + pivot.height / 2;
  const to = target.y + target.height / 2;
  return popover.y - (from + (to - from) * progress);
}

// The lens and kick are drawn against their own peaks, the rest 0 to 1.
const CHANNELS: {
  kind: string;
  read: (frame: MorphFrame) => number;
  peaked?: boolean;
}[] = [
  { kind: "Kick", read: (frame) => Math.abs(kickOf(frame)), peaked: true },
  { kind: "Lens", read: (frame) => Math.abs(frame.lens), peaked: true },
  { kind: "Field", read: (frame) => frame.field / MORPH.field },
  { kind: "Progress", read: (frame) => frame.progress },
];

function Readout({ lab: morph }: { lab: MorphLab }) {
  const { run, frame, t } = morph;
  const paths = useMemo(
    () =>
      CHANNELS.map(({ kind, read, peaked }) => {
        const values = run.map(read);
        const peak = peaked ? Math.max(...values) || 1 : 1;
        return {
          kind,
          d: values
            .map(
              (v, i) =>
                `${i ? "L" : "M"}${point((i / SAMPLES) * 100, (1 - v / peak) * 100)}`,
            )
            .join(""),
        };
      }),
    [run],
  );
  return (
    <div className={lab.readout}>
      <svg
        className={`${lab.chart} ${styles.chart}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {paths.map(({ kind, d }) => (
          <path
            key={kind}
            data-kind={kind}
            d={d}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          data-kind="Playhead"
          d={`M${((t / END) * 100).toFixed(2)} 0V100`}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <dl className={`${lab.stats} ${styles.stats}`}>
        <div data-kind="Progress">
          <dt>Progress</dt>
          <dd>{frame.progress.toFixed(3)}</dd>
        </div>
        <div data-kind="Field">
          <dt>Field</dt>
          <dd>{pt(frame.field)}</dd>
        </div>
        <div data-kind="Lens">
          <dt>Lens</dt>
          <dd>{pt(frame.lens)}</dd>
        </div>
        <div data-kind="Kick">
          <dt>Kick</dt>
          <dd>{pt(kickOf(frame))}</dd>
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
      className={lab.group}
      data-grow={grow || undefined}
      aria-label={title}
    >
      <div className={lab.heading} aria-hidden>
        {title}
      </div>
      {children}
    </section>
  );
}

export function MorphDebug() {
  const morph = useMorphLab();
  return (
    <div className={lab.lab}>
      <div className={`${lab.stageColumn} ${styles.column}`}>
        <Stage lab={morph} />
        <Scrubber lab={morph} />
      </div>
      <div className={lab.panel}>
        <Group title="Readout" grow>
          <Readout lab={morph} />
        </Group>
        <Group title="Playback">
          <Control
            label="Run"
            options={DIRECTIONS}
            value={morph.direction}
            onChange={morph.setDirection}
          />
          <Control
            label="Speed"
            options={SPEEDS}
            value={morph.speed}
            onChange={morph.setSpeed}
          />
        </Group>
        <Group title="Display">
          <Control
            label="Field"
            options={TOGGLE}
            value={morph.field ? "On" : "Off"}
            onChange={(next) => morph.setField(next === "On")}
          />
          <Control
            label="Shapes"
            options={TOGGLE}
            value={morph.shapes ? "On" : "Off"}
            onChange={(next) => morph.setShapes(next === "On")}
          />
        </Group>
        <ControlButton onClick={morph.play}>Play</ControlButton>
      </div>
    </div>
  );
}
