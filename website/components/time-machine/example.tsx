"use client";

import { TimeMachine, type TimeMachineFrame } from "@/components/time-machine";
import styles from "./styles.module.css";

export function Example() {
  // Generate 100 test frames
  const frames: TimeMachineFrame[] = Array.from(
    { length: 1000 },
    (_, index) => {
      const frameNumber = index + 1;
      return {
        id: `frame-${frameNumber}`,
        content: (
          <div className={styles.frameContent}>
            <div className={styles.browserHeader}>
              <div className={styles.browserControls}>
                <div
                  className={styles.dot}
                  style={{ background: "#FE5F57" }}
                ></div>
                <div
                  className={styles.dot}
                  style={{ background: "#FEBB2E" }}
                ></div>
                <div
                  className={styles.dot}
                  style={{ background: "#26C941" }}
                ></div>
              </div>
              <div className={styles.addressBar}>example{frameNumber}.com</div>
            </div>
            <div className={styles.frameBody}>
              <h2>Frame {frameNumber}</h2>
              <p>This is frame {frameNumber} in the time machine</p>
            </div>
          </div>
        ),
      };
    },
  );

  return (
    <TimeMachine
      frames={frames}
      config={{
        wheelThreshold: 750,
        frameSpacing: 24,
        maxVisibleFrames: 5,
      }}
      onFrameChange={(index) => {
        console.log("Active index changed to:", index);
      }}
    />
  );
}
