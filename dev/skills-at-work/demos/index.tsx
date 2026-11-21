import type { ComponentType } from "react";
import { BlueprintDemo } from "./blueprint";
import { BonesDemo } from "./bones";
import { CastDemo } from "./cast";
import { ChartsDemo } from "./charts";
import {
  AlignmentDemo,
  ColorDemo,
  DefaultsDemo,
  KeyboardDemo,
  MatchDemo,
  MotionDemo,
  VerifyDemo,
  ViewportsDemo,
} from "./checks";
import { ConsistencyDemo } from "./consistency";
import { EclipseDemo } from "./eclipse";
import { IslandDemo } from "./island";
import { PaletteDemo } from "./palette";
import {
  AvatarDemo,
  BotsDemo,
  DeconstructDemo,
  LabDemo,
  PrototypeDemo,
} from "./pieces";
import { PreviewDemo } from "./preview";
import {
  AuditSample,
  CopySample,
  FramesSample,
  GatherSample,
  IconsSample,
  ProseSample,
  RestraintSample,
  ReuseSample,
  RuleSample,
  ScopeSample,
  ShipSample,
} from "./samples";
import { SketchbookDemo } from "./sketchbook";
import { TickerDemo } from "./ticker";
import { TuneDemo } from "./tune";
import { WireframeDemo } from "./wireframe";

export const demos: Record<string, ComponentType> = {
  scope: ScopeSample,
  reuse: ReuseSample,
  restraint: RestraintSample,
  copy: CopySample,
  prose: ProseSample,
  defaults: DefaultsDemo,
  motion: MotionDemo,
  color: ColorDemo,
  verify: VerifyDemo,
  gather: GatherSample,
  match: MatchDemo,
  rule: RuleSample,
  viewports: ViewportsDemo,
  icons: IconsSample,
  ship: ShipSample,
  prototype: PrototypeDemo,
  lab: LabDemo,
  deconstruct: DeconstructDemo,
  alignment: AlignmentDemo,
  keyboard: KeyboardDemo,
  frames: FramesSample,
  avatar: AvatarDemo,
  bots: BotsDemo,
  sketchbook: SketchbookDemo,
  audit: AuditSample,
  tune: TuneDemo,
  cast: CastDemo,
  island: IslandDemo,
  blueprint: BlueprintDemo,
  bones: BonesDemo,
  palette: PaletteDemo,
  ticker: TickerDemo,
  eclipse: EclipseDemo,
  charts: ChartsDemo,
  preview: PreviewDemo,
  wireframe: WireframeDemo,
  consistency: ConsistencyDemo,
};
