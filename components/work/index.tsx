import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { StackList } from "@/components/stack-list";
import { Video } from "@/components/video";
import { posterFor, projects, type WorkItem, withPreview } from "@/data/work";
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

function Grid({ items }: { items: (WorkItem & { preview: string })[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Entry key={item.href} item={item} />
      ))}
    </div>
  );
}

export function Projects({ link }: { link?: { href: string; label: string } }) {
  return (
    <Section id="projects" title="Projects" link={link}>
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
