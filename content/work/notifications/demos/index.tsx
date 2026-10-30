"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  type CSSProperties,
  type MouseEvent,
  type Ref,
  useRef,
  useState,
} from "react";
import { Glyph, type Kind } from "./glyphs";
import styles from "./styles.module.css";
import { type Pattern, useTint } from "./tint";

type Notice = {
  kind: Kind;
  title: string;
  tone: string;
  speed: number;
  pattern: Pattern;
};

const NOTICES: Notice[] = [
  {
    kind: "success",
    title: "Success",
    tone: "#17b890",
    speed: 0.22,
    pattern: "aurora",
  },
  {
    kind: "information",
    title: "Information",
    tone: "#3d6df2",
    speed: 0.14,
    pattern: "contours",
  },
  {
    kind: "reminder",
    title: "Reminder",
    tone: "#7b5cf5",
    speed: 0.18,
    pattern: "halftone",
  },
  {
    kind: "error",
    title: "Error",
    tone: "#e1265f",
    speed: 0.22,
    pattern: "pixels",
  },
  {
    kind: "warning",
    title: "Warning",
    tone: "#ef7d1c",
    speed: 0.6,
    pattern: "stripes",
  },
];

const STAGGER = 0.07;
const layout = { type: "spring", bounce: 0.15, duration: 0.45 } as const;

function Card({
  ref,
  notice,
  index,
  onDismiss,
}: {
  ref?: Ref<HTMLLIElement>;
  notice: Notice;
  index: number;
  onDismiss: (kind: Kind) => void;
}) {
  const reduce = useReducedMotion();
  const canvas = useRef<HTMLCanvasElement>(null);
  const leaving = useRef(false);
  const [delay] = useState(() => (reduce ? 0 : index * STAGGER));
  const tint = useTint(canvas, {
    tone: notice.tone,
    speed: notice.speed,
    breathe: notice.kind === "reminder",
    delay: delay + 0.08,
    pattern: notice.pattern,
  });

  function act(event: MouseEvent<HTMLButtonElement>) {
    if (leaving.current) return;
    leaving.current = true;
    tint.burst(event.currentTarget);
    window.setTimeout(() => onDismiss(notice.kind), reduce ? 0 : 260);
  }

  const shake = notice.kind === "error" && !reduce;

  return (
    <motion.li
      ref={ref}
      layout
      className={styles.card}
      style={{ "--tone": notice.tone } as CSSProperties}
      onPointerMove={tint.move}
      onPointerLeave={tint.leave}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 14, scale: 0.98, filter: "blur(6px)" }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        x: shake ? [0, -5, 5, -3, 3, -1, 0] : 0,
      }}
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.15 } }
          : {
              opacity: 0,
              scale: 0.97,
              filter: "blur(4px)",
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      transition={{
        default: { type: "spring", bounce: 0.2, duration: 0.5, delay },
        filter: { duration: 0.35, delay },
        x: { duration: 0.45, delay: delay + 0.35, ease: "easeOut" },
        layout,
      }}
    >
      <canvas ref={canvas} className={styles.canvas} />
      <Glyph kind={notice.kind} delay={delay} />
      <span className={styles.title}>{notice.title}</span>
      <span className={styles.description}>Notification description here.</span>
      <button type="button" className={styles.action} onClick={act}>
        Action
      </button>
    </motion.li>
  );
}

export function Notifications() {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, amount: 0.4 });
  const [open, setOpen] = useState<Kind[]>(
    NOTICES.map((notice) => notice.kind),
  );
  const [round, setRound] = useState(0);
  const visible = NOTICES.filter((notice) => open.includes(notice.kind));

  function dismiss(kind: Kind) {
    setOpen((current) => current.filter((item) => item !== kind));
  }

  function replay() {
    setRound((value) => value + 1);
    setOpen(NOTICES.map((notice) => notice.kind));
  }

  return (
    <div ref={stage} className={styles.stage}>
      {inView && (
        <ul className={styles.list} aria-label="Notifications">
          <AnimatePresence mode="popLayout">
            {visible.map((notice, index) => (
              <Card
                key={`${notice.kind}-${round}`}
                notice={notice}
                index={index}
                onDismiss={dismiss}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
      <AnimatePresence>
        {inView && visible.length === 0 && (
          <motion.button
            key="replay"
            type="button"
            className={styles.replay}
            onClick={replay}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            Replay
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
