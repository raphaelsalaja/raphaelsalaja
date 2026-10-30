"use client";

import { useEffect } from "react";
import { controlFor, play } from "@/lib/sounds";

const CLICK_WINDOW = 400;

export function Sounds() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const played = new WeakMap<Element, number>();

    const onPointerDown = (event: PointerEvent) => {
      if (motion.matches || event.button !== 0) return;

      const found = controlFor(event.target);
      if (!found || found.kind === "tap") return;

      played.set(found.control, performance.now());
      play("click");
    };

    const onClick = (event: MouseEvent) => {
      if (motion.matches || event.button !== 0) return;

      const found = controlFor(event.target);
      if (!found) return;

      const at = played.get(found.control);
      if (at !== undefined && performance.now() - at < CLICK_WINDOW) return;

      play(found.kind);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
