"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const inOutCubic: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

export function SolidDrawing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const restartAnimation = () => {
    setIsLoaded(false);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.svg
          key={`svg-${animationKey}`}
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.globe}
        >
          <title>Globe</title>

          <motion.circle cx="64" cy="64" r="36" fill="var(--background)" />
          <motion.circle
            cx="64"
            cy="64"
            r="26"
            fill="var(--background)"
            stroke="var(--orange-ring)"
            strokeWidth="6"
            initial={{
              strokeDasharray: "2 4.09",
            }}
            animate={{
              rotate: [0, 360],
              strokeDasharray: isLoaded ? "2 0" : "2 4.09",
              transition: {
                default: { repeat: Infinity, ease: "linear", duration: 4 },
                strokeDasharray: {
                  duration: 0.4,
                  ease: inOutCubic,
                },
              },
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 4,
            }}
          />
          <motion.circle
            cx="64"
            cy="64"
            r="16"
            fill="var(--orange)"
            initial={{
              scale: 0,
              fill: "var(--background)",
            }}
            animate={{
              scale: isLoaded ? 1 : 0,
              fill: isLoaded ? "var(--orange)" : "var(--background)",
            }}
            transition={{
              duration: 0.4,
              ease: inOutCubic,
            }}
          />
        </motion.svg>

        <motion.div
          key={`orbit-${animationKey}`}
          initial={{
            transform:
              "translate(-50%, -50%) rotateY(15deg) translateZ(50px) rotateY(345deg)",
          }}
          animate={
            isLoaded
              ? {
                  transform:
                    "translate(-50%, -50%) rotateY(15deg) translateZ(50px) rotateY(345deg)",
                  transition: { ease: [0.19, 1, 0.22, 1], duration: 3 },
                }
              : {
                  transform: [
                    "translate(-50%, -50%) rotateY(360deg) translateZ(48px) rotateY(0deg)",
                    "translate(-50%, -50%) rotateY(0deg) translateZ(48px) rotateY(360deg)",
                  ],
                  transition: { repeat: Infinity, ease: "linear", duration: 3 },
                }
          }
          className={styles.orbit}
          data-loaded={isLoaded}
        >
          <div className={styles.bg} />
          <motion.div
            animate={{
              background: isLoaded ? "var(--purple)" : "var(--orange)",
            }}
            transformTemplate={(latest, generated) => `translate(-50%, -50%) `}
            className={styles.mg}
          />
          <motion.div
            animate={{
              width: isLoaded ? 0 : 8,
              height: isLoaded ? 0 : 8,
            }}
            transformTemplate={(latest, generated) => `translate(-50%, -50%)`}
            className={styles.fg}
            transition={{
              duration: 0.4,
              ease: inOutCubic,
            }}
          />
        </motion.div>
      </div>

      <button
        onClick={restartAnimation}
        className={styles.button}
        type="button"
      >
        Restart Animation
      </button>
    </div>
  );
}
