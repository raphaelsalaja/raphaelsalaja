import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { StackList } from "@/components/stack-list";
import { Video } from "@/components/video";
import { experiments, posterFor, projects, type WorkItem } from "@/data/work";
import { yearOf } from "@/lib/site";
import styles from "./styles.module.css";

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

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <StackList
        items={projects.map((item) => ({
          href: item.href,
          title: item.title,
          description: item.description,
        }))}
      />
    </Section>
  );
}

export function Experiments() {
  return (
    <Section id="experiments" title="Experiments">
      <div className={styles.grid}>
        {experiments.map((item) => (
          <Entry key={item.href} item={item} />
        ))}
      </div>
    </Section>
  );
}
