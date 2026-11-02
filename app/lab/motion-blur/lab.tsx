"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  type MotionBlurHandle,
  useMotionBlur,
} from "@web-kits/motion-blur/react";
import {
  type CSSProperties,
  type ReactNode,
  type Ref,
  useRef,
  useState,
} from "react";
import { Segmented } from "@/components/writing/segmented";
import styles from "./styles.module.css";

const BLURS = ["Off", "180°", "360°"] as const;
const SPEEDS = ["1×", "½×", "¼×"] as const;

type Blur = (typeof BLURS)[number];
type Speed = (typeof SPEEDS)[number];

const OPEN: Record<Blur, number> = { Off: 0, "180°": 0.5, "360°": 1 };
const RATE: Record<Speed, number> = { "1×": 1, "½×": 0.5, "¼×": 0.25 };

const EXPAND = { width: 360, height: 240 };

const number = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });

export function Lab() {
  const [blur, setBlur] = useState<Blur>("180°");
  const [speed, setSpeed] = useState<Speed>("1×");
  const readout = useRef<HTMLParagraphElement>(null);
  const peak = useRef(0);

  const rate = { "--rate": RATE[speed] } as CSSProperties;
  const motion = useMotionBlur({
    shutter: (OPEN[blur] / RATE[speed]) * 360,
    onFrame: (streak) => {
      if (streak <= peak.current || !readout.current) return;
      peak.current = streak;
      readout.current.textContent = `Peak streak ${number.format(streak)}px, ${Math.min(16, Math.max(2, Math.ceil(streak / 1.5)))} copies`;
    },
  });

  const reset = () => {
    peak.current = 0;
    if (readout.current) {
      readout.current.textContent =
        blur === "Off" ? "Blur off" : "Peak streak 0px";
    }
  };

  const shared = { blurRef: motion.ref, rate, onChange: reset };

  return (
    <div className={styles.lab}>
      <header className={styles.header}>
        <h1>Motion Blur Lab</h1>
        <p>
          Open each one at 1×, then at ¼× to see the copies. Slow motion keeps
          the streak a 1× frame would have.
        </p>
      </header>
      <div className={styles.controls}>
        <Segmented
          label="Motion Blur"
          options={BLURS}
          value={blur}
          onChange={setBlur}
        />
        <Segmented
          label="Speed"
          options={SPEEDS}
          value={speed}
          onChange={setSpeed}
        />
      </div>
      <div className={styles.triggers}>
        <Modal {...shared} />
        <Sheet {...shared} />
        <Expand {...shared} />
      </div>
      <p ref={readout} className={styles.readout} aria-live="off">
        Peak streak 0px
      </p>
    </div>
  );
}

type Shared = {
  blurRef: MotionBlurHandle["ref"];
  rate: CSSProperties;
  onChange: () => void;
};

function Frame({
  label,
  triggerRef,
  trigger = styles.trigger,
  popup,
  style,
  blurRef,
  rate,
  onChange,
  children,
}: Shared & {
  label: string;
  triggerRef?: Ref<HTMLButtonElement>;
  trigger?: string;
  popup: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Dialog.Root onOpenChange={onChange}>
      <Dialog.Trigger ref={triggerRef} className={trigger}>
        {label}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} style={rate} />
        <Dialog.Popup
          ref={blurRef}
          className={popup}
          style={{ ...rate, ...style }}
        >
          <div className={styles.surface}>{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Body({ title, text }: { title: string; text: string }) {
  return (
    <>
      <Dialog.Title className={styles.title}>{title}</Dialog.Title>
      <Dialog.Description className={styles.text}>{text}</Dialog.Description>
      <div className={styles.actions}>
        <Dialog.Close className={styles.button}>Cancel</Dialog.Close>
        <Dialog.Close className={styles.button} data-primary="">
          Confirm
        </Dialog.Close>
      </div>
    </>
  );
}

function Modal(props: Shared) {
  return (
    <Frame label="Modal" popup={styles.modal} {...props}>
      <Body
        title="Delete Project"
        text="This removes the project and its 14 deployments. You can't undo it."
      />
    </Frame>
  );
}

function Sheet(props: Shared) {
  return (
    <Frame label="Sheet" popup={styles.sheet} {...props}>
      <Body
        title="Share Link"
        text="Anyone with the link can view this file. Links expire after 30 days."
      />
    </Frame>
  );
}

function Expand({ onChange, ...props }: Shared) {
  const tile = useRef<HTMLButtonElement>(null);
  const [from, setFrom] = useState<CSSProperties>({});

  const measure = () => {
    if (!tile.current) return;
    const rect = tile.current.getBoundingClientRect();
    setFrom({
      "--dx": `${rect.left + rect.width / 2 - innerWidth / 2}px`,
      "--dy": `${rect.top + rect.height / 2 - innerHeight / 2}px`,
      "--sx": rect.width / EXPAND.width,
      "--sy": rect.height / EXPAND.height,
    } as CSSProperties);
  };

  return (
    <Frame
      label="Expand"
      popup={styles.expand}
      style={from}
      triggerRef={tile}
      trigger={styles.tile}
      onChange={() => {
        measure();
        onChange();
      }}
      {...props}
    >
      <Body
        title="Summer 2026"
        text="148 photos from Lisbon and Porto, shared with 3 people."
      />
    </Frame>
  );
}
