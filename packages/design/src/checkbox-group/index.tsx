"use client";

import { CheckboxGroup } from "@base-ui-components/react/checkbox-group";

import "./styles.css";

interface CheckboxGroupRootProps extends React.ComponentProps<typeof CheckboxGroup> {
  orientation?: "horizontal" | "vertical";
}

const CheckboxGroupRoot: React.FC<CheckboxGroupRootProps> = ({ orientation = "vertical", ...props }) => {
  return <CheckboxGroup {...props} data-shunpo-checkbox-group-root data-orientation={orientation} />;
};

export {
  CheckboxGroupRoot as Root,
};
