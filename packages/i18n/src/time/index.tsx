"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useUserPreferences } from "../hooks";
import { timeZoneMeta } from "../data/timeZones";
import type {
  TimeZone,
  TimeZoneAbbreviation,
  TimeZoneLabel as TZLabel,
} from "../data/timeZones";
import { motion, AnimatePresence } from "motion/react";

interface TimeContextValue {
  isConverted: boolean;
  toggle: () => void;
  original: { date: string; label: string };
  converted: { date: string; label: string };
}

const TimeContext = createContext<TimeContextValue | null>(null);

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("Time components must be used within <TimeRoot>");
  }
  return context;
};

export interface TimeProps {
  date: Date | string;
  timeZone?: TimeZone | TZLabel | TimeZoneAbbreviation;
  children: ReactNode;
}

const normalizeZone = (zone: string | undefined): string => {
  if (!zone) return "UTC";

  const exact = timeZoneMeta.find(
    (z) => z.value === zone || z.abbreviation === zone
  );
  if (exact) return exact.value;

  const match = zone.match(/^GMT([+-])(\d+)$/i);
  if (match) {
    const [, sign, hour] = match;
    return `Etc/GMT${sign === "+" ? "-" : "+"}${hour}`;
  }

  return "UTC";
};

const formatDate = (date: Date, timeZone: string): string =>
  new Intl.DateTimeFormat(undefined, {
    timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

const getLabel = (zone: string): string => {
  return timeZoneMeta.find((z) => z.value === zone)?.label ?? zone;
};

// Root
export const TimeRoot = ({ date, timeZone, children }: TimeProps) => {
  const preferences = useUserPreferences();
  const [isConverted, setIsConverted] = useState(false);

  const inputDate = useMemo(
    () => (typeof date === "string" ? new Date(date) : date),
    [date]
  );
  const userZone = useMemo(
    () => normalizeZone(preferences.timeZone),
    [preferences.timeZone]
  );
  const targetZone = useMemo(() => normalizeZone(timeZone), [timeZone]);

  const original = {
    date: formatDate(inputDate, targetZone),
    label: getLabel(targetZone),
  };

  const converted = {
    date: formatDate(inputDate, userZone),
    label: getLabel(userZone),
  };

  const value: TimeContextValue = {
    isConverted,
    toggle: () => setIsConverted((v) => !v),
    original,
    converted,
  };

  return (
    <TimeContext.Provider value={value}>
      <motion.span
        onClick={value.toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            value.toggle();
          }
        }}
        tabIndex={0}
        data-rs-i18n-timezone
      >
        {children}
      </motion.span>
    </TimeContext.Provider>
  );
};

export const TimeDate = () => {
  const { isConverted, original, converted } = useTimeContext();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={isConverted ? "converted-date" : "original-date"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-rs-i18n-date
      >
        {isConverted ? converted.date : original.date}
      </motion.span>
    </AnimatePresence>
  );
};

export const TimeZoneLabel = () => {
  const { isConverted, original, converted } = useTimeContext();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={isConverted ? "converted-label" : "original-label"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-rs-i18n-zone
      >
        {isConverted ? converted.label : original.label}
      </motion.span>
    </AnimatePresence>
  );
};
