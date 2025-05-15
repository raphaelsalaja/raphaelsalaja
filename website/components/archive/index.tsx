import styles from "./styles.module.scss";
import { getArchiveMedia } from "@/lib/cloudinary";
import * as Cloudinary from "@/components/cloudinary";

export const Archive = async () => {
  const resources = await getArchiveMedia();

  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/.test(url);

  return (
    <div className={styles.archive}>
      {resources.map((resource) => {
        const { secure_url } = resource;

        if (isVideo(resource.secure_url)) {
          return (
            <div key={secure_url} className={styles.item}>
              <Cloudinary.Video
                src={secure_url}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                blurDataURL={resource.blurDataURL}
              />
            </div>
          );
        }

        if (isImage(secure_url)) {
          return (
            <div key={secure_url} className={styles.item}>
              <Cloudinary.Image
                fill
                key={secure_url}
                src={secure_url}
                alt={resource.public_id}
                placeholder="blur"
                blurDataURL={resource.blurDataURL}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
