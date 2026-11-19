import type { ReactNode } from "react";
import {
  GitHubLogo,
  IconCopy,
  IconFileContent,
  IconLink,
  InstagramLogo,
  LinkedInLogo,
  XLogo,
} from "@/components/icons";
import { posts } from "@/data/library";
import { SKILLS_INSTALL } from "@/data/skills";
import { projects } from "@/data/work";
import { SOCIALS } from "@/lib/site";

export type Action =
  | { label: string; href: string; icon?: ReactNode }
  | { label: string; copy: string; icon?: ReactNode };

export type Prompt = {
  id: string;
  shader?: boolean;
  title: string;
  description: ReactNode;
  actions: Action[];
};

export type Context = {
  pathname: string;
  day: number;
  unread: boolean;
};

type Entry = {
  id: string;
  urgent?: boolean;
  when?: (context: Context) => boolean;
  build: (context: Context) => Omit<Prompt, "id">;
};

export const latestPost = posts[0];

const REPOS: Record<string, string> = {
  Audio: "raphaelsalaja/audio",
  Calligraph: "raphaelsalaja/calligraph",
  Cambio: "raphaelsalaja/cambio",
  Toldo: "raphaelsalaja/toldo",
};

const starrable = projects.filter((project) => project.title in REPOS);
const pond = projects.find((project) => project.title === "Pond");

const ENTRIES: Entry[] = [
  {
    id: "new-post",
    urgent: true,
    when: ({ unread, pathname }) =>
      unread && pathname !== `/library/${latestPost.slug}`,
    build: () => ({
      title: `New Post: ${latestPost.title}`,
      description: "Just published. Give it a read when you have a minute.",
      actions: [
        {
          label: "Read",
          href: `/library/${latestPost.slug}`,
          icon: <IconFileContent size={14} />,
        },
      ],
    }),
  },
  {
    id: "skills",
    when: ({ pathname }) => pathname === "/skills",
    build: () => ({
      title: "Install the Skills",
      description: "Add them all to your coding agent with one command.",
      actions: [
        {
          label: "Copy",
          copy: SKILLS_INSTALL,
          icon: <IconCopy size={14} />,
        },
      ],
    }),
  },
  {
    id: "github",
    build: ({ day }) => {
      const project = starrable[day % starrable.length];
      return {
        title: `Star ${project.title} on GitHub`,
        description: `${project.description} A star helps other people find it.`,
        actions: [
          {
            label: "Star",
            href: `https://github.com/${REPOS[project.title]}`,
            icon: <GitHubLogo width={14} height={14} />,
          },
        ],
      };
    },
  },
  {
    id: "pond",
    when: () => Boolean(pond),
    build: () => ({
      title: "Try Pond",
      description:
        "A personal web archiver I built. I'd love to hear what you think.",
      actions: [
        {
          label: "Open Pond",
          href: pond?.href ?? "",
          icon: <IconLink size={14} />,
        },
      ],
    }),
  },
  {
    id: "x",
    build: () => ({
      title: "Follow Me on X",
      description: "New work, experiments and writing, as they come out.",
      actions: [
        {
          label: "Follow",
          href: SOCIALS.x,
          icon: <XLogo width={12} height={12} />,
        },
      ],
    }),
  },
  {
    id: "instagram",
    build: () => ({
      title: "Follow Me on Instagram",
      description: "A more behind-the-scenes look at the work, shared as I go.",
      actions: [
        {
          label: "Follow",
          href: SOCIALS.instagram,
          icon: <InstagramLogo width={14} height={14} />,
        },
      ],
    }),
  },
  {
    id: "linkedin",
    build: () => ({
      title: "Connect on LinkedIn",
      description: "Say hello, or keep up with what I'm working on.",
      actions: [
        {
          label: "Connect",
          href: SOCIALS.linkedin,
          icon: <LinkedInLogo width={14} height={14} />,
        },
      ],
    }),
  },
];

export function pick(
  context: Context,
  history: Record<string, number>,
  forced: string | null,
): Prompt | null {
  const entry = forced
    ? ENTRIES.find(({ id }) => id === forced)
    : choose(context, history);
  return entry ? { id: entry.id, ...entry.build(context) } : null;
}

function choose(context: Context, history: Record<string, number>) {
  const eligible = ENTRIES.filter(({ when }) => !when || when(context));
  return (
    eligible.find(({ urgent }) => urgent) ??
    eligible.toSorted((a, b) => (history[a.id] ?? 0) - (history[b.id] ?? 0))[0]
  );
}
