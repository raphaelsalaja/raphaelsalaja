import { type RefObject, useEffect, useState } from "react";
import useWindowSize from "./use-window-size";

export function useOverflow(ref: RefObject<HTMLElement>) {
  const [refXOverflowing, setRefXOverflowing] = useState(false);
  const [refYOverflowing, setRefYOverflowing] = useState(false);
  const [refXScrollBegin, setRefXScrollBegin] = useState(true);
  const [refXScrollEnd, setRefXScrollEnd] = useState(false);
  const [refYScrollBegin, setRefYScrollBegin] = useState(true);
  const [refYScrollEnd, setRefYScrollEnd] = useState(false);

  const _size = useWindowSize();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateOverflow = () => {
      setRefXOverflowing(element.scrollWidth > element.clientWidth);
      setRefYOverflowing(element.scrollHeight > element.clientHeight);
    };

    const handleScroll = () => {
      const atXStart = element.scrollLeft <= 0;
      const atXEnd =
        Math.ceil(element.scrollLeft + element.clientWidth) >=
        element.scrollWidth;
      const atYStart = element.scrollTop <= 0;
      const atYEnd =
        Math.ceil(element.scrollTop + element.clientHeight) >=
        element.scrollHeight;

      setRefXScrollBegin(atXStart);
      setRefXScrollEnd(atXEnd);
      setRefYScrollBegin(atYStart);
      setRefYScrollEnd(atYEnd);
    };

    updateOverflow();
    handleScroll(); // Initial scroll state

    element.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateOverflow);

    return () => {
      element.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOverflow);
    };
  }, [ref]);

  return {
    refXOverflowing,
    refYOverflowing,
    refXScrollBegin,
    refXScrollEnd,
    refYScrollBegin,
    refYScrollEnd,
  };
}
