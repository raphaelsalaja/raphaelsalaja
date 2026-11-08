"use client";

import { Tabs } from "@base-ui/react/tabs";
import clsx from "clsx";
import { useSyncExternalStore } from "react";
import codeBlock from "@/components/code-block/styles.module.css";
import { Highlighted } from "@/components/code-block/tokens";
import { CopyButton } from "@/components/copy-button";
import styles from "./styles.module.css";

const MANAGERS = {
  npm: "install",
  pnpm: "add",
  yarn: "add",
  bun: "add",
} as const;

type Manager = keyof typeof MANAGERS;

const KEY = "package-manager";

// Every install block on the site follows the last manager picked.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function read(): Manager {
  const stored = localStorage.getItem(KEY);
  return stored && stored in MANAGERS ? (stored as Manager) : "npm";
}

function pick(manager: Manager) {
  localStorage.setItem(KEY, manager);
  for (const listener of listeners) listener();
}

export function Install({ package: name }: { package: string }) {
  const manager = useSyncExternalStore(subscribe, read, () => "npm" as const);
  const command = (to: Manager) => `${to} ${MANAGERS[to]} ${name}`;

  return (
    <Tabs.Root
      value={manager}
      onValueChange={(next) => pick(next as Manager)}
      className={clsx(codeBlock.block, styles.root)}
      data-code-block
    >
      <div className={codeBlock.header}>
        <Tabs.List className={styles.list} aria-label="Package Manager">
          {Object.keys(MANAGERS).map((option) => (
            <Tabs.Tab key={option} value={option} className={styles.tab}>
              {option}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <CopyButton
          label="Copy Command"
          className={codeBlock.copy}
          getText={() => command(manager)}
        />
      </div>
      {(Object.keys(MANAGERS) as Manager[]).map((option) => (
        <Tabs.Panel key={option} value={option} className={styles.panel}>
          <Highlighted
            lines={[
              [
                [option, "function"],
                [` ${MANAGERS[option]}`, "string"],
                [` ${name}`, "string"],
              ],
            ]}
          />
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
