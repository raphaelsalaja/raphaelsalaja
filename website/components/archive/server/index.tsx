"use client";

import Image from "next/image";
import { Masonry } from "@/components/masonry";
import styles from "./styles.module.scss";

interface ResourceItem {
  url: string;
  blurDataURL?: string;
  alt?: string;
  width: number;
  height: number;
}

export const MasonryWrapper = ({ items }: { items: ResourceItem[] }) => {
  const isImage = (url: string) => /\.(jpe?g|png|gif|bmp|webp)$/i.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

  // Shuffle items in place
  items.sort(() => Math.random() - 0.5);

  return (
    <Masonry
      items={items}
      config={{
        columns: [2, 3],
        gap: [24, 24],
        media: [640, 768],
        useBalancedLayout: true,
      }}
      render={(item: unknown, idx: number) => {
        const { url, blurDataURL, alt = "", width, height } = item as ResourceItem;
        const aspectRatio = `${width} / ${height}`;

        if (isVideo(url)) {
          return (
            <div key={url} className={styles.item} style={{ aspectRatio }}>
              <video
                src={url}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                title={alt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          );
        }

        if (isImage(url)) {
          return (
            <div key={url} className={styles.item} style={{ aspectRatio }}>
              <Image
                src={url}
                alt={alt}
                width={width}
                height={height}
                placeholder={blurDataURL ? "blur" : undefined}
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
};
