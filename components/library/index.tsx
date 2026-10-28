import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { type Post, posts } from "@/data/library";
import { formatDayMonth, yearOf } from "@/lib/site";
import styles from "./styles.module.css";

const HOME_LIMIT = 6;

export type YearListItem = {
  key: string;
  date: string;
  title: string;
  verb?: string;
  meta?: string;
  href?: string;
};

function Row({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <div className={styles.row}>{children}</div>;

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

export function YearList({ items }: { items: YearListItem[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => {
        const year = yearOf(item.date);
        const firstOfYear =
          index === 0 || yearOf(items[index - 1].date) !== year;
        const content = (
          <>
            <span className={styles.title}>
              {item.verb && <span className={styles.verb}>{item.verb} </span>}
              {item.title}
            </span>
            {item.meta && <span className={styles.meta}>{item.meta}</span>}
            <time dateTime={item.date} className={styles.date}>
              {formatDayMonth(item.date)}
              <span className="sr-only"> {year}</span>
            </time>
          </>
        );

        return (
          <li
            key={item.key}
            className={styles.item}
            data-first-of-year={firstOfYear || undefined}
          >
            <span className={styles.year} aria-hidden="true">
              {firstOfYear && year}
            </span>
            <Row href={item.href}>{content}</Row>
          </li>
        );
      })}
    </ul>
  );
}

const toItem = (post: Post): YearListItem => ({
  key: post.slug,
  date: post.date,
  title: post.title,
  meta: post.category,
  href: `/library/${post.slug}`,
});

export function PostList({ items }: { items: Post[] }) {
  return <YearList items={items.map(toItem)} />;
}

export function Writing() {
  return (
    <Section
      id="writing"
      title="Writing"
      link={{ href: "/library", label: "Index" }}
    >
      <PostList items={posts.slice(0, HOME_LIMIT)} />
    </Section>
  );
}
