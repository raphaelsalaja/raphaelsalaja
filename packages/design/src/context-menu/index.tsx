import { ContextMenu } from "@base-ui-components/react/context-menu";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// ContextMenu Root
export interface ContextMenuRootProps extends ComponentPropsWithoutRef<typeof ContextMenu.Root> {}

export const ContextMenuRoot: React.FC<ContextMenuRootProps> = ({ ...props }) => {
  return <ContextMenu.Root {...props} data-shunpo-context-menu-root />;
};

// ContextMenu Trigger
export interface ContextMenuTriggerProps extends ComponentPropsWithoutRef<typeof ContextMenu.Trigger> {}

export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({ ...props }) => {
  return <ContextMenu.Trigger {...props} data-shunpo-context-menu-trigger />;
};

// ContextMenu Portal
export interface ContextMenuPortalProps extends ComponentPropsWithoutRef<typeof ContextMenu.Portal> {}

export const ContextMenuPortal: React.FC<ContextMenuPortalProps> = ({ ...props }) => {
  return <ContextMenu.Portal {...props} data-shunpo-context-menu-portal />;
};

// ContextMenu Backdrop
export interface ContextMenuBackdropProps extends ComponentPropsWithoutRef<typeof ContextMenu.Backdrop> {}

export const ContextMenuBackdrop: React.FC<ContextMenuBackdropProps> = ({ ...props }) => {
  return <ContextMenu.Backdrop {...props} data-shunpo-context-menu-backdrop />;
};

// ContextMenu Positioner
export interface ContextMenuPositionerProps extends ComponentPropsWithoutRef<typeof ContextMenu.Positioner> {}

export const ContextMenuPositioner: React.FC<ContextMenuPositionerProps> = ({ ...props }) => {
  return <ContextMenu.Positioner {...props} data-shunpo-context-menu-positioner />;
};

// ContextMenu Popup
export interface ContextMenuPopupProps extends ComponentPropsWithoutRef<typeof ContextMenu.Popup> {}

export const ContextMenuPopup: React.FC<ContextMenuPopupProps> = ({ ...props }) => {
  return <ContextMenu.Popup {...props} data-shunpo-context-menu-popup />;
};

// ContextMenu Arrow
export interface ContextMenuArrowProps extends ComponentPropsWithoutRef<typeof ContextMenu.Arrow> {}

export const ContextMenuArrow: React.FC<ContextMenuArrowProps> = ({ ...props }) => {
  return <ContextMenu.Arrow {...props} data-shunpo-context-menu-arrow />;
};

// ContextMenu Item
export interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof ContextMenu.Item> {}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ ...props }) => {
  return <ContextMenu.Item {...props} data-shunpo-context-menu-item />;
};

// ContextMenu Group
export interface ContextMenuGroupProps extends ComponentPropsWithoutRef<typeof ContextMenu.Group> {}

export const ContextMenuGroup: React.FC<ContextMenuGroupProps> = ({ ...props }) => {
  return <ContextMenu.Group {...props} data-shunpo-context-menu-group />;
};

// ContextMenu GroupLabel
export interface ContextMenuGroupLabelProps extends ComponentPropsWithoutRef<typeof ContextMenu.GroupLabel> {}

export const ContextMenuGroupLabel: React.FC<ContextMenuGroupLabelProps> = ({ ...props }) => {
  return <ContextMenu.GroupLabel {...props} data-shunpo-context-menu-group-label />;
};

// ContextMenu Separator
export interface ContextMenuSeparatorProps extends ComponentPropsWithoutRef<typeof ContextMenu.Separator> {}

export const ContextMenuSeparator: React.FC<ContextMenuSeparatorProps> = ({ ...props }) => {
  return <ContextMenu.Separator {...props} data-shunpo-context-menu-separator />;
};

// ContextMenu SubmenuRoot
export interface ContextMenuSubmenuRootProps extends ComponentPropsWithoutRef<typeof ContextMenu.SubmenuRoot> {}

export const ContextMenuSubmenuRoot: React.FC<ContextMenuSubmenuRootProps> = ({ ...props }) => {
  return <ContextMenu.SubmenuRoot {...props} data-shunpo-context-menu-submenu-root />;
};

// ContextMenu SubmenuTrigger
export interface ContextMenuSubmenuTriggerProps extends ComponentPropsWithoutRef<typeof ContextMenu.SubmenuTrigger> {}

export const ContextMenuSubmenuTrigger: React.FC<ContextMenuSubmenuTriggerProps> = ({ ...props }) => {
  return <ContextMenu.SubmenuTrigger {...props} data-shunpo-context-menu-submenu-trigger />;
};

// ContextMenu CheckboxItem
export interface ContextMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof ContextMenu.CheckboxItem> {}

export const ContextMenuCheckboxItem: React.FC<ContextMenuCheckboxItemProps> = ({ ...props }) => {
  return <ContextMenu.CheckboxItem {...props} data-shunpo-context-menu-checkbox-item />;
};

// ContextMenu CheckboxItemIndicator
export interface ContextMenuCheckboxItemIndicatorProps
  extends ComponentPropsWithoutRef<typeof ContextMenu.CheckboxItemIndicator> {}

export const ContextMenuCheckboxItemIndicator: React.FC<ContextMenuCheckboxItemIndicatorProps> = ({ ...props }) => {
  return <ContextMenu.CheckboxItemIndicator {...props} data-shunpo-context-menu-checkbox-item-indicator />;
};

// ContextMenu RadioGroup
export interface ContextMenuRadioGroupProps extends ComponentPropsWithoutRef<typeof ContextMenu.RadioGroup> {}

export const ContextMenuRadioGroup: React.FC<ContextMenuRadioGroupProps> = ({ ...props }) => {
  return <ContextMenu.RadioGroup {...props} data-shunpo-context-menu-radio-group />;
};

// ContextMenu RadioItem
export interface ContextMenuRadioItemProps extends ComponentPropsWithoutRef<typeof ContextMenu.RadioItem> {}

export const ContextMenuRadioItem: React.FC<ContextMenuRadioItemProps> = ({ ...props }) => {
  return <ContextMenu.RadioItem {...props} data-shunpo-context-menu-radio-item />;
};

// ContextMenu RadioItemIndicator
export interface ContextMenuRadioItemIndicatorProps
  extends ComponentPropsWithoutRef<typeof ContextMenu.RadioItemIndicator> {}

export const ContextMenuRadioItemIndicator: React.FC<ContextMenuRadioItemIndicatorProps> = ({ ...props }) => {
  return <ContextMenu.RadioItemIndicator {...props} data-shunpo-context-menu-radio-item-indicator />;
};
