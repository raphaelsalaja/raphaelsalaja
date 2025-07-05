import { PreviewCard } from "@base-ui-components/react/preview-card";
import type { ComponentPropsWithoutRef } from "react";
import "./styles.css";

// PreviewCard Root
export interface PreviewCardRootProps extends ComponentPropsWithoutRef<typeof PreviewCard.Root> {}

export const PreviewCardRoot: React.FC<PreviewCardRootProps> = ({ ...props }) => {
  return <PreviewCard.Root {...props} data-shunpo-preview-card-root />;
};

// PreviewCard Trigger
export interface PreviewCardTriggerProps extends ComponentPropsWithoutRef<typeof PreviewCard.Trigger> {}

export const PreviewCardTrigger: React.FC<PreviewCardTriggerProps> = ({ ...props }) => {
  return <PreviewCard.Trigger {...props} data-shunpo-preview-card-trigger />;
};

// PreviewCard Portal
export interface PreviewCardPortalProps extends ComponentPropsWithoutRef<typeof PreviewCard.Portal> {}

export const PreviewCardPortal: React.FC<PreviewCardPortalProps> = ({ ...props }) => {
  return <PreviewCard.Portal {...props} data-shunpo-preview-card-portal />;
};

// PreviewCard Backdrop
export interface PreviewCardBackdropProps extends ComponentPropsWithoutRef<typeof PreviewCard.Backdrop> {}

export const PreviewCardBackdrop: React.FC<PreviewCardBackdropProps> = ({ ...props }) => {
  return <PreviewCard.Backdrop {...props} data-shunpo-preview-card-backdrop />;
};

// PreviewCard Positioner
export interface PreviewCardPositionerProps extends ComponentPropsWithoutRef<typeof PreviewCard.Positioner> {}

export const PreviewCardPositioner: React.FC<PreviewCardPositionerProps> = ({ ...props }) => {
  return <PreviewCard.Positioner {...props} data-shunpo-preview-card-positioner />;
};

// PreviewCard Popup
export interface PreviewCardPopupProps extends ComponentPropsWithoutRef<typeof PreviewCard.Popup> {}

export const PreviewCardPopup: React.FC<PreviewCardPopupProps> = ({ ...props }) => {
  return <PreviewCard.Popup {...props} data-shunpo-preview-card-popup />;
};

// PreviewCard Arrow
export interface PreviewCardArrowProps extends ComponentPropsWithoutRef<typeof PreviewCard.Arrow> {}

export const PreviewCardArrow: React.FC<PreviewCardArrowProps> = ({ ...props }) => {
  return <PreviewCard.Arrow {...props} data-shunpo-preview-card-arrow />;
};
