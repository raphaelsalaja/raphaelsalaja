import Link from "next/link";
import { IconArrowRight, IconCheck } from "@/components/icons";
import { firstExample } from "@/data/skills";
import styles from "./skills-frame.module.css";

const NOTES = [
  "Changed the bar, the sidebar and the grid",
  "Only the bar changed",
] as const;

const BLOCKS = [0, 1, 2, 3, 4, 5];
const LINES = [0, 1, 2, 3];

type Part = "bar" | "side" | "grid";

function Cross() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M3.5 3.5l5 5m0-5l-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Window({
  side,
  changed,
}: {
  side: "before" | "after";
  changed: Part[];
}) {
  const mark = (part: Part) => changed.includes(part) || undefined;

  return (
    <div className={styles.window} data-side={side}>
      <div className={styles.top} data-changed={mark("bar")}>
        <span className={styles.logo} />
        <span className={styles.dash} />
        <span className={styles.dash} />
        <span className={styles.dash} />
      </div>
      <div className={styles.body}>
        <div className={styles.side} data-changed={mark("side")}>
          {LINES.map((line) => (
            <span key={line} className={styles.dash} />
          ))}
        </div>
        <div className={styles.grid} data-changed={mark("grid")}>
          {BLOCKS.map((block) => (
            <span key={block} className={styles.block} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsFrame() {
  const ask = firstExample("scope");

  return (
    <Link
      href="/skills"
      className={styles.frame}
      aria-label="Skills. Agent skills for building interfaces with coding agents."
    >
      <div className={styles.stage} aria-hidden="true">
        {ask && <div className={styles.ask}>{ask}</div>}
        <div className={styles.scene}>
          <Window side="before" changed={["bar", "side", "grid"]} />
          <Window side="after" changed={["bar"]} />
        </div>
      </div>
      <div className={styles.toolbar}>
        <span className={styles.mark} aria-hidden="true">
          <span className={styles.glyph} data-side="before">
            <Cross />
          </span>
          <span className={styles.glyph} data-side="after">
            <IconCheck size={12} strokeWidth={2} />
          </span>
        </span>
        <span className={styles.copy}>
          <h2 className={styles.title}>Skills</h2>
          <span className={styles.notes} aria-hidden="true">
            {NOTES.map((note, index) => (
              <span
                key={note}
                className={styles.note}
                data-side={index === 0 ? "before" : "after"}
              >
                {note}
              </span>
            ))}
          </span>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          <IconArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
