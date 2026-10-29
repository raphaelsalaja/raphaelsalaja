"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { Demo } from "@/components/demo";
import { IconCheck } from "@/components/icons";
import styles from "./pair.module.css";

type Side = "before" | "after";

const SIDES: Side[] = ["before", "after"];
const LABELS: Record<Side, string> = { before: "Before", after: "After" };

const ShownContext = createContext(true);

export function useShown() {
  return useContext(ShownContext);
}

interface PairProps {
  ask?: ReactNode;
  before: ReactNode;
  after: ReactNode;
  notes: [before: string, after: string];
}

export function Pair({ ask, before, after, notes }: PairProps) {
  const [side, setSide] = useState<Side>("before");

  return (
    <Demo light={false}>
      <div className={styles.pair}>
        <div className={styles.stage}>
          {ask && <p className={styles.ask}>{ask}</p>}
          <div className={styles.views}>
            {SIDES.map((key) => (
              <ShownContext.Provider key={key} value={side === key}>
                <div
                  className={styles.view}
                  data-active={side === key || undefined}
                  inert={side !== key}
                >
                  {key === "before" ? before : after}
                </div>
              </ShownContext.Provider>
            ))}
          </div>
        </div>
        <div className={styles.toolbar}>
          <p className={styles.note} aria-live="polite">
            <span className={styles.mark} data-side={side}>
              {side === "after" ? <IconCheck size={12} /> : <Cross />}
            </span>
            {side === "before" ? notes[0] : notes[1]}
          </p>
          <div className={styles.switch}>
            {SIDES.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={side === key}
                className={styles.option}
                onClick={() => setSide(key)}
              >
                {LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Demo>
  );
}

function Cross() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M3.5 3.5l5 5m0-5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
