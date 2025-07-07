"use client";

import { ScrollArea } from "@base-ui-components/react/scroll-area";

import "./styles.css";

interface ScrollAreaRootProps extends React.ComponentProps<typeof ScrollArea.Root> {}

const ScrollAreaRoot: React.FC<ScrollAreaRootProps> = ({ ...props }) => {
  return <ScrollArea.Root {...props} data-shunpo-scroll-area-root />;
};

interface ScrollAreaViewportProps extends React.ComponentProps<typeof ScrollArea.Viewport> {}

const ScrollAreaViewport: React.FC<ScrollAreaViewportProps> = ({ ...props }) => {
  return <ScrollArea.Viewport {...props} data-shunpo-scroll-area-viewport />;
};

interface ScrollAreaScrollbarProps extends React.ComponentProps<typeof ScrollArea.Scrollbar> {}

const ScrollAreaScrollbar: React.FC<ScrollAreaScrollbarProps> = ({ ...props }) => {
  return <ScrollArea.Scrollbar {...props} data-shunpo-scroll-area-scrollbar />;
};

interface ScrollAreaThumbProps extends React.ComponentProps<typeof ScrollArea.Thumb> {}

const ScrollAreaThumb: React.FC<ScrollAreaThumbProps> = ({ ...props }) => {
  return <ScrollArea.Thumb {...props} data-shunpo-scroll-area-thumb />;
};

interface ScrollAreaCornerProps extends React.ComponentProps<typeof ScrollArea.Corner> {}

const ScrollAreaCorner: React.FC<ScrollAreaCornerProps> = ({ ...props }) => {
  return <ScrollArea.Corner {...props} data-shunpo-scroll-area-corner />;
};

export { ScrollAreaRoot as Root, ScrollAreaViewport as Viewport, ScrollAreaScrollbar as Scrollbar, ScrollAreaThumb as Thumb, ScrollAreaCorner as Corner };
