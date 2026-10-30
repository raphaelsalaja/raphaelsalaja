import { SUPPORT_URL } from "@/components/support";
import { SOCIALS } from "@/lib/site";
import { Mascot } from "./mascot";
import styles from "./styles.module.css";

export function Coffee() {
  return (
    <section
      id="support"
      className={styles.card}
      aria-labelledby="support-heading"
    >
      <div className={styles.main}>
        <Mascot className={styles.mascot} />
        <div className={styles.copy}>
          <h2 id="support-heading" className={styles.title}>
            Support My Work
          </h2>
          <p className={styles.description}>
            If you've enjoyed my work or writing, you can support me by buying
            me a coffee. All support is greatly appreciated!
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.follow}>
          Follow me on <a href={SOCIALS.x}>X</a>,{" "}
          <a href={SOCIALS.linkedin}>LinkedIn</a> and{" "}
          <a href={SOCIALS.instagram}>Instagram</a>
        </p>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener"
          className={styles.button}
          data-coffee
        >
          Buy Me a Coffee
        </a>
      </div>
    </section>
  );
}
