"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./styles.module.css";

// enum for the states
enum State {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export function SecondaryAction() {
  const [state, setState] = useState(State.Idle);

  const [ref, bounds] = useMeasure();

  return (
    <div className={styles.container}>
      <motion.button
        initial={false}
        animate={{
          width: bounds.width > 10 ? bounds.width : "auto",
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.01,
        }}
        onClick={() => setState(State.Loading)}
        className={styles.button}
        layout
      >
        <AnimatePresence mode="popLayout">
          {state === State.Loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0, x: -24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: -24 }}
              transition={{
                ease: [0.19, 1, 0.22, 1],
                duration: 0.4,
              }}
              className={styles.icon}
            >
              <Spinner />
            </motion.div>
          )}
        </AnimatePresence>
        <span className={styles.label}>Run Simulation</span>
      </motion.button>
    </div>
  );
}

const Spinner = () => (
  <motion.div
    initial={{ rotate: 180 }}
    animate={{
      rotate: 0,
    }}
    exit={{
      position: "absolute",
      rotate: -180,
      transition: {
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 0.98],
      },
    }}
    transition={{
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 0.98],
      delay: 0.2,
    }}
    className={styles.spinner}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="var(--white)"
        strokeOpacity="0.2"
        strokeWidth="2.5"
      />
      <path
        d="M16 9C16 5.13401 12.866 2 9 2"
        stroke="var(--white)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </motion.div>
);
