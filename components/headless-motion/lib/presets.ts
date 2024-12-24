const DEFAULT_DURATION = 1;

const Springs = {
  default: ({ duration = DEFAULT_DURATION, bounce = 0.25 } = {}) => ({
    type: "spring",
    bounce,
    duration,
  }),
  bouncy: ({ bounce = 0 } = {}) => ({
    type: "spring",
    stiffness: 100,
    damping: 12 + bounce,
    mass: 1,
  }),
  smooth: ({ bounce = 0 } = {}) => ({
    type: "spring",
    stiffness: 150,
    damping: 20 + bounce,
    mass: 1,
  }),
  snappy: ({ bounce = 0 } = {}) => ({
    type: "spring",
    stiffness: 250,
    damping: 15 + bounce,
    mass: 1,
  }),
};

const Tweens = {
  default: ({ duration = DEFAULT_DURATION } = {}) => ({
    type: "tween",
    duration,
  }),
  anticipate: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "anticipate",
    duration,
  }),
  backIn: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "backIn",
    duration,
  }),
  circIn: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "circIn",
    duration,
  }),
  circInOut: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "circInOut",
    duration,
  }),
  circOut: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "circOut",
    duration,
  }),
  easeIn: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "easeIn",
    duration,
  }),
  easeInOut: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "easeInOut",
    duration,
  }),
  easeOut: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "easeOut",
    duration,
  }),
  linear: ({ duration = DEFAULT_DURATION } = {}) => ({
    ease: "linear",
    duration,
  }),
};

export { Springs, Tweens };
