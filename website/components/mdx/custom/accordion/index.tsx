import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from "@rs/design/accordion";

import { PlusIcon } from "lucide-react";

export const Accordion: React.FC = () => {
  return (
    <AccordionRoot style={{ maxWidth: "24rem" }}>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger
            className="red"
            style={{ display: "flex", alignItems: "center" }}
            audio={{
              onMouseDown: ["/sounds/tab/1.m4a"],
              onOpen: "/sounds/expand/1.m4a",
              onClose: "/sounds/collapse/1.m4a",
            }}
            icon={<PlusIcon />}
          >
            Why are SFX important?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Sound effects are important because they help create an immersive experience for the user.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger
            audio={{
              onMouseDown: ["/sounds/tab/1.m4a"],
              onOpen: "/sounds/expand/1.m4a",
              onClose: "/sounds/collapse/1.m4a",
            }}
            icon={<PlusIcon />}
          >
            When should I use SFX?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          In moderation, sound effects can enhance the user experience. However, overusing them can be distracting.
        </AccordionPanel>
      </AccordionItem>
    </AccordionRoot>
  );
};
