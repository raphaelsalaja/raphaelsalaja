"use client";

import { Toast } from "@base-ui-components/react/toast";

import "./styles.css";

interface ToastProviderProps
  extends React.ComponentProps<typeof Toast.Provider> {}

const ToastProvider: React.FC<ToastProviderProps> = ({ ...props }) => {
  return <Toast.Provider {...props} data-shunpo-toast-provider />;
};

interface ToastPortalProps extends React.ComponentProps<typeof Toast.Portal> {}

const ToastPortal: React.FC<ToastPortalProps> = ({ ...props }) => {
  return <Toast.Portal {...props} data-shunpo-toast-portal />;
};

interface ToastViewportProps
  extends React.ComponentProps<typeof Toast.Viewport> {}

const ToastViewport: React.FC<ToastViewportProps> = ({ ...props }) => {
  return <Toast.Viewport {...props} data-shunpo-toast-viewport />;
};

interface ToastRootProps extends React.ComponentProps<typeof Toast.Root> {
  variant?: "default" | "success" | "warning" | "error";
}

const ToastRoot: React.FC<ToastRootProps> = ({
  variant = "default",
  ...props
}) => {
  return (
    <Toast.Root {...props} data-shunpo-toast-root data-variant={variant} />
  );
};

interface ToastTitleProps extends React.ComponentProps<typeof Toast.Title> {}

const ToastTitle: React.FC<ToastTitleProps> = ({ ...props }) => {
  return <Toast.Title {...props} data-shunpo-toast-title />;
};

interface ToastDescriptionProps
  extends React.ComponentProps<typeof Toast.Description> {}

const ToastDescription: React.FC<ToastDescriptionProps> = ({ ...props }) => {
  return <Toast.Description {...props} data-shunpo-toast-description />;
};

interface ToastActionProps extends React.ComponentProps<typeof Toast.Action> {}

const ToastAction: React.FC<ToastActionProps> = ({ ...props }) => {
  return <Toast.Action {...props} data-shunpo-toast-action />;
};

interface ToastCloseProps extends React.ComponentProps<typeof Toast.Close> {}

const ToastClose: React.FC<ToastCloseProps> = ({ ...props }) => {
  return <Toast.Close {...props} data-shunpo-toast-close />;
};

// Hook exports
const useToastManager = Toast.useToastManager;
const createToastManager = Toast.createToastManager;

export {
  ToastProvider as Provider,
  ToastPortal as Portal,
  ToastViewport as Viewport,
  ToastRoot as Root,
  ToastTitle as Title,
  ToastDescription as Description,
  ToastAction as Action,
  ToastClose as Close,
  useToastManager,
  createToastManager,
};
