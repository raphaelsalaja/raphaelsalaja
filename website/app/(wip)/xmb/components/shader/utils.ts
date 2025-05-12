import { NUM_PARTICLES, PARTICLE_SIZE, RESOLUTION } from "./constants";

// Helper functions for geometry creation
export function makeFlowVertices() {
  const vertices = [];
  const yPos = [];
  for (let y = 0; y < RESOLUTION; y++) {
    yPos.push((y / (RESOLUTION - 1)) * 2 - 1);
  }
  let xPos1 = -1;
  for (let x = 1; x < RESOLUTION; x++) {
    const xPos2 = (x / (RESOLUTION - 1)) * 2 - 1;
    vertices.push(xPos2, -1);
    for (let y = 0; y < RESOLUTION; y++) {
      vertices.push(xPos2, yPos[y]);
      vertices.push(xPos1, yPos[y]);
    }
    vertices.push(xPos1, 1);
    xPos1 = xPos2;
  }
  return vertices;
}

export function makeParticleSeeds() {
  const seeds = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    seeds.push(Math.random(), Math.random(), Math.random() ** 10 * PARTICLE_SIZE + 3);
  }
  return seeds;
}

// Generate Bayer matrix for dithering
export function createBayerTexture() {
  return Uint8Array.of(
    0,
    128,
    32,
    160,
    8,
    136,
    40,
    168,
    192,
    64,
    224,
    96,
    200,
    72,
    232,
    104,
    48,
    176,
    16,
    144,
    56,
    184,
    24,
    152,
    240,
    112,
    208,
    80,
    248,
    120,
    216,
    88,
    12,
    140,
    44,
    172,
    4,
    132,
    36,
    164,
    204,
    76,
    236,
    108,
    196,
    68,
    228,
    100,
    60,
    188,
    28,
    156,
    52,
    180,
    20,
    148,
    252,
    124,
    220,
    92,
    244,
    116,
    212,
    84,
  );
}

// Helper function to set up the canvas for high-DPI displays
export function setupCanvas(canvas: HTMLCanvasElement) {
  const desiredWidth = 800;
  const desiredHeight = 600;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = desiredWidth * dpr;
  canvas.height = desiredHeight * dpr;
  canvas.style.width = `${desiredWidth}px`;
  canvas.style.height = `${desiredHeight}px`;
  return canvas;
}
