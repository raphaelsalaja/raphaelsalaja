"use client";

import { Masonry } from "@/components/masonry";
import * as Media from "@/components/media";
import type { MediaResource } from "@/lib/media-fetching/types";

import styles from "./styles.module.scss";

interface MasonryWrapperProps {
  items: MediaResource[];
}

export default function MasonryWrapper({ items }: MasonryWrapperProps) {
  return (
    <Masonry
      items={items}
      config={{
        columns: [2, 3],
        gap: [24, 24],
        media: [640, 768],
        useBalancedLayout: true,
      }}
      render={(item, idx) => (
        <MediaItem key={idx} item={item as MediaResource} />
      )}
    />
  );
}

function MediaItem({ item }: { item: MediaResource }) {
  const { src, alt, width, height } = item;
  const containerStyle = { aspectRatio: `${width} / ${height}` };
  const commonWrapperProps = {
    className: styles.item,
    style: containerStyle,
  };

  if (item.type === "video") {
    return (
      <div {...commonWrapperProps}>
        <Media.Video
          src={src}
          title={alt}
          width={width}
          height={height}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div {...commonWrapperProps}>
      <Media.Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        blurDataURL={
          (item as Extract<MediaResource, { type: "image" }>).blurDataURL
        }
        loading="lazy"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
