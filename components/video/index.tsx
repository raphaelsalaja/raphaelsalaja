"use client";

import { type ComponentProps, useEffect, useRef } from "react";

interface VideoProps extends ComponentProps<"video"> {
  src: string;
}

export function Video({ autoPlay = true, poster, ...props }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion.matches) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      poster={poster}
      preload={poster ? "none" : "metadata"}
      {...props}
    />
  );
}
