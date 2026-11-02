"use client";

import { Drawer } from "@base-ui/react/drawer";
import { useMotionBlur } from "@web-kits/motion-blur/react";
import styles from "./drawer.module.css";
import type { ExampleProps } from "./index";
import shared from "./styles.module.css";

const ROWS = ["Copy Link", "Messages", "Mail"];

export function DrawerExample({
  blur,
  options,
  step,
  container,
}: ExampleProps) {
  const motion = useMotionBlur(options);
  const open = step % 3 !== 2;

  return (
    <Drawer.Root open={open} modal={false}>
      <span className={shared.trigger}>Share</span>
      <Drawer.Portal container={container} className={shared.portal}>
        <Drawer.Backdrop className={styles.backdrop} />
        <Drawer.Viewport className={styles.viewport}>
          <Drawer.Popup
            ref={blur ? motion.ref : undefined}
            className={styles.popup}
            initialFocus={false}
            finalFocus={false}
          >
            <div className={`${shared.surface} ${styles.surface}`}>
              <span className={styles.handle} />
              <Drawer.Content className={styles.content}>
                <Drawer.Title className={shared.title}>Share</Drawer.Title>
                <Drawer.Description className={shared.text}>
                  Anyone with the link can view.
                </Drawer.Description>
                <div className={styles.rows}>
                  {ROWS.map((row) => (
                    <span key={row} className={shared.item}>
                      {row}
                    </span>
                  ))}
                </div>
              </Drawer.Content>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
