"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";

type Item = {
  id: string;
  title: string;
  detail?: string;
  body?: string;
  progress?: number;
  priority: number;
  size: "compact" | "expanded" | "full";
};

const SIZE = {
  compact: { height: 40, width: 220, radius: 20 },
  expanded: { height: 96, width: 300, radius: 28 },
  full: { height: 160, width: 320, radius: 32 },
};

export function IslandDemo() {
  const reduced = useReducedMotion();
  const [queue, setQueue] = useState<Item[]>([]);
  const [status, setStatus] = useState("");
  const head = queue[0];

  useEffect(() => {
    if (!head) return;
    setStatus("");
    const frame = requestAnimationFrame(() => setStatus(head.title));
    return () => cancelAnimationFrame(frame);
  }, [head]);

  useEffect(() => {
    if (!head) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, [role='dialog']")
      ) {
        return;
      }
      setQueue((current) => current.slice(1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [head]);

  const upload = () => {
    const item: Item = {
      id: "upload",
      title: "Uploading",
      detail: "Notes.pdf",
      priority: 40,
      size: "compact",
      progress: 0,
    };
    setQueue((current) =>
      [...current.filter((entry) => entry.id !== "upload"), item].sort(
        (a, b) => b.priority - a.priority,
      ),
    );
    let progress = 0;
    const timer = window.setInterval(() => {
      progress += 0.2;
      setQueue((current) =>
        current.map((entry) =>
          entry.id === "upload"
            ? {
                ...entry,
                progress: Math.min(1, progress),
                size: progress >= 1 ? "expanded" : "compact",
                title: progress >= 1 ? "Saved" : "Uploading",
              }
            : entry,
        ),
      );
      if (progress >= 1) window.clearInterval(timer);
    }, 400);
  };

  const record = () => {
    setQueue((current) =>
      [
        ...current.filter((entry) => entry.id !== "record"),
        {
          id: "record",
          title: "Recording",
          detail: "00:12",
          body: "The mic is live.",
          priority: 50,
          size: "compact" as const,
        },
      ].sort((a, b) => b.priority - a.priority),
    );
  };

  const expand = () => {
    if (!head) return;
    const order = ["compact", "expanded", "full"] as const;
    const next =
      order[Math.min(order.indexOf(head.size) + 1, head.body ? 2 : 1)];
    setQueue((current) =>
      current.map((entry, index) =>
        index === 0 ? { ...entry, size: next } : entry,
      ),
    );
  };

  const shell = head ? SIZE[head.size] : null;

  return (
    <Demo>
      <div className={styles.stack}>
        <div
          className={styles.stage}
          style={{
            minHeight: 200,
            display: "grid",
            placeItems: "start center",
          }}
        >
          {head && shell && (
            <motion.button
              type="button"
              layout
              onClick={expand}
              aria-label={`${head.title}. Expand`}
              animate={{
                height: shell.height,
                width: shell.width,
                borderRadius: shell.radius,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 30 }
              }
              style={{
                overflow: "hidden",
                color: "#fafaf9",
                background: "#21201c",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 16,
                textAlign: head.size === "compact" ? "center" : "left",
                maxWidth: "100%",
              }}
            >
              <span>{head.title}</span>
              {head.size !== "compact" && head.detail && (
                <span>{head.detail}</span>
              )}
              {head.size === "full" && head.body && <span>{head.body}</span>}
              {head.progress !== undefined && head.title === "Uploading" && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 3,
                    transformOrigin: "left",
                    scale: `${head.progress} 1`,
                    background: "#8ec5ff",
                  }}
                />
              )}
            </motion.button>
          )}
        </div>
        <div className={styles.row}>
          <button type="button" className={styles.button} onClick={upload}>
            Start Upload
          </button>
          <button type="button" className={styles.button} onClick={record}>
            Record
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={expand}
            disabled={!head}
          >
            Expand
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => setQueue((current) => current.slice(1))}
            disabled={!head}
          >
            Dismiss
          </button>
        </div>
        <p className="sr-only" role="status">
          {status}
        </p>
      </div>
    </Demo>
  );
}
