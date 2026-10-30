"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

const VIDEO_ID = "uEMEs499fUs";
const TITLE = "The Rise of Design Engineering";

export function Talk() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
          title={TITLE}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.cover}
          onClick={() => setPlaying(true)}
        >
          <Image
            src="/media/library/the-rise-of-design-engineering/poster.jpg"
            alt=""
            fill
            sizes="(width <= 640px) 100vw, 640px"
          />
          <span className={styles.play}>Click to Play</span>
        </button>
      )}
    </div>
  );
}
