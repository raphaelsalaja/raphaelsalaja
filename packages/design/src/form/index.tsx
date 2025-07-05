import { Form } from "@base-ui-components/react/form";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// Form
export interface FormProps extends ComponentPropsWithoutRef<typeof Form> {}

export const FormRoot: React.FC<FormProps> = ({ ...props }) => {
  return <Form {...props} data-shunpo-form />;
};
