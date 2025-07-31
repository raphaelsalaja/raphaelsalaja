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

//––––––––––––––––––––––––––––––––––––––––––––––
// CONFIG
//––––––––––––––––––––––––––––––––––––––––––––––
const CONFIG = {
  INITIAL_DISTANCE: 200,
  ACTIVE_DISTANCE: 150,
  INITIAL_PULL: 0.1,
  ACTIVE_PULL: 1.2,
  INITIAL_SCALE: 1.05,
  ACTIVE_SCALE: 1.2,
};

// One entry per pane
const PANES = {
  left: { side: "left", hiddenX: -100 },
  right: { side: "right", hiddenX: 100 },
};

//––––––––––––––––––––––––––––––––––––––––––––––
// custom hook: per-pane transforms
//––––––––––––––––––––––––––––––––––––––––––––––
function usePaneTransform(
  key: keyof typeof PANES,
  center: { x: number; y: number } | undefined,
  springX: MotionValue<number>,
  springY: MotionValue<number>,
) {
  // 1) how far the draggable is from this pane’s center
  const distance = useTransform([springX, springY], ([x, y]) => {
    if (!center) return CONFIG.INITIAL_DISTANCE + 1;
    const container = document
      .querySelector(`.${styles.container}`)!
      .getBoundingClientRect();
    const cx = x + container.width / 2;
    const cy = y + container.height / 2;
    return Math.hypot(cx - center.x, cy - center.y);
  });

  // 2) normalized “attraction” [0–1]
  const attraction = useTransform(distance, (d) => {
    if (d < CONFIG.ACTIVE_DISTANCE)
      return Math.min(1, (CONFIG.ACTIVE_DISTANCE - d) / CONFIG.ACTIVE_DISTANCE);
    if (d < CONFIG.INITIAL_DISTANCE)
      return Math.min(
        1,
        (CONFIG.INITIAL_DISTANCE - d) / CONFIG.INITIAL_DISTANCE,
      );
    return 0;
  });

  // 3) are we “active”?
  const isActive = useTransform(distance, (d) => d < CONFIG.ACTIVE_DISTANCE);

  // 4) compute pull factor & scale
  const pullFactor = useTransform(attraction, (a) =>
    a > 0 && distance.get() < CONFIG.ACTIVE_DISTANCE
      ? CONFIG.ACTIVE_PULL
      : CONFIG.INITIAL_PULL,
  );
  const scale = useTransform(
    attraction,
    (a) =>
      1 +
      a *
        (CONFIG.INITIAL_SCALE +
          (CONFIG.ACTIVE_SCALE - CONFIG.INITIAL_SCALE) * (a > 0 ? 1 : 0) -
          1),
  );

  // 5) the actual offsets toward the pane’s center
  const offset = useTransform([springX, springY, attraction], ([x, y, a]) => {
    if (!center) return { x: 0, y: 0 };
    const container = document
      .querySelector(`.${styles.container}`)!
      .getBoundingClientRect();
    const cx = x + container.width / 2;
    const cy = y + container.height / 2;
    const fx = (cx - center.x) * a * pullFactor.get();
    const fy = (cy - center.y) * a * pullFactor.get();
    return { x: fx, y: fy };
  });

  // spring-ify them
  return {
    scale: useSpring(scale, { damping: 20, stiffness: 300 }),
    x: useSpring(
      useTransform(offset, (o) => o.x),
      { damping: 40, stiffness: 800 },
    ),
    y: useSpring(
      useTransform(offset, (o) => o.y),
      { damping: 40, stiffness: 800 },
    ),
    bg: useTransform(isActive, (on) =>
      on ? "rgba(0,150,255,0.2)" : "transparent",
    ),
    isActiveString: useTransform(isActive, (on) => on.toString()),
  };
}

export function FollowThroughAndOverlappingAction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRefs = useRef<Record<string, HTMLDivElement | null>>({
    left: null,
    right: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [centers, setCenters] = useState<
    Record<string, { x: number; y: number }>
  >({});

  // measure once after mount
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const crect = containerRef.current.getBoundingClientRect();
    const newCenters: typeof centers = {};
    for (const key of Object.keys(PANES) as Array<keyof typeof PANES>) {
      const el = paneRefs.current[key];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      newCenters[key] = {
        x: r.left + r.width / 2 - crect.left,
        y: r.top + r.height / 2 - crect.top,
      };
    }
    setCenters(newCenters);
  }, []);

  // drag motion values
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 40, stiffness: 800 });
  const springY = useSpring(dragY, { damping: 40, stiffness: 800 });

  // build transforms for each pane
  const transforms = Object.fromEntries(
    (Object.keys(PANES) as Array<keyof typeof PANES>).map((key) => [
      key,
      usePaneTransform(key, centers[key], springX, springY),
    ]),
  ) as Record<string, ReturnType<typeof usePaneTransform>>;

  return (
    <div ref={containerRef} className={styles.container}>
      {(Object.keys(PANES) as Array<keyof typeof PANES>).map((key) => {
        const { side, hiddenX } = PANES[key];
        const t = transforms[key];
        return (
          <motion.div
            key={key}
            ref={(el) => {
              paneRefs.current[key] = el;
            }}
            data-id={key}
            className={styles.pane}
            style={
              {
                "--magnet-bg": t.bg,
                [side]: "16px",
                top: "50%",
                translate: "0 -50%",
                scale: t.scale,
                x: t.x,
                y: t.y,
              } as any
            }
            animate={{
              opacity: isDragging ? 1 : 0,
              x: isDragging ? 0 : hiddenX,
              scale: isDragging ? 1 : 0.8,
              filter: isDragging ? "none" : "blur(4px)",
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 19,
              mass: 1.2,
            }}
          />
        );
      })}

      <DiaBrowser
        drag
        whileDrag={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        dragSnapToOrigin
        style={{
          x: springX,
          y: springY,
          left: "50%",
          top: "50%",
          translate: "-50% -50%",
        }}
        onHoverStart={() => setIsDragging(true)}
        onHoverEnd={() => setIsDragging(false)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      />
    </div>
  );
}
