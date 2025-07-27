import { nanoid } from "nanoid";
import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { getProjectsPages } from "@/lib/fumadocs";
import styles from "./styles.module.css";

const DEFAULT_PROJECT_LIMIT = 6;

interface ProjectsProps {
  index?: boolean;
}

export const Projects = async ({ index = false }: ProjectsProps) => {
  const posts = getProjectsPages();
  const length = posts.length;

  const renderThumbnail = ({ post }: { post: (typeof posts)[number] }) => {
    const { media } = post.data;

    if (media?.video) {
      return (
        <div className={styles.thumbnail}>
          <Media.Video
            src={media.video}
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

    if (media?.image) {
      return (
        <div className={styles.thumbnail}>
          <Media.Image
            fill
            src={media.image}
            className={styles.media}
            alt={post.data.title || "Project image"}
            loading="lazy"
          />
        </div>
      );
    }

    return null;
  };

  const visiblePosts = posts.slice(
    0,
    index ? DEFAULT_PROJECT_LIMIT : posts.length,
  );

  const renderProjectEntry = (post: (typeof posts)[number]) => {
    const key = post.slugs.join("/");
    const isDisabled = post.data.disabled;
    const href = post.data.external ?? `/${post.slugs.join("/")}`;
    const thumbnail = renderThumbnail({ post });

    const entryProps = {
      className: styles.entry,
      key,
      "data-index": index ? "root" : false,
      ...(isDisabled && { "data-disabled": "true" }),
    };

    if (isDisabled) {
      return <div {...entryProps}>{thumbnail}</div>;
    }

    const id = `projects-post-${nanoid(8)}`;

    return (
      <Link href={href} {...entryProps} key={id}>
        {thumbnail}
      </Link>
    );
  };

  return (
    <div className={styles.posts}>
      {index && (
        <Link href="/projects" className={styles.heading}>
          <h1 className={styles.name}>Projects</h1>
          <h2 className={styles.count}>{length}</h2>
        </Link>
      )}

      <div className={styles.grid}>{visiblePosts.map(renderProjectEntry)}</div>
    </div>
  );
};
