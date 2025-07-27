"use client";

import { AlertDialog } from "@base-ui-components/react/alert-dialog";

import "./styles.css";

interface AlertDialogRootProps
  extends React.ComponentProps<typeof AlertDialog.Root> {}

const AlertDialogRoot: React.FC<AlertDialogRootProps> = ({ ...props }) => {
  return <AlertDialog.Root {...props} data-shunpo-alert-dialog-root />;
};

interface AlertDialogTriggerProps
  extends React.ComponentProps<typeof AlertDialog.Trigger> {}

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  ...props
}) => {
  return <AlertDialog.Trigger {...props} data-shunpo-alert-dialog-trigger />;
};

interface AlertDialogPortalProps
  extends React.ComponentProps<typeof AlertDialog.Portal> {}

const AlertDialogPortal: React.FC<AlertDialogPortalProps> = ({ ...props }) => {
  return <AlertDialog.Portal {...props} data-shunpo-alert-dialog-portal />;
};

interface AlertDialogBackdropProps
  extends React.ComponentProps<typeof AlertDialog.Backdrop> {}

const AlertDialogBackdrop: React.FC<AlertDialogBackdropProps> = ({
  ...props
}) => {
  return <AlertDialog.Backdrop {...props} data-shunpo-alert-dialog-backdrop />;
};

interface AlertDialogPopupProps
  extends React.ComponentProps<typeof AlertDialog.Popup> {}

const AlertDialogPopup: React.FC<AlertDialogPopupProps> = ({ ...props }) => {
  return <AlertDialog.Popup {...props} data-shunpo-alert-dialog-popup />;
};

interface AlertDialogTitleProps
  extends React.ComponentProps<typeof AlertDialog.Title> {}

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({ ...props }) => {
  return <AlertDialog.Title {...props} data-shunpo-alert-dialog-title />;
};

interface AlertDialogDescriptionProps
  extends React.ComponentProps<typeof AlertDialog.Description> {}

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  ...props
}) => {
  return (
    <AlertDialog.Description {...props} data-shunpo-alert-dialog-description />
  );
};

interface AlertDialogCloseProps
  extends React.ComponentProps<typeof AlertDialog.Close> {}

const AlertDialogClose: React.FC<AlertDialogCloseProps> = ({ ...props }) => {
  return <AlertDialog.Close {...props} data-shunpo-alert-dialog-close />;
};

export {
  AlertDialogRoot as Root,
  AlertDialogTrigger as Trigger,
  AlertDialogPortal as Portal,
  AlertDialogBackdrop as Backdrop,
  AlertDialogPopup as Popup,
  AlertDialogTitle as Title,
  AlertDialogDescription as Description,
  AlertDialogClose as Close,
};
