import type { ReactNode } from "react";
import styles from "./styles.module.css";

export function Showcase({
  children,
  code,
}: {
  children: ReactNode;
  code: ReactNode;
}) {
  return (
    <div className={styles.showcase} data-showcase>
      <div className={styles.panel}>{children}</div>
      {code}
    </div>
  );
}
