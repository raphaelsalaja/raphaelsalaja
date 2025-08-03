import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { getWorkPages } from "@/lib/fumadocs";
import styles from "./styles.module.css";

const DEFAULT_PROJECT_LIMIT = 6;

const CATEGORY_ORDER = ["Experiments", "Experience", "Projects"] as const;

const CATEGORY_DISPLAY_NAMES = {
  Projects: "Projects",
  Experiments: "Experiments",
  Experience: "Experience",
} as const;

interface WorkProps {
  index?: boolean;
}

export const Work = async ({ index = false }: WorkProps) => {
  const posts = getWorkPages();
  const length = posts.length;

  const renderProjectEntry = (
    post: (typeof posts)[number],
    entryIndex: number,
  ) => {
    const isDisabled = post.data.disabled;
    const href = post.data.external ?? `/${post.slugs.join("/")}`;
    const { preview } = post.data;

    const entryProps = {
      className: styles.entry,
      "data-index": index ? "root" : false,
      ...(isDisabled && { "data-disabled": "true" }),
    };

    const thumbnail = preview ? (
      <div className={styles.thumbnail}>
        <Media.Video
          src={preview}
          autoPlay
          muted
          loop
          playsInline
          className={styles.media}
        />
      </div>
    ) : null;

    if (isDisabled) {
      return (
        <div key={entryIndex} {...entryProps}>
          {thumbnail}
        </div>
      );
    }

    return (
      <Link href={href} key={entryIndex} {...entryProps}>
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
        <div className={styles.eyebrow} />

        <div className={styles.grid}>
          {visiblePosts.map((post, entryIndex) =>
            renderProjectEntry(post, entryIndex),
          )}
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

  return (
    <div className={styles.work} style={{ gap: "48px" }}>
      {CATEGORY_ORDER.map((category) => {
        const categoryPosts = groupedPosts[category];
        if (!categoryPosts || categoryPosts.length === 0) return null;

        return (
          <div key={category} className={styles.category}>
            <h2 className={styles.title}>{CATEGORY_DISPLAY_NAMES[category]}</h2>
            <div className={styles.eyebrow} />
            <div className={styles.grid}>
              {categoryPosts.map((post, entryIndex) =>
                renderProjectEntry(post, entryIndex),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
