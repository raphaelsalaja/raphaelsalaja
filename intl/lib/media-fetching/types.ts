export interface BaseResource {
  src: string;
  alt: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface ImageResource extends BaseResource {
  type: "image";
  width: number;
  height: number;
  blurDataURL: string;
  format: "jpeg" | "png" | "webp" | "gif" | "avif" | "svg";
}

export interface VideoResource extends BaseResource {
  type: "video";
  width: number;
  height: number;
  format: "mp4" | "mov" | "avi" | "webm";
}

export type MediaResource = ImageResource | VideoResource;
