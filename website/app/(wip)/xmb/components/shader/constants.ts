// Animation constants
export const RESOLUTION = 50;
export const NUM_PARTICLES = 400;
export const PARTICLE_SIZE = 8;
export const NUM_VERTICES =
  RESOLUTION * RESOLUTION + (RESOLUTION + 2) * (RESOLUTION - 2) + 2;

// Color palette
export const COLOR_PALETTE = {
  silk: [104, 107, 108],
  turquoise: [26, 115, 115],
  emerald: [20, 101, 50],
  sapphire: [37, 89, 179],
  gold: [160, 120, 0],
  ruby: [116, 15, 48],
  amethyst: [118, 6, 135],
  amber: [192, 114, 40],
};

// Get array of color names for cycling
export const COLOR_NAMES = Object.keys(COLOR_PALETTE);

// Default parameters
export const DEFAULT_PARAMS = {
  colorName: "sapphire",
  backgroundColor: [37, 89, 179],
  flowSpeed: 0.25,
  opacity: 0.75,
  brightness: 0.5,
  particleOpacity: 0.75,
  colorCycling: true,
  colorCycleSpeed: 0.1,
};
