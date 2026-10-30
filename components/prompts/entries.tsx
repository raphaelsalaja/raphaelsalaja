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
import styles from "./styles.module.css";

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

function Sparkle() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={12}
      height={12}
      aria-hidden="true"
      className={styles.sparkle}
    >
      <path
        d="M8 0C8.6 4.6 11.4 7.4 16 8 11.4 8.6 8.6 11.4 8 16 7.4 11.4 4.6 8.6 0 8 4.6 7.4 7.4 4.6 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

const ENTRIES: Entry[] = [
  {
    id: "cosign",
    build: () => ({
      shader: true,
      title: "Cosign Awards 2026",
      description:
        "I've been nominated in Design. If you've enjoyed my work, a vote would mean a lot.",
      actions: [
        {
          label: "Vote",
          href: "https://cosign.co/awards/design",
          icon: <Sparkle />,
        },
      ],
    }),
  },
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
