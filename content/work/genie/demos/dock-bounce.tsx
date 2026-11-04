"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  appleSpring,
  TILES,
  useOnScreen,
  usePrefersReducedMotion,
} from "./shared";
import styles from "./styles.module.css";

const NAMES = ["Notes", "Maps", "Photos", "Music", "Mail"] as const;

export function DockBounce() {
  const root = useRef<HTMLDivElement>(null);
  const [launching, setLaunching] = useState<number | null>(null);
  const [landed, setLanded] = useState<number | null>(null);
  const reduce = usePrefersReducedMotion();
  const onScreen = useOnScreen(root, 0.2);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const launch = (index: number) => {
    window.clearTimeout(timer.current);
    setLanded(null);
    setLaunching(index);
    const wait = 1000 + Math.random() * 2000;
    timer.current = window.setTimeout(() => {
      setLaunching(null);
      setLanded(index);
    }, wait);
  };

  const name =
    launching !== null
      ? `Opening ${NAMES[launching]}`
      : landed !== null
        ? `${NAMES[landed]} is open`
        : "Click an icon";

  return (
    <div ref={root} className={styles.demo} data-demo-id="dock-bounce">
      <div className={styles.dockStage}>
        <p className={styles.status} aria-live="polite">
          {name}
        </p>
        <div className={styles.bounceDock}>
          {NAMES.map((label, index) => {
            const active = launching === index;
            return (
              <motion.button
                key={label}
                type="button"
                className={styles.bounceTile}
                style={{ background: TILES[index].color }}
                aria-label={active ? `Opening ${label}` : `Open ${label}`}
                aria-busy={active}
                animate={
                  reduce
                    ? { opacity: active ? 0.45 : 1, y: 0 }
                    : { y: onScreen && active ? [0, -20, 0] : 0 }
                }
                transition={
                  active && !reduce && onScreen
                    ? {
                        duration: 0.6,
                        ease: ["easeOut", "easeIn"],
                        repeat: Number.POSITIVE_INFINITY,
                      }
                    : reduce
                      ? { duration: 0.2 }
                      : appleSpring(0.3, 1)
                }
                onClick={() => launch(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
