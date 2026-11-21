"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Demo } from "@/components/demo";
import { posts } from "@/data/library";
import { work } from "@/data/work";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

type Command = {
  id: string;
  title: string;
  keywords: string;
  group: "Navigation" | "Actions" | "Recent";
  shortcut?: string;
  href?: string;
};

const RECENT_KEY = "skills-at-work-palette";

function fuzzy(query: string, text: string) {
  const needle = query.toLowerCase().replace(/\s+/g, "");
  if (!needle) return true;
  let index = 0;
  for (const char of text.toLowerCase()) {
    if (char === needle[index]) index += 1;
    if (index === needle.length) return true;
  }
  return false;
}

export function PaletteDemo() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<"root" | "theme">("root");
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);
  const [theme, setTheme] = useState("System");
  const input = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const routes: Command[] = [
      {
        id: "home",
        title: "Home",
        keywords: "index start",
        group: "Navigation",
        href: "/",
      },
      {
        id: "skills",
        title: "Skills",
        keywords: "agent install",
        group: "Navigation",
        href: "/skills",
      },
      {
        id: "bots",
        title: "Bots",
        keywords: "grok pile",
        group: "Navigation",
        href: "/bots",
      },
      ...work
        .filter((item) => item.href.startsWith("/"))
        .map((item) => ({
          id: item.href,
          title: item.title,
          keywords: item.description ?? item.category,
          group: "Navigation" as const,
          href: item.href,
        })),
      ...posts.slice(0, 6).map((post) => ({
        id: post.slug,
        title: post.title,
        keywords: post.category,
        group: "Navigation" as const,
        href: `/library/${post.slug}`,
      })),
    ];
    return [
      ...routes,
      {
        id: "theme",
        title: "Change Theme…",
        keywords: "dark light system appearance",
        group: "Actions",
        shortcut: "T",
      },
    ];
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(RECENT_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as unknown;
      if (Array.isArray(parsed)) {
        setRecents(parsed.filter((item) => typeof item === "string"));
      }
    } catch {
      setRecents([]);
    }
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k")
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, [contenteditable='true']") &&
        !target.closest("[data-palette]")
      ) {
        return;
      }
      event.preventDefault();
      setInstant(true);
      setOpen((value) => !value);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo((): Command[] => {
    if (page === "theme") {
      return ["Light", "Dark", "System"].map((title) => ({
        id: title,
        title,
        keywords: "theme",
        group: "Actions",
      }));
    }
    const matched = commands.filter((command) =>
      fuzzy(query, `${command.title} ${command.keywords}`),
    );
    if (query || recents.length === 0) return matched;
    const recent = recents
      .map((id) => commands.find((command) => command.id === id))
      .filter((command): command is Command => Boolean(command))
      .slice(0, 5)
      .map((command) => ({ ...command, group: "Recent" as const }));
    const rest = matched.filter(
      (command) => !recent.some((item) => item.id === command.id),
    );
    return [...recent, ...rest];
  }, [commands, page, query, recents]);

  const signature = `${page}:${query}`;
  const [tracked, setTracked] = useState(signature);
  if (tracked !== signature) {
    setTracked(signature);
    setActive(0);
  }

  const remember = (id: string) => {
    const next = [id, ...recents.filter((item) => item !== id)].slice(0, 5);
    setRecents(next);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const run = (command: Command) => {
    if (page === "theme") {
      setTheme(command.title);
      setPage("root");
      setOpen(false);
      return;
    }
    if (command.id === "theme") {
      setPage("theme");
      setQuery("");
      return;
    }
    remember(command.id);
    setOpen(false);
    if (command.href) router.push(command.href);
  };

  const onListKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(results.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[active];
      if (command) run(command);
    } else if (event.key === "Escape" && page === "theme") {
      event.preventDefault();
      event.stopPropagation();
      setPage("root");
    }
  };

  const groups = ["Recent", "Navigation", "Actions"] as const;

  return (
    <Demo wide>
      <div
        className={styles.stack}
        data-theme={theme === "System" ? undefined : theme.toLowerCase()}
      >
        <Dialog.Root
          open={open}
          onOpenChange={(next) => {
            if (!next && page === "theme") {
              setPage("root");
              return;
            }
            setOpen(next);
            if (!next) {
              setPage("root");
              setQuery("");
            }
          }}
        >
          <Dialog.Trigger
            className={styles.button}
            onClick={() => setInstant(reduced)}
          >
            Open Palette
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop
              style={{
                position: "fixed",
                inset: 0,
                background: "rgb(0 0 0 / 24%)",
              }}
            />
            <Dialog.Popup
              data-palette=""
              data-instant={instant || reduced ? "" : undefined}
              style={{
                position: "fixed",
                top: "18vh",
                left: "50%",
                translate: "-50% 0",
                width: "min(440px, calc(100vw - 32px))",
                padding: 8,
                color: "var(--text-primary)",
                background: "var(--background-primary)",
                borderRadius: 12,
                boxShadow: "var(--shadow-raised)",
              }}
              className={styles.popup}
            >
              <Dialog.Title
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                {page === "theme" ? "Change Theme" : "Search"}
              </Dialog.Title>
              <input
                ref={input}
                aria-label="Search"
                placeholder="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onListKey}
                style={{
                  width: "100%",
                  height: 36,
                  padding: "0 8px",
                  background: "transparent",
                }}
              />
              <div role="listbox" aria-label="Commands">
                {results.length === 0 && <p>No Results</p>}
                {groups.map((group) => {
                  const items = results.filter((item) => item.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group}>
                      <p className={styles.muted}>{group}</p>
                      {items.map((item) => {
                        const index = results.indexOf(item);
                        return (
                          <button
                            key={`${group}-${item.id}`}
                            type="button"
                            role="option"
                            aria-selected={index === active}
                            className={styles.choice}
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                              background:
                                index === active
                                  ? "var(--background-tertiary)"
                                  : "transparent",
                              boxShadow: "none",
                            }}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => run(item)}
                          >
                            <span>{item.title}</span>
                            {item.shortcut && (
                              <span className={styles.muted}>
                                {item.shortcut}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <p className={styles.note} role="status">
          Theme {theme}. Coverage: /dev/skills has no command. Settings were not
          crawled.
        </p>
      </div>
    </Demo>
  );
}
