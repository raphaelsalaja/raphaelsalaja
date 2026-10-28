import { posts } from "@/data/library";
import { type WorkCategory, work } from "@/data/work";

export type ChangelogEntry = {
  date: string;
  verb: string;
  title: string;
  href?: string;
};

const site: ChangelogEntry[] = [
  {
    date: "2026-10-28",
    verb: "Refreshed",
    title: "this site",
  },
];

const verbs: Record<WorkCategory, string> = {
  Projects: "Released",
  Experiments: "Built",
  Experience: "Shipped",
};

export const changelog: ChangelogEntry[] = [
  ...site,
  ...posts.map((post) => ({
    date: post.date,
    verb: "Wrote",
    title: post.title,
    href: `/library/${post.slug}`,
  })),
  ...work.map((item) => ({
    date: item.date,
    verb: verbs[item.category],
    title: item.title,
    href: item.href,
  })),
].toSorted((a, b) => b.date.localeCompare(a.date));
