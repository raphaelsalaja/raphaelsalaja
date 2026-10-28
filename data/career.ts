export type Role = {
  company: string;
  role: string;
  period: string;
  href: string;
  logo: string;
};

export const career: Role[] = [
  {
    company: "Warp",
    role: "Design Engineer",
    period: "Now",
    href: "https://www.warp.dev/",
    logo: "/media/career/warp.png",
  },
  {
    company: "Avara",
    role: "Design Engineer",
    period: "2025",
    href: "https://avara.xyz/",
    logo: "/media/career/avara.svg",
  },
  {
    company: "Daybreak",
    role: "Design Engineer",
    period: "2025",
    href: "https://www.daybreak.studio/",
    logo: "/media/career/daybreak.png",
  },
  {
    company: "OpenSea",
    role: "Design Engineer",
    period: "2025",
    href: "https://opensea.io/",
    logo: "/media/career/opensea.png",
  },
];
