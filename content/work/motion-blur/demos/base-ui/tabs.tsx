"use client";

import { Tabs } from "@base-ui/react/tabs";
import { useMotionBlur } from "@web-kits/motion-blur/react";
import type { ExampleProps } from "./index";
import styles from "./tabs.module.css";

const TABS = ["Day", "Week", "Month", "Year"];

const TARGETS = [0, 3, 1, 3];

export function TabsExample({ blur, step }: ExampleProps) {
  const motion = useMotionBlur();
  const value = TABS[TARGETS[step % TARGETS.length]];

  return (
    <Tabs.Root value={value} className={styles.root}>
      <Tabs.List className={styles.list}>
        {TABS.map((tab) => (
          <Tabs.Tab key={tab} value={tab} className={styles.tab}>
            {tab}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator
          ref={blur ? motion.ref : undefined}
          className={styles.indicator}
          renderBeforeHydration
        >
          <span className={styles.pill} />
        </Tabs.Indicator>
      </Tabs.List>
      {TABS.map((tab) => (
        <Tabs.Panel key={tab} value={tab} className={styles.panel}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
