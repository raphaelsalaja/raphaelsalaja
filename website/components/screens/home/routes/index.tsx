import { Posts } from "@/components/posts";

import styles from "./styles.module.scss";

export default function Routes() {
  return (
    <section className={styles.routes}>
      <Posts category="projects" />
      <Posts category="engineering" />
      <Posts category="design-system" />
    </section>
  );
}
