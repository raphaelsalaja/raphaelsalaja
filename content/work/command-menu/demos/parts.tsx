import type { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";

export const SIZE = {
  width: 720,
  title: 34,
  input: 46,
  item: 46,
  header: 30,
  padding: 6,
  cap: 450,
};

export type Status = "backlog" | "todo" | "progress" | "done" | "canceled";

export const STATUSES: { id: Status; name: string; color: string }[] = [
  {
    id: "backlog",
    name: "Backlog",
    color: "color-mix(in oklab, #bec2c8 80%, var(--gray-12))",
  },
  {
    id: "todo",
    name: "Todo",
    color: "color-mix(in oklab, #e2e2e2 65%, var(--gray-12))",
  },
  { id: "progress", name: "In Progress", color: "#f2c94c" },
  { id: "done", name: "Done", color: "#5e6ad2" },
  { id: "canceled", name: "Canceled", color: "#95a2b3" },
];

export const PRIORITIES = [
  { id: 0, name: "No priority" },
  { id: 1, name: "Urgent" },
  { id: 2, name: "High" },
  { id: 3, name: "Medium" },
  { id: 4, name: "Low" },
];

export const LABELS = [
  { name: "Bug", color: "#eb5757" },
  { name: "Feature", color: "#bb87fc" },
  { name: "Improvement", color: "#4ea7fc" },
];

export const PROJECTS = [
  { name: "Pond", color: "#f2994a" },
  { name: "Audio", color: "#bb87fc" },
  { name: "Cambio", color: "#4ea7fc" },
  { name: "Toldo", color: "#4cb782" },
  { name: "Userinterface Wikipedia", color: "#26b5ce" },
];

export const ME = "Raphael Salaja";

export const PEOPLE = [
  { name: ME, color: "#f2994a" },
  { name: "Anna Ruiz", color: "#4cb782" },
  { name: "Ben Cho", color: "#4ea7fc" },
  { name: "Camille Hart", color: "#bb87fc" },
  { name: "Diego Navarro", color: "#26b5ce" },
  { name: "Elena Voss", color: "#eb5757" },
];

export type Shortcut = {
  keys: string[];
  ctrl?: boolean;
  mod?: boolean;
  alt?: boolean;
  shift?: boolean;
};

const GLYPH: Record<string, string> = {
  Backspace: "⌫",
  Enter: "↵",
  Escape: "esc",
  Tab: "tab",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
};

const PRESS: Record<string, string> = {
  "⌃": "control",
  "⌘": "meta",
  "⌥": "alt",
  "⇧": "shift",
  "⌫": "backspace",
  "↵": "enter",
  esc: "escape",
  tab: "tab",
  "↑": "arrowup",
  "↓": "arrowdown",
  "←": "arrowleft",
  "→": "arrowright",
};

function pressName(glyph: string) {
  return PRESS[glyph] ?? glyph.toLowerCase();
}

export function Keycap({
  children,
  pressed,
  borderless,
}: {
  children: string;
  pressed?: boolean;
  borderless?: boolean;
}) {
  return (
    <kbd
      className={styles.key}
      data-pressed={pressed ? "true" : undefined}
      data-borderless={borderless ? "true" : undefined}
    >
      {children}
    </kbd>
  );
}

export function Keys({
  shortcut,
  pressed,
}: {
  shortcut: Shortcut;
  pressed?: Set<string>;
}) {
  const head: string[] = [];
  if (shortcut.ctrl) head.push("⌃");
  if (shortcut.mod) head.push("⌘");
  if (shortcut.alt) head.push("⌥");
  if (shortcut.shift) head.push("⇧");
  const [first, ...rest] = shortcut.keys.map(
    (key) => GLYPH[key] ?? key.toUpperCase(),
  );
  head.push(first);

  return (
    <span className={styles.keys}>
      {head.map((glyph) => (
        <Keycap key={glyph} pressed={pressed?.has(pressName(glyph))}>
          {glyph}
        </Keycap>
      ))}
      {rest.map((glyph) => (
        <span key={glyph} className={styles.then}>
          then
          <Keycap pressed={pressed?.has(pressName(glyph))}>{glyph}</Keycap>
        </span>
      ))}
    </span>
  );
}

export function StatusIcon({ status }: { status: Status }) {
  const color = STATUSES.find((entry) => entry.id === status)?.color;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      style={{ color }}
    >
      {status === "backlog" ? (
        <circle
          cx="7"
          cy="7"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="1.4 1.74"
        />
      ) : null}
      {status === "todo" || status === "progress" ? (
        <circle
          cx="7"
          cy="7"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ) : null}
      {status === "progress" ? (
        <path d="M7 3.5a3.5 3.5 0 0 1 0 7Z" fill="currentColor" />
      ) : null}
      {status === "done" || status === "canceled" ? (
        <circle cx="7" cy="7" r="6.75" fill="currentColor" />
      ) : null}
      {status === "done" ? (
        <path
          d="M4.4 7.2 6.1 8.9 9.6 5.3"
          fill="none"
          stroke="var(--gray-1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {status === "canceled" ? (
        <path
          d="M5 5l4 4M9 5 5 9"
          fill="none"
          stroke="var(--gray-1)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}

export function PriorityIcon({ priority }: { priority: number }) {
  if (priority === 0) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        {[1.5, 6.5, 11.5].map((x) => (
          <rect
            key={x}
            x={x}
            y="7.25"
            width="3"
            height="1.5"
            rx="0.5"
            fill="currentColor"
            opacity="0.9"
          />
        ))}
      </svg>
    );
  }
  if (priority === 1) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" rx="3" fill="#fc7840" />
        <rect x="7" y="4" width="2" height="5" rx="1" fill="var(--gray-1)" />
        <rect x="7" y="10.5" width="2" height="2" rx="1" fill="var(--gray-1)" />
      </svg>
    );
  }
  const filled = 5 - priority;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {[6, 9, 12].map((height, index) => (
        <rect
          key={height}
          x={1.5 + index * 5}
          y={13.5 - height}
          width="3"
          height={height}
          rx="1"
          fill="currentColor"
          opacity={index < filled ? 1 : 0.4}
        />
      ))}
    </svg>
  );
}

export function Avatar({ name }: { name: string }) {
  const color = PEOPLE.find((person) => person.name === name)?.color;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className={styles.avatar}
      style={{ "--avatar": color } as CSSProperties}
    >
      {initials}
    </span>
  );
}

export function Dot({ color }: { color: string }) {
  return (
    <span className={styles.dot} style={{ "--dot": color } as CSSProperties} />
  );
}

export function ProjectIcon({ color }: { color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={color ? { color } : undefined}
    >
      <path
        d="M8 1.75 13.5 4.75v6.5L8 14.25 2.5 11.25v-6.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 4.9 8 7.8l5.25-2.9M8 7.8v6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Icons = {
  status: () => (
    <Glyph>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 4.75a3.25 3.25 0 0 1 0 6.5Z" fill="currentColor" />
    </Glyph>
  ),
  priority: () => <PriorityIcon priority={2} />,
  person: () => (
    <Glyph>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3.25 13.25c.6-2.3 2.4-3.5 4.75-3.5s4.15 1.2 4.75 3.5" />
    </Glyph>
  ),
  me: () => (
    <Glyph>
      <circle cx="7" cy="5.5" r="2.5" />
      <path d="M2.25 13.25c.6-2.3 2.4-3.5 4.75-3.5 1 0 1.9.2 2.6.65" />
      <path d="M12.5 9.5v4M10.5 11.5h4" />
    </Glyph>
  ),
  unassigned: () => (
    <Glyph>
      <circle cx="8" cy="8" r="6" strokeDasharray="1.6 1.9" />
      <circle cx="8" cy="6.6" r="1.6" strokeWidth="1.25" />
      <path
        d="M5.4 11.2c.5-1.15 1.4-1.75 2.6-1.75s2.1.6 2.6 1.75"
        strokeWidth="1.25"
      />
    </Glyph>
  ),
  tag: () => (
    <Glyph>
      <path d="M2.75 3.75v3.6c0 .27.1.52.3.7l5.4 5.4a1 1 0 0 0 1.4 0l3.6-3.6a1 1 0 0 0 0-1.4l-5.4-5.4a1 1 0 0 0-.7-.3h-3.6a1 1 0 0 0-1 1Z" />
      <circle cx="5.6" cy="6.1" r="0.9" fill="currentColor" stroke="none" />
    </Glyph>
  ),
  project: () => <ProjectIcon />,
  id: () => (
    <Glyph>
      <path d="M6.25 2.75 5 13.25M11 2.75 9.75 13.25M2.75 5.75h10.75M2.5 10.25h10.75" />
    </Glyph>
  ),
  link: () => (
    <Glyph>
      <path d="M6.75 9.25 9.25 6.75" />
      <path d="M7.25 4.5 8.4 3.35a2.6 2.6 0 0 1 3.7 3.7L10.95 8.2" />
      <path d="M8.75 11.5 7.6 12.65a2.6 2.6 0 0 1-3.7-3.7L5.05 7.8" />
    </Glyph>
  ),
  branch: () => (
    <Glyph>
      <circle cx="4.75" cy="3.75" r="1.5" />
      <circle cx="4.75" cy="12.25" r="1.5" />
      <circle cx="11.25" cy="5.75" r="1.5" />
      <path d="M4.75 5.25v5.5M11.25 7.25c0 2.25-2 2.75-4 3.25-1.2.3-2.1.8-2.5 1.75" />
    </Glyph>
  ),
  compose: () => (
    <Glyph>
      <path d="M13 8.75v3.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3.5" />
      <path d="M11.4 2.35a1.2 1.2 0 0 1 1.7 1.7L8.25 8.9 6 9.5l.6-2.25Z" />
    </Glyph>
  ),
  expand: () => (
    <Glyph>
      <path d="M9.75 2.75h3.5v3.5M6.25 13.25h-3.5v-3.5M13.25 2.75 9 7M2.75 13.25 7 9" />
    </Glyph>
  ),
  check: () => (
    <Glyph>
      <path d="M3.5 8.4 6.5 11.25 12.5 4.75" />
    </Glyph>
  ),
};
