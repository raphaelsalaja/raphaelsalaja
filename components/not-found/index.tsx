import Link from "next/link";
import styles from "./styles.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.window} aria-hidden="true">
        <svg width="52" height="28" viewBox="0 0 52 28" fill="none">
          <path
            d="M3.25 28a22.75 22.75 0 0 1 45.5 0"
            stroke="currentColor"
            strokeWidth="6.5"
          />
          <circle cx="19.3" cy="23.5" r="5.1" fill="currentColor" />
          <circle cx="32.7" cy="23.5" r="5.1" fill="currentColor" />
        </svg>
      </div>
      <div className={styles.text}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.copy}>This page doesn't exist or has moved.</p>
      </div>
      <Link href="/" className={styles.button}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16 10H4m5-5-5 5 5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </Link>
    </div>
  );
}
