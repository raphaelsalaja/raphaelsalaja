"use client";

import styles from "./styles.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>Raphael Salaja — Engineering Feelings</h1>
      <p>
        I&apos;m someone who loves mixing different influences, genres and
        styles to create unique work. I enjoy pushing boundaries and exploring
        new ways to express myself without limitations.
      </p>
      <p>
        You can reach out to me on{" "}
        <a className={styles.link} href="https://x.com/raphaelsalaja">
          Twitter
        </a>{" "}
        or see more of my work on{" "}
        <a className={styles.link} href="https://github.com/raphaelsalaja">
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
