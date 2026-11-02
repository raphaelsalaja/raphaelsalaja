"use client";

import type { MotionBlurDefaults } from "@web-kits/motion-blur/react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Children,
  type ComponentType,
  type CSSProperties,
  cloneElement,
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
import { DialogExample } from "./dialog";
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

const COMPONENTS = [
  "Drawer",
  "Dialog",
  "Tabs",
  "Menu",
  "Select",
  "Toast",
] as const;

type Component = (typeof COMPONENTS)[number];

const EXAMPLES: Record<Component, ComponentType<ExampleProps>> = {
  Drawer: DrawerExample,
  Dialog: DialogExample,
  Tabs: TabsExample,
  Menu: MenuExample,
  Select: SelectExample,
  Toast: ToastExample,
};

const BEAT = 1000;

const EASE = [0.23, 1, 0.32, 1] as const;

const MOVE = [0.77, 0, 0.175, 1] as const;

function swap(reduced: boolean | null, enter: number, exit: number) {
  const hidden = reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" };
  return {
    initial: hidden,
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: enter, ease: EASE },
      transitionEnd: { filter: "none" },
    },
    exit: { ...hidden, transition: { duration: exit, ease: EASE } },
  };
}

function Height({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const inner = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (!inner.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize[0].blockSize);
    });
    observer.observe(inner.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.span
      className={styles.height}
      initial={false}
      animate={{ height }}
      transition={{ duration: reduced ? 0 : 0.25, ease: MOVE }}
    >
      <span ref={inner} className={styles.measure}>
        {children}
      </span>
    </motion.span>
  );
}

type PaneProps = Omit<ExampleProps, "container"> & {
  Example: ComponentType<ExampleProps>;
};

function Layer({ Example, ...props }: PaneProps) {
  const reduced = useReducedMotion();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <motion.div
      ref={setContainer}
      className={styles.layer}
      {...swap(reduced, 0.2, 0.15)}
    >
      {container && <Example {...props} container={container} />}
    </motion.div>
  );
}

function Pane({
  label,
  component,
  ...props
}: PaneProps & { label: string; component: Component }) {
  return (
    <div className={styles.pane}>
      <span className={styles.label}>{label}</span>
      <div className={styles.stage} inert>
        <AnimatePresence initial={false}>
          <Layer key={component} {...props} />
        </AnimatePresence>
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
  const code = Children.toArray(children).filter(
    isValidElement<{ children?: ReactNode }>,
  )[COMPONENTS.indexOf(component)];

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
            label="Motion Blur"
            component={component}
            blur
            options={options}
            rate={rate}
            step={step}
            Example={Example}
          />
          <Pane
            label="No Motion Blur"
            component={component}
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
      {code &&
        cloneElement(
          code,
          { key: "code" },
          <Height>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={component}
                className={styles.code}
                {...swap(reduced, 0.2, 0.15)}
              >
                {code.props.children}
              </motion.span>
            </AnimatePresence>
          </Height>,
        )}
    </div>
  );
}
