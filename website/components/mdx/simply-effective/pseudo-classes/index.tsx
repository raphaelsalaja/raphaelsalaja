"use client";

import { color } from "motion/react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Anthropic, Grok, Meta, OpenAI } from "@/components/icons";
import styles from "./styles.module.css";

const size = {
  width: "48px",
  height: "48px",
};
const options = [
  {
    id: 1,
    label: "Anthropic",
    color: "oklch(0.7579 0.0734 56.66)",
    icon: <Anthropic className={styles.icon} style={size} />,
  },
  {
    id: 2,
    label: "Meta",
    color: "oklch(0.6144 0.204758 255.3392)",
    icon: <Meta className={styles.icon} style={size} />,
  },
  {
    id: 4,
    label: "OpenAI",
    color: "oklch(0.623 0.1214 169.5)",
    icon: <OpenAI className={styles.icon} style={size} />,
  },
  {
    id: 3,
    label: "xAI",
    color: "oklch(0 0 0)",
    icon: <Grok className={styles.icon} style={size} />,
  },
];

export function PseudoClasses() {
  const [selectedOption, setSelectedOption] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedOption(0);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.options}>
        {options.map((option) => (
          <button
            type="button"
            onClick={() => {
              setSelectedOption(option.id);
            }}
            className={styles.option}
            key={option.id}
            data-selected={option.id === selectedOption}
            style={{ "--bg": option.color } as CSSProperties}
          >
            <div className={styles.media}>{option.icon}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
