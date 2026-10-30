"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { type ComponentType, useEffect, useState } from "react";
import {
  GitHubLogo,
  IconCheck,
  IconFileContent,
  IconLink,
  type IconProps,
} from "@/components/icons";
import styles from "./styles.module.css";

export function AgentPrompt({
  text,
  href,
  source,
}: {
  text: string;
  href: string;
  source: string;
}) {
  return (
    <Tooltip.Provider delay={300}>
      <div className={styles.actions}>
        <CopyIconButton
          label="Copy Prompt"
          icon={IconFileContent}
          getText={() => text}
        />
        <CopyIconButton
          label="Copy Link"
          icon={IconLink}
          getText={() => href}
        />
        <Tooltip.Root>
          <Tooltip.Trigger
            className={styles.button}
            aria-label="View Source"
            render={
              <a href={source} target="_blank" rel="noopener noreferrer" />
            }
          >
            <GitHubLogo width={14} height={14} />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup className={styles.tooltip}>
                View Source
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  );
}

function CopyIconButton({
  label,
  icon: Icon,
  getText,
}: {
  label: string;
  icon: ComponentType<IconProps>;
  getText: () => string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <Tooltip.Root>
        <Tooltip.Trigger
          type="button"
          className={styles.button}
          aria-label={label}
          closeOnClick={false}
          onClick={() => {
            navigator.clipboard
              .writeText(getText())
              .then(() => setCopied(true))
              .catch(() => {});
          }}
        >
          <span className={styles.icon} data-copied={copied}>
            <Icon size={15} />
            <IconCheck size={15} />
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup className={styles.tooltip}>
              {copied ? "Copied" : label}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}
