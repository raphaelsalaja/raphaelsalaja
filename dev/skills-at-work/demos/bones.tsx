"use client";

import { useRef, useState } from "react";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

type Box = { width: number; height: number };

export function BonesDemo() {
  const reduced = useReducedMotion();
  const name = useRef<HTMLParagraphElement>(null);
  const role = useRef<HTMLParagraphElement>(null);
  const [phase, setPhase] = useState<"loaded" | "waiting" | "skeleton">(
    "loaded",
  );
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [overlay, setOverlay] = useState(false);
  const [latency, setLatency] = useState<"Fast" | "Slow">("Slow");

  const measure = () => {
    const lines = [name.current, role.current].flatMap((node) => {
      if (!node) return [];
      const rect = node.getBoundingClientRect();
      return [
        { width: Math.round(rect.width), height: Math.round(rect.height) },
      ];
    });
    setBoxes(lines);
    return lines;
  };

  const load = () => {
    const lines = measure();
    setOverlay(false);
    setPhase("waiting");
    const delay = latency === "Fast" ? 160 : 1600;
    const showSkeleton = window.setTimeout(() => {
      if (latency === "Slow") setPhase("skeleton");
    }, 300);
    const finish = window.setTimeout(() => {
      setPhase("loaded");
      setBoxes(lines);
    }, delay);
    return () => {
      window.clearTimeout(showSkeleton);
      window.clearTimeout(finish);
    };
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div
          className={styles.stage}
          style={{ position: "relative", minHeight: 120 }}
        >
          <div
            style={{ display: phase === "skeleton" ? "none" : "grid", gap: 6 }}
            aria-hidden={phase === "skeleton"}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: "var(--gray-5)",
              }}
            />
            <p ref={name}>Maya Chen</p>
            <p ref={role}>Support lead, Dublin</p>
          </div>
          {phase === "skeleton" && (
            <div style={{ display: "grid", gap: 6 }} aria-hidden="true">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: "var(--gray-4)",
                }}
              />
              {boxes.map((box) => (
                <div
                  key={`${box.width}-${box.height}`}
                  style={{
                    width: box.width,
                    height: box.height,
                    borderRadius: 6,
                    background: "var(--gray-4)",
                    animation: reduced
                      ? "none"
                      : "bones-pulse 1.2s ease-in-out infinite",
                  }}
                />
              ))}
            </div>
          )}
          {overlay && phase === "loaded" && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 16,
                display: "grid",
                gap: 6,
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: "var(--gray-8)",
                }}
              />
              {boxes.map((box) => (
                <div
                  key={`over-${box.width}`}
                  style={{
                    width: box.width,
                    height: box.height,
                    borderRadius: 6,
                    background: "var(--gray-8)",
                  }}
                />
              ))}
            </div>
          )}
          <style>{"@keyframes bones-pulse { 50% { opacity: 0.55; } }"}</style>
        </div>
        <div className={styles.row}>
          <button
            type="button"
            className={styles.button}
            onClick={() => load()}
          >
            Load
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              measure();
              setPhase("loaded");
              setOverlay((value) => !value);
            }}
          >
            Overlay at 50%
          </button>
        </div>
        <Controls>
          <Control
            label="Latency"
            options={["Fast", "Slow"]}
            value={latency}
            onChange={setLatency}
          />
        </Controls>
        {boxes.length > 0 && (
          <p className={styles.note} role="status">
            Measured lines{" "}
            {boxes.map((box) => `${box.width}×${box.height}`).join(", ")}. Fast
            resolves before the skeleton. Slow shows it.
          </p>
        )}
      </div>
    </Demo>
  );
}
