"use client";

import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Base } from "./base";

import styles from "./styles.module.scss";

import { Widgets } from "./widgets";

const MIN_SCALE = 0.8;
const MAX_SCALE = 0.95;
const TWEEN_FACTOR = 0.6;

const clamp = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);

const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

const PAGES = [Widgets, Base] as const;

function useIsTinyScreen(breakpoint = 480) {
  const [isTiny, setIsTiny] = useState(typeof window !== "undefined" && window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsTiny(window.innerWidth <= breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isTiny;
}

export function Footer() {
  const [viewportRef, embla] = useEmblaCarousel({ axis: "y", skipSnaps: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const draggingRef = useRef(false);
  const tweenRef = useRef(0);

  const isTiny = useIsTinyScreen(640);

  const updateTween = useCallback((api: EmblaCarouselType) => {
    tweenRef.current = TWEEN_FACTOR * api.scrollSnapList().length;
  }, []);

  const scaleSlides = useCallback((api: EmblaCarouselType) => {
    const progress = api.scrollProgress();
    const snaps = api.scrollSnapList();
    const nodes = api.slideNodes();

    snaps.forEach((snapPos, idx) => {
      const dist = Math.abs(progress - snapPos);
      const raw = clamp(dist * tweenRef.current, 0, 1);
      const eased = easeOutQuad(1 - raw);
      const scale = MIN_SCALE + eased * (MAX_SCALE - MIN_SCALE);

      const slideIndices = api.internalEngine().slideRegistry[idx] as number[];
      slideIndices.forEach((i) => {
        (nodes[i] as HTMLElement).style.transform = `scale(${scale})`;
      });
    });
  }, []);

  const resetScales = useCallback((api: EmblaCarouselType) => {
    api.slideNodes().forEach((n) => {
      (n as HTMLElement).style.transform = "scale(1)";
    });
  }, []);

  useEffect(() => {
    if (!embla) return;

    // initial setup: only reset scales, do NOT call scaleSlides here
    updateTween(embla);
    resetScales(embla);

    // named handlers so we can clean them up cleanly
    const onPointerDown = () => {
      draggingRef.current = true;
    };
    const onPointerUp = () => {
      draggingRef.current = false;
      resetScales(embla);
    };
    const onScroll = () => {
      if (draggingRef.current) scaleSlides(embla);
    };
    const onSelect = () => {
      draggingRef.current = false;
      resetScales(embla);
      setSelectedIndex(embla.selectedScrollSnap());
    };

    embla.on("pointerDown", onPointerDown);
    embla.on("pointerUp", onPointerUp);
    embla.on("scroll", onScroll);
    embla.on("select", onSelect);
    embla.on("reInit", updateTween);
    embla.on("reInit", resetScales);

    return () => {
      embla.off("pointerDown", onPointerDown);
      embla.off("pointerUp", onPointerUp);
      embla.off("scroll", onScroll);
      embla.off("select", onSelect);
      embla.off("reInit", updateTween);
      embla.off("reInit", resetScales);
    };
  }, [embla, updateTween, scaleSlides, resetScales]);

  if (isTiny) {
    return (
      <div className={styles.embla}>
        <div className={styles.viewport}>
          <div className={styles.container}>
            <div className={styles.slide}>
              <Base />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.embla} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.container}>
          {PAGES.map((Page, idx) => (
            <div className={styles.slide} key={idx}>
              <Page />
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          ease: [0.19, 1, 0.22, 1],
          duration: 0.4,
          delay: 0.4,
        }}
        className={styles.controls}
      >
        <div className={styles.dots}>
          {PAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={idx === selectedIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              onClick={() => embla?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{ transform: `scale(${idx === selectedIndex ? 1.2 : 0.8})` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
