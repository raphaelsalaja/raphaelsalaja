"use client";

import {
  animate,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./detent-slider.module.css";

const STOPS = 5;
const THUMB = 20;
const snap = { type: "spring", bounce: 0.25, duration: 0.35 } as const;

export function DetentSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [measure, bounds] = useMeasure();
  const [stop, setStop] = useState(2);
  const x = useMotionValue(0);
  const fill = useTransform(x, (value) => value + THUMB / 2);
  const step = (bounds.width - THUMB) / (STOPS - 1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only a resize re-seats the thumb, a drag animates it itself
  useEffect(() => {
    if (bounds.width) x.set(stop * step);
  }, [bounds.width]);

  const go = (next: number, velocity = 0) => {
    const clamped = Math.min(STOPS - 1, Math.max(0, next));
    setStop(clamped);
    animate(x, clamped * step, { ...snap, velocity });
  };

  const release = (_: PointerEvent, info: PanInfo) => {
    const projected = x.get() + info.velocity.x * 0.08;
    go(Math.round(projected / step), info.velocity.x);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowLeft: stop - 1,
      ArrowDown: stop - 1,
      ArrowRight: stop + 1,
      ArrowUp: stop + 1,
      Home: 0,
      End: STOPS - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    go(keys[event.key]);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.label}>
        <span>Intensity</span>
        <span className={styles.value}>{stop + 1}</span>
      </div>
      <div
        ref={(node) => {
          track.current = node;
          measure(node);
        }}
        className={styles.track}
      >
        <motion.div className={styles.fill} style={{ width: fill }} />
        {Array.from({ length: STOPS }, (_, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: the stops never reorder
            key={index}
            className={styles.tick}
            data-passed={index <= stop || undefined}
            style={{ left: index * step + THUMB / 2 }}
          />
        ))}
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label="Intensity"
          aria-valuemin={1}
          aria-valuemax={STOPS}
          aria-valuenow={stop + 1}
          className={styles.thumb}
          style={{ x }}
          drag="x"
          dragConstraints={track}
          dragElastic={0.15}
          dragMomentum={false}
          whileDrag={{ scale: 1.1 }}
          onDragEnd={release}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
