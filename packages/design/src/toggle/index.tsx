"use client";

import { Toggle } from "@base-ui-components/react/toggle";

import "./styles.css";

interface ToggleRootProps extends React.ComponentProps<typeof Toggle> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

const ToggleRoot: React.FC<ToggleRootProps> = ({ size = "md", variant = "default", ...props }) => {
  return <Toggle {...props} data-shunpo-toggle-root data-size={size} data-variant={variant} />;
};

export { ToggleRoot as Root };
