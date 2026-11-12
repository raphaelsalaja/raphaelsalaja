# Apple Motion Ledger

Every number behind `@web-kits/springboard` and the post, where it came from and how well it holds.

- **Read** means read from shipped code with REA, with its Evidence ID.
- **Settings** means read from the live `PTSettings` tree in the Simulator's SpringBoard (`ios/sbhook.m`, `settings.jsonl`).
- **Observed** means sampled from presentation layers while the animation ran (`ios/sbhook.m`, 120 Hz) or from Apple's own API (`sample.swift`).
- **Guess** means none of the above. The post labels these.

The SpringBoard records and every open question are in `evidence.json` (`export_evidence_bundle`). Fixtures in `content/work/apple/fixtures` hold the observed series, and `fixtures.py` rebuilds them from the captures. The package keeps a copy in `src/fixtures` for its parity tests.

## Targets

| Binary                                | Build  | SHA-256                                                            |
| ------------------------------------- | ------ | ------------------------------------------------------------------ |
| SpringBoard (iOS 27.0 Simulator)      | 24A434 | `7fdfe20b9b178bf853d46d776ff87ec9e722c36dee7820d79c285722eca9c5d7` |
| SpringBoardHome (iOS 27.0 Simulator)  | 24A434 | `39f0710cfe78f3b8f831a444b66ea3a5ed5f50ccf9e9b0b39464fda4ae85806e` |
| UIKitCore (iOS 27.0 Simulator)        | 24A434 | `5cefe8cfb213b0dfcb378feb86ddd9062fda37fb4f331b3ceb782070a20292a4` |
| Dock (macOS 27.0.1)                   | 26A434 | `b704affba65f732ffd6676c3bb22c94abc737ee73af8bdf29a5ef02650cde33e` |
| SwiftUI and QuartzCore (macOS 27.0.1) | 26A434 | Sampled through their public API, not disassembled                 |

The Simulator screen is 402 × 874 pt with a display corner radius of 62 pt.

## Springs

| Value                                                                                                                                                   | Source                                                                                                         | Evidence                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| stiffness = (2π / response)², damping = 4πζ / response, mass 1                                                                                          | Read, UIKitCore `_convertDampingRatio`                                                                         | `ev_ba0de7be…`                 |
| bounce ≥ 0: ζ = 1 − bounce; bounce < 0: ζ = 1 / (1 + bounce)                                                                                            | Read, UIKitCore `_convertBounce`; observed in SwiftUI (`Spring(duration: 0.5, bounce: -0.3)` reports ζ 1.4286) | `ev_ba0de7be…`, `swiftui.json` |
| `Spring.value` is the closed-form damped step for response and ζ                                                                                        | Observed, 12 springs × 181 samples, within 1e-10                                                               | `swiftui.json`                 |
| `Spring.velocity` for an overdamped spring returns the velocity plus the target after t = 0; its positions are right                                    | Observed                                                                                                       | `swiftui.json`                 |
| `UnitCurve` evaluates in 32-bit floats (about 6e-7 off a 64-bit solve)                                                                                  | Observed                                                                                                       | `swiftui.json`                 |
| Core Animation never overdamps: m 3, k 1000, c 500 (ζ 4.56 on paper) moves as response 2π√(m/k) = 0.3441, ζ 1                                           | Observed, SwiftUI `Spring(mass:stiffness:damping:)` and UIKit sheet                                            | `swiftui.json`, `uikit.json`   |
| SwiftUI presets: `.smooth` and `Spring()` 0.5/1, `.snappy` 0.5/0.85, `.bouncy` 0.5/0.7, `.spring` 0.5/1, `.interactiveSpring` 0.15/0.85 with blend 0.25 | Observed, `Animation` descriptions                                                                             | `swiftui.json`                 |
| `extraBounce` adds to the preset's bounce                                                                                                               | Observed                                                                                                       | `swiftui.json`                 |
| `Animation.easeInOut` is a 0.35 s cubic (0.42, 0, 0.58, 1)                                                                                              | Observed                                                                                                       | `swiftui.json`                 |
| `UIView.animate(withDuration:)` is a `CABasicAnimation` with (0.42, 0, 0.58, 1)                                                                         | Observed                                                                                                       | `uikit.json`                   |
| `usingSpringWithDamping: 0.8` at 0.5 s gives k 323.59, c 28.78: ω solves e^(−ζωT) = 0.00075                                                             | Observed; solver blocks read in `_parametersOfSpringAnimation`                                                 | `ev_2183dd69…`, `uikit.json`   |
| `usingSpringWithDamping: 1` / `UISpringTimingParameters(dampingRatio: 1)` at 0.5 s gives k 341.02, c 36.93: ω solves (1 + ωT)e^(−ωT) = 0.001            | Observed                                                                                                       | `uikit.json`                   |
| `springDuration: 0.5, bounce: 0` gives k 157.91, c 25.13, CA duration 0.7349; bounce 0.3 gives c 17.59, CA duration 0.8630                              | Observed                                                                                                       | `uikit.json`                   |
| `UISpringTimingParameters()` is m 3, k 1000, c 500 and ignores the given duration                                                                       | Observed                                                                                                       | `uikit.json`                   |
| SpringBoard drives "fluid" springs (response, ζ, tracking response 0.15, tracking ζ 0.86) per frame rather than as `CAAnimation`s                       | Settings, observed                                                                                             | `settings.jsonl`               |
| A fluid spring's `retargetImpulse` 0.02 starts it with velocity impulse × ω² (8.77 per second for 0.3/1)                                                | Observed, navigation push fits with RMS error 0.0003                                                           | `uikit.json`                   |

## Curves

| Value                                                                                                                              | Source   | Evidence       |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| `kCAMediaTimingFunctionDefault` (0.25, 0.1, 0.25, 1) = CSS `ease`                                                                  | Observed | `swiftui.json` |
| `easeIn` (0.42, 0, 1, 1), `easeOut` (0, 0, 0.58, 1), `easeInEaseOut` (0.42, 0, 0.58, 1) = CSS `ease-in`, `ease-out`, `ease-in-out` | Observed | `swiftui.json` |
| `UnitCurve.circularEaseIn` = 1 − √(1 − t²) and its mirrors                                                                         | Observed | `swiftui.json` |

## Gesture Physics

| Value                                                                                                                              | Source                                                                                    | Evidence                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------- |
| Rubber band: offset = (1 − 1 / (x · c / d + 1)) · d, c = 0.55, d = the view's dimension                                            | Read, `_rubberBandOffsetWithoutDecorationForOffset:…`; observed, 158 samples within 2e-13 | `uikit.json`                 |
| `_currentRubberBandCoefficient` 0.55                                                                                               | Observed                                                                                  | `uikit.json`                 |
| Deceleration rates: normal 0.998, fast 0.99 per millisecond                                                                        | Read, UIKitCore standard deceleration; observed                                           | `ev_bedcdc14…`, `uikit.json` |
| Each step: offset += v · r · (1 − r^dt) / (1 − r), v ·= r^dt; the total is the WWDC projection v / 1000 · r / (1 − r)              | Read                                                                                      | `ev_bedcdc14…`               |
| Navigation edge flick: boost threshold 1.5, boost factor 4.25, rubber band extent 0.5                                              | Settings, `_UIFluidParallaxTransitionSettings`                                            | `settings.jsonl`             |
| Home gesture zoom down: velocity multipliers 1.2 (x position), 0.7 (y layout), between 1000–4000 pt/s in x and 3000–5000 pt/s in y | Settings, `SBFluidSwitcherAnimationSettings`                                              | `settings.jsonl`             |

## App Open and Close

Settings icon at {308, 391, 64, 64}, icon corner radius 16.64 pt.

| Value                                                                                                                                                                                                                        | Source                                                            | Evidence                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Card scale, size and centre share one spring, `genieFullScreenCenterRowZoomUpSettings` 0.24/1                                                                                                                                | Settings; observed, free fit 0.237/1.01, RMS error 0.0004         | `springboard.json`                                                    |
| Home screen scales 1 → 0.88 (`homeScreenScaleInApplication`) on `homeScreenScaleSettings` 0.7/0.88                                                                                                                           | Settings; observed, RMS error 1% of the move on the setting       | `springboard.json`                                                    |
| Close: card on `iconZoomDownSettings` 0.336/1                                                                                                                                                                                | Settings; observed, free fit 0.336/1.00, RMS error 0.0003         | `springboard.json`                                                    |
| Close: home screen 0.88 → 1 on 0.7/0.88                                                                                                                                                                                      | Settings; observed, RMS error 0.02% of the move                   | `springboard.json`                                                    |
| Corner radius heads for half the window's shorter side (201 pt) until `_hasResetCornerRadius`, then to the display's radius when opening, or the icon's radius over the card's scale when closing                            | Read, `cornerRadiiForIndex:`                                      | `ev_d437b376fa265e6ff97816be60518b4e992a51c4ab07c6d6e2287fc0d91331de` |
| `_hasResetCornerRadius` is set by the `kSBFullScreenToHomeCornerRadiusDelayReason` timer                                                                                                                                     | Read, `handleTimerEvent:`                                         | `ev_7170fac6bc05c2a5b8b33b78e7827cd2114f704b0ae48a690524bcd8976e5cc1` |
| Reset delays: `genieCornerRadiusToAppResetDelay` 0.06 s, `genieCornerRadiusToHomeResetDelay` 0.12 s                                                                                                                          | Settings                                                          | `settings.jsonl`                                                      |
| Open radius: 0.24/1 spring, retargeted 10 ms after the card first moves, RMS error 0.19 pt free, 0.38 pt through `createAppTransition`                                                                                       | Observed (`fit_radius.py`, `parity.test.ts`)                      | `springboard.json`                                                    |
| Close radius: 0.336/1 spring, retargeted after 0.125 s, RMS error 0.5 pt                                                                                                                                                     | Observed                                                          | `springboard.json`                                                    |
| Windowed apps (iPad) zoom up on 0.384/0.85                                                                                                                                                                                   | Settings                                                          | `settings.jsonl`                                                      |
| Home gesture zoom up: centre row 0.3/1.1, edge row 0.34/1.1; zoom down: scale 0.55/0.84, position 0.45 to 0.55                                                                                                               | Settings                                                          | `settings.jsonl`                                                      |
| The card is drawn through `SBSwitcherGenieEffectView`: a 3×3 `CAMutableMeshTransform`, one `UIViewFloatAnimatableProperty` per vertex coordinate, rebuilt every frame                                                        | Observed (hook on `_performGenieWithAttributes:mode:completion:`) | `animations-genie.jsonl`                                              |
| `SBSwitcherGenieAttributes` on iPhone: `genieScale` 0.4, `multiplier` (0.5, 0.5), `minimizedProgress` (icon left / width, 0.5); `genieAmount` y = 2 · icon centre / height − 1, × 0.75 when negative, x always 0             | Observed, three icons                                             | `animations-genie.jsonl`                                              |
| Row response = layout response × lerp(1 + g · 0.5, 1 − g · 0.5, w), g = −amount opening and +amount closing, w = √row when amount ≥ 0 and 1 − √(1 − row) otherwise; matches all 18 logged row springs to 4 decimals          | Observed (`genieSpring`), `parity.test.ts`                        | `genie.json`                                                          |
| Mesh: vertices scaled from the centre vertex by K = lerp(minimizedScale, 1, p) / scale, shifted by 0.6 · (0.5 − icon left / width) · (K − 1) / 1.5, over the cropped layer; RMS error 0.03 pt, worst 0.21 pt over 143 frames | Observed, `parity.test.ts`                                        | `genie.json`                                                          |
| Core Animation fills a mesh as a uniform cubic B-spline with reflected edge vertices: a middle edge vertex pulled 0.15 draws at 0.101                                                                                        | Observed (`meshtest`), inference                                  | `meshtest.json`, `meshtest.png`                                       |

## Reduce Motion

| Value                                                                                                          | Source                                        | Evidence                                 |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| No zoom and no home screen scale; the app crossfades in                                                        | Observed                                      | `animations-rm1.jsonl`                   |
| Crossfade is a 0.3 s `CABasicAnimation` on opacity with (0.42, 0, 0.58, 1), starting about 87 ms after the tap | Observed; `reduceMotionCrossfadeDuration` 0.3 | `animations-rm1.jsonl`, `settings.jsonl` |
| `reduceMotionTriggerDelay` 0.15 s, `reduceMotionAppToSwitcherSettings` 0.4248/1                                | Settings                                      | `settings.jsonl`                         |

## UIKit Transitions

| Value                                                                                                                              | Source                                                      | Evidence         |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------- |
| Push: incoming screen 402 → 0, outgoing 0 → −121 (0.3 × width), parallax dimming 0 → 1                                             | Observed                                                    | `uikit.json`     |
| Push spring `noninteractiveSpring` 0.3/1 with `retargetImpulse` 0.02                                                               | Settings; observed with RMS error 0.0003                    | `uikit.json`     |
| Interactive push and pop track on 0.3/0.85                                                                                         | Settings                                                    | `settings.jsonl` |
| Pop: 0.3/1 fits with RMS error 0.004 to 0.008                                                                                      | Observed                                                    | `uikit.json`     |
| Sheet: `CASpringAnimation` m 3, k 1000, c 500 (moves as 0.344/1) on position, dimming and shadow; top settles at y 62              | Observed, fit 0.342/1.00, RMS error 0.0003; dismiss 0.345/1 | `uikit.json`     |
| Zoom spec: general, morph, position and transform 0.4/1; corner radius 0.35/1                                                      | Settings, `_UIZoomTransitionAnimationSpec`                  | `settings.jsonl` |
| Zoom: background recedes by 34.667 pt (scale 0.9138 at 402 pt, min 0.8), dims to 0.15; platter shadow 0.4 opacity, 40 radius, y 10 | Settings, `_UIZoomTransitionSpec`; recede observed          | `uikit.json`     |
| Zoom background recede fits 0.35/1 with v0 7.5 per second (RMS error 0.0014)                                                       | Observed                                                    | `uikit.json`     |

## Folders

| Value                                                                                                                                         | Source                                                   | Evidence         |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------- |
| Open: central spring m 1, k 341.51, c 36.96 (0.34/1); crossfade 0.125 s; icon grid fade 0.3 s; inner fade 0.3 s after 0.1 s; outer fade 0.4 s | Settings, `SBHFolderOpenSettings`                        | `settings.jsonl` |
| Close: same central spring; crossfade m 2.5, k 2000, c 500 (moves as 0.222/1); inner fade 0.2 s; outer fade 0.3 s after 0.15 s                | Settings, `SBHFolderCloseSettings`                       | `settings.jsonl` |
| Folder and icon zoom: m 2, k 700, c 600 (moves as 0.336/1)                                                                                    | Settings, `SBHFolderZoomSettings`, `SBHIconZoomSettings` | `settings.jsonl` |
| Fade curves 0, 65536, 65537 and 131072 are `UIViewAnimationOptions` curve bits: ease in out, ease in, ease in (with layout), ease out         | Inference from the bit layout                            |                  |

## macOS Dock

| Value                                                                                                        | Source | Evidence                                                       |
| ------------------------------------------------------------------------------------------------------------ | ------ | -------------------------------------------------------------- |
| Bounce timing is read through Swift accessors on `bounce-secondary-duration` and `bounce-secondary-interval` | Read   | `ev_40908ae6…`, `ev_5b6a1f7a…`, `ev_133d84b1…`, `ev_6dc8ced9…` |
| Bounce height, duration and count                                                                            | Guess  |                                                                |

## Open Questions

Each is recorded with `record_unknown` and exported in `evidence.json`.

- `unk_288a1949…`: why the open's corner radius resets 10 ms after the card first moves when the setting says 60 ms. The card's first frame lags the transition start by about 50 ms in the Simulator, which would account for it.
- `unk_c93d53fe…`: which spring the zoom transition really runs. The spec reads 0.4/1; the recede fits 0.35/1 with an initial velocity.
- `unk_ac6591bd…`: why the pop fits 0.3/1 less tightly than the push.
- `unk_c8635bea…`: folder motion was read from settings but not sampled running.
- `unk_93cc1d7e…`: the Dock bounce timings. The post's bounce is a guess.
- `unk_c94bacf0…`: how SwiftUI computes `settlingDuration`. The library uses its own threshold instead.
- UIKit's legacy duration solver is ported for ζ ≤ 1 only; the overdamped branch of `_parametersOfSpringAnimation` was not followed.
