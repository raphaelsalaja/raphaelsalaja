import { getPosts } from "@/lib/mdx";
import type { Frontmatter } from "@/types/frontmatter";
import Button from "@rs/design/button";
import { Seperator } from "@rs/design/seperator";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

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

  const Thumbnail = ({ post }: { post: Frontmatter }) => {
    const colors = [
      "blue",
      "gray",
      "green",
      "orange",
      "pink",
      "red",
      "violet",
      "yellow",
      "lime",
    ];

    const postName = post.title?.toLowerCase() ?? "";

    const hash = Array.from(postName).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    const color = colors[hash % colors.length];

    const background = `var(--${color}-9)`;

    if (post.media?.video) {
      return (
        <div className={styles.thumbnail}>
          <video
            src={post.media.video}
            autoPlay
            muted
            loop
            playsInline
            className={styles.media}
          >
            <track kind="captions" />
          </video>
        </div>
      );
    }

    if (post.media?.image) {
      return (
        <div className={styles.thumbnail}>
          <Image
            className={styles.media}
            src={post.media.image}
            alt={post.title || "Post image"}
            fill
            unoptimized
          />
        </div>
      );
    }

    return (
      <div className={styles.thumbnail}>
        <div className={styles.details}>
          <span className={styles.title}>{post.title}</span>
          <span className={styles.summary}>{post.summary}</span>
        </div>
        <div className={styles.bottom} style={{ background }} />
      </div>
    );
  };

  const isHome = !index;

  return (
    <div className={styles.posts}>
      {!index && (
        <div className={styles.heading}>
          <Button asChild variant="ghost">
            <Link href={`/${category}`} className={styles.title}>
              <h1 className={styles.name}>{title}</h1>
              <h2 className={styles.count}>{length}</h2>
            </Link>
          </Button>
          <Seperator />
        </div>
      )}

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: index ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
        }}
      >
        {posts
          .filter((post) => {
            if (isHome) {
              return post.media?.image || post.media?.video;
            }
            return true;
          })
          .slice(0, index ? posts.length : 3)
          .map((post) => {
            if (post.disabled) {
              return (
                <div
                  className={styles.entry}
                  key={post.slug}
                  data-index={index ? "root" : false}
                  data-disabled="true"
                >
                  <Thumbnail post={post} />
                </div>
              );
            }

            return (
              <Link
                href={post.external ?? `/${category}/${post.slug}`}
                className={styles.entry}
                key={post.slug}
                data-index={index ? "root" : false}
              >
                <Thumbnail post={post} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};
