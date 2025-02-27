"use client";

import * as RadixContextMenu from "@radix-ui/react-context-menu";

import "./styles.css";

interface RadialContextMenuRootProps extends React.ComponentProps<typeof RadixContextMenu.Root> {}
const RadialContextMenuRoot: React.FC<RadialContextMenuRootProps> = ({ ...props }) => {
  return <RadixContextMenu.Root {...props} data-shunpo-radial-context-menu-root />;
};

interface RadialContextMenuTriggerProps extends React.ComponentProps<typeof RadixContextMenu.Trigger> {}
const RadialContextMenuTrigger: React.FC<RadialContextMenuTriggerProps> = ({ ...props }) => {
  return <RadixContextMenu.Trigger {...props} data-shunpo-radial-context-menu-trigger />;
};

interface RadialContextMenuPortalProps extends React.ComponentProps<typeof RadixContextMenu.Portal> {}
const RadialContextMenuPortal: React.FC<RadialContextMenuPortalProps> = ({ ...props }) => {
  return <RadixContextMenu.Portal {...props} data-shunpo-radial-context-menu-portal />;
};

interface RadialContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}
const RadialContextMenuLabel: React.FC<RadialContextMenuLabelProps> = ({ ...props }) => {
  return <span {...props} data-shunpo-radial-context-menu-label />;
};

interface RadialContextMenuContentProps extends React.ComponentProps<typeof RadixContextMenu.Content> {}
const RadialContextMenuContent: React.FC<RadialContextMenuContentProps> = ({ ...props }) => {
  return <RadixContextMenu.Content {...props} data-shunpo-radial-context-menu-content />;
};

interface RadialContextMenuGroupProps extends React.ComponentProps<typeof RadixContextMenu.Group> {}
const RadialContextMenuGroup: React.FC<RadialContextMenuGroupProps> = ({ ...props }) => {
  return <RadixContextMenu.Group {...props} data-shunpo-radial-context-menu-group />;
};

interface RadialContextMenuItemProps extends React.ComponentProps<typeof RadixContextMenu.Item> {}
const RadialContextMenuItem: React.FC<RadialContextMenuItemProps> = ({ ...props }) => {
  return <RadixContextMenu.Item {...props} data-shunpo-radial-context-menu-item />;
};

interface RadialContextMenuCheckboxItemProps extends React.ComponentProps<typeof RadixContextMenu.CheckboxItem> {}
const RadialContextMenuCheckboxItem: React.FC<RadialContextMenuCheckboxItemProps> = ({ ...props }) => {
  return <RadixContextMenu.CheckboxItem {...props} data-shunpo-radial-context-menu-checkbox-item />;
};

interface RadialContextMenuRadioGroupProps extends React.ComponentProps<typeof RadixContextMenu.RadioGroup> {}
const RadialContextMenuRadioGroup: React.FC<RadialContextMenuRadioGroupProps> = ({ ...props }) => {
  return <RadixContextMenu.RadioGroup {...props} data-shunpo-radial-context-menu-radio-group />;
};

interface RadialContextMenuRadioItemProps extends React.ComponentProps<typeof RadixContextMenu.RadioItem> {}
const RadialContextMenuRadioItem: React.FC<RadialContextMenuRadioItemProps> = ({ ...props }) => {
  return <RadixContextMenu.RadioItem {...props} data-shunpo-radial-context-menu-radio-item />;
};

interface RadialContextMenuItemIndicatorProps extends React.ComponentProps<typeof RadixContextMenu.ItemIndicator> {}
const RadialContextMenuItemIndicator: React.FC<RadialContextMenuItemIndicatorProps> = ({ ...props }) => {
  return <RadixContextMenu.ItemIndicator {...props} data-shunpo-radial-context-menu-item-indicator />;
};

interface RadialContextMenuSeparatorProps extends React.ComponentProps<typeof RadixContextMenu.Separator> {}
const RadialContextMenuSeparator: React.FC<RadialContextMenuSeparatorProps> = ({ ...props }) => {
  return <RadixContextMenu.Separator {...props} data-shunpo-radial-context-menu-separator />;
};

interface RadialContextMenuArrowProps extends React.ComponentProps<typeof RadixContextMenu.Arrow> {}
const RadialContextMenuArrow: React.FC<RadialContextMenuArrowProps> = ({ ...props }) => {
  return <RadixContextMenu.Arrow {...props} data-shunpo-radial-context-menu-arrow />;
};

interface RadialContextMenuSubProps extends React.ComponentProps<typeof RadixContextMenu.Sub> {}
const RadialContextMenuSub: React.FC<RadialContextMenuSubProps> = ({ ...props }) => {
  return <RadixContextMenu.Sub {...props} data-shunpo-radial-context-menu-sub />;
};

interface RadialContextMenuSubTriggerProps extends React.ComponentProps<typeof RadixContextMenu.SubTrigger> {}
const RadialContextMenuSubTrigger: React.FC<RadialContextMenuSubTriggerProps> = ({ ...props }) => {
  return <RadixContextMenu.SubTrigger {...props} data-shunpo-radial-context-menu-sub-trigger />;
};

interface RadialContextMenuSubContentProps extends React.ComponentProps<typeof RadixContextMenu.SubContent> {}
const RadialContextMenuSubContent: React.FC<RadialContextMenuSubContentProps> = ({ ...props }) => {
  return <RadixContextMenu.SubContent {...props} data-shunpo-radial-context-menu-sub-content />;
};

export {
  RadialContextMenuRoot,
  RadialContextMenuLabel,
  RadialContextMenuTrigger,
  RadialContextMenuPortal,
  RadialContextMenuContent,
  RadialContextMenuGroup,
  RadialContextMenuItem,
  RadialContextMenuCheckboxItem,
  RadialContextMenuRadioGroup,
  RadialContextMenuRadioItem,
  RadialContextMenuItemIndicator,
  RadialContextMenuSeparator,
  RadialContextMenuArrow,
  RadialContextMenuSub,
  RadialContextMenuSubTrigger,
  RadialContextMenuSubContent,
};
