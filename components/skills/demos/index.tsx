import clsx from "clsx";
import type { ReactNode } from "react";
import { IconCircleCheck, IconDots } from "@/components/icons";
import { firstExample } from "@/data/skills";
import { Pair } from "../pair";
import { Alignment, Glance } from "./alignment";
import { Deconstruct, Loop } from "./deconstruct";
import styles from "./styles.module.css";

type Part = "bar" | "side" | "cards";

function Window({ changed }: { changed: Part[] }) {
  const mark = (part: Part) => changed.includes(part) || undefined;

  return (
    <div className={styles.window}>
      <div className={styles.bar} data-changed={mark("bar")}>
        <span className={styles.logo} />
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
      <div className={styles.body}>
        <div className={styles.sidebar} data-changed={mark("side")}>
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className={styles.line} />
          ))}
        </div>
        <div className={styles.cards} data-changed={mark("cards")}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <span key={index} className={styles.block} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className={styles.card}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
}

function Row({ children, end }: { children: ReactNode; end?: ReactNode }) {
  return (
    <div className={styles.row}>
      <span>{children}</span>
      {end}
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

function Toggle({ on }: { on?: boolean }) {
  return <span className={styles.toggle} data-on={on || undefined} />;
}

function Code({ lines }: { lines: string[] }) {
  return (
    <pre className={styles.code}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </pre>
  );
}

function Wrong({ children }: { children: ReactNode }) {
  return <span className={styles.wrong}>{children}</span>;
}

function Scroller({ faded }: { faded?: boolean }) {
  return (
    <div className={styles.scroller} data-faded={faded || undefined}>
      <div className={styles.tiles}>
        {["Inbox", "Library", "Saves", "Boards", "Folders", "Trash"].map(
          (item) => (
            <div key={item} className={styles.tile}>
              {item}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const BOARD = [
  { part: "Top bar", source: "Pond", shape: "bars" },
  { part: "Empty state", source: "Are.na", shape: "empty" },
  { part: "Density", source: "Cosmos", shape: "grid" },
  { part: "Type scale", source: "Pinterest", shape: "type" },
  { part: "Filters", source: "Mobbin", shape: "chips" },
  { part: "Grouping", source: "Pond", shape: "groups" },
];

const VALUES = [
  { name: "Radius", guess: "12px", value: "6px" },
  { name: "Padding", guess: "16px", value: "10px 14px" },
  { name: "Duration", guess: "200ms", value: "150ms" },
];

const STATES = ["Rest", "Hover", "Pressed", "Focus", "Disabled", "Loading"];

const FINDINGS = [
  { level: "High", text: "Reset has no handler", at: "settings.tsx:42" },
  { level: "High", text: "Back button removed", at: "request 2" },
  { level: "Medium", text: "Local menu radius", at: "menu.tsx:7" },
];

const LAYOUTS = [
  { layout: "inline", label: "Inline" },
  { layout: "sidebar", label: "Sidebar" },
  { layout: "command", label: "Command Bar" },
] as const;

type Layout = (typeof LAYOUTS)[number]["layout"];

function Lines({ count }: { count: number }) {
  return Array.from({ length: count }, (_, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
    <span key={index} className={styles.line} />
  ));
}

function Variant({ layout }: { layout: Layout }) {
  return (
    <div className={styles.variant} data-layout={layout}>
      {layout === "sidebar" && (
        <div className={styles.rail}>
          <span className={styles.input} />
          <Lines count={3} />
        </div>
      )}
      <div className={styles.content}>
        {layout === "inline" && <span className={styles.input} />}
        <Lines count={4} />
      </div>
      {layout === "command" && (
        <div className={styles.palette}>
          <span className={styles.input} />
          <Lines count={2} />
        </div>
      )}
    </div>
  );
}

function Overlay({ aligned }: { aligned?: boolean }) {
  return (
    <div className={styles.compare}>
      <div className={styles.sources}>
        <div className={styles.state}>
          <span className={styles.sample}>
            <span className={styles.logo} />
            <span className={styles.line} />
          </span>
          <span className={styles.muted}>Reference</span>
        </div>
        <div className={styles.state}>
          <span className={styles.sample} data-off={!aligned || undefined}>
            <span className={styles.logo} />
            <span className={styles.line} />
          </span>
          <span className={styles.muted}>Rebuild</span>
        </div>
      </div>
      <div className={styles.values}>
        {VALUES.map((item) => (
          <span key={item.name}>
            <span className={styles.muted}>{item.name}</span>{" "}
            {aligned ? item.value : <Wrong>{item.guess}</Wrong>}
          </span>
        ))}
      </div>
    </div>
  );
}

export const demos: Record<string, ReactNode> = {
  scope: (
    <Pair
      ask={firstExample("scope")}
      notes={[
        "Shorter bar, plus a new sidebar and grid",
        "The bar changed and nothing else",
      ]}
      before={<Window changed={["bar", "side", "cards"]} />}
      after={<Window changed={["bar"]} />}
    />
  ),
  reuse: (
    <Pair
      ask={firstExample("reuse")}
      notes={["Three buttons, three local styles", "The project's own Button"]}
      before={
        <div className={styles.stack}>
          <Card>
            <Row
              end={
                <span className={styles.buttons}>
                  <span className={styles.button} data-variant="square">
                    Sort
                  </span>
                  <span className={styles.button} data-variant="pill">
                    Filter
                  </span>
                  <span className={styles.button} data-variant="outline">
                    View
                  </span>
                </span>
              }
            >
              Library
            </Row>
          </Card>
          <Code
            lines={[
              '<button className="sort">',
              '<div className="pill" onClick>',
              '<a className="view-btn">',
            ]}
          />
        </div>
      }
      after={
        <div className={styles.stack}>
          <Card>
            <Row
              end={
                <span className={styles.buttons}>
                  <span className={styles.button}>Sort</span>
                  <span className={styles.button}>Filter</span>
                  <span className={styles.button}>View</span>
                </span>
              }
            >
              Library
            </Row>
          </Card>
          <Code
            lines={[
              "<Button>Sort</Button>",
              "<Button>Filter</Button>",
              "<Button>View</Button>",
            ]}
          />
        </div>
      }
    />
  ),
  restraint: (
    <Pair
      ask={firstExample("restraint")}
      notes={["A tip, badges and a toast on top", "The list, nothing else"]}
      before={
        <div className={styles.stack}>
          <Card title="Boards">
            <div className={styles.tip}>Tip: drag boards to reorder them</div>
            <Row end={<span className={styles.badge}>128</span>}>Posters</Row>
            <Row end={<span className={styles.badge}>New</span>}>
              Interfaces
            </Row>
            <Row end={<span className={styles.badge}>42</span>}>Type</Row>
          </Card>
          <span className={styles.toast}>Boards loaded</span>
        </div>
      }
      after={
        <Card title="Boards">
          <Row>Posters</Row>
          <Row>Interfaces</Row>
          <Row>Type</Row>
        </Card>
      }
    />
  ),
  copy: (
    <Pair
      ask={firstExample("copy")}
      notes={[
        "Sentences, ids, an em dash and an ellipsis",
        "Title Case, short and plain",
      ]}
      before={
        <Card title="Sync">
          <Row end={<Toggle on />}>
            <Wrong>Enable auto sync</Wrong>
          </Row>
          <Row end={<span className={styles.muted}>Connected</span>}>
            <Wrong>instagram_graph</Wrong>
          </Row>
          <Row>
            <span className={styles.muted}>
              <Wrong>Synced &mdash; 2m ago</Wrong>
            </span>
          </Row>
          <div className={styles.actions}>
            <span className={styles.button}>
              <Wrong>Start Download...</Wrong>
            </span>
          </div>
        </Card>
      }
      after={
        <Card title="Sync">
          <Row end={<Toggle on />}>Auto Sync</Row>
          <Row end={<span className={styles.muted}>Connected</span>}>
            Instagram
          </Row>
          <Row>
            <span className={styles.muted}>Synced 2m ago</span>
          </Row>
          <div className={styles.actions}>
            <span className={styles.button}>Download</span>
          </div>
        </Card>
      }
    />
  ),
  defaults: (
    <Pair
      ask={firstExample("defaults")}
      notes={["Hard cut and clipped shadows", "Faded edges, shadows intact"]}
      before={<Scroller />}
      after={<Scroller faded />}
    />
  ),
  verify: (
    <Pair
      ask={firstExample("verify")}
      notes={["Done without looking", "Checked, and where to see it"]}
      before={
        <Bubble>Fixed the handler. Typecheck passes, so it should work.</Bubble>
      }
      after={
        <div className={styles.stack}>
          <Bubble>
            Fixed. I reloaded Settings and the toggle stays on. Open Settings,
            then General.
          </Bubble>
          <div className={styles.browser}>
            <span className={styles.url}>localhost:3000/settings</span>
            <Row end={<Toggle on />}>Auto Sync</Row>
          </div>
          <Checks items={["Toggled it on", "Reloaded the page"]} />
        </div>
      }
    />
  ),
  gather: (
    <Pair
      ask={firstExample("gather")}
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
              <div className={styles.image} data-shape={item.shape}>
                <span />
                <span />
                <span />
              </div>
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
      ask={firstExample("match")}
      notes={[
        "Values by eye, off by a few pixels",
        "Values read from the source",
      ]}
      before={<Overlay />}
      after={<Overlay aligned />}
    />
  ),
  rule: (
    <Pair
      ask={firstExample("rule")}
      notes={["A vague rule, nothing fixed", "The rule, its pair and a sweep"]}
      before={
        <div className={styles.file}>
          <span className={styles.muted}>AGENTS.md</span>
          <span className={styles.added}>Use good casing.</span>
        </div>
      }
      after={
        <div className={styles.stack}>
          <div className={styles.file}>
            <span className={styles.muted}>AGENTS.md</span>
            <span className={styles.added}>Labels take Title Case.</span>
            <span className={styles.added}>
              <Wrong>Add to library</Wrong>
            </span>
            <span className={styles.added}>Add to Library</span>
          </div>
          <Checks items={["Fixed 4 existing labels"]} />
        </div>
      }
    />
  ),
  ship: (
    <Pair
      ask={firstExample("ship")}
      notes={["Steps handed back to you", "Done to the end"]}
      before={
        <Bubble>
          Pushed. Run the release and check the deploy when ready.
        </Bubble>
      }
      after={
        <Card>
          {[
            { step: "Committed 3 changes", at: "a1f9c2e" },
            { step: "Pushed to main", at: "origin" },
            { step: "Checks passed", at: "1m 12s" },
            { step: "Live in production", at: "raphaelsalaja.com" },
          ].map((item) => (
            <Row
              key={item.step}
              end={<span className={styles.muted}>{item.at}</span>}
            >
              <span className={styles.check}>
                <IconCircleCheck size={14} />
                {item.step}
              </span>
            </Row>
          ))}
        </Card>
      }
    />
  ),
  prototype: (
    <Pair
      ask={firstExample("prototype")}
      notes={[
        "One built, the rest only described",
        "Three built, named by how they differ",
      ]}
      before={
        <div className={styles.stack}>
          <Variant layout="inline" />
          <Bubble>
            I could also try it in a sidebar or a command bar. Want me to?
          </Bubble>
        </div>
      }
      after={
        <div className={styles.variants}>
          {LAYOUTS.map((item) => (
            <div key={item.layout} className={styles.state}>
              <Variant layout={item.layout} />
              <span className={styles.muted}>{item.label}</span>
            </div>
          ))}
        </div>
      }
    />
  ),
  lab: (
    <Pair
      ask={firstExample("lab")}
      notes={["The resting state only", "Every state, open at once"]}
      before={
        <div className={styles.state}>
          <span className={styles.button}>Save</span>
          <span className={styles.muted}>Rest</span>
        </div>
      }
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
  deconstruct: (
    <Pair
      ask={firstExample("deconstruct")}
      notes={[
        "A guess from watching it once",
        "Every state, property and timing",
      ]}
      before={<Loop />}
      after={<Deconstruct />}
    />
  ),
  alignment: (
    <Pair
      ask={firstExample("alignment")}
      notes={["Looks aligned, by eye", "Measured, numbered and located"]}
      before={
        <Glance>
          <Bubble>Everything looks aligned.</Bubble>
        </Glance>
      }
      after={<Alignment />}
    />
  ),
  audit: (
    <Pair
      ask={firstExample("audit")}
      notes={["Taste, with no locations", "Numbered, ranked and located"]}
      before={
        <Bubble>Looks good overall, a few small things to tidy up.</Bubble>
      }
      after={
        <Card>
          {FINDINGS.map((finding, index) => (
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
          <div className={styles.verdict}>
            <span>Block</span>
            <span className={styles.muted}>2 high, 1 medium</span>
          </div>
        </Card>
      }
    />
  ),
};
