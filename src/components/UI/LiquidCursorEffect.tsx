"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GradientPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function LiquidCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gradientRef = useRef<GradientPoint>({ x: 0, y: 0, vx: 0, vy: 0 });
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const opacityRef = useRef(0.6);
  const isActiveRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const splashesRef = useRef<Array<{ x: number; y: number; age: number; maxAge: number }>>([]);
  const isTouchDeviceRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const isTouchable =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0 ||
        ("ontouchstart" in window);
      isTouchDeviceRef.current = isTouchable;
    };

    checkTouchDevice();
    return () => {};
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (prefersReducedMotion || isTouchDeviceRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctxRef.current = ctx;

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [prefersReducedMotion]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update gradient position with spring physics
    const dx = mouseRef.current.x - gradientRef.current.x;
    const dy = mouseRef.current.y - gradientRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0.1) {
      const friction = 0.15;
      const acceleration = 0.05;

      gradientRef.current.vx += (dx * acceleration - gradientRef.current.vx * friction);
      gradientRef.current.vy += (dy * acceleration - gradientRef.current.vy * friction);

      gradientRef.current.x += gradientRef.current.vx;
      gradientRef.current.y += gradientRef.current.vy;
    }

    // Draw main liquid gradient
    const gradient = ctx.createRadialGradient(
      gradientRef.current.x,
      gradientRef.current.y,
      0,
      gradientRef.current.x,
      gradientRef.current.y,
      280
    );

    // Rainbow gradient colors
    const hue = (Date.now() * 0.05) % 360;
    gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${opacityRef.current * 0.4})`);
    gradient.addColorStop(0.3, `hsla(${(hue + 60) % 360}, 100%, 55%, ${opacityRef.current * 0.25})`);
    gradient.addColorStop(0.6, `hsla(${(hue + 120) % 360}, 100%, 50%, ${opacityRef.current * 0.15})`);
    gradient.addColorStop(1, "rgba(100, 200, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw splashes
    splashesRef.current = splashesRef.current.filter((splash) => {
      splash.age += 1;
      const progress = splash.age / splash.maxAge;

      if (progress > 1) return false;

      const scale = progress;
      const opacity = (1 - progress) * opacityRef.current * 0.6;

      const splashGradient = ctx.createRadialGradient(
        splash.x,
        splash.y,
        10,
        splash.x,
        splash.y,
        150 * scale
      );

      splashGradient.addColorStop(0, `hsla(280, 100%, 60%, ${opacity})`);
      splashGradient.addColorStop(0.5, `hsla(200, 100%, 50%, ${opacity * 0.5})`);
      splashGradient.addColorStop(1, "rgba(100, 200, 255, 0)");

      ctx.fillStyle = splashGradient;
      ctx.fillRect(splash.x - 150 * scale, splash.y - 150 * scale, 300 * scale, 300 * scale);

      return true;
    });

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation loop
  useEffect(() => {
    if (prefersReducedMotion || isTouchDeviceRef.current) return;

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, prefersReducedMotion]);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isTouchDeviceRef.current) return;

      mouseRef.current = { x: e.clientX, y: e.clientY };
      isActiveRef.current = true;

      // Fade in
      opacityRef.current = Math.min(opacityRef.current + 0.1, 0.6);

      // Reset inactivity timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      inactivityTimerRef.current = setTimeout(() => {
        isActiveRef.current = false;
      }, 1000);
    },
    [prefersReducedMotion]
  );

  // Mouse click handler (splash effect)
  const handleMouseClick = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isTouchDeviceRef.current) return;

      splashesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 35,
      });
    },
    [prefersReducedMotion]
  );

  // Fade effect during inactivity
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      if (!isActiveRef.current) {
        opacityRef.current = Math.max(opacityRef.current - 0.03, 0);
      } else {
        opacityRef.current = Math.min(opacityRef.current + 0.05, 0.6);
      }
    }, 30);

    return () => clearInterval(fadeInterval);
  }, []);

  // Event listeners
  useEffect(() => {
    if (prefersReducedMotion || isTouchDeviceRef.current) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [handleMouseMove, handleMouseClick, prefersReducedMotion]);

  if (prefersReducedMotion || isTouchDeviceRef.current) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
