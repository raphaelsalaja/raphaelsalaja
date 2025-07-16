import { Menu } from "@base-ui-components/react/menu";
import { Menubar } from "@base-ui-components/react/menubar";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// Menubar Root (single component)
export interface MenubarProps extends ComponentPropsWithoutRef<typeof Menubar> {}

export const MenubarRoot: React.FC<MenubarProps> = ({ ...props }) => {
  return <Menubar {...props} data-shunpo-menubar />;
};

// Menu components for use within Menubar
// Menu Root
export interface MenubarMenuRootProps extends ComponentPropsWithoutRef<typeof Menu.Root> {}

export const MenubarMenuRoot: React.FC<MenubarMenuRootProps> = ({ ...props }) => {
  return <Menu.Root {...props} data-shunpo-menubar-menu-root />;
};

// Menu Trigger
export interface MenubarMenuTriggerProps extends ComponentPropsWithoutRef<typeof Menu.Trigger> {}

export const MenubarMenuTrigger: React.FC<MenubarMenuTriggerProps> = ({ ...props }) => {
  return <Menu.Trigger {...props} data-shunpo-menubar-menu-trigger />;
};

// Menu Portal
export interface MenubarMenuPortalProps extends ComponentPropsWithoutRef<typeof Menu.Portal> {}

export const MenubarMenuPortal: React.FC<MenubarMenuPortalProps> = ({ ...props }) => {
  return <Menu.Portal {...props} data-shunpo-menubar-menu-portal />;
};

// Menu Backdrop
export interface MenubarMenuBackdropProps extends ComponentPropsWithoutRef<typeof Menu.Backdrop> {}

export const MenubarMenuBackdrop: React.FC<MenubarMenuBackdropProps> = ({ ...props }) => {
  return <Menu.Backdrop {...props} data-shunpo-menubar-menu-backdrop />;
};

// Menu Positioner
export interface MenubarMenuPositionerProps extends ComponentPropsWithoutRef<typeof Menu.Positioner> {}

export const MenubarMenuPositioner: React.FC<MenubarMenuPositionerProps> = ({ ...props }) => {
  return <Menu.Positioner {...props} data-shunpo-menubar-menu-positioner />;
};

// Menu Popup
export interface MenubarMenuPopupProps extends ComponentPropsWithoutRef<typeof Menu.Popup> {}

export const MenubarMenuPopup: React.FC<MenubarMenuPopupProps> = ({ ...props }) => {
  return <Menu.Popup {...props} data-shunpo-menubar-menu-popup />;
};

// Menu Arrow
export interface MenubarMenuArrowProps extends ComponentPropsWithoutRef<typeof Menu.Arrow> {}

export const MenubarMenuArrow: React.FC<MenubarMenuArrowProps> = ({ ...props }) => {
  return <Menu.Arrow {...props} data-shunpo-menubar-menu-arrow />;
};

// Menu Item
export interface MenubarMenuItemProps extends ComponentPropsWithoutRef<typeof Menu.Item> {}

export const MenubarMenuItem: React.FC<MenubarMenuItemProps> = ({ ...props }) => {
  return <Menu.Item {...props} data-shunpo-menubar-menu-item />;
};

// Menu Group
export interface MenubarMenuGroupProps extends ComponentPropsWithoutRef<typeof Menu.Group> {}

export const MenubarMenuGroup: React.FC<MenubarMenuGroupProps> = ({ ...props }) => {
  return <Menu.Group {...props} data-shunpo-menubar-menu-group />;
};

// Menu GroupLabel
export interface MenubarMenuGroupLabelProps extends ComponentPropsWithoutRef<typeof Menu.GroupLabel> {}

export const MenubarMenuGroupLabel: React.FC<MenubarMenuGroupLabelProps> = ({ ...props }) => {
  return <Menu.GroupLabel {...props} data-shunpo-menubar-menu-group-label />;
};

// Menu Separator
export interface MenubarMenuSeparatorProps extends ComponentPropsWithoutRef<typeof Menu.Separator> {}

export const MenubarMenuSeparator: React.FC<MenubarMenuSeparatorProps> = ({ ...props }) => {
  return <Menu.Separator {...props} data-shunpo-menubar-menu-separator />;
};

// Menu SubmenuTrigger
export interface MenubarMenuSubmenuTriggerProps extends ComponentPropsWithoutRef<typeof Menu.SubmenuTrigger> {}

export const MenubarMenuSubmenuTrigger: React.FC<MenubarMenuSubmenuTriggerProps> = ({ ...props }) => {
  return <Menu.SubmenuTrigger {...props} data-shunpo-menubar-menu-submenu-trigger />;
};

// Menu SubmenuRoot
export interface MenubarMenuSubmenuRootProps extends ComponentPropsWithoutRef<typeof Menu.SubmenuRoot> {}

export const MenubarMenuSubmenuRoot: React.FC<MenubarMenuSubmenuRootProps> = ({ ...props }) => {
  return <Menu.SubmenuRoot {...props} data-shunpo-menubar-menu-submenu-root />;
};

// Menu CheckboxItem
export interface MenubarMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof Menu.CheckboxItem> {}

export const MenubarMenuCheckboxItem: React.FC<MenubarMenuCheckboxItemProps> = ({ ...props }) => {
  return <Menu.CheckboxItem {...props} data-shunpo-menubar-menu-checkbox-item />;
};

// Menu CheckboxItemIndicator
export interface MenubarMenuCheckboxItemIndicatorProps
  extends ComponentPropsWithoutRef<typeof Menu.CheckboxItemIndicator> {}

export const MenubarMenuCheckboxItemIndicator: React.FC<MenubarMenuCheckboxItemIndicatorProps> = ({ ...props }) => {
  return <Menu.CheckboxItemIndicator {...props} data-shunpo-menubar-menu-checkbox-item-indicator />;
};

// Menu RadioGroup
export interface MenubarMenuRadioGroupProps extends ComponentPropsWithoutRef<typeof Menu.RadioGroup> {}

export const MenubarMenuRadioGroup: React.FC<MenubarMenuRadioGroupProps> = ({ ...props }) => {
  return <Menu.RadioGroup {...props} data-shunpo-menubar-menu-radio-group />;
};

// Menu RadioItem
export interface MenubarMenuRadioItemProps extends ComponentPropsWithoutRef<typeof Menu.RadioItem> {}

export const MenubarMenuRadioItem: React.FC<MenubarMenuRadioItemProps> = ({ ...props }) => {
  return <Menu.RadioItem {...props} data-shunpo-menubar-menu-radio-item />;
};

// Menu RadioItemIndicator
export interface MenubarMenuRadioItemIndicatorProps extends ComponentPropsWithoutRef<typeof Menu.RadioItemIndicator> {}

export const MenubarMenuRadioItemIndicator: React.FC<MenubarMenuRadioItemIndicatorProps> = ({ ...props }) => {
  return <Menu.RadioItemIndicator {...props} data-shunpo-menubar-menu-radio-item-indicator />;
};
