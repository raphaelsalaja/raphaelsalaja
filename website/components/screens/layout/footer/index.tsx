import Button from "@rs/design/button";
import Link from "next/link";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <p className={styles.legal}>© 2025 Raphael Salaja</p>
      </div>
      <div className={styles.links}>
        <div className={styles.column}>
          <h1>Pages</h1>
          <Button asChild variant="ghost">
            <Link href="/projects">Projects</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/experiments">Experiments</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/insights">Insights</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/archive">Archive</Link>
          </Button>
        </div>
        <div className={styles.column}>
          <h1>Connect</h1>
          <Button asChild variant="ghost">
            <Link href="https://x.com/raphaelsalaja">Twitter</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://github.com/raphaelsalaja">GitHub</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="emailto:raphaelsalaja@gmail.com">Email</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
