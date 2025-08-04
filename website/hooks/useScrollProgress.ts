import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function useScrollProgress(): {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
} {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setProgress(100);
        return;
      }

      const scrollProgress = (scrollY / maxScroll) * 100;

      requestAnimationFrame(() => {
        setProgress(scrollProgress);
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { progress, setProgress };
}
