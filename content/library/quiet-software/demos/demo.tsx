"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Segmented } from "@/components/writing/segmented";
import { useLater } from "@/components/writing/use-later";
import styles from "./demo.module.css";

const modes = ["Loud", "Quiet"] as const;

type Mode = (typeof modes)[number];

const tasks = ["Reply to Sam", "Check the menu timing", "Send the invoice"];

const cheers = [
  "Amazing work! You're on fire.",
  "Another one down! Keep the streak going.",
  "Incredible! You're unstoppable today.",
];

const particles = Array.from({ length: 10 }, (_, i) => ({
  angle: (i / 10) * Math.PI * 2,
  distance: 28 + (i % 3) * 8,
}));

export function QuietDemo() {
  const [mode, setMode] = useState<Mode>("Loud");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [burst, setBurst] = useState<{ id: number; task: string } | null>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const later = useLater();
  const loud = mode === "Loud";

  const toggle = (task: string) => {
    const next = !done[task];
    setDone((value) => ({ ...value, [task]: next }));
    if (!next || !loud) return;

    const id = Date.now();
    const count = Object.values(done).filter(Boolean).length;
    setBurst({ id, task });
    setToast({ id, text: cheers[count % cheers.length] });
    later(() => setBurst((value) => (value?.id === id ? null : value)), 800);
    later(() => setToast((value) => (value?.id === id ? null : value)), 2000);
  };

  return (
    <div className={styles.stage} data-mode={mode}>
      <div className={styles.list}>
        {tasks.map((task) => {
          const checked = Boolean(done[task]);
          const bursting = burst?.task === task;
          return (
            <motion.label
              key={task}
              className={styles.row}
              data-flash={(loud && bursting) || undefined}
              animate={loud && bursting ? { x: [0, -4, 4, -2, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <input
                type="checkbox"
                className={styles.input}
                checked={checked}
                onChange={() => toggle(task)}
              />
              <span className={styles.box}>
                <motion.span
                  className={styles.fill}
                  animate={
                    loud && bursting
                      ? { scale: [1, 1.45, 0.9, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path d="M2 5.2l2 2L8 3" />
                  </svg>
                </motion.span>
                {loud && burst && bursting && (
                  <span className={styles.particles} key={burst.id}>
                    {particles.map(({ angle, distance }) => (
                      <motion.span
                        key={angle}
                        className={styles.particle}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance - 6,
                          opacity: 0,
                          scale: 0.4,
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    ))}
                  </span>
                )}
              </span>
              <span className={styles.label}>{task}</span>
            </motion.label>
          );
        })}
      </div>
      <div className={styles.toastArea}>
        <AnimatePresence>
          {loud && toast && (
            <motion.div
              key={toast.id}
              className={styles.toast}
              initial={{ y: 24, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.55, duration: 0.6 }}
            >
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.controls}>
        <Segmented
          label="Mode"
          options={modes}
          value={mode}
          onChange={setMode}
        />
        <p className={styles.note}>
          {loud
            ? "Tick a task. Then tick another."
            : "Tick a task. It's done, and you can see that it's done."}
        </p>
      </div>
    </div>
  );
}
