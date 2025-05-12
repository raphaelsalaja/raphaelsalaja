"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Slider from "./slider";
import styles from "./styles.module.scss";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function createVibe(vibe: number = 0) {
  const v = Math.max(0, vibe);
  const t0 = v / (v + 50);
  const w = Math.sin(t0 * (Math.PI / 2));

  return {
    type: "spring" as const,
    stiffness: lerp(400, 1000, w),
    damping: lerp(40, 80, w),
    mass: lerp(1, 10, w),
  };
}

export const Tone: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [tone, setTone] = useState(50);
  const transition = createVibe(tone);

  useEffect(() => {
    let mounted = true;
    let iteration = 0;

    const wait = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    (async () => {
      while (mounted) {
        setVisible(true);
        await wait(2000);

        setVisible(false);
        await wait(2000);

        if (iteration === 0) {
          setTone(0);
        } else if (iteration === 1) {
          setTone(100);
        } else {
          setTone(Math.random() * 100);
        }
        iteration++;
        await wait(2000);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0,
        }}
        transition={transition}
        className={styles.popup}
      />

      <Slider
        value={tone}
        onValueChange={(value) => {
          if (typeof value === "number") {
            setTone(value);
          }
        }}
      />
    </div>
  );
};
