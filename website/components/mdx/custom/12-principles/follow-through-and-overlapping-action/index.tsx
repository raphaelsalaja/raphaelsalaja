"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { DiaBrowser } from "./dia-browser";
import styles from "./styles.module.css";

const CONFIG = {
  INITIAL_DISTANCE: 200,
  ACTIVE_DISTANCE: 100,
  INITIAL_PULL: 0.1,
  ACTIVE_PULL: 0.9,
  INITIAL_SCALE: 1.05,
  ACTIVE_SCALE: 1.15,
};

export function FollowThroughAndOverlappingAction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  // store pane centers once measured
  const [centers, setCenters] = useState<{
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  }>({});

  // measure after mount
  useLayoutEffect(() => {
    const c = containerRef.current;
    const l = leftRef.current;
    const r = rightRef.current;
    if (!c || !l || !r) return; // bail if any is missing

    const cRect = c.getBoundingClientRect();
    const measure = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - cRect.left,
        y: r.top + r.height / 2 - cRect.top,
      };
    };

    setCenters({
      left: measure(l),
      right: measure(r),
    });
  }, []); // run only once

  // core drag values
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 40, stiffness: 800 });
  const springY = useSpring(dragY, { damping: 40, stiffness: 800 });

  // helper to build a pane's transforms, or return defaults
  function usePaneTransform(
    paneKey: "left" | "right",
    centers: {
      left?: { x: number; y: number };
      right?: { x: number; y: number };
    },
    springX: MotionValue<number>,
    springY: MotionValue<number>,
  ) {
    // pull your center out of the map
    const center = centers[paneKey];

    // 1) Always define your distance transform…
    const distance = useTransform([springX, springY], (values: number[]) => {
      const [x, y] = values;
      if (!center) {
        // before measurement, pretend we're just outside INITIAL_DISTANCE
        return CONFIG.INITIAL_DISTANCE + 1;
      }
      const containerEl = containerRef.current;
      if (!containerEl) return CONFIG.INITIAL_DISTANCE + 1;

      const cx = x + containerEl.clientWidth / 2;
      const cy = y + containerEl.clientHeight / 2;
      return Math.hypot(cx - center.x, cy - center.y);
    });

    // 2) Always define attraction…
    const attraction = useTransform(distance, (d: number) => {
      if (d < CONFIG.ACTIVE_DISTANCE) {
        return Math.min(
          1,
          (CONFIG.ACTIVE_DISTANCE - d) / CONFIG.ACTIVE_DISTANCE,
        );
      }
      if (d < CONFIG.INITIAL_DISTANCE) {
        return Math.min(
          1,
          (CONFIG.INITIAL_DISTANCE - d) / CONFIG.INITIAL_DISTANCE,
        );
      }
      return 0;
    });

    // 3) Track if this pane is in active magnetized state
    const isActive = useTransform(
      distance,
      (d: number) => d < CONFIG.ACTIVE_DISTANCE,
    );

    // 4) Always define pullFactor, scale, offsets…
    const pullFactor = useTransform(attraction, (a: number) =>
      a > 0 && distance.get() < CONFIG.ACTIVE_DISTANCE
        ? CONFIG.ACTIVE_PULL
        : CONFIG.INITIAL_PULL,
    );

    const scale = useTransform(
      attraction,
      (a: number) =>
        1 +
        a *
          (CONFIG.INITIAL_SCALE +
            (CONFIG.ACTIVE_SCALE - CONFIG.INITIAL_SCALE) * (a > 0 ? 1 : 0) -
            1),
    );

    const offsetX = useTransform(
      [springX, springY, attraction],
      (values: number[]) => {
        const [x, _y, a] = values;
        if (!center) return 0;
        const containerEl = containerRef.current;
        if (!containerEl) return 0;

        const cx = x + containerEl.clientWidth / 2;
        return (cx - center.x) * a * pullFactor.get();
      },
    );

    const offsetY = useTransform(
      [springX, springY, attraction],
      (values: number[]) => {
        const [_x, y, a] = values;
        if (!center) return 0;
        const containerEl = containerRef.current;
        if (!containerEl) return 0;

        const cy = y + containerEl.clientHeight / 2;
        return (cy - center.y) * a * pullFactor.get();
      },
    );

    // wrap them in springs
    return {
      scale: useSpring(scale, { damping: 20, stiffness: 300 }),
      x: useSpring(offsetX, { damping: 40, stiffness: 800 }),
      y: useSpring(offsetY, { damping: 40, stiffness: 800 }),
      isActive,
      // Convert boolean to string for data attribute
      isActiveString: useTransform(isActive, (active: boolean) =>
        active.toString(),
      ),
    };
  }

  const leftT = usePaneTransform("left", centers, springX, springY);
  const rightT = usePaneTransform("right", centers, springX, springY);

  const leftBg = useTransform(leftT.isActive, (active) =>
    active ? "rgba(0,150,255,0.2)" : "transparent",
  );
  const rightBg = useTransform(rightT.isActive, (active) =>
    active ? "rgba(0,150,255,0.2)" : "transparent",
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div
        ref={leftRef}
        data-id="left"
        className={styles.pane}
        style={
          {
            "--magnet-bg": leftBg,
            left: "16px",
            top: "50%",
            translate: "0 -50%",
            scale: leftT.scale,
            x: leftT.x,
            y: leftT.y,
          } as any
        }
        animate={{
          opacity: isDragging ? 1 : 0,
          x: isDragging ? 0 : -100,
          scale: isDragging ? 1 : 0.5,
          transition: { duration: 0.4 },
        }}
      />

      <motion.div
        ref={rightRef}
        data-id="right"
        className={styles.pane}
        style={
          {
            "--magnet-bg": rightBg,
            right: "16px",
            top: "50%",
            translate: "0 -50%",
            scale: rightT.scale,
            x: rightT.x,
            y: rightT.y,
          } as any
        }
        animate={{
          opacity: isDragging ? 1 : 0,
          x: isDragging ? 0 : 100,
          scale: isDragging ? 1 : 0.5,
          transition: { duration: 0.4 },
        }}
      />

      <DiaBrowser
        drag
        whileDrag={{
          scale: 0.95,
          opacity: 0.8,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        dragSnapToOrigin
        style={{
          x: springX,
          y: springY,
          left: "50%",
          top: "50%",
          translate: "-50% -50%",
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
        }}
      />
    </div>
  );
}
