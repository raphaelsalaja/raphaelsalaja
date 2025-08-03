import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";
import FigCaption, { type FigCaptionProps } from "@/components/codeblock";
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
  PolarSupport,
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
import Stage from "@/components/stage";

const components: MDXComponents = {
  figcaption: (props: FigCaptionProps) => <FigCaption {...props} />,
  img: (props) => <Image {...props} />,
  SquashStretch,
  Anticipation,
  Arcs,
  Exaggeration,
  FollowThroughAndOverlappingAction,
  PolarSupport,
  SecondaryAction,
  SlowInSlowOut,
  SolidDrawing,
  Staging,
  StraightAheadActionAndPoseToPose,
  Timing,
  Appeal,
  Stage,
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
