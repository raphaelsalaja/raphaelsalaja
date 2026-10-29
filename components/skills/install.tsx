"use client";

import clsx from "clsx";
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
    <div className={styles.command}>
      <code>
        <span className={styles.sigil} aria-hidden="true">
          $
        </span>
        npx skills add <span className={styles.repo}>{SKILLS_REPO}</span>
      </code>
      <div className={styles.actions}>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            className={styles.action}
          >
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
        <CopyButton
          label="Copy"
          showLabel
          className={clsx(styles.action, styles.copy)}
          getText={() => SKILLS_INSTALL}
        />
      </div>
    </div>
  );
}
