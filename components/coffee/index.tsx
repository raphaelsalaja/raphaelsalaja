import { IconCoffee } from "@/components/icons";
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
      <div className={styles.intro}>
        <Mascot className={styles.mascot} />
        <h2 id="support-heading" className={styles.title}>
          Support my work
        </h2>
        <p className={styles.description}>
          If you've enjoyed my work or writing, you can buy me a coffee. It
          helps cover the costs of research, writing, and hosting.
        </p>
      </div>
      <div className={styles.action}>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener"
          className={styles.button}
        >
          <IconCoffee size={16} />
          Buy me a coffee
        </a>
        <p className={styles.fine}>Payments are handled by Buy Me a Coffee.</p>
      </div>
    </section>
  );
}
