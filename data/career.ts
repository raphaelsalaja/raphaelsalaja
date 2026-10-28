export type Role = {
  company: string;
  role: string;
  period: string;
  href: string;
  logo: string;
  monochrome?: boolean;
  background?: string;
};

export const career: Role[] = [
  {
    company: "Warp",
    role: "Design Engineer",
    period: "Now",
    href: "https://www.warp.co/",
    logo: "/media/career/warp.svg",
    monochrome: true,
  },
  {
    company: "Avara",
    role: "Design Engineer",
    period: "2025",
    href: "https://avara.xyz/",
    logo: "/media/career/avara.svg",
    monochrome: true,
  },
  {
    company: "Daybreak",
    role: "Design Engineer",
    period: "2025",
    href: "https://www.daybreak.studio/",
    logo: "/media/career/daybreak.png",
    monochrome: true,
  },
  {
    company: "OpenSea",
    role: "Design Engineer",
    period: "2025",
    href: "https://opensea.io/",
    logo: "/media/career/opensea.png",
    background: "#0086ff",
  },
];
