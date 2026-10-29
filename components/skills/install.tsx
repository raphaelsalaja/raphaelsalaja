"use client";

import { CopyButton } from "@/components/copy-button";
import { SKILLS_DIRECTORY, SKILLS_GITHUB, SKILLS_INSTALL } from "@/data/skills";
import styles from "./styles.module.css";

export function Install() {
  return (
    <div className={styles.install}>
      <div className={styles.command}>
        <span>{SKILLS_INSTALL}</span>
        <CopyButton label="Copy Command" getText={() => SKILLS_INSTALL} />
      </div>
      <a
        href={SKILLS_GITHUB}
        target="_blank"
        rel="noopener"
        className={styles.link}
      >
        GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        href={SKILLS_DIRECTORY}
        target="_blank"
        rel="noopener"
        className={styles.link}
      >
        skills.sh
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
