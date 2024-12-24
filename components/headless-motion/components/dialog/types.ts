import type { AnimationProps } from "framer-motion";
import type React from "react";

interface Context {
  open: boolean;
  setOpen: (open: boolean) => void;
  layoutId: string;
}

interface Root extends React.HTMLAttributes<HTMLDivElement> {
  transition?: AnimationProps["transition"];
}

interface Trigger extends React.HTMLAttributes<HTMLDivElement> {}

interface Portal extends React.HTMLAttributes<HTMLDivElement> {}

interface Background extends React.HTMLAttributes<HTMLDivElement> {}

interface Content extends React.HTMLAttributes<HTMLDivElement> {}

interface Item extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export type { Background, Content, Context, Item, Portal, Root, Trigger };
