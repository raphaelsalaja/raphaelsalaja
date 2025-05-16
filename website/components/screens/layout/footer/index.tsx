"use client";

import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Base } from "./base";
import { Spotify } from "./spotify";
import styles from "./styles.module.scss";

const TWEEN_FACTOR_BASE = 0.84;

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const PAGES = [Base, Spotify, Base, Spotify, Base, Spotify] as const;

export function Footer() {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "center",
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const tweenFactor = useRef(0);

  const updateTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const opacity = useCallback((api: EmblaCarouselType, event?: EmblaEventType) => {
    const engine = api.internalEngine();
    const progress = api.scrollProgress();
    const inView = api.slidesInView();
    const isScroll = event === "scroll";

    api.scrollSnapList().forEach((snap: number, snapIndex: number) => {
      const diff = snap - progress;
      const slides = engine.slideRegistry[snapIndex];

      slides.forEach((slideIndex: number) => {
        if (isScroll && !inView.includes(slideIndex)) return;

        const t = 1 - Math.abs(diff * tweenFactor.current);
        const opacity = clamp(t, 0, 1).toString();
        const node = api.slideNodes()[slideIndex] as HTMLElement;
        node.style.opacity = opacity;
      });
    });
  }, []);

  useEffect(() => {
    if (!embla) return;

    updateTweenFactor(embla);
    opacity(embla);

    embla.on("reInit", updateTweenFactor);
    embla.on("reInit", opacity);
    embla.on("scroll", () => opacity(embla, "scroll"));
    embla.on("select", () => {
      opacity(embla);
      setSelectedIndex(embla.selectedScrollSnap());
    });

    return () => {
      embla.off("reInit", updateTweenFactor);
      embla.off("reInit", opacity);
      embla.off("scroll", () => opacity(embla, "scroll"));
      embla.off("select", () => {
        opacity(embla);
        setSelectedIndex(embla.selectedScrollSnap());
      });
    };
  }, [embla, updateTweenFactor, opacity]);

  return (
    <div className={styles.embla}>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.container}>
          {PAGES.map((Page, idx) => (
            <div className={styles.slide} key={idx}>
              <Page />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {PAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={idx === selectedIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            onClick={() => embla?.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
