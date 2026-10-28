"use client";

import { Cambio } from "cambio";
import NextImage from "next/image";
import type { ComponentProps } from "react";
import styles from "./styles.module.css";

export function Image({ src, alt = "" }: ComponentProps<"img">) {
  if (typeof src !== "string") return null;

  return (
    <figure className={styles.figure}>
      <Cambio.Root>
        <Cambio.Trigger
          className={styles.trigger}
          aria-label={alt ? `Enlarge image: ${alt}` : "Enlarge image"}
        >
          <NextImage
            src={src}
            alt={alt}
            fill
            sizes="(width <= 640px) 100vw, 640px"
          />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <NextImage src={src} alt={alt} fill sizes="60vw" />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
      {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
    </figure>
  );
}
