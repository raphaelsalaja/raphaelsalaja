# Glass Menu Ledger

Every number behind `morph()` in `@web-kits/springboard` and the glass menu post, where it came from and how well it holds.

- **Read** means read from shipped code with REA, with its Evidence ID (`evidence.json`).
- **Settings** means read from the live `PTSettings` tree in the Simulator (`glasshook.m`, `settings.jsonl`).
- **Observed** means sampled from presentation layers while the morph ran (`glasshook.m`, 120 Hz display link) and fitted (`fit.py`, `fit_pulses.py`).
- **Guess** means none of the above. The post labels these.

`Harness.swift` builds three variants of one screen, a 56 × 46 pt glass "+" button with a four-row popover: `menu` (a native `Menu`), `after` (Kavsoft's order, `matchedTransitionSource` on the label) and `before` (on the button). `record.sh <variant>` opens and closes it with the hook sampling, `video.sh <variant>` records the screen, and `fixtures.py` writes the observed runs to `content/work/glass-menu/fixtures/glass.json` and the package's `src/fixtures/glass.json`.

## Targets

| Binary                            | Build  | SHA-256                                                            |
| --------------------------------- | ------ | ------------------------------------------------------------------ |
| AnimationKit (iOS 27.0 Simulator) | 24A434 | `65d767ee670863ed03c6b1827fe70859486f2669fa6fef60a92ce4a6e0606300` |
| UIKitCore and SwiftUI (iOS 27.0)  | 24A434 | Sampled through the presentation tree, not disassembled            |

The Simulator is an iPhone 18 Pro, 402 × 874 pt at 3 px per point, from Xcode 27.2. Its display link ran at about 60 Hz, so the 120 Hz sampler reads each frame about twice.

## Which Order Gets the Lens

| Value                                                                                                                                                                           | Source   | Evidence                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| `after` and `menu` run `_UILiquidMorphAnimation`: two `UIKit.MagicMorphView`s (popover and button), a `LiquidMorphAnimation.LensingLayer` and an `AnimationKit.LensingSDFLayer` | Observed | `out/after`, `out/menu` trees     |
| `before` runs one `MagicMorphView` from the button's rect to the popover's, with an `IntermediateShape` and no `LensingSDFLayer`                                                | Observed | `out/before/tree-open.txt`        |
| The pivot is what `matchedTransitionSource` marks: the 32 × 32 label in `after` (`SwiftUI.MatchedTransitionSourceMarkingView`), the whole 56 × 46 button in `menu`              | Observed | `PivotView` bounds in both trees  |
| `before` closes on `liquidMorph`'s 0.3 / 0.8 springs (RMS 0.001) and opens with each axis on its own spring (RMS 0.004 to 0.01)                                                 | Observed | `out/before`                      |
| The button's glass SDF collapses to 0 × 0 while the popover is open                                                                                                             | Observed | `SwiftUI.SDFLayer` in `out/after` |

## Settings

`AnimationKit.MorphAnimationSettings`, as the Simulator ships it.

| Value                                                                                                                           | Source   | Evidence                         |
| ------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------- |
| `mainEjectSpring` 0.5 / 0.75, `mainAbsorbSpring` 0.7 / 0.8                                                                      | Settings | `settings.jsonl`, `ev_f1b739c2…` |
| `blurInSpring` 0.3 / 1, `blurOutSpring` 0.45 / 0.8, `blurOutMinScale` 1.2, `blurOutMaxScale` 1.65                               | Settings | `settings.jsonl`                 |
| `speed` 0.7, `secondStepDelay` 0.03                                                                                             | Settings | `settings.jsonl`                 |
| `growingIntermediateShapeRatio` 0.25, `shrinkingIntermediateShapeRatio` 0.9                                                     | Settings | `settings.jsonl`                 |
| `jHeightRatio` 0.8, `jWidthRatio` 0, `maxJHeight` 200                                                                           | Settings | `settings.jsonl`                 |
| `lensingEnabled` true, `morphV2Enabled` true, `genieEnabled` false                                                              | Settings | `settings.jsonl`                 |
| `liquidMorph` spec: content, size, position and transform 0.3 / 0.8, kick 0.35 / 0.8, settle 0.5 / 0.8                          | Settings | `settings.jsonl`                 |
| `liquidMorphShrink` spec: content, size and position 0.3 / 0.9, transform 0.3 / 0.8                                             | Settings | `settings.jsonl`                 |
| `liquidMorphReduceMotion` spec: content, size and position 0.15 / 1                                                             | Settings | `settings.jsonl`                 |
| The pulses are named in pairs: "Kick ejectee" and "Unkick ejectee", "Kick source" and "Unkick source", "Lens on" and "Lens off" | Read     | `ev_f1b739c2…`                   |
| `MagicMorphAnimation.kickAmount` and `kickScale` are animatable properties                                                      | Read     | `ev_f1b739c2…`                   |

## The Morph

Kavsoft's order, `out/after-clean`. Times are from the toggle; p is the main spring's progress.

| Value                                                                                                                                       | Source   | Evidence                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------- |
| No `CAAnimation` moves it: `UIViewInProcessLayerAnimationCoordinator` writes the layers every frame                                         | Observed | `animations.jsonl`                       |
| Opening, everything is on one spring: `mainEjectSpring` × 0.7 = 0.35 / 0.75, RMS 0.0006, from 75.6 ms                                       | Observed | `out/after-clean/fit.json`               |
| Closing, the same on `mainAbsorbSpring` × 0.7 = 0.49 / 0.8, RMS 0.0001, from 32 ms                                                          | Observed | `out/after-clean/fit.json`               |
| The popover's bounds go from its width squared to its own height, linearly in p: (W, W) to (W, H)                                           | Observed | `out/after`, `out/after-2rows`           |
| Its scale goes from s₀ to 1, s₀ = half the pivot's shorter side over max(W, H): 16 / 220 for the label, 23 / 250 for the menu's button      | Observed | labels 20, 32, 48; heights 124, 172, 220 |
| Its centre goes from the pivot's centre (342.33, 785.33) to the popover's, and overshoots to scale 1.028 at about 360 ms                    | Observed | `out/after`                              |
| The button scales from 1 to 0.25 on p and drifts a quarter of the way to the popover's centre: (342, 785) to (335, 771)                     | Observed | `out/after`, `out/menu`                  |
| Opening, the button's bounds square up from 56 × 46 to 46 × 46 on `blurInSpring` × 0.7 = 0.21 / 1 (RMS 0.0001); closing, on the main spring | Observed | `out/after`                              |
| Incoming content: opacity p, blur 4 × (1 − opacity) pt. Outgoing: the mirror                                                                | Observed | `MagicMorphTransformLayer` filters       |
| `_UIReparentingView`'s `opacityPair` fades on about 0.2 / 1                                                                                 | Observed | `fit.json`                               |
| The popover's corner at rest is continuous, 34 pt (`_UIPopoverView._customCornerRadius`); the button is a capsule, radius 23                | Observed | `out/after-black.radius.json`            |

## The Pulses

Each is fitted as `amount × (step(t − on) − step(t − off))` on its own spring (`fit_pulses.py`). On and off are from the toggle.

| Pulse                   | Run   | Amount | On      | Off      | Spring        | Peak  | RMS  |
| ----------------------- | ----- | ------ | ------- | -------- | ------------- | ----- | ---- |
| Kick ejectee (y)        | open  | −38.05 | 82.3 ms | 163.4 ms | 0.34 / 0.70   | −23.5 | 0.10 |
| Kick ejectee (y)        | close | −89.74 | 26.3 ms | 63.5 ms  | 0.328 / 0.855 | −25.1 | 0.16 |
| Kick source (y)         | close | 15.17  | 51.4 ms | 168.4 ms | 0.494 / 0.766 | 8.9   | 0.05 |
| Lens displacement       | open  | −67.74 | 75.0 ms | 162.2 ms | 0.421 / 1     | −30.3 | 0.04 |
| Lens displacement       | close | −8.53  | 39.7 ms | 117.3 ms | 0.281 / 0.993 | −4.9  | 0.02 |
| Lens blur               | open  | 4.78   | 68.3 ms | 157.9 ms | 0.311 / 0.825 | 3.1   | 0.03 |
| Lens blur               | close | 4.82   | 24.8 ms | 108.2 ms | 0.312 / 0.821 | 3.0   | 0.02 |
| SDF blur, clamped at 20 | open  | 10 000 | 79.7 ms | 80.5 ms  | 0.663 / 0.852 | 20    | 0.31 |
| SDF blur, clamped at 20 | close | 374.8  | 29.8 ms | 40.2 ms  | 0.441 / 0.978 | 20    | 0.09 |

| Value                                                                                                                         | Source   | Evidence      |
| ----------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| The kicks are vertical only: the `KickView`s' x translation is 0 in every run                                                 | Observed | all runs      |
| The native menu's lens runs on the same springs: displacement 0.42 / 1 opening and 0.28 / 1 closing, blur 0.31 / 0.81 to 0.82 | Observed | `out/menu`    |
| The menu's amounts and windows differ: its kick peaks at −34 opening and −46.5 closing                                        | Observed | `out/menu`    |
| The SDF blur's open fit is a velocity kick (a 0.8 ms window); `LensingSDFLayer.gaussianRadius` never reads above 20           | Observed | `pulses.json` |

## The Port

| Value                                                                                                                                                                               | Source   | Evidence                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------- |
| `createMorph` against the recorded runs: both shapes within 0.24 pt RMS opening and 0.72 pt closing (the closing kick), opacity 0.0006, lens 0.08, lens blur 0.10, SDF blur 0.31 pt | Observed | `parity.test.ts`          |
| Pulses that start before the main spring on iOS (by 0.6 to 7.3 ms) start with it and keep their length                                                                              | Guess    |                           |
| Kicks scale with the popover's vertical travel over the measured 55.33 pt, clamped to ±2. The menu would predict −30 opening (observed −34) and −32 closing (−46.5)                 | Guess    | one geometry              |
| The popover's corner goes from half its box's shorter side (round) to its own radius, linearly in p                                                                                 | Guess    | the clip and video frames |
| The popover's content sits centred in its growing box                                                                                                                               | Guess    |                           |
| The label stays on the button at its own size, hidden only as far as the popover's content covers it; the popover never carries an enlarged copy                                    | Guess    | `after.mp4` frames        |
| The SDF blur is drawn as a gooey filter: a Gaussian of half the radius, cut at alpha 0.46                                                                                           | Guess    |                           |
| The lens's map pushes along a squircle's normal, rising from 55% of the way out to the rim; its scale is −displacement in CSS pixels                                                | Guess    |                           |
| The glass is the popup's background colour, inset hairline and widest shadow, read from its computed style, without a backdrop blur                                                 | Guess    |                           |
| Reduced motion fades on `liquidMorphReduceMotion`'s 0.15 / 1 content spring rather than morphing                                                                                    | Guess    | the package's convention  |

## Open Questions

- What sets the kick's amount and window. `jHeightRatio`, `maxJHeight` and the `kickScale` property are the candidates.
- The law behind the SDF blur's rise, hold and fall, which the clamp hides.
- What the lens's displacement map is made from, which the hook can't read.
