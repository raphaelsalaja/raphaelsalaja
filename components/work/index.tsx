import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { Video } from "@/components/video";
import {
  posterFor,
  projects,
  type WorkItem,
  withPreview,
  work,
} from "@/data/work";
import { yearOf } from "@/lib/site";
import styles from "./styles.module.css";

const HOME_LIMIT = 6;

function WorkLink({
  item,
  className,
  children,
}: {
  item: WorkItem;
  className: string;
  children: ReactNode;
}) {
  if (item.href.startsWith("/work/")) {
    return (
      <Link href={item.href} className={className}>
        {children}
      </Link>
    );
  }

  if (item.href.startsWith("/")) {
    return (
      <a href={item.href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={item.href} target="_blank" rel="noopener" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Entry({ item }: { item: WorkItem & { preview: string } }) {
  return (
    <WorkLink item={item} className={styles.entry}>
      <span className={styles.frame}>
        <Video
          src={item.preview}
          poster={posterFor(item.preview)}
          className={styles.media}
          aria-hidden="true"
        />
      </span>
      <span className={styles.caption}>
        <span className={styles.name}>{item.title}</span>
        <time dateTime={item.date}>{yearOf(item.date)}</time>
      </span>
    </WorkLink>
  );
}

function Grid({ items }: { items: (WorkItem & { preview: string })[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Entry key={item.href} item={item} />
      ))}
    </div>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      title="Work"
      link={{ href: "/work", label: `All ${work.length}` }}
    >
      <Grid items={withPreview.slice(0, HOME_LIMIT)} />
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className={styles.projects}>
        {projects.map((item) => (
          <li key={item.href}>
            <WorkLink item={item} className={styles.project}>
              <span className={styles.tile} aria-hidden="true">
                {item.title[0]}
              </span>
              <span className={styles.details}>
                <span className={styles.name}>{item.title}</span>
                <span className={styles.description}>{item.description}</span>
              </span>
              <time dateTime={item.date} className={styles.year}>
                {yearOf(item.date)}
              </time>
            </WorkLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function WorkIndex() {
  return (
    <div className={styles.index}>
      <Projects />
      {(["Experiments", "Experience"] as const).map((category) => (
        <Section key={category} id={category.toLowerCase()} title={category}>
          <Grid
            items={withPreview.filter((item) => item.category === category)}
          />
        </Section>
      ))}
    </div>
  );
}
