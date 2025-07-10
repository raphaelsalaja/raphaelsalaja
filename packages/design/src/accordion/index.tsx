"use client";

import "./styles.css";

import { Accordion } from "@base-ui-components/react/accordion";

type WithRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>;

export function Root(props: WithRef<typeof Accordion.Root>) {
  return <Accordion.Root data-rs-accordion-root {...props} />;
}

export function Item(props: WithRef<typeof Accordion.Item>) {
  return <Accordion.Item data-rs-accordion-item {...props} />;
}

export function Header(props: WithRef<typeof Accordion.Header>) {
  return <Accordion.Header data-rs-accordion-header {...props} />;
}

export function Trigger(props: WithRef<typeof Accordion.Trigger>) {
  return <Accordion.Trigger data-rs-accordion-trigger {...props} />;
}

export function Panel(props: WithRef<typeof Accordion.Panel>) {
  return <Accordion.Panel data-rs-accordion-panel {...props} />;
}

export function Content(props: WithRef<"div">) {
  return <div data-rs-accordion-content {...props} />;
}

export function TriggerIcon(props: WithRef<"div">) {
  return <div data-rs-accordion-trigger-icon {...props} />;
}
