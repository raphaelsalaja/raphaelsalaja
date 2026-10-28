export type Position = {
  title: string;
  start: string;
  end?: string;
};

export type Company = {
  company: string;
  href?: string;
  logos: string[];
  positions: Position[];
};

export const career: Company[] = [
  {
    company: "Warp",
    href: "https://www.warp.co/",
    logos: ["/media/career/warp.jpg"],
    positions: [{ title: "Design Engineer", start: "2026-01" }],
  },
  {
    company: "Fun.xyz",
    href: "https://fun.xyz/",
    logos: ["/media/career/fun.jpg"],
    positions: [{ title: "Design Engineer", start: "2025-09", end: "2026-01" }],
  },
  {
    company: "Lovable",
    href: "https://lovable.dev/",
    logos: ["/media/career/lovable.jpg"],
    positions: [{ title: "Design Engineer", start: "2025-08", end: "2025-09" }],
  },
  {
    company: "Variant",
    href: "https://variant.com/",
    logos: ["/media/career/variant.jpg"],
    positions: [{ title: "Design Engineer", start: "2025-05", end: "2025-07" }],
  },
  {
    company: "Avara",
    href: "https://avara.xyz/",
    logos: [
      "/media/career/family.png",
      "/media/career/lens.png",
      "/media/career/aave.png",
    ],
    positions: [{ title: "Design Engineer", start: "2024-04", end: "2025-05" }],
  },
  {
    company: "OpenSea",
    href: "https://opensea.io/",
    logos: ["/media/career/opensea.jpg"],
    positions: [{ title: "Design Engineer", start: "2025-02", end: "2025-03" }],
  },
  {
    company: "Spotted in Prod",
    href: "https://www.spottedinprod.com/",
    logos: ["/media/career/spotted-in-prod.jpg"],
    positions: [{ title: "Design Engineer", start: "2024-11", end: "2025-03" }],
  },
  {
    company: "Daybreak Studio",
    href: "https://www.daybreak.studio/",
    logos: ["/media/career/daybreak.jpg"],
    positions: [{ title: "Design Engineer", start: "2024-08", end: "2024-12" }],
  },
];

export function formatPeriod({ start, end }: Position) {
  const from = start.slice(0, 4);
  if (!end) return `${from}—now`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from}—${to}`;
}
