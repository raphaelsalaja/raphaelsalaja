import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { type WorkCategory, type WorkItem, work, WORK_CATEGORIES } from "@/data/work";
import styles from "./styles.module.css";

const DEFAULT_PROJECT_LIMIT = 6;

interface WorkProps {
  index?: boolean;
}

export const Work = ({ index = false }: WorkProps) => {
  const renderProjectEntry = (item: WorkItem) => {
    const thumbnail = item.preview ? (
      <div className={styles.thumbnail}>
        <Media.Video
          src={item.preview}
          autoPlay
          muted
          loop
          playsInline
          className={styles.media}
        />
      </div>
    ) : null;

    return (
      <Link
        href={item.href}
        key={item.href}
        className={styles.entry}
        data-index={index ? "root" : false}
      >
        {thumbnail}
      </Link>
    );
  };

  if (!index) {
    return (
      <div className={styles.work}>
        <Link href="/work" className={styles.heading}>
          <h1 className={styles.name}>Work</h1>
          <h2 className={styles.count}>{work.length}+</h2>
        </Link>
        <div className={styles.eyebrow} />
        <div className={styles.grid}>
          {work.slice(0, DEFAULT_PROJECT_LIMIT).map(renderProjectEntry)}
        </div>
      </div>
    );
  }

  const grouped = work.reduce(
    (acc, item) => {
      acc[item.category].push(item);
      return acc;
    },
    {
      Experiments: [],
      Experience: [],
      Projects: [],
    } as Record<WorkCategory, WorkItem[]>,
  );

  return (
    <div className={styles.work} style={{ gap: "48px" }}>
      {WORK_CATEGORIES.map((category) => {
        const items = grouped[category];
        if (items.length === 0) return null;

        return (
          <div key={category} className={styles.category}>
            <h2 className={styles.title}>{category}</h2>
            <div className={styles.eyebrow} />
            <div className={styles.grid}>{items.map(renderProjectEntry)}</div>
          </div>
        );
      })}
    </div>
  );
};
