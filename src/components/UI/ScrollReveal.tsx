"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants, HTMLMotionProps } from "framer-motion";
import {
  revealVariants,
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  viewport,
  viewportEager,
} from "@/lib/animation";

// ─── ScrollReveal ─────────────────────────────────────────────────────────────

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  /** Custom Framer Motion variants. Defaults to revealVariants. */
  variants?: Variants;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Use a tighter viewport margin (good for elements near the top). */
  eager?: boolean;
  /** Render as a different HTML element. Defaults to "div". */
  as?: keyof typeof motion;
  className?: string;
}

/**
 * Wraps any content and animates it into view when it enters the viewport.
 * Fires once and never replays on subsequent scrolls.
 *
 * @example
 * <ScrollReveal>
 *   <section id="about">…</section>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variants = revealVariants,
  delay = 0,
  eager = false,
  className,
  ...rest
}: ScrollRevealProps) {
  const vp = eager ? viewportEager : viewport;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={
        delay > 0
          ? {
              hidden: variants.hidden!,
              visible: {
                ...(variants.visible as object),
                transition: {
                  ...((variants.visible as { transition?: object })
                    ?.transition ?? {}),
                  delay,
                },
              },
            }
          : variants
      }
      className={className}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerReveal ────────────────────────────────────────────────────────────

interface StaggerRevealProps {
  children: ReactNode;
  /** Use the slower 120 ms stagger for larger card grids. */
  slow?: boolean;
  className?: string;
}

/**
 * Container that staggers its direct children into view.
 * Each child should use `staggerItem` (or `staggerItemX`) variants.
 *
 * @example
 * <StaggerReveal className="grid gap-5 md:grid-cols-3">
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={staggerItem}>…</motion.div>
 *   ))}
 * </StaggerReveal>
 */
export function StaggerReveal({
  children,
  slow = false,
  className,
}: StaggerRevealProps) {
  const container = slow ? staggerContainerSlow : staggerContainer;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Re-export stagger variants for convenience ───────────────────────────────
export { staggerItem };
