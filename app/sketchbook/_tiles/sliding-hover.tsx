"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import styles from "./sliding-hover.module.css";

const links = ["Work", "Library", "Skills", "Bots"] as const;

const spring = { type: "spring", bounce: 0.18, duration: 0.3 } as const;

export function SlidingHover() {
  const id = useId();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className={styles.nav} onPointerLeave={() => setHovered(null)}>
      {links.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          className={styles.link}
          onPointerEnter={() => setHovered(link)}
          onFocus={() => setHovered(link)}
          onBlur={() => setHovered(null)}
          onClick={(event) => event.preventDefault()}
        >
          <AnimatePresence>
            {hovered === link && (
              <motion.span
                layoutId={`${id}-pill`}
                className={styles.pill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={spring}
              />
            )}
          </AnimatePresence>
          <span className={styles.label}>{link}</span>
        </a>
      ))}
    </nav>
  );
}
