"use client";

import { type PointerEvent, useRef } from "react";
import styles from "./spotlight-grid.module.css";

const cells = ["Type", "Color", "Motion", "Sound", "Focus", "Icons"];

export function SpotlightGrid() {
  const grid = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent) => {
    for (const cell of grid.current?.children ?? []) {
      const rect = cell.getBoundingClientRect();
      const style = (cell as HTMLElement).style;
      style.setProperty("--x", `${event.clientX - rect.left}px`);
      style.setProperty("--y", `${event.clientY - rect.top}px`);
    }
  };

  return (
    <div ref={grid} className={styles.grid} onPointerMove={onPointerMove}>
      {cells.map((cell) => (
        <div key={cell} className={styles.cell}>
          <span className={styles.face}>{cell}</span>
        </div>
      ))}
    </div>
  );
}
