"use client";

import { useState } from "react";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";

const SOURCE = {
  spacing: 20,
  radius: 16,
  blur: 12,
  shadowY: 8,
  shadowBlur: 16,
  shadowOpacity: 0.12,
  opacity: 1,
  color: "#4c1d95",
};

export function TuneDemo() {
  const [values, setValues] = useState(SOURCE);
  const set = (key: keyof typeof SOURCE, next: number | string) =>
    setValues((current) => ({ ...current, [key]: next }));

  return (
    <Demo>
      <div className={styles.stack}>
        <div
          style={{
            width: "min(100%, 280px)",
            padding: values.spacing,
            borderRadius: values.radius,
            opacity: values.opacity,
            color: "#fafaf9",
            background: values.color,
            boxShadow: `0 ${values.shadowY}px ${values.shadowBlur}px rgb(0 0 0 / ${values.shadowOpacity})`,
            backdropFilter: `blur(${values.blur}px)`,
          }}
        >
          <strong>Notes</strong>
          <p>A card reading these knobs.</p>
        </div>
        <div className={styles.report}>
          {(
            [
              ["spacing", 0, 48, 1],
              ["radius", 0, 40, 1],
              ["blur", 0, 40, 1],
              ["shadowY", 0, 32, 1],
              ["shadowBlur", 0, 64, 1],
              ["opacity", 0.4, 1, 0.01],
            ] as const
          ).map(([key, min, max, step]) => (
            <label key={key} className={styles.field}>
              {key} {values[key]}
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={values[key]}
                onChange={(event) => set(key, Number(event.target.value))}
              />
            </label>
          ))}
          <label className={styles.field}>
            Colour
            <input
              type="color"
              value={values.color}
              aria-label="Colour"
              onChange={(event) => set("color", event.target.value)}
            />
          </label>
        </div>
      </div>
    </Demo>
  );
}
