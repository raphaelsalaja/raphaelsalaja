"use client";

import { Progress } from "@base-ui-components/react/progress";

import "./styles.css";

interface ProgressRootProps extends React.ComponentProps<typeof Progress.Root> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
}

const ProgressRoot: React.FC<ProgressRootProps> = ({ size = "md", variant = "default", ...props }) => {
  return <Progress.Root {...props} data-shunpo-progress-root data-size={size} data-variant={variant} />;
};

interface ProgressTrackProps extends React.ComponentProps<typeof Progress.Track> {}

const ProgressTrack: React.FC<ProgressTrackProps> = ({ ...props }) => {
  return <Progress.Track {...props} data-shunpo-progress-track />;
};

interface ProgressIndicatorProps extends React.ComponentProps<typeof Progress.Indicator> {}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ ...props }) => {
  return <Progress.Indicator {...props} data-shunpo-progress-indicator />;
};

export {
  ProgressRoot as Root,
  ProgressTrack as Track,
  ProgressIndicator as Indicator,
};
