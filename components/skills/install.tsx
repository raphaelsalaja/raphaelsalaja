"use client";

import { CopyButton } from "@/components/copy-button";
import {
  SKILLS_DIRECTORY,
  SKILLS_GITHUB,
  SKILLS_INSTALL,
  SKILLS_REPO,
} from "@/data/skills";
import styles from "./styles.module.css";

const LINKS = [
  { label: "GitHub", href: SKILLS_GITHUB },
  { label: "skills.sh", href: SKILLS_DIRECTORY },
];

export function Install() {
  return (
    <div className={styles.install}>
      <div className={styles.command}>
        <code>
          <span className={styles.sigil} aria-hidden="true">
            $
          </span>
          npx skills add <span className={styles.repo}>{SKILLS_REPO}</span>
        </code>
        <CopyButton
          label="Copy"
          showLabel
          className={styles.copy}
          getText={() => SKILLS_INSTALL}
        />
      </div>
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
