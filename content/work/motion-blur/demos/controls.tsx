import type { ReactNode } from "react";
import { Segmented } from "@/components/writing/segmented";
import styles from "./styles.module.css";

export function Controls({ children }: { children: ReactNode }) {
  return <div className={styles.controls}>{children}</div>;
}

export function Control<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className={styles.control}>
      <span className={styles.controlLabel} aria-hidden>
        {label}
      </span>
      <div className={styles.scroll}>
        <Segmented
          label={label}
          options={options}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
