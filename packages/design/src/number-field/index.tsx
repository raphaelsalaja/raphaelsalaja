"use client";

import { NumberField } from "@base-ui-components/react/number-field";

import "./styles.css";

interface NumberFieldRootProps
  extends React.ComponentProps<typeof NumberField.Root> {}

const NumberFieldRoot: React.FC<NumberFieldRootProps> = ({ ...props }) => {
  return <NumberField.Root {...props} data-shunpo-number-field-root />;
};

interface NumberFieldScrubAreaProps
  extends React.ComponentProps<typeof NumberField.ScrubArea> {}

const NumberFieldScrubArea: React.FC<NumberFieldScrubAreaProps> = ({
  ...props
}) => {
  return (
    <NumberField.ScrubArea {...props} data-shunpo-number-field-scrub-area />
  );
};

interface NumberFieldScrubAreaCursorProps
  extends React.ComponentProps<typeof NumberField.ScrubAreaCursor> {}

const NumberFieldScrubAreaCursor: React.FC<NumberFieldScrubAreaCursorProps> = ({
  ...props
}) => {
  return (
    <NumberField.ScrubAreaCursor
      {...props}
      data-shunpo-number-field-scrub-area-cursor
    />
  );
};

interface NumberFieldGroupProps
  extends React.ComponentProps<typeof NumberField.Group> {}

const NumberFieldGroup: React.FC<NumberFieldGroupProps> = ({ ...props }) => {
  return <NumberField.Group {...props} data-shunpo-number-field-group />;
};

interface NumberFieldInputProps
  extends React.ComponentProps<typeof NumberField.Input> {}

const NumberFieldInput: React.FC<NumberFieldInputProps> = ({ ...props }) => {
  return <NumberField.Input {...props} data-shunpo-number-field-input />;
};

interface NumberFieldIncrementProps
  extends React.ComponentProps<typeof NumberField.Increment> {}

const NumberFieldIncrement: React.FC<NumberFieldIncrementProps> = ({
  ...props
}) => {
  return (
    <NumberField.Increment {...props} data-shunpo-number-field-increment />
  );
};

interface NumberFieldDecrementProps
  extends React.ComponentProps<typeof NumberField.Decrement> {}

const NumberFieldDecrement: React.FC<NumberFieldDecrementProps> = ({
  ...props
}) => {
  return (
    <NumberField.Decrement {...props} data-shunpo-number-field-decrement />
  );
};

export {
  NumberFieldRoot as Root,
  NumberFieldScrubArea as ScrubArea,
  NumberFieldScrubAreaCursor as ScrubAreaCursor,
  NumberFieldGroup as Group,
  NumberFieldInput as Input,
  NumberFieldIncrement as Increment,
  NumberFieldDecrement as Decrement,
};
