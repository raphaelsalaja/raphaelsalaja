import type { MDXComponents } from "mdx/types";
import { Caret } from "./caret";
import { Conversions } from "./conversions";
import { Dialogs } from "./dialogs";
import { Dropdown } from "./dropdown";
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
  Conversions,
  Dropdown,
};
