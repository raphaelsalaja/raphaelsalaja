import { AnimatePresence, motion } from "motion/react";
import React, { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

import "react-loading-skeleton/dist/skeleton.css";

interface TextLineProps {
  text: string;
  skeleton?: {
    width?: string;
    height?: string;
    className?: string;
  };
  isLoading?: boolean;
  variant: "primary" | "secondary";
}

export const TextLine: React.FC<TextLineProps> = ({
  text,
  isLoading = false,
  variant,
  skeleton = { width: "60%", height: "13px" },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.lineContainer}>
      <AnimatePresence mode="popLayout" initial={false}>
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.text}
            data-variant={variant}
            style={{ height: 19.5 }}
          >
            <Skeleton
              width={skeleton.width}
              height={skeleton.height}
              style={{
                opacity: variant === "primary" ? 0.6 : 0.4,
                mixBlendMode: "lighten",
              }}
              borderRadius={100}
            />
          </motion.div>
        ) : (
          <motion.div
            key={text}
            className={styles.text}
            data-variant={variant}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
