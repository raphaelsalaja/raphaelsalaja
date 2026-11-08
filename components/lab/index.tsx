"use client";

import type { ReactNode } from "react";
import { Control, ControlButton } from "@/components/controls";
import shared from "@/content/work/genie/demos/debug.module.css";
import styles from "./styles.module.css";
import { type Lab, OUTLINES, SPEEDS } from "./use-lab";

export { type Lab, useLab } from "./use-lab";

const ROWS = 3;

function Group({
  title,
  grow,
  children,
}: {
  title: string;
  grow?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={shared.group}
      data-grow={grow || undefined}
      aria-label={title}
    >
      <div className={shared.heading} aria-hidden>
        {title}
      </div>
      {children}
    </section>
  );
}

function Readout({ lab }: { lab: Lab }) {
  const { motion, time, frame, moving, running } = lab.snapshot;
  const peak = Math.max(...motion, 1);
  const d = motion
    .map(
      (value, i) =>
        `${i ? "L" : "M"}${((i / 179) * 100).toFixed(2)} ${(100 - (value / peak) * 100).toFixed(2)}`,
    )
    .join("");
  return (
    <div className={shared.readout}>
      <svg
        className={`${shared.chart} ${styles.chart}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path data-kind="Bend" d={d} vectorEffect="non-scaling-stroke" />
      </svg>
      <dl className={shared.stats}>
        <div>
          <dt>Time</dt>
          <dd>{(time / 1000).toFixed(2)} s</dd>
        </div>
        <div>
          <dt>Frame</dt>
          <dd>{frame}</dd>
        </div>
        <div>
          <dt>Moving</dt>
          <dd>{moving}</dd>
        </div>
      </dl>
      <ul className={styles.running}>
        {running.length === 0 && <li className={styles.idle}>Idle</li>}
        {running
          .slice(0, ROWS)
          .map(({ id, name, duration, easing, progress }) => (
            <li key={id}>
              <span className={styles.name}>{name}</span>
              <span className={styles.timing}>
                {Math.round(duration)} ms · {easing}
              </span>
              <span
                className={styles.progress}
                style={{ scale: `${progress} 1` }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export function LabPanel({ lab }: { lab: Lab }) {
  return (
    <div className={styles.panel} data-lab-ui>
      <Group title="Readout">
        <Readout lab={lab} />
      </Group>
      <div className={styles.side}>
        <Group title="Playback">
          <Control
            label="Speed"
            options={SPEEDS}
            value={lab.speed}
            onChange={lab.setSpeed}
          />
          <div className={shared.pair}>
            <ControlButton onClick={() => lab.setPaused(!lab.paused)}>
              {lab.paused ? "Play" : "Pause"}
            </ControlButton>
            <ControlButton onClick={lab.step} disabled={!lab.paused}>
              Step
            </ControlButton>
          </div>
        </Group>
        <Group title="Display">
          <Control
            label="Outlines"
            options={OUTLINES}
            value={lab.outlines}
            onChange={lab.setOutlines}
          />
        </Group>
      </div>
    </div>
  );
}

export function labAttributes(lab: Lab) {
  return {
    className: styles.root,
    "data-lab-open": lab.open || undefined,
    "data-lab-outlines": lab.open ? lab.outlines : undefined,
  };
}
