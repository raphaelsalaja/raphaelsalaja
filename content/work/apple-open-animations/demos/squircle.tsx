"use client";

import { useState } from "react";
import { Control, Controls } from "@/components/controls";
import styles from "./styles.module.css";

const SHOWS = ["Both", "Round", "Squircle"] as const;
type Show = (typeof SHOWS)[number];

export function Squircle() {
  const [show, setShow] = useState<Show>("Both");

  return (
    <div className={styles.demo} data-demo-id="squircle">
      <div className={styles.squircleStage}>
        <div
          className={styles.pair}
          data-show={show.toLowerCase()}
          aria-hidden="true"
        >
          <div className={styles.roundShape} />
          <div className={styles.squircleShape} />
          <svg className={styles.fallback} viewBox="0 0 100 100">
            <path
              d={superellipse(100, 100, 28, 4)}
              fill="none"
              stroke="var(--orange)"
              strokeWidth="1.6"
            />
          </svg>
        </div>
      </div>
      <p className={styles.note}>
        <span className={styles.nativeNote}>
          The round fill sits under a squircle outline, same radius.
        </span>
        <span className={styles.fallbackNote}>
          Drawn fallback. This browser has no corner-shape, so the outline is a
          superellipse.
        </span>
      </p>
      <Controls>
        <Control label="Show" options={SHOWS} value={show} onChange={setShow} />
      </Controls>
    </div>
  );
}

function superellipse(
  width: number,
  height: number,
  radius: number,
  n: number,
) {
  const steps = 18;
  const corners = [
    { cx: radius, cy: radius, a0: Math.PI, a1: Math.PI * 1.5 },
    { cx: width - radius, cy: radius, a0: -Math.PI / 2, a1: 0 },
    { cx: width - radius, cy: height - radius, a0: 0, a1: Math.PI / 2 },
    { cx: radius, cy: height - radius, a0: Math.PI / 2, a1: Math.PI },
  ];
  const points: string[] = [];
  for (const corner of corners) {
    for (let i = 0; i <= steps; i++) {
      const theta = corner.a0 + ((corner.a1 - corner.a0) * i) / steps;
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      const e = 2 / n;
      const x = corner.cx + radius * Math.sign(c) * Math.abs(c) ** e;
      const y = corner.cy + radius * Math.sign(s) * Math.abs(s) ** e;
      points.push(
        `${i === 0 && points.length === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`,
      );
    }
  }
  return `${points.join(" ")} Z`;
}
