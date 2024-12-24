import { getPosts } from "@/lib/mdx";

import styles from "./styles.module.scss";

interface PostProps {
  category: string;
  inline?: boolean;
}

export const Posts = ({ category, inline }: PostProps) => {
  const posts = getPosts(category);

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={styles.posts}>
      {!inline && (
        <a href={`/${category}`} className={styles.label}>
          <h1>{category}</h1>
          <sup>{posts.length > 0 && `${posts.length}`}</sup>
        </a>
      )}

      <div className={styles.content}>
        {posts.map((post) => {
          return (
            <a href={`/${category}/${post.slug}`} className={styles.post} key={post.slug}>
              <h1>{post.title}</h1>
              <p>{post.summary}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};
