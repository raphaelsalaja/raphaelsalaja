"use client";

import useEmblaCarousel from "embla-carousel-react";

import styles from "./styles.module.css";
import Controller from "../icons/controller";
import { useState } from "react";

const slides = Array.from(Array(10).keys());

const Horizontal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [horizontalEmblaRef, horizontalEmblaApi] = useEmblaCarousel({});
  const [activeIndex, setActiveIndex] = useState(0);

  horizontalEmblaApi?.on("select", () => {
    setActiveIndex(horizontalEmblaApi.selectedScrollSnap());
  });

  return (
    <div className={styles.horizontal}>
      <div className={styles.embla__viewport} ref={horizontalEmblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.item}>
                <Controller className={styles.icon} />
                <span className={styles.title}>Games</span>
                <div
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Vertical = () => {
  const [verticalEmblaRef, verticalEmblaApi] = useEmblaCarousel({ axis: "y" });

  return (
    <div className={styles.vertical}>
      <div className={styles.embla__viewport} ref={verticalEmblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.item}>
                <div className={styles.title}>
                  <div className={styles.circle} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const XMB: React.FC = () => {
  return (
    <div className={styles.xmb}>
      <Horizontal>
        <Vertical />
      </Horizontal>
    </div>
  );
};

export default XMB;
