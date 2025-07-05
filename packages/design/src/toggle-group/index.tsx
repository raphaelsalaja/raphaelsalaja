import { ToggleGroup } from "@base-ui-components/react/toggle-group";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// ToggleGroup (single component)
export interface ToggleGroupProps extends ComponentPropsWithoutRef<typeof ToggleGroup> {}

export const ToggleGroupRoot: React.FC<ToggleGroupProps> = ({ ...props }) => {
  return <ToggleGroup {...props} data-shunpo-toggle-group />;
};
