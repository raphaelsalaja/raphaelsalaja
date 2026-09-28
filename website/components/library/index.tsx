import { format, parse } from "date-fns";
import { Link } from "next-view-transitions";
import { getLibraryPages } from "@/lib/fumadocs";
import styles from "./styles.module.css";

interface LibraryProps {
  index?: boolean;
}

const formatPostDate = (value: string) =>
  format(parse(value, "yyyy-MM-dd", new Date()), "dd/MM");

export const Library = ({ index = false }: LibraryProps) => {
  const posts = getLibraryPages();

  return (
    <div className={styles.posts}>
      <div className={styles.heading}>
        <h1 className={styles.name}>Library</h1>
      </div>
      <div className={styles.container}>
        {posts.map((post) => (
          <Link
            href={`/${post.slugs.join("/")}`}
            key={post.slugs.join("/")}
            className={styles.row}
            data-index={index ? "root" : false}
          >
            <div className={styles.a}>
              <div className={styles.titleContainer}>
                <h3 className={styles.title}>{post.data.title}</h3>
              </div>
            </div>
            <div className={styles.b}>
              <p className={styles.date}>{post.data.category}</p>
            </div>
            <div className={styles.c}>
              <time className={styles.date}>{formatPostDate(post.data.date)}</time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
