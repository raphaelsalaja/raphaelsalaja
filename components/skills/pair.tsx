import type { ReactNode } from "react";
import { Demo } from "@/components/demo";
import styles from "./styles.module.css";

interface PairProps {
  before: ReactNode;
  after: ReactNode;
  notes: [before: string, after: string];
}

export function Pair({ before, after, notes }: PairProps) {
  return (
    <Demo>
      <div className={styles.pair}>
        <figure className={styles.side}>
          <div className={styles.stage}>{before}</div>
          <figcaption className={styles.caption}>
            <span className={styles.label}>Before</span>
            <span>{notes[0]}</span>
          </figcaption>
        </figure>
        <figure className={styles.side}>
          <div className={styles.stage}>{after}</div>
          <figcaption className={styles.caption}>
            <span className={styles.label}>After</span>
            <span>{notes[1]}</span>
          </figcaption>
        </figure>
      </div>
    </Demo>
  );
}
