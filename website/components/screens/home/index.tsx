import { Posts } from "@/components/posts";

import * as Menu from "@rs/design/menu";
import styles from "./styles.module.scss";
import Button from "@rs/design/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.layout}>
      <div className={styles.heading}>
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
      </div>

      <div className={styles.bio}>
        <div className={styles.name}>
          <h1>Raphael Salaja</h1>
          <span>—</span>
          <h1>Design Engineer</h1>
        </div>
        <div className={styles.about}>
          <p>
            I’m someone who loves mixing different influences, genres and styles
            to create unique, innovative work. I enjoy pushing boundaries and
            exploring new ways to express myself without limitations.
          </p>
        </div>
      </div>

      <Posts category="projects" />
      <Posts category="engineering" />
      <Posts category="design-system" />

      <div className={styles.footer}>
        <div className={styles.copyright}>
          <p className={styles.legal}>© 2025 Raphael Salaja</p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h1>About</h1>
            <Button asChild variant="ghost">
              <Link href="/">Projects</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Scrapbook</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Engineering</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Archive</Link>
            </Button>
          </div>
          <div className={styles.column}>
            <h1>Connect</h1>
            <Button asChild variant="ghost">
              <Link href="/">Twitter</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">GitHub</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Zora</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Email</Link>
            </Button>
          </div>
          <div className={styles.column}>
            <h1>Website</h1>
            <Button asChild variant="ghost">
              <Link href="/">Colophon</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Source</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
