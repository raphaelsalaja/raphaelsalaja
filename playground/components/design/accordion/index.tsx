import * as Accordion from "@rs/design/accordion";

export const AccordionComponent = () => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>What is Base UI?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div>Base UI is a library of high-quality unstyled React components for design systems and web apps.</div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>How do I get started?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div>
            Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home.
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>Can I use it for my project?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div>Of course! Base UI is free and open source.</div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
};
