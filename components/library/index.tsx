import Link from "next/link";
import { Section } from "@/components/section";
import { type Post, posts } from "@/data/library";
import { formatDayMonth, yearOf } from "@/lib/site";
import styles from "./styles.module.css";

export function PostList({ items }: { items: Post[] }) {
  return (
    <ul className={styles.list}>
      {items.map((post, index) => {
        const year = yearOf(post.date);
        const firstOfYear =
          index === 0 || yearOf(items[index - 1].date) !== year;

        return (
          <li
            key={post.slug}
            className={styles.item}
            data-first-of-year={firstOfYear || undefined}
          >
            <span className={styles.year} aria-hidden="true">
              {firstOfYear && year}
            </span>
            <Link href={`/library/${post.slug}`} className={styles.row}>
              <span className={styles.title}>{post.title}</span>
              <span className={styles.meta}>{post.category}</span>
              <time dateTime={post.date} className={styles.date}>
                {formatDayMonth(post.date)}
                <span className="sr-only"> {year}</span>
              </time>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Writing() {
  return (
    <Section
      id="writing"
      title="Writing"
      link={{ href: "/library", label: "Index" }}
    >
      <PostList items={posts} />
    </Section>
  );
}
