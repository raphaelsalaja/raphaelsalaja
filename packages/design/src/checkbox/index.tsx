"use client";

import { Checkbox } from "@base-ui-components/react/checkbox";

import "./styles.css";

interface CheckboxRootProps extends React.ComponentProps<typeof Checkbox.Root> {
  size?: "sm" | "md" | "lg";
}

const CheckboxRoot: React.FC<CheckboxRootProps> = ({
  size = "md",
  ...props
}) => {
  return (
    <Checkbox.Root {...props} data-shunpo-checkbox-root data-size={size} />
  );
};

interface CheckboxIndicatorProps
  extends React.ComponentProps<typeof Checkbox.Indicator> {}

const CheckboxIndicator: React.FC<CheckboxIndicatorProps> = ({ ...props }) => {
  return <Checkbox.Indicator {...props} data-shunpo-checkbox-indicator />;
};

export { CheckboxRoot as Root, CheckboxIndicator as Indicator };
