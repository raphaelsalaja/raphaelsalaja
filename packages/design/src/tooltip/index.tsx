"use client";

import { Tooltip } from "@base-ui-components/react/tooltip";

import "./styles.css";

interface TooltipRootProps extends React.ComponentProps<typeof Tooltip.Root> {}

const TooltipRoot: React.FC<TooltipRootProps> = ({ ...props }) => {
  return <Tooltip.Root {...props} data-shunpo-tooltip-root />;
};

interface TooltipTriggerProps
  extends React.ComponentProps<typeof Tooltip.Trigger> {}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ ...props }) => {
  return <Tooltip.Trigger {...props} data-shunpo-tooltip-trigger />;
};

interface TooltipPortalProps
  extends React.ComponentProps<typeof Tooltip.Portal> {}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ ...props }) => {
  return <Tooltip.Portal {...props} data-shunpo-tooltip-portal />;
};

interface TooltipPositionerProps
  extends React.ComponentProps<typeof Tooltip.Positioner> {}

const TooltipPositioner: React.FC<TooltipPositionerProps> = ({ ...props }) => {
  return <Tooltip.Positioner {...props} data-shunpo-tooltip-positioner />;
};

interface TooltipPopupProps
  extends React.ComponentProps<typeof Tooltip.Popup> {}

const TooltipPopup: React.FC<TooltipPopupProps> = ({ ...props }) => {
  return <Tooltip.Popup {...props} data-shunpo-tooltip-popup />;
};

interface TooltipArrowProps
  extends React.ComponentProps<typeof Tooltip.Arrow> {}

const TooltipArrow: React.FC<TooltipArrowProps> = ({ ...props }) => {
  return <Tooltip.Arrow {...props} data-shunpo-tooltip-arrow />;
};

export {
  TooltipRoot as Root,
  TooltipTrigger as Trigger,
  TooltipPortal as Portal,
  TooltipPositioner as Positioner,
  TooltipPopup as Popup,
  TooltipArrow as Arrow,
};
