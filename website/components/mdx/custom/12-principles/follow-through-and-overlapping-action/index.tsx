"use client";

import { motion } from "motion/react";
import styles from "./styles.module.css";

export function FollowThroughAndOverlappingAction() {
  return (
    <motion.button
      whileHover={{
        scale: 1.5,
      }}
      whileTap={{
        scale: 0.8,
      }}
      transition={{
        ease: [1, -0.5, 0.5, 0.95],
        duration: 0.4,
      }}
      className={styles.button}
    >
      Anticipation
    </motion.button>
  );
}
