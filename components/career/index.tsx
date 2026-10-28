import { Fragment } from "react";
import { Section } from "@/components/section";
import { career, formatPeriod } from "@/data/career";
import styles from "./styles.module.css";

export function Career() {
  return (
    <Section id="career" title="Career">
      <dl className={styles.list}>
        {career.map((item) => (
          <Fragment key={item.company}>
            <dt className={styles.company}>
              <span className={styles.logos}>
                {item.logos.map((logo) => (
                  // biome-ignore lint/performance/noImgElement: small static logos don't need optimisation
                  <img
                    key={logo}
                    className={styles.logo}
                    src={logo}
                    alt=""
                    width={16}
                    height={16}
                  />
                ))}
              </span>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener">
                  {item.company}
                </a>
              ) : (
                item.company
              )}
            </dt>
            <dd className={styles.roles}>
              <dl className={styles.positions}>
                {item.positions.map((position) => (
                  <Fragment key={position.start}>
                    <dt className={styles.period}>{formatPeriod(position)}</dt>
                    <dd className={styles.title}>{position.title}</dd>
                  </Fragment>
                ))}
              </dl>
            </dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  );
}
