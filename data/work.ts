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
      title: "Linear Table of Contents",
      date: "2025-07-09",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1942979522267074963",
    },
    {
      title: "Contextual Information",
      date: "2025-07-04",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1941131648038568206",
    },
    {
      title: "Family Wallet",
      date: "2025-05-22",
      category: "Experiments",
      href: "/work/family-wallet",
      description: "A recreation of the Family Wallet customisation flow.",
    },
    {
      title: "Footer",
      date: "2025-05-01",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1924458394951254069",
    },
    {
      title: "Workouts",
      date: "2025-05-01",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1917980032825201154",
    },
    {
      title: "Caret",
      date: "2025-04-25",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1915724610185626061",
    },
    {
      title: "Conversions",
      date: "2025-04-22",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1914796648968143284",
    },
    {
      title: "Accordion",
      date: "2025-03-01",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1899452752276914403",
    },
    {
      title: "Dynamic Island",
      date: "2025-03-05",
      category: "Experiments",
      href: "https://x.com/raphaelsalaja/status/1897296203102216702/",
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
