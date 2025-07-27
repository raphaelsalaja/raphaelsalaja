import { Tabs } from "@base-ui-components/react/tabs";

import "./styles.css";

interface TabsRootProps extends React.ComponentProps<typeof Tabs.Root> {
  label?: string;
}

const TabsRoot: React.FC<TabsRootProps> = ({ children, ...props }) => {
  return (
    <div className="tabs">
      <TabsLabel>{props.label}</TabsLabel>
      <Tabs.Root className="root" {...props}>
        {children}
      </Tabs.Root>
    </div>
  );
};

interface TabsListProps extends React.ComponentProps<typeof Tabs.Root> {}

const TabsList: React.FC<TabsListProps> = ({ children, ...props }) => {
  return (
    <Tabs.List className="list" {...props}>
      {children}
    </Tabs.List>
  );
};

interface TabsTabProps extends React.ComponentProps<typeof Tabs.Tab> {}

const TabsTab: React.FC<TabsTabProps> = ({ children, ...props }) => {
  return (
    <Tabs.Tab className="tab" {...props}>
      {children}
    </Tabs.Tab>
  );
};

interface TabsIndicatorProps
  extends React.ComponentProps<typeof Tabs.Indicator> {}

const TabsIndicator: React.FC<TabsIndicatorProps> = ({
  children,
  ...props
}) => {
  return (
    <Tabs.Indicator className="indicator" {...props}>
      {children}
    </Tabs.Indicator>
  );
};

interface TabsPanelProps extends React.ComponentProps<typeof Tabs.Panel> {}

const TabsPanel: React.FC<TabsPanelProps> = ({ children, ...props }) => {
  return (
    <Tabs.Panel className="panel" {...props}>
      {children}
    </Tabs.Panel>
  );
};

interface TabsLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsLabel: React.FC<TabsLabelProps> = ({ children, ...props }) => {
  return (
    <span className="label" {...props}>
      {children}
    </span>
  );
};

export {
  TabsRoot as Root,
  TabsList as List,
  TabsTab as Tab,
  TabsIndicator as Indicator,
  TabsPanel as Panel,
  TabsLabel as Label,
};
