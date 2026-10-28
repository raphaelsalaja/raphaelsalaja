"use client";

import { type ComponentProps, useRef } from "react";
import { CopyButton } from "@/components/copy-button";
import styles from "./styles.module.css";

export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className={styles.block}>
      <pre ref={ref} {...props} />
      <CopyButton
        label="Copy code"
        className={styles.copy}
        getText={() => ref.current?.querySelector("code")?.textContent ?? ""}
      />
    </div>
  );
}
