import { useEffect, useState } from "react";

export function useScrollDirection(): number {
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    let lastScrollTop = 0;
    let ticking = false;

    const updateDirection = () => {
      const scrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollY > lastScrollTop) {
            setDirection(1);
          } else {
            setDirection(-1);
          }

          lastScrollTop = scrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", updateDirection);

    return () => {
      window.removeEventListener("scroll", updateDirection);
    };
  }, []);

  return direction;
}
