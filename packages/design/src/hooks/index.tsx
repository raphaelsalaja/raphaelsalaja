import React from "react";
import "./style.css";
import { Accordion } from "@base-ui-components/react/accordion";

function withDataAttr<C extends React.ElementType, K extends string>(Component: C, dataAttr: K) {
  type Props = React.ComponentPropsWithoutRef<C>;
  type Ref = React.ComponentRef<C>;

  const Wrapped = React.forwardRef<Ref, Props>((props, ref) => (
    <Component ref={ref} {...props} {...({ [dataAttr]: "" } as Record<K, string>)} />
  ));

  Wrapped.displayName = `WithDataAttr(${Component.displayName || Component.name})`;
  return Wrapped;
}

export const Root = withDataAttr(Accordion.Root, "data-rs-accordion-root");
export const Item = withDataAttr(Accordion.Item, "data-rs-accordion-item");
export const Header = withDataAttr(Accordion.Header, "data-rs-accordion-header");
export const Trigger = withDataAttr(Accordion.Trigger, "data-rs-accordion-trigger");
export const Panel = withDataAttr(Accordion.Panel, "data-rs-accordion-panel");

// for plain spans we just pass the intrinsic element type
export const Content = withDataAttr("span", "data-rs-accordion-content");
export const TriggerIcon = withDataAttr("span", "data-rs-accordion-trigger-icon");
