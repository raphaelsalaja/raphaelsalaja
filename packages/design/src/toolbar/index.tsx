import { Toolbar } from "@base-ui-components/react/toolbar";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// Toolbar Root
export interface ToolbarRootProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Root> {}

export const ToolbarRoot: React.FC<ToolbarRootProps> = ({ ...props }) => {
  return <Toolbar.Root {...props} data-shunpo-toolbar-root />;
};

// Toolbar Button
export interface ToolbarButtonProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Button> {}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ ...props }) => {
  return <Toolbar.Button {...props} data-shunpo-toolbar-button />;
};

// Toolbar Link
export interface ToolbarLinkProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Link> {}

export const ToolbarLink: React.FC<ToolbarLinkProps> = ({ ...props }) => {
  return <Toolbar.Link {...props} data-shunpo-toolbar-link />;
};

// Toolbar Input
export interface ToolbarInputProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Input> {}

export const ToolbarInput: React.FC<ToolbarInputProps> = ({ ...props }) => {
  return <Toolbar.Input {...props} data-shunpo-toolbar-input />;
};

// Toolbar Group
export interface ToolbarGroupProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Group> {}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = ({ ...props }) => {
  return <Toolbar.Group {...props} data-shunpo-toolbar-group />;
};

// Toolbar Separator
export interface ToolbarSeparatorProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Separator> {}

export const ToolbarSeparator: React.FC<ToolbarSeparatorProps> = ({
  ...props
}) => {
  return <Toolbar.Separator {...props} data-shunpo-toolbar-separator />;
};
