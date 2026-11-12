import { posts } from "@/data/library";
import { workPages } from "@/data/work";

type Page = { href: string; title: string; date: string };

export const pages: Page[] = [
  ...workPages.map(({ href, title, date }) => ({ href, title, date })),
  ...posts.map((post) => ({
    href: `/library/${post.slug}`,
    title: post.title,
    date: post.date,
  })),
].sort((a, b) => b.date.localeCompare(a.date));

/** Below this, the best page shares too little with the URL to suggest it. */
const THRESHOLD = 0.5;

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        previous + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      previous = current;
    }
  }
  return row[b.length];
}

const words = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const near = (asked: string, word: string) =>
  word.startsWith(asked) ||
  (word.length > 2 && asked.startsWith(word)) ||
  (asked.length > 3 && distance(asked, word.slice(0, asked.length)) <= 1);

const slugOf = (path: string) =>
  decodeURIComponent(path).split("/").filter(Boolean).pop() ?? "";

/** The page whose URL and title come closest to the one that missed, if any is close enough. */
export function closest(path: string) {
  const slug = slugOf(path).toLowerCase();
  if (!slug) return undefined;
  const asked = words(slug);
  const section = path.slice(0, path.lastIndexOf("/") + 1);

  let best: { page: Page; score: number } | undefined;
  for (const page of pages) {
    const target = slugOf(page.href);
    const spelling =
      1 - distance(slug, target) / Math.max(slug.length, target.length, 1);
    const title = words(page.title);
    const overlap =
      asked.filter((word) => title.some((other) => near(word, other))).length /
      Math.max(asked.length, 1);
    const sameSection = page.href.startsWith(section) ? 0.1 : 0;
    const score = spelling * 0.6 + overlap * 0.4 + sameSection;
    if (!best || score > best.score) best = { page, score };
  }

  return best && best.score >= THRESHOLD ? best.page : undefined;
}
