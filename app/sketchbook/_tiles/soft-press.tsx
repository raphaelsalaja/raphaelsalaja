"use client";

import { motion } from "motion/react";
import styles from "./soft-press.module.css";

const settle = { type: "spring", bounce: 0.4, duration: 0.3 } as const;

export function SoftPress() {
  return (
    <motion.button
      type="button"
      className={styles.button}
      whileTap={{ scale: 0.98, y: 1 }}
      transition={settle}
    >
      Save Changes
    </motion.button>
  );
}
