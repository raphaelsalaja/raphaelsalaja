import { Section } from "@/components/section";
import { career, formatPeriod } from "@/data/career";
import styles from "./styles.module.css";

export function Career() {
  return (
    <Section id="career" title="Career">
      <ul className={styles.list}>
        {career.map((role) => (
          <li key={role.company} className={styles.row}>
            <a
              href={role.href}
              target="_blank"
              rel="noopener"
              className={styles.company}
            >
              {/* biome-ignore lint/performance/noImgElement: small static logos don't need optimisation */}
              <img
                className={styles.logo}
                src={role.logo}
                alt=""
                width={16}
                height={16}
              />
              {role.company}
            </a>
            <span className={styles.description}>{role.description}</span>
            <span className={styles.period}>{formatPeriod(role)}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
