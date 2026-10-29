export const SKILLS_REPO = "raphaelsalaja/skills";
export const SKILLS_INSTALL = `npx skills add ${SKILLS_REPO}`;
export const SKILLS_GITHUB = `https://github.com/${SKILLS_REPO}`;
export const SKILLS_DIRECTORY = `https://skills.sh/${SKILLS_REPO}`;

export type SkillKind = "principle" | "procedure";

export type Skill = {
  name: string;
  kind: SkillKind;
  description: string;
  examples: string[];
  userInvoked?: boolean;
};

export const skills: Skill[] = [
  {
    name: "scope",
    kind: "principle",
    description:
      "Changes exactly what was asked, keeps what already worked and finishes every item in the message.",
    examples: [
      "Make the top bar shorter",
      "Fix the card padding and rename the Saves tab",
    ],
  },
  {
    name: "reuse",
    kind: "principle",
    description:
      "Reaches for the project's own components, then a maintained library, then a native feature, before writing new code.",
    examples: [
      "Add sort, filter and view buttons",
      "Add a date picker to the filters",
    ],
  },
  {
    name: "restraint",
    kind: "principle",
    description:
      "Ships the smallest thing that does the job and deletes what nobody asked for.",
    examples: ["Add a list of my boards", "Add an empty state to the inbox"],
  },
  {
    name: "copy",
    kind: "principle",
    description:
      "Writes interface labels in Title Case, short and plain, with one-line descriptions and no em dashes.",
    examples: [
      "Add the sync settings",
      "Write the error messages for the upload flow",
    ],
  },
  {
    name: "defaults",
    kind: "principle",
    description:
      "Applies house defaults for scroll edges, surfaces, corners, focus, app chrome motion, hotkeys and stacked dialogs.",
    examples: ["Make the sidebar scroll", "Add a dialog for deleting a board"],
  },
  {
    name: "verify",
    kind: "procedure",
    description:
      "Checks a change in the running app before calling it done, then says where to see it.",
    examples: [
      "The sync toggle doesn't save",
      "Check the settings page on mobile",
    ],
  },
  {
    name: "gather",
    kind: "procedure",
    description:
      "Collects references from the user's own library, their boards and pattern sites onto one linked board before a design is built.",
    examples: [
      "Find references for the library page",
      "How do other apps handle onboarding?",
    ],
  },
  {
    name: "match",
    kind: "procedure",
    description:
      "Rebuilds a named reference from its real source and computed values, then compares the two side by side.",
    examples: [
      "Rebuild this card from the reference",
      "Copy this sidebar one to one",
    ],
  },
  {
    name: "rule",
    kind: "procedure",
    description:
      "Turns a repeated correction into a short project rule with the broken and fixed line, then applies it to existing code.",
    examples: [
      "Labels take Title Case, I've said it twice",
      "Stop putting em dashes in the copy",
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
    examples: ["/prototype the search", "/prototype a denser filter bar"],
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
      "Breaks an animation or interaction into a state machine and a timeline of every property, on a page you can scrub through.",
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
    examples: ["/alignment the settings page", "/alignment the pricing cards"],
  },
  {
    name: "audit",
    kind: "procedure",
    userInvoked: true,
    description:
      "Reviews a change, a session or a whole codebase against every skill in this collection and returns one ranked, numbered report.",
    examples: ["/audit the diff", "/audit the whole codebase"],
  },
];

export function firstExample(name: string) {
  return skills.find((skill) => skill.name === name)?.examples[0];
}

export const principles = skills.filter((skill) => skill.kind === "principle");
export const procedures = skills.filter((skill) => skill.kind === "procedure");
