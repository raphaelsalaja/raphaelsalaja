"use client";

import { Dialog } from "@base-ui-components/react/dialog";

import "./styles.css";

interface DialogRootProps extends React.ComponentProps<typeof Dialog.Root> {}

const DialogRoot: React.FC<DialogRootProps> = ({ ...props }) => {
  return <Dialog.Root {...props} data-shunpo-dialog-root />;
};

interface DialogTriggerProps
  extends React.ComponentProps<typeof Dialog.Trigger> {}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ ...props }) => {
  return <Dialog.Trigger {...props} data-shunpo-dialog-trigger />;
};

interface DialogPortalProps
  extends React.ComponentProps<typeof Dialog.Portal> {}

const DialogPortal: React.FC<DialogPortalProps> = ({ ...props }) => {
  return <Dialog.Portal {...props} data-shunpo-dialog-portal />;
};

interface DialogBackdropProps
  extends React.ComponentProps<typeof Dialog.Backdrop> {}

const DialogBackdrop: React.FC<DialogBackdropProps> = ({ ...props }) => {
  return <Dialog.Backdrop {...props} data-shunpo-dialog-backdrop />;
};

interface DialogPopupProps extends React.ComponentProps<typeof Dialog.Popup> {}

const DialogPopup: React.FC<DialogPopupProps> = ({ ...props }) => {
  return <Dialog.Popup {...props} data-shunpo-dialog-popup />;
};

interface DialogTitleProps extends React.ComponentProps<typeof Dialog.Title> {}

const DialogTitle: React.FC<DialogTitleProps> = ({ ...props }) => {
  return <Dialog.Title {...props} data-shunpo-dialog-title />;
};

interface DialogDescriptionProps
  extends React.ComponentProps<typeof Dialog.Description> {}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ ...props }) => {
  return <Dialog.Description {...props} data-shunpo-dialog-description />;
};

interface DialogCloseProps extends React.ComponentProps<typeof Dialog.Close> {}

const DialogClose: React.FC<DialogCloseProps> = ({ ...props }) => {
  return <Dialog.Close {...props} data-shunpo-dialog-close />;
};

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogBackdrop as Backdrop,
  DialogPopup as Popup,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close,
};
