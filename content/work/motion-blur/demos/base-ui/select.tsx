"use client";

import { Select } from "@base-ui/react/select";
import { useMotionBlur } from "@web-kits/motion-blur/react";
import type { ExampleProps } from "./index";
import { Chevron } from "./menu";
import styles from "./select.module.css";
import shared from "./styles.module.css";

const ITEMS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export function SelectExample({ blur, step, container }: ExampleProps) {
  const motion = useMotionBlur();
  const open = step % 3 === 0;
  const value = ITEMS[Math.floor((step + 2) / 3) % ITEMS.length].value;

  return (
    <Select.Root items={ITEMS} value={value} open={open} modal={false}>
      <Select.Trigger className={`${shared.trigger} ${styles.trigger}`}>
        <Select.Value />
        <Select.Icon className={styles.icon}>
          <Chevron />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal container={container}>
        <Select.Positioner sideOffset={6} alignItemWithTrigger={false}>
          <Select.Popup
            ref={blur ? motion.ref : undefined}
            className={styles.popup}
            finalFocus={false}
          >
            <Select.List className={`${shared.surface} ${styles.surface}`}>
              {ITEMS.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className={`${shared.item} ${styles.item}`}
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.check}>
                    <Check />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.5L5 9L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
