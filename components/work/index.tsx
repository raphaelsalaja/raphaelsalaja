import { Section } from "@/components/section";
import { StackList } from "@/components/stack-list";
import { experiments, projects, type WorkItem } from "@/data/work";

const toItem = (item: WorkItem) => ({
  href: item.href,
  title: item.title,
  description: item.description,
});

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <StackList items={projects.map(toItem)} />
    </Section>
  );
}

export function Experiments() {
  return (
    <Section id="experiments" title="Experiments">
      <StackList items={experiments.map(toItem)} />
    </Section>
  );
}
