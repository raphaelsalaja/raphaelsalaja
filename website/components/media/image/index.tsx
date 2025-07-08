"use client";

import { motion } from "motion/react";
import NextImage from "next/image";
import { useState } from "react";

type MediaImageProps = React.ComponentProps<typeof NextImage>;

export const Image = ({ blurDataURL, ...props }: MediaImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {blurDataURL && (
        <motion.img
          src={blurDataURL}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(4px)",
            transform: "scale(1.5)",
            zIndex: 1,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "ease" }}
        />
      )}

      <motion.div
        style={{ position: "relative", width: "100%", height: "100%", zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <NextImage {...props} onLoad={() => setLoaded(true)} />
      </motion.div>
    </div>
  );
};
