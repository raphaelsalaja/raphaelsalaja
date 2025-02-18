'use client'

import { Menu } from '@base-ui-components/react/menu'

import './styles.css'

interface MenuRootProps extends React.ComponentProps<typeof Menu.Root> {}

const MenuRoot: React.FC<MenuRootProps> = ({ ...props }) => {
  return <Menu.Root {...props} data-shunpo-menu-root />
}

interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenuLabel: React.FC<MenuLabelProps> = ({ ...props }) => {
  return <span {...props} data-shunpo-menu-label />
}

interface MenuTriggerProps extends React.ComponentProps<typeof Menu.Trigger> {}

const MenuTrigger: React.FC<MenuTriggerProps> = ({ ...props }) => {
  return <Menu.Trigger {...props} data-shunpo-menu-trigger />
}

interface MenuPortalProps extends React.ComponentProps<typeof Menu.Portal> {}

const MenuPortal: React.FC<MenuPortalProps> = ({ ...props }) => {
  return <Menu.Portal {...props} data-shunpo-menu-portal />
}

interface MenuBackdropProps extends React.ComponentProps<typeof Menu.Backdrop> {}

const MenuBackdrop: React.FC<MenuBackdropProps> = ({ ...props }) => {
  return <Menu.Backdrop {...props} data-shunpo-menu-backdrop />
}

interface MenuPositionerProps extends React.ComponentProps<typeof Menu.Positioner> {}

const MenuPositioner: React.FC<MenuPositionerProps> = ({ ...props }) => {
  return <Menu.Positioner {...props} data-shunpo-menu-positioner />
}

interface MenuPopupProps extends React.ComponentProps<typeof Menu.Popup> {}

const MenuPopup: React.FC<MenuPopupProps> = ({ ...props }) => {
  return <Menu.Popup {...props} data-shunpo-menu-popup />
}

interface MenuArrowProps extends React.ComponentProps<typeof Menu.Arrow> {}

const MenuArrow: React.FC<MenuArrowProps> = ({ ...props }) => {
  return <Menu.Arrow {...props} data-shunpo-menu-arrow />
}

interface MenuItemProps extends React.ComponentProps<typeof Menu.Item> {}

const MenuItem: React.FC<MenuItemProps> = ({ ...props }) => {
  return <Menu.Item {...props} data-shunpo-menu-item />
}

interface MenuSeparatorProps extends React.ComponentProps<typeof Menu.Separator> {}

const MenuSeparator: React.FC<MenuSeparatorProps> = ({ ...props }) => {
  return <Menu.Separator {...props} data-shunpo-menu-separator />
}

interface MenuGroupProps extends React.ComponentProps<typeof Menu.Group> {}

const MenuGroup: React.FC<MenuGroupProps> = ({ ...props }) => {
  return <Menu.Group {...props} data-shunpo-menu-group />
}

interface MenuGroupLabelProps extends React.ComponentProps<typeof Menu.GroupLabel> {}

const MenuGroupLabel: React.FC<MenuGroupLabelProps> = ({ ...props }) => {
  return <Menu.GroupLabel {...props} data-shunpo-menu-group-label />
}

interface MenuRadioGroupProps extends React.ComponentProps<typeof Menu.RadioGroup> {}

const MenuRadioGroup: React.FC<MenuRadioGroupProps> = ({ ...props }) => {
  return <Menu.RadioGroup {...props} data-shunpo-menu-radio-group />
}

interface MenuRadioItemProps extends React.ComponentProps<typeof Menu.RadioItem> {}

const MenuRadioItem: React.FC<MenuRadioItemProps> = ({ ...props }) => {
  return <Menu.RadioItem {...props} data-shunpo-menu-radio-item />
}

interface MenuCheckboxItemProps extends React.ComponentProps<typeof Menu.CheckboxItem> {}

const MenuCheckboxItem: React.FC<MenuCheckboxItemProps> = ({ ...props }) => {
  return <Menu.CheckboxItem {...props} data-shunpo-menu-checkbox-item />
}

export {
  MenuRoot as Root,
  MenuLabel as Label,
  MenuTrigger as Trigger,
  MenuPortal as Portal,
  MenuBackdrop as Backdrop,
  MenuPositioner as Positioner,
  MenuPopup as Popup,
  MenuArrow as Arrow,
  MenuItem as Item,
  MenuSeparator as Separator,
  MenuGroup as Group,
  MenuGroupLabel as GroupLabel,
  MenuRadioGroup as RadioGroup,
  MenuRadioItem as RadioItem,
  MenuCheckboxItem as CheckboxItem
}
