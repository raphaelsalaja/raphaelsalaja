# Progressive Blur Ledger

Every number behind `@web-kits/blur` and the progressive blur post, where it came from and how well it holds.

- **Tree** means read from the live layer tree in the Simulator or a macOS app (`blurhook.m`, `out/<run>/tree.json`), including `CAFilter` inputs found by archiving each filter.
- **Fitted** means fitted to screenshots of 60-point black and white bars, or the same columns in seven saturated colours (`fit.py`, `probe.py`, `model.py`, `veil.py`, `web.py`).
- **Observed** means seen in a capture or a browser without a fit.
- **Guess** means none of the above. The post labels these.

`Harness.swift` builds a tab bar app with a "Library" navigation stack over the bars. `run.sh soft` and `run.sh hard` set the scroll edge style, `CHROME=bare` drops the title and toolbar, `SCHEME=dark` and `CONTENT=colour` switch the scheme and the columns, `ABLATE=<layer>` knocks one layer out and `PROBE=<specs>` swaps the screen for strips of `CABackdropLayer`s with filters I build myself. `Mac.swift` and `mac.sh` do the same for a `NavigationSplitView` on macOS.

## Targets

| Target             | Build                                                 |
| ------------------ | ----------------------------------------------------- |
| iOS 27.0 Simulator | 24A434, iPhone 18 Pro, 402 × 874 pt at 3 px per point |
| macOS 27.2         | 26B123                                                |
| Xcode              | 27.2 (27B52)                                          |
| Safari             | iOS 27.0 Simulator                                    |
| Chromium           | 150.0.7871.250, in Electron 43.8.4                    |

## The Soft Edge on iOS

`ScrollEdgeEffectView`, style "v8: soft", light mode, `out/soft-bare` unless noted.

| Value                                                                                                                                                   | Source | Evidence                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------- |
| Three layers per edge: a capture-only `BackdropView` of what's behind the scroll view, a Replay of it and a Pocket over the content                     | Tree   | `out/soft-bare/tree.json`               |
| The backdrop captures at `scale` 0.25 with `gaussianBlur` `inputRadius` 16                                                                              | Tree   | `backgroundGroup` layers                |
| Replay draws that capture at opacity 0.5 (0.6 in dark mode), masked `destIn` by the same curve as the Pocket                                            | Tree   | `out/soft-bare`, `out/soft-dark`        |
| Over white, Replay's opacity down the edge is 0.5 × the mask to within 0.003                                                                            | Fitted | `out/soft-off-Pocket`, `out/model.json` |
| The Pocket is a `CABackdropLayer` at `scale` 0.5 with `variableBlur`: `inputRadius` 1.5, `inputFade` true, `inputNormalizeEdges` true                   | Tree   | `ScrollPocket.LumaTracker`              |
| Its hidden inputs: `inputBlurFillBlurRadius` 16, `inputBlurFillNormalOpacity` 0.25, `inputBlurFillLightenOpacity` 0.6, `inputBlurFillDarkenOpacity` 0.4 | Tree   | archived keys of the filter             |
| Dark mode: normal 0, lighten 0.4, darken 0.6                                                                                                            | Tree   | `out/soft-dark`                         |
| The edge is 102 pt with only the status bar (62 pt) and 156 pt under a navigation bar: the bar's bottom plus 40                                         | Tree   | `out/soft-bare`, `out/soft`             |
| The bottom edge over the tab bar is 120 pt, 754 to 874                                                                                                  | Tree   | `out/soft-bare`                         |
| The top mask holds at 1 to 0.34 of the height and reaches 0 at 0.97                                                                                     | Tree   | `mask-00.png`, `ramps.json`             |
| The bottom mask starts falling straight away from the bar and reaches 0 at 0.954                                                                        | Tree   | `mask-02.png`                           |
| The fall, at 11 even steps: 1, 0.9804, 0.9239, 0.829, 0.6957, 0.5373, 0.3749, 0.2259, 0.1114, 0.0361, 0                                                 | Tree   | `mask-00.png`                           |
| That fall is close to `cubic-bezier(0.429, 0.007, 0.591, 0.925)`                                                                                        | Fitted | `mask-00.png`                           |
| The mask image's size doesn't change the result                                                                                                         | Fitted | `out/probe-mask`                        |

## Filter Units

| Value                                                                                                                                                                                           | Source | Evidence                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `gaussianBlur`'s `inputRadius` is the Gaussian's standard deviation in points, the same as CSS `blur()`                                                                                         | Fitted | `out/probe`                                                                                                 |
| `variableBlur`'s `inputRadius` of 1.5 gives σ 2.88 pt where the mask is 1                                                                                                                       | Fitted | `out/sharp.json`                                                                                            |
| Its σ doesn't follow the mask in proportion. Down the fall it's 2.56, 2.27, 1.95, 1.61, 1.42, 1.26, 1.08, 0.84, 0.6 pt at masks 0.9 to 0.1, still 0.5 at 0.05 and 0.37 at 0.025                 | Fitted | `veil.py fit`, one table for all five runs                                                                  |
| That table also fits the run with Replay hidden: rms 0.0062 against 0.0107 for 3.24 × the mask, so it doesn't come from the veil. The 3.24 pt I first had was a straight line forced through it | Fitted | `out/soft-off-Replay`                                                                                       |
| A guess at why it holds near half a point: the Pocket renders at `scale` 0.5, and resampling a half-size backdrop blurs a little wherever the filter runs                                       | Guess  |                                                                                                             |
| Its fill radius is 1.85 × σ per unit: 16 gives σ 29.6 pt                                                                                                                                        | Fitted | `out/model.json`, kb 1.850                                                                                  |
| With `inputFade` on, all three fill opacities scale with the mask                                                                                                                               | Fitted | `model.py`, Replay off: rms 0.0229 with the fade, 0.1052 without                                            |
| The blends happen in sRGB values, not linear light                                                                                                                                              | Fitted | `fit.py`: sRGB fits better on 43 of 50 top rows (median rms 0.0038 against 0.0187) and 54 of 85 bottom rows |

## The Recipe

What the package draws, from the values above.

| Value                                                                                                                                                                                                    | Source | Evidence                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------- |
| First the background over the content at 0.5 m (0.6 m in dark mode), m being the mask. Replay draws before the Pocket in the tree, so the Pocket blurs the veil too                                      | Tree   | `tree.json`, Replay at 31 and Pocket at 33 in drawing order |
| V is that blurred by the table above at m, B is it blurred by 29.6 pt                                                                                                                                    | Fitted | `veil.py`                                                   |
| N = V + 0.25 m (B − V), L = N + 0.6 m max(0, B − N), D = L − 0.4 m max(0, L − B)                                                                                                                         | Fitted | `model.py`                                                  |
| The veil under the blurs matters because the wide blur smears its fade down the edge. With it on top, as I first had it, the model ran 0.0172 rms against the bare edge. Under, 0.0096, before the table | Fitted | `veil.py`                                                   |
| With the table, against each capture (rms, 0 to 1): bare 0.0054, navigation bar 0.0060, dark 0.0052, colour 0.0039, colour in dark mode 0.0033                                                           | Fitted | `veil.py`                                                   |

## The Web

Captures of `@web-kits/blur` 0.1.0 at 402 pt on the test page, which copies the Harness columns, scored row by row in RGB against the matching Simulator run with the status bar, back button, title and button glyphs left out (`web.py`). Chromium's CDP screenshots come back in Display P3 without a profile, so `web.py` converts them to sRGB first. The stripes then read back within 2 of 255.

| Value                                                                                                                                                                                                             | Source   | Evidence                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------- |
| WebKit applies `mix-blend-mode` lighten and darken to a `backdrop-filter` layer's output. Chromium ignores it                                                                                                     | Observed | `/tmp/blurtest/index.html`, `safari.png`      |
| Chromium takes an SVG filter in `backdrop-filter: url(#…)`                                                                                                                                                        | Observed | `out/web/chromium-bars.json`                  |
| Safari (rms): bare 0.0064, navigation bar 0.0074, dark 0.0084, colour 0.0041, colour in dark mode 0.0043. Worst pixel 0.15                                                                                        | Fitted   | `out/web/safari-*.png`                        |
| Chromium (rms): bare 0.0089, navigation bar 0.0080, dark 0.0056, colour 0.0312, colour in dark mode 0.0187. Worst pixel 0.15                                                                                      | Fitted   | `out/web/chromium-*.json`                     |
| Chromium, `"plain"`, bare: 0.0162                                                                                                                                                                                 | Fitted   | `out/web/chromium-plain.json`                 |
| Before the veil moved under the blurs and the table replaced 3.24 × m: Chromium 0.0186 and Safari 0.0202 on the bare edge                                                                                         | Fitted   | captures of the old build, since replaced     |
| Chromium blurs and blends in the display's colour space. On this P3 display, `veil.py`'s model run in P3 values matches Chromium's colour capture to 0.0052, and run in sRGB to 0.0325. On the bars the two agree | Fitted   | `out/web/chromium-colour.json`                |
| Simulator Safari composites in sRGB, like iOS                                                                                                                                                                     | Fitted   | `out/web/safari-colour.png`                   |
| Four stacked layers for the variable blur rather than three: Chromium 0.0098 to 0.0089 bare, 0.0094 to 0.0080 under the bar, 0.0069 to 0.0056 dark; Safari 0.0075 to 0.0064, 0.0088 to 0.0074, 0.0094 to 0.0084   | Fitted   | three-layer and four-layer builds, same pages |
| In Simulator Safari, three and four layers both hold 60 fps with the columns moving under them, at 102 pt and at full screen, light and dark, bars and colour                                                     | Observed | `bench()` in the test page                    |

## What Doesn't Fit

| Value                                                                                                                                                       | Source | Evidence       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------- |
| Chromium in light mode runs about 0.01 dark from 51 to 85 pt on the bare edge. Safari doesn't, and neither does Chromium in dark mode. I haven't found why  | Fitted | `web.py` bands |
| Safari in dark mode runs about 0.007 bright over the top 51 pt. Chromium in dark mode doesn't. I haven't found why either                                   | Fitted | `web.py` bands |
| Even the model leaves 0.003 to 0.006 against Apple, highest in the last third of the edge                                                                   | Fitted | `veil.py`      |
| Saturated colours in Chromium on a P3 display, as above. A page can't choose the space Chromium composites in                                               | Fitted |                |
| Frame cost on a phone. The Simulator draws on the Mac's GPU, and Chromium's tab was throttled in the background, so neither number says much about a device | Guess  |                |

## The Hard Edge on iOS

`out/hard-bare`.

| Value                                                                                                                    | Source | Evidence                     |
| ------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------- |
| The Pocket covers only the status bar, 62 pt, and the tab bar's 93 pt                                                    | Tree   | `tree.json`                  |
| `variableBlur` with `inputFade` false, `inputRadius` 2 at the top and 2.443 at the bottom, the same fill weights as soft | Tree   | `tree.json`                  |
| Its mask is a flat 0.886 at the top and 0.663 to 0.886 at the bottom, so it never fades to nothing                       | Tree   | `mask-00.png`, `mask-02.png` |
| Then a `colorMatrix` that lifts saturation (1.197, 1.071, 1.232 on the diagonal, +0.03 offset) and `sdrNormalize`        | Tree   | `tree.json`                  |
| Replay at 0.5 with no mask                                                                                               | Tree   | `tree.json`                  |

## macOS

`out/mac-soft`, a `NavigationSplitView` with a toolbar. Read from the tree only, not fitted to pixels.

| Value                                                                                                                                | Source | Evidence      |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------------- |
| The toolbar edge is 52 pt over the detail column, with the same backdrop, Replay at 0.5 and `variableBlur` with the iOS fill weights | Tree   | `tree.json`   |
| Its `inputRadius` is 2 and `inputFade` is false, like the hard edge on iOS                                                           | Tree   | `tree.json`   |
| Its mask runs from 0.886 at the bar to 0.663 at the far side                                                                         | Tree   | `mask-01.png` |
| Replay adds a `colorMatrix` that desaturates (0.803, 0.929, 0.768 on the diagonal)                                                   | Tree   | `tree.json`   |
| The sidebar edge is `variableBlur` `inputRadius` 1 with every fill weight at 0: a blur, no fill                                      | Tree   | `tree.json`   |
| Its mask is in the alpha channel: 0 to about a quarter of the way, then up to 1 by about 0.85                                        | Tree   | `mask-28.png` |

## apple.com

| Value                                                                                                                                    | Source   | Evidence             |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| No variable blur. The hero uses one `backdrop-filter: blur(20px)`, faded by a 100 px linear `mask-image`, with a colour gradient over it | Observed | live CSS, 8 Nov 2026 |

## Not Covered

Music, Photos and Maps, which used `variableBlur` before iOS 26, weren't opened in the Simulator. Firefox wasn't tested, so `"plain"` there is untested. Safari on macOS wasn't tested, so I don't know which space it composites in. Reduce Transparency wasn't measured.
