"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Zap, Users, Calendar, Workflow, Palette, Maximize2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { DesignProjectModal } from "@/components/Portfolio/DesignProjectModal";
import { staggerContainer, staggerItem, viewport, revealLightVariants } from "@/lib/animation";

type Tab = "ai" | "design";

const AI_ICONS: Record<string, React.ReactNode> = {
  "AI Customer Support Agent":           <Zap      className="h-5 w-5" />,
  "Lead Capture & Follow-Up Automation": <Users    className="h-5 w-5" />,
  "AI Appointment Assistant":            <Calendar className="h-5 w-5" />,
  "Automated Business Workflow":         <Workflow className="h-5 w-5" />,
};

// ── Design card thumbnail ─────────────────────────────────────────────────────
function DesignCardVisual({
  project,
}: {
  project: (typeof portfolioData.designProjects)[number];
}) {
  if (project.imagePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.imagePath}
        alt={project.title}
        className="h-full w-full object-cover object-top"
      />
    );
  }

  // Styled placeholder — warm tones kept for the poster content
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#0a0010,#0d0520_50%,#1a0a00)]">
      <div className="absolute bottom-0 left-1/2 h-2/3 w-3/4 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[40px]" />
      <p className="relative z-10 text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-300/70">
        House of God Church
      </p>
      <p className="relative z-10 mt-0.5 text-center text-sm font-black uppercase leading-tight tracking-widest text-white">
        Youth<br />Fellowship
      </p>
      <p className="relative z-10 mt-1 text-2xl font-black uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-orange-400 to-red-600">
        FORGE
      </p>
      <p className="relative z-10 mt-1 text-[9px] italic text-amber-200/60">Romans 12:2</p>
      <div className="relative z-10 mt-2 flex flex-col items-center">
        <div className="h-5 w-0.5 rounded-full bg-amber-300/70" />
        <div className="relative -top-[7px] h-0.5 w-4 rounded-full bg-amber-300/70" />
      </div>
      <div className="relative z-10 mt-2 rounded-md border border-orange-500/20 bg-black/40 px-2 py-1 text-center">
        <p className="text-[9px] font-bold text-amber-300">July 19, 2026</p>
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5 text-[9px] text-white/50">
        <Maximize2 className="h-2.5 w-2.5" /> View
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("ai");
  const [openDesign, setOpenDesign] = useState<
    (typeof portfolioData.designProjects)[number] | null
  >(null);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "ai",     label: "Funnels & Automation", count: portfolioData.projects.length },
    { id: "design", label: "Graphic Design",        count: portfolioData.designProjects.length },
  ];

  return (
    <>
      <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Section header */}
          <motion.div
            variants={revealLightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Projects &amp; Work
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Funnel concepts, automation systems, and graphic design work
              showcasing technical and creative capabilities.
            </p>
          </motion.div>

          {/* Tab filter */}
          <motion.div
            variants={revealLightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-8 inline-flex rounded-full border border-[#24324A] bg-[#0D1628] p-1"
            role="tablist"
            aria-label="Project categories"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-active"
                    className="absolute inset-0 rounded-full bg-blue-500/[0.12] ring-1 ring-blue-500/25"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative flex items-center gap-2 ${activeTab === tab.id ? "text-white" : "text-slate-400"}`}>
                  {tab.id === "ai"     && <Zap     className="h-3.5 w-3.5" />}
                  {tab.id === "design" && <Palette className="h-3.5 w-3.5" />}
                  {tab.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    activeTab === tab.id
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-white/5 text-slate-500"
                  }`}>
                    {tab.count}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Tab panels */}
          <AnimatePresence mode="wait">

            {/* Funnels / AI tab */}
            {activeTab === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 md:grid-cols-2"
                >
                  {portfolioData.projects.map((project) => (
                    <motion.div
                      key={project.title}
                      variants={staggerItem}
                      className="group rounded-2xl border border-[#24324A] bg-[#0D1628] p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/3"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 p-3 text-blue-300">
                          {AI_ICONS[project.title] ?? <Workflow className="h-5 w-5" />}
                        </div>
                        <motion.div
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          whileHover={{ x: 3 }}
                        >
                          <ArrowUpRight className="h-5 w-5 text-blue-300" />
                        </motion.div>
                      </div>

                      <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                      <span className="mb-3 inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300">
                        Concept / Demo
                      </span>

                      <div className="mb-4 space-y-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Problem</p>
                          <p className="mt-1 text-sm text-slate-300">{project.problem}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Solution</p>
                          <p className="mt-1 text-sm text-slate-300">{project.solution}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-slate-500">Workflow</p>
                        <div className="flex flex-wrap items-center gap-1 text-xs">
                          {project.workflow.map((step, i) => (
                            <motion.div
                              key={step}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: i * 0.07 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-1"
                            >
                              <span className="rounded-full bg-blue-500/12 border border-blue-500/20 px-2 py-0.5 text-blue-300">
                                {step}
                              </span>
                              {i < project.workflow.length - 1 && (
                                <span className="text-slate-600">→</span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-slate-500">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <motion.span
                              key={tool}
                              className="rounded-full border border-[#24324A] bg-[#050B18]/60 px-2.5 py-1 text-xs text-slate-300"
                              whileHover={{ scale: 1.05, borderColor: "rgba(37,99,235,0.35)" }}
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <p className="border-t border-[#24324A] pt-4 text-sm text-slate-400">
                        <span className="font-semibold text-blue-300">Result: </span>
                        {project.result}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Design tab */}
            {activeTab === "design" && (
              <motion.div
                key="design"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {portfolioData.designProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={staggerItem}
                      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#24324A] bg-[#0D1628] transition-all duration-300 hover:border-orange-500/30 hover:shadow-[0_24px_60px_rgba(249,115,22,0.10)]"
                      onClick={() => setOpenDesign(project)}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${project.title} case study`}
                      onKeyDown={(e) => e.key === "Enter" && setOpenDesign(project)}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.div
                          className="h-full w-full"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.4 }}
                        >
                          <DesignCardVisual project={project} />
                        </motion.div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                          <span className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                            <Maximize2 className="h-4 w-4" /> View Project
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-1 flex-col p-5">
                        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 text-[11px] font-semibold text-orange-300">
                          <Palette className="h-3 w-3" />
                          {project.category}
                        </span>
                        <h3 className="text-lg font-semibold text-white leading-snug">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#24324A] bg-[#111C30] px-2 py-0.5 text-[10px] text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 transition-colors duration-200 group-hover:text-orange-300">
                            View Case Study
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {openDesign && (
          <DesignProjectModal project={openDesign} onClose={() => setOpenDesign(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
