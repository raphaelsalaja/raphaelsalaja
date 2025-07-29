import type { MDXComponents } from "mdx/types";
import {
  Anticipation,
  Appeal,
  Arcs,
  Exaggeration,
  FollowThroughAndOverlappingAction,
  SecondaryAction,
  SlowInSlowOut,
  SolidDrawing,
  SquashStretch,
  Staging,
  StraightAheadActionAndPoseToPose,
  Timing,
} from "./12-principles";
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
  Conversions,
  SquashStretch,
  Anticipation,
  Arcs,
  Exaggeration,
  FollowThroughAndOverlappingAction,
  SecondaryAction,
  SlowInSlowOut,
  SolidDrawing,
  Staging,
  StraightAheadActionAndPoseToPose,
  Timing,
  Appeal,
};
