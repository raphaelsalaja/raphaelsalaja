import styles from "./styles.module.scss";
import Content from "./content";
import Routes from "./routes";

export default function Home() {
  return (
    <div className={styles.layout}>
      <Content />
      <Routes />
    </div>
  );
}
