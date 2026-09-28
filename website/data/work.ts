export const WORK_CATEGORIES = [
  "Experiments",
  "Experience",
  "Projects",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkItem = {
  title: string;
  date: string;
  category: WorkCategory;
  href: string;
  preview?: string;
};

export const work: WorkItem[] = [
  {
    title: "Cambio",
    date: "2025-08-12",
    category: "Projects",
    href: "https://cambio.raphaelsalaja.com/",
    preview: "/media/work/projects/cambio.mp4",
  },
  {
    title: "Low Battery Notification",
    date: "2025-08-08",
    category: "Experiments",
    href: "/work/low-battery-notification",
    preview: "/media/work/experiments/low-battery-notification.mp4",
  },
  {
    title: "Linear Table of Contents",
    date: "2025-07-09",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1942979522267074963",
    preview: "/media/work/experiments/linear-table-of-contents.mp4",
  },
  {
    title: "Contextual Information",
    date: "2025-07-04",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1941131648038568206",
    preview: "/media/work/experiments/contextual-information.mp4",
  },
  {
    title: "404 - Not Found",
    date: "2025-05-23",
    category: "Experiments",
    href: "/404",
    preview: "/media/work/experiments/404.mp4",
  },
  {
    title: "Family Wallet",
    date: "2025-05-22",
    category: "Experiments",
    href: "/work/family-wallet",
    preview: "/media/work/experiments/family-wallet.mp4",
  },
  {
    title: "Footer",
    date: "2025-05-01",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1924458394951254069",
    preview: "/media/work/experiments/footer.mp4",
  },
  {
    title: "Workouts",
    date: "2025-05-01",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1917980032825201154",
    preview: "/media/work/experiments/workouts.mp4",
  },
  {
    title: "Caret",
    date: "2025-04-25",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1915724610185626061",
    preview: "/media/work/experiments/caret.mp4",
  },
  {
    title: "Conversions",
    date: "2025-04-22",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1914796648968143284",
    preview: "/media/work/experiments/conversions.mp4",
  },
  {
    title: "Lens Developer Dashboard",
    date: "2025-04-04",
    category: "Experience",
    href: "https://developer.lens.xyz/",
    preview: "/media/work/experience/lens-developer-dashboard.mp4",
  },
  {
    title: "Daybreak V5",
    date: "2025-03-31",
    category: "Experience",
    href: "https://www.daybreak.studio/",
    preview: "/media/work/experience/daybreak-v5.mp4",
  },
  {
    title: "Accordion",
    date: "2025-03-01",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1899452752276914403",
    preview: "/media/work/experiments/accordion.mp4",
  },
  {
    title: "Dynamic Island",
    date: "2025-03-05",
    category: "Experiments",
    href: "https://x.com/raphaelsalaja/status/1897296203102216702/",
    preview: "/media/work/experiments/dynamic-island.mp4",
  },
  {
    title: "Opensea V2",
    date: "2025-02-13",
    category: "Experience",
    href: "https://opensea.io/",
    preview: "/media/work/experience/opensea-v2.mp4",
  },
  {
    title: "Toldo",
    date: "2024-11-07",
    category: "Projects",
    href: "https://toldo.vercel.app/",
    preview: "/media/work/projects/toldo.mp4",
  },
  {
    title: "Spatial Arena",
    date: "2024-04-14",
    category: "Projects",
    href: "https://x.com/raphaelsalaja/status/1782542966642315620",
    preview: "/media/work/projects/spatial-arena.mp4",
  },
  {
    title: "Layers",
    date: "2023-11-18",
    category: "Projects",
    href: "https://github.com/raphaelsalaja/layers",
    preview: "/media/work/projects/layers.mp4",
  },
  {
    title: "Metallurgy",
    date: "2023-07-24",
    category: "Projects",
    href: "https://github.com/raphaelsalaja/metallurgy",
    preview: "/media/work/projects/metallurgy.mp4",
  },
].sort((a, b) => b.date.localeCompare(a.date));

export const workPages = work.filter((item) => item.href.startsWith("/work/"));
