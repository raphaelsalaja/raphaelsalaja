import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface SectionProps {
  id: string;
  title: string;
  link?: { href: string; label: string };
  children: ReactNode;
}

export function Section({ id, title, link, children }: SectionProps) {
  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.header}>
        <h2 id={`${id}-heading`} className={styles.title}>
          {title}
        </h2>
        {link && (
          <Link href={link.href} className={styles.link}>
            {link.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
