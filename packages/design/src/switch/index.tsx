"use client";

import { Switch } from "@base-ui-components/react/switch";

import "./styles.css";

interface SwitchRootProps extends React.ComponentProps<typeof Switch.Root> {
  size?: "sm" | "md" | "lg";
}

const SwitchRoot: React.FC<SwitchRootProps> = ({ size = "md", ...props }) => {
  return <Switch.Root {...props} data-shunpo-switch-root data-size={size} />;
};

interface SwitchThumbProps extends React.ComponentProps<typeof Switch.Thumb> {}

const SwitchThumb: React.FC<SwitchThumbProps> = ({ ...props }) => {
  return <Switch.Thumb {...props} data-shunpo-switch-thumb />;
};

export {
  SwitchRoot as Root,
  SwitchThumb as Thumb,
};
