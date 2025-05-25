import { Shape6 } from "../posts/placeholder/shapes";
import styles from "./styles.module.scss";

export function Logo() {
  return (
    <div className={styles.logo}>
      <Shape6 key={4} className={styles.shape} />
    </div>
  );
}
