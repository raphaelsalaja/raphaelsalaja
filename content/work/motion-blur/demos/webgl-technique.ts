import {
  echo,
  type Frame,
  type Painter,
  type Technique,
} from "@web-kits/motion-blur";

type Renderer = {
  update(node: HTMLElement): Promise<HTMLCanvasElement>;
  entries: Map<HTMLElement, unknown>;
};

type Context = {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  uniform: (name: string) => WebGLUniformLocation | null;
  textures: Map<HTMLCanvasElement, WebGLTexture>;
};

const SAMPLES = 24;
const SPACING = 1.5;
const MAX_PAD = 480;
const CACHE = 48;

const INHERITED = [
  "color",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "font-variation-settings",
  "font-feature-settings",
  "letter-spacing",
  "line-height",
  "text-rendering",
  "-webkit-font-smoothing",
];

const VERTEX = `#version 300 es
void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1));
  gl_Position = vec4(corner * 4.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D image;
uniform vec2 resolution;
uniform vec2 size;
uniform float pad;
uniform float scale;
uniform int count;
uniform vec3 rows[${SAMPLES * 2}];

out vec4 color;

void main() {
  vec3 point = vec3(vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y) / scale - pad, 1.0);
  vec4 sum = vec4(0.0);

  for (int i = 0; i < ${SAMPLES}; i++) {
    if (i >= count) break;
    vec2 uv = vec2(dot(rows[i * 2], point), dot(rows[i * 2 + 1], point)) / size;
    if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) {
      sum += texture(image, uv);
    }
  }

  color = sum / float(count);
}`;

let context: Context | null | undefined;
let renderer: Promise<Renderer> | undefined;
let unsupported = false;
const snapshots = new Map<string, HTMLCanvasElement>();
const pending = new Map<string, Promise<HTMLCanvasElement | null>>();

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
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

// One context for every element, so a page full of demos stays under the
// browser's limit on live WebGL contexts.
function getContext() {
  if (context !== undefined) return context;
  context = null;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
  if (!gl) return null;
  const program = compile(gl);
  if (!program) return null;
  const locations = new Map<string, WebGLUniformLocation | null>();
  context = {
    canvas,
    gl,
    program,
    uniform: (name) => {
      if (!locations.has(name)) {
        locations.set(name, gl.getUniformLocation(program, name));
      }
      return locations.get(name) ?? null;
    },
    textures: new Map(),
  };
  return context;
}

function getRenderer() {
  renderer ??= import("three-html-render/polyfill").then(
    ({ getHtmlRenderer }) => {
      const Instance = getHtmlRenderer().constructor as new () => Renderer;
      return new Instance();
    },
  );
  return renderer;
}

function keyOf(layer: HTMLElement) {
  const markup = layer.innerHTML.replace(/\s(?:id|aria-[\w-]+)="[^"]*"/g, "");
  return `${layer.offsetWidth}x${layer.offsetHeight}:${layer.className}:${markup}`;
}

function remember(key: string, snapshot: HTMLCanvasElement) {
  snapshots.set(key, snapshot);
  if (snapshots.size <= CACHE) return;
  const [oldest, canvas] = snapshots.entries().next().value ?? [];
  if (!oldest || !canvas) return;
  snapshots.delete(oldest);
  const texture = context?.textures.get(canvas);
  if (texture) context?.gl.deleteTexture(texture);
  context?.textures.delete(canvas);
}

// The snapshot is drawn on its own, away from the layer's ancestors, so
// anything it inherits has to be written onto it first. The renderer clones
// the layer before its first await, so the styles come straight off again.
function snapshot(instance: Renderer, layer: HTMLElement) {
  const computed = getComputedStyle(layer);
  const style = layer.getAttribute("style");
  for (const property of INHERITED) {
    layer.style.setProperty(property, computed.getPropertyValue(property));
  }
  const drawn = instance.update(layer);
  if (style === null) layer.removeAttribute("style");
  else layer.setAttribute("style", style);
  return drawn;
}

function capture(layer: HTMLElement, key: string) {
  const running = pending.get(key);
  if (running) return running;
  const job = getRenderer()
    .then(async (instance) => {
      try {
        const drawn = await snapshot(instance, layer);
        const copy = document.createElement("canvas");
        copy.width = drawn.width;
        copy.height = drawn.height;
        copy.getContext("2d")?.drawImage(drawn, 0, 0);
        remember(key, copy);
        return copy;
      } finally {
        // The renderer keeps every node it has drawn until it's told to forget.
        instance.entries.delete(layer);
      }
    })
    .catch(() => null)
    .finally(() => pending.delete(key));
  pending.set(key, job);
  return job;
}

function textureFor(gl: Context, snapshot: HTMLCanvasElement) {
  const cached = gl.textures.get(snapshot);
  if (cached) return cached;
  const texture = gl.gl.createTexture();
  const g = gl.gl;
  g.bindTexture(g.TEXTURE_2D, texture);
  g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, snapshot);
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
  gl.textures.set(snapshot, texture);
  return texture;
}

/**
 * Snapshots the layer into a texture, hides it while it moves, and draws the
 * snapshot averaged over every pose inside the shutter. Draws `echo()` while the
 * first snapshot is on its way, and wherever it can't reach WebGL, as in Safari.
 */
export function webgl(): Technique {
  const technique: Technique = (target) => {
    const { host, layer } = target;
    const fallback = echo()(target);
    const rows = new Float32Array(SAMPLES * 6);
    let output: HTMLCanvasElement | null = null;
    let snapshot: HTMLCanvasElement | null = null;
    let painting = false;
    let echoing = false;

    const request = () => {
      const key = keyOf(layer);
      snapshot = snapshots.get(key) ?? null;
      if (snapshot) return;
      capture(layer, key).then((drawn) => {
        if (drawn && keyOf(layer) === key) snapshot = drawn;
      });
    };

    const clear = () => {
      if (echoing) fallback.clear();
      echoing = false;
      if (!painting) return;
      painting = false;
      layer.style.removeProperty("opacity");
      if (output) output.style.display = "none";
    };

    const draw = (frame: Frame) => {
      const gl = getContext();
      if (!gl || !snapshot) return false;
      const inverse = frame.matrix.inverse();
      if (Number.isNaN(inverse.m11)) return false;

      const width = layer.offsetWidth;
      const height = layer.offsetHeight;
      const pad = Math.min(MAX_PAD, Math.ceil(frame.streak) + 4);
      const scale = Math.min(2, window.devicePixelRatio || 1);
      const pixels = {
        width: Math.ceil((width + pad * 2) * scale),
        height: Math.ceil((height + pad * 2) * scale),
      };

      if (!output) {
        output = document.createElement("canvas");
        output.setAttribute("aria-hidden", "true");
        Object.assign(output.style, {
          position: "absolute",
          margin: "0",
          pointerEvents: "none",
        });
        host.append(output);
      }
      Object.assign(output.style, {
        display: "block",
        left: `${layer.offsetLeft - pad}px`,
        top: `${layer.offsetTop - pad}px`,
        width: `${width + pad * 2}px`,
        height: `${height + pad * 2}px`,
      });
      for (const canvas of [output, gl.canvas]) {
        if (canvas.width !== pixels.width) canvas.width = pixels.width;
        if (canvas.height !== pixels.height) canvas.height = pixels.height;
      }

      const pivot = {
        x: frame.origin.x - layer.offsetLeft - host.clientLeft,
        y: frame.origin.y - layer.offsetTop - host.clientTop,
      };
      const count = Math.min(
        SAMPLES,
        Math.max(2, Math.ceil(frame.streak / SPACING)),
      );
      for (let i = 0; i < count; i++) {
        const back = inverse
          .multiply(frame.path((i + 0.5) / count - 0.5))
          .inverse();
        const { a, b, c, d, e, f } = back;
        rows.set(
          [
            a,
            c,
            e + pivot.x - a * pivot.x - c * pivot.y,
            b,
            d,
            f + pivot.y - b * pivot.x - d * pivot.y,
          ],
          i * 6,
        );
      }

      const g = gl.gl;
      const texture = textureFor(gl, snapshot);
      g.viewport(0, 0, pixels.width, pixels.height);
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      // biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
      g.useProgram(gl.program);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, texture);
      g.uniform1i(gl.uniform("image"), 0);
      g.uniform2f(gl.uniform("resolution"), pixels.width, pixels.height);
      g.uniform2f(gl.uniform("size"), width, height);
      g.uniform1f(gl.uniform("pad"), pad);
      g.uniform1f(gl.uniform("scale"), scale);
      g.uniform1i(gl.uniform("count"), count);
      g.uniform3fv(gl.uniform("rows"), rows);
      g.drawArrays(g.TRIANGLES, 0, 3);

      const paint = output.getContext("2d");
      paint?.clearRect(0, 0, pixels.width, pixels.height);
      paint?.drawImage(gl.canvas, 0, 0);
      layer.style.opacity = "0";
      painting = true;
      return true;
    };

    request();

    const painter: Painter = {
      clear,
      destroy() {
        clear();
        output?.remove();
        fallback.destroy?.();
      },
      paint(frame) {
        if (frame.streak <= 0.5) return clear();
        if (!painting && !echoing) request();
        if (!unsupported && snapshot) {
          try {
            if (echoing) fallback.clear();
            echoing = false;
            if (draw(frame)) return;
          } catch {
            unsupported = true;
          }
          clear();
        }
        // Until the snapshot is ready, and wherever WebGL can't read it.
        echoing = true;
        fallback.paint(frame);
      },
    };
    return painter;
  };
  technique.key = "webgl";
  return technique;
}
