"use client";

import { Masonry } from "@/components/masonry";
import * as Media from "@/components/media";
import { MediaResource } from "@/lib/cloudinary";
import styles from "./styles.module.scss";

export default function MasonryWrapper({ items }: { items: MediaResource[] }) {
  const isImage = (src: string) => /\.(jpe?g|png|gif|bmp|webp)$/i.test(src);
  const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

  return (
    <Masonry
      items={items}
      config={{
        columns: [2, 3],
        gap: [24, 24],
        media: [640, 768],
        useBalancedLayout: true,
      }}
      render={(item, idx) => {
        const { src, alt = "", width, height, blurDataURL } = item as MediaResource;
        const aspectRatio = `${width} / ${height}`;

        if (isVideo(src)) {
          return (
            <div key={idx} className={styles.item} style={{ aspectRatio }}>
              <Media.Video
                src={src}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                title={alt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                width={width}
                height={height}
              />
            </div>
          );
        }

        if (isImage(src)) {
          return (
            <div key={idx} className={styles.item} style={{ aspectRatio }}>
              <Media.Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                blurDataURL={blurDataURL}
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          );
        }

        return null;
      }}
    />
  );
}
