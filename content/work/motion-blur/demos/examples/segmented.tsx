"use client";

import { echo, motionBlur } from "@web-kits/motion-blur";
import { useRef } from "react";
import { clamp01, drive, outBack, phase, useScene } from "./scene";
import styles from "./segmented.module.css";

// A segmented control whose selection whips across three tabs at a time.
// Only the pill blurs; the labels sit above it and stay sharp.

const TABS = ["Day", "Week", "Month", "Year"];
const WIDTH = 64;
const HOP = 1.1;
const HOLD = 0.75;
const MOVE = 0.32;
const TARGETS = [3, 0, 2, 0];

const tabAt = (time: number) => {
  const { at } = phase(time, HOP * TARGETS.length);
  const j = Math.floor(at / HOP);
  const from = TARGETS.at(j - 1) ?? 0;
  const to = TARGETS[j];
  return (
    from + (to - from) * outBack(clamp01((at - j * HOP - HOLD) / MOVE), 1.1)
  );
};

export function SegmentedExample() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, (el) => {
    const host = el.querySelector<HTMLElement>(`.${styles.host}`)!;
    const labels = [...el.querySelectorAll<HTMLElement>(`.${styles.label}`)];
    const blur = motionBlur(host, { technique: echo() });
    let active = 0;
    return {
      tick(time, frame) {
        drive(
          host,
          blur,
          (s) => new DOMMatrix().translate(tabAt(s) * WIDTH, 0),
          time,
          frame,
        );
        const next = Math.round(tabAt(time));
        if (next === active) return;
        labels[active].removeAttribute("data-active");
        labels[next].setAttribute("data-active", "");
        active = next;
      },
      destroy: () => blur.destroy(),
    };
  });

  return (
    <div ref={root} className={styles.control}>
      <div className={styles.host}>
        <div className={styles.pill} />
      </div>
      {TABS.map((tab, i) => (
        <span
          key={tab}
          className={styles.label}
          data-active={i === 0 || undefined}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}
