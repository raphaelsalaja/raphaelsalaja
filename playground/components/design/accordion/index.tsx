"use client";

import * as DesignAccordion from "@rs/design/accordion";

export const Accordion = () => {
  return (
    <DesignAccordion.Root>
      <DesignAccordion.Item>
        <DesignAccordion.Header>
          <DesignAccordion.Trigger>
            What is Base UI?
            <DesignAccordion.TriggerIcon />
          </DesignAccordion.Trigger>
        </DesignAccordion.Header>
        <DesignAccordion.Panel>
          <DesignAccordion.Content>
            Base UI is a library of high-quality unstyled React components for design systems and web apps.
          </DesignAccordion.Content>
        </DesignAccordion.Panel>
      </DesignAccordion.Item>

      <DesignAccordion.Item>
        <DesignAccordion.Header>
          <DesignAccordion.Trigger>
            How do I get started?
            <DesignAccordion.TriggerIcon />
          </DesignAccordion.Trigger>
        </DesignAccordion.Header>
        <DesignAccordion.Panel>
          <DesignAccordion.Content>
            Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home.
          </DesignAccordion.Content>
        </DesignAccordion.Panel>
      </DesignAccordion.Item>

      <DesignAccordion.Item>
        <DesignAccordion.Header>
          <DesignAccordion.Trigger>
            Can I use it for my project?
            <DesignAccordion.TriggerIcon />
          </DesignAccordion.Trigger>
        </DesignAccordion.Header>
        <DesignAccordion.Panel>
          <DesignAccordion.Content>Of course! Base UI is free and open source.</DesignAccordion.Content>
        </DesignAccordion.Panel>
      </DesignAccordion.Item>
    </DesignAccordion.Root>
  );
};
