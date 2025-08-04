import { useCallback, useEffect, useState } from "react";

export type Caret = {
  x: number;
  y: number;
  start: number;
  end: number;
  text: string;
  rects: DOMRect[];
  isSelecting: boolean;
};

export function useCaret(ref: React.RefObject<HTMLElement>): Caret {
  const [caret, setCaret] = useState<Caret>({
    x: 0,
    y: 0,
    start: 0,
    end: 0,
    text: "",
    rects: [],
    isSelecting: false,
  });

  const updateCaret = useCallback(() => {
    try {
      const el = ref.current;
      const sel = window.getSelection();
      if (
        !el ||
        !sel ||
        sel.rangeCount === 0 ||
        !el.contains(sel.anchorNode) ||
        !el.contains(sel.focusNode)
      ) {
        return;
      }

      const range = sel.getRangeAt(0);
      let rects = Array.from(range.getClientRects());

      // collapsed + no rects → synthetic fallback
      if (sel.isCollapsed && rects.length === 0) {
        const br = range.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const lineHeight =
          Number.parseFloat(style.lineHeight) ||
          Number.parseFloat(style.fontSize) ||
          16;
        rects = [new DOMRect(br.left, br.top, 1, lineHeight)];
      }

      setCaret({
        x: rects[0].left,
        y: rects[0].top,
        start: range.startOffset,
        end: range.endOffset,
        text: sel.toString(),
        rects,
        isSelecting: !sel.isCollapsed,
      });
    } catch (_err) {}
  }, [ref]);

  useEffect(() => {
    const handler = () => requestAnimationFrame(updateCaret);
    const events = ["selectionchange", "mouseup", "keyup", "compositionend"];

    for (const e of events) {
      document.addEventListener(e, handler);
    }
    window.addEventListener("scroll", handler, true);

    return () => {
      for (const e of events) {
        document.removeEventListener(e, handler);
      }
      window.removeEventListener("scroll", handler, true);
    };
  }, [updateCaret]);

  return caret;
}
