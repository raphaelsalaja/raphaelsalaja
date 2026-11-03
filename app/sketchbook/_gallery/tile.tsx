"use client";

import { type ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.css";

type Choice = "keep" | "kill";

const KEY = "sketchbook:batch-1";

function read(): Record<string, Choice> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function Tile({
  name,
  note,
  wildcard,
  children,
}: {
  name: string;
  note: string;
  wildcard?: boolean;
  children: ReactNode;
}) {
  const [choice, setChoice] = useState<Choice | null>(null);

  useEffect(() => {
    setChoice(read()[name] ?? null);
  }, [name]);

  const choose = (next: Choice) => {
    const value = choice === next ? null : next;
    const all = read();
    if (value) all[name] = value;
    else delete all[name];
    localStorage.setItem(KEY, JSON.stringify(all));
    setChoice(value);
  };

  return (
    <section className={styles.tile} data-choice={choice ?? undefined}>
      <div className={styles.stage}>{children}</div>
      <div className={styles.meta}>
        <div className={styles.text}>
          <h2 className={styles.name}>
            {name}
            {wildcard && <span className={styles.badge}>Wildcard</span>}
          </h2>
          <p className={styles.note}>{note}</p>
        </div>
        <div className={styles.choices}>
          <button
            type="button"
            className={styles.choice}
            aria-pressed={choice === "keep"}
            onClick={() => choose("keep")}
          >
            Keep
          </button>
          <button
            type="button"
            className={styles.choice}
            aria-pressed={choice === "kill"}
            onClick={() => choose("kill")}
          >
            Kill
          </button>
        </div>
      </div>
    </section>
  );
}
