export type Sound = "click" | "tap";

const CLICK =
  "button, summary, [role='button'], [role='switch'], [role='tab'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='checkbox'], [role='radio']";

const PRESS = `${CLICK}, a[href], [role='link']`;

let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let output: AudioNode | null = null;

export function controlFor(
  target: EventTarget | null,
): { kind: Sound; control: Element } | null {
  const node =
    target instanceof Element
      ? target
      : target instanceof Node
        ? target.parentElement
        : null;

  if (!node) return null;
  if (node.closest("input, textarea, select, [contenteditable='true']")) {
    return null;
  }

  const control = node.closest(PRESS);
  if (!control || control.matches(":disabled, [aria-disabled='true']")) {
    return null;
  }

  return {
    kind: control.matches(CLICK) ? "click" : "tap",
    control,
  };
}

export function play(kind: Sound) {
  try {
    const ctx = audio();
    if (!ctx) return;
    if (kind === "click") playClick(ctx);
    else playTap(ctx);
  } catch {
    // A failed sound should never block the press that triggered it.
  }
}

function audio() {
  const Audio = window.AudioContext;
  if (!Audio) return null;

  try {
    context ??= new Audio({ latencyHint: "interactive" });
    if (context.state === "suspended") void context.resume();
    return context;
  } catch {
    return null;
  }
}

function noiseBuffer(ctx: AudioContext) {
  if (noise?.sampleRate === ctx.sampleRate) return noise;

  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return noise;
}

function destination(ctx: AudioContext) {
  if (output?.context === ctx) return output;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 6800;
  filter.Q.value = 0.5;

  const gain = ctx.createGain();
  gain.gain.value = 0.9;

  filter.connect(gain);
  gain.connect(ctx.destination);
  output = filter;
  return filter;
}

function tone(
  ctx: AudioContext,
  dest: AudioNode,
  from: number,
  to: number,
  peak: number,
  seconds: number,
  type: OscillatorType,
) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + seconds);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);

  osc.connect(gain);
  gain.connect(dest);
  osc.start(now);
  osc.stop(now + seconds + 0.02);
}

function burst(
  ctx: AudioContext,
  dest: AudioNode,
  frequency: number,
  type: BiquadFilterType,
  peak: number,
  seconds: number,
  q = 0.7,
) {
  const now = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = q;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  source.start(now);
  source.stop(now + seconds + 0.02);
}

function spread() {
  return 0.96 + Math.random() * 0.08;
}

function playClick(ctx: AudioContext) {
  const dest = destination(ctx);
  const drift = spread();
  tone(ctx, dest, 1880 * drift, 760 * drift, 0.16, 0.02, "triangle");
  burst(ctx, dest, 2400, "highpass", 0.26, 0.011);
  tone(ctx, dest, 230 * drift, 120, 0.05, 0.018, "sine");
}

function playTap(ctx: AudioContext) {
  const dest = destination(ctx);
  const drift = spread();
  tone(ctx, dest, 360 * drift, 125, 0.2, 0.046, "sine");
  burst(ctx, dest, 980, "bandpass", 0.1, 0.024, 0.55);
  burst(ctx, dest, 3000, "highpass", 0.05, 0.008);
}
