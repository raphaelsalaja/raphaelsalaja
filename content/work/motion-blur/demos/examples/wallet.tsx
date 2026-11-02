"use client";

import { echo, motionBlur } from "@web-kits/motion-blur";
import { useRef } from "react";
import {
  clamp01,
  inOutCubic,
  outCubic,
  phase,
  spring,
  useScene,
} from "./scene";
import styles from "./wallet.module.css";

// A stack of cards. The front one is flicked off to the side, fastest as it
// leaves, swings back in behind the others, and the rest step forward a slot.
// The copies trace the arc it swings through, and nothing blurs at rest.

const CARDS = [
  { name: "Everyday", last: "4821", tone: "#21201c" },
  { name: "Travel", last: "0937", tone: "var(--blue)" },
  { name: "Savings", last: "5160", tone: "var(--red)" },
];

const PERIOD = 2.4;
const HOLD = 1.1;
const OUT = 0.28;
const BACK = 0.5;
const STEP = 0.12;
const GAP = 14;
const SHRINK = 0.06;
const FLING = { x: 232, y: -28, r: 10 };

const slot = (s: number) =>
  new DOMMatrix().translate(0, -s * GAP).scale(1 - s * SHRINK);

const mix = (a: DOMMatrix, b: DOMMatrix, t: number) => {
  const m = new DOMMatrix();
  for (const k of ["a", "b", "c", "d", "e", "f"] as const)
    m[k] = a[k] + (b[k] - a[k]) * t;
  return m;
};

/** Card `i`'s pose at `time`, and its stacking order. It drops behind once clear of the stack. */
const poseAt = (i: number, time: number) => {
  const n = CARDS.length;
  const { pass, at } = phase(time, PERIOD);
  const s = (((i - pass) % n) + n) % n;
  if (s > 0) {
    const t = at < HOLD + STEP ? 0 : spring(at - HOLD - STEP, 16, 0.72);
    return { pose: mix(slot(s), slot(s - 1), t), z: n - s };
  }
  if (at < HOLD) return { pose: slot(0), z: n };
  if (at < HOLD + OUT) {
    const t = outCubic((at - HOLD) / OUT);
    return {
      pose: new DOMMatrix()
        .translate(FLING.x * t, FLING.y * t)
        .rotate(FLING.r * t),
      z: n,
    };
  }
  const t = inOutCubic(clamp01((at - HOLD - OUT) / BACK));
  const away = new DOMMatrix().translate(FLING.x, FLING.y).rotate(FLING.r);
  return { pose: mix(away, slot(n - 1), t), z: 0 };
};

export function WalletExample() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, (el) => {
    const hosts = [...el.querySelectorAll<HTMLElement>(`.${styles.host}`)];
    const blurs = hosts.map((host) => motionBlur(host, { technique: echo() }));
    return {
      tick(time, frame) {
        hosts.forEach((host, i) => {
          const { pose, z } = poseAt(i, time);
          host.style.transform = pose.toString();
          host.style.zIndex = String(z);
          blurs[i].render((t) => poseAt(i, time + t * frame).pose);
        });
      },
      destroy: () => {
        for (const blur of blurs) blur.destroy();
      },
    };
  });

  return (
    <div ref={root} className={styles.frame}>
      <div className={styles.stack}>
        {CARDS.map(({ name, last, tone }) => (
          <div key={name} className={styles.host}>
            <div className={styles.card} style={{ background: tone }}>
              <span className={styles.name}>{name}</span>
              <span className={styles.chip} />
              <span className={styles.number}>•••• {last}</span>
              <span className={styles.mark}>
                <i />
                <i />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
