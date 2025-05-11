"use client";

import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";

import "./styles.css";
import { motion } from "motion/react";
import useSound from "use-sound";
import type { AudioSource } from "../types";

interface AccordionRootProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Root> {}
/**
 * Groups all parts of the accordion.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const Accordion: React.FC<AccordionRootProps> = ({ keepMounted = true, ...props }) => {
  return <BaseAccordion.Root data-shunpo-accordion keepMounted={keepMounted} {...props} />;
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Item> {}
/**
 * Groups an accordion header with the corresponding panel.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const AccordionItem: React.FC<AccordionItemProps> = (props) => {
  return (
    <BaseAccordion.Item
      {...props}
      data-shunpo-accordion-item
      render={({ hidden, ...rest }, { open }) => {
        return (
          <motion.div
            whileTap={{ scale: 0.98 }}
            drag
            dragElastic={0.1}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            whileDrag={{ filter: "brightness(.98)" }}
            whileHover={{ filter: "brightness(.98)" }}
          >
            <div {...rest} />
          </motion.div>
        );
      }}
    />
  );
};

interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Header> {}
/**
 * A heading that labels the corresponding panel.
 * Renders an <h3> element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const AccordionHeader: React.FC<AccordionHeaderProps> = (props) => {
  return <BaseAccordion.Header data-shunpo-accordion-header {...props} />;
};

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger> {
  icon?: React.ReactNode;
  audio?: {
    onMouseDown?: AudioSource;
    onMouseUp?: AudioSource;
    onOpen?: AudioSource;
    onClose?: AudioSource;
  };
}
/**
 * A button that opens and closes the corresponding panel. Renders a <button> element.
 * Renders a `<button>` element.
 *
 * @param icon - An icon that indicates the state of the accordion.
 * @param audio - Audio files to play on different events. Accepts an object with the following
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ icon, audio, children, ...props }) => {
  const [onMouseDown] = useSound(audio?.onMouseDown || "", {
    playbackRate: Math.random() * 0.2 + 0.9,
  });

  const [onMouseUp] = useSound(audio?.onMouseUp || "", {
    playbackRate: Math.random() * 0.2 + 0.9,
  });

  const [onOpen] = useSound(audio?.onOpen || "", {
    playbackRate: Math.random() * 0.2 + 0.9,
  });

  const [onClose] = useSound(audio?.onClose || "", {
    playbackRate: Math.random() * 0.2 + 0.9,
  });

  return (
    <BaseAccordion.Trigger
      {...props}
      render={({ hidden, ...rest }, { open }) => {
        return (
          <button
            {...rest}
            onMouseUp={(e) => {
              onMouseUp();
              rest.onMouseUp?.(e);
            }}
            onMouseDown={(e) => {
              onMouseDown();
              rest.onMouseDown?.(e);
            }}
            onClick={(e) => {
              open ? onClose() : onOpen();
              rest.onClick?.(e);
            }}
            data-shunpo-accordion-trigger
          >
            {children}
            {icon && <AccordionIcon icon={icon} />}
          </button>
        );
      }}
    />
  );
};

interface AccordionIconProps extends React.ComponentPropsWithoutRef<"span"> {
  icon: React.ReactNode;
}
/**
 * An icon that indicates the state of the accordion.
 * Renders a `<span>` element.
 */
const AccordionIcon: React.FC<AccordionIconProps> = ({ icon, ...props }) => {
  return (
    <span data-shunpo-accordion-icon {...props}>
      {icon}
    </span>
  );
};

interface AccordionPanelProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel> {}
/**
 * A collapsible panel with the accordion item contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const AccordionPanel: React.FC<AccordionPanelProps> = (props) => {
  return (
    <BaseAccordion.Panel
      {...props}
      keepMounted
      render={({ hidden, ...props }, { open }) => {
        return (
          <motion.div
            style={{
              height: open ? "auto" : 0,
              overflow: "hidden",
            }}
            animate={{
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <div data-shunpo-accordion-panel {...props} />
          </motion.div>
        );
      }}
    />
  );
};

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionIcon, AccordionPanel };
