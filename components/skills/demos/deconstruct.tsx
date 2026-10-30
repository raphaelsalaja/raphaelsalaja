"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "@/components/icons";
import { useShown } from "../pair";
import styles from "./deconstruct.module.css";

const DURATION = 2400;
const STILL = 1700;

const STATES = [
  { name: "Idle", start: 0, end: 400, event: "press" },
  { name: "Pressed", start: 400, end: 520, event: "release" },
  { name: "Copying", start: 520, end: 1300, event: "resolve" },
  { name: "Copied", start: 1300, end: 2100, event: "timeout" },
] as const;

type Span = [start: number, end: number];

const TRACKS: { name: string; spans: Span[] }[] = [
  {
    name: "Scale",
    spans: [
      [400, 520],
      [520, 720],
    ],
  },
  {
    name: "Icon",
    spans: [
      [520, 670],
      [1300, 1450],
      [2100, 2250],
    ],
  },
  {
    name: "Label",
    spans: [
      [1300, 1500],
      [2100, 2300],
    ],
  },
  {
    name: "Width",
    spans: [
      [1300, 1500],
      [2100, 2300],
    ],
  },
];

const easeOut = (x: number) => 1 - (1 - x) ** 3;

function elapsed(t: number, [start, end]: Span) {
  return Math.min(Math.max((t - start) / (end - start), 0), 1);
}

function progress(t: number, span: Span) {
  return easeOut(elapsed(t, span));
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function frameAt(t: number) {
  const scale =
    t < 520
      ? mix(1, 0.96, progress(t, [400, 520]))
      : mix(0.96, 1, progress(t, [520, 720]));

  const toSpinner = progress(t, [520, 670]);
  const toCheck = progress(t, [1300, 1450]);
  const toCopy = progress(t, [2100, 2250]);
  const icons = {
    copy: t < 2100 ? 1 - toSpinner : toCopy,
    spinner: t < 1300 ? toSpinner : 1 - toCheck,
    check: t < 2100 ? toCheck : 1 - toCopy,
  };

  const copied =
    t < 2100 ? progress(t, [1300, 1500]) : 1 - progress(t, [2100, 2300]);

  return { scale, icons, copied, width: mix(78, 98, copied) };
}

function stateAt(t: number) {
  return STATES.find((state) => t < state.end) ?? STATES[0];
}

function usePlayback(controls: boolean) {
  const shown = useShown();
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [slow, setSlow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      setTime(STILL);
    }
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !shown || !visible) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) * (slow && controls ? 0.25 : 1);
      last = now;
      setTime((value) => (value + delta) % DURATION);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, shown, visible, slow, controls]);

  return { ref, time, setTime, playing, setPlaying, slow, setSlow };
}

function Spinner({ time }: { time: number }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{ rotate: `${(time * 0.72) % 360}deg` }}
    >
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" opacity="0.24" />
      <path
        d="M7 1.75a5.25 5.25 0 0 1 5.25 5.25"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function layer(weight: number): CSSProperties {
  return {
    opacity: weight,
    filter: `blur(${(1 - weight) * 3}px)`,
    scale: `${mix(0.6, 1, weight)}`,
  };
}

function CopyButton({ time }: { time: number }) {
  const { scale, icons, copied, width } = frameAt(time);

  return (
    <span
      className={styles.button}
      style={{ scale: `${scale}`, width }}
      aria-hidden="true"
    >
      <span className={styles.icons}>
        <span style={layer(icons.copy)}>
          <IconCopy size={14} />
        </span>
        <span style={layer(icons.spinner)}>
          <Spinner time={time} />
        </span>
        <span className={styles.check} style={layer(icons.check)}>
          <IconCheck size={14} />
        </span>
      </span>
      <span className={styles.labels}>
        <span style={{ ...layer(1 - copied), translate: `0 ${copied * -6}px` }}>
          Copy
        </span>
        <span
          style={{ ...layer(copied), translate: `0 ${(1 - copied) * 6}px` }}
        >
          Copied
        </span>
      </span>
    </span>
  );
}

export function Loop() {
  const { ref, time } = usePlayback(false);

  return (
    <div ref={ref} className={styles.loop}>
      <CopyButton time={time} />
      <div className={styles.bubble}>
        It shrinks, spins, then shows a check. Roughly 300ms.
      </div>
    </div>
  );
}

function readout(name: string, time: number) {
  const frame = frameAt(time);
  if (name === "Scale") return frame.scale.toFixed(3);
  if (name === "Width") return `${Math.round(frame.width)}px`;
  if (name === "Label") return frame.copied < 0.5 ? "Copy" : "Copied";
  const [icon] = Object.entries(frame.icons).sort((a, b) => b[1] - a[1]);
  return icon[0][0].toUpperCase() + icon[0].slice(1);
}

const percent = (value: number) => `${(value / DURATION) * 100}%`;

export function Deconstruct() {
  const { ref, time, setTime, playing, setPlaying, slow, setSlow } =
    usePlayback(true);
  const current = stateAt(time);

  return (
    <div ref={ref} className={styles.panel}>
      <div className={styles.preview}>
        <CopyButton time={time} />
      </div>

      <div className={styles.scroll}>
        <ol className={styles.machine} aria-label="State machine">
          {STATES.map((state) => (
            <li key={state.name} className={styles.step}>
              <button
                type="button"
                className={styles.node}
                data-active={current.name === state.name || undefined}
                onClick={() => {
                  setPlaying(false);
                  setTime((state.start + state.end) / 2);
                }}
              >
                {state.name}
              </button>
              <span className={styles.edge}>
                <span>{state.event}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.timeline}>
        <div className={styles.track}>
          <span className={styles.name}>State</span>
          <span className={styles.lane}>
            {STATES.map((state) => (
              <span
                key={state.name}
                className={styles.state}
                data-active={current.name === state.name || undefined}
                style={{
                  left: percent(state.start),
                  width: percent(state.end - state.start),
                }}
              />
            ))}
            <span className={styles.head} style={{ left: percent(time) }} />
          </span>
          <span className={styles.value}>{current.name}</span>
        </div>
        {TRACKS.map((track) => (
          <div key={track.name} className={styles.track}>
            <span className={styles.name}>{track.name}</span>
            <span className={styles.lane}>
              {track.spans.map((span) => (
                <span
                  key={span[0]}
                  className={styles.span}
                  style={
                    {
                      left: percent(span[0]),
                      width: percent(span[1] - span[0]),
                      "--fill": `${elapsed(time, span) * 100}%`,
                    } as CSSProperties
                  }
                />
              ))}
              <span className={styles.head} style={{ left: percent(time) }} />
            </span>
            <span className={styles.value}>{readout(track.name, time)}</span>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>
        <input
          type="range"
          className={styles.scrubber}
          aria-label="Time"
          min={0}
          max={DURATION}
          step={10}
          value={Math.round(time)}
          style={{ "--progress": percent(time) } as CSSProperties}
          onChange={(event) => {
            setPlaying(false);
            setTime(Number(event.target.value));
          }}
        />
        <span className={styles.time}>{Math.round(time)}ms</span>
        <button
          type="button"
          className={styles.control}
          aria-pressed={slow}
          onClick={() => setSlow((value) => !value)}
        >
          0.25×
        </button>
      </div>
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 1.8v8.4L10 6z" fill="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <rect
        x="2.5"
        y="2"
        width="2.5"
        height="8"
        rx="0.75"
        fill="currentColor"
      />
      <rect x="7" y="2" width="2.5" height="8" rx="0.75" fill="currentColor" />
    </svg>
  );
}
