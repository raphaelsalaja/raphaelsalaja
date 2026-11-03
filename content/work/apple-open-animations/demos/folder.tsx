"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { scaledSpring, TILES, usePrefersReducedMotion } from "./shared";
import styles from "./styles.module.css";

const DOTS = [
  { id: "notes-a", tile: 0 },
  { id: "maps-a", tile: 1 },
  { id: "photos-a", tile: 2 },
  { id: "music", tile: 3 },
  { id: "mail", tile: 4 },
  { id: "files", tile: 5 },
  { id: "notes-b", tile: 0 },
  { id: "maps-b", tile: 1 },
  { id: "photos-b", tile: 2 },
] as const;

export function Folder() {
  const [open, setOpen] = useState(false);
  const reduce = usePrefersReducedMotion();
  const transition = reduce ? { duration: 0.2 } : scaledSpring(0.5, 0.86, 1);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={styles.demo} data-demo-id="folder">
      <div className={styles.folderStage}>
        <div className={styles.wallpaper} aria-hidden>
          {TILES.slice(0, 8).map((tile) => (
            <span key={tile.id} className={styles.wallpaperIcon} />
          ))}
        </div>
        <motion.button
          type="button"
          className={styles.folderVeil}
          aria-label="Close folder"
          disabled={!open}
          animate={{ opacity: open ? 1 : 0 }}
          transition={transition}
          onClick={() => setOpen(false)}
        />
        <motion.button
          type="button"
          layout={!reduce}
          className={styles.folderButton}
          data-open={open || undefined}
          style={{ borderRadius: open ? 28 : 12 }}
          transition={transition}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? "Close folder" : "Open folder"}
          </span>
          {DOTS.map((dot) => (
            <motion.span
              key={dot.id}
              layout={!reduce}
              className={styles.folderIcon}
              style={{
                borderRadius: open ? 12 : 4,
                background: TILES[dot.tile].color,
              }}
              transition={transition}
            />
          ))}
        </motion.button>
      </div>
    </div>
  );
}
