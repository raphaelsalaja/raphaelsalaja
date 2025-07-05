"use client";

import { Avatar } from "@base-ui-components/react/avatar";

import "./styles.css";

interface AvatarRootProps extends React.ComponentProps<typeof Avatar.Root> {
  size?: "sm" | "md" | "lg" | "xl";
}

const AvatarRoot: React.FC<AvatarRootProps> = ({ size = "md", ...props }) => {
  return <Avatar.Root {...props} data-shunpo-avatar-root data-size={size} />;
};

interface AvatarImageProps extends React.ComponentProps<typeof Avatar.Image> {}

const AvatarImage: React.FC<AvatarImageProps> = ({ ...props }) => {
  return <Avatar.Image {...props} data-shunpo-avatar-image />;
};

interface AvatarFallbackProps extends React.ComponentProps<typeof Avatar.Fallback> {}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ ...props }) => {
  return <Avatar.Fallback {...props} data-shunpo-avatar-fallback />;
};

export {
  AvatarRoot as Root,
  AvatarImage as Image,
  AvatarFallback as Fallback,
};
