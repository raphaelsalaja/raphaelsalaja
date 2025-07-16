"use client";

import { Meter } from "@base-ui-components/react/meter";

import "./styles.css";

interface MeterRootProps extends React.ComponentProps<typeof Meter.Root> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
}

const MeterRoot: React.FC<MeterRootProps> = ({ size = "md", variant = "default", ...props }) => {
  return <Meter.Root {...props} data-shunpo-meter-root data-size={size} data-variant={variant} />;
};

interface MeterIndicatorProps extends React.ComponentProps<typeof Meter.Indicator> {}

const MeterIndicator: React.FC<MeterIndicatorProps> = ({ ...props }) => {
  return <Meter.Indicator {...props} data-shunpo-meter-indicator />;
};

export { MeterRoot as Root, MeterIndicator as Indicator };
