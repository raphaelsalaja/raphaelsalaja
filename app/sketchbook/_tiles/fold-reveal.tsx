"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./fold-reveal.module.css";

const fold = { type: "spring", bounce: 0, duration: 0.3 } as const;

export function FoldReveal() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [ref, bounds] = useMeasure();

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        Shipping Details
        <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden>
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      <motion.div
        id={id}
        className={styles.panel}
        initial={false}
        animate={{ height: open ? bounds.height : 0 }}
        transition={fold}
      >
        <div ref={ref}>
          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                className={styles.body}
                initial={{ opacity: 0, filter: "blur(4px)", y: -4 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{
                  opacity: 0,
                  filter: "blur(4px)",
                  transition: { duration: 0.15 },
                }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                Orders leave the studio within two days and arrive in three to
                five. Tracking lands in your inbox the moment it ships.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
