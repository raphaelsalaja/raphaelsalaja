import { getPosts } from "@/lib/mdx";
import Button from "@rs/design/button";
import Link from "next/link";
import styles from "./styles.module.scss";

import type { Post } from "@/types/post";

const Item = ({ post, category, index }: { post: Post; category: string; index: boolean }) => {
  console.log(index ? "root" : false);
  return (
    <a href={`/${category}/${post.slug}`} className={styles.post} key={post.slug} data-index={index ? "root" : false}>
      <Thumbnail post={post} />
      <div className={styles.details}>
        <h1>{post.title}</h1>
        <p>
          {new Date(post.time.created).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
          })}
        </p>
      </div>
    </a>
  );
};

const Thumbnail = ({ post }: { post: Post }) => {
  if (post.media) {
    if (post.media.video) {
      return (
        <video src={post.media.video} className={styles.thumbnail} autoPlay muted loop>
          <track kind="captions" />
        </video>
      );
    }

    if (post.media.image) {
      return <img src={post.media.image} className={styles.thumbnail} alt={post.title} />;
    }
  }

  return (
    <div className={styles.thumbnail} data-title={post.title}>
      <span>{post.title}</span>
    </div>
  );
};

interface PostsProps {
  index?: boolean;
  category: string;
}

export const Posts = async ({ category, index = false }: PostsProps) => {
  const data = await getPosts(category);

  const length = data.length;

  const posts = data.sort((a, b) => {
    return Number(new Date(b.time.created)) - Number(new Date(a.time.created));
  });

  return (
    <div className={styles.posts}>
      {!index && (
        <div className={styles.heading}>
          <span className={styles.title}>
            <h1>{category}</h1>
            <sup>{length > 0 && `${length}`}</sup>
          </span>

          <Button asChild variant="ghost">
            <Link href={`/${category}`}>View All</Link>
          </Button>
        </div>
      )}

      <div className={styles.grid} data-index={index}>
        {posts
          .filter((post) => index || post.media)
          .slice(0, index ? posts.length : 4)
          .map((post) => {
            return Item({ post, category, index });
          })}
      </div>
    </div>
  );
};
