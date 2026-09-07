"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NAV_ITEMS = [
  { href: "#projects",  label: "Projects",  id: "projects"  },
  { href: "#skills",    label: "Skills",    id: "skills"    },
  { href: "#services",  label: "Services",  id: "services"  },
  { href: "#contact",   label: "Contact",   id: "contact"   },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export function SiteHeader() {
  const [scrolled,  setScrolled]  = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [activeId,  setActiveId]  = useState<NavId | null>(null);
  const lastY = useRef(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setScrollDir(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();

    const pick = () => {
      for (const id of ids) {
        if (visible.has(id)) { setActiveId(id as NavId); return; }
      }
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          entry.isIntersecting ? visible.add(id) : visible.delete(id);
          pick();
        },
        { threshold: 0.2, rootMargin: "-80px 0px -20% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const pillPy  = scrolled ? (scrollDir === "down" ? "py-2" : "py-2.5") : "py-3";
  const duration = prefersReduced ? 0 : 0.3;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8" role="banner">
      <motion.div
        className="mx-auto max-w-7xl"
        animate={{ paddingTop: scrolled ? "8px" : "16px" }}
        transition={{ duration, ease: "easeOut" }}
      >
        <motion.div
          className={`
            mx-auto flex max-w-7xl items-center justify-between rounded-full
            px-4 ${pillPy} border transition-all
            ${scrolled
              ? "border-blue-500/[0.18] bg-[#050B18]/80 shadow-[0_8px_32px_rgba(5,11,24,0.65)] backdrop-blur-xl"
              : "border-white/[0.08] bg-[#050B18]/70 shadow-[0_20px_45px_rgba(5,11,24,0.30)] backdrop-blur-md"
            }
          `}
          animate={{
            boxShadow: scrolled
              ? "0 8px 32px rgba(5,11,24,0.65), 0 0 0 0.5px rgba(37,99,235,0.12)"
              : "0 20px 45px rgba(5,11,24,0.30)",
          }}
          transition={{ duration, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            animate={{ scale: scrolled ? 0.95 : 1 }}
            transition={{ duration, ease: "easeOut" }}
          >
            {/* Logo circle — blue to orange gradient */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-400 text-sm font-bold text-white shadow-[0_0_16px_rgba(37,99,235,0.35)]"
              aria-label="Logo"
            >
              J
            </div>
            <div className="flex flex-col leading-tight">
              <motion.span
                className="text-sm font-medium uppercase tracking-[0.14em] text-slate-200"
                animate={{ opacity: scrolled && scrollDir === "down" ? 0.7 : 1 }}
                transition={{ duration, ease: "easeOut" }}
              >
                Jay Obedencio
              </motion.span>
              <motion.span
                className="overflow-hidden text-[10px] tracking-[0.08em] text-slate-500"
                animate={{ opacity: scrolled ? 0 : 1, maxHeight: scrolled ? "0px" : "20px" }}
                transition={{ duration, ease: "easeOut" }}
              >
                Funnel Builder • Graphic Designer
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm md:flex" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, id }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200"}
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-blue-500/[0.12] ring-1 ring-blue-500/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA — orange */}
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(249,115,22,0.28)] transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
}
