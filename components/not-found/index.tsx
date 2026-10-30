import Link from "next/link";
import { IconArrowLeft } from "@/components/icons";
import styles from "./styles.module.css";

export function NotFound() {
  return (
    <div className={styles.container} data-not-found>
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
