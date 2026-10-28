import { Section } from "@/components/section";
import { StackList } from "@/components/stack-list";
import { career } from "@/data/career";

export function Career() {
  return (
    <Section id="career" title="Career">
      <StackList
        items={career.map((item) => ({
          href: item.href,
          title: item.company,
          description: item.role,
          icon: item.logo,
          meta: item.period,
        }))}
      />
    </Section>
  );
}
