"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function JayHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY   = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -48]);
  const avatarY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -24]);
  const bgY     = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 32]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8"
    >
      {/* Parallax background — blue + orange brand gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.08),transparent_32%)]"
        aria-hidden="true"
      />

      <motion.div style={{ opacity }} className="mx-auto max-w-7xl">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs font-medium text-blue-300 shadow-[0_0_30px_rgba(37,99,235,0.10)] backdrop-blur-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
          </span>
          Available for projects
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ── Text column ─────────────────────────────────────────────── */}
          <motion.div style={{ y: textY }} className="relative">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-slate-300"
            >
              Hi, I'm Jay <span className="inline-block animate-bounce">👋</span>
            </motion.p>

            {/* Primary role — brand blue */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400"
            >
              Sales Funnel Builder &amp; Graphic Designer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl"
            >
              Sales funnels that turn visitors into customers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              I build conversion-focused funnels and engaging visual designs
              that help businesses attract leads, guide customers, and
              communicate their offers clearly.
            </motion.p>

            {/* CTA row — Orange primary, Blue ghost */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(249,115,22,0.30)] transition-all duration-200 hover:brightness-110"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Build My Funnel <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/8 px-5 py-2.5 text-sm font-medium text-blue-200 transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-500/15"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                View My Designs
              </motion.a>
            </motion.div>

            {/* Specialty pills */}
            <motion.div
              className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.65 },
                },
              }}
            >
              {[
                "Sales Funnels",
                "Landing Pages",
                "Lead Generation",
                "Graphic Design",
                "Automation",
              ].map((item) => (
                <motion.span
                  key={item}
                  className="rounded-full border border-blue-500/20 bg-blue-500/6 px-3 py-1.5 text-slate-300 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/12 hover:text-white"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Avatar column ─────────────────────────────────────────────── */}
          <motion.div
            style={{ y: avatarY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="relative h-[360px] w-[360px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,22,40,0.85),rgba(5,11,24,0.95))] p-5 shadow-[0_30px_90px_rgba(5,11,24,0.9)]"
            >
              {/* Blue glow ring */}
              <div className="absolute inset-6 rounded-[1.6rem] border border-blue-500/20 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),transparent_42%),linear-gradient(180deg,rgba(13,22,40,0.4),rgba(5,11,24,0.7))]" />
              {/* Orb blur — blue + orange */}
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.75),_rgba(249,115,22,0.40)_45%,_rgba(5,11,24,0.1)_75%)] blur-[22px]"
              />
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 7, 0] }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="relative z-10 flex h-full w-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,30,0.85),rgba(5,11,24,0.92))]"
              >
                <video
                  autoPlay loop muted playsInline
                  className="h-full w-full rounded-[1.4rem] object-cover"
                  aria-label="Jay Obedencio avatar"
                >
                  <source src="/avatar.mp4" type="video/mp4" />
                  Your browser doesn't support HTML5 video.
                </video>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
