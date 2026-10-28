"use client";

import clsx from "clsx";
import { motion, type Transition } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Heading {
  id: string;
  title: string;
  level: "h2" | "h3";
}

const ACTIVE_OFFSET = 136;

const transition: Transition = {
  default: { ease: [0.25, 0.1, 0.25, 1], duration: 0.2 },
  opacity: { ease: [0.25, 0.1, 0.25, 1], duration: 0.1 },
};

export function Outline() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        "article h2[id]:not(#footnote-label), article h3[id]",
      ),
    );

    setHeadings(
      elements.map((element) => ({
        id: element.id,
        title: element.textContent ?? "",
        level: element.localName as Heading["level"],
      })),
    );

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = elements.findLast(
          (element) => element.getBoundingClientRect().top <= ACTIVE_OFFSET,
        );
        setActiveId((current ?? elements[0])?.id);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={styles.minimized}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: open ? 0 : 1, scale: 0.8, transition }}
      >
        {headings.map((heading) => (
          <div
            key={heading.id}
            className={clsx(styles.line, styles[heading.level])}
            data-active={heading.id === activeId}
          />
        ))}
      </motion.div>

      <motion.nav
        aria-label="On this page"
        className={styles.expanded}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          x: open ? 0 : -16,
          scale: open ? 1 : 0.8,
          opacity: open ? 1 : 0,
          transition,
        }}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
      >
        <ol className={styles.list}>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={clsx(styles.link, styles[heading.level])}
                aria-current={heading.id === activeId ? "location" : undefined}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ol>
      </motion.nav>
    </>
  );
}
