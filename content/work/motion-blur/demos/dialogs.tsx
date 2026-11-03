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
import { Control, Controls } from "@/components/controls";
import styles from "./dialogs.module.css";
import { SHUTTERS, type Shutter, shutterFraction } from "./motion";
import { PAINTS, TECHNIQUES, type Technique } from "./streak";
import base from "./styles.module.css";

const SPEEDS = ["1×", "½×", "¼×"] as const;

type Speed = (typeof SPEEDS)[number];

const RATE: Record<Speed, number> = { "1×": 1, "½×": 0.5, "¼×": 0.25 };

const EXPAND = { width: 360, height: 240 };

const number = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });

export function Dialogs() {
  const [technique, setTechnique] = useState<Technique>("Echo");
  const [shutter, setShutter] = useState<Shutter>("180°");
  const [speed, setSpeed] = useState<Speed>("1×");
  const readout = useRef<HTMLParagraphElement>(null);
  const peak = useRef(0);
  const off = technique === "None";

  const rate = { "--rate": RATE[speed] } as CSSProperties;
  const motion = useMotionBlur({
    technique: PAINTS[technique],
    shutter: off ? 0 : (shutterFraction(shutter) / RATE[speed]) * 360,
    onFrame: (streak) => {
      if (streak <= peak.current || !readout.current) return;
      peak.current = streak;
      readout.current.textContent = `Peak streak ${number.format(streak)}px`;
    },
  });

  const reset = () => {
    peak.current = 0;
    if (readout.current) {
      readout.current.textContent = off ? "Blur off" : "Peak streak 0px";
    }
  };

  const shared = { blurRef: motion.ref, rate, onChange: reset };

  return (
    <div className={base.lab}>
      <div className={`${base.body} ${styles.stage}`}>
        <div className={styles.triggers}>
          <Modal {...shared} />
          <Sheet {...shared} />
          <Expand {...shared} />
        </div>
        <p ref={readout} className={base.readout} aria-live="off">
          Peak streak 0px
        </p>
      </div>
      <Controls>
        <Control
          label="Technique"
          options={TECHNIQUES}
          value={technique}
          onChange={setTechnique}
        />
        <Control
          label="Shutter"
          options={SHUTTERS}
          value={shutter}
          onChange={setShutter}
        />
        <Control
          label="Speed"
          options={SPEEDS}
          value={speed}
          onChange={setSpeed}
        />
      </Controls>
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
          <div className={styles.lens}>
            <div className={styles.surface}>{children}</div>
          </div>
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
