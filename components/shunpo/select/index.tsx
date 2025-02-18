import { Select } from "@base-ui-components/react/select";

import styles from "./styles.module.scss";

interface SelectRootProps extends React.ComponentProps<typeof Select.Root> {}

const SelectRoot: React.FC<SelectRootProps> = ({ children, ...props }) => {
  return (
    <div className={styles.select}>
      <Select.Root {...props}>{children}</Select.Root>
    </div>
  );
};

interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectLabel: React.FC<SelectLabelProps> = ({ children, ...props }) => {
  return (
    <span className={styles.label} {...props}>
      {children}
    </span>
  );
};

interface SelectTriggerProps extends React.ComponentProps<typeof Select.Trigger> {}

const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, ...props }) => {
  return (
    <Select.Trigger className={styles.trigger} {...props}>
      {children}
    </Select.Trigger>
  );
};

interface SelectValueProps extends React.ComponentProps<typeof Select.Value> {}

const SelectValue: React.FC<SelectValueProps> = ({ children, ...props }) => {
  return (
    <Select.Value className={styles.value} {...props}>
      {children}
    </Select.Value>
  );
};

interface SelectIconProps extends React.ComponentProps<typeof Select.Icon> {}

const SelectIcon: React.FC<SelectIconProps> = ({ children, ...props }) => {
  return (
    <Select.Icon className={styles.icon} {...props}>
      {children}
    </Select.Icon>
  );
};

interface SelectPortalProps extends React.ComponentProps<typeof Select.Portal> {}

const SelectPortal: React.FC<SelectPortalProps> = ({ children, ...props }) => {
  return <Select.Portal {...props}>{children}</Select.Portal>;
};

interface SelectPositionerProps extends React.ComponentProps<typeof Select.Positioner> {}

const SelectPositioner: React.FC<SelectPositionerProps> = ({ children, ...props }) => {
  return (
    <Select.Positioner className={styles.positioner} {...props}>
      {children}
    </Select.Positioner>
  );
};

interface SelectPopupProps extends React.ComponentProps<typeof Select.Popup> {}

const SelectPopup: React.FC<SelectPopupProps> = ({ children, ...props }) => {
  return (
    <Select.Popup className={styles.popup} {...props}>
      {children}
    </Select.Popup>
  );
};

interface SelectArrowProps extends React.ComponentProps<typeof Select.Arrow> {}

const SelectArrow: React.FC<SelectArrowProps> = ({ children, ...props }) => {
  return <Select.Arrow {...props}>{children}</Select.Arrow>;
};

interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {}

const SelectItem: React.FC<SelectItemProps> = ({ children, ...props }) => {
  return (
    <Select.Item className={styles.item} {...props}>
      {children}
    </Select.Item>
  );
};

interface SelectItemIndicatorProps extends React.ComponentProps<typeof Select.ItemIndicator> {}

const SelectItemIndicator: React.FC<SelectItemIndicatorProps> = ({ children, ...props }) => {
  return <Select.ItemIndicator {...props}>{children}</Select.ItemIndicator>;
};

interface SelectItemTextProps extends React.ComponentProps<typeof Select.ItemText> {}

const SelectItemText: React.FC<SelectItemTextProps> = ({ children, ...props }) => {
  return (
    <Select.ItemText className={styles.text} {...props}>
      {children}
    </Select.ItemText>
  );
};

export {
  SelectRoot as Root,
  SelectLabel as Label,
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
