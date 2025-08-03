"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Direction } from "../icons";
import styles from "./styles.module.css";

// Configuration for the Time Machine effect
const TIME_MACHINE_CONFIG = {
  // Scroll sensitivity
  wheelThreshold: 750,
  touchThreshold: 20,

  // Visual settings
  maxVisibleFrames: 5,
  frameSpacing: 24, // Y offset between frames
  scaleStep: 0.09, // How much each frame scales

  // Animation
  animationDuration: 0.25,
  blurAmount: 2, // px

  // Performance
  enableVirtualization: true, // Only render visible frames for better performance
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

  // Merge user config with defaults (memoized to prevent recalculation)
  const finalConfig = useMemo(
    () => ({ ...TIME_MACHINE_CONFIG, ...config }),
    [config],
  );

  // Optimized frame change handlers
  const goToNextFrame = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, frames.length - 1));
  }, [frames.length]);

  const goToPrevFrame = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Notify parent of frame changes
  useEffect(() => {
    onFrameChange?.(activeIndex);
  }, [activeIndex, onFrameChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Accumulate scroll delta for smoother transitions
      scrollAccumulator.current += e.deltaY;

      const threshold = finalConfig.wheelThreshold;

      if (Math.abs(scrollAccumulator.current) >= threshold) {
        if (scrollAccumulator.current > 0) {
          goToNextFrame();
        } else {
          goToPrevFrame();
        }

        // Reset accumulator after frame change
        scrollAccumulator.current = 0;
      }
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
    };
  }, [
    finalConfig.wheelThreshold,
    finalConfig.touchThreshold,
    goToNextFrame,
    goToPrevFrame,
  ]);

  // Optimize visible frames calculation with virtualization
  const visibleFrames = useMemo(() => {
    if (!finalConfig.enableVirtualization) {
      // Render all frames if virtualization is disabled
      return frames.map((frame, index) => ({
        ...frame,
        index,
        distanceFromActive: index - activeIndex,
        isVisible:
          index >= activeIndex &&
          index <= activeIndex + finalConfig.maxVisibleFrames,
      }));
    }

    // Only calculate frames that are actually visible for performance
    const renderBuffer = 2; // Render a few extra frames for smooth transitions
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
            // Skip rendering frames that are too far away for performance
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
                  zIndex: frames.length - index, // Use actual index for z-index
                  pointerEvents: distanceFromActive === 0 ? "auto" : "none",
                }}
                animate={{
                  x: "-50%",
                  y: `calc(-50% + ${
                    distanceFromActive < 0
                      ? Math.abs(distanceFromActive) * finalConfig.frameSpacing // Past frames: positive Y (move backward)
                      : distanceFromActive * -finalConfig.frameSpacing // Future frames: negative Y (move forward)
                  }px)`,
                  scale:
                    distanceFromActive < 0
                      ? 1 + Math.abs(distanceFromActive) * finalConfig.scaleStep // Past frames: get bigger
                      : 1 - distanceFromActive * finalConfig.scaleStep, // Future frames: get smaller
                  opacity: isVisible ? 1 : 0,
                  filter:
                    distanceFromActive < 0
                      ? `blur(${finalConfig.blurAmount}px)`
                      : "blur(0px)", // Blur past frames
                }}
                transition={{
                  duration: finalConfig.animationDuration,
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
