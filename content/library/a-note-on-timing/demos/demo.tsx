"use client";

import { type CSSProperties, useCallback, useRef, useState } from "react";
import { Segmented } from "@/components/writing/segmented";
import { useDismiss } from "@/components/writing/use-dismiss";
import styles from "./demo.module.css";

const durations = ["150ms", "300ms", "600ms"] as const;

type Duration = (typeof durations)[number];

const notes: Record<Duration, string> = {
  "150ms": "Gone before you think about it.",
  "300ms": "Fine once. By the fifth time, you're waiting.",
  "600ms": "Every open is a small wait.",
};

const items = ["Copy link", "Share", "Rename", "Delete"];

export function DurationDemo() {
  const [duration, setDuration] = useState<Duration>("150ms");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useDismiss(ref, open, close);

  return (
    <div
      className={styles.stage}
      style={{ "--duration": duration } as CSSProperties}
    >
      <div className={styles.anchor} ref={ref}>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((value) => !value)}
        >
          Open menu
        </button>
        <div
          className={styles.menu}
          role="menu"
          data-open={open || undefined}
          inert={!open}
        >
          {items.map((item) => (
            <button
              key={item}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={close}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <Segmented
          label="Duration"
          options={durations}
          value={duration}
          onChange={setDuration}
        />
        <p className={styles.note}>{notes[duration]}</p>
      </div>
    </div>
  );
}
