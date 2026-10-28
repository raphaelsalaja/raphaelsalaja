"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Direction } from "../icons";
import styles from "./styles.module.css";

const TIME_MACHINE_CONFIG = {
  wheelThreshold: 150,
  touchThreshold: 20,
  maxVisibleFrames: 5,
  frameSpacing: 18,
  scaleStep: 0.06,
  animationDuration: 0.2,
  blurAmount: 1,
  enableVirtualization: true,
};

export interface TimeMachineFrame {
  id: string;
  content: React.ReactNode;
}

export interface TimeMachineProps {
  frames: TimeMachineFrame[];
  config?: Partial<typeof TIME_MACHINE_CONFIG>;
  showControls?: boolean;
  className?: string;
  onFrameChange?: (index: number) => void;
}

export function TimeMachine({
  frames,
  config = {},
  showControls = true,
  className,
  onFrameChange,
}: TimeMachineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const scrollAccumulator = useRef(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const finalConfig = useMemo(
    () => ({ ...TIME_MACHINE_CONFIG, ...config }),
    [config],
  );

  const goToNextFrame = useCallback(() => {
    const newIndex = Math.min(activeIndex + 1, frames.length - 1);
    setActiveIndex(newIndex);
    scrollAccumulator.current = 0;
  }, [activeIndex, frames.length]);

  const goToPrevFrame = useCallback(() => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    scrollAccumulator.current = 0;
  }, [activeIndex]);

  useEffect(() => {
    onFrameChange?.(activeIndex);
  }, [activeIndex, onFrameChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      scrollAccumulator.current += e.deltaY;

      const threshold = finalConfig.wheelThreshold;

      if (Math.abs(scrollAccumulator.current) >= threshold) {
        if (scrollAccumulator.current > 0 && activeIndex < frames.length - 1) {
          const newIndex = Math.min(activeIndex + 1, frames.length - 1);
          setActiveIndex(newIndex);
          scrollAccumulator.current = 0;
        } else if (scrollAccumulator.current < 0 && activeIndex > 0) {
          const newIndex = Math.max(activeIndex - 1, 0);
          setActiveIndex(newIndex);
          scrollAccumulator.current = 0;
        } else {
          scrollAccumulator.current = 0;
        }
      }

      isScrolling.current = true;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 100);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const threshold = finalConfig.touchThreshold;

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          goToNextFrame();
        } else {
          goToPrevFrame();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [
    finalConfig.wheelThreshold,
    finalConfig.touchThreshold,
    goToNextFrame,
    goToPrevFrame,
    frames.length,
    activeIndex,
  ]);

  const visibleFrames = useMemo(() => {
    if (!finalConfig.enableVirtualization) {
      return frames.map((frame, index) => ({
        ...frame,
        index,
        distanceFromActive: index - activeIndex,
        isVisible:
          index >= activeIndex &&
          index <= activeIndex + finalConfig.maxVisibleFrames,
      }));
    }

    const renderBuffer = 2;
    const startIndex = Math.max(0, activeIndex - renderBuffer);
    const endIndex = Math.min(
      frames.length - 1,
      activeIndex + finalConfig.maxVisibleFrames + renderBuffer,
    );

    return frames.slice(startIndex, endIndex + 1).map((frame, sliceIndex) => {
      const actualIndex = startIndex + sliceIndex;
      return {
        ...frame,
        index: actualIndex,
        distanceFromActive: actualIndex - activeIndex,
        isVisible:
          actualIndex >= activeIndex &&
          actualIndex <= activeIndex + finalConfig.maxVisibleFrames,
      };
    });
  }, [
    frames,
    activeIndex,
    finalConfig.maxVisibleFrames,
    finalConfig.enableVirtualization,
  ]);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className={styles.frames}
        style={{
          touchAction: "none",
        }}
      >
        {visibleFrames.map(
          ({ content, id, index, distanceFromActive, isVisible }) => {
            if (
              Math.abs(distanceFromActive) >
              finalConfig.maxVisibleFrames + 1
            ) {
              return null;
            }

            return (
              <motion.div
                key={id}
                className={styles.frame}
                data-active={distanceFromActive === 0}
                initial={false}
                style={{
                  zIndex: frames.length - index,
                  pointerEvents: distanceFromActive === 0 ? "auto" : "none",
                }}
                animate={{
                  x: "-50%",
                  y: `calc(-50% + ${
                    distanceFromActive < 0
                      ? Math.abs(distanceFromActive) * finalConfig.frameSpacing
                      : distanceFromActive * -finalConfig.frameSpacing
                  }px)`,
                  scale:
                    distanceFromActive < 0
                      ? 1 + Math.abs(distanceFromActive) * finalConfig.scaleStep
                      : 1 -
                        Math.abs(distanceFromActive) * finalConfig.scaleStep,
                  opacity: isVisible ? 1 : 0,
                  filter:
                    distanceFromActive < 0
                      ? `blur(${finalConfig.blurAmount}px)`
                      : "blur(0px)",
                }}
                transition={{
                  duration: finalConfig.animationDuration,
                  ease: "easeOut",
                }}
              >
                {content}
              </motion.div>
            );
          },
        )}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div className={styles.controls}>
          <button
            type="button"
            onClick={goToPrevFrame}
            className={styles.navButton}
            aria-label="Previous frame"
            disabled={activeIndex === 0}
          >
            <Direction direction="up" width={16} />
          </button>
          <span className={styles.indicator}>
            {activeIndex + 1} / {frames.length}
          </span>
          <button
            type="button"
            onClick={goToNextFrame}
            className={styles.navButton}
            aria-label="Next frame"
            disabled={activeIndex === frames.length - 1}
          >
            <Direction direction="down" width={16} />
          </button>
        </div>
      )}
    </div>
  );
}
