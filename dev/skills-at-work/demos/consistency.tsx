"use client";

import { type ReactNode, useState } from "react";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";

type Grade = "Observed" | "Inferred" | "DOM-confirmed";

type Finding = {
  number: number;
  text: string;
  grade: Grade;
  rule: string;
};

type Metric = { height: number; radius: number };

const FAMILY = { height: 32, radius: 8 };
const SLACK = 1;

function read(node: HTMLElement): Metric {
  const box = node.getBoundingClientRect();
  const style = getComputedStyle(node);
  return {
    height: Math.round(box.height),
    radius: Math.round(Number.parseFloat(style.borderTopLeftRadius) || 0),
  };
}

function apart(left: number, right: number) {
  return Math.abs(left - right) > SLACK;
}

export function ConsistencyDemo() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [kept, setKept] = useState<string[]>([]);

  const measure = () => {
    const buttons = [
      ...document.querySelectorAll<HTMLElement>("[data-consistency]"),
    ];
    const next: Finding[] = [];
    const preserved: string[] = [];

    for (const variant of ["primary", "ghost"]) {
      const peers = buttons.filter((node) => node.dataset.variant === variant);
      if (peers.length === 0) continue;
      if (variant === "ghost") {
        preserved.push(
          `Ghost stays its own variant (${peers.length} controls). It is not compared with primary.`,
        );
        continue;
      }
      for (const node of peers) {
        const metric = read(node);
        const screen = node.dataset.screen ?? "screen";
        const name = node.textContent?.trim() ?? "Button";
        if (apart(metric.radius, FAMILY.radius)) {
          next.push({
            number: next.length + 1,
            text: `${screen} ${name} radius ${metric.radius}px against the primary family ${FAMILY.radius}px`,
            grade: "DOM-confirmed",
            rule: "consistency-across-screens",
          });
        }
        if (apart(metric.height, FAMILY.height)) {
          next.push({
            number: next.length + 1,
            text: `${screen} ${name} height ${metric.height}px against the primary family ${FAMILY.height}px`,
            grade: "DOM-confirmed",
            rule: "consistency-peer-metric",
          });
        }
      }
    }

    setFindings(next);
    setKept(preserved);
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div className={styles.row} style={{ alignItems: "stretch" }}>
          <Screen name="Library">
            <Peer screen="Library" variant="primary">
              Save
            </Peer>
            <Peer screen="Library" variant="primary">
              Share
            </Peer>
            <Peer screen="Library" variant="ghost">
              Cancel
            </Peer>
          </Screen>
          <Screen name="Settings">
            <Peer screen="Settings" variant="primary">
              Save
            </Peer>
            <Peer screen="Settings" variant="primary" radius={12}>
              Publish
            </Peer>
            <Peer screen="Settings" variant="ghost">
              Cancel
            </Peer>
          </Screen>
        </div>
        <button type="button" className={styles.button} onClick={measure}>
          Measure Peers
        </button>
        {findings.length > 0 && (
          <div className={styles.report} role="status">
            {findings.map((finding) => (
              <p key={finding.rule + finding.text}>
                {finding.number}. {finding.text}. [{finding.grade}]{" "}
                <span className={styles.muted}>{finding.rule}</span>
              </p>
            ))}
            {kept.map((line) => (
              <p key={line} className={styles.note}>
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </Demo>
  );
}

function Screen({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className={styles.stage} style={{ width: "min(100%, 220px)" }}>
      <p>{name}</p>
      <div className={styles.row}>{children}</div>
    </div>
  );
}

function Peer({
  screen,
  variant,
  radius,
  children,
}: {
  screen: string;
  variant: "primary" | "ghost";
  radius?: number;
  children: string;
}) {
  const ghost = variant === "ghost";
  return (
    <button
      type="button"
      className={styles.choice}
      data-consistency=""
      data-screen={screen}
      data-variant={variant}
      style={{
        height: ghost ? 28 : 32,
        minHeight: ghost ? 28 : 32,
        borderRadius: radius ?? (ghost ? 6 : 8),
        background: ghost ? "transparent" : undefined,
      }}
    >
      {children}
    </button>
  );
}
