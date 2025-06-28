import type { MDXComponents } from "mdx/types";
import { Accordion } from "./accordion";
import { Caret } from "./caret";
import { Conversions } from "./conversions";
import { Dialogs } from "./dialogs";
import { FamilyWallet } from "./family-wallet";
import { Nature } from "./nature";
import { Tone } from "./tone";
import { Workouts } from "./workouts";
import { Dropdown } from "./dropdown";

export const CustomComponents: Partial<MDXComponents> = {
  Accordion,
  Workouts,
  Caret,
  FamilyWallet,
  Nature,
  Tone,
  Dialogs,
  Conversions,
  Dropdown,
};
