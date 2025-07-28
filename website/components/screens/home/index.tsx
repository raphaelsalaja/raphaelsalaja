import { Library } from "@/components/library";
import { Projects } from "@/components/projects";
import About from "./about";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      <About />
      <section className={styles.sections}>
        <Projects index />
        <Library />
      </section>
    </div>
  );
}
