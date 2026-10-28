import { Coffee as CoffeeIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { SUPPORT_URL } from "@/components/support";
import styles from "./styles.module.css";

export function Coffee() {
  return (
    <Section id="support" title="Support">
      <div className={styles.card}>
        <span className={styles.icon}>
          <CoffeeIcon />
        </span>
        <div className={styles.content}>
          <p className={styles.copy}>
            If you've enjoyed my work or writing, you can buy me a coffee. It
            helps cover the costs of research, writing, and hosting.
          </p>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener"
            className={styles.button}
          >
            Buy me a coffee
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5.5 10.5l5-5m-4 0h4v4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </Section>
  );
}
