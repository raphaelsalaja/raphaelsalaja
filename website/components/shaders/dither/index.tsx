// components/shaders/rainbow-dither.tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function parseColor(input: string): [number, number, number, number] {
  const c = input.trim();
  // hex formats: #rgb, #rgba, #rrggbb, #rrggbbaa
  if (c[0] === "#") {
    let hex = c.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split("")
        .map((ch) => ch + ch)
        .join("");
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
      const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
      const b = Number.parseInt(hex.slice(4, 6), 16) / 255;
      const a = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return [r, g, b, a];
    }
  }
  // rgb() or rgba()
  const m = c.match(/rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(?:,\s*([0-9.]+)\s*)?\)/);
  if (m) {
    const [, rs, gs, bs, as] = m;
    const r = Number.parseInt(rs, 10) / 255;
    const g = Number.parseInt(gs, 10) / 255;
    const b = Number.parseInt(bs, 10) / 255;
    const a = as !== undefined ? Number.parseFloat(as) : 1;
    return [r, g, b, a];
  }

  return [1, 1, 1, 1];
}

type DitherProps = {
  colorDark?: string;
  colorLight?: string;
  speed?: number;
  pixelSize?: number;
  ditherScale?: number;
  rotSpeed?: number;
  warpInit?: number;
  warpIter?: number;
  warpAmpl?: number;
};

function ShaderPlane({
  colorDark,
  colorLight,
  speed,
  pixelSize,
  ditherScale,
  rotSpeed,
  warpInit,
  warpIter,
  warpAmpl,
}: Required<DitherProps>) {
  const mesh = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const parsedDark = useMemo(() => parseColor(colorDark), [colorDark]);
  const parsedLight = useMemo(() => parseColor(colorLight), [colorLight]);

  const uniforms = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColorDark: { value: new THREE.Vector4(...parsedDark) },
    uColorLight: { value: new THREE.Vector4(...parsedLight) },
    uSpeed: { value: speed },
    uPixelSize: { value: pixelSize },
    uDitherScale: { value: ditherScale },
    uRotSpeed: { value: rotSpeed },
    uWarpInit: { value: warpInit },
    uWarpIter: { value: warpIter },
    uWarpAmpl: { value: warpAmpl },
  });

  // keep resolution up to date
  useEffect(() => {
    uniforms.current.iResolution.value.set(size.width, size.height);
  }, [size]);

  // animate time
  useFrame(({ clock }) => {
    uniforms.current.iTime.value = clock.getElapsedTime();
  });

  const vert = `
    precision highp float;
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;

  const frag = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform vec4 uColorDark;
    uniform vec4 uColorLight;
    uniform float uSpeed;
    uniform float uPixelSize;
    uniform float uDitherScale;
    uniform float uRotSpeed;
    uniform float uWarpInit;
    uniform float uWarpIter;
    uniform float uWarpAmpl;
    varying vec2 vUv;

    float BAYER_MATRIX[16];
    void initBayer(){
      float m[16];
      m[0]=0.; m[1]=8.;  m[2]=2.;  m[3]=10.;
      m[4]=12.; m[5]=4.;  m[6]=14.; m[7]=6.;
      m[8]=3.; m[9]=11.; m[10]=1.; m[11]=9.;
      m[12]=15.;m[13]=7.; m[14]=13.;m[15]=5.;
      for(int i=0;i<16;i++) BAYER_MATRIX[i] = m[i]/16.;
    }

    vec2 transformUV(vec2 uv){
      float ang = iTime*uSpeed*uRotSpeed;
      uv = mat2(cos(ang),-sin(ang),sin(ang),cos(ang))*(uv-0.5)+0.5;
      float t = iTime*uSpeed;
      for(float i = uWarpInit; i < uWarpIter; i++){
        float inv = 1.0/i;
        vec2 osc = vec2(
          sin(i*0.5 + t*0.25)*cos(t + uv.y*1.5),
          cos(i*0.7 + t*0.35)*sin(t + uv.x*1.2)
        );
        vec2 modl = vec2(
          0.2*sin(t*0.6+uv.y*3.0),
          0.3*cos(t*0.8+uv.x*2.5)
        );
        uv += uWarpAmpl*inv*(osc+modl);
      }
      return uv;
    }

    float getDither(vec2 pos){
      vec2 sc = pos/uPixelSize*uDitherScale;
      int idx = int(mod(sc.x,4.))+int(mod(sc.y,4.))*4;
      return BAYER_MATRIX[idx];
    }

    void main(){
      initBayer();
      vec2 fc = gl_FragCoord.xy;
      vec2 p = floor(fc/uPixelSize)*uPixelSize + uPixelSize*0.5;
      vec2 uv = (2.0*p - iResolution.xy)/min(iResolution.x,iResolution.y);
      uv = transformUV(uv);
      float inten = 0.5 + 0.5*sin(iTime*uSpeed - uv.x - uv.y);
      float thr = getDither(fc);
      gl_FragColor = mix(uColorDark, uColorLight, step(thr,inten));
    }
  `;

  return (
    <mesh ref={mesh} scale={[size.width, size.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms.current} />
    </mesh>
  );
}

export default function Dither({
  colorDark = "#ffffffaa",
  colorLight = "rgba(241,235,207,1)",
  speed = 1,
  pixelSize = 2,
  ditherScale = 1,
  rotSpeed = 0.1,
  warpInit = 1,
  warpIter = 2.1,
  warpAmpl = 3.1,
}: DitherProps) {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      camera={{ position: [0, 0, 2] }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <ShaderPlane
        colorDark={colorDark}
        colorLight={colorLight}
        speed={speed}
        pixelSize={pixelSize}
        ditherScale={ditherScale}
        rotSpeed={rotSpeed}
        warpInit={warpInit}
        warpIter={warpIter}
        warpAmpl={warpAmpl}
      />
    </Canvas>
  );
}
