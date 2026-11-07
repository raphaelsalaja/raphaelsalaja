"use client";

import "@/styles/mdx.css";

import { useState } from "react";
import { Coffee } from "@/components/coffee";
import { Segmented } from "@/components/writing/segmented";
import {
  type DemoLabel,
  groups,
  LABEL_TEXT,
  SKILLS_AT_WORK_MARKER,
  type SkillEntry,
  skills,
} from "./catalog";
import { demos } from "./demos";
import styles from "./styles.module.css";

const FILTERS = ["All", "Working", "Illustrative", "Unavailable"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_LABEL: Record<Filter, DemoLabel | "all"> = {
  All: "all",
  Working: "working",
  Illustrative: "illustrative",
  Unavailable: "unavailable",
};

function visible(entry: SkillEntry, filter: Filter) {
  const wanted = FILTER_LABEL[filter];
  return wanted === "all" || entry.label === wanted;
}

export function SkillsAtWork() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = skills.filter((entry) => visible(entry, filter));
  const counts = {
    working: skills.filter((entry) => entry.label === "working").length,
    illustrative: skills.filter((entry) => entry.label === "illustrative")
      .length,
    unavailable: skills.filter((entry) => entry.label === "unavailable").length,
  };

  return (
    <article
      className={`prose ${styles.page}`}
      data-skills-at-work={SKILLS_AT_WORK_MARKER}
    >
      <header className={styles.intro}>
        <h1>Skills at Work</h1>
        <p className={styles.lede}>
          Every skill on main, plus the open pull requests, with the technique
          running where it can. A sample that is not the live technique is
          marked as an illustrative example.
        </p>
        <p className={styles.note}>
          This route is development only. A production build does not include
          the page or these demos.
        </p>
      </header>

      <div className={styles.tools}>
        <Segmented
          label="Show"
          options={FILTERS}
          value={filter}
          onChange={setFilter}
        />
        <label className={styles.jump}>
          Jump to
          <select
            defaultValue=""
            onChange={(event) => {
              const id = event.target.value;
              const node = document.getElementById(id);
              node?.scrollIntoView();
              node?.focus();
            }}
          >
            <option value="" disabled>
              Choose a skill
            </option>
            {shown.map((entry) => (
              <option key={entry.name} value={entry.name}>
                /{entry.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className={styles.counts}>
        {skills.length} skills. {counts.working} working, {counts.illustrative}{" "}
        illustrative, {counts.unavailable} unavailable.
      </p>

      {shown.length === 0 && (
        <p className={styles.missing} role="status">
          No skill is marked unavailable.
        </p>
      )}

      {groups.map((group) => {
        const entries = shown.filter((entry) => entry.group === group);
        if (entries.length === 0) return null;
        return (
          <section key={group} aria-labelledby={group}>
            <h2 id={group}>{group}</h2>
            {entries.map((entry) => (
              <SkillSection key={entry.name} entry={entry} />
            ))}
          </section>
        );
      })}
      <Coffee />
    </article>
  );
}

function SkillSection({ entry }: { entry: SkillEntry }) {
  const Demo = demos[entry.name];
  const label = Demo ? LABEL_TEXT[entry.label] : LABEL_TEXT.unavailable;

  return (
    <section className={styles.skill} aria-labelledby={`${entry.name}-title`}>
      <div className={styles.head}>
        <h3 id={`${entry.name}-title`} tabIndex={-1} className={styles.name}>
          /{entry.name}
        </h3>
        <div className={styles.sources}>
          <span className={styles.badge} data-label={entry.label}>
            {label}
          </span>
          {entry.sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener"
            >
              {source.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
      <p>{entry.description}</p>
      {entry.note && <p className={styles.note}>{entry.note}</p>}
      <div className={styles.slot}>
        {Demo ? (
          <Demo />
        ) : (
          <p className={styles.missing}>No demo for this skill.</p>
        )}
      </div>
    </section>
  );
}
