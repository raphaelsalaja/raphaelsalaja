"use client";

import { CopyButton } from "@/components/copy-button";
import styles from "./styles.module.css";

export function Prompts({ examples }: { examples: string[] }) {
  return (
    <ul className={styles.prompts} aria-label="Example prompts">
      {examples.map((example) => (
        <li key={example} className={styles.prompt}>
          <span>{example}</span>
          <CopyButton
            label="Copy Prompt"
            className={styles.copy}
            getText={() => example}
          />
        </li>
      ))}
    </ul>
  );
}
