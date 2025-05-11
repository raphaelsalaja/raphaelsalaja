"use client";

import { useState } from "react";
import { motion } from "motion/react";

import styles from "./styles.module.scss";
import { Seperator } from "@rs/design/seperator";

enum Positions {
  START = -48,
  END = 48,
}

export const Tone: React.FC = () => {
  const [position, setPosition] = useState<Positions>(Positions.START);

  const isStart = position === Positions.START;
  const nextPosition = isStart ? Positions.END : Positions.START;

  const sharedStyles = {
    scale: isStart ? 0.4 : 1,
    background: isStart ? "var(--pink-4)" : "var(--pink-9)",
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={styles.circle}
          style={{
            transform: `translateX(${position}px) scale(${sharedStyles.scale})`,
            background: sharedStyles.background,
          }}
        />
        <div className={styles.timeline}>
          <div className={styles.track}>
            <div
              className={`${styles.tick}`}
              style={{ left: 0 }}
              data-label="Initial"
            />
            <div
              className={`${styles.tick}`}
              style={{ right: 0 }}
              data-label="Target"
            />
          </div>
        </div>
      </div>

      <Seperator
        className={styles.separator}
        orientation="vertical"
        variant="dashed"
      />

      <div className={styles.content}>
        <motion.div
          className={styles.circle}
          animate={{
            x: position,
            ...sharedStyles,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 19,
            mass: 1.2,
            onComplete: () => {
              setTimeout(() => {
                setPosition(nextPosition);
              }, 500);
            },
          }}
        />
        <div className={styles.timeline}>
          <div className={styles.track}>
            <div
              className={`${styles.tick}`}
              style={{ left: 0 }}
              data-label="Initial"
            />
            <div
              className={`${styles.tick}`}
              style={{ right: 0 }}
              data-label="Target"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
