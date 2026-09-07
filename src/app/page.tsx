"use client";

import { motion } from "framer-motion";
import { ArrowRight, Image, Zap, Gauge, ChevronRight } from "lucide-react";
import { JayHero } from "@/components/Hero/JayHero";
import { ProjectsSection } from "@/components/Portfolio/ProjectsSection";
import { ContactSection } from "@/components/Portfolio/ContactSection";
import { ResumeSection } from "@/components/Portfolio/ResumeSection";
import { portfolioData } from "@/data/portfolio";
import { SiteHeader } from "@/components/UI/SiteHeader";
import { ScrollReveal, StaggerReveal, staggerItem } from "@/components/UI/ScrollReveal";
import {
  pageVariants,
  headingVariants,
  staggerItemX,
  cardHover,
  buttonHover,
  revealLightVariants,
  staggerContainer,
} from "@/lib/animation";

// ── Funnel process steps ──────────────────────────────────────────────────────
const FUNNEL_STEPS = [
  { n: "01", title: "Discover",  desc: "Understand the business, audience, offer, and goal." },
  { n: "02", title: "Plan",      desc: "Create the funnel structure and customer journey." },
  { n: "03", title: "Design",    desc: "Design landing pages and conversion-focused visuals." },
  { n: "04", title: "Build",     desc: "Build the funnel pages and lead capture system." },
  { n: "05", title: "Connect",   desc: "Connect forms, CRM, email, automation, and required tools." },
  { n: "06", title: "Test",      desc: "Test the complete customer journey end to end." },
  { n: "07", title: "Optimize",  desc: "Improve the funnel experience and conversion opportunities." },
];

const DESIGN_STEPS = [
  { n: "01", title: "Concept",   desc: "Understand the purpose and message." },
  { n: "02", title: "Direction", desc: "Choose the visual style, typography, and composition." },
  { n: "03", title: "Design",    desc: "Create the visual layout." },
  { n: "04", title: "Refine",    desc: "Improve hierarchy, spacing, and readability." },
  { n: "05", title: "Finalize",  desc: "Prepare the final design for its intended use." },
];

// ── Client discovery options ──────────────────────────────────────────────────
const DISCOVERY_OPTIONS = [
  { label: "I need a sales funnel",       rec: "Sales Funnel Building",  href: "#contact"  },
  { label: "I need a landing page",       rec: "Landing Page Design",    href: "#contact"  },
  { label: "I need more leads",           rec: "Lead Generation Funnel", href: "#contact"  },
  { label: "I need graphic design",       rec: "Graphic Design",         href: "#projects" },
  { label: "I need a promotional poster", rec: "Event Poster Design",    href: "#projects" },
  { label: "I need automation",           rec: "Funnel Automation",      href: "#contact"  },
];

export default function Home() {
  return (
    <motion.main
      className="min-h-screen bg-[#050B18] text-white"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Skip to content */}
      <a
        href="#about"
        className="absolute -top-14 left-0 z-50 rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white focus:top-0"
      >
        Skip to main content
      </a>

      <SiteHeader />
      <div className="h-20" aria-hidden="true" />
      <JayHero />

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-0 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-blue-600/6 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-orange-500/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">

            {/* ── LEFT: Photo card ───────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="flex flex-col items-center lg:items-start"
            >
              {/* Card */}
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D1628] shadow-[0_32px_80px_rgba(5,11,24,0.85)]"
              >
                {/* Top glow inside card */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-orange-500/10 to-transparent"
                />
                {/* Orange accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />

                {/* Photo */}
                <div className="relative overflow-hidden">
                  <img
                    src="/images/projects/person.png"
                    alt="Jay Obedencio — graduation photo"
                    className="h-[360px] w-full object-cover object-top"
                  />
                  {/* Subtle bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0D1628] to-transparent" />
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2 px-5 pb-5 pt-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                      Sales Funnel Builder
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      Graphic Designer
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Decorative dots below card */}
              <div aria-hidden="true" className="mt-6 hidden gap-1.5 lg:flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-slate-600"
                    style={{ opacity: 1 - i * 0.18 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Content ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-8">

              {/* Label + headline */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.08 }}
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">
                  About Me
                </p>
                {/* Orange accent bar */}
                <div className="mb-5 h-px w-12 bg-gradient-to-r from-orange-500 to-transparent" />
                <h2 className="text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl">
                  Funnels that{" "}
                  <span className="text-orange-400">convert.</span>
                  <br />
                  Designs that communicate.
                </h2>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                className="max-w-lg space-y-4 text-[15px] leading-7 text-slate-300"
              >
                <p>
                  I am an Information Technology graduate with experience in IT
                  support, graphic design, UI/UX design, and technical support. I
                  specialize in building sales funnels and creating professional
                  graphic designs for businesses and organizations.
                </p>
                <p>
                  I help businesses attract leads, guide customers through a clear
                  customer journey, and communicate their offers visually — from
                  landing pages and lead generation funnels to event posters and
                  promotional materials.
                </p>
              </motion.div>

              {/* What I Do cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
                className="grid gap-3 sm:grid-cols-3"
              >
                {[
                  {
                    n: "01",
                    title: "Sales Funnels",
                    desc: "Building clear, conversion-focused customer journeys.",
                    accent: "border-orange-500/25 hover:border-orange-400/50",
                    dot: "bg-orange-400",
                  },
                  {
                    n: "02",
                    title: "Landing Pages",
                    desc: "Creating clean pages designed to communicate offers.",
                    accent: "border-blue-500/20 hover:border-blue-400/45",
                    dot: "bg-blue-400",
                  },
                  {
                    n: "03",
                    title: "Graphic Design",
                    desc: "Creating professional visuals for brands and businesses.",
                    accent: "border-white/8 hover:border-white/20",
                    dot: "bg-slate-400",
                  },
                ].map((card) => (
                  <motion.div
                    key={card.n}
                    variants={staggerItem}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`rounded-[1.2rem] border bg-white/[0.03] p-4 backdrop-blur-sm transition-colors duration-300 ${card.accent}`}
                  >
                    <span className="mb-3 block text-[11px] font-bold tracking-[0.18em] text-slate-500">
                      {card.n}
                    </span>
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${card.dot}`} />
                      <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                    </div>
                    <p className="text-xs leading-5 text-slate-400">{card.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <p className="text-sm font-medium text-slate-400 sm:mr-2">
                  Let&rsquo;s build something that converts.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
                  >
                    View My Work
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(249,115,22,0.35)" }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-200"
                  >
                    Let&rsquo;s Work Together
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Client Discovery ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-10 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                Start Here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                What do you need?
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Select what fits best and I'll point you to the right solution.
              </p>
            </motion.div>

            <StaggerReveal slow className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DISCOVERY_OPTIONS.map((opt) => (
                <motion.a
                  key={opt.label}
                  href={opt.href}
                  variants={staggerItem}
                  {...cardHover}
                  className="group flex flex-col gap-3 rounded-2xl border border-[#24324A] bg-[#0D1628] p-5 transition-colors duration-300 hover:border-blue-500/40 hover:bg-blue-500/5"
                >
                  <span className="text-sm font-semibold text-white">{opt.label}</span>
                  <span className="flex items-center gap-1.5 text-xs text-orange-400">
                    <ChevronRight className="h-3 w-3" />
                    Recommended: {opt.rec}
                  </span>
                </motion.a>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-10 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Services
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Two specializations. One focused portfolio.
              </h2>
            </motion.div>

            {/* Primary service cards */}
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              {/* Funnels — Blue */}
              <ScrollReveal variants={revealLightVariants} delay={0.05}>
                <div className="h-full rounded-[1.8rem] border border-blue-500/25 bg-blue-500/5 p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-blue-400/15 text-blue-300">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-white">Sales Funnel Building</h3>
                  <p className="mb-5 text-sm leading-7 text-slate-300">
                    I create structured customer journeys that guide visitors
                    from first interaction to lead, booking, or purchase.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {["Landing Pages", "Lead Generation Funnels", "Sales Funnels", "Booking Funnels", "Lead Capture", "Thank You Pages", "Funnel Strategy"].map((s) => (
                      <li key={s} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Design — Orange accent */}
              <ScrollReveal variants={revealLightVariants} delay={0.1}>
                <div className="h-full rounded-[1.8rem] border border-orange-500/20 bg-orange-500/4 p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/25 to-amber-400/15 text-orange-300">
                    <Image className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-white">Graphic Design</h3>
                  <p className="mb-5 text-sm leading-7 text-slate-300">
                    I create visual designs that communicate ideas clearly and
                    help businesses, organizations, and events present
                    themselves professionally.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {["Event Posters", "Social Media Graphics", "Promotional Materials", "Marketing Graphics", "Typography", "Layout Design", "Visual Communication", "Branding Support"].map((s) => (
                      <li key={s} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Supporting service cards */}
            <StaggerReveal slow className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {portfolioData.services
                .filter((s) => s.category === "supporting")
                .slice(0, 4)
                .map((service) => (
                  <motion.div
                    key={service.title}
                    variants={staggerItem}
                    {...cardHover}
                    className="rounded-[1.5rem] border border-[#24324A] bg-[#0D1628] p-5 hover:border-blue-500/25 transition-colors duration-300"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-400/10 text-blue-300">
                      <Zap className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{service.text}</p>
                  </motion.div>
                ))}
            </StaggerReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Skills ─────────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-10 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Skills
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Funnels, design, and the tech to connect them.
              </h2>
            </motion.div>

            <StaggerReveal slow className="grid gap-5 md:grid-cols-3">
              {[
                { title: "Sales Funnels",     dotColor: "bg-blue-400",   border: "border-blue-500/20   hover:border-blue-400/40",   items: portfolioData.skills.funnels   },
                { title: "Graphic Design",    dotColor: "bg-orange-400", border: "border-orange-500/20 hover:border-orange-400/40", items: portfolioData.skills.design    },
                { title: "Supporting Skills", dotColor: "bg-slate-400",  border: "border-[#24324A]     hover:border-slate-500/40",  items: portfolioData.skills.supporting },
              ].map((group) => (
                <motion.div
                  key={group.title}
                  variants={staggerItem}
                  className={`rounded-[1.6rem] border bg-[#0D1628] p-6 transition-colors duration-300 ${group.border}`}
                >
                  <h3 className="mb-4 text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${group.dotColor}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Funnel Process ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-12 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">My Process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                My Funnel Building Process
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="relative grid gap-4 md:grid-cols-7"
            >
              {FUNNEL_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={staggerItem}
                  className="relative flex flex-col items-center text-center"
                >
                  {i < FUNNEL_STEPS.length - 1 && (
                    <div className="absolute right-0 top-5 hidden w-full translate-x-1/2 text-blue-500/30 md:block">
                      <ChevronRight className="mx-auto h-4 w-4" />
                    </div>
                  )}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-300">
                    {step.n}
                  </div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Design Process ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              className="mb-12 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">My Process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                My Design Process
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="relative grid gap-4 md:grid-cols-5"
            >
              {DESIGN_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={staggerItem}
                  className="relative flex flex-col items-center text-center"
                >
                  {i < DESIGN_STEPS.length - 1 && (
                    <div className="absolute right-0 top-5 hidden w-full translate-x-1/2 text-orange-500/30 md:block">
                      <ChevronRight className="mx-auto h-4 w-4" />
                    </div>
                  )}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-bold text-orange-300">
                    {step.n}
                  </div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Featured Projects ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section id="featured" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-10 flex items-end justify-between gap-4"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Projects</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  Funnels, designs &amp; digital experiences.
                </h2>
                <p className="mt-3 text-lg text-slate-400">
                  A collection of funnel concepts, visual designs, and digital projects.
                </p>
              </div>
              <motion.a
                href="#contact"
                className="hidden items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 md:inline-flex"
                {...buttonHover}
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            <StaggerReveal slow className="grid gap-5 md:grid-cols-2">
              {portfolioData.projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  variants={staggerItem}
                  {...cardHover}
                  className="group rounded-[1.8rem] border border-[#24324A] bg-[#0D1628] p-5 cursor-default hover:border-blue-500/35 hover:shadow-[0_30px_80px_rgba(37,99,235,0.08)] transition-colors duration-300"
                >
                  <div className="mb-4 h-44 rounded-[1.2rem] border border-[#24324A] bg-[linear-gradient(135deg,rgba(37,99,235,0.15),rgba(249,115,22,0.06),rgba(5,11,24,0.8))] p-4">
                    <div className="flex h-full items-end justify-between rounded-[0.9rem] border border-white/5 bg-[#050B18]/50 p-4">
                      <span className="text-sm uppercase tracking-[0.15em] text-slate-400">
                        0{index + 1}
                      </span>
                      {project.category && (
                        <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blue-300">
                          {project.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.problem}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#24324A] bg-[#050B18]/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Tool Stack ──────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#24324A] bg-[#0D1628] p-6 md:p-10">
            <motion.div
              className="mb-8 flex items-center justify-between gap-4"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Tool Stack</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Tools I use and am learning.
                </h2>
              </div>
              <Gauge className="h-8 w-8 text-orange-400" />
            </motion.div>

            <StaggerReveal className="grid gap-6 md:grid-cols-2">
              {[
                { title: "Experienced / Familiar With", items: portfolioData.tools.experienced },
                { title: "Currently Learning",          items: portfolioData.tools.learning },
              ].map((group) => (
                <motion.div
                  key={group.title}
                  variants={staggerItem}
                  className="rounded-[1.5rem] border border-[#24324A] bg-[#050B18]/60 p-5"
                >
                  <h3 className="mb-4 text-lg font-semibold text-white">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tool) => (
                      <motion.span
                        key={tool}
                        className="rounded-full border border-[#24324A] bg-[#111C30] px-3 py-1.5 text-xs text-slate-300 transition-colors duration-200 hover:border-blue-500/35 hover:bg-blue-500/8 hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Experience ──────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-10 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Experience</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                IT background with a growing creative and technical skill set.
              </h2>
            </motion.div>

            <ScrollReveal variants={revealLightVariants} delay={0.1}>
              <div className="rounded-[2rem] border border-[#24324A] bg-[#0D1628] p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Role</p>
                    <h3 className="text-2xl font-semibold text-white">IT Intern</h3>
                  </div>
                  <div className="rounded-full border border-[#24324A] bg-[#050B18]/60 px-3 py-1.5 text-sm text-slate-400">
                    {portfolioData.experience[0].company}
                  </div>
                </div>

                <StaggerReveal className="grid gap-3 md:grid-cols-2">
                  {portfolioData.experience[0].bullets.map((item) => (
                    <motion.li
                      key={item}
                      variants={staggerItemX}
                      className="flex items-start gap-3 text-sm leading-7 text-slate-300 list-none"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                      {item}
                    </motion.li>
                  ))}
                </StaggerReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      <ProjectsSection />
      <ResumeSection />
      <ContactSection />

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <ScrollReveal variants={revealLightVariants}>
        <footer className="border-t border-[#24324A] px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © 2026 Jay Obedencio · Sales Funnel Builder &amp; Graphic Designer · Philippines
        </footer>
      </ScrollReveal>
    </motion.main>
  );
}
