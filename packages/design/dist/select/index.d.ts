import { Select } from '@base-ui-components/react/select';

interface SelectRootProps extends React.ComponentProps<typeof Select.Root> {
}
declare const SelectRoot: React.FC<SelectRootProps>;
interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const SelectLabel: React.FC<SelectLabelProps>;
interface SelectTriggerProps extends React.ComponentProps<typeof Select.Trigger> {
}
declare const SelectTrigger: React.FC<SelectTriggerProps>;
interface SelectValueProps extends React.ComponentProps<typeof Select.Value> {
}
declare const SelectValue: React.FC<SelectValueProps>;
interface SelectIconProps extends React.ComponentProps<typeof Select.Icon> {
}
declare const SelectIcon: React.FC<SelectIconProps>;
interface SelectPortalProps extends React.ComponentProps<typeof Select.Portal> {
}
declare const SelectPortal: React.FC<SelectPortalProps>;
interface SelectPositionerProps extends React.ComponentProps<typeof Select.Positioner> {
}
declare const SelectPositioner: React.FC<SelectPositionerProps>;
interface SelectPopupProps extends React.ComponentProps<typeof Select.Popup> {
}
declare const SelectPopup: React.FC<SelectPopupProps>;
interface SelectArrowProps extends React.ComponentProps<typeof Select.Arrow> {
}
declare const SelectArrow: React.FC<SelectArrowProps>;
interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {
}
declare const SelectItem: React.FC<SelectItemProps>;
interface SelectItemIndicatorProps extends React.ComponentProps<typeof Select.ItemIndicator> {
}
declare const SelectItemIndicator: React.FC<SelectItemIndicatorProps>;
interface SelectItemTextProps extends React.ComponentProps<typeof Select.ItemText> {
}
declare const SelectItemText: React.FC<SelectItemTextProps>;

export { SelectArrow as Arrow, SelectIcon as Icon, SelectItem as Item, SelectItemIndicator as ItemIndicator, SelectItemText as ItemText, SelectLabel as Label, SelectPopup as Popup, SelectPortal as Portal, SelectPositioner as Positioner, SelectRoot as Root, SelectTrigger as Trigger, SelectValue as Value };
