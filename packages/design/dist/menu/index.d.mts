import { Menu } from '@base-ui-components/react/menu';

interface MenuRootProps extends React.ComponentProps<typeof Menu.Root> {
}
declare const MenuRoot: React.FC<MenuRootProps>;
interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const MenuLabel: React.FC<MenuLabelProps>;
interface MenuTriggerProps extends React.ComponentProps<typeof Menu.Trigger> {
}
declare const MenuTrigger: React.FC<MenuTriggerProps>;
interface MenuPortalProps extends React.ComponentProps<typeof Menu.Portal> {
}
declare const MenuPortal: React.FC<MenuPortalProps>;
interface MenuBackdropProps extends React.ComponentProps<typeof Menu.Backdrop> {
}
declare const MenuBackdrop: React.FC<MenuBackdropProps>;
interface MenuPositionerProps extends React.ComponentProps<typeof Menu.Positioner> {
}
declare const MenuPositioner: React.FC<MenuPositionerProps>;
interface MenuPopupProps extends React.ComponentProps<typeof Menu.Popup> {
}
declare const MenuPopup: React.FC<MenuPopupProps>;
interface MenuArrowProps extends React.ComponentProps<typeof Menu.Arrow> {
}
declare const MenuArrow: React.FC<MenuArrowProps>;
interface MenuItemProps extends React.ComponentProps<typeof Menu.Item> {
}
declare const MenuItem: React.FC<MenuItemProps>;
interface MenuSeparatorProps extends React.ComponentProps<typeof Menu.Separator> {
}
declare const MenuSeparator: React.FC<MenuSeparatorProps>;
interface MenuGroupProps extends React.ComponentProps<typeof Menu.Group> {
}
declare const MenuGroup: React.FC<MenuGroupProps>;
interface MenuGroupLabelProps extends React.ComponentProps<typeof Menu.GroupLabel> {
}
declare const MenuGroupLabel: React.FC<MenuGroupLabelProps>;
interface MenuRadioGroupProps extends React.ComponentProps<typeof Menu.RadioGroup> {
}
declare const MenuRadioGroup: React.FC<MenuRadioGroupProps>;
interface MenuRadioItemProps extends React.ComponentProps<typeof Menu.RadioItem> {
}
declare const MenuRadioItem: React.FC<MenuRadioItemProps>;
interface MenuCheckboxItemProps extends React.ComponentProps<typeof Menu.CheckboxItem> {
}
declare const MenuCheckboxItem: React.FC<MenuCheckboxItemProps>;

export { MenuArrow as Arrow, MenuBackdrop as Backdrop, MenuCheckboxItem as CheckboxItem, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuItem as Item, MenuLabel as Label, MenuPopup as Popup, MenuPortal as Portal, MenuPositioner as Positioner, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, MenuRoot as Root, MenuSeparator as Separator, MenuTrigger as Trigger };
