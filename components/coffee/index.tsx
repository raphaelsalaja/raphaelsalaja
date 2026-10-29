import { IconCoffee } from "@/components/icons";
import { SUPPORT_URL } from "@/components/support";
import { Shader } from "./shader";
import styles from "./styles.module.css";

export function Coffee() {
  return (
    <section
      id="support"
      className={styles.card}
      aria-labelledby="support-heading"
    >
      <Shader className={styles.shader} />
      <h2 id="support-heading" className={styles.title}>
        Support my work
      </h2>
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
    </section>
  );
}
