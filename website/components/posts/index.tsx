import Button from "@rs/design/button";
import { Seperator } from "@rs/design/seperator";
import { Link } from "next-view-transitions";

import * as Cloudinary from "@/components/cloudinary";
import { getPosts } from "@/lib/mdx";
import type { Frontmatter } from "@/types/frontmatter";
import { Placeholder } from "./placeholder";
import styles from "./styles.module.scss";

interface PostsProps {
  index?: boolean;
  category: string;
  title?: string;
  filter?: boolean;
}

export const Posts = async ({
  category,
  index = false,
  filter = true,
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
    if (post.media?.video) {
      return (
        <div className={styles.thumbnail}>
          <Cloudinary.Video src={post.media.video} autoPlay muted loop playsInline className={styles.media}>
            <track kind="captions" />
          </Cloudinary.Video>
        </div>
      );
    }

    if (post.media?.image) {
      return (
        <div className={styles.thumbnail}>
          <Cloudinary.Image
            className={styles.media}
            src={post.media.image}
            alt={post.title || "Post image"}
            fill
            unoptimized
          />
        </div>
      );
    }

    return <Placeholder post={post} />;
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

      <div className={styles.grid}>
        {posts
          .filter((post) => {
            if (isHome && filter) {
              // return post.media?.image || post.media?.video;
            }
            return true;
          })
          .slice(0, index ? posts.length : 3)
          .map((post) => {
            if (post.disabled) {
              return (
                <div className={styles.entry} key={post.slug} data-index={index ? "root" : false} data-disabled="true">
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
