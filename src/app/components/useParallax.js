"use client";
import { useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

export function useParallaxMouse(stiffness = 100, damping = 28) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness, damping, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness, damping, mass: 0.5 });

  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { springX, springY, onMouseMove, onMouseLeave };
}
