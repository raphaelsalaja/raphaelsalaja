"use client";

import { type EasingDefinition, motion } from "motion/react";
import styles from "./styles.module.css";

interface VisualisationProps {
  ease: EasingDefinition;
}

const Visualisation = ({ ease = "linear" }: VisualisationProps) => {
  const color = "color-mix(in srgb, var(--blue) 20%, transparent)";
  return (
    <div className={styles.visualisation} data-caption={ease}>
      <span className={styles.title}>{ease}</span>
      <div className={styles.track}>
        <motion.div
          animate={{
            x: 200,
          }}
          transformTemplate={(latest, generated) =>
            `translate(-50%, -50%) ${generated}`
          }
          transition={{
            duration: 1,
            ease: ease,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.2,
          }}
          className={styles.ball}
        />
        <svg
          width="200"
          height="34"
          viewBox="0 0 200 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{ease}</title>
          <line
            x1="0"
            y1="16.5"
            x2="200"
            y2="16.5"
            stroke={color}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

// get all the easing definitions

export function SlowInSlowOut() {
  const definitions: EasingDefinition[] = [
    "linear",
    "easeIn",
    "easeOut",
    "easeInOut",
  ];

  return (
    <div className={styles.container}>
      {definitions.map((ease) => (
        <Visualisation key={String(ease)} ease={ease} />
      ))}
    </div>
  );
}
