import { Library } from "@/components/library";
import { Work } from "@/components/work";
import About from "../about";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      <About />
      <section className={styles.sections}>
        <Work />
        <Library />
      </section>
    </div>
  );
}
