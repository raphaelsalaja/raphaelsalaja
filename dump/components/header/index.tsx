import type React from "react";
import { Arrow, Chevron, Clock, Divider, Dots } from "../icons";
import styles from "./styles.module.css";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.trailing}>
        <div className={styles.navigation}>
          <Arrow size={16} />
          <Arrow size={16} direction={180} />
          <Clock size={16} />
        </div>
        <Divider size={16} />
        <div className={styles.breadcrumbs}>
          <span>Activities</span>
          <Chevron size={16} direction={180} />
          <span>New Activity</span>
        </div>
      </div>
      <div className={styles.leading}>
        <div>
          <Dots size={16} />
        </div>
      </div>
    </div>
  );
};
