import { getPosts } from "@/lib/mdx";
import Button from "@rs/design/button";
import { Seperator } from "@rs/design/seperator";
import Link from "next/link";
import styles from "./styles.module.css";
import type { Post } from "@/types/post";
import Image from "next/image";

interface PostsProps {
  index?: boolean;
  category: string;
  title?: string;
}

export const Posts = async ({
  category,
  index = false,
  title = category
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase()),
}: PostsProps) => {
  const data = await getPosts(category);

  const posts = data.sort((a, b) => {
    return Number(new Date(b.time.created)) - Number(new Date(a.time.created));
  });

  const length = posts.length;

  const Thumbnail = ({ post }: { post: Post }) => {
    if (post.media?.video) {
      return (
        <video
          src={post.media.video}
          autoPlay
          muted
          loop
          playsInline
          className={styles.thumbnail}
        >
          <track kind="captions" />
        </video>
      );
    }

    if (post.media?.image) {
      return (
        <div className={styles.thumbnail} style={{ overflow: "hidden" }}>
          <Image
            src={post.media.image}
            alt={post.title || "Post image"}
            fill
            unoptimized
          />
        </div>
      );
    }

    return (
      <div className={styles.thumbnail} data-title={post.title}>
        <span className={styles.title}>{post.title}</span>
      </div>
    );
  };

  return (
    <div className={styles.posts}>
      {!index && (
        <div className={styles.heading}>
          <Button asChild variant="tertiary">
            <Link href={`/${category}`} className={styles.title}>
              <h1 className={styles.name}>{title}</h1>
              <h2 className={styles.count}>{length}</h2>
            </Link>
          </Button>
          <Seperator />
        </div>
      )}

      <div className={styles.grid}>
        {posts.slice(0, index ? posts.length : 3).map((post) => {
          return (
            <Link
              href={`/${category}/${post.slug}`}
              className={styles.entry}
              key={post.slug}
              data-index={index ? "root" : false}
            >
              <Thumbnail post={post} />
              <div className={styles.details}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.date}>
                  {new Date(post.time.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
