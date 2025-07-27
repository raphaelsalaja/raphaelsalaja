"use client";

import { Radio } from "@base-ui-components/react/radio";

import "./styles.css";

interface RadioRootProps extends React.ComponentProps<typeof Radio.Root> {
  size?: "sm" | "md" | "lg";
}

const RadioRoot: React.FC<RadioRootProps> = ({ size = "md", ...props }) => {
  return <Radio.Root {...props} data-shunpo-radio-root data-size={size} />;
};

interface RadioIndicatorProps
  extends React.ComponentProps<typeof Radio.Indicator> {}

const RadioIndicator: React.FC<RadioIndicatorProps> = ({ ...props }) => {
  return <Radio.Indicator {...props} data-shunpo-radio-indicator />;
};

export { RadioRoot as Root, RadioIndicator as Indicator };
