export const SKILLS_REPO = "raphaelsalaja/skills";
export const SKILLS_INSTALL = `npx skills add ${SKILLS_REPO}`;
export const SKILLS_GITHUB = `https://github.com/${SKILLS_REPO}`;
export const SKILLS_DIRECTORY = `https://skills.sh/${SKILLS_REPO}`;

export type SkillKind = "principle" | "procedure";

export type Skill = {
  name: string;
  kind: SkillKind;
  description: string;
  userInvoked?: boolean;
};

export const skills: Skill[] = [
  {
    name: "scope",
    kind: "principle",
    description:
      "Changes exactly what was asked, keeps what already worked and finishes every item in the message.",
  },
  {
    name: "reuse",
    kind: "principle",
    description:
      "Reaches for the project's own components, then a maintained library, then a native feature, before writing new code.",
  },
  {
    name: "restraint",
    kind: "principle",
    description:
      "Ships the smallest thing that does the job and deletes what nobody asked for.",
  },
  {
    name: "copy",
    kind: "principle",
    description:
      "Writes interface labels in Title Case, short and plain, with one-line descriptions and no em dashes.",
  },
  {
    name: "defaults",
    kind: "principle",
    description:
      "Applies house defaults for scroll edges, surfaces, corners, focus, app chrome motion, hotkeys and stacked dialogs.",
  },
  {
    name: "verify",
    kind: "procedure",
    description:
      "Checks a change in the running app before calling it done, then says where to see it.",
  },
  {
    name: "gather",
    kind: "procedure",
    description:
      "Collects references from the user's own library, their boards and pattern sites onto one linked board before a design is built.",
  },
  {
    name: "match",
    kind: "procedure",
    description:
      "Rebuilds a named reference from its real source and computed values, then compares the two side by side.",
  },
  {
    name: "rule",
    kind: "procedure",
    description:
      "Turns a repeated correction into a short project rule with the broken and fixed line, then applies it to existing code.",
  },
  {
    name: "ship",
    kind: "procedure",
    userInvoked: true,
    description:
      "Commits, pushes, merges and releases a change, watches the checks and confirms it is live.",
  },
  {
    name: "prototype",
    kind: "procedure",
    userInvoked: true,
    description:
      "Builds several real, labelled variants of one idea on a single page so the user can pick, then deletes the rest.",
  },
  {
    name: "lab",
    kind: "procedure",
    userInvoked: true,
    description:
      "Builds a temporary page that shows every variant and state of real components at once, each linked to its source.",
  },
  {
    name: "audit",
    kind: "procedure",
    userInvoked: true,
    description:
      "Reviews a change, a session or a whole codebase against every skill in this collection and returns one ranked, numbered report.",
  },
];

export const principles = skills.filter((skill) => skill.kind === "principle");
export const procedures = skills.filter((skill) => skill.kind === "procedure");
