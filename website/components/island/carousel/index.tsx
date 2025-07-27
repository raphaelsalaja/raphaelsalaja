"use client";

import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { useHeadingTracker } from "@/hooks/useHeadingTracker";

import "./styles.css";

type PropType = {
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const { titles, headingIndex } = useHeadingTracker();
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" });
  const [_selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(headingIndex);
  }, [emblaApi, headingIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSlideClick = (index: number) => {
      const headingElement = titles[index];
      if (headingElement) {
        headingElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const slideNodes = emblaApi.slideNodes();
    const listeners: Array<() => void> = [];

    slideNodes.forEach((slide, index) => {
      const listener = () => handleSlideClick(index);
      listeners.push(listener);
      slide.addEventListener("click", listener);
    });

    return () => {
      slideNodes.forEach((slide, index) => {
        slide.removeEventListener("click", listeners[index]);
      });
    };
  }, [emblaApi, titles]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div
          className="embla__container"
          style={{ "--slide-count": titles.length } as React.CSSProperties}
        >
          {titles.map((title, index) => (
            <div
              className="embla__slide"
              key={`${title.tagName}-${title.textContent}-${index}`}
            >
              <p className="embla__slide__number">{title.textContent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
