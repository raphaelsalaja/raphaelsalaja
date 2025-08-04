"use client";

import type React from "react";
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Clipboard, Code, Terminal } from "../../icons";
import styles from "./styles.module.css";

export interface FigCaptionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  "data-language"?: string;
}

export function Figcaption({ ...props }: FigCaptionProps) {
  const language = props["data-language"];
  const [isCopied, setIsCopied] = useState(false);

  const figCaptionRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (figCaptionRef.current) {
      preRef.current = figCaptionRef.current
        .nextElementSibling as HTMLPreElement;
    }
  }, []);

  const Icon = () => {
    switch (language) {
      case "bash":
        return <Terminal width={16} />;
      case "tsx":
        return <Code width={16} />;
      default:
        return null;
    }
  };

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;
    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <figcaption
      ref={figCaptionRef as React.Ref<HTMLElement>}
      className={styles.code}
      {...props}
    >
      <span className={styles.heading}>
        <Icon /> {props.children as React.ReactNode}
      </span>
      <button
        type="button"
        disabled={isCopied}
        onClick={handleClickCopy}
        className={`${styles.copy} ${isCopied ? styles.copied : ""}`}
      >
        <Clipboard width={16} />
      </button>
    </figcaption>
  );
}
