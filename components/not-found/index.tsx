import Link from "next/link";
import styles from "./styles.module.css";

export function NotFound() {
  return (
    <div className={`${styles.container} prose`}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.copy}>This page doesn't exist or has moved.</p>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </div>
  );
}
