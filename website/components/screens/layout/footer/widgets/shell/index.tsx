// components/shell.tsx
"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

interface WidgetProps {
  art: string;
  primaryText: string;
  secondaryText?: string;
  background?: string;
  aspectRatio?: string;
  customBackground?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  art,
  primaryText,
  secondaryText,
  background = "linear-gradient(180deg, #991eeb 0%, #5822b4 100%)",
  aspectRatio = "1 / 1",
  customBackground = null,
}) => {
  const primaryRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);
  const [primaryMarquee, setPrimaryMarquee] = useState(false);
  const [secondaryMarquee, setSecondaryMarquee] = useState(false);

  useEffect(() => {
    const p = primaryRef.current;
    const s = secondaryRef.current;

    if (p) {
      setPrimaryMarquee(p.scrollWidth > p.clientWidth);
    }
    if (s) {
      setSecondaryMarquee(s.scrollWidth > s.clientWidth);
    }
  }, []);

  return (
    <div className={styles.widget} style={{ background }}>
      <div className={styles.container}>
        {customBackground}

        <div className={styles.media} style={{ aspectRatio }}>
          <Image src={art} width={100} height={100} alt={"Media"} unoptimized className={styles.art} />
        </div>

        <div className={styles.content}>
          <p ref={primaryRef} className={clsx(styles.text, primaryMarquee && styles.marquee)} data-variant="primary">
            {primaryText}
          </p>

          {secondaryText && (
            <p
              ref={secondaryRef}
              className={clsx(styles.text, secondaryMarquee && styles.marquee)}
              data-variant="secondary"
            >
              {secondaryText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
