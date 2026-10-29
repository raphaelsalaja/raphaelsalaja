"use client";

import { CopyButton } from "@/components/copy-button";
import { SKILLS_DIRECTORY, SKILLS_GITHUB, SKILLS_INSTALL } from "@/data/skills";
import styles from "./styles.module.css";

const LINKS = [
  { label: "GitHub", href: SKILLS_GITHUB },
  { label: "skills.sh", href: SKILLS_DIRECTORY },
];

export function Install() {
  return (
    <div className={styles.install}>
      <CopyButton
        label={SKILLS_INSTALL}
        showLabel
        className={styles.command}
        getText={() => SKILLS_INSTALL}
      />
      <div className={styles.links}>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            className={styles.link}
          >
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </div>
  );
}
