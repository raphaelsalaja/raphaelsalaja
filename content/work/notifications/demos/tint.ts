"use client";

import { type PointerEvent, type RefObject, useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const PATTERNS = [
  "stripes",
  "halftone",
  "aurora",
  "contours",
  "pixels",
] as const;

export type Pattern = (typeof PATTERNS)[number];

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float pattern;
uniform vec2 size;
uniform float dpr;
uniform vec3 tone;
uniform float phase;
uniform float age;
uniform float clock;
uniform vec2 pointer;
uniform float hover;
uniform vec3 ripple;
uniform float breathe;
uniform float dark;

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
  float amount = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amount * noise(p);
    p = p * 2.03 + vec2(17.0, 9.0);
    amount *= 0.5;
  }
  return value;
}

void main() {
  vec2 p = gl_FragCoord.xy / dpr;
  float x = p.x / size.x;

  float reveal = smoothstep(0.0, 1.0, age / 0.9);
  float front = mix(1.05, -0.3, reveal);
  float mask = smoothstep(0.32, 1.0, x) * smoothstep(front, front + 0.3, x);

  float detail = 0.0;
  float base = 0.12;
  float gain = 0.08;
  if (pattern < 0.5) {
    float f = fract((p.x - p.y) / 30.0 - phase);
    detail = smoothstep(0.0, 0.05, f) * (1.0 - smoothstep(0.5, 0.55, f));
  } else if (pattern < 1.5) {
    vec2 g = p / 7.0;
    vec2 c = floor(g) + 0.5;
    float wave = 0.5 + 0.5 * sin((c.x + c.y) * 0.35 - phase * 6.2832);
    float r = 3.5 * smoothstep(0.2, 1.0, c.x * 7.0 / size.x) * (0.7 + 0.3 * wave);
    detail = 1.0 - smoothstep(r - 0.6, r + 0.6, length(g - c) * 7.0);
    base = 0.04;
    gain = 0.26;
  } else if (pattern < 2.5) {
    float n = fbm(p / 90.0 + vec2(phase * 0.8, -phase * 0.4));
    detail = smoothstep(0.3, 0.7, n);
    base = 0.04;
    gain = 0.3;
  } else if (pattern < 3.5) {
    float v = fbm(p / 200.0 + vec2(phase * 0.4, 0.0)) * 24.0 - phase;
    float f = fract(v);
    float d = min(f, 1.0 - f);
    #ifdef DERIVATIVES
    float w = fwidth(v);
    detail = 1.0 - smoothstep(0.5 * w, 1.5 * w, d);
    #else
    detail = 1.0 - smoothstep(0.03, 0.08, d);
    #endif
    base = 0.07;
    gain = 0.26;
  } else {
    vec2 c = floor(p / 6.0);
    vec2 q = mod(p, 6.0);
    float h = hash(c);
    float lit = step(h, smoothstep(0.3, 1.0, x));
    float twinkle = 0.5 + 0.5 * sin(phase * 12.0 + h * 6.2832);
    detail = step(q.x, 4.0) * step(q.y, 4.0) * lit * (0.4 + 0.6 * twinkle);
    base = 0.03;
    gain = 0.24;
  }

  vec2 toPointer = p - pointer;
  float glow = exp(-dot(toPointer, toPointer) / 9800.0) * hover;
  float pulse = breathe * pow(0.5 + 0.5 * sin(clock * 2.4 - 1.57), 3.0);
  float sweep = exp(-pow((x - (age - 0.35) * 1.3) * 7.0, 2.0));

  float alpha = mask * (base + detail * gain) * (1.0 + glow * 1.8 + pulse * 0.8);
  alpha += mask * sweep * 0.16 + glow * 0.05;

  if (ripple.z >= 0.0) {
    float radius = ripple.z * 560.0;
    float dist = length(p - ripple.xy);
    float life = 1.0 - smoothstep(0.0, 0.7, ripple.z);
    float ring = exp(-pow((dist - radius) / 16.0, 2.0));
    float fill = 1.0 - smoothstep(radius - 60.0, radius, dist);
    alpha += (ring * 0.32 + fill * 0.1) * life;
  }

  alpha *= mix(1.0, 1.4, dark);
  alpha += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  alpha = clamp(alpha, 0.0, 1.0);
  gl_FragColor = vec4(tone * alpha, alpha);
}
`;

const UNIFORMS = [
  "pattern",
  "size",
  "dpr",
  "tone",
  "phase",
  "age",
  "clock",
  "pointer",
  "hover",
  "ripple",
  "breathe",
  "dark",
] as const;

type Uniform = (typeof UNIFORMS)[number];

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function rgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

export function useTint(
  canvas: RefObject<HTMLCanvasElement | null>,
  options: {
    tone: string;
    speed: number;
    breathe: boolean;
    delay: number;
    pattern: Pattern;
  },
) {
  const { tone, speed, breathe, delay, pattern } = options;
  const pointer = useRef({ x: -1e4, y: -1e4, inside: false });
  const ripple = useRef({ x: 0, y: 0, start: -1 });

  useEffect(() => {
    const element = canvas.current;
    const gl = element?.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!element || !gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(
      gl,
      gl.FRAGMENT_SHADER,
      gl.getExtension("OES_standard_derivatives")
        ? `#extension GL_OES_standard_derivatives : enable\n#define DERIVATIVES\n${FRAGMENT}`
        : FRAGMENT,
    );
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL call, not a hook
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const location = Object.fromEntries(
      UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<Uniform, WebGLUniformLocation | null>;
    gl.uniform3f(location.tone, ...rgb(tone));
    gl.uniform1f(location.breathe, breathe ? 1 : 0);
    gl.uniform1f(location.pattern, PATTERNS.indexOf(pattern));

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const born = performance.now() + delay * 1000;
    let width = 0;
    let height = 0;
    let phase = 0;
    let hover = 0;
    let last = performance.now();
    let frame = 0;
    let visible = false;

    const paint = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const still = reduced.matches;
      hover +=
        ((pointer.current.inside ? 1 : 0) - hover) * (1 - Math.exp(-dt * 10));
      if (!still) phase += dt * speed * (1 + hover * 1.5);

      const age = still ? 10 : Math.max(0, (now - born) / 1000);
      const burst = ripple.current.start;
      const since = burst < 0 || still ? -1 : (now - burst) / 1000;
      if (since > 1) ripple.current.start = -1;

      gl.uniform1f(location.phase, phase);
      gl.uniform1f(location.age, age);
      gl.uniform1f(location.clock, still ? 0 : now / 1000);
      gl.uniform2f(location.pointer, pointer.current.x, pointer.current.y);
      gl.uniform1f(location.hover, hover);
      gl.uniform3f(location.ripple, ripple.current.x, ripple.current.y, since);
      gl.uniform1f(location.dark, scheme.matches ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      paint(now);
      frame = visible && !reduced.matches ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const resize = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = element.clientWidth;
      height = element.clientHeight;
      element.width = Math.max(1, Math.round(width * dpr));
      element.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, element.width, element.height);
      gl.uniform2f(location.size, width, height);
      gl.uniform1f(location.dpr, element.width / Math.max(width, 1));
      paint(performance.now());
    });
    resize.observe(element);

    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    view.observe(element);

    const refresh = () => {
      paint(performance.now());
      if (visible) start();
    };
    scheme.addEventListener("change", refresh);
    reduced.addEventListener("change", refresh);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      view.disconnect();
      scheme.removeEventListener("change", refresh);
      reduced.removeEventListener("change", refresh);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [canvas, tone, speed, breathe, delay, pattern]);

  const locate = (clientX: number, clientY: number) => {
    const rect = canvas.current?.getBoundingClientRect();
    if (!rect) return { x: -1e4, y: -1e4 };
    return { x: clientX - rect.left, y: rect.bottom - clientY };
  };

  return {
    move(event: PointerEvent<HTMLElement>) {
      pointer.current = {
        ...locate(event.clientX, event.clientY),
        inside: true,
      };
    },
    leave() {
      pointer.current = { ...pointer.current, inside: false };
    },
    burst(element: HTMLElement) {
      const rect = element.getBoundingClientRect();
      const center = locate(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      ripple.current = { ...center, start: performance.now() };
    },
  };
}
