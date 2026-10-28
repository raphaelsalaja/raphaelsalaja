import Link from "next/link";
import { Section } from "@/components/section";
import { type Post, posts } from "@/data/library";
import { formatDate } from "@/lib/site";
import styles from "./styles.module.css";

export function PostList({ items }: { items: Post[] }) {
  return (
    <ul className={styles.list}>
      {items.map((post) => (
        <li key={post.slug}>
          <Link href={`/library/${post.slug}`} className={styles.row}>
            <span className={styles.title}>{post.title}</span>
            <time dateTime={post.date} className={styles.date}>
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
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
