"use client";

import { useHeadingTracker } from "@/hooks/useHeadingTracker";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

import "./styles.css";

type PropType = {
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const { titles, headingIndex } = useHeadingTracker();
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    slideNodes.forEach((slide, index) => {
      slide.addEventListener("click", () => handleSlideClick(index));
    });

    return () => {
      slideNodes.forEach((slide) => {
        slide.removeEventListener("click", () => handleSlideClick(index));
      });
    };
  }, [emblaApi, titles]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container" style={{ "--slide-count": titles.length } as React.CSSProperties}>
          {titles.map((title, index) => (
            <div className="embla__slide" key={index}>
              <p className="embla__slide__number">{title.textContent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
