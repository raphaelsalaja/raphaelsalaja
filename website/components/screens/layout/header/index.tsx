"use client";

import { Menu } from "@base-ui-components/react/menu";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.heading}>
      div
      <div className={styles.logo} />
      <div className={styles.socials}>
        <Menu.Root>
          <Menu.Trigger className={styles.Button}>Connect</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className={styles.Positioner} sideOffset={8}>
              <Menu.Popup className={styles.Popup}>
                <Menu.Item className={styles.Item}>Add to Library</Menu.Item>
                <Menu.Item className={styles.Item}>Add to Playlist</Menu.Item>
                <Menu.Separator className={styles.Separator} />
                <Menu.Item className={styles.Item}>Play Next</Menu.Item>
                <Menu.Item className={styles.Item}>Play Last</Menu.Item>
                <Menu.Separator className={styles.Separator} />
                <Menu.Item className={styles.Item}>Favorite</Menu.Item>
                <Menu.Item className={styles.Item}>Share</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </header>
  );
}
