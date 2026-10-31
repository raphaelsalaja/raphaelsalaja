import clsx from "clsx";
import type { ReactNode } from "react";
import { IconCircleCheck, IconDots } from "@/components/icons";
import { firstExample } from "@/data/skills";
import { Alignment, Glance } from "./alignment";
import { Deconstruct, Loop } from "./deconstruct";
import styles from "./styles.module.css";

export type Demo = {
  ask?: string;
  notes: [string, string];
  before: ReactNode;
  after: ReactNode;
};

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
  {
    level: "High",
    text: "Reset has no handler",
    at: "settings.tsx:42",
    rule: "verify-click-new-controls",
    picked: true,
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
    picked: true,
  },
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
          <span key={item.name} className={clsx(aligned && styles.check)}>
            {aligned && <IconCircleCheck size={14} />}
            <span>
              <span className={styles.muted}>{item.name}</span>{" "}
              {aligned ? item.value : <Wrong>{item.guess}</Wrong>}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Dropdown({ origin }: { origin: "center" | "trigger" }) {
  return (
    <div className={styles.dropdown}>
      <span className={styles.button}>Sort</span>
      <div className={styles.menu}>
        <Lines count={3} />
        <span className={styles.origin} data-at={origin} />
      </div>
    </div>
  );
}

function Ratio({ value, passes }: { value: string; passes?: boolean }) {
  return passes ? (
    <span className={styles.check}>
      <IconCircleCheck size={14} />
      {value}
    </span>
  ) : (
    <Wrong>{value}</Wrong>
  );
}

function Contrast({ passes }: { passes?: boolean }) {
  const faint = !passes || undefined;

  return (
    <Card title="Profile">
      <Row end={<Ratio value={passes ? "3.5:1" : "1.3:1"} passes={passes} />}>
        <span className={styles.field} data-faint={faint}>
          raphael@pond.so
        </span>
      </Row>
      <Row end={<Ratio value={passes ? "4.7:1" : "2.8:1"} passes={passes} />}>
        <span className={styles.hint} data-faint={faint}>
          Used to sign in
        </span>
      </Row>
    </Card>
  );
}

const SCREENS = [
  { width: 320, height: 568, spills: true },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

function Screen({ width, height, spills }: (typeof SCREENS)[number]) {
  return (
    <div className={styles.state}>
      <div
        className={styles.screen}
        data-spills={spills || undefined}
        style={{ width: width / 14, height: height / 14 }}
      >
        <span className={styles.bit} />
        <span className={styles.bit} />
        <span className={styles.bit} data-spill={spills || undefined} />
      </div>
      <span className={styles.muted}>{width}</span>
    </div>
  );
}

const STOPS = [
  { role: "Button", name: "Close" },
  { role: "Textbox", name: "Display Name" },
  {
    role: "Switch",
    name: "Notifications",
    fails: "Space does nothing",
  },
  { role: "Button", name: "Save" },
];

const TRACES = {
  before: [
    16, 17, 16, 33, 50, 16, 17, 48, 16, 33, 16, 17, 16, 50, 33, 16, 17, 16, 33,
    16, 16, 17, 48, 16,
  ],
  after: [
    16, 17, 16, 16, 17, 16, 16, 17, 16, 16, 17, 16, 16, 17, 16, 16, 17, 16, 16,
    17, 16, 16, 17, 16,
  ],
};

const dropped = (frames: number[]) =>
  `${frames.filter((ms) => ms > 17).length} dropped`;

function Trace({ frames }: { frames: number[] }) {
  return (
    <span className={styles.trace}>
      {frames.map((ms, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed recording
          key={index}
          className={styles.tick}
          data-dropped={ms > 17 || undefined}
          style={{ height: `${(ms / 50) * 100}%` }}
        />
      ))}
    </span>
  );
}

export const demos: Record<string, Demo> = {
  scope: {
    ask: firstExample("scope"),
    notes: [
      "Shorter bar, plus a new sidebar and grid",
      "The bar changed and nothing else",
    ],
    before: <Window changed={["bar", "side", "cards"]} />,
    after: <Window changed={["bar"]} />,
  },
  reuse: {
    ask: firstExample("reuse"),
    notes: ["Three buttons, three local styles", "The project's own Button"],
    before: (
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
    ),
    after: (
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
    ),
  },
  restraint: {
    ask: firstExample("restraint"),
    notes: ["A tip, badges and a toast on top", "The list, nothing else"],
    before: (
      <div className={styles.stack}>
        <Card title="Boards">
          <div className={styles.tip}>Tip: drag boards to reorder them</div>
          <Row end={<span className={styles.badge}>128</span>}>Posters</Row>
          <Row end={<span className={styles.badge}>New</span>}>Interfaces</Row>
          <Row end={<span className={styles.badge}>42</span>}>Type</Row>
        </Card>
        <span className={styles.toast}>Boards loaded</span>
      </div>
    ),
    after: (
      <Card title="Boards">
        <Row>Posters</Row>
        <Row>Interfaces</Row>
        <Row>Type</Row>
      </Card>
    ),
  },
  copy: {
    ask: firstExample("copy"),
    notes: [
      "Sentences, ids, an em dash and an ellipsis",
      "Title Case, short and plain",
    ],
    before: (
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
    ),
    after: (
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
    ),
  },
  defaults: {
    ask: firstExample("defaults"),
    notes: ["Hard cut and clipped shadows", "Faded edges, shadows intact"],
    before: <Scroller />,
    after: <Scroller faded />,
  },
  motion: {
    ask: firstExample("motion"),
    notes: ["Slow, from the centre, from zero", "Quick, from the trigger"],
    before: (
      <div className={styles.stack}>
        <Dropdown origin="center" />
        <Code
          lines={[
            "transition: all 500ms ease-out;",
            "transform-origin: center;",
            "scale: 0;",
          ]}
        />
      </div>
    ),
    after: (
      <div className={styles.stack}>
        <Dropdown origin="trigger" />
        <Code
          lines={[
            "transition: opacity 200ms, transform 200ms;",
            "transform-origin: top left;",
            "scale: 0.95;",
          ]}
        />
      </div>
    ),
  },
  color: {
    ask: firstExample("color"),
    notes: [
      "Greys that fail their ratio",
      "Measured on screen, every ratio clears",
    ],
    before: <Contrast />,
    after: <Contrast passes />,
  },
  verify: {
    ask: firstExample("verify"),
    notes: ["Done without looking", "Checked, and where to see it"],
    before: (
      <Bubble>Fixed the handler. Typecheck passes, so it should work.</Bubble>
    ),
    after: (
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
    ),
  },
  gather: {
    ask: firstExample("gather"),
    notes: ["Links pasted in chat", "One board, judged against your taste"],
    before: (
      <Bubble>
        Here are some references: mobbin.com/screens/8f2a,
        pinterest.com/pin/6779, are.na/block/3301
      </Bubble>
    ),
    after: (
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
    ),
  },
  match: {
    ask: firstExample("match"),
    notes: [
      "Values by eye, off by a few pixels",
      "Values read from the source, each one checked",
    ],
    before: <Overlay />,
    after: <Overlay aligned />,
  },
  rule: {
    ask: firstExample("rule"),
    notes: ["A vague rule, nothing fixed", "The rule, its pair and a sweep"],
    before: (
      <div className={styles.file}>
        <span className={styles.muted}>AGENTS.md</span>
        <span className={styles.added}>Use good casing.</span>
      </div>
    ),
    after: (
      <div className={styles.stack}>
        <div className={styles.file}>
          <span className={styles.muted}>AGENTS.md</span>
          <span className={styles.added}>Labels take Title Case.</span>
          <span className={styles.added}>
            <Wrong>Add to library</Wrong> becomes Add to Library
          </span>
        </div>
        <Checks items={["Fixed 4 existing labels"]} />
      </div>
    ),
  },
  viewports: {
    ask: firstExample("viewports"),
    notes: ["Judged from the media queries", "Every width rendered and named"],
    before: (
      <div className={styles.stack}>
        <Screen {...SCREENS[4]} />
        <Bubble>The grid collapses at md, so mobile is fine.</Bubble>
      </div>
    ),
    after: (
      <div className={styles.stack}>
        <div className={styles.screens}>
          {SCREENS.map((screen) => (
            <Screen key={screen.width} {...screen} />
          ))}
        </div>
        <span className={styles.muted}>
          At 320, the card scrolls sideways by 40px
        </span>
      </div>
    ),
  },
  ship: {
    ask: firstExample("ship"),
    notes: ["Steps handed back to you", "Done to the end"],
    before: (
      <Bubble>Pushed. Run the release and check the deploy when ready.</Bubble>
    ),
    after: (
      <Card>
        {[
          { step: "Committed", at: "fix(sync): save the toggle" },
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
    ),
  },
  prototype: {
    ask: firstExample("prototype"),
    notes: [
      "One built, the rest only described",
      "Three built on one page, ready to pick",
    ],
    before: (
      <div className={styles.stack}>
        <Variant layout="inline" />
        <Bubble>
          I could also try it in a sidebar or a command bar. Want me to?
        </Bubble>
      </div>
    ),
    after: (
      <div className={styles.stack}>
        <Variant layout="sidebar" />
        <div className={styles.switcher}>
          {LAYOUTS.map((item) => (
            <span
              key={item.layout}
              className={styles.option}
              data-active={item.layout === "sidebar" || undefined}
            >
              {item.label}
            </span>
          ))}
          <span className={styles.button}>Pick</span>
        </div>
      </div>
    ),
  },
  lab: {
    ask: firstExample("lab"),
    notes: ["The resting state only", "Every state, open at once"],
    before: (
      <div className={styles.state}>
        <span className={styles.button}>Save</span>
        <span className={styles.muted}>Rest</span>
      </div>
    ),
    after: (
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
    ),
  },
  deconstruct: {
    ask: firstExample("deconstruct"),
    notes: [
      "A guess from watching it once",
      "Every state, property and timing, editable",
    ],
    before: <Loop />,
    after: <Deconstruct />,
  },
  alignment: {
    ask: firstExample("alignment"),
    notes: ["Looks aligned, by eye", "Measured, numbered and located"],
    before: (
      <Glance>
        <Bubble>Everything looks aligned.</Bubble>
      </Glance>
    ),
    after: <Alignment />,
  },
  keyboard: {
    ask: firstExample("keyboard"),
    notes: ["Reach judged from the markup", "Every stop pressed and numbered"],
    before: (
      <Bubble>
        The dialog uses real buttons, so it works with the keyboard.
      </Bubble>
    ),
    after: (
      <Card>
        <Row end={<span className={styles.muted}>Tab, Shift+Tab</span>}>
          Settings Dialog
        </Row>
        {STOPS.map((stop, index) => (
          <div key={stop.name} className={styles.finding}>
            <span className={styles.number}>{index + 1}</span>
            <span className={styles.detail}>
              <span className={styles.summary}>
                <span>{stop.name}</span>
                <span className={styles.muted}>{stop.role}</span>
              </span>
              {stop.fails && (
                <span className={clsx(styles.level, styles.high)}>
                  {stop.fails}
                </span>
              )}
            </span>
          </div>
        ))}
      </Card>
    ),
  },
  frames: {
    ask: firstExample("frames"),
    notes: ["Smooth by feel", "Traced at 4×, before and after"],
    before: (
      <Bubble>Opened the palette a few times and it feels smooth.</Bubble>
    ),
    after: (
      <Card>
        <Row end={<span className={styles.muted}>4× CPU</span>}>
          Open Command Palette
        </Row>
        <Row end={<Wrong>{dropped(TRACES.before)}</Wrong>}>
          <span className={styles.recording}>
            <span className={styles.muted}>Before</span>
            <Trace frames={TRACES.before} />
          </span>
        </Row>
        <Row
          end={<span className={styles.muted}>{dropped(TRACES.after)}</span>}
        >
          <span className={styles.recording}>
            <span className={styles.muted}>After</span>
            <Trace frames={TRACES.after} />
          </span>
        </Row>
      </Card>
    ),
  },
  audit: {
    ask: firstExample("audit"),
    notes: [
      "Taste, with no locations",
      "Ranked and located, you pick the fixes",
    ],
    before: <Bubble>Looks good overall, a few small things to tidy up.</Bubble>,
    after: (
      <Card>
        <Row end={<span className={styles.muted}>14 files</span>}>
          Uncommitted Diff
        </Row>
        {FINDINGS.map((finding, index) => (
          <div key={finding.text} className={styles.finding}>
            <span
              className={styles.number}
              data-picked={finding.picked || undefined}
            >
              {index + 1}
            </span>
            <span className={styles.detail}>
              <span className={styles.summary}>
                <span>{finding.text}</span>
                <span className={styles.muted}>{finding.at}</span>
              </span>
              <span className={styles.muted}>
                <span
                  className={clsx(
                    styles.level,
                    finding.level === "High" && styles.high,
                  )}
                >
                  {finding.level}
                </span>{" "}
                {finding.rule}
              </span>
            </span>
          </div>
        ))}
        <div className={styles.verdict}>
          <span>
            Block <span className={styles.muted}>2 high, 1 medium</span>
          </span>
          <span className={styles.button}>Copy Picks</span>
        </div>
      </Card>
    ),
  },
};
