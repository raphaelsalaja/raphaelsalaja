import { Section } from "@/components/section";
import { SUPPORT_URL } from "@/components/support";
import styles from "./styles.module.css";

export function Coffee() {
  return (
    <Section id="support" title="Support">
      <div className={`${styles.body} prose`}>
        <p className={styles.copy}>
          If you've enjoyed my work or writing, you can buy me a coffee. It
          helps cover the costs of research, writing, and hosting.
        </p>
        <a href={SUPPORT_URL} target="_blank" rel="noopener">
          Buy me a coffee
        </a>
      </div>
    </Section>
  );
}
