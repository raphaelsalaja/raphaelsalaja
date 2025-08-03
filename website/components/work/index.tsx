import { nanoid } from "nanoid";
import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { getWorkPages } from "@/lib/fumadocs";
import styles from "./styles.module.css";

const DEFAULT_PROJECT_LIMIT = 6;

interface WorkProps {
  index?: boolean;
}

export const Work = async ({ index = false }: WorkProps) => {
  const posts = getWorkPages();
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

  const renderProjectEntry = (post: (typeof posts)[number]) => {
    const isDisabled = post.data.disabled;
    const href = post.data.external ?? `/${post.slugs.join("/")}`;
    const thumbnail = renderThumbnail({ post });

    const entryProps = {
      className: styles.entry,
      "data-index": index ? "root" : false,
      ...(isDisabled && { "data-disabled": "true" }),
    };

    const id = `work-post-${nanoid(8)}`;

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

  if (!index) {
    const visiblePosts = posts.slice(0, DEFAULT_PROJECT_LIMIT);

    return (
      <div className={styles.work}>
        <Link href="/work" className={styles.heading}>
          <h1 className={styles.name}>Work</h1>
          <h2 className={styles.count}>{length}+</h2>
        </Link>

        <div className={styles.grid}>
          {visiblePosts.map(renderProjectEntry)}
        </div>
      </div>
    );
  }

  const groupedPosts = posts.reduce(
    (acc, post) => {
      const category = post.data.category || "uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
      return acc;
    },
    {} as Record<string, typeof posts>,
  );

  const categoryOrder = ["projects", "experiments", "experience"];

  const categoryDisplayNames = {
    projects: "Projects",
    experiments: "Experiments",
    experience: "Experience",
  };

  return (
    <div className={styles.work} style={{ gap: "48px" }}>
      {categoryOrder.map((category) => {
        const categoryPosts = groupedPosts[category];
        if (!categoryPosts || categoryPosts.length === 0) return null;

        return (
          <div key={category} className={styles.category}>
            <h2 className={styles.title}>
              {
                categoryDisplayNames[
                  category as keyof typeof categoryDisplayNames
                ]
              }
            </h2>
            <div className={styles.grid}>
              {categoryPosts.map(renderProjectEntry)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
