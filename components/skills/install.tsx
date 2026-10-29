"use client";

import { CopyButton } from "@/components/copy-button";
import { GitHubLogo, VercelLogo } from "@/components/icons";
import {
  SKILLS_DIRECTORY,
  SKILLS_GITHUB,
  SKILLS_INSTALL,
  SKILLS_REPO,
} from "@/data/skills";
import styles from "./styles.module.css";

const LINKS = [
  { label: "GitHub", href: SKILLS_GITHUB, Logo: GitHubLogo, size: 14 },
  { label: "skills.sh", href: SKILLS_DIRECTORY, Logo: VercelLogo, size: 12 },
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
        {LINKS.map(({ label, href, Logo, size }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={`${label} (opens in a new tab)`}
            className={styles.action}
          >
            <Logo width={size} height={size} />
          </a>
        ))}
        <CopyButton
          label="Copy Command"
          className={styles.action}
          getText={() => SKILLS_INSTALL}
        />
      </div>
    </div>
  );
}
