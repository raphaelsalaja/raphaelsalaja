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
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/">Projects</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/">Experiments</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/">Insights</Link>
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
    </footer>
  );
}
