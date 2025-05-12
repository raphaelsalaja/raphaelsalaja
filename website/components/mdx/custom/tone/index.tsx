"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "./slider";
import styles from "./styles.module.scss";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function createVibe(vibe = 0) {
  const v = Math.max(0, vibe);
  const t0 = v / (v + 50);
  const w = Math.sin(t0 * (Math.PI / 2));

  return {
    type: "spring" as const,
    stiffness: lerp(400, 800, w),
    damping: lerp(40, 80, w),
    mass: lerp(1, 8, w),
  };
}

export const Tone: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [tone, setTone] = useState(50);
  const transition = createVibe(tone);

  const iteration = useRef(0);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
        transition={transition}
        onAnimationComplete={() => {
          if (visible) {
            setTimeout(() => setVisible(false), 1000);
          } else {
            switch (iteration.current) {
              case 0:
                setTone(0);
                break;
              case 1:
                setTone(100);
                break;
              case 2:
                setTone(25);
                break;
              case 3:
                setTone(75);
                break;
              case 4:
                setTone(50);
                break;
              default:
                setTone(Math.random() * 100);
            }
            iteration.current += 1;
            setTimeout(() => setVisible(true), 1000);
          }
        }}
        className={styles.popup}
      >
        <img alt="Tone" src="/posts/insights/tone/image.jpg" className={styles.blur} />
        <Image
          src="/posts/insights/tone/image.jpg"
          alt="Tone"
          fill
          placeholder="blur"
          blurDataURL="/posts/insights/tone/image.jpg"
          className={styles.image}
        />
      </motion.div>

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
