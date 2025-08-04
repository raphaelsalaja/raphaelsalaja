import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";

import { Image } from "@/components/image";
import {
  Anticipation,
  Appeal,
  Arcs,
  Caret,
  Conversions,
  Dialogs,
  Exaggeration,
  FamilyWallet,
  FollowThroughAndOverlappingAction,
  Nature,
  SecondaryAction,
  SlowInSlowOut,
  SolidDrawing,
  SquashStretch,
  Staging,
  StraightAheadActionAndPoseToPose,
  Timing,
  Tone,
  Workouts,
} from "@/components/mdx";
import { Video } from "./components/media";

const components: MDXComponents = {
  img: (props) => <Image {...props} />,
  video: (props) => <Video loop {...props} />,
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
  Workouts,
  Caret,
  FamilyWallet,
  Nature,
  Tone,
  Dialogs,
  Conversions,
};

export function getMDXComponents(): MDXComponents {
  return {
    ...components,
  };
}
