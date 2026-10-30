"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";

export type StackListItem = {
  href: string;
  title: string;
  description?: string;
};

type Rect = { top: number; left: number; width: number; height: number };

type Pull = {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  originX: number;
  originY: number;
};

const hoverSpring = { type: "spring", duration: 0.72, bounce: 0.22 } as const;
const shiftSpring = { type: "spring", duration: 0.6, bounce: 0.15 } as const;
const tiltSpring = { type: "spring", duration: 0.45, bounce: 0.06 } as const;
const textSpring = { type: "spring", duration: 0.6, bounce: 0 } as const;
const instant = { duration: 0 } as const;
const textShift = 0.18;
const hideDelay = 500;

const rest: Pull = {
  x: 0,
  y: 0,
  rotateX: 0,
  rotateY: 0,
  originX: 50,
  originY: 50,
};

function clamp(value: number) {
  return Math.min(1, Math.max(-1, value));
}

function soften(value: number) {
  return Math.sign(value) * (1 - Math.sqrt(1 - Math.abs(value)));
}

function measure(row: HTMLElement): Rect {
  return {
    top: row.offsetTop,
    left: row.offsetLeft,
    width: row.offsetWidth,
    height: row.offsetHeight,
  };
}

function Row({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/library/") || href.startsWith("/work/")) {
    return (
      <Link href={href} className={styles.row}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("/")) {
    return (
      <a href={href} className={styles.row}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener" className={styles.row}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function StackList({ items }: { items: StackListItem[] }) {
  const reduceMotion = useReducedMotion();
  const shared = reduceMotion === false;
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [snap, setSnap] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const [pull, setPull] = useState<Pull>(rest);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  function enter(index: number, event: PointerEvent<HTMLLIElement>) {
    if (event.pointerType === "touch") return;

    const row = rows.current[index];
    if (!row) return;

    clearTimeout(hideTimer.current);
    setSnap(!visible);
    setActive(index);
    setVisible(true);
    setRect(measure(row));
  }

  function leaveRow() {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setActive(null);
      setVisible(false);
    }, hideDelay);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || active === null) return;

    const row = rows.current[active];
    if (!row) return;

    const bounds = row.getBoundingClientRect();
    const dx = clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    const dy = clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    const aspect = Math.max(1, bounds.width / bounds.height);

    setSnap(false);
    setPull({
      x: 12 * soften(dx),
      y: 8 * soften(dy),
      rotateX: -dy * Math.min(1.6, 0.7 + 0.18 * aspect),
      rotateY: 0.8 * dx,
      originX: 30 + 20 * (dx + 1),
      originY: 30 + 20 * (dy + 1),
    });
  }

  return (
    <div
      className={styles.root}
      data-shared-hover={shared || undefined}
      onPointerMove={shared ? move : undefined}
      onPointerLeave={shared ? () => setPull(rest) : undefined}
    >
      {shared && (
        <div className={styles.stage} aria-hidden>
          <motion.span
            className={styles.pill}
            initial={false}
            animate={{
              opacity: visible ? 1 : 0,
              top: rect?.top ?? 0,
              left: rect?.left ?? 0,
              width: rect?.width ?? 0,
              height: rect?.height ?? 0,
              rotateX: pull.rotateX,
              rotateY: pull.rotateY,
              x: pull.x,
              y: pull.y,
            }}
            transition={{
              ...(snap ? instant : hoverSpring),
              opacity: { duration: 0.8 },
              rotateX: tiltSpring,
              rotateY: tiltSpring,
              x: shiftSpring,
              y: shiftSpring,
            }}
            style={{ transformOrigin: `${pull.originX}% ${pull.originY}%` }}
          />
        </div>
      )}
      <ul className={styles.list}>
        {items.map((item, index) => {
          const pulled = shared && active === index;

          return (
            <li
              key={item.href}
              ref={(row) => {
                rows.current[index] = row;
              }}
              className={styles.item}
              onPointerEnter={
                shared ? (event) => enter(index, event) : undefined
              }
              onPointerLeave={shared ? leaveRow : undefined}
            >
              <Row href={item.href}>
                <motion.span
                  className={styles.content}
                  initial={false}
                  animate={{
                    x: pulled ? pull.x * textShift : 0,
                    y: pulled ? pull.y * textShift : 0,
                  }}
                  transition={{ x: textSpring, y: textSpring }}
                >
                  <span className={styles.title}>{item.title}</span>
                  {item.description && (
                    <span className={styles.description}>
                      {item.description}
                    </span>
                  )}
                </motion.span>
              </Row>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
