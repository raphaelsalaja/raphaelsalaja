// One clock for the whole page: Motion reads performance.now() every frame and
// rAF loops get their timestamp from it, so warping it slows or freezes every
// JS-driven animation. Web animations run on the document timeline instead and
// are paused, stepped and rated one by one under the lab's root.

const FRAME = 1000 / 60;

let installed = false;
let rate = 1;
let paused = false;
let anchorReal = 0;
let anchorVirtual = 0;
let realNow = () => 0;
let realRaf: (callback: FrameRequestCallback) => number = () => 0;
let realCaf: (id: number) => void = () => {};
const held = new WeakSet<Animation>();

export function now() {
  return paused
    ? anchorVirtual
    : anchorVirtual + (realNow() - anchorReal) * rate;
}

function rebase() {
  anchorVirtual = now();
  anchorReal = realNow();
}

/* The patch stays in once made: taking it out would jump every running clock
   by however far the virtual one drifted. At rate 1 it is a plain passthrough. */
export function install() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  realNow = performance.now.bind(performance);
  realRaf = window.requestAnimationFrame.bind(window);
  realCaf = window.cancelAnimationFrame.bind(window);
  anchorReal = realNow();
  anchorVirtual = anchorReal;
  performance.now = now;
  window.requestAnimationFrame = (callback) => realRaf(() => callback(now()));
}

export function frame(callback: () => void) {
  return realRaf(callback);
}

export function cancel(id: number) {
  realCaf(id);
}

export function setRate(next: number) {
  rebase();
  rate = next;
}

export function setPaused(next: boolean) {
  rebase();
  paused = next;
}

// Scroll-driven animations have no clock to warp, and the frame's own
// transitions and the controls (the lab's and the demo's) aren't part of its motion.
export function timed(root: Element) {
  return root.getAnimations({ subtree: true }).filter((animation) => {
    if (animation.timeline !== document.timeline) return false;
    const target = (animation.effect as KeyframeEffect | null)?.target;
    return (
      target !== root && !target?.closest("[data-lab-ui], [data-controls]")
    );
  });
}

export function framing(root: Element) {
  return root
    .getAnimations()
    .some((animation) => animation.playState === "running");
}

export function sync(root: Element) {
  for (const animation of timed(root)) {
    if (paused && animation.playState === "running") {
      animation.pause();
      held.add(animation);
    } else if (!paused && held.has(animation)) {
      held.delete(animation);
      animation.play();
    }
    if (animation.playbackRate !== rate) animation.updatePlaybackRate(rate);
  }
}

export function step(root: Element, ms = FRAME) {
  if (!paused) return;
  anchorVirtual += ms;
  for (const animation of timed(root)) {
    if (animation.playState !== "paused") continue;
    animation.currentTime = Number(animation.currentTime ?? 0) + ms;
  }
}

export function release(root: Element) {
  setPaused(false);
  setRate(1);
  sync(root);
}
