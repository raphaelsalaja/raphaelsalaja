import { Fragment } from "react";
import styles from "./scroll-ink.module.css";

const TEXT =
  "Good interfaces disappear. You stop noticing the button and start noticing the work. Every detail that holds still while you think is a detail someone argued for. Keep scrolling and the sentence finishes itself, one word at a time, until there is nothing left to read.";

export function ScrollInk() {
  return (
    // biome-ignore lint/a11y/noNoninteractiveTabindex: the scroll box has to be reachable by keyboard
    <div className={styles.scroller} tabIndex={0}>
      <p className={styles.text}>
        {TEXT.split(" ").map((word, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: the words never reorder
          <Fragment key={index}>
            <span className={styles.word}>{word}</span>{" "}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
