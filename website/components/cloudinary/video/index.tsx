"use client";

import Image from "next/image";
import type { VideoHTMLAttributes } from "react";
import { useEffect, useState } from "react";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  blurDataURL?: string;
}

export const Video = ({ blurDataURL, ...props }: VideoProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.autoPlay && props.preload !== "none") {
      setLoaded(true);
    }
  }, [props.autoPlay, props.preload]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {blurDataURL && (
        <Image
          unoptimized
          src={blurDataURL}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(20px)",
            transform: "scale(1.05)",
            transition: "opacity 0.4s ease-out",
            opacity: loaded ? 0 : 1,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      <video
        {...props}
        onLoadedData={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.4s ease-out",
          opacity: loaded ? 1 : 0,
          zIndex: 2,
        }}
      />
    </div>
  );
};
