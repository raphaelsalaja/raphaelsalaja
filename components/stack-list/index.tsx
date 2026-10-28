import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

export type StackListItem = {
  href: string;
  title: string;
  description?: string;
  icon?: string;
  iconMonochrome?: boolean;
  meta?: string;
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
            {item.icon && (
              <span
                className={styles.icon}
                data-monochrome={item.iconMonochrome || undefined}
              >
                {/* biome-ignore lint/performance/noImgElement: small static logos don't need optimisation */}
                <img src={item.icon} alt="" width={20} height={20} />
              </span>
            )}
            <span className={styles.title}>{item.title}</span>
            {item.description && (
              <span className={styles.description}>{item.description}</span>
            )}
            {item.meta && <span className={styles.meta}>{item.meta}</span>}
          </Row>
        </li>
      ))}
    </ul>
  );
}
