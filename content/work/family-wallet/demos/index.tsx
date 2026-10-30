"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  type ComponentProps,
  type CSSProperties,
  type Ref,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IconCopy, IconDotsFill, IconToastFill } from "@/components/icons";
import "./colors.css";
import styles from "./styles.module.css";

type Step = "expanded" | "customize" | "edit";
type Stage = "collapsed" | Step | "closing";

const STEPS: Record<Step, { action: string; next: Step }> = {
  expanded: { action: "Customize", next: "customize" },
  customize: { action: "Edit Nickname", next: "edit" },
  edit: { action: "Done", next: "customize" },
};

const COLORS = [
  "redPink",
  "pink",
  "purple",
  "darkPurple",
  "bluePurple",
  "darkBlue",
  "seaBlue",
  "blue",
  "emerald",
  "grassGreen",
  "green",
  "lime",
  "offYellow",
  "orange",
  "burntOrange",
  "red",
  "yellowBrown",
  "copper",
  "navy",
  "black",
];

const ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const BALANCE = (57_206).toLocaleString("en-US", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

const EASE = [0.19, 1, 0.22, 1] as const;
const DURATION = 0.4;
const RADIUS = 20;
const TOP_RIGHT = { x: 1, y: 0 };
const BOTTOM_RIGHT = { x: 1, y: 1 };

const blur = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  shown: { opacity: 1, filter: "blur(0px)" },
};

const picker = {
  hidden: { opacity: 0, y: 32, scale: 0.9, filter: "blur(12px)" },
  shown: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: (closing: boolean) => ({
    opacity: 0,
    y: 32,
    scale: 0.9,
    filter: "blur(12px)",
    transition: { duration: closing ? DURATION : 0.2 },
  }),
};

function tone(color: string) {
  return `var(--family-wallet-${color})`;
}

function isStep(stage: Stage): stage is Step {
  return stage in STEPS;
}

function Card({ style, ...props }: ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      {...props}
      layoutId="wallet"
      className={styles.wallet}
      style={{ borderRadius: RADIUS, ...style }}
    />
  );
}

function Identity({
  name,
  editing = false,
  inputRef,
  onChange,
  onCommit,
  onDone,
}: {
  name: string;
  editing?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: (name: string) => void;
  onCommit?: () => void;
  onDone?: () => void;
}) {
  return (
    <div className={styles.column}>
      <motion.div layoutId="wallet-icon" className={styles.icon}>
        <IconToastFill size={24} />
      </motion.div>

      <motion.div layoutId="wallet-details" className={styles.details}>
        <input
          ref={inputRef}
          className={styles.name}
          value={name}
          disabled={!editing}
          placeholder="Wallet Name"
          aria-label="Wallet name"
          onChange={(event) => onChange?.(event.target.value)}
          onBlur={onCommit}
          onKeyDown={(event) => {
            if (event.key === "Enter") onDone?.();
          }}
        />
        <motion.p
          className={styles.balance}
          animate={{ opacity: editing ? 0.5 : 1 }}
        >
          {BALANCE}
        </motion.p>
      </motion.div>
    </div>
  );
}

function Collapsed({
  name,
  blurIn = false,
}: {
  name: string;
  blurIn?: boolean;
}) {
  return (
    <>
      <Identity name={name} />
      <div className={styles.column}>
        <motion.div
          layout
          layoutAnchor={TOP_RIGHT}
          aria-hidden
          className={styles.options}
          initial={blurIn ? blur.hidden : false}
          animate={blur.shown}
          style={{ borderRadius: 12 }}
        >
          <IconDotsFill />
        </motion.div>
      </div>
    </>
  );
}

function Action({
  label,
  editing,
  onClick,
}: {
  label: string;
  editing: boolean;
  onClick: () => void;
}) {
  const sizer = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    const node = sizer.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setWidth(node.offsetWidth));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div layout layoutAnchor={BOTTOM_RIGHT} className={styles.corner}>
      <motion.button
        type="button"
        className={styles.action}
        data-editing={editing || undefined}
        initial={blur.hidden}
        animate={{ ...blur.shown, width }}
        whileHover={{ scale: 0.98, opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span ref={sizer} aria-hidden className={styles.sizer}>
          {label}
        </span>
        <AnimatePresence initial={false}>
          <motion.span
            key={label}
            className={styles.label}
            initial={blur.hidden}
            animate={blur.shown}
            exit={{ ...blur.hidden, transition: { duration: 0.15 } }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

function Picker({
  color,
  onSelect,
  onSave,
}: {
  color: string;
  onSelect: (color: string) => void;
  onSave: () => void;
}) {
  return (
    <motion.div
      className={styles.picker}
      variants={picker}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <div className={styles.swatch}>
        {COLORS.map((swatch) => (
          <motion.button
            key={swatch}
            type="button"
            className={styles.color}
            aria-label={swatch}
            aria-pressed={swatch === color}
            style={{ background: tone(swatch) }}
            whileHover={{ opacity: 0.8 }}
            onClick={() => onSelect(swatch)}
          />
        ))}
      </div>
      <motion.button
        type="button"
        className={styles.save}
        whileHover={{ scale: 0.98, opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSave}
      >
        Save
      </motion.button>
    </motion.div>
  );
}

export function FamilyWallet() {
  const slotRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<Stage>("collapsed");
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [name, setName] = useState("Raphael");
  const [color, setColor] = useState("green");

  const editing = stage === "edit";
  const closing = stage === "closing";
  const palette = { "--wallet": tone(color) } as CSSProperties;

  function commitName() {
    setName((current) => current.trim() || "New Wallet");
  }

  function advance(step: Step) {
    if (step === "edit") commitName();
    setStage(STEPS[step].next);
  }

  function close() {
    commitName();
    setOrigin(slotRef.current?.getBoundingClientRect() ?? null);
    setStage("closing");
  }

  useEffect(() => {
    const input = inputRef.current;
    if (stage !== "edit" || !input) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, [stage]);

  useEffect(() => {
    if (stage !== "closing") return;
    const timeout = setTimeout(() => setStage("collapsed"), DURATION * 1000);
    return () => clearTimeout(timeout);
  }, [stage]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ ease: EASE, duration: DURATION }}
    >
      <Dialog.Root
        open={stage !== "collapsed"}
        onOpenChange={(open) => {
          if (open) setStage("expanded");
          else if (!closing) close();
        }}
      >
        <div ref={slotRef} className={styles.slot} style={palette}>
          {stage === "collapsed" && (
            <Dialog.Trigger
              nativeButton={false}
              aria-label="Open wallet"
              render={
                <Card
                  whileHover={{ scale: 0.98, opacity: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Collapsed name={name} />
                </Card>
              }
            />
          )}
        </div>

        <Dialog.Portal keepMounted>
          <Dialog.Backdrop
            className={styles.backdrop}
            data-closing={closing || undefined}
          />

          <Dialog.Popup className={styles.popup} style={palette}>
            {closing && origin && (
              <Card
                style={{
                  position: "absolute",
                  top: origin.top,
                  left: origin.left,
                  width: origin.width,
                }}
              >
                <Collapsed name={name} blurIn />
              </Card>
            )}

            {isStep(stage) && (
              <Card style={{ width: 400 }}>
                <Identity
                  name={name}
                  editing={editing}
                  inputRef={inputRef}
                  onChange={setName}
                  onCommit={commitName}
                  onDone={() => advance("edit")}
                />

                <div className={styles.column}>
                  <motion.button
                    type="button"
                    layout
                    layoutAnchor={TOP_RIGHT}
                    className={styles.copy}
                    initial={blur.hidden}
                    animate={{ ...blur.shown, opacity: editing ? 0.5 : 1 }}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigator.clipboard.writeText(ADDRESS)}
                  >
                    Copy Address
                    <IconCopy size={16} strokeWidth={2} />
                  </motion.button>

                  <Action
                    label={STEPS[stage].action}
                    editing={editing}
                    onClick={() => advance(stage)}
                  />
                </div>
              </Card>
            )}

            <AnimatePresence mode="popLayout" custom={closing}>
              {stage === "customize" && (
                <Picker
                  key="picker"
                  color={color}
                  onSelect={setColor}
                  onSave={close}
                />
              )}
            </AnimatePresence>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </MotionConfig>
  );
}
