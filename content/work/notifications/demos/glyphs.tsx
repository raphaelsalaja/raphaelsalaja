"use client";

import { motion } from "motion/react";
import styles from "./styles.module.css";

export type Kind = "success" | "information" | "reminder" | "error" | "warning";

const draw = (delay: number) => ({
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { delay, duration: 0.32, ease: [0.65, 0, 0.35, 1] as const },
});

const pop = (delay: number) => ({
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { delay, type: "spring" as const, bounce: 0.5, duration: 0.4 },
});

export function Glyph({ kind, delay }: { kind: Kind; delay: number }) {
  const start = delay + 0.22;

  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      {kind === "warning" ? (
        <motion.path
          className={styles.badge}
          d="M8 2.2 13.8 8 8 13.8 2.2 8Z"
          strokeWidth="2.4"
          strokeLinejoin="round"
          {...pop(delay + 0.1)}
        />
      ) : (
        <motion.circle
          className={styles.badge}
          cx="8"
          cy="8"
          r="7"
          {...pop(delay + 0.1)}
        />
      )}

      {kind === "success" && (
        <motion.path
          className={styles.stroke}
          d="M5.2 8.2 7.1 10 10.8 6.2"
          {...draw(start)}
        />
      )}

      {kind === "information" && (
        <>
          <motion.circle
            className={styles.fill}
            cx="8"
            cy="5"
            r="1"
            {...pop(start)}
          />
          <motion.path
            className={styles.stroke}
            d="M8 7.4V11"
            {...draw(start + 0.08)}
          />
        </>
      )}

      {kind === "reminder" && (
        <motion.g
          style={{ originX: 0.5, originY: 0 }}
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -18, 14, -10, 6, -2, 0] }}
          transition={{ delay: start, duration: 0.7, ease: "easeOut" }}
        >
          <path
            className={styles.fill}
            d="M8 4c-1.55 0-2.6 1.15-2.6 2.7v1.55L4.6 9.6h6.8l-.8-1.35V6.7C10.6 5.15 9.55 4 8 4Z"
          />
          <circle className={styles.fill} cx="8" cy="11" r="1" />
        </motion.g>
      )}

      {kind === "error" && (
        <>
          <motion.path
            className={styles.stroke}
            d="M5.9 5.9 10.1 10.1"
            {...draw(start)}
          />
          <motion.path
            className={styles.stroke}
            d="M10.1 5.9 5.9 10.1"
            {...draw(start + 0.1)}
          />
        </>
      )}

      {kind === "warning" && (
        <>
          <motion.path
            className={styles.stroke}
            d="M8 5.2V8.4"
            {...draw(start)}
          />
          <motion.circle
            className={styles.fill}
            cx="8"
            cy="10.6"
            r="0.95"
            {...pop(start + 0.18)}
          />
        </>
      )}
    </svg>
  );
}
