"use client";

import {
  CarrotCaret,
  CarrotContainer,
  type CarrotDescendant,
  CarrotInput,
  CarrotRoot,
} from "@rs/experiments/carrot";
import { useState } from "react";

import styles from "./styles.module.scss";

export const Caret: React.FC = () => {
  const [value, setValue] = useState<CarrotDescendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.title}>New Note</span>
        <span className={styles.date}>{`${date} - ${time}`}</span>
      </div>
      <CarrotRoot value={value} onChange={setValue}>
        <CarrotContainer>
          <CarrotCaret />
          <CarrotInput placeholder="Start writing..." spellCheck={false} />
        </CarrotContainer>
      </CarrotRoot>
    </div>
  );
};
