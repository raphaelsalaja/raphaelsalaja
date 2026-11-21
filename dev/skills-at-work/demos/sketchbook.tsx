"use client";

import { useState } from "react";
import { Demo } from "@/components/demo";
import { useReducedMotion } from "../use-reduced-motion";
import styles from "./sketchbook.module.css";

type Choice = "keep" | "kill" | null;

const TILES = [
  { name: "Soft Press", gesture: "press", model: "scale 0.96 on press" },
  { name: "Hover Lift", gesture: "hover", model: "translateY -4px" },
  { name: "Weight", gesture: "toggle", model: "400 to 600" },
  { name: "Rule Draw", gesture: "hover", model: "scaleX 0 to 1" },
  { name: "Drag Dot", gesture: "drag", model: "x follows the pointer" },
  { name: "Step", gesture: "press", model: "count + 1" },
] as const;

export function SketchbookDemo() {
  const reduced = useReducedMotion();
  const [choices, setChoices] = useState<Record<string, Choice>>({});
  const kept = TILES.filter((tile) => choices[tile.name] === "keep").map(
    (tile) => tile.name,
  );
  const killed = TILES.filter((tile) => choices[tile.name] === "kill").map(
    (tile) => tile.name,
  );

  return (
    <Demo variant="transparent" wide>
      <div className={styles.page} data-reduced={reduced || undefined}>
        <p className={styles.hint}>Tap an interaction to try it</p>
        <div className={styles.grid}>
          {TILES.map((tile) => (
            <Tile
              key={tile.name}
              name={tile.name}
              gesture={tile.gesture}
              model={tile.model}
              choice={choices[tile.name] ?? null}
              reduced={reduced}
              onChoice={(choice) =>
                setChoices((current) => ({ ...current, [tile.name]: choice }))
              }
            />
          ))}
        </div>
        <p className={styles.summary} role="status">
          Kept {kept.length ? kept.join(", ") : "none"}. Killed{" "}
          {killed.length ? killed.join(", ") : "none"}.
          {kept.length > 0 ? " Next batch leans toward the kept tiles." : ""}
        </p>
      </div>
    </Demo>
  );
}

function Tile({
  name,
  gesture,
  model,
  choice,
  reduced,
  onChoice,
}: {
  name: string;
  gesture: string;
  model: string;
  choice: Choice;
  reduced: boolean;
  onChoice: (choice: Choice) => void;
}) {
  const [readout, setReadout] = useState("idle");
  const [weight, setWeight] = useState(false);
  const [count, setCount] = useState(0);
  const [drag, setDrag] = useState(0);

  const play = (next: string) => setReadout(next);

  return (
    <article className={styles.tile} data-choice={choice ?? undefined}>
      <div
        className={styles.stage}
        onPointerDown={(event) => {
          if (name === "Soft Press") play(reduced ? "scale 1" : "scale 0.96");
          if (name === "Step") {
            const next = count + 1;
            setCount(next);
            play(String(next));
          }
          if (name === "Drag Dot") {
            const rect = event.currentTarget.getBoundingClientRect();
            setDrag(Math.round(event.clientX - rect.left));
            play(`x ${Math.round(event.clientX - rect.left)}`);
          }
        }}
        onPointerMove={(event) => {
          if (name !== "Drag Dot" || event.buttons === 0) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = Math.round(event.clientX - rect.left);
          setDrag(x);
          play(`x ${x}`);
        }}
        onPointerUp={() => {
          if (name === "Soft Press") play("scale 1");
        }}
        onPointerEnter={() => {
          if (name === "Hover Lift") play(reduced ? "y 0" : "y -4");
          if (name === "Rule Draw") play(reduced ? "scaleX 1" : "scaleX 1");
        }}
        onPointerLeave={() => {
          if (
            name === "Hover Lift" ||
            name === "Rule Draw" ||
            name === "Soft Press"
          ) {
            play("idle");
          }
        }}
      >
        {name === "Soft Press" && (
          <button
            type="button"
            className={styles.press}
            onClick={() => play("scale 1")}
          >
            Press
          </button>
        )}
        {name === "Hover Lift" && <span className={styles.lift}>Lift</span>}
        {name === "Weight" && (
          <button
            type="button"
            className={styles.weight}
            aria-pressed={weight}
            data-on={weight || undefined}
            onClick={() => {
              setWeight((value) => !value);
              play(weight ? "400" : "600");
            }}
          >
            Aa
          </button>
        )}
        {name === "Rule Draw" && <span className={styles.rule}>Draw</span>}
        {name === "Drag Dot" && (
          <span className={styles.dot} style={{ left: drag || "50%" }} />
        )}
        {name === "Step" && <span className={styles.step}>{count}</span>}
      </div>
      <div className={styles.chrome}>
        <span className={styles.tileName}>[ {name} ]</span>
        <span className={styles.gesture}>{gesture}</span>
        <span className={styles.model}>{model}</span>
        <span className={styles.readout}>{readout}</span>
        <span className={styles.choices}>
          <button
            type="button"
            aria-pressed={choice === "keep"}
            onClick={() => onChoice(choice === "keep" ? null : "keep")}
          >
            Keep
          </button>
          <button
            type="button"
            aria-pressed={choice === "kill"}
            onClick={() => onChoice(choice === "kill" ? null : "kill")}
          >
            Kill
          </button>
        </span>
      </div>
    </article>
  );
}
