"use client";

import { Calligraph } from "calligraph";
import clsx from "clsx";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { IconCheck } from "@/components/icons";
import type { Action, Prompt } from "./entries";
import { useGlow } from "./glow";
import styles from "./styles.module.css";

const COPIED_FOR = 1200;

export function Card({
  prompt,
  open,
  onDismiss,
}: {
  prompt: Prompt;
  open: boolean;
  onDismiss: () => void;
}) {
  const id = useId();
  const canvas = useRef<HTMLCanvasElement>(null);
  const glow = useGlow(canvas, open);

  return (
    <aside
      className={clsx(styles.prompt, styles[prompt.id])}
      data-open={open || undefined}
      inert={!open}
      aria-labelledby={id}
      onPointerMove={glow.move}
      onPointerLeave={glow.leave}
    >
      {prompt.shader && <canvas ref={canvas} className={styles.canvas} />}
      <div className={styles.copy}>
        <p id={id} className={styles.title}>
          {prompt.title}
        </p>
        <p className={styles.description}>{prompt.description}</p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={onDismiss}>
          Not now
        </button>
        {prompt.actions.map((action) => (
          <Button
            key={action.label}
            action={action}
            onDone={onDismiss}
            excite={glow.excite}
          />
        ))}
      </div>
    </aside>
  );
}

function Button({
  action,
  onDone,
  excite,
}: {
  action: Action;
  onDone: () => void;
  excite: (on: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);
  const shared = {
    className: styles.primary,
    onPointerEnter: () => excite(true),
    onPointerLeave: () => excite(false),
    onFocus: () => excite(true),
    onBlur: () => excite(false),
  };

  if ("copy" in action) {
    const label = copied ? "Copied" : action.label;
    return (
      <button
        type="button"
        aria-label={label}
        {...shared}
        onClick={() => {
          navigator.clipboard
            .writeText(action.copy)
            .then(() => {
              setCopied(true);
              setTimeout(onDone, COPIED_FOR);
            })
            .catch(() => {});
        }}
      >
        {copied ? <IconCheck size={14} /> : action.icon}
        <Calligraph>{label}</Calligraph>
      </button>
    );
  }

  const content = (
    <>
      {action.icon}
      {action.label}
    </>
  );

  if (action.href.startsWith("/")) {
    return (
      <Link href={action.href} {...shared} onClick={onDone}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener"
      {...shared}
      onClick={onDone}
    >
      {content}
    </a>
  );
}
