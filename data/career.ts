export type Role = {
  company: string;
  href: string;
  logo: string;
  description: string;
  start: string;
  end?: string;
};

export const career: Role[] = (
  [
    {
      company: "Warp",
      href: "https://www.warp.co/",
      logo: "/media/career/warp.jpg",
      description: "Payroll, compliance and benefits",
      start: "2026-01",
    },
    {
      company: "Fun.xyz",
      href: "https://fun.xyz/",
      logo: "/media/career/fun.jpg",
      description: "Website and checkout SDK",
      start: "2025-09",
      end: "2026-01",
    },
    {
      company: "Lovable",
      href: "https://lovable.dev/",
      logo: "/media/career/lovable.jpg",
      description: "AI app builder",
      start: "2025-08",
      end: "2025-09",
    },
    {
      company: "Variant",
      href: "https://variant.com/",
      logo: "/media/career/variant.jpg",
      description: "Endless designs for your ideas",
      start: "2025-05",
      end: "2025-07",
    },
    {
      company: "OpenSea",
      href: "https://opensea.io/",
      logo: "/media/career/opensea.jpg",
      description: "OpenSea V2",
      start: "2025-02",
      end: "2025-03",
    },
    {
      company: "Spotted in Prod",
      href: "https://www.spottedinprod.com/",
      logo: "/media/career/spotted-in-prod.jpg",
      description: "The very best of iOS",
      start: "2024-11",
      end: "2025-03",
    },
    {
      company: "Daybreak Studio",
      href: "https://www.daybreak.studio/",
      logo: "/media/career/daybreak.jpg",
      description: "Studio site, fifth version",
      start: "2024-08",
      end: "2024-12",
    },
    {
      company: "Avara",
      href: "https://avara.xyz/",
      logo: "/media/career/avara.jpg",
      description: "Lens, Family and Aave",
      start: "2024-04",
      end: "2025-05",
    },
  ] satisfies Role[]
).sort((a, b) => b.start.localeCompare(a.start));

export function formatPeriod({ start, end }: Role) {
  const from = start.slice(0, 4);
  if (!end) return `${from}—now`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from}—${to}`;
}
