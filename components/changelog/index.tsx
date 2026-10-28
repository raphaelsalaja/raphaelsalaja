import { YearList, type YearListItem } from "@/components/library";
import { Section } from "@/components/section";
import { type ChangelogEntry, changelog } from "@/data/changelog";

const HOME_LIMIT = 6;

const toItem = (entry: ChangelogEntry): YearListItem => ({
  key: `${entry.date}-${entry.title}`,
  ...entry,
});

export function ChangelogList({ items }: { items: ChangelogEntry[] }) {
  return <YearList items={items.map(toItem)} />;
}

export function Changelog() {
  return (
    <Section
      id="changelog"
      title="Changelog"
      link={{ href: "/changelog", label: `All ${changelog.length}` }}
    >
      <ChangelogList items={changelog.slice(0, HOME_LIMIT)} />
    </Section>
  );
}
