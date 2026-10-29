import type { ComponentProps, JSX } from "react";
import {
  GitHubLogo,
  type IconProps,
  InstagramLogo,
  LinkedInLogo,
  XLogo,
} from "@/components/icons";
import styles from "./styles.module.css";

type Social = { Icon: (props: IconProps) => JSX.Element; background: string };

const SOCIALS: Record<string, Social> = {
  "x.com": { Icon: XLogo, background: "#000" },
  "github.com": { Icon: GitHubLogo, background: "#24292f" },
  "www.linkedin.com": { Icon: LinkedInLogo, background: "#0a66c2" },
  "www.instagram.com": {
    Icon: InstagramLogo,
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
  },
};

type Company = { logos: string[]; preview: string };

const COMPANIES: Record<string, Company> = {
  "www.warp.co": { logos: ["warp.jpg"], preview: "warp.jpg" },
  "fun.xyz": { logos: ["fun.jpg"], preview: "fun.jpg" },
  "lovable.dev": { logos: ["lovable.jpg"], preview: "lovable.jpg" },
  "variant.com": { logos: ["variant.jpg"], preview: "variant.jpg" },
  "avara.xyz": {
    logos: ["family.png", "lens.png", "aave.png"],
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
  const hostname = href?.startsWith("http") ? new URL(href).hostname : "";
  const company = COMPANIES[hostname];

  const social = SOCIALS[hostname];

  if (social) {
    return (
      <a href={href} {...props}>
        <span className={styles.company}>
          <span
            className={styles.mark}
            style={{ background: social.background }}
          >
            <social.Icon width={9} height={9} />
          </span>
          {children}
        </span>
      </a>
    );
  }

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
          <span key={logo} className={styles.mark}>
            {/* biome-ignore lint/performance/noImgElement: small static logos don't need optimisation */}
            <img
              src={`/media/companies/${logo}`}
              alt=""
              width={14}
              height={14}
            />
          </span>
        ))}
        {children}
        <span className={styles.preview} aria-hidden="true">
          <span className={styles.toolbar}>
            <span className={styles.lights}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.address} />
          </span>
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
