import React from "react";
import { useMotionValue, useSpring } from "motion/react";

interface MagneticMouseOptions {
  strength?: number;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
  };
  buffer?: number;
}

export const useMagneticMouse = (
  ref: React.RefObject<HTMLElement | null>,
  options?: MagneticMouseOptions
) => {
  const {
    strength = 0.1,
    springConfig = { damping: 20, stiffness: 300, mass: 0.5 },
    buffer = 0,
  } = options || {};

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      const isInsideX =
        clientX >= rect.left - buffer && clientX <= rect.right + buffer;
      const isInsideY =
        clientY >= rect.top - buffer && clientY <= rect.bottom + buffer;

      if (isInsideX && isInsideY) {
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        mouseX.set(x * strength);
        mouseY.set(y * strength);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { springX, springY, handleMouseMove, handleMouseLeave };
};
