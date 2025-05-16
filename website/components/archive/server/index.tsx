"use client";

import * as Cloudinary from "@/components/cloudinary";
import { Masonry } from "@/components/masonry";
import { CloudinaryResource } from "@/lib/cloudinary";
import styles from "./styles.module.scss";

export const MasonryWrapper = ({ items }: { items: any[] }) => {
  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/.test(url);

  // randomize the order of items
  items = items.sort(() => Math.random() - 0.5);

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
        const { secure_url, blurDataURL, public_id, width, height } = item as CloudinaryResource;
        const aspectRatio = `${width} / ${height}`;

        if (isVideo(secure_url)) {
          return (
            <div key={secure_url} className={styles.item} style={{ aspectRatio: aspectRatio }}>
              <Cloudinary.Video
                src={secure_url}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                blurDataURL={blurDataURL}
              />
            </div>
          );
        }

        if (isImage(secure_url)) {
          return (
            <div key={secure_url} className={styles.item} style={{ aspectRatio: aspectRatio }}>
              <Cloudinary.Image
                fill
                key={secure_url}
                src={secure_url}
                alt={public_id}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          );
        }

        return null;
      }}
    />
  );
};
