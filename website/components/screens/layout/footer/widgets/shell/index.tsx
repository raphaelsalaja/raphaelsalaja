"use client";

import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

import styles from "./styles.module.scss";
import { TextLine } from "./text-line";

import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence, motion } from "motion/react";

interface WidgetProps {
  art: string;
  primaryText: string;
  secondaryText: string;
  background?: string;
  isLoading?: boolean;
  aspectRatio?: string;
  customBackground?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  art,
  isLoading = false,
  primaryText = "",
  secondaryText = "",
  background = "linear-gradient(180deg, #991eeb 0%, #5822b4 100%)",
  aspectRatio = "1 / 1",
  customBackground = null,
}) => (
  <div className={styles.widget} style={{ background }}>
    <div className={styles.container}>
      {customBackground}

      <AnimatePresence mode="popLayout" initial={false}>
        {isLoading ? (
          <motion.div
            key={"loading"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ aspectRatio }}
            className={styles.media}
          >
            <Skeleton
              borderRadius={8}
              style={{
                width: "200px",
                height: "200px",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.6,
                mixBlendMode: "lighten",
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key={art}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ aspectRatio }}
            className={styles.media}
          >
            <Image src={art} fill alt="Media" unoptimized className={styles.art} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.info}>
        <TextLine isLoading={isLoading} text={primaryText} variant="primary" />
        <TextLine isLoading={isLoading} skeleton={{ width: "40%" }} text={secondaryText} variant="secondary" />
      </div>
    </div>
  </div>
);
