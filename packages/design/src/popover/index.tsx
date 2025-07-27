import { Popover } from "@base-ui-components/react/popover";

import "./styles.css";

interface PopoverRootProps extends React.ComponentProps<typeof Popover.Root> {
  label?: string;
}

const PopoverRoot: React.FC<PopoverRootProps> = ({ ...props }) => {
  return <Popover.Root data-popover-root {...props} />;
};

interface PopoverTriggerProps
  extends React.ComponentProps<typeof Popover.Trigger> {}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ ...props }) => {
  return <Popover.Trigger data-popover-trigger {...props} />;
};

interface PopoverBackdropProps
  extends React.ComponentProps<typeof Popover.Backdrop> {}

const PopoverBackdrop: React.FC<PopoverBackdropProps> = ({ ...props }) => {
  return <Popover.Backdrop data-popover-backdrop {...props} />;
};

interface PopoverPortalProps
  extends React.ComponentProps<typeof Popover.Portal> {}

const PopoverPortal: React.FC<PopoverPortalProps> = ({ ...props }) => {
  return <Popover.Portal data-popover-portal {...props} />;
};

interface PopoverPositionerProps
  extends React.ComponentProps<typeof Popover.Positioner> {}

const PopoverPositioner: React.FC<PopoverPositionerProps> = ({ ...props }) => {
  return <Popover.Positioner data-popover-positioner {...props} />;
};

interface PopoverPopupProps
  extends React.ComponentProps<typeof Popover.Popup> {}

const PopoverPopup: React.FC<PopoverPopupProps> = ({ ...props }) => {
  return <Popover.Popup data-popover-popup {...props} />;
};

interface PopoverArrowProps
  extends React.ComponentProps<typeof Popover.Arrow> {}

const PopoverArrow: React.FC<PopoverArrowProps> = ({ ...props }) => {
  return <Popover.Arrow data-popover-arrow {...props} />;
};

interface PopoverTitleProps
  extends React.ComponentProps<typeof Popover.Title> {}

const PopoverTitle: React.FC<PopoverTitleProps> = ({ ...props }) => {
  return <Popover.Title data-popover-title {...props} />;
};

interface PopoverDescriptionProps
  extends React.ComponentProps<typeof Popover.Description> {}

const PopoverDescription: React.FC<PopoverDescriptionProps> = ({
  ...props
}) => {
  return <Popover.Description data-popover-description {...props} />;
};

interface PopoverCloseProps
  extends React.ComponentProps<typeof Popover.Close> {}

const PopoverClose: React.FC<PopoverCloseProps> = ({ ...props }) => {
  return <Popover.Close data-popover-close {...props} />;
};

export {
  PopoverRoot as Root,
  PopoverTrigger as Trigger,
  PopoverBackdrop as Backdrop,
  PopoverPortal as Portal,
  PopoverPositioner as Positioner,
  PopoverPopup as Popup,
  PopoverArrow as Arrow,
  PopoverTitle as Title,
  PopoverDescription as Description,
  PopoverClose as Close,
};
