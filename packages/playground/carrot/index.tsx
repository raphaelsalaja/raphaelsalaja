"use client";

import { createContext, Fragment, useContext, useMemo, useRef, useState } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { withHistory } from "slate-history";
import { Editable } from "slate-react";
import { Slate, withReact } from "slate-react";
import { useCaret } from "../hooks/use-caret";

export type CaretState = {
  rects: DOMRect[];
  text: string;
  isSelecting: boolean;
};

export type CarrotContextType = {
  editor: Editor;
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  caret: CaretState;
  selectionRects: DOMRect[];
  focused: boolean;
  setFocused: (b: boolean) => void;
};

const CarrotContext = createContext<CarrotContextType | null>(null);

export function useCarrotContext() {
  const ctx = useContext(CarrotContext);
  if (!ctx) throw new Error("useCarrotContext must be inside <Carrot.Root>");
  return ctx;
}

type CarrotRootProps = {
  children: React.ReactNode;
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

function CarrotRoot({ children, value, onChange }: CarrotRootProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const ref = useRef<HTMLDivElement | null>(null);
  const caret: CaretState = useCaret(ref);
  const [focused, setFocused] = useState(false);

  const selectionRects = useMemo<DOMRect[]>(() => {
    const { rects, isSelecting, text } = caret;

    if (rects.length === 0) return [];

    if (!isSelecting) {
      return [rects[rects.length - 1]];
    }

    if (!text) return [];
    const minH = Math.min(...rects.map((r) => r.height));
    return rects.filter((r) => r.height <= minH + 1);
  }, [caret]);

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <CarrotContext.Provider
        value={{
          editor,
          value,
          onChange,
          ref,
          caret,
          selectionRects,
          focused,
          setFocused,
        }}
      >
        {children}
      </CarrotContext.Provider>
    </Slate>
  );
}

function CarrotContainer({ children }: { children: React.ReactNode }) {
  const { ref } = useCarrotContext();
  return (
    <div ref={ref} data-rs-carrot-container>
      {children}
    </div>
  );
}

function CarrotCaret() {
  const { ref, selectionRects, caret, focused } = useCarrotContext();
  const { isSelecting } = caret;

  if (!focused) {
    if (!ref.current) return null;

    return (
      <div
        data-rs-carrot-caret
        data-selecting={false}
        style={{
          position: "absolute",
          width: 2,
          opacity: 0,
        }}
      />
    );
  }

  const getOffset = (rect: DOMRect, axis: "top" | "left") => {
    const el = ref.current;
    if (!el) return 0;
    const cr = el.getBoundingClientRect();
    const scroll = axis === "top" ? el.scrollTop : el.scrollLeft;
    return rect[axis] + scroll - cr[axis];
  };

  return (
    <Fragment>
      {selectionRects.map((rectangle, i) => (
        <div
          key={i}
          data-rs-carrot-caret
          data-selecting={isSelecting}
          style={{
            position: "absolute",
            top: getOffset(rectangle, "top"),
            left: getOffset(rectangle, "left") - 1,
            width: rectangle.width + 2,
            height: rectangle.height,
          }}
        />
      ))}
    </Fragment>
  );
}

// @ts-ignore
type CarrotInputProps = React.ComponentProps<typeof Editable>;

function CarrotInput(props: CarrotInputProps) {
  const { setFocused } = useCarrotContext();

  return (
    // @ts-ignore
    <Editable
      {...props}
      data-rs-carrot-editable
      style={{ caretColor: "transparent" }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export type CarrotDescendant = Descendant & {
  type?: string;
};

export { CarrotRoot, CarrotContainer, CarrotCaret, CarrotInput };
