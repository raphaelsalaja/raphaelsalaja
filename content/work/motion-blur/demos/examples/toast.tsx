"use client";

import { echo, motionBlur } from "@web-kits/motion-blur";
import { useRef } from "react";
import { drive, outCubic, phase, spring, useScene } from "./scene";
import styles from "./toast.module.css";

// A notification that drops in on a stiff spring, sits long enough to read,
// then is flicked back up, fastest as it leaves the finger. It streaks on
// the way in and out, and is sharp the whole time it's still.

const PERIOD = 3.2;
const SHOW = 1.3;
const EXIT = 0.3;
const ENTER = 2.1;
const DROP = 136;

const yAt = (time: number) => {
  const { at } = phase(time, PERIOD);
  if (at < SHOW) return 0;
  if (at < SHOW + EXIT) return -DROP * outCubic((at - SHOW) / EXIT);
  if (at < ENTER) return -DROP;
  return -DROP * (1 - spring(at - ENTER, 20, 0.6));
};

export function ToastExample() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, (el) => {
    const host = el.querySelector<HTMLElement>(`.${styles.host}`)!;
    const blur = motionBlur(host, { technique: echo() });
    return {
      tick(time, frame) {
        drive(
          host,
          blur,
          (s) => new DOMMatrix().translate(0, yAt(s)),
          time,
          frame,
        );
      },
      destroy: () => blur.destroy(),
    };
  });

  return (
    <div ref={root} className={styles.frame}>
      <div className={styles.host}>
        <div className={styles.toast}>
          <span className={styles.icon}>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20 6 9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.text}>
            <span className={styles.title}>Payment received</span>
            <span className={styles.body}>$48.00 from Maya</span>
          </span>
          <span className={styles.time}>now</span>
        </div>
      </div>
    </div>
  );
}
