import { useEffect, useRef, useState } from "react";
import { useBlurDataURL } from "@/utils/blur-data-url";
import styles from "./styles.module.css";

interface BlurImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BlurImage({ src, className, style }: BlurImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { blurDataURL } = useBlurDataURL(src);

  useEffect(() => {
    if (!src) return;

    // Pre-load the actual image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (imageError) {
    return null; // Don't render anything if image failed to load
  }

  return (
    <div
      ref={imgRef}
      className={`${styles.blurimage} ${className || ""}`}
      style={style}
    >
      {/* Blur placeholder - shown while actual image loads */}
      {blurDataURL && !imageLoaded && (
        <div
          className={styles.blurplaceholder}
          style={{
            backgroundImage: `url(${blurDataURL})`,
          }}
        />
      )}

      {/* Actual image */}
      <div
        className={styles.actualimage}
        style={{
          backgroundImage: `url(${src})`,
          opacity: imageLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}
