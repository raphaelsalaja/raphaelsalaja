import type { AnimationProps } from "motion/react";
import type React from "react";

interface Root extends React.HTMLAttributes<HTMLDivElement> {}

interface Content extends React.HTMLAttributes<HTMLDivElement> {
  transition?: AnimationProps["transition"];
}

export type { Content, Root };
