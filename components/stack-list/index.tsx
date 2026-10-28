import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

export type StackListItem = {
  href: string;
  title: string;
  description?: string;
};

function Row({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/library/") || href.startsWith("/work/")) {
    return (
      <Link href={href} className={styles.row}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("/")) {
    return (
      <a href={href} className={styles.row}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener" className={styles.row}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function StackList({ items }: { items: StackListItem[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.href}>
          <Row href={item.href}>
            <span className={styles.title}>{item.title}</span>
            {item.description && (
              <span className={styles.description}>{item.description}</span>
            )}
          </Row>
        </li>
      ))}
    </ul>
  );
}
