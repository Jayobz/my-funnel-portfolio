"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Thin scroll-progress bar fixed to the very top of the viewport.
 * Brand gradient: Electric Blue → Vibrant Orange
 */
export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
      style={{
        scaleX,
        /* Blue → Orange brand gradient */
        background: "linear-gradient(90deg, #2563EB 0%, #3B82F6 40%, #F97316 80%, #FBBF24 100%)",
      }}
    />
  );
}
