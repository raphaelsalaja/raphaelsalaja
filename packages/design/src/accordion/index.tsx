import "./style.css";

import { Accordion } from "@base-ui-components/react/accordion";

interface RootProps extends React.ComponentPropsWithoutRef<typeof Accordion.Root> {}
const Root: React.FC<RootProps> = ({ keepMounted = true, ...props }) => {
  return <Accordion.Root data-rs-accordion-root {...props} />;
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Accordion.Item> {}
const Item: React.FC<AccordionItemProps> = (props) => {
  return <Accordion.Item data-rs-accordion-item {...props} />;
};

interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof Accordion.Header> {}
const Header: React.FC<AccordionHeaderProps> = (props) => {
  return <Accordion.Header data-rs-accordion-header {...props} />;
};

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof Accordion.Trigger> {}
const Trigger: React.FC<AccordionTriggerProps> = ({ ...props }) => {
  return <Accordion.Trigger data-rs-accordion-trigger {...props} />;
};

interface AccordionPanelProps extends React.ComponentPropsWithoutRef<typeof Accordion.Panel> {}
const Panel: React.FC<AccordionPanelProps> = (props) => {
  return <Accordion.Panel data-rs-accordion-panel keepMounted {...props} />;
};

export { Root, Item, Header, Trigger, Panel };
