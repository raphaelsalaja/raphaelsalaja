import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { IconChevronRight } from "@/components/icons";
import styles from "./styles.module.css";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={clsx(styles.breadcrumb, className)}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <li aria-hidden="true" className={styles.separator}>
                <IconChevronRight size={14} />
              </li>
            )}
            <li>
              {item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
