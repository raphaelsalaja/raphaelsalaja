import type { ComponentType } from "react";
import { KanbanExample } from "./kanban";
import { PickerExample } from "./picker";
import { SegmentedExample } from "./segmented";
import styles from "./styles.module.css";
import { ToastExample } from "./toast";
import { WalletExample } from "./wallet";

type Size = "big" | "wide";

const EXAMPLES: { label: string; Example: ComponentType; size: Size }[] = [
  { label: "Kanban", Example: KanbanExample, size: "big" },
  { label: "Time Picker", Example: PickerExample, size: "big" },
  { label: "Wallet", Example: WalletExample, size: "big" },
  { label: "Segmented Control", Example: SegmentedExample, size: "wide" },
  { label: "Toast", Example: ToastExample, size: "wide" },
];

export function Examples() {
  return (
    <section className={styles.bento} aria-label="Examples">
      {EXAMPLES.map(({ label, Example, size }) => (
        <figure
          key={label}
          className={styles.tile}
          data-size={size}
          aria-label={label}
        >
          <Example />
        </figure>
      ))}
    </section>
  );
}
