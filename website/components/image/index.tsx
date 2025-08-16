"use client";

import { Cambio } from "cambio";
import React from "react";
import * as Media from "@/components/media";
import styles from "./styles.module.css";

interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string;
}
export function Image(props: ImageProps) {
  const { src = "", alt = "" } = props;

  return (
    <React.Fragment>
      <Cambio.Root>
        <Cambio.Trigger data-cambio-trigger className={styles.trigger}>
          <Media.Image
            src={src}
            alt={alt}
            unoptimized
            fill
            style={{ objectFit: "cover" }}
          />
        </Cambio.Trigger>
        <Cambio.Portal>
          <Cambio.Backdrop className={styles.backdrop} />
          <Cambio.Popup className={styles.popup}>
            <Media.Image
              src={src}
              alt={alt}
              unoptimized
              fill
              style={{ objectFit: "cover" }}
            />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
      <span data-cambio-caption>{alt}</span>
    </React.Fragment>
  );
}
