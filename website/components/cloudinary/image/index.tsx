"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps extends React.ComponentProps<typeof CldImage> {
  blurDataURL?: string;
}

export const Image = ({ blurDataURL, ...props }: CloudinaryImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {blurDataURL && (
        // biome-ignore lint/nursery/noImgElement: <explanation>
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
        <CldImage
          {...props}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder={undefined}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
    </div>
  );
};
