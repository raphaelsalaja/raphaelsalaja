"use client";

import "./style.css";
import { Accordion } from "@base-ui-components/react/accordion";

type WithRef<C extends React.ElementType> = React.ComponentPropsWithoutRef<C> & {
  ref?: React.ComponentRef<C>;
};

export function Root(props: WithRef<typeof Accordion.Root>) {
  const { ref, ...rest } = props;
  return <Accordion.Root ref={ref} data-rs-accordion-root="" {...rest} />;
}

export function Item(props: WithRef<typeof Accordion.Item>) {
  const { ref, ...rest } = props;
  return <Accordion.Item ref={ref} data-rs-accordion-item="" {...rest} />;
}

export function Header(props: WithRef<typeof Accordion.Header>) {
  const { ref, ...rest } = props;
  return <Accordion.Header ref={ref} data-rs-accordion-header="" {...rest} />;
}

export function Trigger(props: WithRef<typeof Accordion.Trigger>) {
  const { ref, ...rest } = props;
  return <Accordion.Trigger ref={ref} data-rs-accordion-trigger="" {...rest} />;
}

export function Panel(props: WithRef<typeof Accordion.Panel>) {
  const { ref, ...rest } = props;
  return <Accordion.Panel ref={ref} data-rs-accordion-panel="" {...rest} />;
}

// For plain “span” elements we just inline the element type
export function Content(props: React.ComponentPropsWithoutRef<"span"> & { ref?: React.Ref<HTMLSpanElement> }) {
  const { ref, ...rest } = props;
  return <span ref={ref} data-rs-accordion-content="" {...rest} />;
}

export function TriggerIcon(props: React.ComponentPropsWithoutRef<"span"> & { ref?: React.Ref<HTMLSpanElement> }) {
  const { ref, ...rest } = props;
  return <span ref={ref} data-rs-accordion-trigger-icon="" {...rest} />;
}
