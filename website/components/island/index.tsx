"use client";

import * as Portal from "@radix-ui/react-portal";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

import { useHeadingTracker } from "@/hooks/useHeadingTracker";
import { useReadingTime } from "@/hooks/useReadingTime";
// Components
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Styles
import styles from "./styles.module.css";
import "./styles.css";

import { MeshGradient, SteppedSimplexNoise } from "@paper-design/shaders-react";
import dynamic from "next/dynamic";
import { CircularProgressbar } from "react-circular-progressbar";
import { formatTimeMMSS, getMinutesAndSeconds } from "@/utils/formatTime";
import Carousel from "./carousel";
import ReadingTimeTracker from "./slider";

const NumberFlow = dynamic(() => import("@number-flow/react").then((mod) => mod.default), {
  ssr: false,
});
const NumberFlowGroup = dynamic(() => import("@number-flow/react").then((mod) => mod.NumberFlowGroup), {
  ssr: false,
});

interface IslandProps extends HTMLMotionProps<"div"> {}

const Island: React.FC<IslandProps> = (props) => {
  const { progress } = useScrollProgress();
  const { heading } = useHeadingTracker();
  const time = useReadingTime();
  const [expanded, setExpanded] = useState(false);
  const currentTime = time.total * (progress / 100);

  // const handleSliderChange = (value: number | readonly number[], event: Event, activeThumbIndex: number) => {
  //   const newValue = Array.isArray(value) ? value[activeThumbIndex] || value[0] : value;
  //   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  //   const targetScrollPosition = (newValue / 100) * maxScroll;

  //   window.scrollTo({
  //     top: targetScrollPosition,
  //     behavior: "auto",
  //   });
  // };

  const handleSliderCommit = (value: number | readonly number[], _event: Event) => {
    const finalValue = Array.isArray(value) ? value[0] : value;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollPosition = (finalValue / 100) * maxScroll;

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  };

  const toggleExpanded = () => setExpanded(!expanded);
  const direction = useScrollDirection();

  return (
    <Portal.Root asChild>
      <motion.div
        className={styles.island}
        style={{
          borderRadius: "32px",
          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.25)",
        }}
        layout
        layoutId="container"
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false} propagate>
          {expanded ? (
            <motion.div key="expanded" className={styles.expanded} layout layoutId="expanded">
              <div className={styles.heading}>
                <motion.button
                  layout
                  layoutId="shader"
                  onClick={toggleExpanded}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <SteppedSimplexNoise
                    color1="#56758f"
                    color2="#91be6f"
                    color3="#f94346"
                    color4="#f9c54e"
                    color5="#ffffff"
                    stepsNumber={10}
                    scale={0.07}
                    speed={0.5}
                    style={{ width: "100%", height: "100%" }}
                  />
                </motion.button>

                <div className={styles.details}>
                  <motion.p
                    layout="position"
                    layoutId="heading"
                    className={styles.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Cultivating Taste
                  </motion.p>
                  <motion.p
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.author}
                  >
                    Raphael Salaja
                  </motion.p>
                </div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="carousel">
                <Carousel
                  options={{
                    loop: false,
                    align: "center",
                    containScroll: false,
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.reading}
                layout
                layoutId="reading"
              >
                <NumberFlowGroup>
                  <span
                    className={styles.time}
                    style={
                      {
                        "--number-flow-char-height": "12px",
                      } as React.CSSProperties
                    }
                  >
                    <NumberFlow
                      willChange
                      value={getMinutesAndSeconds(currentTime).minutes}
                      format={{
                        minimumIntegerDigits: 2,
                      }}
                    />
                    <span>:</span>
                    <NumberFlow
                      willChange
                      value={getMinutesAndSeconds(currentTime).seconds}
                      format={{
                        minimumIntegerDigits: 2,
                      }}
                    />
                  </span>
                </NumberFlowGroup>

                <ReadingTimeTracker
                  value={progress}
                  // onValueChange={handleSliderChange}
                  onValueCommitted={handleSliderCommit}
                />

                <span className={styles.time}>{formatTimeMMSS(time.total)}</span>
              </motion.div>

              <motion.div
                className={styles.progress}
                style={{
                  opacity: 0,
                  position: "absolute",
                  right: "0",
                  bottom: "16px",
                }}
                animate={{ scale: 0.5 }}
                layoutId="progress-indicator"
              >
                <CircularProgressbar strokeWidth={12} value={progress} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="compact" className={styles.compact} layoutId="compact">
              <motion.button
                layout
                layoutId="shader"
                onClick={toggleExpanded}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 24,
                  overflow: "hidden",
                  zIndex: 10,
                }}
              >
                <MeshGradient
                  color1="#B7FC88"
                  color2="#CD88FC"
                  color3="#88EB1E"
                  color4="#6FBA0A"
                  speed={0.5}
                  style={{ width: "100%", height: "100%" }}
                />
              </motion.button>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={heading}
                  layout="position"
                  layoutId="heading"
                  className={styles.text}
                  initial={{
                    opacity: 0,
                    transform: `translateY(${-24 * direction}px)`,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateY(0)",
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    transform: `translateY(${24 * direction}px)`,
                    filter: "blur(4px)",
                  }}
                >
                  {heading}
                </motion.p>
              </AnimatePresence>

              <motion.div className={styles.progress} animate={{ scale: 1 }} layoutId="progress-indicator">
                <CircularProgressbar strokeWidth={12} value={progress} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal.Root>
  );
};

export default Island;
