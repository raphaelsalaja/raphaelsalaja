"use client";

import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";

import "./styles.css";
import React from "react";

interface AccordionRootProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Root> {}
/**
 * Groups all parts of the accordion.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const Root: React.FC<AccordionRootProps> = ({ keepMounted = true, ...props }) => {
  return <BaseAccordion.Root data-shunpo-accordion keepMounted={keepMounted} {...props} />;
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Item> {}
/**
 * Groups an accordion header with the corresponding panel.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const Item: React.FC<AccordionItemProps> = (props) => {
  return <BaseAccordion.Item {...props} data-shunpo-accordion-item />;
};

interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Header> {}
/**
 * A heading that labels the corresponding panel.
 * Renders an <h3> element.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const Header: React.FC<AccordionHeaderProps> = (props) => {
  return <BaseAccordion.Header data-shunpo-accordion-header {...props} />;
};

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger> {
  icon?: React.ReactNode;
}
/**
 * A button that opens and closes the corresponding panel. Renders a <button> element.
 * Renders a `<button>` element.
 *
 * @param icon - An icon that indicates the state of the accordion.
 *
 * Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
 */
const Trigger: React.FC<AccordionTriggerProps> = ({ icon, children, ...props }) => {
  return (
    <BaseAccordion.Trigger
    data-shunpo-accordion-trigger
      {...props}
      
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
const Icon: React.FC<AccordionIconProps> = ({ icon, ...props }) => {
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
const Panel: React.FC<AccordionPanelProps> = (props) => {
  return <BaseAccordion.Panel data-shunpo-accordion-panel keepMounted {...props} />;
};

export { Root, Item, Header, Trigger, Icon, Panel };
