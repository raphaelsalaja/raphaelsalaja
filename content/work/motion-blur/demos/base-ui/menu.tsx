"use client";

import { Menu } from "@base-ui/react/menu";
import { useMotionBlur } from "@web-kits/motion-blur/react";
import type { ExampleProps } from "./index";
import styles from "./menu.module.css";
import shared from "./styles.module.css";

const ITEMS = ["Rename", "Duplicate", "Move To", "Archive", "Delete"];

export function MenuExample({ blur, options, step, container }: ExampleProps) {
  const motion = useMotionBlur(options);
  const open = step % 2 === 0;

  return (
    <Menu.Root open={open} modal={false}>
      <Menu.Trigger className={shared.trigger}>
        Options
        <Chevron />
      </Menu.Trigger>
      <Menu.Portal container={container}>
        <Menu.Positioner sideOffset={6} align="center">
          <Menu.Popup
            ref={blur ? motion.ref : undefined}
            className={styles.popup}
            finalFocus={false}
          >
            <div className={`${shared.surface} ${styles.surface}`}>
              {ITEMS.map((item) => (
                <Menu.Item key={item} className={shared.item}>
                  {item}
                </Menu.Item>
              ))}
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function Chevron() {
  return (
    <svg
      className={shared.chevron}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
