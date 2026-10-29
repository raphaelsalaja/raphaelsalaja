import type { ReactNode } from "react";
import { IconBolt } from "@/components/icons";
import styles from "./alignment.module.css";

const ISSUES = [
  { text: "Title starts 2px right", rule: "alignment-shared-edge" },
  { text: "Icon sits 1px low", rule: "alignment-icon-with-label" },
  { text: "Radius 12px, expected 8px", rule: "alignment-concentric-radius" },
];

function Plan({ measured }: { measured?: boolean }) {
  return (
    <div className={styles.plan} data-measured={measured || undefined}>
      <div className={styles.panel} data-finding="3">
        <span className={styles.guide} />
        <div className={styles.name} data-finding="1">
          Pro Plan
        </div>
        <div className={styles.muted}>Billed yearly, 4 seats</div>
      </div>
      <div className={styles.footer}>
        <span>$96</span>
        <span className={styles.upgrade}>
          <span className={styles.icon} data-finding="2">
            <IconBolt size={14} />
          </span>
          Upgrade
        </span>
      </div>
    </div>
  );
}

export function Glance({ children }: { children: ReactNode }) {
  return (
    <div className={styles.report}>
      <Plan />
      {children}
    </div>
  );
}

export function Alignment() {
  return (
    <div className={styles.report}>
      <Plan measured />
      <div className={styles.findings}>
        {ISSUES.map((issue, index) => (
          <div key={issue.rule} className={styles.finding}>
            <span className={styles.badge}>{index + 1}</span>
            <span className={styles.detail}>
              <span>{issue.text}</span>
              <span className={styles.muted}>{issue.rule}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
