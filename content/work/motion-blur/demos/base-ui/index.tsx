"use client";

import type { MotionBlurDefaults } from "@web-kits/motion-blur/react";
import { useInView, useReducedMotion } from "motion/react";
import {
  Children,
  type ComponentType,
  type CSSProperties,
  isValidElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Control, Controls } from "../controls";
import {
  SHUTTERS,
  type Shutter,
  SPEED,
  SPEEDS,
  type Speed,
  shutterFraction,
} from "../motion";
import { PAINTS, TECHNIQUES, type Technique } from "../streak";
import { DrawerExample } from "./drawer";
import { MenuExample } from "./menu";
import { SelectExample } from "./select";
import styles from "./styles.module.css";
import { TabsExample } from "./tabs";
import { ToastExample } from "./toast";

export type ExampleProps = {
  blur: boolean;
  options: MotionBlurDefaults;
  rate: number;
  step: number;
  container: HTMLDivElement;
};

const COMPONENTS = ["Drawer", "Tabs", "Menu", "Select", "Toast"] as const;

type Component = (typeof COMPONENTS)[number];

const EXAMPLES: Record<Component, ComponentType<ExampleProps>> = {
  Drawer: DrawerExample,
  Tabs: TabsExample,
  Menu: MenuExample,
  Select: SelectExample,
  Toast: ToastExample,
};

const BEAT = 1000;

function Pane({
  label,
  Example,
  ...props
}: Omit<ExampleProps, "container"> & {
  label: string;
  Example: ComponentType<ExampleProps>;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <div className={styles.pane}>
      <span className={styles.label}>{label}</span>
      <div ref={setContainer} className={styles.stage} inert>
        {container && <Example {...props} container={container} />}
      </div>
    </div>
  );
}

export function BaseUI({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [component, setComponent] = useState<Component>("Drawer");
  const [technique, setTechnique] = useState<Technique>("Echo");
  const [shutter, setShutter] = useState<Shutter>("180°");
  const [speed, setSpeed] = useState<Speed>("1×");
  const [step, setStep] = useState(0);
  const rate = SPEED[speed];

  // biome-ignore lint/correctness/useExhaustiveDependencies: a new component restarts the clock
  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setInterval(() => setStep((s) => s + 1), BEAT / rate);
    return () => clearInterval(timer);
  }, [inView, reduced, component, rate]);

  const options: MotionBlurDefaults = {
    technique: PAINTS[technique],
    shutter: technique === "None" ? 0 : (shutterFraction(shutter) / rate) * 360,
  };

  const Example = EXAMPLES[component];
  const code =
    Children.toArray(children).filter(isValidElement)[
      COMPONENTS.indexOf(component)
    ];

  return (
    <div className={styles.root}>
      <div
        ref={frame}
        className={styles.frame}
        style={{ "--rate": rate } as CSSProperties}
      >
        <div
          className={styles.panes}
          role="img"
          aria-label={`A Base UI ${component.toLowerCase()} playing twice on a loop, on the left with motion blur and on the right without.`}
        >
          <Pane
            key={`${component}-blur`}
            label="Motion Blur"
            blur
            options={options}
            rate={rate}
            step={step}
            Example={Example}
          />
          <Pane
            key={`${component}-none`}
            label="No Motion Blur"
            blur={false}
            options={options}
            rate={rate}
            step={step}
            Example={Example}
          />
        </div>
        <Controls>
          <Control
            label="Component"
            options={COMPONENTS}
            value={component}
            onChange={(next) => {
              setComponent(next);
              setStep(0);
            }}
          />
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
      {code}
    </div>
  );
}
