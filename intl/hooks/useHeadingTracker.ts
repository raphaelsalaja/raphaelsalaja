import { useEffect, useState } from "react";

export function useHeadingTracker(selector = "[data-mdx-article] h1, h2, h3, h4, h5, h6"): {
  heading: string;
  titles: Element[];
  headingIndex: number;
} {
  const [heading, setHeading] = useState<string>("");
  const [titles, setTitles] = useState<Element[]>([]);
  const [headingIndex, setHeadingIndex] = useState<number>(0);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(selector));
    setTitles(headings);

    if (!headings.length) return;

    setHeading(headings[0].textContent || "");
    setHeadingIndex(0);

    const updateHeading = () => {
      let closestHeading = "";
      let closestDistance = Number.POSITIVE_INFINITY;
      let closestIndex = 0;

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const rect = heading.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestHeading = heading.textContent || "";
          closestIndex = i;
        }
      }

      setHeading(closestHeading);
      setHeadingIndex(closestIndex);
      requestAnimationFrame(updateHeading);
    };

    updateHeading();

    return () => {
      setHeading("");
      setHeadingIndex(0);
    };
  }, [selector]);

  return { heading, titles, headingIndex };
}
