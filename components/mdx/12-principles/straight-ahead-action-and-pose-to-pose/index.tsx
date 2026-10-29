"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { IconCheck, IconChevronDown } from "@/components/icons";
import styles from "./styles.module.css";

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Carrot", value: "carrot" },
];

export function Select({ animation = "straight-ahead" }) {
  return (
    <BaseSelect.Root items={items} defaultValue={items[0].value}>
      <BaseSelect.Trigger className={styles.trigger}>
        <BaseSelect.Value className={styles.value} />
        <BaseSelect.Icon>
          <IconChevronDown size={15} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal data-light>
        <BaseSelect.Positioner
          alignItemWithTrigger={false}
          sideOffset={8}
          className={styles.positioner}
        >
          <BaseSelect.Popup className={styles.popup} data-animation={animation}>
            {items.map((item) => (
              <BaseSelect.Item
                key={item.value}
                value={item.value}
                className={styles.item}
              >
                <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator>
                  <IconCheck size={15} />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

export function StraightAheadActionAndPoseToPose() {
  return (
    <div className={styles.container}>
      <div className={styles.select} data-caption="Straight Ahead">
        <Select />
      </div>
      <svg
        viewBox="0 0 4 200"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.divider}
      >
        <title>Divider</title>
        <line
          x1="2"
          y1="2"
          x2="2"
          y2="200"
          stroke="var(--border-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
        />
      </svg>
      <div
        className={styles.select}
        data-caption="Pose to Pose"
        data-animation="pose-to-pose"
      >
        <Select animation="pose-to-pose" />
      </div>
      <svg
        viewBox="0 0 4 200"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.divider}
      >
        <title>Divider</title>
        <line
          x1="2"
          y1="2"
          x2="2"
          y2="200"
          stroke="var(--border-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
        />
      </svg>
      <div
        className={styles.select}
        data-caption="Blending Both"
        data-animation="blend"
      >
        <Select animation="blend" />
      </div>
    </div>
  );
}
