import { Section } from "@/components/section";
import styles from "./styles.module.css";

export function Newsletter() {
  return (
    <Section id="newsletter" title="Newsletter">
      <div className={`${styles.body} prose`}>
        <p className={styles.copy}>
          Occasional notes on design engineering, with new writing and work as
          it ships. Nothing else.
        </p>
        <a href="/rss">Subscribe with RSS</a>
      </div>
    </Section>
  );
}
