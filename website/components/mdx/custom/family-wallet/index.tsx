"use client";

import React from "react";
import styles from "./styles.module.scss";
import { Shape6 as Icon } from "@/components/posts/placeholder/shapes";
import { CopyIcon, EllipsisIcon } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

export const FamilyWallet: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const properties = {
    collapsed: {
      wallet: {
        width: 200,
      },
    },
    expanded: {
      wallet: {
        width: 420,
      },
    },
  };

  const animations = {
    fade: {
      initial: { opacity: 0, filter: "blur(2px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(2px)" },
      transition: {
        ease: [0.19, 1, 0.22, 1],
        duration: 0.4,
      },
    },
  };

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 80,
        mass: 4,
      }}
    >
      <motion.div
        ref={ref}
        initial={{ width: properties.collapsed.wallet.width }}
        animate={{
          width: isExpanded ? properties.expanded.wallet.width : properties.collapsed.wallet.width,
        }}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className={styles.wallet}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.icon}>
          <Icon className={styles.shape} fill="var(--white-a12)" />
        </div>

        <span className={styles.details}>
          <p data-text="primary" className={styles.text}>
            Raphael
          </p>
          <p data-text="secondary" className={styles.text}>
            $431
          </p>
        </span>

        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div {...animations.fade} key={"expanded"} className={styles.copy}>
              <p data-text="primary" key={"text"} className={styles.text}>
                Copy Address
              </p>
              <CopyIcon strokeWidth={3} className={styles.symbol} />
            </motion.div>
          ) : (
            <motion.div {...animations.fade} key={"collapsed"} className={styles.options}>
              <EllipsisIcon />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div {...animations.fade} className={styles.customize}>
              <p data-text="primary" className={styles.text}>
                Customize
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
};
