"use client";

import { Link1Icon } from "@radix-ui/react-icons";
import { type HTMLMotionProps, motion } from "motion/react";
import styles from "./styles.module.css";

export interface HeadingProps extends HTMLMotionProps<"h1"> {
  id: string;
}

const Heading = (props: HeadingProps) => {
  const [hovering, setHovering] = React.useState(false);

  const onClick = () => {
    if (props.id) {
      const element = document.getElementById(props.id);
      if (element) {
        const yOffset = -48;
        const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    }
  };

  const onHoverStart = () => {
    setHovering(true);
  };

  const onHoverEnd = () => {
    setHovering(false);
  };

  const initial = { opacity: 0 };
  const animate = { opacity: hovering ? 1 : 0 };
  const exit = { opacity: 0 };
  const transition = { duration: 0.2 };

  return (
    <motion.h1
      {...props}
      className={styles.heading}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div initial={initial} animate={animate} exit={exit} transition={transition} className={styles.icon}>
        <Link1Icon />
      </motion.div>

      {props.children as React.ReactNode}
    </motion.h1>
  );
};

export default Heading;
