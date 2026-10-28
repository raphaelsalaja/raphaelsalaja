import Link from "next/link";
import { Video } from "@/components/video";
import { posterFor, WORK_CATEGORIES, type WorkItem, work } from "@/data/work";
import styles from "./styles.module.css";

const HOME_LIMIT = 6;

function Entry({ item }: { item: WorkItem }) {
  const external = !item.href.startsWith("/");
  const media = (
    <>
      <Video
        src={item.preview}
        poster={posterFor(item.preview)}
        className={styles.media}
        aria-hidden="true"
      />
      <span className="sr-only">
        {item.title}
        {external && " (opens in a new tab)"}
      </span>
    </>
  );

  return external ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener"
      className={styles.entry}
      title={item.title}
    >
      {media}
    </a>
  ) : (
    <Link href={item.href} className={styles.entry} title={item.title}>
      {media}
    </Link>
  );
}

export function Work() {
  return (
    <section className={styles.work} aria-labelledby="work-heading">
      <Link href="/work" className={styles.heading}>
        <h2 id="work-heading">Work</h2>
        <span>{work.length}+</span>
      </Link>
      <div className={styles.rule} />
      <div className={styles.grid}>
        {work.slice(0, HOME_LIMIT).map((item) => (
          <Entry key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}

export function WorkIndex() {
  return (
    <div className={styles.index}>
      {WORK_CATEGORIES.map((category) => {
        const items = work.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <section key={category} className={styles.work}>
            <h2 className={styles.title}>{category}</h2>
            <div className={styles.rule} />
            <div className={styles.grid}>
              {items.map((item) => (
                <Entry key={item.href} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
