import Button from "@rs/design/button";
import { Seperator } from "@rs/design/seperator";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { getArchiveMedia } from "@/lib/cloudinary";

export const Archive = async ({ index = false }) => {
  const archive = await getArchiveMedia();

  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/.test(url);

  const randomiseArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const media = randomiseArray(archive);
  const length = media.length;
  return (
    <div className={styles.posts}>
      {!index && (
        <div className={styles.heading}>
          <Button asChild variant="ghost">
            <Link href={"/archive"} className={styles.title}>
              <h1 className={styles.name}>Archive</h1>
              <h2 className={styles.count}>{length}</h2>
            </Link>
          </Button>
          <Seperator />
        </div>
      )}

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: index ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
        }}
      >
        {media.slice(0, index ? media.length : 3).map((content) => {
          if (isVideo(content)) {
            return (
              <div className={styles.entry} key={content}>
                <div className={styles.thumbnail}>
                  <video src={content} autoPlay muted loop playsInline className={styles.media}>
                    <track kind="captions" />
                  </video>
                </div>
              </div>
            );
          }

          if (isImage(content)) {
            return (
              <div className={styles.entry} key={content}>
                <div className={styles.thumbnail}>
                  <Image className={styles.media} src={content} alt={"Archive Image"} fill />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
