"use client";

import convert from "convert";
import type { BestKind } from "convert";
import type { MeasureKind, UnitsByMeasure } from "convert";
import { useEffect, useMemo, useState } from "react";

export interface UserPreferences {
  locale: string;
  timeZone?: string;
  unitSystem: BestKind;
}

export const useUserPreferences = (): UserPreferences => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    locale: "en-US",
    timeZone: "UTC",
    unitSystem: "metric",
  });

  useEffect(() => {
    const locale = navigator.language || "en-US";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    const shortLocale = locale.split("-")[0];
    const imperialLocales = ["en-US", "en-PH", "en-LC", "mm"];
    const unitSystem: UserPreferences["unitSystem"] = imperialLocales.includes(shortLocale) ? "imperial" : "metric";

    setPreferences({ locale, timeZone, unitSystem });
  }, []);

  return preferences;
};

export function useMeasurement(value: number, unit: UnitsByMeasure<MeasureKind>) {
  const { unitSystem } = useUserPreferences();
  const [isConverted, setIsConverted] = useState(false);

  const original = { quantity: value, unit };
  const converted = useMemo(() => convert(value, unit).to("best", unitSystem), [value, unit, unitSystem]);

  const display = isConverted ? converted : original;

  return {
    isConverted,
    toggle: () => setIsConverted((v) => !v),
    display,
    original,
    converted,
  };
}
