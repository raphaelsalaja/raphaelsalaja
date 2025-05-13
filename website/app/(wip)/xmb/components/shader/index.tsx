// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import createREGL from "regl";
import { Pane } from "tweakpane";
import { COLOR_NAMES, COLOR_PALETTE, DEFAULT_PARAMS } from "./constants";
import styles from "./styles.module.css";
import { setupCanvas } from "./utils";
import { createDrawCommands } from "./webgl";

export default function Waves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parameters for the animation with defaults
  const paramRef = useRef({ ...DEFAULT_PARAMS });

  // Animation state
  const animationRef = useRef({
    time: 0,
    color: [0, 0, 0],
    colorTransitionTime: 0,
    currentColorIndex: COLOR_NAMES.indexOf(DEFAULT_PARAMS.colorName),
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up the UI controls
    const pane = setupTweakpane();

    // Set up the canvas
    const canvas = setupCanvas(canvasRef.current);

    // Initialize WebGL
    const regl = createREGL({
      canvas: canvas,
      attributes: { antialias: false },
      optionalExtensions: ["EXT_disjoint_timer_query"],
      profile: true,
    });

    // Create draw commands
    const { drawBackground, drawFlow, drawParticles } = createDrawCommands(regl);

    // Start animation loop
    let lastTime = 0;
    const frameHandle = regl.frame(({ time, viewportWidth, viewportHeight }) => {
      // Get current parameters
      const { flowSpeed, backgroundColor, brightness, opacity, particleOpacity, colorCycling, colorCycleSpeed } =
        paramRef.current;

      // Update animation time
      animationRef.current.time += (time - lastTime) * flowSpeed;

      // Handle color cycling
      if (colorCycling) {
        animationRef.current.colorTransitionTime += (time - lastTime) * colorCycleSpeed;

        // Transition to next color
        if (animationRef.current.colorTransitionTime >= 1) {
          animationRef.current.colorTransitionTime = 0;
          animationRef.current.currentColorIndex = (animationRef.current.currentColorIndex + 1) % COLOR_NAMES.length;

          const nextColorName = COLOR_NAMES[animationRef.current.currentColorIndex];
          paramRef.current.colorName = nextColorName;
          paramRef.current.backgroundColor = COLOR_PALETTE[nextColorName];

          // Update the UI if needed
          if (pane?.exportState) {
            const uiState = pane.exportState();
            if (uiState.children) {
              const colorControl = pane.children.find((c) => c.label === "Color");
              if (colorControl) {
                colorControl.value = nextColorName;
              }
            }
          }
        }

        // For smooth transition between colors
        const nextColorIndex = (animationRef.current.currentColorIndex + 1) % COLOR_NAMES.length;
        const currentColor = COLOR_PALETTE[COLOR_NAMES[animationRef.current.currentColorIndex]];
        const nextColor = COLOR_PALETTE[COLOR_NAMES[nextColorIndex]];
        const t = Math.sin((animationRef.current.colorTransitionTime * Math.PI) / 2);

        // Interpolate between current and next color
        const interpolatedColor = [
          currentColor[0] * (1 - t) + nextColor[0] * t,
          currentColor[1] * (1 - t) + nextColor[1] * t,
          currentColor[2] * (1 - t) + nextColor[2] * t,
        ];

        // Apply the interpolated color
        animationRef.current.color = interpolatedColor.map((c) => (c * brightness) / 255);
      } else {
        // Use the selected color without cycling
        animationRef.current.color = backgroundColor.map((c) => (c * brightness) / 255);
      }

      lastTime = time;

      // Calculate aspect ratio
      const ratio = Math.max(1.0, Math.min(viewportWidth / viewportHeight, 2.0)) * 0.375;

      // Prepare draw parameters
      const drawParams = {
        time: animationRef.current.time,
        color: animationRef.current.color,
        opacity,
        ratio,
        particleOpacity,
      };

      // Render everything
      drawBackground(drawParams);
      drawFlow(drawParams);
      drawParticles(drawParams);
    });

    // Clean up on unmount
    return () => {
      frameHandle.cancel();
      regl.destroy();
      pane.dispose();
    };

    // Helper function to set up Tweakpane UI
    function setupTweakpane() {
      const pane = new Pane({ title: "Configuration" });

      pane
        .addBinding(paramRef.current, "colorName", {
          options: {
            Silk: "silk",
            Turquoise: "turquoise",
            Emerald: "emerald",
            Sapphire: "sapphire",
            Gold: "gold",
            Ruby: "ruby",
            Amethyst: "amethyst",
            Amber: "amber",
          },
          label: "Color",
        })
        .on("change", (ev) => {
          paramRef.current.backgroundColor = COLOR_PALETTE[ev.value];
          // Update current color index when manually changed
          animationRef.current.currentColorIndex = COLOR_NAMES.indexOf(ev.value);
        });

      pane.addBinding(paramRef.current, "colorCycling", {
        label: "Auto Color Cycle",
      });

      pane.addBinding(paramRef.current, "colorCycleSpeed", {
        min: 0.01,
        max: 0.5,
        step: 0.01,
        label: "Cycle Speed",
      });

      pane.addBinding(paramRef.current, "flowSpeed", {
        min: 0,
        max: 4,
        step: 0.01,
        label: "Speed",
      });

      pane.addBinding(paramRef.current, "opacity", {
        min: 0,
        max: 1,
        step: 0.01,
        label: "Opacity",
      });

      pane.addBinding(paramRef.current, "brightness", {
        min: 0,
        max: 1,
        step: 0.01,
        label: "Brightness",
      });

      pane.addBinding(paramRef.current, "particleOpacity", {
        min: 0,
        max: 1,
        step: 0.01,
        label: "Particle Opacity",
      });

      // Initialize background color from colorName
      paramRef.current.backgroundColor = COLOR_PALETTE[paramRef.current.colorName];

      return pane;
    }
  }, []);

  return (
    <div className={styles.canvas}>
      <canvas ref={canvasRef} />
    </div>
  );
}
