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
    index ? posts.length : DEFAULT_PROJECT_LIMIT,
  );

  const renderProjectEntry = (post: (typeof posts)[number]) => {
    const isDisabled = post.data.disabled;
    const href = post.data.external ?? `/${post.slugs.join("/")}`;
    const thumbnail = renderThumbnail({ post });

    const entryProps = {
      className: styles.entry,
      "data-index": index ? "root" : false,
      ...(isDisabled && { "data-disabled": "true" }),
    };

    const id = `projects-post-${nanoid(8)}`;

    if (isDisabled) {
      return (
        <div key={id} {...entryProps}>
          {thumbnail}
        </div>
      );
    }

    return (
      <Link href={href} key={id} {...entryProps}>
        {thumbnail}
      </Link>
    );
  };

  return (
    <div className={styles.projects}>
      {!index && (
        <Link href="/projects" className={styles.heading}>
          <h1 className={styles.name}>Projects</h1>
          <h2 className={styles.count}>{length}+</h2>
        </Link>
      )}

      <div className={styles.grid}>{visiblePosts.map(renderProjectEntry)}</div>
    </div>
  );
};
