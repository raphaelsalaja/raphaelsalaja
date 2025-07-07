"use client";

import { RadioGroup } from "@base-ui-components/react/radio-group";

import "./styles.css";

interface RadioGroupRootProps extends React.ComponentProps<typeof RadioGroup> {
  size?: "sm" | "md" | "lg";
}

const RadioGroupRoot: React.FC<RadioGroupRootProps> = ({ size = "md", ...props }) => {
  return <RadioGroup {...props} data-shunpo-radio-group-root data-size={size} />;
};

export {
  RadioGroupRoot as Root,
};
