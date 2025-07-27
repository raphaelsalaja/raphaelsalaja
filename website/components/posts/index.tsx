import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { source } from "@/lib/fumadocs";
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
  const pages = source.getPages();
  const posts = pages.filter((page) => page.slugs[0] === category);
  const length = posts.length;

  const Thumbnail = ({ post }: { post: (typeof posts)[0] }) => {
    if (post.data.media?.video) {
      return (
        <div className={styles.thumbnail}>
          <Media.Video
            src={post.data.media.video}
            autoPlay
            muted
            loop
            playsInline
            className={styles.media}
          >
            <track kind="captions" />
          </Media.Video>
        </div>
      );
    }

    if (post.data.media?.image) {
      return (
        <div className={styles.thumbnail}>
          <Media.Image
            fill
            src={post.data.media.image}
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
            if (post.data.disabled) {
              return (
                <div
                  className={styles.entry}
                  key={post.slugs.join("/")}
                  data-index={index ? "root" : false}
                  data-disabled="true"
                >
                  <Thumbnail post={post} />
                </div>
              );
            }

            return (
              <Link
                href={post.data.external ?? `/${post.slugs.join("/")}`}
                className={styles.entry}
                key={post.slugs.join("/")}
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
