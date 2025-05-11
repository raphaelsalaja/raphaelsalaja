// Background shader
export const BACKGROUND_VERTEX = `
  precision lowp float;
  attribute vec2 position;
  uniform vec2 resolution;
  varying highp vec2 pos;
  varying float gradient;
  void main() {
    pos = (position + 1.0) / 2.0 * resolution;
    gradient = 1.0 - position.y * 0.625;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const BACKGROUND_FRAGMENT = `
  precision lowp float;
  uniform vec3 color;
  uniform vec2 resolution;
  uniform sampler2D bayerTexture;
  varying highp vec2 pos;
  varying float gradient;
  const float colorDepth = 255.0;
  vec3 dither(vec2 position, vec3 color) {
    float threshold = texture2D(bayerTexture, position / 8.0).a;
    vec3 diff = 1.0 - mod(color * colorDepth, 1.0);
    return color + diff * vec3(
        float(diff.r < threshold),
        float(diff.g < threshold),
        float(diff.b < threshold)
      ) / colorDepth;
  }
  void main() {
    gl_FragColor = vec4(dither(pos, gradient * color), 1.0);
  }
`;

// Flow shader
export const FLOW_VERTEX = `
  precision lowp float;
  attribute vec2 position;
  uniform float time;
  uniform float ratio;
  uniform float step;
  uniform float opacity;
  varying float alpha;
  float iqhash(float n) {
    return fract(sin(n) * 43758.5453);
  }
  float noise(vec3 x) {
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = dot(floor(x), vec3(1.0, 57.0, 113.0));
    return mix(
      mix(mix(iqhash(n + 0.0), iqhash(n + 1.0), f.x),
          mix(iqhash(n + 57.0), iqhash(n + 58.0), f.x),
          f.y),
      mix(
          mix(iqhash(n + 113.0), iqhash(n + 114.0), f.x),
          mix(iqhash(n + 170.0), iqhash(n + 171.0), f.x),
          f.y),
      f.z);
  }
  vec3 getVertex(float x, float y) {
    vec3 vertex = vec3(x, cos(y * 4.0) * cos(y + time / 5.0 + x) / 8.0, y);
    float c = noise(vertex * vec3(7.0/4.0, 7.0, 7.0)) / 15.0;
    vertex.y += c + cos(x * 2.0 - time) * ratio / 2.0 - 0.3;
    vertex.z += c;
    return vertex;
  }
  void main() {
    gl_Position = vec4(getVertex(position.x, position.y), 1.0);
    vec3 dfdx = getVertex(position.x + step, position.y) - gl_Position.xyz;
    vec3 dfdy = getVertex(position.x, position.y + step) - gl_Position.xyz;
    alpha = 1.0 - abs(normalize(cross(dfdx, dfdy)).z);
    alpha = (1.0 - cos(alpha * alpha)) * opacity;
  }
`;

export const FLOW_FRAGMENT = `
  precision lowp float;
  varying float alpha;
  void main() {
    gl_FragColor = vec4(alpha, alpha, alpha, 1.0);
  }
`;

// Particle shader
export const PARTICLE_VERTEX = `
  precision lowp float;
  attribute vec3 seed;
  uniform float time;
  uniform float ratio;
  uniform float opacity;
  varying float alpha;
  float getWave(float x, float y) {
    return cos(y * 4.0) * cos(x + y + time / 5.0) / 8.0 + cos(x * 2.0 - time) * ratio / 2.0 - 0.28;
  }
  void main() {
    gl_PointSize = seed.z;
    float x = fract(time * (seed.x - 0.5) / 15.0 + seed.y * 50.0) * 2.0 - 1.0;
    float y = sin(sign(seed.y) * time * (seed.y + 1.5) / 4.0 + seed.x * 100.0);
    y /= (6.0 - seed.x * 4.0 * seed.y) / ratio;
    float opacityVariance = mix(
      sin(time * (seed.x + 0.5) * 12.0 + seed.y * 10.0),
      sin(time * (seed.y + 1.5) * 6.0 + seed.x * 4.0),
      y * 0.5 + 0.5) * seed.x + seed.y;
    alpha = opacity * opacityVariance * opacityVariance;
    y += getWave(x, seed.y);
    gl_Position = vec4(x, y, 0.0, 1.0);
  }
`;

export const PARTICLE_FRAGMENT = `
  precision lowp float;
  varying float alpha;
  void main() {
    vec2 cxy = gl_PointCoord * 2.0 - 1.0;
    float radius = dot(cxy, cxy);
    gl_FragColor = vec4(vec3(alpha * max(0.0, 1.0 - radius * radius)), 1.0);
  }
`;
