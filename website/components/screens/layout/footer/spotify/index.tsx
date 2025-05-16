import Button from "@rs/design/button";
import { Link } from "next-view-transitions";
import { Shape2, Shape3, Shape6, Shape8 } from "@/components/posts/placeholder/shapes";
import styles from "./styles.module.scss";

export const Spotify: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.column}>
          <h1>Pages</h1>
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/projects">Projects</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/experiments">Experiments</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/insights">Insights</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/archive">Archive</Link>
          </Button>
        </div>
        <div className={styles.column}>
          <h1>Connect</h1>
          <Button asChild variant="ghost">
            <Link href="https://x.com/raphaelsalaja">Twitter</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://www.instagram.com/raphaelsalaja">Instagram</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://github.com/raphaelsalaja">Github</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="mailto:raphaelsalaja@gmail.com">Email</Link>
          </Button>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.shapes}>
          <div className={styles.shape} data-color="blue">
            <Shape3 className={styles.icon} />
          </div>
          <div className={styles.shape} data-color="violet">
            <Shape6 className={styles.icon} />
          </div>
          <div className={styles.shape} data-color="yellow">
            <Shape2 className={styles.icon} />
          </div>
          <div className={styles.shape} data-color="gray">
            <Shape8 className={styles.icon} />
          </div>
        </div>

        <p className={styles.legal}>© {new Date().getFullYear()} Raphael Salaja</p>
      </div>
    </div>
  );
};
