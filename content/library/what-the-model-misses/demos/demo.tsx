"use client";

import { useState } from "react";
import { Segmented } from "@/components/writing/segmented";
import styles from "./demo.module.css";

const versions = ["First result", "After the pass"] as const;

type Version = (typeof versions)[number];

const copy = {
  "First result": {
    title: "Unlock Powerful Insights",
    body: "Seamlessly transform your workflow with AI-powered analytics that drive real results.",
    action: "Get Started Now →",
    note: "Gradient, title case, a hover that grows, an entrance on every visit.",
  },
  "After the pass": {
    title: "Weekly report",
    body: "Three reports are ready. The latest covers 20 to 26 October.",
    action: "Open report",
    note: "Same card. One radius, one padding, a sentence that says something.",
  },
} satisfies Record<Version, Record<string, string>>;

export function PassDemo() {
  const [version, setVersion] = useState<Version>("First result");
  const { title, body, action, note } = copy[version];

  return (
    <div className={styles.stage}>
      <div className={styles.card} data-version={version} key={version}>
        <div className={styles.head}>
          <span className={styles.icon} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16">
              {version === "First result" ? (
                <path d="M8 1.5l1.6 4.9 4.9 1.6-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6z" />
              ) : (
                <path d="M4.5 2.5h4.5l3 3v8h-7.5zM9 2.5v3h3M6.5 9h3.5M6.5 11h2.5" />
              )}
            </svg>
          </span>
          <span className={styles.title}>{title}</span>
        </div>
        <p className={styles.body}>{body}</p>
        <button type="button" className={styles.action}>
          {action}
        </button>
      </div>
      <div className={styles.controls}>
        <Segmented
          label="Version"
          options={versions}
          value={version}
          onChange={setVersion}
        />
        <p className={styles.note}>{note}</p>
      </div>
    </div>
  );
}
