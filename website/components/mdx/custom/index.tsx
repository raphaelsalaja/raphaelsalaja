import type { MDXComponents } from "mdx/types";
import { SquashStretch } from "./12-principles/squash-and-stretch";
import { Caret } from "./caret";
import { Conversions } from "./conversions";
import { Dialogs } from "./dialogs";
import { FamilyWallet } from "./family-wallet";
import { Nature } from "./nature";
import { Tone } from "./tone";
import { Workouts } from "./workouts";
export const CustomComponents: Partial<MDXComponents> = {
  Workouts,
  Caret,
  FamilyWallet,
  Nature,
  Tone,
  Dialogs,
  SquashStretch,
  Conversions,
};
