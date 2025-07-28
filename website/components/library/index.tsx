import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { nanoid } from "nanoid";
import { Link } from "next-view-transitions";
import { getLibraryPages } from "@/lib/fumadocs";
import styles from "./styles.module.css";

interface ProjectsProps {
  index?: boolean;
}

export const Library = async ({ index = false }: ProjectsProps) => {
  const posts = getLibraryPages();

  const formatDate = (post: (typeof posts)[number]) => {
    const date = new Date(post.data.date || 0);
    return format(date, "dd/MM");
  };

  const renderProjectEntry = (post: (typeof posts)[number]) => {
    const key = post.slugs.join("/");
    const isDisabled = post.data.disabled;
    const href = post.data.external ?? `/${post.slugs.join("/")}`;

    const entryProps = {
      className: styles.grid,
      key,
      "data-index": index ? "root" : false,
      ...(isDisabled && { "data-disabled": "true" }),
    };

    const id = `library-post-${nanoid(8)}`;

    return (
      <Link href={href} {...entryProps} key={id}>
        <div className={styles.a}>
          <h3 className={styles.title}>{post.data.title}</h3>
        </div>
        <div className={styles.b}>
          <p>{post.data.description}</p>
        </div>
        <div className={styles.c}>
          <p className={styles.date}>{post.data.tags?.join(", ") || ""}</p>
        </div>
        <div className={styles.d}>
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
