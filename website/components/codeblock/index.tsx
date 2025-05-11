"use client";

import { Check, Clipboard, Code, Terminal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type DetailedHTMLProps, type HTMLAttributes, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import styles from "./styles.module.css";

export interface FigCaptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  "data-language"?: string;
}

export default function FigCaption({ ...props }: FigCaptionProps) {
  const language = props["data-language"];
  const [isCopied, setIsCopied] = useState(false);

  const figCaptionRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (figCaptionRef.current) {
      preRef.current = figCaptionRef.current.nextElementSibling as HTMLPreElement;
    }
  }, []);

  const Icon = () => {
    switch (language) {
      case "bash":
        return <Terminal width={14} />;
      case "tsx":
        return <Code width={14} />;
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

  const CheckIcon = motion.create(Check);
  const ClipboardIcon = motion.create(Clipboard);

  const iconProps = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    },
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.4,
    },
    width: 14,
    color: "var(--text-tertiary)",
  };

  return (
    <figcaption ref={figCaptionRef} className={styles.code}>
      <span className={styles.heading}>
        <Icon /> {props.children}
      </span>
      <button
        type="button"
        disabled={isCopied}
        onClick={handleClickCopy}
        className={clsx(styles.copy, { [styles.copied]: isCopied })}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isCopied ? <CheckIcon {...iconProps} /> : <ClipboardIcon {...iconProps} />}
        </AnimatePresence>
      </button>
    </figcaption>
  );
}
