import * as Button from "@rs/design/button";
import { Link } from "next-view-transitions";
import styles from "./styles.module.css";

export const Base: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.column}>
          <h1>Pages</h1>
          <Button.default variant="ghost">
            <Link href="/projects">Projects</Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="/experiments">Experiments</Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="/insights">Insights</Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="/archive">Archive</Link>
          </Button.default>
        </div>
        <div className={styles.column}>
          <h1>Connect</h1>
          <Button.default variant="ghost">
            <Link href="https://x.com/raphaelsalaja">X (Twitter)</Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="https://www.instagram.com/raphaelsalaja">
              Instagram
            </Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="https://github.com/raphaelsalaja">Github</Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="https://www.linkedin.com/in/raphael-salaja">
              LinkedIn
            </Link>
          </Button.default>
          <Button.default variant="ghost">
            <Link href="mailto:raphaelsalaja@gmail.com">Email</Link>
          </Button.default>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.logo}>
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.circle} />
        </div>

        <p className={styles.legal}>© {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};
