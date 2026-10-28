import { Section } from "@/components/section";
import { SUPPORT_URL } from "@/components/support";

export function Coffee() {
  return (
    <Section id="support" title="Support">
      <p className="prose">
        If you've enjoyed my work or writing, you can{" "}
        <a href={SUPPORT_URL} target="_blank" rel="noopener">
          buy me a coffee
        </a>
        . It helps cover the costs of research, writing, and hosting.
      </p>
    </Section>
  );
}
