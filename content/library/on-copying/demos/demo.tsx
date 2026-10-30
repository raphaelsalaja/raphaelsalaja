"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";
import { Segmented } from "@/components/writing/segmented";
import styles from "./demo.module.css";

const DISTANCE = 256;
const REFERENCE = { type: "spring", duration: 0.5, bounce: 0.25 } as const;

const durations = ["0.3s", "0.5s", "0.8s"] as const;
const bounces = ["0", "0.25", "0.5"] as const;

type Duration = (typeof durations)[number];
type Bounce = (typeof bounces)[number];

export function MatchDemo() {
  const [duration, setDuration] = useState<Duration>("0.8s");
  const [bounce, setBounce] = useState<Bounce>("0");
  const reference = useMotionValue(0);
  const copy = useMotionValue(0);
  const side = useRef(0);

  const play = (nextDuration: Duration, nextBounce: Bounce) => {
    const from = side.current;
    const to = from === 0 ? DISTANCE : 0;
    side.current = to;
    reference.jump(from);
    copy.jump(from);
    animate(reference, to, REFERENCE);
    animate(copy, to, {
      type: "spring",
      duration: Number.parseFloat(nextDuration),
      bounce: Number.parseFloat(nextBounce),
    });
  };

  const matched =
    Number.parseFloat(duration) === REFERENCE.duration &&
    Number.parseFloat(bounce) === REFERENCE.bounce;

  return (
    <div className={styles.stage}>
      <div className={styles.top}>
        <div className={styles.track}>
          <motion.span className={styles.reference} style={{ x: reference }} />
          <motion.span className={styles.copy} style={{ x: copy }} />
        </div>
        <div className={styles.legend}>
          <span className={styles.key}>
            <span className={styles.swatch} data-kind="reference" />
            Reference
          </span>
          <span className={styles.key}>
            <span className={styles.swatch} data-kind="copy" />
            Your copy
          </span>
          <span className={styles.status} data-matched={matched || undefined}>
            {matched ? "Matched" : "Not yet"}
          </span>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.row}>
          <span className={styles.name}>Duration</span>
          <Segmented
            label="Duration"
            options={durations}
            value={duration}
            onChange={(value) => {
              setDuration(value);
              play(value, bounce);
            }}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.name}>Bounce</span>
          <Segmented
            label="Bounce"
            options={bounces}
            value={bounce}
            onChange={(value) => {
              setBounce(value);
              play(duration, value);
            }}
          />
        </div>
        <button
          type="button"
          className={styles.play}
          onClick={() => play(duration, bounce)}
        >
          Play
        </button>
      </div>
    </div>
  );
}
