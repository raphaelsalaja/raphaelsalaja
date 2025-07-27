"use client";

import { Field } from "@base-ui-components/react/field";

import "./styles.css";

interface FieldRootProps extends React.ComponentProps<typeof Field.Root> {}

const FieldRoot: React.FC<FieldRootProps> = ({ ...props }) => {
  return <Field.Root {...props} data-shunpo-field-root />;
};

interface FieldLabelProps extends React.ComponentProps<typeof Field.Label> {}

const FieldLabel: React.FC<FieldLabelProps> = ({ ...props }) => {
  return <Field.Label {...props} data-shunpo-field-label />;
};

interface FieldControlProps
  extends React.ComponentProps<typeof Field.Control> {}

const FieldControl: React.FC<FieldControlProps> = ({ ...props }) => {
  return <Field.Control {...props} data-shunpo-field-control />;
};

interface FieldDescriptionProps
  extends React.ComponentProps<typeof Field.Description> {}

const FieldDescription: React.FC<FieldDescriptionProps> = ({ ...props }) => {
  return <Field.Description {...props} data-shunpo-field-description />;
};

interface FieldErrorProps extends React.ComponentProps<typeof Field.Error> {}

const FieldError: React.FC<FieldErrorProps> = ({ ...props }) => {
  return <Field.Error {...props} data-shunpo-field-error />;
};

export {
  FieldRoot as Root,
  FieldLabel as Label,
  FieldControl as Control,
  FieldDescription as Description,
  FieldError as Error,
};
