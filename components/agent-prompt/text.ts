import { SKILLS_INSTALL, SKILLS_REPO } from "@/data/skills";

const ORIGIN = "https://www.raphaelsalaja.com";

export function agentSource(path: string) {
  return `${ORIGIN}${path}.md`;
}

export function agentPrompt(path: string, title: string) {
  const source = agentSource(path);
  const task = path.startsWith("/work/")
    ? `Recreate ${title} in the current environment. Read ${source} and build what it describes.`
    : `Read ${title} at ${source} and apply it to the interface in the current environment.`;

  return `${task} Use the skills from ${SKILLS_REPO} for this task. If they are unavailable, run \`${SKILLS_INSTALL}\`, then find and read the skill files before continuing.`;
}
