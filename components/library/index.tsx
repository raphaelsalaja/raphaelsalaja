import Link from "next/link";
import { posts } from "@/data/library";
import { formatDate } from "@/lib/site";
import styles from "./styles.module.css";

export function Library() {
  return (
    <section className={styles.library} aria-labelledby="library-heading">
      <h2 id="library-heading" className={styles.heading}>
        Library
      </h2>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/library/${post.slug}`} className={styles.row}>
              <span className={styles.title}>{post.title}</span>
              <span className={styles.meta}>{post.category}</span>
              <time dateTime={post.date} className={styles.date}>
                {formatDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
