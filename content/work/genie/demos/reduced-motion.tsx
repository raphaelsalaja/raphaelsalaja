"use client";

import { useState } from "react";
import { ControlButton, Controls } from "@/components/controls";
import { Overview } from "./overview";
import styles from "./styles.module.css";

export function ReducedMotion() {
  const [reduce, setReduce] = useState(true);

  return (
    <div className={styles.demo} data-demo-id="reduced-motion">
      <Overview forceReduce={reduce} />
      <Controls>
        <ControlButton
          aria-pressed={reduce}
          onClick={() => setReduce((value) => !value)}
        >
          Reduce motion
        </ControlButton>
      </Controls>
    </div>
  );
}
