import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./_gallery/styles.module.css";
import { Tile } from "./_gallery/tile";
import { DetentSlider } from "./_tiles/detent-slider";
import { FoldReveal } from "./_tiles/fold-reveal";
import { RollingCount } from "./_tiles/rolling-count";
import { ScrollInk } from "./_tiles/scroll-ink";
import { SlidingHover } from "./_tiles/sliding-hover";
import { SoftPress } from "./_tiles/soft-press";
import { SpotlightGrid } from "./_tiles/spotlight-grid";
import { StretchSwitch } from "./_tiles/stretch-switch";

export const metadata: Metadata = {
  title: "Sketchbook",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sketchbook</h1>
        <p className={styles.lede}>
          Batch 1. Play each tile, then keep or kill it.
        </p>
      </header>
      <div className={styles.grid}>
        <Tile
          name="Soft Press"
          note="Sinks on press and settles back with a small overshoot."
        >
          <SoftPress />
        </Tile>
        <Tile
          name="Sliding Hover"
          note="One pill follows the pointer across the links."
        >
          <SlidingHover />
        </Tile>
        <Tile
          name="Stretch Switch"
          note="The thumb widens while held, then travels."
        >
          <StretchSwitch />
        </Tile>
        <Tile name="Rolling Count" note="Each digit rolls on its own column.">
          <RollingCount />
        </Tile>
        <Tile
          name="Fold Reveal"
          note="Height follows the content while the text unblurs."
        >
          <FoldReveal />
        </Tile>
        <Tile
          name="Detent Slider"
          note="Drag or use arrow keys. Snaps to five stops."
        >
          <DetentSlider />
        </Tile>
        <Tile
          name="Scroll Ink"
          note="Words fill in as they scroll into view."
          wildcard
        >
          <ScrollInk />
        </Tile>
        <Tile
          name="Spotlight Grid"
          note="A soft light follows the pointer across the borders."
          wildcard
        >
          <SpotlightGrid />
        </Tile>
      </div>
    </div>
  );
}
