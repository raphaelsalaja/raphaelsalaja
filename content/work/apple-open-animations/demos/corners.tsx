"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { ControlButton, Controls } from "@/components/controls";
import { clamp, lerp, useOnScreen, usePrefersReducedMotion } from "./shared";
import styles from "./styles.module.css";

const ICON = 36;
const START_RADIUS = 10;
const END_RADIUS = 22;

type Box = { x: number; y: number; w: number; h: number };

export function Corners() {
  const root = useRef<HTMLDivElement>(null);
  const stretch = useRef<HTMLDivElement>(null);
  const corrected = useRef<HTMLDivElement>(null);
  const clipped = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const playing = useRef(0);
  const onScreen = useOnScreen(root, 0.2);
  const reduce = usePrefersReducedMotion();
  const value = useRef(0);
  value.current = progress;

  useEffect(() => {
    const paint = (t: number) => {
      const stages = [stretch.current, corrected.current, clipped.current]
        .map((node) => node?.parentElement)
        .filter((node): node is HTMLElement => Boolean(node));
      stages.forEach((stage, index) => {
        const target =
          index === 0
            ? stretch.current
            : index === 1
              ? corrected.current
              : clipped.current;
        if (!target) return;
        draw(stage, target, index, t);
      });
    };
    paint(value.current);
    const observer = new ResizeObserver(() => paint(value.current));
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = [stretch.current, corrected.current, clipped.current];
    nodes.forEach((node, index) => {
      const stage = node?.parentElement;
      if (stage && node) draw(stage, node, index, progress);
    });
  }, [progress]);

  const stop = () => {
    cancelAnimationFrame(playing.current);
    playing.current = 0;
  };

  const play = () => {
    stop();
    if (reduce || !onScreen) {
      setProgress((current) => (current > 0.5 ? 0 : 1));
      return;
    }
    const from = value.current > 0.98 ? 0 : value.current;
    const started = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = clamp((now - started) / duration);
      setProgress(lerp(from, 1, t));
      if (t < 1 && onScreen) playing.current = requestAnimationFrame(tick);
    };
    if (from === 0) setProgress(0);
    playing.current = requestAnimationFrame(tick);
  };

  return (
    <div ref={root} className={styles.demo} data-demo-id="corners">
      <div className={styles.columns}>
        <Column label="Class">
          <div
            ref={stretch}
            className={`${styles.cornerScaled} ${styles.stretch}`}
            data-corner="class"
          >
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barShort}`} />
          </div>
        </Column>
        <Column label="Style">
          <div
            ref={corrected}
            className={styles.cornerScaled}
            data-corner="style"
          >
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barShort}`} />
          </div>
        </Column>
        <Column label="Clip">
          <div ref={clipped} className={styles.clipContent} data-corner="clip">
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.barShort}`} />
            <span className={styles.bar} />
          </div>
        </Column>
      </div>
      <Controls>
        <ControlButton onClick={play}>Replay</ControlButton>
        <label className={styles.scrubRow}>
          <span className={styles.scrubLabel}>Frame</span>
          <input
            className={styles.scrubber}
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={progress}
            aria-valuetext={`${Math.round(progress * 100)} percent`}
            onChange={(event) => {
              stop();
              setProgress(Number(event.target.value));
            }}
          />
          <span className={styles.scrubValue}>
            {Math.round(progress * 100)}%
          </span>
        </label>
      </Controls>
    </div>
  );
}

function Column({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.lane}>
      <div className={styles.columnStage}>{children}</div>
      <span className={styles.miniLabel}>{label}</span>
    </div>
  );
}

function iconBox(stage: HTMLElement): Box {
  return {
    x: 12,
    y: 12,
    w: Math.min(ICON, stage.clientWidth - 24),
    h: ICON,
  };
}

function draw(
  stage: HTMLElement,
  el: HTMLElement,
  kind: number,
  progress: number,
) {
  const stageWidth = stage.clientWidth;
  const stageHeight = stage.clientHeight;
  const icon = iconBox(stage);
  if (kind === 2) {
    const top = lerp(icon.y, 0, progress);
    const left = lerp(icon.x, 0, progress);
    const right = lerp(stageWidth - icon.x - icon.w, 0, progress);
    const bottom = lerp(stageHeight - icon.y - icon.h, 0, progress);
    const radius = lerp(START_RADIUS, END_RADIUS, progress);
    el.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
    el.style.transform = "none";
    return;
  }

  el.style.transformOrigin = "0 0";

  if (kind === 0) {
    const visualWidth = lerp(icon.w, stageWidth, progress);
    const visualHeight = lerp(icon.h, stageHeight, progress);
    el.style.width = `${icon.w}px`;
    el.style.height = `${icon.h}px`;
    el.style.transform = `translate(${lerp(icon.x, 0, progress)}px, ${lerp(icon.y, 0, progress)}px) scale(${visualWidth / icon.w}, ${visualHeight / icon.h})`;
    return;
  }

  const scaleX = lerp(icon.w / stageWidth, 1, progress);
  const scaleY = lerp(icon.h / stageHeight, 1, progress);
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.transform = `translate(${lerp(icon.x, 0, progress)}px, ${lerp(icon.y, 0, progress)}px) scale(${scaleX}, ${scaleY})`;

  const visual = lerp(START_RADIUS, END_RADIUS, progress);
  el.style.borderRadius = `${visual / Math.max(scaleX, 0.001)}px / ${visual / Math.max(scaleY, 0.001)}px`;
}
