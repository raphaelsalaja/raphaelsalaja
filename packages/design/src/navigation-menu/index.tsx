import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// NavigationMenu Root
export interface NavigationMenuRootProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Root> {}

export const NavigationMenuRoot: React.FC<NavigationMenuRootProps> = ({ ...props }) => {
  return <NavigationMenu.Root {...props} data-shunpo-navigation-menu-root />;
};

// NavigationMenu List
export interface NavigationMenuListProps extends ComponentPropsWithoutRef<typeof NavigationMenu.List> {}

export const NavigationMenuList: React.FC<NavigationMenuListProps> = ({ ...props }) => {
  return <NavigationMenu.List {...props} data-shunpo-navigation-menu-list />;
};

// NavigationMenu Item
export interface NavigationMenuItemProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Item> {}

export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ ...props }) => {
  return <NavigationMenu.Item {...props} data-shunpo-navigation-menu-item />;
};

// NavigationMenu Trigger
export interface NavigationMenuTriggerProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Trigger> {}

export const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({ ...props }) => {
  return <NavigationMenu.Trigger {...props} data-shunpo-navigation-menu-trigger />;
};

// NavigationMenu Icon
export interface NavigationMenuIconProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Icon> {}

export const NavigationMenuIcon: React.FC<NavigationMenuIconProps> = ({ ...props }) => {
  return <NavigationMenu.Icon {...props} data-shunpo-navigation-menu-icon />;
};

// NavigationMenu Content
export interface NavigationMenuContentProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Content> {}

export const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({ ...props }) => {
  return <NavigationMenu.Content {...props} data-shunpo-navigation-menu-content />;
};

// NavigationMenu Link
export interface NavigationMenuLinkProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Link> {}

export const NavigationMenuLink: React.FC<NavigationMenuLinkProps> = ({ ...props }) => {
  return <NavigationMenu.Link {...props} data-shunpo-navigation-menu-link />;
};

// NavigationMenu Portal
export interface NavigationMenuPortalProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Portal> {}

export const NavigationMenuPortal: React.FC<NavigationMenuPortalProps> = ({ ...props }) => {
  return <NavigationMenu.Portal {...props} data-shunpo-navigation-menu-portal />;
};

// NavigationMenu Backdrop
export interface NavigationMenuBackdropProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Backdrop> {}

export const NavigationMenuBackdrop: React.FC<NavigationMenuBackdropProps> = ({ ...props }) => {
  return <NavigationMenu.Backdrop {...props} data-shunpo-navigation-menu-backdrop />;
};

// NavigationMenu Positioner
export interface NavigationMenuPositionerProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Positioner> {}

export const NavigationMenuPositioner: React.FC<NavigationMenuPositionerProps> = ({ ...props }) => {
  return <NavigationMenu.Positioner {...props} data-shunpo-navigation-menu-positioner />;
};

// NavigationMenu Popup
export interface NavigationMenuPopupProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Popup> {}

export const NavigationMenuPopup: React.FC<NavigationMenuPopupProps> = ({ ...props }) => {
  return <NavigationMenu.Popup {...props} data-shunpo-navigation-menu-popup />;
};

// NavigationMenu Arrow
export interface NavigationMenuArrowProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Arrow> {}

export const NavigationMenuArrow: React.FC<NavigationMenuArrowProps> = ({ ...props }) => {
  return <NavigationMenu.Arrow {...props} data-shunpo-navigation-menu-arrow />;
};

// NavigationMenu Viewport
export interface NavigationMenuViewportProps extends ComponentPropsWithoutRef<typeof NavigationMenu.Viewport> {}

export const NavigationMenuViewport: React.FC<NavigationMenuViewportProps> = ({ ...props }) => {
  return <NavigationMenu.Viewport {...props} data-shunpo-navigation-menu-viewport />;
};
