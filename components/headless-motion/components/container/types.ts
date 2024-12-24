import type { AnimationProps } from "framer-motion";
import type React from "react";

interface Root extends React.HTMLAttributes<HTMLDivElement> {}

interface Content extends React.HTMLAttributes<HTMLDivElement> {
  transition?: AnimationProps["transition"];
}

export type { Content, Root };
