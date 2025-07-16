import { Posts } from "@/components/posts";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      <div className={styles.about}>
        <h1 className={styles.title}>Raphael Salaja — Engineering Feelings</h1>
        <p>
          I&apos;m someone who loves mixing different influences, genres and styles to create unique, innovative work. I
          enjoy pushing boundaries and exploring new ways to express myself without limitations.
        </p>
      </div>
      <section className={styles.sections}>
        <Posts category="projects" />
        <Posts category="experiments" />
        <Posts category="insights" filter={false} />
      </section>
    </div>
  );
}
