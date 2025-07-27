"use client";

import {
  AnimatePresence,
  type AnimatePresenceProps,
  type HTMLMotionProps,
  motion,
} from "motion/react";
import type * as React from "react";

type Props = React.PropsWithChildren<{
  condition: boolean;
  wrap: (children: React.ReactNode) => React.ReactNode;
  presence?: AnimatePresenceProps;
  animation?: HTMLMotionProps<"div">;
}>;

export const ConditionalWrap: React.FC<Props> = ({
  wrap,
  children,
  condition,
  presence = {
    initial: false,
    mode: "popLayout",
  },
  animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.4,
    },
  },
}) => (
  <AnimatePresence {...presence}>
    {condition ? (
      <motion.div data-condition="true" key={"primary"} {...animation}>
        {wrap(children)}
      </motion.div>
    ) : (
      <motion.div data-condition="false" key={"secondary"} {...animation}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
