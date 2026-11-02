"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import { IconCheck } from "@/components/icons";
import styles from "./pair.module.css";

const SIDES = ["Before", "After"] as const;

type Side = (typeof SIDES)[number];

const ShownContext = createContext(true);

export function useShown() {
  return useContext(ShownContext);
}

interface StageProps {
  ask?: ReactNode;
  views: ReactNode[];
  active: number;
}

function Stage({ ask, views, active }: StageProps) {
  return (
    <div className={styles.stage}>
      {ask && <div className={styles.ask}>{ask}</div>}
      <div className={styles.views}>
        {views.map((view, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed set of views
          <ShownContext.Provider key={index} value={index === active}>
            <div
              className={styles.view}
              data-active={index === active || undefined}
              inert={index !== active}
            >
              {view}
            </div>
          </ShownContext.Provider>
        ))}
      </div>
    </div>
  );
}

interface PairProps {
  ask?: ReactNode;
  before: ReactNode;
  after: ReactNode;
  notes: [before: string, after: string];
}

export function Pair({ ask, before, after, notes }: PairProps) {
  const [side, setSide] = useState<Side>("Before");

  return (
    <Demo>
      <div className={styles.pair}>
        <Stage ask={ask} views={[before, after]} active={SIDES.indexOf(side)} />
        <Controls>
          <Control
            label="Version"
            options={SIDES}
            value={side}
            onChange={setSide}
          >
            <span className={styles.note}>
              <span className={styles.mark} data-side={side} aria-hidden="true">
                <span
                  className={styles.glyph}
                  data-active={side === "Before" || undefined}
                >
                  <Cross />
                </span>
                <span
                  className={styles.glyph}
                  data-active={side === "After" || undefined}
                >
                  <IconCheck size={12} strokeWidth={2} />
                </span>
              </span>
              <span className={styles.notes} aria-live="polite">
                {SIDES.map((key, index) => (
                  <span
                    key={key}
                    className={styles.text}
                    data-active={side === key || undefined}
                    aria-hidden={side !== key}
                  >
                    {notes[index]}
                  </span>
                ))}
              </span>
            </span>
          </Control>
        </Controls>
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
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
