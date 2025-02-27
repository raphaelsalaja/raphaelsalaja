"use client";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { useState } from "react";

const container = {
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transformOrigin: "center",
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  hidden: {
    y: 250,
    opacity: 0,
    scale: 0.3,
    filter: "blur(64px)",
    transformOrigin: "center",
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const icon = {
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      delay: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    filter: "blur(16px)",
    transition: {
      duration: 0.25,
    },
  },
};

function ViewProductionButton({ href }: { href: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed right-0 bottom-5 left-0 flex justify-center">
      <Link href={href}>
        <motion.div
          layout
          variants={container}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => setShow(true)}
          whileHover={{ scale: 1.05 }}
          className="border bg-white p-2"
        >
          <div className="text-gray-500 text-sm hover:text-gray-700">
            <div className="flex items-center gap-2">
              <motion.h2 layout className="ml-1">
                View Production
              </motion.h2>
              {show && (
                <motion.div variants={icon} layout className="border p-1">
                  <ArrowTopRightIcon />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

export { ViewProductionButton };
