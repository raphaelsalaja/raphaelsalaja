export const WORK_CATEGORIES = ["Experiments", "Projects"] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkItem = {
  title: string;
  date: string;
  category: WorkCategory;
  href: string;
  description?: string;
};

export const work: WorkItem[] = (
  [
    {
      title: "Pond",
      date: "2026-04-22",
      category: "Projects",
      href: "https://pond.raphaelsalaja.com/",
      description: "Your personal web archiver.",
    },
    {
      title: "Audio",
      date: "2026-04-04",
      category: "Projects",
      href: "https://audio.raphaelsalaja.com/",
      description: "Declarative audio synthesis for the web.",
    },
    {
      title: "Userinterface Wikipedia",
      date: "2025-09-24",
      category: "Projects",
      href: "https://www.userinterface.wiki/",
      description: "A living manual for better interfaces.",
    },
    {
      title: "Cambio",
      date: "2025-08-12",
      category: "Projects",
      href: "https://cambio.raphaelsalaja.com/",
      description: "A shared animation component for React.",
    },
    {
      title: "Low Battery Notification",
      date: "2025-08-08",
      category: "Experiments",
      href: "/work/low-battery-notification",
      description: "A recreation of the low battery notification UI in iOS 26.",
    },
    {
      title: "Family Wallet",
      date: "2025-05-22",
      category: "Experiments",
      href: "/work/family-wallet",
      description: "A recreation of the Family Wallet customisation flow.",
    },
    {
      title: "Toldo",
      date: "2024-11-07",
      category: "Projects",
      href: "https://toldo.vercel.app/",
      description: "An elevated dialog component for React.",
    },
  ] satisfies WorkItem[]
).sort((a, b) => b.date.localeCompare(a.date));

export const workPages = work.filter((item) => item.href.startsWith("/work/"));

export const getWorkPage = (slug: string) =>
  workPages.find((item) => item.href === `/work/${slug}`);

export const projects = work.filter((item) => item.category === "Projects");

export const experiments = work.filter(
  (item) => item.category === "Experiments",
);
