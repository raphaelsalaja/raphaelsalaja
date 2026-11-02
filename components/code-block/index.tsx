"use client";

import { type ComponentProps, useRef } from "react";
import { CopyButton } from "@/components/copy-button";
import { IconFileContent } from "@/components/icons";
import styles from "./styles.module.css";

type CodeBlockProps = ComponentProps<"pre"> & {
  "data-title"?: string;
  "data-language"?: string;
};

export function CodeBlock({
  "data-title": title,
  "data-language": language,
  ...props
}: CodeBlockProps) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <IconFileContent size={14} className={styles.icon} />
        <span className={styles.title}>{title ?? language}</span>
        <CopyButton
          label="Copy code"
          className={styles.copy}
          getText={() => ref.current?.querySelector("code")?.textContent ?? ""}
        />
      </div>
      <pre ref={ref} {...props} />
    </div>
  );
}
