"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Check, Copy } from "@/components/icons";
import styles from "./styles.module.css";

interface CopyButtonProps {
  label: string;
  getText: () => string;
  className?: string;
  showLabel?: boolean;
}

export function CopyButton({
  label,
  getText,
  className,
  showLabel = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <button
        type="button"
        className={clsx(styles.button, className)}
        aria-label={showLabel ? undefined : label}
        onClick={() => {
          navigator.clipboard
            .writeText(getText())
            .then(() => setCopied(true))
            .catch(() => {});
        }}
      >
        <span className={styles.icon} data-copied={copied}>
          <Copy width={14} height={14} strokeWidth={1.75} />
          <Check width={15} height={15} />
        </span>
        {showLabel && <span>{copied ? "Copied" : label}</span>}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}
