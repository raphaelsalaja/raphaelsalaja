"use client";

import { AnimatePresence, motion, type Transition, useMotionValue, useTransform } from "motion/react";
import React from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import type { HeadingLink } from "@/hooks/useTableOfContents";

import styles from "./styles.module.css";

interface TableOfContentsProps {
  headingLinks: HeadingLink[];
  contentIsActive: (id: string) => boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headingLinks, contentIsActive }) => {
  const { handleLinkClick } = useSmoothScroll(120);
  const [isHovered, setIsHovered] = React.useState(false);

  function getScale() {
    const length = headingLinks.length;
    // Use a linear interpolation to determine scale based on number of links
    // For fewer links (e.g., 1-5), start with a lower scale (0.5)
    // For many links (e.g., 50-80), use a higher scale (0.9) to avoid abrupt changes

    const minScale = 0.5; // Scale for minimal number of links
    const maxScale = 0.8; // Scale for maximum number of links
    const minLinks = 50; // Threshold for minimum links
    const maxLinks = 80; // Threshold for maximum links

    // Clamp the length between min and max link thresholds
    const clampedLength = Math.min(Math.max(length, minLinks), maxLinks);
    // Linear interpolation: scale = minScale + (maxScale - minScale) * (clampedLength - minLinks) / (maxLinks - minLinks)
    return minScale + (maxScale - minScale) * ((clampedLength - minLinks) / (maxLinks - minLinks));
  }

  const transition: Transition<any> | undefined = {
    default: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.2,
    },
    opacity: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.15,
    },
  };

  return (
    <React.Fragment>
      <motion.div
        style={{
          transformOrigin: "left center",
          zIndex: 1,
          y: "-50%",
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 1 : getScale(),
          transition: { ...transition },
        }}
        className={styles.minimized}
      >
        <AnimatePresence>
          <motion.div className={styles.list}>
            {headingLinks.map((link: HeadingLink) => (
              <motion.div
                key={link.id}
                data-selector={`#${link.tagName}`}
                data-active={contentIsActive(link.id) ? "true" : "false"}
                className={styles.line}
              >
                {link.title}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        style={{
          transformOrigin: "left center",
          zIndex: 2,
        }}
        animate={{
          y: "-50%",
          x: isHovered ? 0 : -16,
          scale: isHovered ? 1 : getScale(),
          opacity: isHovered ? 1 : 0,
          transition: { ...transition },
        }}
        className={styles.expanded}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          <motion.div className={styles.list}>
            {headingLinks.map((link: HeadingLink) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                data-selector={`#${link.tagName}`}
                data-active={contentIsActive(link.id) ? "true" : "false"}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={styles.link}
              >
                {link.title}
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </React.Fragment>
  );
};

export default TableOfContents;
