import { SUPPORT_URL } from "@/components/support";
import { Mascot } from "./mascot";
import styles from "./styles.module.css";

export function Coffee() {
  return (
    <section
      id="support"
      className={styles.card}
      aria-labelledby="support-heading"
    >
      <Mascot className={styles.mascot} />
      <div className={styles.copy}>
        <p className={styles.description}>
          If you've enjoyed my work or writing, you can support me by buying me
          a coffee. All support is greatly appreciated!
        </p>
      </div>
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener"
        className={styles.button}
      >
        Buy me a coffee
      </a>
    </section>
  );
}
