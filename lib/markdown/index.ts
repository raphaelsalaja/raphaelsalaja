import { readFile } from "node:fs/promises";
import path from "node:path";
import { SUPPORT_URL } from "@/components/support";
import { career, formatPeriod } from "@/data/career";
import { getPost, posts } from "@/data/library";
import { experiments, getWorkPage, projects, workPages } from "@/data/work";
import { formatLongDate, SITE_NAME, SITE_URL } from "@/lib/site";

const TALK_URL = "https://www.youtube.com/watch?v=uEMEs499fUs";

const absolute = (href: string) =>
  href.startsWith("/") ? `${SITE_URL}${href}` : href;

const markdownHref = (href: string) =>
  href.startsWith("/") ? `${SITE_URL}${href}.md` : href;

const readContent = (file: string) =>
  readFile(path.join(process.cwd(), "content", file), "utf8");

export function mdxToMarkdown(source: string) {
  const out: string[] = [];
  let fenced = false;
  let importing = false;

  for (const line of source.split("\n")) {
    if (line.trimStart().startsWith("```")) fenced = !fenced;

    if (fenced || line.trimStart().startsWith("```")) {
      out.push(line);
      continue;
    }

    if (importing || /^(import|export)\s/.test(line)) {
      importing = !/from\s+["'].+["'];?\s*$/.test(line) && !/;\s*$/.test(line);
      continue;
    }

    if (/^\s*<Talk\s*\/>\s*$/.test(line)) {
      out.push(`[Watch the talk](${TALK_URL})`);
      continue;
    }

    const video = line.match(/^\s*<Video\s+src="([^"]+)"/);
    if (video) {
      out.push(`[Video](${absolute(video[1])})`);
      continue;
    }

    if (/^\s*<\/?[A-Z][^>]*>\s*$/.test(line)) continue;

    out.push(
      line
        .replace(/<sub>(.*?)<\/sub>/g, "_$1_")
        .replace(/\]\((\/[^)]*)\)/g, (_, href) => `](${absolute(href)})`),
    );
  }

  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

async function home() {
  const about = mdxToMarkdown(await readContent("about.mdx"));

  return [
    `# ${SITE_NAME}`,
    "Design Engineer",
    about,
    "## Career",
    list(
      career.flatMap((item) =>
        item.positions.map((position) => {
          const company = item.href
            ? `[${item.company}](${item.href})`
            : item.company;
          return `${company}: ${position.title}, ${formatPeriod(position)}`;
        }),
      ),
    ),
    "## Projects",
    list(
      projects.map(
        (item) =>
          `[${item.title}](${markdownHref(item.href)}): ${item.description}`,
      ),
    ),
    "## Experiments",
    list(
      experiments.map((item) => {
        const description = item.description ? `: ${item.description}` : "";
        return `[${item.title}](${markdownHref(item.href)})${description}`;
      }),
    ),
    "## Writing",
    list(
      posts.map(
        (post) =>
          `[${post.title}](${markdownHref(`/library/${post.slug}`)}): ${post.summary ?? post.description}`,
      ),
    ),
    "## Support",
    `If you've enjoyed my work or writing, you can [buy me a coffee](${SUPPORT_URL}).`,
  ].join("\n\n");
}

function article(
  title: string,
  description: string,
  date: string,
  body: string,
) {
  return [`# ${title}`, `${formatLongDate(date)}. ${description}`, body].join(
    "\n\n",
  );
}

export const markdownPaths = [
  "/",
  ...posts.map((post) => `/library/${post.slug}`),
  ...workPages.map((item) => item.href),
];

export async function pageMarkdown(pathname: string) {
  if (pathname === "/") return home();
  const [, section, slug] = pathname.split("/");

  if (section === "library") {
    const post = getPost(slug);
    if (!post) return null;
    const body = mdxToMarkdown(await readContent(`library/${slug}.mdx`));
    return article(post.title, post.description, post.date, body);
  }

  if (section === "work") {
    const item = getWorkPage(slug);
    if (!item) return null;
    const body = mdxToMarkdown(await readContent(`work/${slug}.mdx`));
    return article(item.title, item.description ?? "", item.date, body);
  }

  return null;
}
