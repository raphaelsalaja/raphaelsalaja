import { format } from "date-fns";
import { nanoid } from "nanoid";
import { Link } from "next-view-transitions";
import { getLibraryPages } from "@/lib/fumadocs";
import styles from "./styles.module.css";

interface WorkProps {
  index?: boolean;
}

export const Library = async ({ index = false }: WorkProps) => {
  const allPosts = getLibraryPages();

  const posts = allPosts.sort((a, b) => {
    if (a.data.draft && !b.data.draft) return -1;
    if (!a.data.draft && b.data.draft) return 1;

    const getDate = (post: typeof a) => new Date(post.data.date || 0);
    return getDate(b).getTime() - getDate(a).getTime();
  });

  const formatDate = (post: (typeof posts)[number]) => {
    if (post.data.draft) return "00/00";
    const date = new Date(post.data.date || 0);
    return format(date, "dd/MM");
  };

  const renderProjectEntry = (post: (typeof posts)[number]) => {
    const { slugs } = post;
    const { disabled, draft, title, category, external } = post.data;
    const isDisabled = disabled || draft;
    const href = isDisabled ? "/" : (external ?? `/${slugs.join("/")}`);

    const entryProps = {
      className: styles.row,
      "data-index": index ? "root" : false,
      ...(isDisabled && { "data-disabled": "true" }),
    };

    const id = `library-post-${nanoid(8)}`;

    if (draft) {
      return (
        <div key={id} {...entryProps}>
          <div className={styles.a}>
            <div className={styles.title}>
              <h3 className={styles.label}>{title}</h3>
              {draft && (
                <span className={styles.draft}>
                  <span className={styles.label}>Draft</span>
                </span>
              )}
            </div>
          </div>
          <div className={styles.b}>{category}</div>
          <div className={styles.c}>
            <time>{formatDate(post)}</time>
          </div>
        </div>
      );
    }

    return (
      <Link href={href} key={id} {...entryProps}>
        <div className={styles.a}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{post.data.title}</h3>
            {post.data.draft && <span className={styles.draftTag}>Draft</span>}
          </div>
        </div>
        <div className={styles.b}>
          <p className={styles.date}>{post.data.category}</p>
        </div>
        <div className={styles.c}>
          <time className={styles.date}>{formatDate(post)}</time>
        </div>
      </Link>
    );
  };

  return (
    <div className={styles.posts}>
      <div className={styles.heading}>
        <h1 className={styles.name}>Library</h1>
      </div>
      <div className={styles.container}>{posts.map(renderProjectEntry)}</div>
    </div>
  );
};
