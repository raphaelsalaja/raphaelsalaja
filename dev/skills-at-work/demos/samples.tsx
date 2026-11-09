"use client";

import { useState } from "react";
import {
  IconArrowDown,
  IconArrowLeft,
  IconBolt,
  IconCheck,
  IconCopy,
  IconLink,
  IconPauseFill,
  IconPlayFill,
} from "@/components/icons";
import { Pair } from "@/components/skills/pair";
import styles from "../styles.module.css";

function TextPair({
  notes,
  before,
  after,
}: {
  notes: [string, string];
  before: string;
  after: string;
}) {
  return <Pair notes={notes} before={<p>{before}</p>} after={<p>{after}</p>} />;
}

export function ScopeSample() {
  return (
    <TextPair
      notes={["The bar, plus a new sidebar", "Only the bar"]}
      before="Shorter top bar. Also rebuilt the sidebar and the card grid."
      after="Shorter top bar. The sidebar and the cards are unchanged."
    />
  );
}

export function ReuseSample() {
  return (
    <TextPair
      notes={["Three local buttons", "The project's Button"]}
      before={
        '<button className="sort">, <div className="pill">, <a className="view">'
      }
      after="<Button>Sort</Button>, <Button>Filter</Button>, <Button>View</Button>"
    />
  );
}

export function RestraintSample() {
  return (
    <TextPair
      notes={["A tip, badges and a toast", "The list"]}
      before="Boards, a drag tip, New badges and a toast that says Boards loaded."
      after="Boards. Posters, Interfaces, Type."
    />
  );
}

export function CopySample() {
  return (
    <TextPair
      notes={["Sentences, an id, an em dash", "Title Case, short and plain"]}
      before="Enable auto sync. instagram_graph. Synced — 2m ago."
      after="Auto Sync. Instagram. Synced 2m ago."
    />
  );
}

export function ProseSample() {
  return (
    <TextPair
      notes={[
        "A tour of the feature",
        "Where the author stands, then the numbers",
      ]}
      before="In this article we will explore the fascinating world of loading states and why they matter."
      after="I keep the skeleton. The spinner lost, because the layout jumped 40px. The 180ms fade is a guess until I measure it."
    />
  );
}

export function GatherSample() {
  return (
    <TextPair
      notes={["Links pasted in chat", "One board, each tile named"]}
      before="mobbin.com/screens/8f2a, pinterest.com/pin/6779, are.na/block/3301"
      after="Top bar from Pond. Empty state from Are.na. Density from Cosmos. Each tile links the source and names the part to take."
    />
  );
}

export function RuleSample() {
  return (
    <TextPair
      notes={["A vague line", "The rule, the pair, the sweep"]}
      before="AGENTS.md: Use good casing."
      after={
        'Labels take Title Case. "Add to library" becomes "Add to Library". Fixed 4 existing labels.'
      }
    />
  );
}

export function ShipSample() {
  return (
    <div className={styles.stack}>
      <ol className={styles.report}>
        {[
          "Read the diff and name the release.",
          "Commit, push and open or update the pull request.",
          "Watch the checks. Do not merge a red build.",
          "Merge, then confirm the production deploy is the commit you pushed.",
        ].map((step, index) => (
          <li key={step} className={styles.finding}>
            <span className={styles.number}>{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className={styles.note}>
        This page cannot commit or deploy. The list is the procedure.
      </p>
    </div>
  );
}

const FRAMES = {
  before: [16, 33, 50, 16, 48, 17, 33, 16],
  after: [16, 17, 16, 16, 17, 16, 16, 17],
};

export function FramesSample() {
  return (
    <div className={styles.stack}>
      <div className={styles.report}>
        <p>Open Command Palette, 4× CPU. Sample trace, not a live recording.</p>
        {(
          [
            ["Before", FRAMES.before],
            ["After", FRAMES.after],
          ] as const
        ).map(([name, frames]) => (
          <p key={name} className={styles.finding}>
            <span>{name}</span>
            <span className={styles.muted}>
              {frames.filter((ms) => ms > 17).length} frames over 17ms
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

const AUDIT = [
  {
    level: "High",
    text: "Reset has no handler",
    at: "settings.tsx:42",
    rule: "verify-click-new-controls",
  },
  {
    level: "High",
    text: "Back button removed",
    at: "request 2",
    rule: "scope-keep-what-worked",
  },
  {
    level: "Medium",
    text: "Local menu radius",
    at: "menu.tsx:7",
    rule: "reuse-no-local-restyle",
  },
];

export function AuditSample() {
  const [picked, setPicked] = useState<number[]>([]);
  const summary =
    picked.length === 0
      ? "Nothing picked"
      : `Picked ${picked.map((index) => index + 1).join(", ")}`;

  return (
    <div className={styles.stack}>
      <div className={styles.report}>
        <p>
          Scope: a sample diff, not this repository. 14 files. Verdict: Block.
        </p>
        {AUDIT.map((finding, index) => {
          const on = picked.includes(index);
          return (
            <button
              key={finding.rule}
              type="button"
              className={styles.choice}
              aria-pressed={on}
              onClick={() =>
                setPicked((current) =>
                  current.includes(index)
                    ? current.filter((item) => item !== index)
                    : [...current, index].sort((a, b) => a - b),
                )
              }
            >
              <span className={styles.number}>{index + 1}</span>
              <span>
                {finding.text}{" "}
                <span className={styles.muted}>
                  {finding.level}. {finding.rule}. {finding.at}
                </span>
              </span>
            </button>
          );
        })}
        <p role="status">{summary}</p>
      </div>
    </div>
  );
}

const ICONS = [
  ["Check", IconCheck],
  ["Copy", IconCopy],
  ["Bolt", IconBolt],
  ["Arrow Left", IconArrowLeft],
  ["Arrow Down", IconArrowDown],
  ["Link", IconLink],
  ["Play", IconPlayFill],
  ["Pause", IconPauseFill],
] as const;

export function IconsSample() {
  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        {ICONS.map(([name, Icon]) => (
          <span key={name} className={styles.button} title={name}>
            <Icon size={16} />
            <span className="sr-only">{name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
