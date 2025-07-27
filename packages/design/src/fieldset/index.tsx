import { Fieldset } from "@base-ui-components/react/fieldset";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// Fieldset Root
export interface FieldsetRootProps
  extends ComponentPropsWithoutRef<typeof Fieldset.Root> {}

export const FieldsetRoot: React.FC<FieldsetRootProps> = ({ ...props }) => {
  return <Fieldset.Root {...props} data-shunpo-fieldset-root />;
};

// Fieldset Legend
export interface FieldsetLegendProps
  extends ComponentPropsWithoutRef<typeof Fieldset.Legend> {}

export const FieldsetLegend: React.FC<FieldsetLegendProps> = ({ ...props }) => {
  return <Fieldset.Legend {...props} data-shunpo-fieldset-legend />;
};
