"use client";

import { useEffect, useState } from "react";
import { formatTimeMMSS } from "../utils/formatTime";

// Words per minute reading speed
const WORDS_PER_MINUTE = 200;

// Calculate reading time from text
function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.floor(words / WORDS_PER_MINUTE);
  const seconds = Math.floor(
    (words % WORDS_PER_MINUTE) / (WORDS_PER_MINUTE / 60),
  );
  const total = (words / WORDS_PER_MINUTE) * 60; // total seconds

  const clean = formatTimeMMSS(total);

  return {
    minutes,
    seconds,
    total,
    text,
    clean,
  };
}

export function useReadingTime(selector = "[data-mdx-article]"): {
  minutes: number;
  seconds: number;
  total: number;
  text: string;
  clean: string;
} {
  const [readingTime, setReadingTime] = useState({
    minutes: 0,
    seconds: 0,
    total: 0,
    text: "",
    clean: "00:00",
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      const textContent = document.querySelector(selector)?.textContent || "";
      const result = calculateReadingTime(textContent);
      setReadingTime(result);
    }
  }, [selector]);

  return readingTime;
}
