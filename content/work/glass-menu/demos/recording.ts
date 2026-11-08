import { createMorph, type MorphGeometry } from "@web-kits/springboard";
import glass from "../fixtures/glass.json";

const rect = ([x, y, width, height]: number[]) => ({ x, y, width, height });

/** The recorded screen, in iPhone 18 Pro points. */
export const GEOMETRY: MorphGeometry = {
  source: rect(glass.button),
  target: rect(glass.popover),
  pivot: rect(glass.label),
  sourceRadius: glass.buttonRadius,
  targetRadius: glass.popoverRadius,
};

export const [OPENING, CLOSING] = glass.after;
export type Run = typeof OPENING;

/** When the main spring started after the tap, in seconds, fitted per run. */
const START = { open: 0.0756, close: 0.032 };

/** The port played from the same moment as a recorded run. */
export function replay(open: boolean) {
  const morph = createMorph(() => GEOMETRY);
  morph.jump(!open, 0);
  if (open) morph.show(START.open);
  else morph.hide(START.close);
  return (t: number) => morph.sample(t);
}
