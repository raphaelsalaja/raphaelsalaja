import type { ComponentProps } from "react";
import styles from "./styles.module.css";

type Company = { logos: string[]; preview: string };

const COMPANIES: Record<string, Company> = {
  "www.warp.co": { logos: ["warp.jpg"], preview: "warp.jpg" },
  "fun.xyz": { logos: ["fun.jpg"], preview: "fun.jpg" },
  "lovable.dev": { logos: ["lovable.jpg"], preview: "lovable.jpg" },
  "variant.com": { logos: ["variant.jpg"], preview: "variant.jpg" },
  "avara.xyz": {
    logos: ["family.jpg", "lens.png", "aave.png"],
    preview: "avara.jpg",
  },
  "opensea.io": { logos: ["opensea.jpg"], preview: "opensea.jpg" },
  "www.spottedinprod.com": {
    logos: ["spotted-in-prod.jpg"],
    preview: "spotted-in-prod.jpg",
  },
  "www.daybreak.studio": { logos: ["daybreak.jpg"], preview: "daybreak.jpg" },
};

export function BioLink({ href, children, ...props }: ComponentProps<"a">) {
  const company = href?.startsWith("http")
    ? COMPANIES[new URL(href).hostname]
    : undefined;

  if (!company) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      <span className={styles.company}>
        {company.logos.map((logo) => (
          // biome-ignore lint/performance/noImgElement: small static logos don't need optimisation
          <img
            key={logo}
            className={styles.logo}
            src={`/media/companies/${logo}`}
            alt=""
            width={14}
            height={14}
          />
        ))}
        {children}
        <span className={styles.preview} aria-hidden="true">
          {/* biome-ignore lint/performance/noImgElement: static screenshot shown on hover */}
          <img
            src={`/media/companies/previews/${company.preview}`}
            alt=""
            width={256}
            height={160}
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>
    </a>
  );
}
