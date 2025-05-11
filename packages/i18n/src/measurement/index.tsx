"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import convert from "convert";
import { useUserPreferences } from "../hooks";
import type { UnitsByMeasure, MeasureKind } from "convert";
import { motion, AnimatePresence } from "motion/react";
import NumberFlow from "@number-flow/react";
import useMeasure from "react-use-measure";

interface MeasurementContextValue {
  original: { quantity: number; unit: UnitsByMeasure<MeasureKind> };
  converted: { quantity: number; unit: string };
  isConverted: boolean;
  toggle: () => void;
}

const MeasurementContext = createContext<MeasurementContextValue | null>(null);

export const useMeasurementContext = () => {
  const context = useContext(MeasurementContext);
  if (!context) {
    throw new Error(
      "Measurement components must be used within <MeasurementRoot>"
    );
  }
  return context;
};

interface MeasurementRootProps {
  value: number;
  unit: UnitsByMeasure<MeasureKind>;
  children: ReactNode;
}

export const MeasurementRoot = ({
  value,
  unit,
  children,
}: MeasurementRootProps) => {
  const { unitSystem } = useUserPreferences();
  const [isConverted, setIsConverted] = useState(false);

  const original = useMemo(() => ({ quantity: value, unit }), [value, unit]);
  const converted = useMemo(
    () => convert(value, unit).to("best", unitSystem),
    [value, unit, unitSystem]
  );
  const contextValue: MeasurementContextValue = {
    original,
    converted,
    isConverted,
    toggle: () => setIsConverted((v) => !v),
  };

  const [ref, bounds] = useMeasure({ debounce: 0 });

  return (
    <MeasurementContext.Provider value={contextValue}>
      <motion.span
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            contextValue.toggle();
          }
        }}
        onClick={contextValue.toggle}
        style={{ width: bounds.width || "auto" }}
        animate={{ width: bounds.width || "auto" }}
        data-rs-i18n-measurement-root
      >
        <motion.span data-rs-i18n-measurement-span ref={ref}>
          {children}
        </motion.span>
      </motion.span>
    </MeasurementContext.Provider>
  );
};

const MotionNumberFlow = motion.create(NumberFlow);

export const MeasurementQuantity = () => {
  const { isConverted, original, converted } = useMeasurementContext();

  return (
    <MotionNumberFlow
      data-rs-i18n-measurement-quantity
      value={isConverted ? converted.quantity : original.quantity}
      format={{ maximumFractionDigits: 2 }}
    />
  );
};

export const MeasurementUnit = () => {
  const { isConverted, original, converted } = useMeasurementContext();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isConverted ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="unit-converted"
          data-rs-i18n-measurement-unit
        >
          {converted.unit}
        </motion.span>
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="unit-original"
          data-rs-i18n-measurement-unit
        >
          {original.unit}
        </motion.span>
      )}
    </AnimatePresence>
  );
};
