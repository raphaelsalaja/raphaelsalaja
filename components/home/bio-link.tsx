import type { ComponentProps } from "react";
import styles from "./styles.module.css";

const LOGOS: Record<string, string[]> = {
  "www.warp.co": ["warp.jpg"],
  "fun.xyz": ["fun.jpg"],
  "lovable.dev": ["lovable.jpg"],
  "variant.com": ["variant.jpg"],
  "avara.xyz": ["family.png", "lens.png", "aave.png"],
  "opensea.io": ["opensea.jpg"],
  "www.spottedinprod.com": ["spotted-in-prod.jpg"],
  "www.daybreak.studio": ["daybreak.jpg"],
};

export function BioLink({ href, children, ...props }: ComponentProps<"a">) {
  const logos = href?.startsWith("http") && LOGOS[new URL(href).hostname];

  return (
    <a href={href} {...props}>
      {logos ? (
        <span className={styles.company}>
          {logos.map((logo) => (
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
        </span>
      ) : (
        children
      )}
    </a>
  );
}
