"use client";

import { useInView, useReducedMotion } from "motion/react";
import {
  Children,
  type ComponentType,
  isValidElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Control, Controls } from "../controls";
import { DrawerExample } from "./drawer";
import { MenuExample } from "./menu";
import { SelectExample } from "./select";
import styles from "./styles.module.css";
import { TabsExample } from "./tabs";
import { ToastExample } from "./toast";

export type ExampleProps = {
  blur: boolean;
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
  blur,
  step,
  Example,
}: {
  label: string;
  blur: boolean;
  step: number;
  Example: ComponentType<ExampleProps>;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <div className={styles.pane}>
      <span className={styles.label}>{label}</span>
      <div ref={setContainer} className={styles.stage} inert>
        {container && <Example blur={blur} step={step} container={container} />}
      </div>
    </div>
  );
}

export function BaseUI({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [component, setComponent] = useState<Component>("Drawer");
  const [step, setStep] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a new component restarts the clock
  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setInterval(() => setStep((s) => s + 1), BEAT);
    return () => clearInterval(timer);
  }, [inView, reduced, component]);

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
        role="img"
        aria-label={`A Base UI ${component.toLowerCase()} playing twice on a loop, on the left with motion blur and on the right without.`}
      >
        <div className={styles.panes}>
          <Pane
            key={`${component}-blur`}
            label="Motion Blur"
            blur
            step={step}
            Example={Example}
          />
          <Pane
            key={`${component}-none`}
            label="No Motion Blur"
            blur={false}
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
        </Controls>
      </div>
      {code}
    </div>
  );
}
