"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styles from "./rolling-count.module.css";

const roll = { type: "spring", bounce: 0.15, duration: 0.35 } as const;
const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Digit({ value }: { value: number }) {
  return (
    <motion.span
      layout="position"
      className={styles.column}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.12 } }}
      transition={roll}
    >
      <motion.span
        className={styles.stack}
        initial={false}
        animate={{ y: `${-value * 10}%` }}
        transition={roll}
      >
        {rows.map((row) => (
          <span key={row}>{row}</span>
        ))}
      </motion.span>
    </motion.span>
  );
}

export function RollingCount() {
  const [count, setCount] = useState(128);
  const digits = String(count).split("").map(Number);

  return (
    <div className={styles.counter}>
      <button
        type="button"
        className={styles.step}
        aria-label="Decrease"
        disabled={count === 0}
        onClick={() => setCount((value) => Math.max(0, value - 1))}
      >
        −
      </button>
      <output className={styles.value} aria-live="polite">
        <span className="sr-only">{count}</span>
        <span className={styles.digits} aria-hidden>
          <AnimatePresence initial={false} mode="popLayout">
            {digits.map((digit, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: keyed by place value so a column keeps its roll
              <Digit key={digits.length - index} value={digit} />
            ))}
          </AnimatePresence>
        </span>
      </output>
      <button
        type="button"
        className={styles.step}
        aria-label="Increase"
        onClick={() => setCount((value) => value + 1)}
      >
        +
      </button>
    </div>
  );
}
