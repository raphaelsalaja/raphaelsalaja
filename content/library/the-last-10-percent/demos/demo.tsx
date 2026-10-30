"use client";

import { useCallback, useRef, useState } from "react";
import { Segmented } from "@/components/writing/segmented";
import { useDismiss } from "@/components/writing/use-dismiss";
import styles from "./demo.module.css";

const passes = ["90%", "94%", "97%", "100%"] as const;

type Pass = (typeof passes)[number];

const notes: Record<Pass, string> = {
  "90%": "It opens. That's all.",
  "94%": "It animates, from the middle, at one slow speed.",
  "97%": "It grows from the button and leaves faster than it came.",
  "100%": "The button answers the press. The rows answer the pointer.",
};

const items = ["Rename", "Duplicate", "Move to…", "Archive"];

export function LastTenPercentDemo() {
  const [pass, setPass] = useState<Pass>("90%");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useDismiss(ref, open, close);

  return (
    <div className={styles.stage} data-pass={pass}>
      <div className={styles.anchor} ref={ref}>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((value) => !value)}
        >
          Options
          <svg
            className={styles.chevron}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden="true"
          >
            <path d="M2.5 4l2.5 2.5L7.5 4" />
          </svg>
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
          label="Pass"
          options={passes}
          value={pass}
          onChange={setPass}
        />
        <p className={styles.note}>{notes[pass]}</p>
      </div>
    </div>
  );
}
