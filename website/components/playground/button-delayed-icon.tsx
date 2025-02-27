"use client";

import Button from "@rs/design/button";
import { Showcase } from "@/components/showcase";
import type { Transition } from "motion/react";
import { useState } from "react";

export default function DelayedButton() {
  const [variant, setVariant] = useState<string>("Primary");
  const [state, setState] = useState<string>("Default");

  const [transition, setTransition] = useState<Transition>({
    type: "tween",
    ease: "easeInOut",
    duration: 0.2,
    damping: 10,
    stiffness: 100,
    mass: 1,
  });

  return (
    <Showcase
      options={[
        {
          label: "Variant",
          values: ["Primary", "Secondary", "Tertiary", "Accent", "Destructive", "Warning"],
          onChange: (value: string) => {
            setVariant(value);
          },
        },
        {
          label: "State",
          values: ["Default", "Disabled", "Focused"],
          onChange: (value: string) => {
            setState(value);
          },
        },
        {
          label: "Transition",
          values: transition,
          onChange: (value: Transition) => {
            setTransition(value);
          },
        },
      ]}
    >
      <Button
        asMotion
        // variant={variant.toLowerCase()}
        disabled={state === "Disabled"}
        focused={state === "Focused"}
        whileTap={{
          scale: 0.95,
        }}
        transition={transition}
      >
        Lorem Ipsum
      </Button>
    </Showcase>
  );
}
