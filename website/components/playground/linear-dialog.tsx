"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function LinearDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.div
        layoutId="dialog"
        className="relative isolate flex h-32 w-32 flex-col justify-end overflow-hidden bg-blue-9 p-4 md:h-72 md:w-72"
        style={{
          borderRadius: "24px",
          boxShadow: "0px 0px 0px 2px rgba(255,255,255,0.2) inset, 0px 0px 0px 0.5px rgba(0,0,0,0.7)",
        }}
        onClick={() => setOpen(true)}
      >
        <div className="relative flex flex-col gap-0 text-white">
          <motion.div layoutId="dialog.heading" className="font-medium">
            Blue 9
          </motion.div>
          <motion.div layoutId="dialog.description">#0090FF</motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div className={clsx("fixed inset-0 z-10 flex items-center justify-center")}>
            <motion.div
              className={clsx("fixed inset-0 bg-black bg-opacity-50 backdrop-blur")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              onClick={() => setOpen(false)}
              layoutId="dialog"
              className="relative isolate flex h-[50%] w-[80%] flex-col justify-end overflow-hidden bg-blue-9 p-4 md:w-[50%]"
              style={{
                borderRadius: "24px",
                boxShadow: "0px 0px 0px 2px rgba(255,255,255,0.2) inset, 0px 0px 0px 0.5px rgba(0,0,0,0.7)",
              }}
            >
              <div className="relative flex flex-col gap-0 text-white">
                <motion.div layoutId="dialog.heading" className="font-medium">
                  Blue 9
                </motion.div>
                <motion.div layoutId="dialog.description">#0090FF</motion.div>
                <div className="my-4 hidden h-px grid-flow-row-dense bg-white bg-opacity-10 md:block" />
                <div className="hidden md:block">
                  In the realm of screens so bright,
                  <br />
                  Blue dialogs glow with light,
                  <br />
                  Calm and clear, they gently guide,
                  <br />A tranquil touch in digital tide.
                </div>
                <div className="my-4 h-px grid-flow-row-dense bg-white bg-opacity-10" />
                <div className="grid grid-cols-[min-content_auto] gap-2">
                  <span className="mr-4 font-medium opacity-90">Usage</span>
                  <span className="font-normal opacity-50">Backgrounds, Buttons</span>
                  <span className="mr-4 font-medium opacity-90">Pairs</span>
                  <span className="font-normal opacity-50">White Text</span>
                  <span className="mr-4 font-medium opacity-90">Usage</span>
                  <span className="font-normal opacity-50">Solid backgrounds, buttons</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
