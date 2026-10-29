"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec3 base;
uniform vec3 roast;
uniform vec3 crema;
uniform vec3 foam;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 turn = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = turn * p * 2.0 + 3.1;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.y * 1.2;
  float t = time * 0.05;

  vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(uv + 2.5 * q + vec2(1.7, 9.2) + t * 1.4),
    fbm(uv + 2.5 * q + vec2(8.3, 2.8) - t * 1.1)
  );
  float swirl = fbm(uv + 2.5 * r);

  float ribbon = 1.0 - smoothstep(0.0, 0.35, abs(sin(swirl * 7.0 + r.y * 3.0)));

  vec3 colour = mix(base, roast, smoothstep(0.25, 0.75, swirl));
  colour = mix(colour, crema, smoothstep(0.5, 0.85, r.x) * 0.85);
  colour = mix(colour, foam, ribbon * smoothstep(0.45, 0.8, q.y) * 0.45);

  vec2 position = gl_FragCoord.xy / resolution;
  float reach = smoothstep(0.35, 1.0, position.x + position.y * 0.15);
  colour = mix(base, colour, reach);
  colour += (hash(gl_FragCoord.xy + fract(time)) - 0.5) / 64.0;

  gl_FragColor = vec4(colour, 1.0);
}
`;

const PALETTE = [
  "--shader-base",
  "--shader-roast",
  "--shader-crema",
  "--shader-foam",
] as const;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function readPalette(element: HTMLElement) {
  const probe = document.createElement("canvas").getContext("2d", {
    willReadFrequently: true,
  });
  const style = getComputedStyle(element);
  return PALETTE.map((name) => {
    if (!probe) return [0, 0, 0];
    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = style.getPropertyValue(name).trim() || "#000";
    probe.fillRect(0, 0, 1, 1);
    const [r = 0, g = 0, b = 0] = probe.getImageData(0, 0, 1, 1).data;
    return [r / 255, g / 255, b / 255];
  });
}

export function Shader({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false });
    if (!canvas || !gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL call, not a hook
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const resolution = uniform("resolution");
    const time = uniform("time");
    const colours = PALETTE.map((name) =>
      uniform(name.replace("--shader-", "")),
    );

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const offset = Math.random() * 100;
    let frame = 0;
    let visible = false;

    const paint = (now: number) => {
      gl.uniform1f(time, offset + (reduced.matches ? 0 : now / 1000));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.ready = "";
    };
    const loop = (now: number) => {
      paint(now);
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!visible) return;
      if (reduced.matches) paint(0);
      else frame = requestAnimationFrame(loop);
    };
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      if (reduced.matches && visible) paint(0);
    };
    const recolour = () => {
      readPalette(canvas).forEach(([r, g, b], index) => {
        gl.uniform3f(colours[index] ?? null, r ?? 0, g ?? 0, b ?? 0);
      });
      if (reduced.matches && visible) paint(0);
    };

    recolour();
    resize();

    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    const views = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      sync();
    });
    views.observe(canvas);
    scheme.addEventListener("change", recolour);
    reduced.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      views.disconnect();
      scheme.removeEventListener("change", recolour);
      reduced.removeEventListener("change", sync);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={ref} className={className} />;
}
