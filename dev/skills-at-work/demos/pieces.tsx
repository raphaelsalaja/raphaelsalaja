"use client";

import { useState } from "react";
import { BotPile } from "@/components/bots/pile";
import { Mascot } from "@/components/coffee/mascot";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import { IconDots } from "@/components/icons";
import { Deconstruct } from "@/components/skills/demos/deconstruct";
import styles from "../styles.module.css";

const LAYOUTS = ["Inline", "Sidebar", "Command Bar"] as const;
type Layout = (typeof LAYOUTS)[number];

export function PrototypeDemo() {
  const [layout, setLayout] = useState<Layout>("Sidebar");
  const [picked, setPicked] = useState<Layout | null>(null);

  return (
    <Demo>
      <div className={styles.stack}>
        <div
          className={styles.stage}
          data-layout={layout}
          style={{
            display: "grid",
            gridTemplateColumns: layout === "Sidebar" ? "96px 1fr" : "1fr",
            gap: 12,
            minHeight: 120,
          }}
        >
          {layout === "Sidebar" && (
            <div>
              <input aria-label="Search" placeholder="Search" />
            </div>
          )}
          <div>
            {layout === "Inline" && (
              <input aria-label="Search" placeholder="Search" />
            )}
            <p>Results stay in the page.</p>
            {layout === "Command Bar" && (
              <div className={styles.report}>
                <p>Search</p>
                <p>Library</p>
              </div>
            )}
          </div>
        </div>
        <Controls>
          <Control
            label="Layout"
            options={LAYOUTS}
            value={layout}
            onChange={setLayout}
          />
        </Controls>
        <button
          type="button"
          className={styles.button}
          onClick={() => setPicked(layout)}
        >
          Pick {layout}
        </button>
        <p role="status" className={styles.note}>
          {picked
            ? `Picked ${picked}. The other two would be deleted.`
            : "Nothing picked yet."}
        </p>
      </div>
    </Demo>
  );
}

export function LabDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <Demo>
      <div className={styles.stack}>
        <div className={styles.row}>
          <span className={styles.field}>
            Rest
            <button type="button" className={styles.button}>
              Save
            </button>
          </span>
          <span className={styles.field}>
            Focus
            <button type="button" className={styles.button}>
              Save
            </button>
          </span>
          <span className={styles.field}>
            Disabled
            <button type="button" className={styles.button} disabled>
              Save
            </button>
          </span>
          <span className={styles.field}>
            Loading
            <button
              type="button"
              className={styles.button}
              aria-busy={busy}
              onClick={() => setBusy(true)}
            >
              {busy ? <IconDots size={14} /> : "Save"}
              {busy && <span className="sr-only">Saving</span>}
            </button>
          </span>
        </div>
        <p className={styles.note}>
          Hover and press the resting button. Focus is a real stop. Disabled
          does not take a click.
        </p>
      </div>
    </Demo>
  );
}

export function AvatarDemo() {
  return (
    <Demo>
      <div className={styles.stack}>
        <Mascot />
        <p className={styles.note}>
          Move the pointer. The body follows, and the eyes blink.
        </p>
      </div>
    </Demo>
  );
}

export function DeconstructDemo() {
  return (
    <Demo wide>
      <Deconstruct />
    </Demo>
  );
}

export function BotsDemo() {
  return (
    <Demo>
      <BotPile />
    </Demo>
  );
}
