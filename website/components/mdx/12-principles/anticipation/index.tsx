"use client";

import { Checkbox } from "@base-ui-components/react/checkbox";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Avatar, Bolt, Check, HighPriority, InProgress } from "./icons";
import styles from "./styles.module.css";

export function Anticipation() {
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.issues}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tasks</h2>
          <div className={styles.line} />
        </div>
        <motion.div
          className={styles.issue}
          onClick={() => setSelected(!selected)}
          data-state={selected ? "checked" : "unchecked"}
        >
          <Checkbox.Root
            checked={selected}
            className={styles.checkbox}
            onCheckedChange={setSelected}
          >
            <Checkbox.Indicator className={styles.indicator}>
              <Check className={styles.check} color="var(--white)" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <div className={styles.priority}>
            <HighPriority />
          </div>
          <span className={styles.id}>TPA-42</span>
          <InProgress />
          <span className={styles.title}>Anticipate Future Deletions</span>
          <div className={styles.spacer} />
          <Avatar className={styles.avatar} />
          <div className={styles.date}>Dec 28</div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{
              opacity: 0,
              y: 64,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 64,
              scale: 1,
            }}
            transformTemplate={(latest, generated) =>
              `translate(-50%, -0%) ${generated}`
            }
            transition={{
              ease: [0.19, 1, 0.22, 1],
              duration: 0.6,
            }}
            className={styles.popup}
          >
            <Bolt className={styles.bolt} />
            <span className={styles.selected}>Quick Actions</span>
            <button className={styles.clear}>Clear</button>
            <button className={styles.delete}>
              <div aria-hidden="true" className={styles.hold} />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
