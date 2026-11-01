"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import styles from "./styles.module.css";

export function Back() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link href="/" className={styles.back}>
      <span className={styles.name}>{SITE_NAME}</span>
      <span className={styles.role}>{SITE_DESCRIPTION}</span>
    </Link>
  );
}
