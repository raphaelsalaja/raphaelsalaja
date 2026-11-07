"use client";

import { useEffect, useState } from "react";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

type Person = { name: string; role: string; amount: number; initials: string };

type View = {
  people: Person[];
  total: number;
  message: string | null;
  chart: number;
  toast: string | null;
};

const PLACEHOLDER: View = {
  people: [
    { name: "John Doe", role: "User 1", amount: 400, initials: "JD" },
    { name: "User 2", role: "test", amount: 300, initials: "U2" },
    { name: "foo", role: "Customer", amount: 260, initials: "FO" },
  ],
  total: 1284,
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  chart: 20,
  toast: null,
};

const CAST_PEOPLE: Person[] = [
  { name: "Maya Chen", role: "Support Lead", amount: 420, initials: "MC" },
  { name: "Jonah Adeyemi", role: "Finance", amount: 310, initials: "JA" },
  { name: "Priya Shah", role: "Design", amount: 230, initials: "PS" },
];

function hue(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 33 + char.charCodeAt(0)) % 360;
  return hash;
}

function Desk({ view }: { view: View }) {
  return (
    <div className={styles.stage} style={{ width: "min(100%, 420px)" }}>
      <div className={styles.row} style={{ justifyContent: "space-between" }}>
        <strong>Open invoices</strong>
        <span>{view.total}</span>
      </div>
      {view.people.map((person) => (
        <div
          key={person.name}
          className={styles.row}
          style={{ justifyContent: "space-between" }}
        >
          <span className={styles.row}>
            <span
              aria-hidden="true"
              style={{
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 28,
                borderRadius: 999,
                color: "#111",
                background: `oklch(0.8 0.08 ${hue(person.name)})`,
                fontSize: 11,
              }}
            >
              {person.initials}
            </span>
            <span>
              {person.name}
              <span className={styles.muted}> {person.role}</span>
            </span>
          </span>
          <span>{person.amount}</span>
        </div>
      ))}
      <div
        aria-hidden="true"
        style={{ height: 28, display: "flex", alignItems: "flex-end", gap: 4 }}
      >
        {[
          ["past", 12],
          ["mid", 18],
          ["late", 14],
          ["now", view.chart],
        ].map(([name, bar]) => (
          <span
            key={name}
            style={{
              width: 10,
              height: bar,
              background: "var(--text-tertiary)",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
      {view.message && <p>{view.message}</p>}
      {view.toast && <p role="status">{view.toast}</p>}
    </div>
  );
}

export function CastDemo() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"Placeholder" | "Cast">("Placeholder");
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (mode !== "Cast") return;
    if (reduced) {
      setBeat(3);
      return;
    }
    setBeat(0);
    const timers = [1200, 3600, 6000].map((delay, index) =>
      window.setTimeout(() => setBeat(index + 1), delay),
    );
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [mode, reduced]);

  const cast: View = {
    people: CAST_PEOPLE,
    total: CAST_PEOPLE.reduce((sum, person) => sum + person.amount, 0),
    message:
      beat >= 1
        ? "The renewal landed. I moved the invoice to Friday."
        : "Thread opened 3 days ago.",
    chart: beat >= 2 ? 32 : 16,
    toast: beat >= 3 ? "Maya Chen replied" : null,
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <Desk view={mode === "Cast" ? cast : PLACEHOLDER} />
        <Controls>
          <Control
            label="Data"
            options={["Placeholder", "Cast"]}
            value={mode}
            onChange={setMode}
          />
        </Controls>
      </div>
    </Demo>
  );
}
