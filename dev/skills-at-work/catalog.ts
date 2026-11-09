export const SKILLS_AT_WORK_MARKER = "skills-at-work-lab";

export type DemoLabel = "working" | "illustrative" | "unavailable";

export type SkillSource = { label: string; href: string };

export type SkillEntry = {
  name: string;
  group: "Principles" | "Procedures" | "Open Pull Requests";
  description: string;
  label: DemoLabel;
  sources: SkillSource[];
  note?: string;
  wide?: boolean;
};

const REPO = "https://github.com/raphaelsalaja/skills";

const onMain = (name: string): SkillSource => ({
  label: "Merged on main",
  href: `${REPO}/tree/main/skills/${name}`,
});

const pull = (number: number): SkillSource => ({
  label: `Open PR #${number}`,
  href: `${REPO}/pull/${number}`,
});

export const skills: SkillEntry[] = [
  {
    name: "scope",
    group: "Principles",
    description:
      "Changes exactly what was asked, keeps what already worked and finishes every item in the message.",
    label: "illustrative",
    sources: [onMain("scope")],
  },
  {
    name: "reuse",
    group: "Principles",
    description:
      "Reaches for the project's own components, then a maintained library, then a native feature, before writing new code.",
    label: "illustrative",
    sources: [onMain("reuse")],
  },
  {
    name: "restraint",
    group: "Principles",
    description:
      "Ships the smallest thing that does the job and deletes what nobody asked for.",
    label: "illustrative",
    sources: [onMain("restraint")],
  },
  {
    name: "copy",
    group: "Principles",
    description:
      "Writes interface labels in Title Case, short and plain, with one-line descriptions and no em dashes.",
    label: "illustrative",
    sources: [onMain("copy")],
  },
  {
    name: "prose",
    group: "Principles",
    description:
      "Writes posts and breakdowns that open on where the author stands, show the options that lost, give exact numbers and mark every guess as a guess.",
    label: "illustrative",
    sources: [onMain("prose")],
  },
  {
    name: "defaults",
    group: "Principles",
    description:
      "Applies house defaults for scroll edges, surfaces, type, sound, focus, forms, loading, hotkeys and dialogs.",
    label: "working",
    sources: [onMain("defaults")],
  },
  {
    name: "motion",
    group: "Principles",
    description:
      "Applies house motion for what animates, easing, durations, springs, gestures, exits, motion blur and reduced motion.",
    label: "working",
    sources: [onMain("motion")],
  },
  {
    name: "color",
    group: "Principles",
    description:
      "Holds text and control contrast to exact ratios, routes colour through role tokens and gives dark mode its own palette.",
    label: "working",
    sources: [onMain("color")],
  },
  {
    name: "verify",
    group: "Procedures",
    description:
      "Checks a change in the running app before calling it done, then says where to see it.",
    label: "working",
    sources: [onMain("verify")],
  },
  {
    name: "gather",
    group: "Procedures",
    description:
      "Collects references from the user's own library, their boards and pattern sites onto one linked board before a design is built.",
    label: "illustrative",
    sources: [onMain("gather")],
  },
  {
    name: "match",
    group: "Procedures",
    description:
      "Rebuilds a named reference from its real source and computed values, then compares the two side by side.",
    label: "working",
    sources: [onMain("match")],
  },
  {
    name: "rule",
    group: "Procedures",
    description:
      "Turns a repeated correction into a short project rule with the broken and fixed line, then applies it to existing code.",
    label: "illustrative",
    sources: [onMain("rule")],
  },
  {
    name: "viewports",
    group: "Procedures",
    description:
      "Renders a page at every width, each breakpoint edge, a short landscape phone and 200% text, then reports what overflows, clips or hides.",
    label: "working",
    sources: [onMain("viewports")],
    note: "The frames below are measured here. They are not separate browser windows.",
  },
  {
    name: "icons",
    group: "Procedures",
    description:
      "Draws missing icons in the project's own style, measured from the set it already has, then shows the set on one sheet.",
    label: "illustrative",
    sources: [onMain("icons")],
    note: "This sheet is the icon set already in the site. No new icon is drawn on this page.",
  },
  {
    name: "ship",
    group: "Procedures",
    description:
      "Commits, pushes, merges and releases a change, watches the checks and confirms it is live. Runs only when you call it.",
    label: "illustrative",
    sources: [onMain("ship")],
  },
  {
    name: "prototype",
    group: "Procedures",
    description:
      "Builds several real, labelled variants of one idea on a single page so the user can pick, then deletes the rest. Runs only when you call it.",
    label: "working",
    sources: [onMain("prototype")],
  },
  {
    name: "lab",
    group: "Procedures",
    description:
      "Builds a temporary page that shows every variant and state of real components at once. Runs only when you call it.",
    label: "working",
    sources: [onMain("lab")],
  },
  {
    name: "deconstruct",
    group: "Procedures",
    description:
      "Breaks an animation into a state machine and a timeline of every property, on a page you can scrub. Runs only when you call it.",
    label: "working",
    sources: [onMain("deconstruct")],
  },
  {
    name: "alignment",
    group: "Procedures",
    description:
      "Measures a running page for edges, gaps, centring and radii that miss by a pixel or two, then returns a numbered report. Runs only when you call it.",
    label: "working",
    sources: [onMain("alignment")],
  },
  {
    name: "keyboard",
    group: "Procedures",
    description:
      "Walks a running page with the keyboard alone, records every focus stop and reports controls it cannot reach or operate. Runs only when you call it.",
    label: "working",
    sources: [onMain("keyboard")],
    note: "Tab through the sample. The log records stops the browser focuses. A script cannot send a trusted Tab.",
  },
  {
    name: "frames",
    group: "Procedures",
    description:
      "Records a performance trace of one interaction on a throttled CPU, names what drops frames, then proves the fix with a second trace. Runs only when you call it.",
    label: "illustrative",
    sources: [onMain("frames")],
    note: "A DevTools trace at 4× CPU is not running here. The figure is a sample of the report.",
  },
  {
    name: "avatar",
    group: "Procedures",
    description:
      "Draws an object as a flat character with two capsule eyes, then animates the body so it glances, blinks and follows the pointer. Runs only when you call it.",
    label: "working",
    sources: [onMain("avatar")],
    note: "This is the coffee mascot already used on the site, which follows the avatar face.",
  },
  {
    name: "bots",
    group: "Procedures",
    description:
      "Turns chosen Grok Bots into a shakeable pile, with private details stripped. Runs only when you call it.",
    label: "working",
    sources: [onMain("bots")],
    note: "Same pile component as the bots page.",
  },
  {
    name: "sketchbook",
    group: "Procedures",
    description:
      "A batch of live interaction experiments you keep or kill. The open pull request frames that batch as one instrument page.",
    label: "working",
    sources: [onMain("sketchbook"), pull(8)],
    wide: true,
    note: "Choices stay in this page. The skill would write sketchbook/taste.md, and it would remove the gallery once every tile had a choice.",
  },
  {
    name: "audit",
    group: "Procedures",
    description:
      "Reviews a change against every skill in the collection and returns one ranked, numbered report. Runs only when you call it.",
    label: "illustrative",
    sources: [onMain("audit")],
    note: "Sample report. The collection was not run against this repository.",
  },
  {
    name: "tune",
    group: "Open Pull Requests",
    description:
      "Wires a dev-only knobs panel to one real component, then writes the settled values back into source and removes the panel.",
    label: "working",
    sources: [pull(4)],
    note: "DialKit is the panel this skill installs on React. It is not installed here, so these are range inputs bound to the card. Nothing is written back to source.",
  },
  {
    name: "cast",
    group: "Open Pull Requests",
    description:
      "Fills the real views with one named cast, totals that add up, and a short live script. Development only.",
    label: "working",
    sources: [pull(5)],
    note: "The control stands in for the ?demo switch. Both states render the same components.",
  },
  {
    name: "island",
    group: "Open Pull Requests",
    description:
      "Merges scattered live status into one morphing pill with compact, expanded and full sizes.",
    label: "working",
    sources: [pull(6)],
  },
  {
    name: "blueprint",
    group: "Open Pull Requests",
    description:
      "Draws a flat measured sheet of a running component. Gaps, type, colour and hit areas come from computed style.",
    label: "working",
    sources: [pull(7)],
    note: "The sheet is drawn here from the live card. drawing.png and reveal.mp4 are not exported.",
  },
  {
    name: "bones",
    group: "Open Pull Requests",
    description:
      "Gives an async view a skeleton measured from its loaded layout, and hands off without a jump.",
    label: "working",
    sources: [pull(9)],
  },
  {
    name: "palette",
    group: "Open Pull Requests",
    description:
      "Builds a command palette indexed from the app's routes and actions, opened with Command K or Control K.",
    label: "working",
    sources: [pull(10)],
    wide: true,
    note: "Commands come from this site's work and library data. There is no settings schema to crawl. /dev/skills is reported as uncovered.",
  },
  {
    name: "ticker",
    group: "Open Pull Requests",
    description:
      "Rolls the digits of a price, a count or a total that someone changes, and leaves ids, dates and fast meters still.",
    label: "working",
    sources: [pull(11)],
  },
  {
    name: "eclipse",
    group: "Open Pull Requests",
    description:
      "Turns a light and dark switch into a reveal that spreads from the toggle. Circle, wipe and soft mask.",
    label: "working",
    sources: [pull(12)],
    note: "The reveal is a document view transition from this toggle. Only the stage colours change, so the edge is visible where the pixels differ. The first-paint flash fix is a blocking script in the document head, which this stage does not install.",
  },
  {
    name: "charts",
    group: "Open Pull Requests",
    description:
      "Adds a snapping scrub, an anchored readout, a range morph, a one-time draw-in and a dark palette to a chart.",
    label: "working",
    sources: [pull(13)],
    wide: true,
  },
  {
    name: "preview",
    group: "Open Pull Requests",
    description:
      "Places a 1200 by 630 card in the X, iMessage, Slack and Discord frames, and checks the title and description limits.",
    label: "working",
    sources: [pull(14)],
    wide: true,
    note: "The card is drawn in this page. The crops and the character limits are the ones the skill specifies.",
  },
  {
    name: "wireframe",
    group: "Open Pull Requests",
    description:
      "Covers a running layout with filled shapes measured from the live boxes, on a hard left-to-right wipe.",
    label: "working",
    sources: [pull(15)],
    note: "The cover measures this fixture, one grey bar per text line, and wipes left to right both ways. Hover reads padding, gap and size from the live boxes. Cross-origin frames, canvas pixels and pseudo-elements are out of view.",
  },
  {
    name: "consistency",
    group: "Open Pull Requests",
    description:
      "Compares peer controls that share a component and a variant, across related screens, and grades each miss Observed, Inferred or DOM-confirmed.",
    label: "working",
    sources: [pull(16)],
    note: "Library and Settings are fixtures. Primary is compared with primary. Ghost stays its own variant. The numbers are read from computed style.",
  },
];

export const LABEL_TEXT: Record<DemoLabel, string> = {
  working: "Working demo",
  illustrative: "Illustrative example",
  unavailable: "Unavailable",
};

export const groups = [
  "Principles",
  "Procedures",
  "Open Pull Requests",
] as const;
