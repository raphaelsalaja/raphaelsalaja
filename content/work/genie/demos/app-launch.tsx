"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { Control, Controls } from "@/components/controls";
import {
  project,
  SPEED,
  SPEEDS,
  type Speed,
  scaledSpring,
  TILES,
  usePrefersReducedMotion,
} from "./shared";
import styles from "./styles.module.css";

const SPRINGS = ["Apple default", "No overshoot", "0.8 damping"] as const;
type SpringName = (typeof SPRINGS)[number];

const RATIO: Record<SpringName, number> = {
  "Apple default": 0.825,
  "No overshoot": 1,
  "0.8 damping": 0.8,
};

const APPS = TILES.slice(0, 4);

export function AppLaunch() {
  const group = useId();
  const phone = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const icons = useRef<Record<string, HTMLButtonElement | null>>({});
  const dragged = useRef(false);
  const [open, setOpen] = useState<string | null>(null);
  const [speed, setSpeed] = useState<Speed>("1×");
  const [spring, setSpring] = useState<SpringName>("Apple default");
  const reduce = usePrefersReducedMotion();
  const current = APPS.find((app) => app.id === open) ?? null;
  const transition = reduce
    ? { duration: 0.2 }
    : scaledSpring(0.5, RATIO[spring], SPEED[speed]);

  const close = () => {
    const id = open;
    setOpen(null);
    if (id) icons.current[id]?.focus();
  };

  return (
    <div className={styles.demo} data-demo-id="app-launch">
      <LayoutGroup id={group}>
        <div ref={phone} className={styles.phone}>
          <div className={styles.grid}>
            {APPS.map((app) => (
              <motion.button
                key={app.id}
                ref={(node) => {
                  icons.current[app.id] = node;
                }}
                type="button"
                layoutId={reduce ? undefined : app.id}
                className={styles.iconButton}
                style={{ borderRadius: 14, background: app.color }}
                transition={transition}
                aria-label={`Open ${app.name}`}
                data-tile={app.id}
                onClick={() => {
                  setOpen(app.id);
                  requestAnimationFrame(() => closeButton.current?.focus());
                }}
              />
            ))}
          </div>
          <AnimatePresence>
            {current && (
              <motion.div
                key={current.id}
                layoutId={reduce ? undefined : current.id}
                className={styles.appSurface}
                style={{ borderRadius: 28, background: current.color }}
                transition={transition}
                initial={reduce ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={reduce ? { opacity: 0 } : undefined}
                drag={reduce ? false : "y"}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.6, bottom: 0 }}
                dragMomentum={false}
                onDragStart={() => {
                  dragged.current = true;
                }}
                onDragEnd={(_, info) => {
                  const height = phone.current?.clientHeight ?? 320;
                  const flick =
                    info.offset.y + project(info.velocity.y) < -height * 0.35;
                  if (flick) close();
                  requestAnimationFrame(() => {
                    dragged.current = false;
                  });
                }}
              >
                <button
                  ref={closeButton}
                  type="button"
                  className={styles.appHit}
                  aria-label={`Close ${current.name}`}
                  onClick={() => {
                    if (dragged.current) return;
                    close();
                  }}
                />
                <span className={styles.bar} />
                <span className={`${styles.bar} ${styles.barShort}`} />
                <span className={styles.bar} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
      <Controls>
        <Control
          label="Speed"
          options={SPEEDS}
          value={speed}
          onChange={setSpeed}
        />
        <Control
          label="Spring"
          options={SPRINGS}
          value={spring}
          onChange={setSpring}
        />
      </Controls>
    </div>
  );
}
