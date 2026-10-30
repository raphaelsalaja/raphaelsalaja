"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowLeft } from "@/components/icons";
import styles from "./styles.module.css";

export function Back() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link href="/" className={styles.back}>
      <IconArrowLeft size={14} />
      Back
    </Link>
  );
}
