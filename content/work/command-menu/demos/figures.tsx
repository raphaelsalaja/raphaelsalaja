"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./figures.module.css";
import { Keys, type Shortcut, SIZE } from "./parts";

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

function useViewport() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  return { ref, inView, playing: inView ? "" : undefined };
}

function points(list: [number, number][]) {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

export function Anatomy() {
  const k = 0.3;
  const ox = 340;
  const oy = 254;
  const gap = 56;
  const iso = (x: number, y: number, z: number): [number, number] => [
    ox + (x - y) * k * COS,
    oy + (x + y) * k * SIN - z,
  ];
  const rect = (x0: number, y0: number, x1: number, y1: number, z: number) =>
    points([iso(x0, y0, z), iso(x1, y0, z), iso(x1, y1, z), iso(x0, y1, z)]);

  const list = SIZE.title + SIZE.input;
  const rows = [0, 1, 2, 3, 4].map((i) => list + SIZE.padding + i * SIZE.item);
  const height = rows[4] + SIZE.item + SIZE.padding;
  const sheet = (z: number) => rect(0, 0, SIZE.width, height, z);
  const corners = [
    [0, 0],
    [SIZE.width, 0],
    [SIZE.width, height],
  ] as const;

  const layers = [
    {
      name: "Context",
      spec: "34 · chip 12px · r10",
      draw: (z: number) => (
        <polygon className={styles.chip} points={rect(14, 8, 330, 28, z)} />
      ),
    },
    {
      name: "Field",
      spec: "46 · 13px · padding 11 12",
      draw: (z: number) => (
        <>
          <polygon
            className={styles.row}
            points={rect(6, SIZE.title + 6, SIZE.width - 6, list, z)}
          />
          <polygon
            className={styles.ink}
            points={rect(18, list - 26, 250, list - 20, z)}
          />
        </>
      ),
    },
    {
      name: "Focus",
      spec: "inset 2 0 · r8",
      draw: (z: number) => (
        <polygon
          className={styles.focus}
          points={rect(6, rows[1] + 2, SIZE.width - 6, rows[2] - 2, z)}
        />
      ),
    },
    {
      name: "List",
      spec: "padding 6 · rows 46",
      draw: (z: number) =>
        rows.map((y) => (
          <polygon
            key={y}
            className={styles.row}
            points={rect(6, y, SIZE.width - 6, y + SIZE.item, z)}
          />
        )),
    },
    {
      name: "Frame",
      spec: "720 × ≤450 · r12",
      draw: (z: number) => (
        <>
          <polyline
            className={styles.faint}
            points={points([
              iso(0, SIZE.title, z),
              iso(SIZE.width, SIZE.title, z),
            ])}
          />
          <polyline
            className={styles.faint}
            points={points([iso(0, list, z), iso(SIZE.width, list, z)])}
          />
        </>
      ),
    },
  ].map((layer, index, all) => ({
    ...layer,
    z: (all.length - 1 - index) * gap,
  }));
  const top = layers[0].z;
  const viewport = useViewport();

  return (
    <figure
      ref={viewport.ref}
      data-playing={viewport.playing}
      className={styles.figure}
      aria-label="An exploded view of the command menu: frame, list, focus bar, field and context chip, stacked from bottom to top."
    >
      <svg className={styles.svg} viewBox="0 0 560 420" aria-hidden="true">
        <g className={styles.reveal}>
          {corners.map(([cx, cy]) => {
            const [x, y] = iso(cx, cy, 0);
            return (
              <path
                key={`${cx}-${cy}`}
                className={styles.guide}
                d={`M${x} ${y}V${y - top}`}
              />
            );
          })}
        </g>

        {[...layers].reverse().map((layer) => (
          <g
            key={layer.name}
            className={layer.z ? styles.layer : undefined}
            style={{ "--collapse": `${layer.z}px` } as CSSProperties}
          >
            <polygon
              className={layer.z === 0 ? styles.plate : styles.sheet}
              points={sheet(layer.z)}
            />
            {layer.draw(layer.z)}
          </g>
        ))}

        {layers.map((layer) => {
          const [x, y] = iso(0, height, layer.z);
          return (
            <g
              key={layer.name}
              className={layer.z ? styles.layer : undefined}
              style={{ "--collapse": `${layer.z}px` } as CSSProperties}
            >
              <g className={layer.z ? styles.reveal : undefined}>
                <path className={styles.leader} d={`M${x} ${y}H190`} />
                <circle className={styles.knot} cx={x} cy={y} r="1.5" />
                <text
                  className={styles.name}
                  x="184"
                  y={y - 2}
                  textAnchor="end"
                >
                  {layer.name}
                </text>
                <text
                  className={styles.spec}
                  x="184"
                  y={y + 10}
                  textAnchor="end"
                >
                  {layer.spec}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const GROW = {
  duration: 6,
  times: [0, 0.35, 0.5, 0.85, 1],
  ease: "easeInOut" as const,
};

export function Height() {
  const k = 0.5;
  const top = 44;
  const width = 136;
  const empty = (SIZE.title + SIZE.input + SIZE.padding * 2) * k;
  const frames = [
    { name: "Root", rows: 16, headers: 2, x: 34 },
    { name: "Change status…", rows: 5, headers: 0, x: 212 },
    { name: "Labels", rows: 3, headers: 0, x: 390 },
  ];
  const viewport = useViewport();
  const reduced = useReducedMotion();
  const play = viewport.inView && !reduced;

  return (
    <figure
      ref={viewport.ref}
      className={styles.figure}
      aria-label="Three frames drawn to scale. The root list is taller than 450 and is capped. Change status is 322 tall. Labels is 230."
    >
      <svg className={styles.svg} viewBox="0 0 560 320" aria-hidden="true">
        <text className={styles.formula} x="280" y="20" textAnchor="middle">
          34 + 46 + 6 + n × 46 + 6 ≤ 450
        </text>
        {frames.map((frame, index) => {
          const natural =
            SIZE.title +
            SIZE.input +
            SIZE.padding * 2 +
            frame.rows * SIZE.item +
            frame.headers * SIZE.header;
          const total = Math.min(SIZE.cap, natural);
          const capped = natural > SIZE.cap;
          const h = total * k;
          const bands = [SIZE.title, SIZE.input];
          let y = top;
          const clip = `clip-${frame.x}`;
          const transition = play
            ? { ...GROW, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }
            : { duration: 0.3 };
          const grow = (full: number, shrunk: number) =>
            play ? [full, full, shrunk, full, full] : full;
          const height = { height: grow(h, empty) };
          return (
            <g key={frame.name}>
              <clipPath id={clip}>
                <motion.rect
                  x={frame.x}
                  y={top}
                  width={width}
                  height={h}
                  rx="6"
                  initial={false}
                  animate={height}
                  transition={transition}
                />
              </clipPath>
              <motion.rect
                className={styles.plate}
                x={frame.x}
                y={top}
                width={width}
                height={h}
                rx="6"
                initial={false}
                animate={height}
                transition={transition}
              />
              <g clipPath={`url(#${clip})`}>
                {bands.map((band, index) => {
                  const start = y;
                  y += band * k;
                  return (
                    <g key={band}>
                      {index === 0 ? (
                        <rect
                          className={styles.chip}
                          x={frame.x + 7}
                          y={start + 8}
                          width={58}
                          height={8}
                          rx="4"
                        />
                      ) : (
                        <rect
                          className={styles.ink}
                          x={frame.x + 9}
                          y={start + 10}
                          width={50}
                          height={3}
                          rx="1.5"
                        />
                      )}
                      <path
                        className={styles.faint}
                        d={`M${frame.x} ${y}h${width}`}
                      />
                    </g>
                  );
                })}
                {Array.from({ length: frame.rows }, (_, index) => {
                  const rowTop =
                    y +
                    (SIZE.padding + index * SIZE.item) * k +
                    (frame.headers && index >= 9 ? SIZE.header * k : 0);
                  return (
                    <g key={rowTop}>
                      {index === 0 ? (
                        <rect
                          className={styles.focus}
                          x={frame.x + 3}
                          y={rowTop + 1}
                          width={width - 6}
                          height={SIZE.item * k - 2}
                          rx="4"
                        />
                      ) : null}
                      <rect
                        className={styles.ink}
                        x={frame.x + 9}
                        y={rowTop + (SIZE.item * k) / 2 - 1.5}
                        width={index % 3 === 0 ? 56 : index % 3 === 1 ? 42 : 64}
                        height={3}
                        rx="1.5"
                      />
                    </g>
                  );
                })}
              </g>
              <path
                className={styles.dimension}
                d={`M${frame.x + width + 6} ${top}h8`}
              />
              <motion.line
                className={styles.dimension}
                x1={frame.x + width + 10}
                x2={frame.x + width + 10}
                y1={top}
                y2={top + h}
                initial={false}
                animate={{ y2: grow(top + h, top + empty) }}
                transition={transition}
              />
              <motion.text
                className={styles.spec}
                x={frame.x + width + 14}
                y={top + h / 2 + 3}
                initial={false}
                animate={{ y: grow(0, (empty - h) / 2) }}
                transition={transition}
              >
                {total}
              </motion.text>
              <motion.g
                initial={false}
                animate={{ y: grow(0, empty - h) }}
                transition={transition}
              >
                {capped ? (
                  <path
                    className={styles.cut}
                    d={`M${frame.x - 6} ${top + h}h${width + 12}`}
                  />
                ) : null}
                <path
                  className={styles.dimension}
                  d={`M${frame.x + width + 6} ${top + h}h8`}
                />
                <text className={styles.name} x={frame.x} y={top + h + 22}>
                  {frame.name}
                </text>
                <text className={styles.spec} x={frame.x} y={top + h + 34}>
                  {capped
                    ? `${natural} → capped, scrolls`
                    : `${frame.rows} rows`}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function simulate(stiffness: number, damping: number, duration: number) {
  const dt = 0.0001;
  const samples: number[] = [];
  let x = 0;
  let v = 0;
  let settle = duration;
  for (let ms = 0; ms <= duration; ms++) {
    samples.push(x);
    if (settle === duration && 1 - x < 0.01) settle = ms;
    for (let i = 0; i < 10; i++) {
      v += (-stiffness * (x - 1) - damping * v) * dt;
      x += v * dt;
    }
  }
  return { samples, settle };
}

export function Springs() {
  const duration = 300;
  const left = 44;
  const right = 520;
  const top = 28;
  const bottom = 188;
  const sx = (ms: number) => left + (ms / duration) * (right - left);
  const sy = (value: number) => bottom - value * (bottom - top);

  const curves = [
    {
      name: "Height",
      spec: "20000 / 500",
      stiffness: 20000,
      damping: 500,
      tone: styles.lineStrong,
    },
    {
      name: "Close",
      spec: "2500 / 100",
      stiffness: 2500,
      damping: 100,
      tone: styles.lineMuted,
    },
    {
      name: "Open",
      spec: "1500 / 100",
      stiffness: 1500,
      damping: 100,
      tone: styles.lineAccent,
    },
  ].map((curve) => {
    const { samples, settle } = simulate(
      curve.stiffness,
      curve.damping,
      duration,
    );
    const d = samples
      .map(
        (value, ms) =>
          `${ms === 0 ? "M" : "L"}${sx(ms).toFixed(1)} ${sy(value).toFixed(1)}`,
      )
      .join("");
    return { ...curve, d, settle };
  });
  const viewport = useViewport();

  return (
    <figure
      ref={viewport.ref}
      data-playing={viewport.playing}
      className={styles.figure}
      aria-label={`Spring progress over 300 milliseconds. ${curves
        .map((c) => `${c.name} settles in ${c.settle} milliseconds`)
        .join(". ")}.`}
    >
      <svg className={styles.svg} viewBox="0 0 560 230" aria-hidden="true">
        <g className={styles.trace}>
          {curves.map((curve) => (
            <g key={curve.name}>
              <path className={curve.tone} d={curve.d} />
              <circle
                className={styles.knot}
                cx={sx(curve.settle)}
                cy={sy(0.99)}
                r="2"
              />
            </g>
          ))}
        </g>
        <rect
          className={styles.cover}
          x={left - 2}
          y={top - 4}
          width={right - left + 6}
          height={bottom - top + 4}
        />
        <path className={styles.axis} d={`M${left} ${bottom}H${right}`} />
        <path className={styles.guide} d={`M${left} ${top}H${right}`} />
        {[0, 100, 200, 300].map((ms) => (
          <g key={ms}>
            <path className={styles.axis} d={`M${sx(ms)} ${bottom}v4`} />
            <text
              className={styles.spec}
              x={sx(ms)}
              y={bottom + 18}
              textAnchor="middle"
            >
              {ms}ms
            </text>
          </g>
        ))}
        <path className={styles.guide} d={`M${sx(80)} ${top - 8}V${bottom}`} />
        <text className={styles.spec} x={sx(80) + 6} y={top - 2}>
          Dip · 80ms
        </text>
        {curves.map((curve, index) => (
          <g key={`${curve.name}-label`}>
            <path
              className={curve.tone}
              d={`M${right - 190} ${bottom - 47 + index * 14}h18`}
            />
            <text
              className={styles.name}
              x={right - 164}
              y={bottom - 44 + index * 14}
            >
              {`${curve.name} · ${curve.spec} · ${curve.settle}ms`}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function Card({
  x,
  y,
  stack = 1,
  chip = false,
  lines = 3,
  closed = false,
}: {
  x: number;
  y: number;
  stack?: number;
  chip?: boolean;
  lines?: number;
  closed?: boolean;
}) {
  const w = 62;
  const d = 40;
  const at = (px: number, py: number, lift: number): [number, number] => [
    x + (px - py) * COS,
    y + (px + py) * SIN - lift,
  ];
  return (
    <g>
      {Array.from({ length: stack }, (_, index) => {
        const lift = index * 5;
        const face = points([
          at(0, 0, lift),
          at(w, 0, lift),
          at(w, d, lift),
          at(0, d, lift),
        ]);
        const side = points([
          at(0, d, lift),
          at(w, d, lift),
          at(w, d, lift - 3),
          at(0, d, lift - 3),
        ]);
        const end = points([
          at(w, 0, lift),
          at(w, d, lift),
          at(w, d, lift - 3),
          at(w, 0, lift - 3),
        ]);
        const last = index === stack - 1;
        return (
          <g key={lift} className={closed ? styles.dashed : undefined}>
            <polygon className={styles.plate} points={side} />
            <polygon className={styles.plate} points={end} />
            <polygon className={styles.plate} points={face} />
            {last && !closed && chip ? (
              <polygon
                className={styles.chip}
                points={points([
                  at(5, 4, lift),
                  at(30, 4, lift),
                  at(30, 9, lift),
                  at(5, 9, lift),
                ])}
              />
            ) : null}
            {last && !closed
              ? Array.from({ length: lines }, (_, line) => {
                  const py = (chip ? 15 : 8) + line * 8;
                  return (
                    <polyline
                      key={py}
                      className={line === 0 ? styles.focusLine : styles.faint}
                      points={points([
                        at(6, py, lift),
                        at(line === 0 ? 50 : 40, py, lift),
                      ])}
                    />
                  );
                })
              : null}
          </g>
        );
      })}
    </g>
  );
}

function Arrow({
  from,
  to,
  y,
  label,
  below = false,
  reverse = false,
  step,
}: {
  from: number;
  to: number;
  y: number;
  label: string;
  below?: boolean;
  reverse?: boolean;
  step: number;
}) {
  const head = reverse ? from : to;
  const tail = reverse ? to : from;
  const dir = reverse ? 1 : -1;
  return (
    <g>
      <path className={styles.leader} d={`M${from} ${y}H${to}`} />
      <circle
        className={styles.token}
        cx={tail}
        cy={y}
        r="2"
        style={
          { "--span": `${head - tail}px`, "--step": step } as CSSProperties
        }
      />
      <path
        className={styles.leader}
        d={`M${head + dir * 5} ${y - 3}L${head} ${y}L${head + dir * 5} ${y + 3}`}
      />
      <text
        className={styles.spec}
        x={(from + to) / 2}
        y={below ? y + 13 : y - 7}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function Tag({
  x,
  y,
  lift,
  text,
}: {
  x: number;
  y: number;
  lift: number;
  text: string;
}) {
  return (
    <g>
      <path className={styles.leader} d={`M${x} ${y}V${y - lift}`} />
      <text className={styles.tag} x={x} y={y - lift - 6} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

export function Flow() {
  const viewport = useViewport();

  return (
    <figure
      ref={viewport.ref}
      data-playing={viewport.playing}
      className={styles.figure}
      aria-label="Enter or right arrow opens a page. Backspace or left arrow returns. Picking a value closes the menu. Backspace on an empty root clears the issue and leaves the workspace commands."
    >
      <svg className={styles.svg} viewBox="0 0 560 324" aria-hidden="true">
        <Card x={60} y={58} stack={3} chip lines={3} />
        <Tag x={60} y={60} lift={20} text="issue context" />
        <Arrow from={128} to={212} y={92} label="↵ · Tab · →" step={0} />
        <Card x={256} y={58} chip lines={4} />
        <Tag x={256} y={58} lift={10} text="change status…" />
        <Arrow
          from={128}
          to={212}
          y={118}
          label="⌫ · ⇧Tab · ←"
          below
          reverse
          step={2}
        />
        <Arrow from={324} to={408} y={92} label="Pick" step={1} />
        <Card x={452} y={58} closed />
        <Tag x={452} y={58} lift={10} text="closed" />

        <path className={styles.faint} d="M24 172H536" />

        <Card x={60} y={230} stack={3} chip lines={3} />
        <Tag x={60} y={232} lift={20} text="issue context" />
        <Arrow from={128} to={212} y={264} label="⌫ on empty field" step={3} />
        <Card x={256} y={230} stack={3} lines={4} />
        <Tag x={256} y={232} lift={20} text="workspace" />
        <text className={styles.spec} x="348" y="268">
          Create · navigate · search
        </text>
      </svg>
    </figure>
  );
}

const KEYMAP: { keys: Shortcut[]; text: string }[] = [
  {
    keys: [{ keys: ["ArrowUp"] }, { keys: ["ArrowDown"] }],
    text: "Move. A held key stops at the ends, a press wraps.",
  },
  {
    keys: [
      { keys: ["p"], ctrl: true },
      { keys: ["n"], ctrl: true },
    ],
    text: "Move, Emacs style. ⌃K and ⌃J work too.",
  },
  {
    keys: [
      { keys: ["ArrowUp"], mod: true },
      { keys: ["ArrowDown"], mod: true },
    ],
    text: "Jump to the first or last row.",
  },
  { keys: [{ keys: ["Enter"] }], text: "Run the row, or open its page." },
  {
    keys: [{ keys: ["Tab"] }, { keys: ["ArrowRight"] }],
    text: "Open the row's page. → waits for the caret to reach the end.",
  },
  {
    keys: [
      { keys: ["Tab"], shift: true },
      { keys: ["Backspace"] },
      { keys: ["ArrowLeft"] },
    ],
    text: "Back. ⌫ needs an empty field, ← the caret at the start.",
  },
  {
    keys: [{ keys: ["Backspace"] }],
    text: "On an empty root, drop the issue.",
  },
  { keys: [{ keys: ["1"] }], text: "Pick by number on a page, field empty." },
  {
    keys: [
      { keys: ["."], mod: true },
      { keys: [","], mod: true, shift: true },
    ],
    text: "Copy the ID or URL without leaving the field.",
  },
  {
    keys: [{ keys: ["Escape"] }],
    text: "Close the whole menu, from any page.",
  },
  { keys: [{ keys: ["k"], mod: true }], text: "Toggle." },
];

function usePressed() {
  const [pressed, setPressed] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    const name = (event: KeyboardEvent) => {
      if (event.code.startsWith("Key"))
        return event.code.slice(3).toLowerCase();
      if (event.code.startsWith("Digit")) return event.code.slice(5);
      if (event.code === "Period") return ".";
      if (event.code === "Comma") return ",";
      return event.key.toLowerCase();
    };
    const modifiers = (event: KeyboardEvent, next: Set<string>) => {
      for (const [flag, key] of [
        [event.metaKey, "meta"],
        [event.shiftKey, "shift"],
        [event.altKey, "alt"],
        [event.ctrlKey, "control"],
      ] as const) {
        if (flag) next.add(key);
        else next.delete(key);
      }
      return next;
    };
    const down = (event: KeyboardEvent) =>
      setPressed((current) =>
        modifiers(event, new Set(current).add(name(event))),
      );
    const up = (event: KeyboardEvent) =>
      setPressed((current) => {
        const next = new Set(current);
        next.delete(name(event));
        if (event.key === "Meta") {
          for (const key of current) {
            if (!["shift", "alt", "control"].includes(key)) next.delete(key);
          }
        }
        return modifiers(event, next);
      });
    const clear = () => setPressed(new Set());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, []);
  return pressed;
}

export function Keymap() {
  const pressed = usePressed();
  return (
    <figure className={styles.figure} aria-label="Keyboard map">
      <dl className={styles.keymap}>
        {KEYMAP.map((entry) => (
          <Fragment key={entry.text}>
            <dt className={styles.combo}>
              {entry.keys.map((shortcut) => (
                <Keys
                  key={JSON.stringify(shortcut)}
                  shortcut={shortcut}
                  pressed={pressed}
                />
              ))}
            </dt>
            <dd className={styles.meaning}>{entry.text}</dd>
          </Fragment>
        ))}
      </dl>
    </figure>
  );
}
