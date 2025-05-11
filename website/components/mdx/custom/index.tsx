import type { MDXComponents } from "mdx/types";

import { Caret } from "./caret";
import { Workouts } from "./workouts";
import { Accordion } from "./accordion";
import { FamilyWallet } from "./family-wallet";
import { Dialogs } from "./dialogs";
import { Nature } from "./nature";
import { Tone } from "./tone";
import { Conversions } from "./conversions";

export const CustomComponents: Partial<MDXComponents> = {
  Accordion,
  Workouts,
  Caret,
  FamilyWallet,
  Nature,
  Tone,
  Dialogs,
  Conversions,
};
