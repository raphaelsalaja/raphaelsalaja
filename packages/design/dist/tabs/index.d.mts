import { Tabs } from '@base-ui-components/react/tabs';

interface TabsRootProps extends React.ComponentProps<typeof Tabs.Root> {
    label?: string;
}
declare const TabsRoot: React.FC<TabsRootProps>;
interface TabsListProps extends React.ComponentProps<typeof Tabs.Root> {
}
declare const TabsList: React.FC<TabsListProps>;
interface TabsTabProps extends React.ComponentProps<typeof Tabs.Tab> {
}
declare const TabsTab: React.FC<TabsTabProps>;
interface TabsIndicatorProps extends React.ComponentProps<typeof Tabs.Indicator> {
}
declare const TabsIndicator: React.FC<TabsIndicatorProps>;
interface TabsPanelProps extends React.ComponentProps<typeof Tabs.Panel> {
}
declare const TabsPanel: React.FC<TabsPanelProps>;
interface TabsLabelProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const TabsLabel: React.FC<TabsLabelProps>;

export { TabsIndicator as Indicator, TabsLabel as Label, TabsList as List, TabsPanel as Panel, TabsRoot as Root, TabsTab as Tab };
