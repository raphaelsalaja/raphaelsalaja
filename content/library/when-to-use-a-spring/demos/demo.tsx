"use client";

import { animate, motion, type Transition, useMotionValue } from "motion/react";
import { useState } from "react";
import { Segmented } from "@/components/writing/segmented";
import styles from "./demo.module.css";

const modes = ["Ease", "Bounce 0", "Bounce 0.2", "Bounce 0.5"] as const;

type Mode = (typeof modes)[number];

const transitions: Record<Mode, Transition> = {
  Ease: { type: "tween", duration: 0.35, ease: [0.165, 0.84, 0.44, 1] },
  "Bounce 0": { type: "spring", duration: 0.45, bounce: 0 },
  "Bounce 0.2": { type: "spring", duration: 0.45, bounce: 0.2 },
  "Bounce 0.5": { type: "spring", duration: 0.6, bounce: 0.5 },
};

const notes: Record<Mode, string> = {
  Ease: "Comes back on a fixed path. How you threw it doesn't matter.",
  "Bounce 0": "Keeps the speed you let go with, then settles.",
  "Bounce 0.2": "A little past home, then back. Feels like an object.",
  "Bounce 0.5": "Fun once. Tiring by the tenth time.",
};

export function SpringDemo() {
  const [mode, setMode] = useState<Mode>("Bounce 0.2");
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const release = () => {
    animate(x, 0, transitions[mode]);
    animate(y, 0, transitions[mode]);
  };

  return (
    <div className={styles.stage}>
      <div className={styles.area}>
        <motion.div
          className={styles.card}
          drag
          dragMomentum={false}
          style={{ x, y }}
          whileDrag={{ scale: 1.04 }}
          onDragEnd={release}
        >
          Drag
        </motion.div>
      </div>
      <div className={styles.controls}>
        <Segmented
          label="Release"
          options={modes}
          value={mode}
          onChange={setMode}
        />
        <p className={styles.note}>{notes[mode]}</p>
      </div>
    </div>
  );
}
