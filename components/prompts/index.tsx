"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Card } from "./card";
import { latestPost, type Prompt, pick } from "./entries";

const KEY = "prompts";
const DELAY = 1500;
const DEV = process.env.NODE_ENV === "development";

type Memory = {
  day?: string;
  post?: string;
  shown: Record<string, number>;
};

function recall(): Memory {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return { shown: {}, ...stored };
  } catch {
    return { shown: {} };
  }
}

function remember(memory: Memory) {
  try {
    localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {}
}

export function Prompts() {
  const pathname = usePathname();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [open, setOpen] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const memory = recall();
    if (!memory.post || pathname === `/library/${latestPost.slug}`) {
      memory.post = latestPost.slug;
      remember(memory);
    }

    const today = new Date().toDateString();
    if (shown.current || (!DEV && memory.day === today)) return;

    const next = pick(
      {
        pathname,
        day: Math.floor(Date.now() / 86_400_000),
        unread: memory.post !== latestPost.slug,
      },
      memory.shown,
      DEV ? new URLSearchParams(location.search).get("prompt") : null,
    );
    if (!next) return;

    setPrompt(next);
    const timeout = setTimeout(() => {
      shown.current = true;
      setOpen(true);
      remember({
        day: today,
        post: next.id === "new-post" ? latestPost.slug : memory.post,
        shown: { ...memory.shown, [next.id]: Date.now() },
      });
    }, DELAY);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!prompt) return null;

  return (
    <Card
      key={prompt.id}
      prompt={prompt}
      open={open}
      onDismiss={() => setOpen(false)}
    />
  );
}
