import Link from "next/link";
import { IconArrowLeft } from "@/components/icons";
import styles from "./styles.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.ghost} aria-hidden="true">
        <svg width="56" height="64" viewBox="0 0 48 56" fill="none">
          <path
            className={styles.body}
            d="M4 24a20 20 0 0 1 40 0v26a5 5 0 0 1-10 0a5 5 0 0 1-10 0a5 5 0 0 1-10 0a5 5 0 0 1-10 0Z"
          />
          <g className={styles.eyes}>
            <ellipse cx="17" cy="25" rx="3" ry="4" />
            <ellipse cx="31" cy="25" rx="3" ry="4" />
          </g>
          <ellipse className={styles.mouth} cx="24" cy="34" rx="2" ry="2.5" />
          <ellipse className={styles.blush} cx="11" cy="32" rx="3" ry="1.75" />
          <ellipse className={styles.blush} cx="37" cy="32" rx="3" ry="1.75" />
        </svg>
        <span className={styles.shadow} />
      </div>
      <div className={styles.text}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.copy}>This page doesn't exist or has moved.</p>
      </div>
      <Link href="/" className={styles.button}>
        <IconArrowLeft size={18} />
        Back
      </Link>
    </div>
  );
}
