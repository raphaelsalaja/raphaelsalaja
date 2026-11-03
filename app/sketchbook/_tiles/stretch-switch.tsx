"use client";

import { Switch } from "@base-ui/react/switch";
import styles from "./stretch-switch.module.css";

export function StretchSwitch() {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders the switch button inside the label
    <label className={styles.field}>
      <Switch.Root className={styles.root} defaultChecked>
        <Switch.Thumb className={styles.thumb} />
      </Switch.Root>
      Sound Effects
    </label>
  );
}
