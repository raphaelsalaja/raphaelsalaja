"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ControlButton, Controls } from "@/components/controls";
import { scaledSpring, useOnScreen, usePrefersReducedMotion } from "./shared";
import styles from "./styles.module.css";

const QUARTER = 0.25;
const HALF = 1000;
const WINDOW = 3400;

const LANES = [
  {
    id: "physics",
    label: "Physics",
    color: "var(--blue)",
    transition: scaledSpring(0.5, 0.825, QUARTER),
  },
  {
    id: "duration",
    label: "Duration",
    color: "var(--orange)",
    transition: { type: "spring" as const, duration: 0.5 / QUARTER, bounce: 0 },
  },
  {
    id: "ease",
    label: "Ease",
    color: "var(--green)",
    transition: {
      type: "tween" as const,
      duration: 0.5 / QUARTER,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  },
];

type Sample = { t: number; y: number };

export function Interrupt() {
  const root = useRef<HTMLDivElement>(null);
  const group = useId();
  const timers = useRef<number[]>([]);
  const icons = useRef<(HTMLDivElement | null)[]>([]);
  const apps = useRef<(HTMLDivElement | null)[]>([]);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(0);
  const reduce = usePrefersReducedMotion();
  const onScreen = useOnScreen(root, 0.3);

  useEffect(() => {
    if (!onScreen || run < 0) return;
    const clear = () => {
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
    };
    clear();
    setOpen(false);
    const half = reduce ? 90 : HALF;
    timers.current.push(window.setTimeout(() => setOpen(true), 40));
    timers.current.push(window.setTimeout(() => setOpen(false), 40 + half));
    return clear;
  }, [onScreen, reduce, run]);

  useEffect(() => {
    if (!onScreen || run < 0) return;
    const samples: Sample[][] = [[], [], []];
    const started = performance.now();
    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - started;
      for (let index = 0; index < LANES.length; index++) {
        const node = front(icons.current[index], apps.current[index]);
        const stage = node?.parentElement;
        if (!node || !stage) continue;
        const box = node.getBoundingClientRect();
        const parent = stage.getBoundingClientRect();
        samples[index].push({
          t: elapsed,
          y: box.height / Math.max(parent.height, 1),
        });
        paths.current[index]?.setAttribute("d", trace(samples[index]));
      }
      if (elapsed < WINDOW) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onScreen, run]);

  const closeNow = () => {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
    setOpen(false);
  };

  const mark = ((40 + (reduce ? 90 : HALF)) / WINDOW) * 100;

  return (
    <div ref={root} className={styles.demo} data-demo-id="interrupt">
      <LayoutGroup id={group}>
        <div className={styles.lanes}>
          {LANES.map((lane, index) => (
            <div key={lane.id} className={styles.lane} data-lane={lane.id}>
              <div className={styles.laneStage}>
                <motion.div
                  ref={(node) => {
                    icons.current[index] = node;
                  }}
                  layoutId={reduce ? undefined : lane.id}
                  className={styles.laneIcon}
                  style={{ borderRadius: 8, background: lane.color }}
                  transition={reduce ? { duration: 0.2 } : lane.transition}
                  aria-hidden
                />
                <AnimatePresence>
                  {open && (
                    <motion.div
                      key={lane.id}
                      ref={(node) => {
                        apps.current[index] = node;
                      }}
                      layoutId={reduce ? undefined : lane.id}
                      className={styles.laneApp}
                      style={{ borderRadius: 18, background: lane.color }}
                      initial={reduce ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : undefined}
                      transition={reduce ? { duration: 0.2 } : lane.transition}
                    />
                  )}
                </AnimatePresence>
              </div>
              <svg
                className={styles.trace}
                viewBox="0 0 100 36"
                preserveAspectRatio="none"
                aria-hidden
              >
                <line
                  className={styles.traceMark}
                  x1={mark}
                  x2={mark}
                  y1="2"
                  y2="34"
                />
                <path
                  ref={(node) => {
                    paths.current[index] = node;
                  }}
                  className={styles.traceLine}
                />
              </svg>
              <span className={styles.miniLabel}>{lane.label}</span>
            </div>
          ))}
        </div>
      </LayoutGroup>
      <Controls>
        <ControlButton onClick={() => setRun((value) => value + 1)}>
          Replay
        </ControlButton>
        <ControlButton onClick={closeNow}>Close now</ControlButton>
      </Controls>
    </div>
  );
}

function front(icon: HTMLElement | null, app: HTMLElement | null) {
  if (!app) return icon;
  if (!icon) return app;
  const appOpacity = Number(getComputedStyle(app).opacity);
  return appOpacity > 0.5 ? app : icon;
}

function trace(points: Sample[]) {
  return points
    .map((point, index) => {
      const x = (point.t / WINDOW) * 100;
      const y = 32 - Math.min(Math.max(point.y, 0), 1) * 28;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}
