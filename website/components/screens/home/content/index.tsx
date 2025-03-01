import styles from "./styles.module.scss";

export default function Content() {
  return (
    <div className={styles.about}>
      <div className={styles.title}>
        <h1>Raphael Salaja</h1>
        <span>—</span>
        <h1>Engineering Feelings</h1>
      </div>
      <p className={styles.about}>
        I’m someone who loves mixing different influences, genres and styles to
        create unique, innovative work. I enjoy pushing boundaries and exploring
        new ways to express myself without limitations.
      </p>
    </div>
  );
}
