import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { getPosts } from "@/lib/mdx";
import type { Frontmatter } from "@/types/frontmatter";
import { Placeholder } from "./placeholder";
import styles from "./styles.module.css";

interface PostsProps {
  index?: boolean;
  category: string;
  title?: string;
  filter?: boolean;
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
    if (a.media && !b.media) return -1;
    if (!a.media && b.media) return 1;
    return Number(new Date(b.time.created)) - Number(new Date(a.time.created));
  });

  const length = posts.length;

  const Thumbnail = ({ post }: { post: Frontmatter }) => {
    if (post.media?.video) {
      return (
        <div className={styles.thumbnail}>
          <Media.Video src={post.media.video} autoPlay muted loop playsInline className={styles.media}>
            <track kind="captions" />
          </Media.Video>
        </div>
      );
    }

    if (post.media?.image) {
      return (
        <div className={styles.thumbnail}>
          <Media.Image
            fill
            src={post.media.image}
            className={styles.media}
            alt={post.title || "Post image"}
            loading="lazy"
          />
        </div>
      );
    }

    return <Placeholder post={post} />;
  };

  return (
    <div className={styles.posts}>
      {!index && (
        <Link href={`/${category}`} className={styles.heading}>
          <h1 className={styles.name}>{title}</h1>
          <h2 className={styles.count}>{length}</h2>
        </Link>
      )}

      <div className={styles.grid}>
        {posts
          .filter((_post) => {
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
