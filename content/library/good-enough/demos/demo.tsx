"use client";

import { useState } from "react";
import { useLater } from "@/components/writing/use-later";
import styles from "./demo.module.css";

const LAG = 180;

function Counter({ finished }: { finished: boolean }) {
  const [count, setCount] = useState(0);
  const later = useLater();

  const add = () => {
    if (finished) setCount((value) => value + 1);
    else later(() => setCount((value) => value + 1), LAG);
  };

  return (
    <div className={styles.column}>
      <span className={styles.count}>{count}</span>
      <button
        type="button"
        className={styles.button}
        data-finished={finished || undefined}
        onClick={add}
      >
        Add one
      </button>
      <div className={styles.caption}>
        <span className={styles.title}>
          {finished ? "Finished" : "Good enough"}
        </span>
        <span className={styles.detail}>
          {finished
            ? "Counts on press. Gives under your finger."
            : `Counts ${LAG}ms later. Nothing on press.`}
        </span>
      </div>
    </div>
  );
}

export function PressDemo() {
  return (
    <div className={styles.stage}>
      <Counter finished={false} />
      <div className={styles.divider} />
      <Counter finished />
    </div>
  );
}
