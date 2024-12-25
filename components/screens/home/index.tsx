import { Posts } from "@/components/posts";

import { Scrapbook } from "@/components/scrapbook";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <div className={styles.layout}>
      <div className={styles.heading}>
        <h1>Raphael Salaja</h1>
        <span>—</span>
        <h1>Design Engineer</h1>
      </div>

      <Scrapbook />

      <Posts category="projects" />
      <Posts category="engineering" />
    </div>
  );
}
