"use client";

import { useEffect, useRef, useState } from "react";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function channel(value: number) {
  const s = value / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb: [number, number, number]) {
  return (
    0.2126 * channel(rgb[0]) +
    0.7152 * channel(rgb[1]) +
    0.0722 * channel(rgb[2])
  );
}

function ratio(a: [number, number, number], b: [number, number, number]) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

function parseRgb(value: string): [number, number, number] | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(/[,\s/]+/).map(Number);
  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null;
  return [parts[0], parts[1], parts[2]];
}

export function ColorDemo() {
  const faint = useRef<HTMLSpanElement>(null);
  const clear = useRef<HTMLSpanElement>(null);
  const [rows, setRows] = useState<
    { name: string; value: string; pass: boolean }[]
  >([]);

  const measure = () => {
    const next = [
      { node: faint.current, name: "Placeholder", need: 4.5 },
      { node: clear.current, name: "Body", need: 4.5 },
    ].flatMap((item) => {
      if (!item.node) return [];
      const style = getComputedStyle(item.node);
      const fg = parseRgb(style.color);
      const bg = parseRgb(style.backgroundColor);
      if (!fg || !bg) return [];
      const value = ratio(fg, bg);
      return [
        {
          name: item.name,
          value: `${value.toFixed(2)}:1`,
          pass: value >= item.need,
        },
      ];
    });
    setRows(next);
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div className={styles.stage}>
          <p>
            <span ref={faint} style={{ color: "#999", background: "#fff" }}>
              raphael@pond.so
            </span>
          </p>
          <p>
            <span
              ref={clear}
              style={{
                color: "var(--text-primary)",
                background: "var(--background-primary)",
              }}
            >
              Used to sign in
            </span>
          </p>
        </div>
        <button type="button" className={styles.button} onClick={measure}>
          Measure Contrast
        </button>
        {rows.length > 0 && (
          <div className={styles.report} role="status">
            {rows.map((row) => (
              <p key={row.name}>
                {row.name}{" "}
                <span className={row.pass ? styles.pass : styles.fail}>
                  {row.value}. {row.pass ? "Clears 4.5:1" : "Below 4.5:1"}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>
    </Demo>
  );
}

export function DefaultsDemo() {
  const [faded, setFaded] = useState(true);
  return (
    <Demo>
      <div className={styles.stack}>
        <div
          className={styles.stage}
          data-faded={faded || undefined}
          style={{
            maxHeight: 120,
            overflow: "auto",
            overscrollBehavior: "contain",
            maskImage: faded
              ? "linear-gradient(to bottom, transparent, #000 16px, #000 calc(100% - 16px), transparent)"
              : undefined,
          }}
        >
          {["Inbox", "Library", "Saves", "Boards", "Folders", "Trash"].map(
            (item) => (
              <div key={item} style={{ padding: "8px 0" }}>
                {item}
              </div>
            ),
          )}
        </div>
        <Controls>
          <Control
            label="Scroll edge"
            options={["Fade", "Hard cut"]}
            value={faded ? "Fade" : "Hard cut"}
            onChange={(value) => setFaded(value === "Fade")}
          />
        </Controls>
      </div>
    </Demo>
  );
}

export function MotionDemo() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [house, setHouse] = useState(true);
  const origin = house ? "top left" : "center";
  const duration = reduced ? "0ms" : house ? "200ms" : "500ms";
  const ease = house ? EASE : "ease-out";
  const enter = house ? "menu-in-house" : "menu-in-broken";

  return (
    <Demo>
      <style>{`
        @keyframes menu-in-house {
          from { opacity: 0; scale: 0.95; }
          to { opacity: 1; scale: 1; }
        }
        @keyframes menu-in-broken {
          from { opacity: 0; scale: 0; }
          to { opacity: 1; scale: 1; }
        }
      `}</style>
      <div className={styles.stack}>
        <div className={styles.stage} style={{ minHeight: 140 }}>
          <button
            type="button"
            className={styles.button}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Sort
          </button>
          {open && (
            <div
              role="menu"
              aria-label="Sort"
              style={{
                display: "grid",
                gap: 8,
                width: 140,
                marginTop: 8,
                padding: 8,
                background: "var(--background-primary)",
                borderRadius: 8,
                boxShadow: "var(--shadow-raised)",
                transformOrigin: origin,
                animation: reduced
                  ? undefined
                  : `${enter} ${duration} ${ease} both`,
              }}
            >
              {["Recent", "Name", "Size"].map((item) => (
                <button
                  key={item}
                  type="button"
                  role="menuitem"
                  className={styles.choice}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <Controls>
          <Control
            label="Motion"
            options={["House", "Broken"]}
            value={house ? "House" : "Broken"}
            onChange={(value) => setHouse(value === "House")}
          />
        </Controls>
        <p className={styles.note}>
          {house
            ? "200ms, from the trigger, from scale 0.95."
            : "500ms, from the centre, from scale 0."}{" "}
          {reduced ? "Reduced motion shows the menu at once." : ""}
        </p>
      </div>
    </Demo>
  );
}

const VERIFY_KEY = "skills-at-work-verify";

export function VerifyDemo() {
  const [generation, setGeneration] = useState(0);
  return (
    <Demo>
      <VerifyPanel
        key={generation}
        onReload={() => setGeneration((value) => value + 1)}
      />
    </Demo>
  );
}

function VerifyPanel({ onReload }: { onReload: () => void }) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOn(window.sessionStorage.getItem(VERIFY_KEY) === "on");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.sessionStorage.setItem(VERIFY_KEY, on ? "on" : "off");
  }, [on, ready]);

  return (
    <div className={styles.stack}>
      <div className={styles.stage}>
        <div className={styles.row}>
          <span>Auto Sync</span>
          <button
            type="button"
            className={styles.choice}
            role="switch"
            aria-checked={on}
            onClick={() => setOn((value) => !value)}
          >
            {on ? "On" : "Off"}
          </button>
        </div>
        <button type="button" className={styles.button} onClick={onReload}>
          Reload Sample
        </button>
      </div>
      <p className={styles.report} role="status">
        {ready
          ? `Reloaded this sample. Auto Sync is ${on ? "on" : "off"}. See it on /dev/skills, under Verify.`
          : "Opening the sample."}
      </p>
    </div>
  );
}

export function MatchDemo() {
  const reference = useRef<HTMLDivElement>(null);
  const rebuild = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    { name: string; reference: string; rebuild: string }[]
  >([]);
  const [copied, setCopied] = useState(false);

  const read = (node: HTMLElement | null) => {
    if (!node) return null;
    const style = getComputedStyle(node);
    return {
      padding: style.padding,
      radius: style.borderRadius,
      size: style.fontSize,
    };
  };

  const compare = () => {
    const a = read(reference.current);
    const b = read(rebuild.current);
    if (!a || !b) return;
    setRows([
      { name: "Padding", reference: a.padding, rebuild: b.padding },
      { name: "Radius", reference: a.radius, rebuild: b.radius },
      { name: "Type", reference: a.size, rebuild: b.size },
    ]);
  };

  const apply = () => {
    const node = rebuild.current;
    const source = reference.current;
    if (!node || !source) return;
    const style = getComputedStyle(source);
    node.style.padding = style.padding;
    node.style.borderRadius = style.borderRadius;
    node.style.fontSize = style.fontSize;
    setCopied(true);
    compare();
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div className={styles.row}>
          <div
            ref={reference}
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              fontSize: 13,
              background: "var(--background-primary)",
              boxShadow: "var(--shadow-raised)",
            }}
          >
            Reference
          </div>
          <div
            ref={rebuild}
            style={{
              padding: copied ? undefined : 16,
              borderRadius: copied ? undefined : 12,
              fontSize: copied ? undefined : 16,
              background: "var(--background-primary)",
              boxShadow: "var(--shadow-raised)",
            }}
          >
            Rebuild
          </div>
        </div>
        <div className={styles.row}>
          <button type="button" className={styles.button} onClick={compare}>
            Read Computed Style
          </button>
          <button type="button" className={styles.button} onClick={apply}>
            Copy Measured Values
          </button>
        </div>
        {rows.length > 0 && (
          <div className={styles.report} role="status">
            {rows.map((row) => {
              const same = row.reference === row.rebuild;
              return (
                <p key={row.name}>
                  {row.name}{" "}
                  <span className={same ? styles.pass : styles.fail}>
                    {same
                      ? row.reference
                      : `${row.rebuild} against ${row.reference}`}
                  </span>
                </p>
              );
            })}
          </div>
        )}
      </div>
    </Demo>
  );
}

const SCALE = [0, 4, 8, 12, 16, 24, 32];

export function AlignmentDemo() {
  const title = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [findings, setFindings] = useState<string[]>([]);

  const measure = () => {
    const titleBox = title.current?.getBoundingClientRect();
    const bodyBox = body.current?.getBoundingClientRect();
    const cardStyle = card.current ? getComputedStyle(card.current) : null;
    const next: string[] = [];
    if (titleBox && bodyBox) {
      const dx = Math.round(titleBox.left - bodyBox.left);
      if (dx !== 0) {
        next.push(
          `1. Title starts ${Math.abs(dx)}px ${dx > 0 ? "right" : "left"} of the line under it. alignment-shared-edge.`,
        );
      }
    }
    if (cardStyle) {
      const padding = Math.round(Number.parseFloat(cardStyle.paddingTop));
      if (!SCALE.includes(padding)) {
        next.push(
          `2. Padding ${padding}px is off a 4px scale. alignment-on-scale.`,
        );
      }
    }
    setFindings(next.length > 0 ? next : ["No miss in this fixture."]);
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div ref={card} className={styles.stage} style={{ padding: 6 }}>
          <div ref={title} style={{ marginLeft: 2, fontWeight: 600 }}>
            Pro Plan
          </div>
          <div ref={body}>Billed yearly, 4 seats</div>
        </div>
        <button type="button" className={styles.button} onClick={measure}>
          Measure
        </button>
        {findings.length > 0 && (
          <div className={styles.report} role="status">
            {findings.map((finding) => (
              <p key={finding}>{finding}</p>
            ))}
          </div>
        )}
      </div>
    </Demo>
  );
}

type Stop = { id: number; name: string; role: string };

export function KeyboardDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [walked, setWalked] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !node.contains(target)) return;
      if (target === node) return;
      const name =
        target.getAttribute("aria-label") ||
        target.textContent?.trim() ||
        target.tagName;
      const role = target.getAttribute("role") || target.tagName.toLowerCase();
      setWalked(true);
      setStops((current) => {
        const last = current.at(-1);
        if (last && last.name === name && last.role === role) return current;
        return [...current, { id: current.length, name, role }];
      });
    };
    node.addEventListener("focusin", onFocus);
    return () => node.removeEventListener("focusin", onFocus);
  }, []);

  const unreachable = walked
    ? ["Open Row"].filter((name) => !stops.some((stop) => stop.name === name))
    : [];

  return (
    <Demo>
      <div className={styles.stack}>
        <div ref={root} className={styles.stage}>
          <div className={styles.row}>
            <button type="button" className={styles.button}>
              Close
            </button>
            <label className={styles.field}>
              Display Name
              <input aria-label="Display Name" defaultValue="Raphael" />
            </label>
            <label className={styles.row}>
              <input type="checkbox" /> Notifications
            </label>
            <div data-control="Open Row" className={styles.button}>
              Open Row
            </div>
            <button type="button" className={styles.button}>
              Save
            </button>
          </div>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setStops([]);
            setWalked(false);
            root.current?.querySelector("button")?.focus();
          }}
        >
          Reset Walk
        </button>
        <div className={styles.report} role="status" aria-live="polite">
          {stops.length === 0 && <p>Tab from Close. Each stop lands here.</p>}
          {stops.map((stop) => (
            <p key={stop.id}>
              {stop.id + 1}. {stop.name}{" "}
              <span className={styles.muted}>{stop.role}</span>
            </p>
          ))}
          {unreachable.map((name) => (
            <p key={name} className={styles.fail}>
              {name} never took focus. keyboard-reach-every-control.
            </p>
          ))}
        </div>
      </div>
    </Demo>
  );
}

const WIDTHS = [
  { label: "320", width: 140, child: 180 },
  { label: "390", width: 170, child: 160 },
  { label: "768", width: 220, child: 200 },
  { label: "1280", width: 280, child: 240 },
];

export function ViewportsDemo() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [rows, setRows] = useState<string[]>([]);

  const measure = () => {
    setRows(
      WIDTHS.map((item, index) => {
        const node = refs.current[index];
        if (!node) return `${item.label}: not measured`;
        const overflow = node.scrollWidth - node.clientWidth;
        return overflow > 1
          ? `${item.label}: overflows by ${Math.round(overflow)}px`
          : `${item.label}: fits`;
      }),
    );
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div className={styles.row}>
          {WIDTHS.map((item, index) => (
            <div key={item.label} className={styles.field}>
              <span>{item.label}</span>
              <div
                ref={(node) => {
                  refs.current[index] = node;
                }}
                style={{
                  width: item.width,
                  overflow: "auto",
                  background: "var(--background-primary)",
                  borderRadius: 8,
                  boxShadow: "var(--shadow-raised)",
                }}
              >
                <div style={{ width: item.child, padding: 8 }}>Card</div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className={styles.button} onClick={measure}>
          Measure Overflow
        </button>
        {rows.length > 0 && (
          <div className={styles.report} role="status">
            {rows.map((row) => (
              <p key={row}>{row}</p>
            ))}
          </div>
        )}
      </div>
    </Demo>
  );
}
