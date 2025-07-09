import * as DesignAccordion from "@rs/design/accordion";

export const Accordion = () => {
  return (
    <DesignAccordion.Root>
      <DesignAccordion.Item>
        <DesignAccordion.Header>
          <DesignAccordion.Trigger>What is Base UI?</DesignAccordion.Trigger>
        </DesignAccordion.Header>
        <DesignAccordion.Panel>
          <div>Base UI is a library of high-quality unstyled React components for design systems and web apps.</div>
        </DesignAccordion.Panel>
      </DesignAccordion.Item>

      <DesignAccordion.Item>
        <DesignAccordion.Header>
          <DesignAccordion.Trigger>How do I get started?</DesignAccordion.Trigger>
        </DesignAccordion.Header>
        <DesignAccordion.Panel>
          <div>
            Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home.
          </div>
        </DesignAccordion.Panel>
      </DesignAccordion.Item>

      <DesignAccordion.Item>
        <DesignAccordion.Header>
          <DesignAccordion.Trigger>Can I use it for my project?</DesignAccordion.Trigger>
        </DesignAccordion.Header>
        <DesignAccordion.Panel>
          <div>Of course! Base UI is free and open source.</div>
        </DesignAccordion.Panel>
      </DesignAccordion.Item>
    </DesignAccordion.Root>
  );
};
