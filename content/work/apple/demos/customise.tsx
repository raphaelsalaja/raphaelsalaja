"use client";

import {
  genie,
  launch,
  type Spring,
  springboard,
  swiftui,
} from "@web-kits/springboard";
import { useOrigin } from "@web-kits/springboard/react";
import { useRef, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Highlighted, type Line } from "@/components/code-block/tokens";
import { Control, Controls } from "@/components/controls";
import { Showcase } from "@/components/showcase";
import { SPEED, SPEEDS, type Speed } from "@/content/work/genie/demos/shared";
import styles from "./customise.module.css";
import { COMPONENTS, type Component, LABELS, Popup, type Side } from "./popups";

const EFFECTS = ["Launch", "Genie"] as const;
const SPRINGS = ["SpringBoard", "Snappy", "Bouncy"] as const;
const GRIDS = ["4 × 3", "12 × 8", "24 × 16"] as const;
const FADES = ["Short", "Default", "Long"] as const;
const SIDES = ["Bottom", "Left", "Top", "Right"] as const;
const DURATIONS = ["0.5 s", "1 s", "2 s"] as const;
const SCALES = ["1/3", "1/2", "1"] as const;
const SWITCH = ["On", "Off"] as const;
const MOTIONS = ["User", "Always"] as const;

type Effect = (typeof EFFECTS)[number];
type Switch = (typeof SWITCH)[number];

const SPRING: Record<(typeof SPRINGS)[number], [string, Spring, Spring]> = {
  SpringBoard: ["springboard", springboard.open, springboard.close],
  Snappy: ["swiftui", swiftui.snappy, swiftui.snappy],
  Bouncy: ["swiftui", swiftui.bouncy, swiftui.bouncy],
};

const GRID = {
  "4 × 3": { columns: 4, rows: 3 },
  "12 × 8": { columns: 12, rows: 8 },
  "24 × 16": { columns: 24, rows: 16 },
};

const FADE = {
  Short: { in: 0.05, out: 0.05 },
  Default: { in: 0.15, out: 0.2 },
  Long: { in: 0.4, out: 0.5 },
};

const DURATION = { "0.5 s": 0.5, "1 s": 1, "2 s": 2 };

const SCALE = {
  "1/3": [1 / 3, "1 / 3"],
  "1/2": [1 / 2, "1 / 2"],
  "1": [1, "1"],
};

const NOTES = Array.from({ length: 6 }, (_, index) => index);

export function Customise() {
  const [effect, setEffect] = useState<Effect>("Launch");
  const [component, setComponent] = useState<Component>("Dialog");
  const [spring, setSpring] = useState<(typeof SPRINGS)[number]>("SpringBoard");
  const [grid, setGrid] = useState<(typeof GRIDS)[number]>("12 × 8");
  const [fade, setFade] = useState<(typeof FADES)[number]>("Default");
  const [home, setHome] = useState<Switch>("On");
  const [hide, setHide] = useState<Switch>("On");
  const [side, setSide] = useState<(typeof SIDES)[number]>("Bottom");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("1 s");
  const [scale, setScale] = useState<(typeof SCALES)[number]>("1/2");
  const [genieFade, setGenieFade] = useState<Switch>("Off");
  const [blur, setBlur] = useState<Switch>("Off");
  const [genieHide, setGenieHide] = useState<Switch>("Off");
  const [motion, setMotion] = useState<(typeof MOTIONS)[number]>("User");
  const [speed, setSpeed] = useState<Speed>("1×");
  const [debug, setDebug] = useState<Switch>("Off");

  const stage = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const notes = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const phase = useRef("Closed");

  const say = (text: string) => {
    if (readout.current) readout.current.textContent = text;
  };
  const reducedMotion = motion === "Always" ? "always" : "user";
  const playback = { speed: SPEED[speed], debug: debug === "On" };
  const isLaunch = effect === "Launch";
  const hideTarget = (isLaunch ? hide : genieHide) === "On";

  const [, open, close] = SPRING[spring];
  const popup = useOrigin({
    from: trigger,
    bounds: stage,
    effect: isLaunch
      ? launch({
          springs: { open, close },
          grid: GRID[grid],
          fade: FADE[fade],
          home: home === "On" ? notes : undefined,
        })
      : genie({
          edge: "auto",
          duration: DURATION[duration],
          scale: SCALE[scale][0] as number,
          fade: genieFade === "On",
          blur: blur === "On",
        }),
    hideTarget,
    reducedMotion,
    ...playback,
    onStart: (opening) => {
      phase.current = opening ? "Opening" : "Closing";
      say(phase.current);
    },
    onFrame: ({ progress }) =>
      say(`${phase.current} ${Math.round(progress * 100)}%`),
    onLand: (opened) => say(opened ? "Open" : "Closed"),
  });

  const shared = { component, hideTarget, reducedMotion, ...playback };

  return (
    <Showcase
      code={
        <CodeBlock data-title="note.tsx">
          <Highlighted
            lines={
              isLaunch
                ? launchCode({
                    ...shared,
                    spring,
                    grid: GRID[grid],
                    fade: FADE[fade],
                    home: home === "On",
                  })
                : genieCode({
                    ...shared,
                    duration: DURATION[duration],
                    scale: SCALE[scale][1] as string,
                    fade: genieFade === "On",
                    blur: blur === "On",
                  })
            }
          />
        </CodeBlock>
      }
    >
      <div className={styles.frame}>
        <div
          ref={stage}
          className={styles.stage}
          data-effect={isLaunch ? "launch" : "genie"}
          data-hide-target={isLaunch && hide === "Off" ? "off" : undefined}
        >
          <div ref={notes} className={styles.notes} aria-hidden>
            {NOTES.map((note) => (
              <div key={note} className={styles.note}>
                <span />
                <span />
              </div>
            ))}
          </div>
          <span ref={readout} className={styles.label}>
            Closed
          </span>
          <Popup
            key={`${effect}-${component}`}
            component={component}
            stage={stage}
            trigger={trigger}
            popup={popup}
            side={isLaunch ? "bottom" : (side.toLowerCase() as Side)}
          />
        </div>
        <Controls>
          <Control
            label="Effect"
            options={EFFECTS}
            value={effect}
            onChange={(next) => {
              setEffect(next);
              say("Closed");
            }}
          />
          <Control
            label="Component"
            options={COMPONENTS}
            value={component}
            onChange={(next) => {
              setComponent(next);
              say("Closed");
            }}
          />
          {isLaunch ? (
            <>
              <Control
                label="Springs"
                options={SPRINGS}
                value={spring}
                onChange={setSpring}
              />
              <Control
                label="Grid"
                options={GRIDS}
                value={grid}
                onChange={setGrid}
              />
              <Control
                label="Home"
                options={SWITCH}
                value={home}
                onChange={setHome}
              />
              <Control
                label="Hide Target"
                options={SWITCH}
                value={hide}
                onChange={setHide}
              />
              <Control
                label="Fade"
                options={FADES}
                value={fade}
                onChange={setFade}
              />
            </>
          ) : (
            <>
              <Control
                label="Target"
                options={SIDES}
                value={side}
                onChange={setSide}
              />
              <Control
                label="Duration"
                options={DURATIONS}
                value={duration}
                onChange={setDuration}
              />
              <Control
                label="Scale"
                options={SCALES}
                value={scale}
                onChange={setScale}
              />
              <Control
                label="Fade"
                options={SWITCH}
                value={genieFade}
                onChange={setGenieFade}
              />
              <Control
                label="Blur"
                options={SWITCH}
                value={blur}
                onChange={setBlur}
              />
              <Control
                label="Hide Target"
                options={SWITCH}
                value={genieHide}
                onChange={setGenieHide}
              />
            </>
          )}
          <Control
            label="Reduced Motion"
            options={MOTIONS}
            value={motion}
            onChange={setMotion}
          />
          <Control
            label="Speed"
            options={SPEEDS}
            value={speed}
            onChange={setSpeed}
          />
          <Control
            label="Debug"
            options={SWITCH}
            value={debug}
            onChange={setDebug}
          />
        </Controls>
      </div>
    </Showcase>
  );
}

const plain = (text: string) => [text] as const;
const keyword = (text: string) => [text, "keyword"] as const;
const string = (text: string) => [text, "string"] as const;
const constant = (text: string) => [text, "constant"] as const;
const fn = (text: string) => [text, "function"] as const;

const imports = (names: string, from: string): Line => [
  keyword("import"),
  plain(` { ${names} } `),
  keyword("from"),
  string(` "${from}"`),
  plain(";"),
];

const ref = (name: string): Line => [
  keyword("const "),
  constant(name),
  keyword(" ="),
  fn(" useRef"),
  plain("("),
  constant("null"),
  plain(");"),
];

const option = (name: string, ...value: Line): Line => [
  plain(`  ${name}: `),
  ...value,
  plain(","),
];

const eventLines = (progress: Line): Line[] => [
  [
    plain("  "),
    fn("onStart"),
    plain(": ("),
    plain("opening"),
    plain(") "),
    keyword("=>"),
    fn(" setStatus"),
    plain("(opening "),
    keyword("?"),
    string(' "Opening"'),
    keyword(" :"),
    string(' "Closing"'),
    plain("),"),
  ],
  [plain("  "), fn("onFrame"), plain(": "), ...progress, plain(",")],
  [
    plain("  "),
    fn("onLand"),
    plain(": (open) "),
    keyword("=>"),
    fn(" setStatus"),
    plain("(open "),
    keyword("?"),
    string(' "Open"'),
    keyword(" :"),
    string(' "Closed"'),
    plain("),"),
  ],
];

const importComponent = (component: Component): Line =>
  imports(component, `@base-ui/react/${component.toLowerCase()}`);

const markup = (component: Component, popup: string): Line[] => {
  const part = (name: string) => constant(`${component}.${name}`);
  const open = (depth: number, name: string, ...props: Line): Line => [
    plain(`${"  ".repeat(depth)}<`),
    part(name),
    ...props,
    plain(">"),
  ];
  const close = (depth: number, name: string): Line => [
    plain(`${"  ".repeat(depth)}</`),
    part(name),
    plain(">"),
  ];
  const prop = (name: string, value: Line[number]): Line => [
    fn(` ${name}`),
    keyword("="),
    plain("{"),
    value,
    plain("}"),
  ];
  const label: Line =
    component === "Select"
      ? [plain("<"), part("Value"), plain(" />")]
      : [plain(LABELS[component])];
  const trigger: Line = [
    ...open(1, "Trigger", ...prop("ref", plain("button"))),
    ...label,
    ...close(0, "Trigger"),
  ];
  const content = (depth: number): Line => [
    ...open(depth, "Popup", ...prop("ref", plain(popup))),
    plain("…"),
    ...close(0, "Popup"),
  ];
  const end: Line = [...close(0, "Root"), plain(";")];

  if (component === "Dialog") {
    return [
      open(0, "Root"),
      trigger,
      open(1, "Portal"),
      content(2),
      close(1, "Portal"),
      end,
    ];
  }
  return [
    open(0, "Root"),
    trigger,
    open(1, "Portal"),
    component === "Select"
      ? open(
          2,
          "Positioner",
          ...prop("alignItemWithTrigger", constant("false")),
        )
      : open(2, "Positioner"),
    content(3),
    close(2, "Positioner"),
    close(1, "Portal"),
    end,
  ];
};

const bool = (value: boolean) => constant(`${value}`);

type Shared = {
  component: Component;
  hideTarget: boolean;
  reducedMotion: string;
  speed: number;
  debug: boolean;
};

// `effect: launch({ … })`, with the effect's own options one level in.
const effectLines = (name: string, options: Line[]): Line[] => [
  [plain("  effect: "), fn(name), plain("({")],
  ...options.map((line): Line => [plain("  "), ...line]),
  [plain("  }),")],
];

const originCode = (
  options: Shared & { notes?: boolean },
  name: string,
  effect: Line[],
  presets = "",
): Line[] => [
  importComponent(options.component),
  imports([name, presets].filter(Boolean).join(", "), "@web-kits/springboard"),
  imports("useOrigin", "@web-kits/springboard/react"),
  [],
  ref("button"),
  ...(options.notes ? [ref("notes")] : []),
  [
    keyword("const "),
    constant("popup"),
    keyword(" ="),
    fn(" useOrigin"),
    plain("({"),
  ],
  option("from", plain("button")),
  ...effectLines(name, effect),
  option("hideTarget", bool(options.hideTarget)),
  option("reducedMotion", string(`"${options.reducedMotion}"`)),
  option("speed", constant(`${options.speed}`)),
  option("debug", bool(options.debug)),
  ...eventLines([
    plain("({ progress }) "),
    keyword("=>"),
    fn(" setProgress"),
    plain("(progress)"),
  ]),
  [plain("});")],
  [],
  ...markup(options.component, "popup"),
];

function launchCode(
  options: Shared & {
    spring: (typeof SPRINGS)[number];
    grid: { columns: number; rows: number };
    fade: { in: number; out: number };
    home: boolean;
  },
): Line[] {
  const [module] = SPRING[options.spring];
  const [open, close] =
    options.spring === "SpringBoard"
      ? ["springboard.open", "springboard.close"]
      : Array(2).fill(`swiftui.${options.spring.toLowerCase()}`);
  return originCode(
    { ...options, notes: options.home },
    "launch",
    [
      option("springs", plain(`{ open: ${open}, close: ${close} }`)),
      option(
        "grid",
        plain("{ columns: "),
        constant(`${options.grid.columns}`),
        plain(", rows: "),
        constant(`${options.grid.rows}`),
        plain(" }"),
      ),
      option(
        "fade",
        plain("{ in: "),
        constant(`${options.fade.in}`),
        plain(", out: "),
        constant(`${options.fade.out}`),
        plain(" }"),
      ),
      ...(options.home ? [option("home", plain("notes"))] : []),
    ],
    module,
  );
}

function genieCode(
  options: Shared & {
    duration: number;
    scale: string;
    fade: boolean;
    blur: boolean;
  },
): Line[] {
  return originCode(options, "genie", [
    option("edge", string('"auto"')),
    option("duration", constant(`${options.duration}`)),
    option("scale", constant(options.scale)),
    option("fade", bool(options.fade)),
    option("blur", bool(options.blur)),
  ]);
}
