/**
 * Centralized animation system
 * All durations, easings, and Framer Motion variants live here.
 * Import from this file rather than defining inline variants.
 */

import type { Variants, Transition } from "framer-motion";

// ─── Easings ──────────────────────────────────────────────────────────────────

export const ease = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  out: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  in: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
  spring: { type: "spring", stiffness: 260, damping: 24 } as Transition,
} as const;

// ─── Durations (seconds) ──────────────────────────────────────────────────────

export const dur = {
  fast: 0.22,
  base: 0.42,
  slow: 0.65,
  verySlow: 0.85,
} as const;

// ─── Shared transitions ───────────────────────────────────────────────────────

export const transition = {
  base: { duration: dur.base, ease: ease.smooth } satisfies Transition,
  fast: { duration: dur.fast, ease: ease.smooth } satisfies Transition,
  slow: { duration: dur.slow, ease: ease.smooth } satisfies Transition,
  spring: ease.spring,
} as const;

// ─── Page-level entrance ──────────────────────────────────────────────────────

/** Wraps `<main>` — page loads with a soft fade + rise. */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease: ease.smooth },
  },
};

// ─── Scroll-reveal (section level) ───────────────────────────────────────────

/** Standard section entrance: fade + rise + scale. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: dur.slow, ease: ease.smooth },
  },
};

/** Lighter reveal for elements already near the top / short sections. */
export const revealLightVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: ease.smooth },
  },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

/** Parent that staggers its direct children 80 ms apart. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Slower stagger — 120 ms — for larger cards or fewer items. */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/** Child item used inside stagger containers. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: dur.base, ease: ease.smooth },
  },
};

/** Horizontal slide-in child (for list items). */
export const staggerItemX: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: dur.fast, ease: ease.smooth },
  },
};

// ─── Heading reveal ───────────────────────────────────────────────────────────

export const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease: ease.out },
  },
};

// ─── Card hover ───────────────────────────────────────────────────────────────

/** Standard whileHover / whileTap for interactive cards. */
export const cardHover = {
  whileHover: { y: -4, scale: 1.012, transition: transition.fast },
  whileTap: { scale: 0.975, transition: transition.fast },
} as const;

/** Button micro-interaction. */
export const buttonHover = {
  whileHover: { scale: 1.04, transition: transition.fast },
  whileTap: { scale: 0.96, transition: transition.fast },
} as const;

// ─── Viewport defaults ────────────────────────────────────────────────────────

/** Standard viewport config: animate once, 15 % margin. */
export const viewport = {
  once: true,
  margin: "-15% 0px",
} as const;

/** Tighter viewport for short sections. */
export const viewportEager = {
  once: true,
  margin: "-8% 0px",
} as const;
