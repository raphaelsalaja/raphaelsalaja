import { Library } from "@/components/library";
import { Work } from "@/components/work";
import About from "@/content/about.mdx";
import { SITE_NAME } from "@/lib/site";
import styles from "./styles.module.css";

export function Home() {
  return (
    <div className={styles.layout}>
      <section className={styles.about}>
        <h1 className={styles.name}>{SITE_NAME}</h1>
        <About />
      </section>
      <Work />
      <Library />
    </div>
  );
}
