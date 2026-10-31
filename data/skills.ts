export const SKILLS_REPO = "raphaelsalaja/skills";
export const SKILLS_INSTALL = `npx skills add ${SKILLS_REPO}`;
export const SKILLS_GITHUB = `https://github.com/${SKILLS_REPO}`;
export const SKILLS_DIRECTORY = `https://skills.sh/${SKILLS_REPO}`;

type SkillKind = "principle" | "procedure";

export type Skill = {
  name: string;
  kind: SkillKind;
  description: string;
  examples: string[];
  userInvoked?: boolean;
};

const skills: Skill[] = [
  {
    name: "scope",
    kind: "principle",
    description:
      "Changes exactly what was asked, keeps what already worked and finishes every item in the message.",
    examples: [
      "/scope make the top bar shorter",
      "/scope fix the card padding and rename the Saves tab",
    ],
  },
  {
    name: "reuse",
    kind: "principle",
    description:
      "Reaches for the project's own components, then a maintained library, then a native feature, before writing new code.",
    examples: [
      "/reuse add sort, filter and view buttons",
      "/reuse add a date picker to the filters",
    ],
  },
  {
    name: "restraint",
    kind: "principle",
    description:
      "Ships the smallest thing that does the job and deletes what nobody asked for.",
    examples: [
      "/restraint add a list of my boards",
      "/restraint add an empty state to the inbox",
    ],
  },
  {
    name: "copy",
    kind: "principle",
    description:
      "Writes interface labels in Title Case, short and plain, with one-line descriptions and no em dashes.",
    examples: [
      "/copy the sync settings",
      "/copy the error messages for the upload flow",
    ],
  },
  {
    name: "defaults",
    kind: "principle",
    description:
      "Applies house defaults for scroll edges, surfaces, type, sound, focus, forms, loading, hotkeys and dialogs.",
    examples: [
      "/defaults make the sidebar scroll",
      "/defaults add a dialog for deleting a board",
    ],
  },
  {
    name: "motion",
    kind: "principle",
    description:
      "Applies house motion for what animates, easing, durations, springs, gestures, exits and reduced motion.",
    examples: [
      "/motion animate the sort menu",
      "/motion make the sheet draggable",
    ],
  },
  {
    name: "color",
    kind: "principle",
    description:
      "Holds text and control contrast to exact ratios, routes colour through role tokens and gives dark mode its own palette.",
    examples: [
      "/color the settings form",
      "/color the dark theme for the library",
    ],
  },
  {
    name: "verify",
    kind: "procedure",
    description:
      "Checks a change in the running app before calling it done, then says where to see it.",
    examples: [
      "/verify the sync toggle saves",
      "/verify the settings page on mobile",
    ],
  },
  {
    name: "gather",
    kind: "procedure",
    description:
      "Collects references from the user's own library, their boards and pattern sites onto one linked board before a design is built.",
    examples: [
      "/gather references for the library page",
      "/gather how other apps handle onboarding",
    ],
  },
  {
    name: "match",
    kind: "procedure",
    description:
      "Rebuilds a named reference from its real source and computed values, then compares the two side by side.",
    examples: [
      "/match this card to the reference",
      "/match this sidebar one to one",
    ],
  },
  {
    name: "rule",
    kind: "procedure",
    description:
      "Turns a repeated correction into a short project rule with the broken and fixed line, then applies it to existing code.",
    examples: [
      "/rule labels take Title Case",
      "/rule no em dashes in the copy",
    ],
  },
  {
    name: "viewports",
    kind: "procedure",
    description:
      "Renders a page at every width, each breakpoint edge, a short landscape phone and 200% text, then reports what overflows, clips or hides.",
    examples: [
      "/viewports the pricing page",
      "/viewports the settings dialog on a phone",
    ],
  },
  {
    name: "ship",
    kind: "procedure",
    userInvoked: true,
    description:
      "Commits, pushes, merges and releases a change, watches the checks and confirms it is live.",
    examples: ["/ship", "/ship the settings fix as a patch"],
  },
  {
    name: "prototype",
    kind: "procedure",
    userInvoked: true,
    description:
      "Builds several real, labelled variants of one idea on a single page so the user can pick, then deletes the rest.",
    examples: [
      "/prototype three layouts for the search",
      "/prototype a denser filter bar",
    ],
  },
  {
    name: "lab",
    kind: "procedure",
    userInvoked: true,
    description:
      "Builds a temporary page that shows every variant and state of real components at once, each linked to its source.",
    examples: ["/lab the button", "/lab the menu components"],
  },
  {
    name: "deconstruct",
    kind: "procedure",
    userInvoked: true,
    description:
      "Breaks an animation or interaction into a state machine and a timeline of every property, on a page you can scrub and edit.",
    examples: [
      "/deconstruct the copy button",
      "/deconstruct the drawer animation in this recording",
    ],
  },
  {
    name: "alignment",
    kind: "procedure",
    userInvoked: true,
    description:
      "Measures a running page for edges, gaps, centring and radii that miss by a pixel or two, then judges visual weight and returns a numbered report with proof.",
    examples: ["/alignment the pricing cards", "/alignment the settings page"],
  },
  {
    name: "keyboard",
    kind: "procedure",
    userInvoked: true,
    description:
      "Walks a running page with the keyboard alone, records every focus stop and reports controls it cannot reach, see or operate.",
    examples: ["/keyboard the settings dialog", "/keyboard the command menu"],
  },
  {
    name: "frames",
    kind: "procedure",
    userInvoked: true,
    description:
      "Records a performance trace of one interaction on a throttled CPU, names what drops frames or delays input, then proves the fix with a second trace.",
    examples: [
      "/frames opening the command palette",
      "/frames dragging the sheet",
    ],
  },
  {
    name: "avatar",
    kind: "procedure",
    userInvoked: true,
    description:
      "Draws any object as a flat character with two capsule eyes, then animates its whole body so it glances, blinks, breathes, follows the pointer and falls asleep.",
    examples: [
      "/avatar a coffee cup for the support card",
      "/avatar a matcha tin that watches the newsletter form",
    ],
  },
  {
    name: "audit",
    kind: "procedure",
    userInvoked: true,
    description:
      "Reviews a change, a session or a whole codebase against every skill in this collection and returns one ranked, numbered report.",
    examples: ["/audit the uncommitted diff", "/audit the whole codebase"],
  },
];

export function firstExample(name: string) {
  return skills.find((skill) => skill.name === name)?.examples[0];
}

export const principles = skills.filter((skill) => skill.kind === "principle");
export const procedures = skills.filter((skill) => skill.kind === "procedure");
