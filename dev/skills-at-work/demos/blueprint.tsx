"use client";

import { useRef, useState } from "react";
import { Demo } from "@/components/demo";
import { IconBolt } from "@/components/icons";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

type Callout = { label: string; value: string };

export function BlueprintDemo() {
  const reduced = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [open, setOpen] = useState(0);

  const measure = () => {
    const node = card.current;
    const control = button.current;
    if (!node || !control) return;
    const style = getComputedStyle(node);
    const controlStyle = getComputedStyle(control);
    setCallouts([
      {
        label: "Padding",
        value: `${Math.round(Number.parseFloat(style.paddingTop))}px`,
      },
      { label: "Gap", value: style.rowGap },
      { label: "Radius", value: style.borderRadius },
      { label: "Type", value: `${style.fontSize} / ${style.lineHeight}` },
      {
        label: "Hit",
        value: `${Math.round(control.getBoundingClientRect().width)}×${Math.round(control.getBoundingClientRect().height)}`,
      },
      { label: "Control radius", value: controlStyle.borderRadius },
    ]);
    if (reduced) setOpen(100);
  };

  const play = () => {
    measure();
    if (reduced) {
      setOpen(100);
      return;
    }
    setOpen(0);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2400);
      setOpen(Math.round(t * 100));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div style={{ position: "relative", width: "min(100%, 320px)" }}>
          <div
            ref={card}
            style={{
              display: "grid",
              gap: 12,
              padding: 16,
              borderRadius: 16,
              background: "var(--background-primary)",
              boxShadow: "var(--shadow-raised)",
            }}
          >
            <strong>Pro Plan</strong>
            <span>Billed yearly, 4 seats</span>
            <button
              ref={button}
              type="button"
              className={styles.button}
              style={{ minHeight: 40 }}
            >
              <IconBolt size={16} /> Upgrade
            </button>
          </div>
          {callouts.length > 0 && (
            <div
              aria-hidden={open === 0}
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                alignContent: "center",
                gap: 4,
                padding: 12,
                background: "var(--background-secondary)",
                clipPath: `inset(0 ${100 - open}% 0 0)`,
              }}
            >
              {callouts.map((item) => (
                <p key={item.label}>
                  {item.label}{" "}
                  <span className={styles.muted}>{item.value}</span>
                </p>
              ))}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <button type="button" className={styles.button} onClick={measure}>
            Measure
          </button>
          <button type="button" className={styles.button} onClick={play}>
            Play Wipe
          </button>
        </div>
        <label className={styles.field}>
          Reveal
          <input
            type="range"
            min={0}
            max={100}
            value={open}
            onChange={(event) => {
              if (callouts.length === 0) measure();
              setOpen(Number(event.target.value));
            }}
          />
        </label>
      </div>
    </Demo>
  );
}
