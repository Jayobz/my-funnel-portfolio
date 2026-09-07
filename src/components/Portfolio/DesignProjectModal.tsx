"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import {
  revealLightVariants,
  staggerContainer,
  staggerItem,
  viewport,
} from "@/lib/animation";

type DesignProject = (typeof portfolioData.designProjects)[number];

// ─── Poster visual ─────────────────────────────────────────────────────────────
// Shows the real image when imagePath is set, otherwise a rich styled placeholder.

function PosterVisual({
  project,
  onClick,
  className = "",
  fit = "cover",
}: {
  project: DesignProject;
  onClick?: () => void;
  className?: string;
  /** object-fit for the real image. Use "contain" in the fullscreen viewer. */
  fit?: "cover" | "contain";
}) {
  if (project.imagePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.imagePath}
        alt={project.title}
        onClick={onClick}
        className={`w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${onClick ? "cursor-zoom-in" : ""} ${className}`}
      />
    );
  }

  // Styled placeholder that reflects the poster's visual language
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      aria-label={onClick ? "View full-size poster" : undefined}
      className={`
        relative flex flex-col items-center justify-center overflow-hidden
        bg-[linear-gradient(160deg,#0a0010_0%,#0d0520_40%,#1a0a00_100%)]
        select-none
        ${onClick ? "cursor-zoom-in" : ""}
        ${className}
      `}
    >
      {/* Ambient fire glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1/2 w-3/4 rounded-full bg-orange-600/20 blur-[60px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1/3 w-1/2 rounded-full bg-amber-500/25 blur-[40px]" />

      {/* Top label */}
      <p className="relative z-10 mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80">
        House of God Church
      </p>

      {/* YOUTH FELLOWSHIP */}
      <h2 className="relative z-10 text-center text-2xl font-black uppercase leading-tight tracking-[0.12em] text-white drop-shadow-[0_0_18px_rgba(251,191,36,0.5)] sm:text-3xl">
        Youth<br />Fellowship
      </h2>

      {/* FORGE */}
      <p className="relative z-10 mt-1 text-5xl font-black uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-orange-400 to-red-600 drop-shadow-[0_0_24px_rgba(234,88,12,0.7)] sm:text-6xl">
        FORGE
      </p>

      {/* Verse */}
      <p className="relative z-10 mt-3 text-[11px] font-medium italic text-amber-200/70">
        Romans 12:2
      </p>

      {/* Cross symbol */}
      <div className="relative z-10 mt-4 flex flex-col items-center gap-0">
        <div className="h-10 w-1 rounded-full bg-gradient-to-b from-amber-300/90 to-orange-600/60" />
        <div className="relative -top-[14px] h-1 w-7 rounded-full bg-gradient-to-r from-transparent via-amber-300/90 to-transparent" />
      </div>

      {/* Event info strip */}
      <div className="relative z-10 mt-4 rounded-lg border border-orange-500/20 bg-black/40 px-4 py-2 text-center backdrop-blur-sm">
        <p className="text-xs font-bold text-amber-300">July 19, 2026 · 2:30 PM</p>
        <p className="mt-0.5 text-[10px] text-slate-300">Free Snacks</p>
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Click hint */}
      {onClick && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white/60 backdrop-blur-sm">
          <Maximize2 className="h-3 w-3" />
          View full size
        </div>
      )}
    </div>
  );
}

// ─── Fullscreen image viewer ───────────────────────────────────────────────────

function FullscreenViewer({
  project,
  onClose,
}: {
  project: DesignProject;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const MIN = 0.5;
  const MAX = 4;

  const zoomIn  = () => setZoom((z) => Math.min(z + 0.4, MAX));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.4, MIN));
  const reset   = () => setZoom(1);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-md"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <p className="text-sm font-medium text-white/70">{project.title}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={zoom <= MIN}
            aria-label="Zoom out"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={reset}
            aria-label="Reset zoom"
            className="flex h-8 items-center justify-center rounded-lg bg-white/5 px-3 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="mr-1.5 h-3 w-3" />
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={zoom >= MAX}
            aria-label="Zoom in"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <div className="mx-1 h-5 w-px bg-white/10" />
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/70 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="flex flex-1 overflow-auto">
        <div className="m-auto p-4">
          <motion.div
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ transformOrigin: "center center" }}
          >
            <PosterVisual
              project={project}
              className="max-h-[75vh] w-auto rounded-xl shadow-2xl"
              fit="contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="py-2 text-center text-[11px] text-white/30">
        +/- to zoom · 0 to reset · Esc to close
      </p>
    </motion.div>
  );
}

// ─── Process timeline ──────────────────────────────────────────────────────────

function ProcessTimeline({ steps }: { steps: string[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="relative"
    >
      {/* Vertical line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/60 via-amber-400/40 to-transparent" />

      <div className="space-y-4 pl-8">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            variants={staggerItem}
            className="relative flex items-center gap-3"
          >
            {/* Dot */}
            <div className="absolute -left-8 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10">
              <span className="text-[9px] font-bold text-orange-400">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white">
              {step}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="absolute -left-[14px] bottom-[-18px] h-3.5 w-3.5 rotate-90 text-orange-500/40" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="text-xs font-bold tracking-[0.2em] text-orange-400/70">
        {number}
      </span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
  );
}

// ─── Main modal ────────────────────────────────────────────────────────────────

export function DesignProjectModal({
  project,
  onClose,
}: {
  project: DesignProject;
  onClose: () => void;
}) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !viewerOpen) onClose();
    },
    [onClose, viewerOpen]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      {/* ── Backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="fixed inset-x-4 bottom-0 top-16 z-[110] mx-auto flex max-w-4xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#080d18] shadow-2xl sm:inset-x-6 md:inset-x-8 lg:inset-x-auto lg:left-1/2 lg:right-auto lg:w-full lg:-translate-x-1/2"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close project"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          {/* ── Hero poster + meta ── */}
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <PosterVisual
                project={project}
                onClick={() => setViewerOpen(true)}
                className="h-64 lg:h-full lg:min-h-[420px]"
              />
            </motion.div>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col justify-center p-8"
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/20">
                {project.category}
              </span>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
                {project.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {project.description}
              </p>

              {/* Event quick-facts */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Theme",   value: project.event.theme   },
                  { label: "Date",    value: project.event.date    },
                  { label: "Time",    value: project.event.time    },
                  { label: "Speaker", value: project.event.speaker },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-0.5 font-medium text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setViewerOpen(true)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400 active:scale-95"
              >
                <Maximize2 className="h-4 w-4" />
                View Full Poster
              </button>
            </motion.div>
          </div>

          {/* ── Case study body ── */}
          <div className="space-y-14 px-6 py-12 md:px-10">

            {/* 01 — Overview */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="01 —" title="Overview" />
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                {project.overview}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
                {[
                  { label: "Church",   value: project.event.church   },
                  { label: "Location", value: project.event.location },
                  { label: "Perks",    value: project.event.perks    },
                  { label: "Contact",  value: project.event.contact  },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-xs font-medium text-white break-words">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 02 — Objective */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="02 —" title="The Objective" />
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="space-y-3"
              >
                {project.objective.map((item) => (
                  <motion.li
                    key={item}
                    variants={staggerItem}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* 03 — Design Concept */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="03 —" title="Design Concept" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid gap-4 sm:grid-cols-2"
              >
                {project.designConcept.map(({ element, meaning }) => (
                  <motion.div
                    key={element}
                    variants={staggerItem}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-orange-500/20"
                  >
                    <p className="mb-1.5 text-sm font-semibold text-orange-300">
                      {element}
                    </p>
                    <p className="text-sm leading-6 text-slate-400">{meaning}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* 04 — Design Process */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="04 —" title="Design Process" />
              <ProcessTimeline steps={project.process} />
            </motion.div>

            {/* 05 — My Role */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="05 —" title="My Role" />
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <p className="mb-4 text-lg font-semibold text-white">
                  {project.role.title}
                </p>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {project.role.responsibilities.map((r) => (
                    <motion.li
                      key={r}
                      variants={staggerItem}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {r}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* 06 — Skills */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="06 —" title="Design Skills" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex flex-wrap gap-2.5"
              >
                {project.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={staggerItem}
                    className="rounded-full border border-orange-500/25 bg-orange-500/8 px-4 py-2 text-sm font-medium text-orange-200"
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* 07 — Tools */}
            <motion.div
              variants={revealLightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading number="07 —" title="Tools Used" />
              {project.tools.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="flex flex-wrap gap-3"
                >
                  {project.tools.map((tool) => (
                    <motion.span
                      key={tool}
                      variants={staggerItem}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-200"
                      whileHover={{ scale: 1.05, borderColor: "rgba(251,191,36,0.3)" }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Tools used — to be added. Update the{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-slate-400">
                    tools
                  </code>{" "}
                  array in <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-slate-400">src/data/portfolio.ts</code>.
                </p>
              )}
              <p className="mt-3 text-xs text-slate-500">
                * Tools listed are based on available information and may be updated.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ── Fullscreen viewer ── */}
      <AnimatePresence>
        {viewerOpen && (
          <FullscreenViewer
            project={project}
            onClose={() => setViewerOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
