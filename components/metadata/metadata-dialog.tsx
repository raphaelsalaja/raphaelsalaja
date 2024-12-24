"use client";

import { Browser, Deployment, Dimensions, Geolocation, Source, Time } from "@/components/metadata/metadata-instruments";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

import { clsx } from "clsx";

const MetadataDialog: React.FC = () => {
  const [show, setShow] = useState(false);

  const container = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      paddingBottom: "0px",
      padding: show ? "4px" : "0",
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.1,
        duration: 0.75,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    },
  };

  const content = {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      borderRadius: "12px",
      transition: {
        ease: [0.32, 0.72, 0, 1],
        duration: 0.75,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.25,
      },
    },
  };

  const icon = {
    initial: {
      opacity: 0,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ease: [0.32, 0.72, 0, 1],
        duration: 1.5,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={container}
      style={{
        overflow: "hidden",
        borderRadius: "16px",
        backgroundColor: "hsl(var(--muted))",
        bottom: "2rem",
        position: "fixed",
      }}
    >
      <div className={clsx("flex flex-col items-center justify-center")}>
        <AnimatePresence mode="popLayout" initial={false}>
          {show && (
            <motion.div
              layout
              key="content"
              variants={content}
              initial="initial"
              animate="animate"
              exit="exit"
              className="z-0 flex flex-col gap-2 border bg-white p-4 shadow-sm"
            >
              <div className="flex h-6 items-center justify-between gap-2">
                <h1 className="font-semibold">Site Metadata</h1>
                {/* <Button
                  onClick={() => setShow(false)}
                  variant='outline'
                  className='h-6 w-6 rounded p-1 shadow-none hover:bg-gray-100'
                >
                  <Cross1Icon />
                </Button> */}
              </div>

              <div className="grid grid-cols-3 gap-x-8 gap-y-4 transition-all">
                <Deployment />
                <Geolocation />
                <Browser />
                <Dimensions />
                <Source />
                <Time />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout" initial={false}>
          {show && (
            <motion.div
              layout
              key="caption"
              variants={content}
              initial="initial"
              animate="animate"
              exit="exit"
              className="z-0 flex flex-col items-center justify-center p-3 align-middle text-xs text-muted-foreground/50"
            >
              <div>
                Powered by
                <Link
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 font-medium text-muted-foreground/70"
                >
                  ▲ Vercel
                </Link>
                &
                <Link
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 font-medium text-muted-foreground/70"
                >
                  Next.js
                </Link>
              </div>

              <motion.div
                layout
                key="button"
                layoutId="button"
                variants={icon}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  top: "0",
                  bottom: "0",
                  position: "absolute",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout" initial={false}>
          {!show && (
            <motion.button
              layout
              layoutId="button"
              key="button"
              variants={icon}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setShow(true)}
              className={clsx("p-2")}
            >
              <QuestionMarkIcon />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export { MetadataDialog };
