"use client";

import { Collapsible } from "@base-ui-components/react/collapsible";

import "./styles.css";

interface CollapsibleRootProps extends React.ComponentProps<typeof Collapsible.Root> {}

const CollapsibleRoot: React.FC<CollapsibleRootProps> = ({ ...props }) => {
  return <Collapsible.Root {...props} data-shunpo-collapsible-root />;
};

interface CollapsibleTriggerProps extends React.ComponentProps<typeof Collapsible.Trigger> {}

const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({ ...props }) => {
  return <Collapsible.Trigger {...props} data-shunpo-collapsible-trigger />;
};

interface CollapsiblePanelProps extends React.ComponentProps<typeof Collapsible.Panel> {}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ ...props }) => {
  return <Collapsible.Panel {...props} data-shunpo-collapsible-panel />;
};

export {
  CollapsibleRoot as Root,
  CollapsibleTrigger as Trigger,
  CollapsiblePanel as Panel,
};
