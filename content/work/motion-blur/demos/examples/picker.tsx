"use client";

import { echo, motionBlur } from "@web-kits/motion-blur";
import { useRef } from "react";
import styles from "./picker.module.css";
import { clamp01, drive, outQuart, outQuint, phase, useScene } from "./scene";

// A time picker flicked. The minutes wheel is thrown hard and coasts down
// to a stop, streaking while it's too fast to read; the hours wheel gets a
// gentler flick, so it blurs far less.

const ROW = 48;
const WINDOW = 240;
const PASS = 2.8;
const WHEELS = [
  {
    items: Array.from({ length: 12 }, (_, i) => String(i + 1)),
    start: 8,
    advance: 7,
    at: 1.3,
    spin: 0.9,
    ease: outQuart,
  },
  {
    items: Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0")),
    start: 6,
    advance: 19,
    at: 0.35,
    spin: 1.1,
    ease: outQuint,
  },
];

type Wheel = (typeof WHEELS)[number];

const rowAt = (wheel: Wheel, time: number) => {
  const { pass, at } = phase(time, PASS);
  return (
    wheel.start +
    pass * wheel.advance +
    wheel.advance * wheel.ease(clamp01((at - wheel.at) / wheel.spin))
  );
};

const offset = (wheel: Wheel, row: number) =>
  (WINDOW - ROW) / 2 - (wheel.items.length + row) * ROW;

export function PickerExample() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, (el) => {
    const hosts = [...el.querySelectorAll<HTMLElement>(`.${styles.host}`)];
    const blurs = hosts.map((host) =>
      motionBlur(host, { technique: echo({ spacing: 0.5, copies: 64 }) }),
    );
    return {
      tick(time, frame) {
        hosts.forEach((host, i) => {
          const wheel = WHEELS[i];
          const n = wheel.items.length;
          const base = Math.floor(rowAt(wheel, time) / n) * n;
          drive(
            host,
            blurs[i],
            (s) =>
              new DOMMatrix().translate(
                0,
                offset(wheel, rowAt(wheel, s) - base),
              ),
            time,
            frame,
          );
        });
      },
      destroy: () => {
        for (const blur of blurs) blur.destroy();
      },
    };
  });

  return (
    <div ref={root} className={styles.picker}>
      <span className={styles.band} />
      {WHEELS.map((wheel, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed set of wheels
        <div key={i} className={styles.wheel}>
          <div
            className={styles.host}
            style={{
              transform: `translateY(${offset(wheel, wheel.start % wheel.items.length)}px)`,
            }}
          >
            <div className={styles.column}>
              {[...wheel.items, ...wheel.items, ...wheel.items].map(
                (item, j) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: each label repeats three times
                  <span key={j}>{item}</span>
                ),
              )}
            </div>
          </div>
        </div>
      ))}
      <div className={styles.period}>
        <span>AM</span>
        <span data-faint>PM</span>
      </div>
    </div>
  );
}
