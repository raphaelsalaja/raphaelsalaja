import { Select } from "@base-ui-components/react/select";

import "./styles.css";

interface SelectRootProps extends React.ComponentProps<typeof Select.Root> {
  label?: string;
}

const SelectRoot: React.FC<SelectRootProps> = ({ ...props }) => {
  return <Select.Root {...props} />;
};

interface SelectTriggerProps extends React.ComponentProps<typeof Select.Trigger> {}

const SelectTrigger: React.FC<SelectTriggerProps> = ({ ...props }) => {
  return <Select.Trigger data-select-trigger {...props} />;
};

interface SelectValueProps extends React.ComponentProps<typeof Select.Value> {}

const SelectValue: React.FC<SelectValueProps> = ({ ...props }) => {
  return <Select.Value data-select-value {...props} />;
};

interface SelectIconProps extends React.ComponentProps<typeof Select.Icon> {}

const SelectIcon: React.FC<SelectIconProps> = ({ ...props }) => {
  return <Select.Icon data-select-icon {...props} />;
};

interface SelectPortalProps extends React.ComponentProps<typeof Select.Portal> {}

const SelectPortal: React.FC<SelectPortalProps> = ({ ...props }) => {
  return <Select.Portal {...props} />;
};

interface SelectPositionerProps extends React.ComponentProps<typeof Select.Positioner> {}

const SelectPositioner: React.FC<SelectPositionerProps> = ({ ...props }) => {
  return <Select.Positioner data-select-positioner {...props} />;
};

interface SelectPopupProps extends React.ComponentProps<typeof Select.Popup> {}

const SelectPopup: React.FC<SelectPopupProps> = ({ ...props }) => {
  return <Select.Popup data-select-popup {...props} />;
};

interface SelectArrowProps extends React.ComponentProps<typeof Select.Arrow> {}

const SelectArrow: React.FC<SelectArrowProps> = ({ ...props }) => {
  return <Select.Arrow {...props} />;
};

interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {}

const SelectItem: React.FC<SelectItemProps> = ({ ...props }) => {
  return <Select.Item data-select-item {...props} />;
};

interface SelectItemIndicatorProps extends React.ComponentProps<typeof Select.ItemIndicator> {}

const SelectItemIndicator: React.FC<SelectItemIndicatorProps> = ({ ...props }) => {
  return <Select.ItemIndicator {...props} />;
};

interface SelectItemTextProps extends React.ComponentProps<typeof Select.ItemText> {}

const SelectItemText: React.FC<SelectItemTextProps> = ({ ...props }) => {
  return <Select.ItemText data-select-item-text {...props} />;
};

export const Group: React.FC<React.ComponentProps<typeof Select.Group>> = ({ ...props }) => {
  return <Select.Group data-select-group {...props} />;
};

export const GroupLabel: React.FC<React.ComponentProps<typeof Select.GroupLabel>> = ({ ...props }) => {
  return <Select.GroupLabel data-select-group-label {...props} />;
};

export const Separator: React.FC<React.ComponentProps<typeof Select.Separator>> = (props) => {
  return <Select.Separator data-select-separator {...props} />;
};

export {
  SelectRoot as Root,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectIcon as Icon,
  SelectPortal as Portal,
  SelectPositioner as Positioner,
  SelectPopup as Popup,
  SelectArrow as Arrow,
  SelectItem as Item,
  SelectItemIndicator as ItemIndicator,
  SelectItemText as ItemText,
};
