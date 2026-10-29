import clsx from "clsx";
import type { ReactNode } from "react";
import { IconCircleCheck, IconDots } from "@/components/icons";
import { Pair } from "../pair";
import styles from "./styles.module.css";

function Window({ changed }: { changed: ("bar" | "side" | "cards")[] }) {
  const mark = (part: "bar" | "side" | "cards") =>
    changed.includes(part) || undefined;

  return (
    <div className={styles.stack}>
      <span className={styles.quote}>"Make the top bar shorter"</span>
      <div className={styles.window}>
        <div className={styles.bar} data-changed={mark("bar")} />
        <div className={styles.body}>
          <div className={styles.sidebar} data-changed={mark("side")} />
          <div className={styles.cards}>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={styles.block}
                data-changed={(index < 2 && mark("cards")) || undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Rows({ rows }: { rows: ReactNode[] }) {
  return (
    <div className={styles.card}>
      {rows.map((row, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static rows
        <div key={index} className={styles.row}>
          {row}
        </div>
      ))}
    </div>
  );
}

function Bubble({ children }: { children: ReactNode }) {
  return <div className={styles.bubble}>{children}</div>;
}

function Checks({ items }: { items: string[] }) {
  return (
    <div className={styles.checks}>
      {items.map((item) => (
        <span key={item} className={styles.check}>
          <IconCircleCheck size={14} />
          {item}
        </span>
      ))}
    </div>
  );
}

function Scroller({ faded }: { faded?: boolean }) {
  return (
    <div className={styles.scroller} data-faded={faded || undefined}>
      {["Inbox", "Library", "Saves", "Boards", "Folders", "Trash"].map(
        (item) => (
          <div key={item} className={styles.tile}>
            {item}
          </div>
        ),
      )}
    </div>
  );
}

const BOARD = [
  { part: "Top bar", source: "Pond" },
  { part: "Empty state", source: "Are.na" },
  { part: "Density", source: "Cosmos" },
  { part: "Type scale", source: "Pinterest" },
  { part: "Filters", source: "Mobbin" },
  { part: "Grouping", source: "Pond" },
];

const STATES = ["Rest", "Hover", "Pressed", "Focus", "Disabled", "Loading"];

export const demos: Record<string, ReactNode> = {
  scope: (
    <Pair
      notes={["Asked for the top bar, got a new page", "Only the top bar"]}
      before={<Window changed={["bar", "side", "cards"]} />}
      after={<Window changed={["bar"]} />}
    />
  ),
  reuse: (
    <Pair
      notes={["Three local styles", "One shared Button"]}
      before={
        <div className={styles.buttons}>
          <span className={styles.button} data-variant="square">
            Sort
          </span>
          <span className={styles.button} data-variant="pill">
            Filter
          </span>
          <span className={styles.button} data-variant="outline">
            View
          </span>
        </div>
      }
      after={
        <div className={styles.buttons}>
          <span className={styles.button}>Sort</span>
          <span className={styles.button}>Filter</span>
          <span className={styles.button}>View</span>
        </div>
      }
    />
  ),
  restraint: (
    <Pair
      notes={[
        "Badges and a toast nobody asked for",
        "The list and nothing else",
      ]}
      before={
        <div className={styles.stack}>
          <Rows
            rows={[
              <>
                Posters <span className={styles.badge}>128</span>
              </>,
              <>
                Interfaces <span className={styles.badge}>New</span>
              </>,
              <>
                Type <span className={styles.badge}>42</span>
              </>,
            ]}
          />
          <span className={styles.toast}>Moved to Library</span>
        </div>
      }
      after={<Rows rows={["Posters", "Interfaces", "Type"]} />}
    />
  ),
  copy: (
    <Pair
      notes={[
        "Sentence case, ids and an em dash",
        "Title Case, plain and short",
      ]}
      before={
        <Rows
          rows={[
            "Add to library",
            "Start Download",
            "instagram_graph",
            <>Synced &mdash; 2m ago</>,
            "Loading...",
          ]}
        />
      }
      after={
        <Rows
          rows={[
            "Add to Library",
            "Start",
            "Instagram",
            "Synced 2m ago",
            "Loading",
          ]}
        />
      }
    />
  ),
  defaults: (
    <Pair
      notes={["Hard cut and clipped shadows", "Faded edges, shadows intact"]}
      before={<Scroller />}
      after={<Scroller faded />}
    />
  ),
  verify: (
    <Pair
      notes={["Done without looking", "Checked, and where to see it"]}
      before={<Bubble>Typecheck passes, so it should work now.</Bubble>}
      after={
        <div className={styles.stack}>
          <Bubble>
            Reloaded Settings and the toggle now persists. Open Settings, then
            General.
          </Bubble>
          <Checks items={["Opened in the browser", "Clicked Sync"]} />
        </div>
      }
    />
  ),
  gather: (
    <Pair
      notes={["Links pasted in chat", "One board, each part named"]}
      before={
        <Bubble>
          Here are some references: mobbin.com/screens/8f2a,
          pinterest.com/pin/6779, are.na/block/3301
        </Bubble>
      }
      after={
        <div className={styles.board}>
          {BOARD.map((item) => (
            <div key={item.part} className={styles.reference}>
              <div className={styles.image} />
              <span>{item.part}</span>
              <span className={styles.muted}>{item.source}</span>
            </div>
          ))}
        </div>
      }
    />
  ),
  match: (
    <Pair
      notes={["Values by eye", "Values read from the source"]}
      before={
        <Rows
          rows={[
            <>
              Radius <span className={styles.guess}>8px</span>
            </>,
            <>
              Padding <span className={styles.guess}>12px</span>
            </>,
            <>
              Duration <span className={styles.guess}>200ms</span>
            </>,
          ]}
        />
      }
      after={
        <Rows
          rows={[
            <>
              Radius <span className={styles.value}>6px</span>
            </>,
            <>
              Padding <span className={styles.value}>10px 12px</span>
            </>,
            <>
              Duration <span className={styles.value}>150ms</span>
            </>,
          ]}
        />
      }
    />
  ),
  rule: (
    <Pair
      notes={["A rule with no example", "The rule and its pair"]}
      before={
        <div className={styles.file}>
          <span className={styles.muted}>AGENTS.md</span>
          <span>Use good casing.</span>
        </div>
      }
      after={
        <div className={styles.file}>
          <span className={styles.muted}>AGENTS.md</span>
          <span>Labels take Title Case.</span>
          <span className={styles.broken}>Add to library</span>
          <span className={styles.fixed}>Add to Library</span>
        </div>
      }
    />
  ),
  ship: (
    <Pair
      notes={["Steps handed back", "Done to the end"]}
      before={
        <Bubble>
          Pushed. Run the release and check the deploy when ready.
        </Bubble>
      }
      after={
        <Checks
          items={[
            "Committed 3 changes",
            "Pushed to main",
            "Checks passed",
            "Live in production",
          ]}
        />
      }
    />
  ),
  prototype: (
    <Pair
      notes={["Numbered variants", "Named by how they differ"]}
      before={
        <div className={styles.tabs}>
          <span data-active>Variant 1</span>
          <span>Variant 2</span>
          <span>Variant 3</span>
        </div>
      }
      after={
        <div className={styles.tabs}>
          <span data-active>Inline</span>
          <span>Sidebar</span>
          <span>Command Bar</span>
        </div>
      }
    />
  ),
  lab: (
    <Pair
      notes={["The resting state only", "Every state, open at once"]}
      before={<span className={styles.button}>Save</span>}
      after={
        <div className={styles.states}>
          {STATES.map((state) => (
            <div key={state} className={styles.state}>
              <span className={styles.button} data-state={state.toLowerCase()}>
                {state === "Loading" ? <IconDots size={14} /> : "Save"}
              </span>
              <span className={styles.muted}>{state}</span>
            </div>
          ))}
        </div>
      }
    />
  ),
  audit: (
    <Pair
      notes={["Taste, no locations", "Numbered, ranked and located"]}
      before={
        <Bubble>Looks good overall, a few small things to tidy up.</Bubble>
      }
      after={
        <div className={styles.card}>
          {[
            { level: "High", text: "Reset has no handler", at: "settings:42" },
            { level: "High", text: "Back button removed", at: "request 2" },
            { level: "Medium", text: "Local menu radius", at: "menu:7" },
          ].map((finding, index) => (
            <div key={finding.text} className={styles.finding}>
              <span className={styles.muted}>{index + 1}</span>
              <span className={styles.detail}>
                <span>{finding.text}</span>
                <span className={styles.muted}>
                  <span
                    className={clsx(
                      styles.level,
                      finding.level === "High" && styles.high,
                    )}
                  >
                    {finding.level}
                  </span>{" "}
                  {finding.at}
                </span>
              </span>
            </div>
          ))}
        </div>
      }
    />
  ),
};
