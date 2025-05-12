import { NUM_PARTICLES, NUM_VERTICES, RESOLUTION } from "./constants";
import {
  BACKGROUND_FRAGMENT,
  BACKGROUND_VERTEX,
  FLOW_FRAGMENT,
  FLOW_VERTEX,
  PARTICLE_FRAGMENT,
  PARTICLE_VERTEX,
} from "./shaders";
import { createBayerTexture, makeFlowVertices, makeParticleSeeds } from "./utils";

// Create WebGL draw commands
export function createDrawCommands(regl: any) {
  const drawBackground = regl({
    vert: BACKGROUND_VERTEX,
    frag: BACKGROUND_FRAGMENT,
    primitive: "triangle strip",
    count: 4,
    attributes: {
      position: [
        [1, -1],
        [-1, -1],
        [1, 1],
        [-1, 1],
      ],
    },
    uniforms: {
      color: regl.prop("color"),
      resolution: ({ viewportWidth, viewportHeight }: { viewportWidth: number; viewportHeight: number }) => [
        viewportWidth,
        viewportHeight,
      ],
      bayerTexture: regl.texture({
        data: createBayerTexture(),
        format: "alpha",
        shape: [8, 8],
        wrap: ["repeat", "repeat"],
      }),
    },
    dither: false,
    depth: { enable: false },
  });

  const drawFlow = regl({
    vert: FLOW_VERTEX,
    frag: FLOW_FRAGMENT,
    primitive: "triangle strip",
    count: NUM_VERTICES,
    attributes: {
      position: makeFlowVertices(),
    },
    uniforms: {
      time: regl.prop("time"),
      opacity: regl.prop("opacity"),
      ratio: regl.prop("ratio"),
      step: 2 / RESOLUTION,
    },
    blend: {
      enable: true,
      func: { src: 1, dst: 1 },
    },
    dither: false,
  });

  const drawParticles = regl({
    vert: PARTICLE_VERTEX,
    frag: PARTICLE_FRAGMENT,
    primitive: "points",
    count: NUM_PARTICLES,
    attributes: {
      seed: makeParticleSeeds(),
    },
    uniforms: {
      time: regl.prop("time"),
      ratio: regl.prop("ratio"),
      opacity: regl.prop("particleOpacity"),
    },
    blend: {
      enable: true,
      func: { src: 1, dst: 1 },
    },
    dither: false,
    depth: { enable: false },
  });

  return { drawBackground, drawFlow, drawParticles };
}
