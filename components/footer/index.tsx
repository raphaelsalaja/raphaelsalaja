import { SOCIALS } from "@/lib/site";
import { Clock } from "./clock";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.time}>
        <Clock className={styles.clock} /> in Ireland
      </p>
      <ul className={styles.links}>
        <li>
          <a href={SOCIALS.x} target="_blank" rel="noopener">
            X
          </a>
        </li>
        <li>
          <a href={SOCIALS.github} target="_blank" rel="noopener">
            GitHub
          </a>
        </li>
        <li>
          <a href="/rss">RSS</a>
        </li>
      </ul>
    </footer>
  );
}
