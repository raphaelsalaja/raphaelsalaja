"use client";

import { useEffect, useRef, useState } from "react";
import { Control, Controls } from "./controls";
import {
  PEAK,
  RATES,
  SHUTTERS,
  type Shutter,
  SPEED,
  sample,
  shutterFraction,
  useFrameLoop,
  useRate,
} from "./motion";
import { polyfillHtmlInCanvas } from "./polyfill";
import { Shape } from "./shape";
import styles from "./styles.module.css";

declare module "react" {
  interface HTMLAttributes<T> {
    drawable?: "";
  }
}

type DrawableCanvas = HTMLCanvasElement & {
  requestPaint(): void;
  captureElementImage(element: Element): {
    width: number;
    height: number;
    close(): void;
  };
  updateElementGeometry(
    element: Element,
    options: { canvasTransform: DOMMatrix },
  ): void;
};

type DrawableContext = WebGL2RenderingContext & {
  texElementSubImage2D(
    target: number,
    level: number,
    x: number,
    y: number,
    element: Element,
    size: { width: number; height: number },
  ): void;
};

type Pose = { x: number; y: number; angle: number };

const SIZE = 64;
const INSET = 24;
const TURN = Math.PI * 2;
const BOX_TO_SIGMA = 1 / Math.sqrt(12);

const VERTEX = `#version 300 es
void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1));
  gl_Position = vec4(corner * 4.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D shape;
uniform vec2 resolution;
uniform vec2 size;
uniform vec2 from;
uniform vec2 to;
uniform vec2 angle;

out vec4 color;

const int SAMPLES = 32;

void main() {
  vec2 pixel = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y);
  vec4 sum = vec4(0.0);

  for (int i = 0; i < SAMPLES; i++) {
    float t = (float(i) + 0.5) / float(SAMPLES);
    vec2 offset = pixel - mix(from, to, t);
    float a = mix(angle.x, angle.y, t);
    vec2 local = mat2(cos(a), -sin(a), sin(a), cos(a)) * offset;
    vec2 uv = local / size + 0.5;
    if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) {
      sum += texture(shape, uv);
    }
  }

  color = sum / float(SAMPLES);
}`;

function supportsHtmlInCanvas() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("content", "drawable");
  return (canvas as { content?: string }).content === "drawable";
}

function compile(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

function createRenderer(canvas: DrawableCanvas, element: HTMLElement) {
  const gl = canvas.getContext("webgl2") as DrawableContext | null;
  if (!gl) return null;
  const program = compile(gl);
  if (!program) return null;

  const texture = gl.createTexture();
  const allocated = { width: 0, height: 0 };
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const location = {
    resolution: uniform("resolution"),
    size: uniform("size"),
    from: uniform("from"),
    to: uniform("to"),
    angle: uniform("angle"),
  };

  const upload = () => {
    let image: ReturnType<DrawableCanvas["captureElementImage"]>;
    try {
      image = canvas.captureElementImage(element);
    } catch {
      canvas.requestPaint();
      return;
    }
    const width = Math.ceil(image.width);
    const height = Math.ceil(image.height);
    image.close();
    if (!width || !height) return;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    if (allocated.width !== width || allocated.height !== height) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA8,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      allocated.width = width;
      allocated.height = height;
    }
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texElementSubImage2D(gl.TEXTURE_2D, 0, 0, 0, element, {
      width,
      height,
    });
  };

  const paint = () => {
    try {
      upload();
    } catch (error) {
      console.error("texElementSubImage2D failed:", error);
    }
  };

  const observer = new ResizeObserver(([entry]) => {
    const box = entry.devicePixelContentBoxSize?.[0];
    canvas.width =
      box?.inlineSize ??
      Math.round(entry.contentRect.width * window.devicePixelRatio);
    canvas.height =
      box?.blockSize ??
      Math.round(entry.contentRect.height * window.devicePixelRatio);
  });

  canvas.addEventListener("paint", paint);
  observer.observe(canvas, { box: "device-pixel-content-box" });
  canvas.requestPaint();

  return {
    draw(from: Pose, to: Pose, now: Pose) {
      if (!allocated.width) return;
      const scale = canvas.width / (canvas.clientWidth || 1);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform2f(location.resolution, canvas.width, canvas.height);
      gl.uniform2f(location.size, allocated.width, allocated.height);
      gl.uniform2f(location.from, from.x * scale, from.y * scale);
      gl.uniform2f(location.to, to.x * scale, to.y * scale);
      gl.uniform2f(location.angle, from.angle, to.angle);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      canvas.updateElementGeometry(element, {
        canvasTransform: new DOMMatrix()
          .translate(now.x, now.y)
          .rotate((now.angle * 180) / Math.PI)
          .translate(-SIZE / 2, -SIZE / 2),
      });
    },
    dispose() {
      canvas.removeEventListener("paint", paint);
      observer.disconnect();
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    },
  };
}

export function Shader() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const element = useRef<HTMLDivElement>(null);
  const blur = useRef<HTMLDivElement>(null);
  const renderer = useRef<ReturnType<typeof createRenderer>>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [rate, setRate] = useRate();
  const [shutter, setShutter] = useState<Shutter>("180°");
  const time = useRef(0);

  useEffect(() => {
    if (supportsHtmlInCanvas()) {
      setSupported(true);
      return;
    }
    if (!canvas.current) return;
    const controller = new AbortController();
    let restore: (() => void) | undefined;
    polyfillHtmlInCanvas(canvas.current, controller.signal).then(
      (undo) => {
        if (controller.signal.aborted) return undo?.();
        restore = undo;
        setSupported(true);
      },
      () => {
        if (!controller.signal.aborted) setSupported(false);
      },
    );
    return () => {
      controller.abort();
      restore?.();
    };
  }, []);

  useEffect(() => {
    if (!supported || !canvas.current || !element.current) return;
    const created = createRenderer(
      canvas.current as DrawableCanvas,
      element.current,
    );
    renderer.current = created;
    return () => {
      created?.dispose();
      renderer.current = null;
    };
  }, [supported]);

  useFrameLoop(stage, (delta, frame) => {
    time.current = rate === "Still" ? PEAK : time.current + delta * SPEED[rate];

    const track = blur.current?.parentElement;
    const width = track?.clientWidth ?? 0;
    const height = track?.clientHeight ?? 0;
    const travel = Math.max(0, width - SIZE - INSET * 2);
    const exposure = frame * shutterFraction(shutter);

    const pose = (t: number): Pose => {
      const [position] = sample(t);
      return {
        x: INSET + SIZE / 2 + position * travel,
        y: height / 2,
        angle: position * TURN,
      };
    };

    const now = pose(time.current);
    renderer.current?.draw(
      pose(time.current - exposure / 2),
      pose(time.current + exposure / 2),
      now,
    );

    if (blur.current) {
      const [, velocity] = sample(time.current);
      const sigma = Math.abs(velocity * travel * exposure) * BOX_TO_SIGMA;
      blur.current.style.transform = `translate(${(now.x - SIZE / 2).toFixed(2)}px, ${(now.y - SIZE / 2).toFixed(2)}px) rotate(${now.angle.toFixed(4)}rad)`;
      blur.current.style.filter =
        sigma > 0.05 ? `blur(${sigma.toFixed(2)}px)` : "";
    }
  });

  return (
    <div className={styles.lab}>
      <div ref={stage} className={`${styles.body} ${styles.shader}`}>
        <div className={styles.lanes}>
          <div className={styles.lane}>
            <span className={styles.laneName}>WebGL</span>
            <div className={styles.shaderTrack}>
              <canvas
                ref={canvas}
                className={styles.canvas}
                content="drawable"
                aria-hidden
              >
                <div ref={element} className={styles.drawable} drawable="">
                  <Shape />
                </div>
              </canvas>
            </div>
          </div>
          <div className={styles.lane}>
            <span className={styles.laneName}>Blur</span>
            <div className={styles.shaderTrack}>
              <div
                ref={blur}
                className={styles.mover}
                style={{ width: SIZE, height: SIZE }}
              >
                <Shape />
              </div>
            </div>
          </div>
        </div>
        {supported === false && (
          <div className={styles.unsupported}>
            <p className={styles.unsupportedTitle}>Browser Not Supported</p>
            <p className={styles.unsupportedText}>
              HTML-in-Canvas needs Chrome 157 or later.
            </p>
          </div>
        )}
      </div>
      <Controls>
        <Control
          label="Speed"
          options={RATES}
          value={rate}
          onChange={setRate}
        />
        <Control
          label="Shutter"
          options={SHUTTERS}
          value={shutter}
          onChange={setShutter}
        />
      </Controls>
    </div>
  );
}
