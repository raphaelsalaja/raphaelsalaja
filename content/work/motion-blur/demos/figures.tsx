"use client";

import {
  animate,
  cubicBezier,
  type Easing,
  type MotionProps,
  motion,
  type Transition,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import base from "@/content/work/command-menu/demos/figures.module.css";
import styles from "./figures.module.css";
import { Shape } from "./shape";

const INK = 0.45;
const LOOP = 6;
const CLEAR = 0.9;
const MOVE = cubicBezier(0.77, 0, 0.175, 1);
/**
 * How long a figure shows its finished diagram after it scrolls into view
 * before the loop clears it.
 */
const SETTLE = 1500;

function useLoop() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setSettled(true), SETTLE);
    return () => {
      clearTimeout(timer);
      setSettled(false);
    };
  }, [inView]);

  const running = inView && settled;
  return { ref, play: running && !reduced, playing: running ? "" : undefined };
}

type Value = number | string;
type Track = { value: Value | Value[]; transition: Transition };

/**
 * Restarts a timeline at CLEAR, where every figure shows its finished diagram,
 * so playback picks up from what was on screen. A negative delay would do the
 * same, but Chrome then paints SVG opacity from the wrong point in the loop.
 */
function fromClear(values: Value[], times: number[], ease: Easing[]) {
  const at = times.findIndex((time) => time >= CLEAR);
  const exact = times[at] === CLEAR;
  const split = exact ? at : at - 1;
  const before = values[split];
  const after = values[split + 1];
  const clear =
    exact || before === after
      ? values[at]
      : typeof before === "number" && typeof after === "number"
        ? before +
          ((after - before) * (CLEAR - times[split])) /
            (times[split + 1] - times[split])
        : before;
  const tail = exact ? at + 1 : at;
  const head = at - 1;

  const next = { values: [clear], times: [0], ease: [] as Easing[] };
  for (let i = tail; i < values.length; i++) {
    next.values.push(values[i]);
    next.times.push(times[i] - CLEAR);
    next.ease.push(ease[i - 1]);
  }
  for (let i = 0; i <= head; i++) {
    next.values.push(values[i]);
    next.times.push(times[i] + 1 - CLEAR + (i === 0 ? 0.001 : 0));
    next.ease.push(i === 0 ? "linear" : ease[i - 1]);
  }
  next.values.push(clear);
  next.times.push(1);
  next.ease.push(ease[exact ? at - 1 : split]);
  return next;
}

function track(
  play: boolean,
  rest: Value,
  values: Value[],
  times: number[],
  ease: Easing | Easing[] = "linear",
): Track {
  if (!play) return { value: rest, transition: { duration: 0.3 } };
  const eases = Array.isArray(ease)
    ? ease
    : Array.from({ length: times.length - 1 }, () => ease);
  const rotated = fromClear(values, times, eases);
  return {
    value: rotated.values,
    transition: {
      duration: LOOP,
      times: rotated.times,
      ease: rotated.ease,
      repeat: Number.POSITIVE_INFINITY,
    },
  };
}

function animated(tracks: Record<string, Track>): MotionProps {
  const animate: Record<string, Value | Value[]> = {};
  const transition: Record<string, Transition> = {};
  for (const [key, { value, transition: timing }] of Object.entries(tracks)) {
    animate[key] = value;
    transition[key] = timing;
  }
  return {
    initial: false,
    animate: animate as MotionProps["animate"],
    transition: transition as Transition,
  };
}

function reveal(play: boolean, at: number): MotionProps {
  return animated({
    opacity: track(play, 1, [0, 0, 1, 1, 0], [0, at, at + 0.04, CLEAR, 1]),
  });
}

function fade(play: boolean): MotionProps {
  return animated({
    opacity: track(play, 1, [1, 1, 0, 0], [0, CLEAR, CLEAR + 0.05, 1]),
  });
}

type Point = readonly [number, number];

const COS30 = Math.cos(Math.PI / 6);
const round = (n: number) => Math.round(n * 100) / 100;

/** Draws a flat plane in isometric, with u running down-right and v down-left from (x, y). */
const iso = (x: number, y: number) =>
  `matrix(${round(COS30)} 0.5 ${-round(COS30)} 0.5 ${x} ${y})`;

const onPlane = (x: number, y: number, u: number, v: number): Point => [
  round(x + COS30 * (u - v)),
  round(y + 0.5 * (u + v)),
];

const points = (list: Point[]) => list.map((p) => p.join(",")).join(" ");

function Slab({
  x,
  y,
  width,
  depth,
  solid = false,
}: {
  x: number;
  y: number;
  width: number;
  depth: number;
  solid?: boolean;
}) {
  const top = [
    onPlane(x, y, 0, 0),
    onPlane(x, y, width, 0),
    onPlane(x, y, width, depth),
    onPlane(x, y, 0, depth),
  ];
  const [, right, front, left] = top;
  const drop = ([px, py]: Point): Point => [px, py + 3];
  return (
    <g>
      <polygon
        className={styles.side}
        points={points([left, front, drop(front), drop(left)])}
      />
      <polygon
        className={styles.side}
        points={points([front, right, drop(right), drop(front)])}
      />
      <polygon
        className={solid ? base.plate : styles.outline}
        points={points(top)}
      />
    </g>
  );
}

function Leader({
  from: [x, y],
  to,
  label,
  detail,
  strong = false,
}: {
  from: Point;
  to: number;
  label: string;
  detail?: string;
  strong?: boolean;
}) {
  const left = to < x;
  const anchor = left ? "end" : "start";
  const textX = left ? to - 6 : to + 6;
  return (
    <g>
      <circle className={styles.end} cx={x} cy={y} r={1.5} />
      <path className={base.leader} d={`M${x} ${y}H${to}`} />
      <text
        className={strong ? base.name : styles.caps}
        x={textX}
        y={y + 3.5}
        textAnchor={anchor}
      >
        {label}
      </text>
      {detail && (
        <text className={base.spec} x={textX} y={y + 17} textAnchor={anchor}>
          {detail}
        </text>
      )}
    </g>
  );
}

const accent = { "--figure-accent": "var(--gray-12)" } as CSSProperties;

const DISC = { x: 448, y: 120, r: 92 };
const GATE = { x: 360, y: 100, width: 80, height: 40 };
const FILM_Y = 88;
const FILM_H = 64;
const PITCH = 88;
const SUBJECT = 14;
/** 40px on screen, of which a 180° shutter records half. */
const TRAVEL = 24;
const STREAK = TRAVEL / 2;
const TURNS = [0, 1, 2];
const TURN = 0.25;
const turnStarts = (i: number) => 0.05 + TURN * i;
/** The film is pulled on while the closed half covers the whole gate. */
const PULL = [0.625, 0.875];
const FRAMES = Array.from({ length: 11 }, (_, m) => GATE.x + PITCH * (m - 5));
const SPROCKETS = Array.from({ length: 84 }, (_, n) => -88 + 12 * n);

export function Shutter() {
  const { ref, play, playing } = useLoop();
  const smear = SUBJECT + STREAK;
  const subjectY = GATE.y + (GATE.height - SUBJECT) / 2;
  const end = -PITCH * TURNS.length;
  const last = GATE.x + end + PITCH * (TURNS.length - 1);
  const streakX = last + TRAVEL * (TURNS.length - 1) + 4 + SUBJECT;
  const pull = track(
    play,
    end,
    [0, ...TURNS.flatMap((i) => [-PITCH * i, -PITCH * (i + 1)]), end],
    [0, ...TURNS.flatMap((i) => PULL.map((p) => turnStarts(i) + TURN * p)), 1],
    ["linear", ...TURNS.flatMap((): Easing[] => [MOVE, "linear"])],
  );

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="A film camera's rotary shutter: a disc with half of it cut away, turning once a frame in front of the film gate. While the open half passes the gate, the film records the shape smeared across the distance it moves in that time. While the closed half covers the gate, the film is pulled on to the next frame. The shape moves 40 pixels a frame, so each frame holds a 20 pixel streak."
    >
      <svg className={base.svg} viewBox="0 0 560 228" aria-hidden="true">
        <defs>
          <Profile id="motion-blur-film" width={SUBJECT} length={STREAK} />
          <clipPath id="motion-blur-film-window">
            <rect x={8} y={FILM_Y} width={544} height={FILM_H} />
          </clipPath>
          {TURNS.map((i) => {
            const opens = turnStarts(i);
            return (
              <clipPath key={i} id={`motion-blur-exposure-${i}`}>
                <motion.rect
                  x={GATE.x + PITCH * i + 4 + TRAVEL * i}
                  y={subjectY}
                  width={smear}
                  height={SUBJECT}
                  {...animated({
                    width: track(
                      play,
                      smear,
                      [0, 0, SUBJECT, smear, smear],
                      [0, opens, opens + 0.002, opens + TURN / 2, 1],
                    ),
                  })}
                />
              </clipPath>
            );
          })}
        </defs>
        <text className={base.formula} x={8} y={18}>
          streak = speed × shutter ÷ 360° × frame time
        </text>
        <text className={base.spec} x={8} y={34}>
          40 px a frame at 60 Hz
        </text>
        <text className={styles.caps} x={8} y={FILM_Y - 8}>
          film
        </text>
        <g clipPath="url(#motion-blur-film-window)">
          <motion.g {...animated({ x: pull })}>
            <rect
              className={styles.film}
              x={-88}
              y={FILM_Y}
              width={1000}
              height={FILM_H}
            />
            {SPROCKETS.map((x) => (
              <g key={x}>
                <rect
                  className={styles.frame}
                  x={x}
                  y={FILM_Y + 3}
                  width={5}
                  height={3}
                  rx={1}
                />
                <rect
                  className={styles.frame}
                  x={x}
                  y={FILM_Y + FILM_H - 6}
                  width={5}
                  height={3}
                  rx={1}
                />
              </g>
            ))}
            {FRAMES.map((x) => (
              <rect
                key={x}
                className={styles.frame}
                x={x}
                y={GATE.y}
                width={GATE.width}
                height={GATE.height}
                rx={2}
              />
            ))}
            {TURNS.map((i) => {
              const x = GATE.x + PITCH * i + 4 + TRAVEL * i;
              const opens = turnStarts(i);
              const closes = opens + TURN / 2;
              return (
                <g key={i}>
                  <motion.rect
                    x={x}
                    y={subjectY}
                    width={smear}
                    height={SUBJECT}
                    rx={3}
                    fill="url(#motion-blur-film)"
                    clipPath={`url(#motion-blur-exposure-${i})`}
                    {...fade(play)}
                  />
                  <motion.rect
                    fill="currentColor"
                    fillOpacity={INK}
                    x={x}
                    y={subjectY}
                    width={SUBJECT}
                    height={SUBJECT}
                    rx={3}
                    {...animated({
                      x: track(
                        play,
                        STREAK,
                        [0, 0, STREAK, STREAK],
                        [0, opens, closes, 1],
                      ),
                      opacity: track(
                        play,
                        0,
                        [0, 0, 1, 1, 0, 0],
                        [0, opens, opens + 0.01, closes, closes + 0.04, 1],
                      ),
                    })}
                  />
                </g>
              );
            })}
          </motion.g>
        </g>
        <motion.g
          {...animated({
            rotate: track(
              play,
              0,
              [0, 0, 360 * TURNS.length, 360 * TURNS.length],
              [0, turnStarts(0), turnStarts(TURNS.length), 1],
            ),
          })}
        >
          <circle className={base.ghost} cx={DISC.x} cy={DISC.y} r={DISC.r} />
          <path
            className={styles.blade}
            d={`M${DISC.x - DISC.r} ${DISC.y}A${DISC.r} ${DISC.r} 0 0 1 ${DISC.x + DISC.r} ${DISC.y}Z`}
          />
        </motion.g>
        <circle className={base.plate} cx={DISC.x} cy={DISC.y} r={6} />
        <rect className={base.ghost} {...GATE} rx={2} />
        <text
          className={styles.caps}
          x={GATE.x - 6}
          y={FILM_Y - 8}
          textAnchor="end"
        >
          gate
        </text>
        <Leader
          from={[DISC.x - 46, DISC.y + 80]}
          to={340}
          label="Shutter"
          detail="half open, one turn a frame"
          strong
        />
        <path
          className={base.dimension}
          d={`M${streakX} ${FILM_Y + FILM_H + 8}h${STREAK}`}
        />
        <text
          className={base.spec}
          x={streakX + STREAK / 2}
          y={FILM_Y + FILM_H + 22}
          textAnchor="middle"
        >
          20 px streak
        </text>
      </svg>
    </figure>
  );
}

function Profile({
  id,
  width,
  length,
}: {
  id: string;
  width: number;
  length: number;
}) {
  const ramp = Math.min(width, length) / (width + length);
  const peak = INK * Math.min(1, width / length);
  return (
    <linearGradient id={id}>
      <stop offset="0" stopColor="currentColor" stopOpacity="0" />
      <stop offset={ramp} stopColor="currentColor" stopOpacity={peak} />
      <stop offset={1 - ramp} stopColor="currentColor" stopOpacity={peak} />
      <stop offset="1" stopColor="currentColor" stopOpacity="0" />
    </linearGradient>
  );
}

const SCREEN = { x: 120, width: 432, height: 32 };
const HOLD_SQ = 20;
const HOLD_STEP = 48;
const HOLD_X = SCREEN.x + 16;
const HOLD_FRAMES = Array.from({ length: 8 }, (_, k) => k);
const HOLD_ROWS = [
  { y: 48, label: "Eye follows", spec: "smears 40 px", follows: true },
  { y: 152, label: "Eye still", spec: "strobes, 40 px apart", follows: false },
];
const holdStarts = (k: number) => 0.05 + 0.1 * k;

function Eye({ x, y, to }: { x: number; y: number; to: number }) {
  return (
    <>
      <path className={base.guide} d={`M${x} ${y + 6}V${to}`} />
      <path
        className={styles.eye}
        d={`M${x - 10} ${y}Q${x} ${y - 8} ${x + 10} ${y}Q${x} ${y + 8} ${x - 10} ${y}Z`}
      />
      <circle className={base.knot} cx={x} cy={y} r={2.5} />
    </>
  );
}

export function Hold() {
  const { ref, play, playing } = useLoop();
  const frames = HOLD_FRAMES.length;
  const last = HOLD_STEP * (frames - 1);
  const travel = last + HOLD_STEP / 2;
  const hop = track(
    play,
    last,
    [
      0,
      ...HOLD_FRAMES.flatMap((k) =>
        k === 0 ? [0] : [HOLD_STEP * (k - 1), HOLD_STEP * k],
      ),
      last,
    ],
    [
      0,
      ...HOLD_FRAMES.flatMap((k) =>
        k === 0 ? [holdStarts(0)] : [holdStarts(k) - 0.001, holdStarts(k)],
      ),
      1,
    ],
  );
  const glide = track(
    play,
    travel,
    [0, 0, travel, travel],
    [0, holdStarts(0), holdStarts(frames - 0.5), 1],
  );
  const gaze = HOLD_X + (HOLD_SQ - HOLD_STEP) / 2;

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="Two copies of a 60 Hz screen showing a square that jumps 40 pixels every frame and holds still in between. In the first, the eye follows the square smoothly, so while each frame holds, the square slides 40 pixels across the retina and is seen as a 40 pixel smear. In the second, the eye stays still, so each held frame lands as a separate sharp square, 40 pixels apart, and it strobes."
    >
      <svg className={base.svg} viewBox="0 0 560 246" aria-hidden="true">
        <defs>
          <Profile id="motion-blur-hold" width={HOLD_SQ} length={HOLD_STEP} />
          <clipPath id="motion-blur-seen">
            <rect x={SCREEN.x} y={0} width={SCREEN.width} height={246} />
          </clipPath>
        </defs>
        <text className={base.formula} x={8} y={18}>
          smear = speed × how long each frame is held
        </text>
        <text className={base.spec} x={8} y={34}>
          2,400 px/s at 60 Hz, each frame held 16.7 ms
        </text>
        <path className={base.guide} d="M8 146H552" />
        {HOLD_ROWS.map(({ y, label, spec, follows }) => {
          const eyeY = y + 6;
          const screen = y + 24;
          const seen = y + 66;
          return (
            <g key={label}>
              <text className={base.name} x={8} y={eyeY + 4}>
                {label}
              </text>
              <text className={base.spec} x={8} y={eyeY + 18}>
                {spec}
              </text>
              <text
                className={styles.caps}
                x={8}
                y={screen + SCREEN.height / 2 + 3.5}
              >
                screen
              </text>
              <text className={styles.caps} x={8} y={seen + HOLD_SQ / 2 + 3.5}>
                you see
              </text>
              <rect
                className={base.plate}
                x={SCREEN.x}
                y={screen}
                width={SCREEN.width}
                height={SCREEN.height}
                rx={6}
              />
              <motion.rect
                fill="currentColor"
                fillOpacity={INK}
                x={HOLD_X}
                y={screen + (SCREEN.height - HOLD_SQ) / 2}
                width={HOLD_SQ}
                height={HOLD_SQ}
                rx={3}
                {...animated({ x: hop })}
              />
              {follows ? (
                <>
                  <motion.g {...animated({ x: glide })}>
                    <Eye x={gaze} y={eyeY} to={screen} />
                  </motion.g>
                  <g clipPath="url(#motion-blur-seen)">
                    <motion.rect
                      x={gaze - (HOLD_SQ + HOLD_STEP) / 2}
                      y={seen}
                      width={HOLD_SQ + HOLD_STEP}
                      height={HOLD_SQ}
                      rx={3}
                      fill="url(#motion-blur-hold)"
                      {...animated({
                        x: glide,
                        opacity: track(
                          play,
                          1,
                          [0, 0, 1, 1, 0, 0],
                          [
                            0,
                            holdStarts(0),
                            holdStarts(0) + 0.02,
                            CLEAR,
                            CLEAR + 0.04,
                            1,
                          ],
                        ),
                      })}
                    />
                  </g>
                </>
              ) : (
                <>
                  <Eye x={SCREEN.x + SCREEN.width / 2} y={eyeY} to={screen} />
                  {HOLD_FRAMES.map((k) => (
                    <motion.rect
                      key={k}
                      fill="currentColor"
                      fillOpacity={INK}
                      x={HOLD_X + HOLD_STEP * k}
                      y={seen}
                      width={HOLD_SQ}
                      height={HOLD_SQ}
                      rx={3}
                      {...reveal(play, holdStarts(k))}
                    />
                  ))}
                </>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const ACC_X = 200;
const ACC_W = 160;
const ACC_D = 52;
const ACC_SQ = 36;
const ACC_STEP = ACC_SQ / 4;
const ACC_RENDERS = [0, 1, 2, 3];
const ACC_U = (ACC_W - ACC_SQ - ACC_STEP * (ACC_RENDERS.length - 1)) / 2;
const ACC_V = (ACC_D - ACC_SQ) / 2;
const ACC_TOP = 8;
const ACC_GAP = 32;
const ACC_AVERAGE = ACC_TOP + ACC_GAP * ACC_RENDERS.length + 14;
const ACC_LABELS = 412;
const accY = (i: number) => ACC_TOP + ACC_GAP * i;
const accumulates = (i: number) => 0.06 + 0.18 * i;

/** Alpha for the nth layer to land on a spot, so n layers add to n × share. */
const layer = (share: number, n: number) => share / (1 - share * n);

export function Accumulation() {
  const { ref, play, playing } = useLoop();
  const share = INK / ACC_RENDERS.length;
  const corners: [number, number][] = [
    [0, 0],
    [ACC_W, 0],
    [ACC_W, ACC_D],
    [0, ACC_D],
  ];
  const [shutterTop, shutterBottom] = [
    onPlane(ACC_X, accY(0), 0, ACC_D),
    onPlane(ACC_X, accY(ACC_RENDERS.length - 1), 0, ACC_D),
  ];

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="The accumulation buffer renders the square four times at even moments inside the shutter, each a little further along, and averages them. Each render adds a quarter to the average, so it comes out as a smear in steps of a quarter."
    >
      <svg className={base.svg} viewBox="0 0 560 276" aria-hidden="true">
        {corners.map(([u, v]) => {
          const [x, y] = onPlane(ACC_X, accY(0), u, v);
          return (
            <path
              key={`${u}-${v}`}
              className={base.guide}
              d={`M${x} ${y}V${y + ACC_AVERAGE - ACC_TOP}`}
            />
          );
        })}
        <Slab x={ACC_X} y={ACC_AVERAGE} width={ACC_W} depth={ACC_D} solid />
        <g transform={iso(ACC_X, ACC_AVERAGE)}>
          <rect
            className={base.ghost}
            x={ACC_U}
            y={ACC_V}
            width={ACC_SQ + ACC_STEP * (ACC_RENDERS.length - 1)}
            height={ACC_SQ}
          />
          {ACC_RENDERS.flatMap((i) =>
            ACC_RENDERS.map((k) => {
              const segment = i + k;
              const nth = i - Math.max(0, segment - (ACC_RENDERS.length - 1));
              return (
                <motion.rect
                  key={`${i}-${k}`}
                  fill="currentColor"
                  fillOpacity={layer(share, nth)}
                  x={ACC_U + ACC_STEP * segment}
                  y={ACC_V}
                  width={ACC_STEP}
                  height={ACC_SQ}
                  {...reveal(play, accumulates(i) + 0.06)}
                />
              );
            }),
          )}
        </g>
        {[...ACC_RENDERS].reverse().map((i) => (
          <Slab key={i} x={ACC_X} y={accY(i)} width={ACC_W} depth={ACC_D} />
        ))}
        {ACC_RENDERS.map((i) => (
          <motion.g
            key={i}
            transform={iso(ACC_X, accY(i))}
            {...reveal(play, accumulates(i))}
          >
            <rect
              className={styles.backing}
              x={ACC_U + ACC_STEP * i}
              y={ACC_V}
              width={ACC_SQ}
              height={ACC_SQ}
              rx={4}
            />
            <rect
              fill="currentColor"
              fillOpacity={INK}
              x={ACC_U + ACC_STEP * i}
              y={ACC_V}
              width={ACC_SQ}
              height={ACC_SQ}
              rx={4}
            />
          </motion.g>
        ))}
        {ACC_RENDERS.map((i) => (
          <Leader
            key={i}
            from={onPlane(ACC_X, accY(i), ACC_W, 0)}
            to={ACC_LABELS}
            label={`render ${i + 1}`}
          />
        ))}
        <Leader
          from={onPlane(ACC_X, ACC_AVERAGE, ACC_W, 0)}
          to={ACC_LABELS}
          label="Average"
          detail="each render adds ¼"
          strong
        />
        <path
          className={base.dimension}
          d={`M${shutterTop[0] - 14} ${shutterTop[1]}V${shutterBottom[1]}M${shutterTop[0] - 17} ${shutterTop[1]}h6M${shutterTop[0] - 17} ${shutterBottom[1]}h6`}
        />
        <text
          className={styles.caps}
          x={shutterTop[0] - 22}
          y={(shutterTop[1] + shutterBottom[1]) / 2 + 3.5}
          textAnchor="end"
        >
          one shutter
        </text>
      </svg>
    </figure>
  );
}

const VEL_X = 236;
const VEL_W = 176;
const VEL_D = 96;
const VEL_SQ = 64;
const VEL_U = 40;
const VEL_V = 16;
const VEL_TOP = 8;
const VEL_BUFFER = VEL_TOP + 72;
const VEL_ROW = VEL_V + VEL_SQ / 2;
const VEL_PIXEL = VEL_U + VEL_SQ - 12;
const VEL_TAPS = [-24, -12, 0, 12, 24].map((offset) => VEL_PIXEL + offset);
const VEL_SPAN = VEL_TAPS[VEL_TAPS.length - 1] - VEL_TAPS[0];
const VEL_ARROWS = [VEL_U + 12, VEL_U + 32];
const VEL_SWATCH = { x: 404, size: 28 };
const samples = (k: number) => 0.12 + 0.12 * k;

function Arrow({
  u,
  v,
  length = 12,
}: {
  u: number;
  v: number;
  length?: number;
}) {
  return (
    <path
      d={`M${u} ${v}H${u + length}M${u + length - 3} ${v - 3}L${u + length} ${v}L${u + length - 3} ${v + 3}`}
    />
  );
}

export function Velocity() {
  const { ref, play, playing } = useLoop();
  const hits = VEL_TAPS.filter((u) => u < VEL_U + VEL_SQ);
  const share = INK / VEL_TAPS.length;
  const pixel = onPlane(VEL_X, VEL_TOP, VEL_PIXEL, VEL_ROW);
  const below = onPlane(VEL_X, VEL_BUFFER, VEL_PIXEL, VEL_ROW);
  const swatchY = pixel[1] - VEL_SWATCH.size / 2;

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="The velocity buffer renders the square once, and every pixel stores an arrow for how far it moved. One pixel near the edge takes five samples along its arrow. Three land on the square and two miss, so the pixel comes out at three fifths."
    >
      <svg className={base.svg} viewBox="0 0 560 222" aria-hidden="true">
        <Slab x={VEL_X} y={VEL_BUFFER} width={VEL_W} depth={VEL_D} solid />
        <g transform={iso(VEL_X, VEL_BUFFER)}>
          <rect
            className={base.ghost}
            x={VEL_U}
            y={VEL_V}
            width={VEL_SQ}
            height={VEL_SQ}
            rx={4}
          />
          <g className={styles.arrow}>
            {[VEL_V + 12, VEL_V + VEL_SQ - 12].flatMap((v) =>
              VEL_ARROWS.map((u) => <Arrow key={`${u}-${v}`} u={u} v={v} />),
            )}
          </g>
          <g className={base.lineStrong}>
            <Arrow u={VEL_TAPS[0]} v={VEL_ROW} length={VEL_SPAN} />
          </g>
        </g>
        <path
          className={base.guide}
          d={`M${pixel[0]} ${pixel[1]}V${below[1]}`}
        />
        <Slab x={VEL_X} y={VEL_TOP} width={VEL_W} depth={VEL_D} />
        <g transform={iso(VEL_X, VEL_TOP)}>
          <rect
            className={styles.backing}
            x={VEL_U}
            y={VEL_V}
            width={VEL_SQ}
            height={VEL_SQ}
            rx={4}
          />
          <rect
            fill="currentColor"
            fillOpacity={INK}
            x={VEL_U}
            y={VEL_V}
            width={VEL_SQ}
            height={VEL_SQ}
            rx={4}
          />
          <motion.path
            className={base.focusLine}
            d={`M${VEL_TAPS[0]} ${VEL_ROW}h${VEL_SPAN}`}
            {...reveal(play, 0.04)}
          />
        </g>
        {VEL_TAPS.map((u, k) => {
          const [x, y] = onPlane(VEL_X, VEL_TOP, u, VEL_ROW);
          return (
            <motion.circle
              key={u}
              className={u < VEL_U + VEL_SQ ? styles.hit : styles.miss}
              cx={x}
              cy={y}
              r={3}
              {...reveal(play, samples(k))}
            />
          );
        })}
        <Leader
          from={onPlane(VEL_X, VEL_TOP, 0, VEL_D)}
          to={150}
          label="Colour"
          detail="the square, rendered once"
        />
        <Leader
          from={onPlane(VEL_X, VEL_BUFFER, 0, VEL_D)}
          to={150}
          label="Velocity"
          detail="how far each pixel moved"
        />
        <circle className={styles.end} cx={pixel[0]} cy={pixel[1]} r={1.5} />
        <path
          className={base.leader}
          d={`M${pixel[0]} ${pixel[1]}H${VEL_SWATCH.x - 8}`}
        />
        <rect
          className={base.ghost}
          x={VEL_SWATCH.x}
          y={swatchY}
          width={VEL_SWATCH.size}
          height={VEL_SWATCH.size}
          rx={4}
        />
        {hits.map((u, nth) => (
          <motion.rect
            key={u}
            fill="currentColor"
            fillOpacity={layer(share, nth)}
            x={VEL_SWATCH.x}
            y={swatchY}
            width={VEL_SWATCH.size}
            height={VEL_SWATCH.size}
            rx={4}
            {...reveal(play, samples(VEL_TAPS.indexOf(u)) + 0.04)}
          />
        ))}
        <text
          className={base.name}
          x={VEL_SWATCH.x + VEL_SWATCH.size + 10}
          y={pixel[1] - 2}
        >
          The pixel
        </text>
        <text
          className={base.spec}
          x={VEL_SWATCH.x + VEL_SWATCH.size + 10}
          y={pixel[1] + 12}
        >
          3 of 5 on the square
        </text>
      </svg>
    </figure>
  );
}

const DRAWN = [
  { name: "Smear", spec: "one stretched drawing" },
  { name: "Multiples", spec: "several copies" },
  { name: "Dry brush", spec: "streaks dragged behind" },
] as const;
const DRAWN_PANEL = 187;
const DRAWN_R = 14;
const DRAWN_Y = 40;
const DRAWN_MOVE = [0.1, 0.5];
const BRUSH = [
  { dy: -10, from: 0.25 },
  { dy: -5, from: 0 },
  { dy: 0, from: 0.1 },
  { dy: 5, from: 0.05 },
  { dy: 10, from: 0.35 },
];

export function Drawn() {
  const { ref, play, playing } = useLoop();
  const times = [0, DRAWN_MOVE[0], DRAWN_MOVE[1], 1];
  const ease: Easing[] = ["linear", MOVE, "linear"];

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="One move between two poses, drawn three ways. A smear is a single shape stretched across the gap between the poses. Multiples are several copies of the shape along the gap. Dry brush is the shape at its end pose with streaks dragged behind it."
    >
      <svg className={base.svg} viewBox="0 0 560 104" aria-hidden="true">
        {DRAWN.map(({ name, spec }, i) => {
          const ox = DRAWN_PANEL * i;
          const a = ox + 24;
          const b = ox + 162;
          const trail = (x: number) => x + DRAWN_R - ox;
          return (
            <g key={name}>
              <defs>
                <clipPath id={`motion-blur-drawn-${i}`}>
                  <motion.rect
                    x={ox}
                    y={0}
                    width={trail(b)}
                    height={80}
                    {...animated({
                      width: track(
                        play,
                        trail(b),
                        [trail(a), trail(a), trail(b), trail(b)],
                        times,
                        ease,
                      ),
                    })}
                  />
                </clipPath>
              </defs>
              <circle className={base.ghost} cx={a} cy={DRAWN_Y} r={DRAWN_R} />
              <circle className={base.ghost} cx={b} cy={DRAWN_Y} r={DRAWN_R} />
              <motion.g
                clipPath={`url(#motion-blur-drawn-${i})`}
                {...fade(play)}
              >
                {name === "Smear" && (
                  <rect
                    className={base.chip}
                    x={a - DRAWN_R}
                    y={DRAWN_Y - 10}
                    width={b - a + DRAWN_R * 2}
                    height={20}
                    rx={10}
                  />
                )}
                {name === "Multiples" &&
                  [0, 1, 2, 3, 4, 5].map((k) => (
                    <circle
                      key={k}
                      className={base.chip}
                      cx={a + ((b - a) * k) / 5}
                      cy={DRAWN_Y}
                      r={DRAWN_R}
                    />
                  ))}
                {name === "Dry brush" && (
                  <>
                    {BRUSH.map(({ dy, from }) => (
                      <path
                        key={dy}
                        className={styles.brush}
                        d={`M${a + (b - a) * from} ${DRAWN_Y + dy}H${b}`}
                      />
                    ))}
                    <circle
                      className={base.chip}
                      cx={b}
                      cy={DRAWN_Y}
                      r={DRAWN_R}
                    />
                  </>
                )}
              </motion.g>
              <motion.circle
                fill="currentColor"
                fillOpacity={INK}
                cx={b}
                cy={DRAWN_Y}
                r={DRAWN_R}
                {...animated({
                  cx: track(play, b, [a, a, b, b], times, ease),
                  opacity: track(
                    play,
                    0,
                    [0, 1, 1, 0, 0],
                    [0, 0.04, 0.75, 0.82, 1],
                  ),
                })}
              />
              <text
                className={base.name}
                x={ox + 93}
                y={80}
                textAnchor="middle"
              >
                {name}
              </text>
              <text
                className={base.spec}
                x={ox + 93}
                y={94}
                textAnchor="middle"
              >
                {spec}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const MAP_W = 144;
const MAP_H = 26;
const MAP_COLUMNS = [8, 208, 408];
const MAP_DRAW = 0.15;
const SOURCES = [
  { label: "Camera shutter", y: 28, to: 0 },
  { label: "Accumulation buffer", y: 64, to: 0 },
  { label: "Velocity buffer", y: 100, to: 1 },
  { label: "Animator's smear", y: 136, to: 2 },
].map((source, i) => ({ ...source, at: 0.05 + 0.06 * i }));
const VERSIONS = [
  { label: "Echo", built: "copies + plus-lighter", y: 46 },
  { label: "SVG and Squeeze", built: "blur along one axis", y: 100 },
  { label: "Smear", built: "stretch along the motion", y: 136 },
].map((version, i) => ({
  ...version,
  at:
    Math.min(...SOURCES.filter(({ to }) => to === i).map(({ at }) => at)) +
    MAP_DRAW,
}));

function Plate({
  x,
  y,
  label,
  ...motionProps
}: { x: number; y: number; label: string } & MotionProps) {
  return (
    <motion.g {...motionProps}>
      <rect
        className={base.plate}
        x={x}
        y={y}
        width={MAP_W}
        height={MAP_H}
        rx={6}
      />
      <text className={base.name} x={x + 10} y={y + MAP_H / 2 + 3.5}>
        {label}
      </text>
    </motion.g>
  );
}

const PULSE = 0.08;

function Connector({
  d,
  play,
  at,
  length,
}: {
  d: string;
  play: boolean;
  at: number;
  length: number;
}) {
  const end = at + length;
  return (
    <>
      <motion.path className={styles.dashed} d={d} {...reveal(play, at)} />
      <motion.path
        className={styles.pulse}
        d={d}
        {...animated({
          pathLength: track(play, PULSE, [PULSE, PULSE], [0, 1]),
          pathOffset: track(
            play,
            0,
            [0, 0, 1 - PULSE, 1 - PULSE],
            [0, at, end, 1],
            ["linear", MOVE, "linear"],
          ),
          opacity: track(
            play,
            0,
            [0, 0, 1, 1, 0, 0],
            [0, at, at + 0.01, end, end + 0.02, 1],
          ),
        })}
      />
    </>
  );
}

export function Mapping() {
  const { ref, play, playing } = useLoop();
  const [source, web, built] = MAP_COLUMNS;
  const mid = (y: number) => y + MAP_H / 2;

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="Each source of motion blur and the browser version built from it. The camera shutter and the accumulation buffer both become Echo, built from copies added with plus-lighter. The velocity buffer becomes SVG and Squeeze, built from a blur along one axis. The animator's smear becomes Smear, built from a stretch along the motion."
    >
      <svg className={base.svg} viewBox="0 0 560 170" aria-hidden="true">
        {["Source", "On the web", "Built from"].map((title, i) => (
          <text key={title} className={styles.caps} x={MAP_COLUMNS[i]} y={14}>
            {title}
          </text>
        ))}
        {SOURCES.map(({ label, y, to, at }) => {
          const target = mid(VERSIONS[to].y);
          const bend = (source + MAP_W + web) / 2;
          return (
            <g key={label}>
              <Connector
                d={`M${source + MAP_W} ${mid(y)}C${bend} ${mid(y)} ${bend} ${target} ${web} ${target}`}
                play={play}
                at={at}
                length={MAP_DRAW}
              />
              <Plate x={source} y={y} label={label} />
            </g>
          );
        })}
        {VERSIONS.map(({ label, built: from, y, at }) => (
          <g key={label}>
            <Connector
              d={`M${web + MAP_W} ${mid(y)}H${built}`}
              play={play}
              at={at + 0.04}
              length={0.1}
            />
            <Plate x={web} y={y} label={label} {...reveal(play, at)} />
            <Plate x={built} y={y} label={from} {...reveal(play, at + 0.14)} />
          </g>
        ))}
      </svg>
    </figure>
  );
}

const EDGE_X0 = 64;
const EDGE_X1 = 496;
const EDGE_TOP = 38;
const EDGE_BASE = 118;
const EDGE_LENGTH = 160;
const EDGE_SHORT = 24;
const EDGE_MIDDLE = 280;

function erf(x: number) {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return x >= 0 ? y : -y;
}

const edgeY = (coverage: number) =>
  EDGE_BASE - (EDGE_BASE - EDGE_TOP) * coverage;

const edgeStart = (length: number) => EDGE_MIDDLE - length / 2;

/** How far a Gaussian with σ = L ÷ √12 has risen where the box starts, Φ(−√3), the same for any L. */
const GAUSSIAN_AT_START = 0.5 * (1 + erf(-Math.sqrt(3) / Math.SQRT2));

const boxEdge = (length: number) =>
  `M${EDGE_X0} ${EDGE_BASE}H${edgeStart(length)}L${edgeStart(length) + length} ${EDGE_TOP}H${EDGE_X1}`;

const gaussianEdge = (length: number) =>
  Array.from({ length: (EDGE_X1 - EDGE_X0) / 4 + 1 }, (_, i) => {
    const x = EDGE_X0 + i * 4;
    const z = (x - EDGE_MIDDLE) / (length / Math.sqrt(12));
    const y = edgeY(0.5 * (1 + erf(z / Math.SQRT2)));
    return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(2)}`;
  }).join("");

const edgeGuides = (length: number) => {
  const start = edgeStart(length);
  const end = start + length;
  return `M${start} ${EDGE_TOP}V${EDGE_BASE + 8}M${end} ${EDGE_TOP}V${EDGE_BASE + 8}`;
};

const edgeDimension = (length: number) =>
  `M${edgeStart(length)} ${EDGE_BASE + 14}h${length}`;

export function Edge() {
  const { ref, play, playing } = useLoop();
  const length = useMotionValue(EDGE_LENGTH);
  const box = useTransform(length, boxEdge);
  const gaussian = useTransform(length, gaussianEdge);
  const guides = useTransform(length, edgeGuides);
  const dimension = useTransform(length, edgeDimension);
  const pinX = useTransform(length, edgeStart);
  const readoutX = useTransform(pinX, (x) => x - 6);

  useEffect(() => {
    const controls = play
      ? animate(
          length,
          [
            EDGE_LENGTH,
            EDGE_LENGTH,
            EDGE_SHORT,
            EDGE_SHORT,
            EDGE_LENGTH,
            EDGE_LENGTH,
          ],
          {
            duration: LOOP,
            times: [0, 0.1, 0.4, 0.55, 0.85, 1],
            ease: MOVE,
            repeat: Number.POSITIVE_INFINITY,
          },
        )
      : animate(length, EDGE_LENGTH, { duration: 0.3 });
    return () => controls.stop();
  }, [play, length]);

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="One edge of a moving shape, from clear to opaque, across a streak of length L. The box blur a camera records rises in a straight line from the start of the streak to its end. A Gaussian with sigma equal to L divided by the square root of 12 has the same spread, but starts rising before the streak begins and finishes after it ends, on a curve."
    >
      <svg className={base.svg} viewBox="0 0 560 152" aria-hidden="true">
        <path className={base.lineStrong} d={`M${EDGE_X0} 14h20`} />
        <text className={base.tag} x={EDGE_X0 + 26} y={17.5}>
          box, what a camera and Echo give
        </text>
        <path className={base.lineMuted} d={"M300 14h20"} />
        <text className={base.tag} x={326} y={17.5}>
          Gaussian, σ = L ÷ √12
        </text>
        {[0.25, 0.5, 0.75, 1].map((coverage) => (
          <path
            key={coverage}
            className={styles.grid}
            d={`M${EDGE_X0} ${edgeY(coverage)}H${EDGE_X1}`}
          />
        ))}
        <text className={styles.caps} x={8} y={EDGE_TOP + 3.5}>
          opaque
        </text>
        <text className={styles.caps} x={8} y={EDGE_BASE + 3.5}>
          clear
        </text>
        <path className={base.axis} d={`M${EDGE_X0} ${EDGE_BASE}H${EDGE_X1}`} />
        <motion.path className={base.guide} d={guides} />
        <motion.path className={base.lineMuted} d={gaussian} />
        <motion.path className={base.lineStrong} d={box} />
        <motion.circle
          className={styles.pin}
          cx={pinX}
          cy={edgeY(GAUSSIAN_AT_START)}
          r={3}
        />
        <motion.text
          className={base.spec}
          x={readoutX}
          y={edgeY(GAUSSIAN_AT_START) - 8}
          textAnchor="end"
        >
          Gaussian already at 4%
        </motion.text>
        <motion.path className={base.dimension} d={dimension} />
        <text
          className={base.spec}
          x={EDGE_MIDDLE}
          y={EDGE_BASE + 28}
          textAnchor="middle"
        >
          L, the streak
        </text>
      </svg>
    </figure>
  );
}

const RATE_X = 72;
const RATE_W = 16;
const RATE_SPAN = 320;
const RATE_ROWS = [
  { hz: 60, gap: 80, y: 40, note: ["40 px apart", "20 px streak"] },
  { hz: 120, gap: 40, y: 92, note: ["20 px apart", "10 px streak"] },
];

export function Refresh() {
  const { ref, playing } = useLoop();

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={base.figure}
      style={accent}
      aria-label="The same shape moving at 2,400 pixels a second with a 180 degree shutter, at two refresh rates. At 60 Hz the frames land 40 pixels apart and each streak covers 20 pixels, half the gap. At 120 Hz they land 20 pixels apart and each streak covers 10 pixels, still half the gap."
    >
      <svg className={base.svg} viewBox="0 0 560 128" aria-hidden="true">
        <text className={base.formula} x={RATE_X} y={18}>
          2,400 px/s with a 180° shutter
        </text>
        {RATE_ROWS.map(({ hz, gap, y, note }) => {
          const streak = gap / 2;
          const middle = RATE_X + RATE_W / 2;
          return (
            <g key={hz}>
              <text className={base.name} x={8} y={y + 15.5}>
                {`${hz} Hz`}
              </text>
              {Array.from({ length: RATE_SPAN / gap + 1 }, (_, i) => {
                const x = RATE_X + gap * i;
                return (
                  <g key={x}>
                    <rect
                      className={base.ghost}
                      x={x}
                      y={y + 4}
                      width={RATE_W}
                      height={RATE_W}
                      rx={3}
                    />
                    <path
                      className={base.lineStrong}
                      d={`M${x + RATE_W / 2 - streak / 2} ${y + 12}h${streak}`}
                    />
                  </g>
                );
              })}
              <g
                className={styles.hop}
                style={
                  {
                    "--span": `${RATE_SPAN}px`,
                    "--stops": RATE_SPAN / gap + 1,
                  } as CSSProperties
                }
              >
                <rect
                  fill="currentColor"
                  fillOpacity={INK}
                  x={RATE_X}
                  y={y + 4}
                  width={RATE_W}
                  height={RATE_W}
                  rx={3}
                />
                <path
                  className={base.lineStrong}
                  d={`M${middle - streak / 2} ${y + 12}h${streak}`}
                />
              </g>
              <text className={base.spec} x={448} y={y + 9}>
                {note[0]}
              </text>
              <text className={base.spec} x={448} y={y + 21}>
                {note[1]}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const COPIES = 12;
const SPREAD = 32;

function Stack({ blend }: { blend: "normal" | "plus-lighter" }) {
  return (
    <div className={styles.stack}>
      {Array.from({ length: COPIES }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: a fixed set of identical copies
          key={i}
          className={styles.copy}
          style={
            {
              opacity: 1 / COPIES,
              mixBlendMode: blend,
              "--offset": `${(i / (COPIES - 1) - 0.5) * SPREAD}px`,
            } as CSSProperties
          }
        >
          <Shape />
        </div>
      ))}
    </div>
  );
}

export function Stacking() {
  const { ref, playing } = useLoop();

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={styles.figure}
      aria-label="Two stacks of twelve copies of a square, each copy at one twelfth opacity, spread across 32 pixels. With normal blending the stack only reaches about 65 percent and looks washed out. With plus-lighter the copies add up to the full square in the middle and fade at both ends."
    >
      <div className={styles.panels}>
        <div className={styles.panel}>
          <Stack blend="normal" />
          <span className={styles.label}>normal, about 65%</span>
        </div>
        <div className={styles.panel}>
          <Stack blend="plus-lighter" />
          <span className={styles.label}>plus-lighter, 100%</span>
        </div>
      </div>
    </figure>
  );
}

const SQUEEZE = 16;
const STRETCH_BLUR = 0.75;
const blur = (amount: number) => `blur(${amount}px)`;

export function Squeeze() {
  const { ref, play, playing } = useLoop();
  const narrow = 1 / SQUEEZE;

  return (
    <figure
      ref={ref}
      data-playing={playing}
      className={styles.figure}
      aria-label="The squeeze in three steps. The square is squeezed to a sixteenth of its width, then blurred by 0.75 pixels in every direction, then stretched back to full width, which turns the blur into 12 pixels sideways and 0.75 pixels up and down."
    >
      <div className={styles.panels}>
        <div className={styles.panel}>
          <div className={styles.slot}>
            <motion.div
              style={{ scaleX: narrow }}
              {...animated({
                scaleX: track(
                  play,
                  narrow,
                  [1, 1, narrow, narrow, 1],
                  [0, 0.05, 0.25, CLEAR, 1],
                  MOVE,
                ),
              })}
            >
              <Shape />
            </motion.div>
          </div>
          <span className={styles.label}>scaleX(1/16)</span>
        </div>
        <div className={styles.panel}>
          <div className={styles.slot}>
            <motion.div
              style={{ filter: blur(STRETCH_BLUR) }}
              {...animated({
                filter: track(
                  play,
                  blur(STRETCH_BLUR),
                  [
                    blur(0),
                    blur(0),
                    blur(STRETCH_BLUR),
                    blur(STRETCH_BLUR),
                    blur(0),
                  ],
                  [0, 0.3, 0.45, CLEAR, 1],
                  MOVE,
                ),
              })}
            >
              <div style={{ transform: `scaleX(${narrow})` }}>
                <Shape />
              </div>
            </motion.div>
          </div>
          <span className={styles.label}>blur(0.75px)</span>
        </div>
        <div className={styles.panel}>
          <div className={styles.slot}>
            <motion.div
              style={{ scaleX: SQUEEZE, filter: blur(STRETCH_BLUR) }}
              {...animated({
                scaleX: track(
                  play,
                  SQUEEZE,
                  [1, 1, SQUEEZE, SQUEEZE, 1],
                  [0, 0.5, 0.7, CLEAR, 1],
                  MOVE,
                ),
              })}
            >
              <div style={{ transform: `scaleX(${narrow})` }}>
                <Shape />
              </div>
            </motion.div>
          </div>
          <span className={styles.label}>scaleX(16)</span>
        </div>
      </div>
    </figure>
  );
}
