"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const transitions = {
  blur: {
    initial: { opacity: 0, filter: "blur(16px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(16px)" },
  },
};

export const BatteryIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (!isLowPowerMode) {
      setIsLowPowerMode(true);
    } else {
      setIsLowPowerMode(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsLowPowerMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.frame}>
      <motion.div
        ref={ref}
        onClick={handleClick}
        className={styles.island}
        whileTap={{ scale: 0.95 }}
        whileHover={{ cursor: "pointer" }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        style={{ borderRadius: "40px" }}
        layout
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.div
              key="open"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              {...transitions.blur}
              className={styles.content}
              layoutId="battery-icon"
            >
              <div className={styles.leading}>
                <span className={styles.level}>10% Battery</span>

                <motion.span
                  className={styles.mode}
                  initial={{ opacity: 0, filter: "blur(2px)" }}
                  animate={{
                    color: isLowPowerMode ? "#FEC642" : "#808080",
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{ opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  key={isLowPowerMode ? "low-power" : "normal"}
                >
                  {isLowPowerMode
                    ? "Low Power Mode Enabled"
                    : "Tap to turn on Low Power Mode"}
                </motion.span>
              </div>
              <motion.div
                className={styles.trailing}
                animate={{
                  backgroundColor: isLowPowerMode ? "#FEC642" : "#330d0e",
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {!isLowPowerMode && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        filter: [
                          "brightness(1)",
                          "brightness(1.5)",
                          "brightness(1)",
                        ],
                      }}
                      exit={{ opacity: 0 }}
                      className={styles.container}
                      transition={{
                        filter: {
                          duration: 1.5,
                          repeatDelay: 0.5,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        default: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        animate={{
                          width: [6.46397, 35],
                          height: [15.2309, 35],
                          opacity: [0, 1, 0],
                          borderRadius: [3.23199, 10000],
                        }}
                        transition={{
                          default: {
                            duration: 1.5,
                            repeatDelay: 0.5,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          opacity: {
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                            ease: "linear",
                            delay: 0.04,
                          },
                        }}
                        className={styles.ring}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <LowPowerModeIcon isLowPowerMode={isLowPowerMode} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              {...transitions.blur}
              layoutId="battery-icon"
              style={{ height: "38px" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

function LowPowerModeIcon({ isLowPowerMode }: { isLowPowerMode: boolean }) {
  return (
    <motion.svg
      width="44"
      height="22"
      viewBox="0 0 44 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        opacity="0.35"
        y="-0.00012207"
        width="40.3998"
        height="22.0002"
        rx="7.95"
        animate={{
          opacity: isLowPowerMode ? 1 : 0.35,
          fill: isLowPowerMode ? "#000" : "#93232A",
        }}
      />
      <motion.path
        opacity="0.4"
        d="M42.5158 8.28173C42.2254 8.06705 41.854 8.30302 41.854 8.66421V13.8998C41.854 14.2609 42.2254 14.4969 42.5158 14.2822C43.434 13.6036 44.0001 12.491 44.0001 11.282C44.0001 10.073 43.434 8.96036 42.5158 8.28173Z"
        animate={{
          opacity: isLowPowerMode ? 1 : 0.4,
          fill: isLowPowerMode ? "#000" : "#8F2329",
        }}
      />
      <motion.rect
        x="3.9082"
        y="3.3844"
        width="6.46397"
        height="15.2309"
        rx="3.23199"
        animate={{
          fill: isLowPowerMode ? "#FEC642" : "#FF4F5C",
        }}
      />
    </motion.svg>
  );
}
