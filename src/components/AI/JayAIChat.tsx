"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Bot, BriefcaseBusiness, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { AIAvatar } from "@/components/AI/AIAvatar";
import { ClientDiscoveryAgent } from "@/components/AI/ClientDiscoveryAgent";
import type { AvatarState } from "@/components/AI/AIAvatar";
import type { ClientDiscoveryAnswers } from "@/components/AI/ClientDiscoveryAgent";

const quickPrompts = [
  "I need a sales funnel.",
  "I need a landing page.",
  "I need more leads.",
  "I need a promotional design.",
  "Show me Jay's design projects.",
  "What services does Jay offer?",
];

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

type PanelKey =
  | "about"
  | "skills"
  | "projects"
  | "tools"
  | "experience"
  | "services"
  | "contact"
  | "automation"
  | "none";

export function JayAIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm Jay AI. I can help you explore Jay's funnel-building and graphic design services. What are you looking to create?",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [activePanel, setActivePanel] = useState<PanelKey>("about");
  const [showDiscovery, setShowDiscovery] = useState(false);

  const handleSubmit = async (value?: string) => {
    const trimmed = (value ?? input).trim();
    if (!trimmed || thinking) return;

    // Trigger client discovery for funnel/business inquiries
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("automate my") ||
      lower.includes("consultation") ||
      lower.includes("help my business") ||
      lower.includes("need automation") ||
      lower.includes("need a funnel") ||
      lower.includes("need a landing page") ||
      lower.includes("need more leads") ||
      lower.includes("need leads") ||
      lower.includes("build my funnel") ||
      lower.includes("start a project")
    ) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text: trimmed },
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Great! Let me help you figure out what you need. I'll ask a few quick questions to identify the best solution for your business.",
        },
      ]);
      setInput("");
      setShowDiscovery(true);
      return;
    }

    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: trimmed }]);
    setInput("");
    setThinking(true);
    setAvatarState("thinking");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = (await response.json()) as {
        reply?: string;
        panel?: string;
        error?: string;
      };

      const reply = data.reply || "I'm not sure how to respond to that. Please try another question.";
      const panel = (data.panel as PanelKey) || "about";

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: reply }]);
      setActivePanel(panel);
      setAvatarState("responding");
      
      // Return to idle after response
      setTimeout(() => {
        setAvatarState("idle");
      }, 2500);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setAvatarState("idle");
    } finally {
      setThinking(false);
    }
  };

  const handleDiscoveryComplete = (answers: ClientDiscoveryAnswers) => {
    setShowDiscovery(false);
    const summary = `I've gathered information about your automation opportunity:
- Business: ${answers.businessType}
- Process: ${answers.process}
- Tools: ${answers.tools}
- Key Tasks: ${answers.repetitiveTasks}
- Team Size: ${answers.peopleInvolved}
- Desired Outcome: ${answers.desiredOutcome}

This is a great opportunity for automation! You should talk to Jay directly about this project to discuss implementation details and timeline.`;
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "bot",
        text: summary,
      },
    ]);
    setActivePanel("contact");
  };

  const panelContent = useMemo(() => {
    switch (activePanel) {
      case "skills":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-4 md:grid-cols-3"
          >
            {[
              { title: "Sales Funnels", items: portfolioData.skills.funnels },
              { title: "Graphic Design", items: portfolioData.skills.design },
              { title: "Supporting", items: portfolioData.skills.supporting },
            ].map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 hover:border-emerald-400/20 transition-all duration-300"
              >
                <h4 className="mb-3 font-semibold text-white">{group.title}</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        );
      case "projects":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-4 md:grid-cols-2"
          >
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group rounded-2xl border border-white/10 bg-slate-950/40 p-4 hover:border-emerald-400/20 hover:bg-slate-950/60 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-semibold text-white">{project.title}</h4>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100"
                    whileHover={{ x: 3 }}
                  >
                    <ArrowUpRight className="h-4 w-4 text-sky-300" />
                  </motion.div>
                </div>
                <p className="mb-3 text-sm text-slate-300">{project.solution}</p>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                >
                  {project.tools.map((tool) => (
                    <motion.span
                      key={tool}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-slate-300"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        );
      case "tools":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-4 md:grid-cols-2"
          >
            {[
              { title: "Experienced / Familiar With", items: portfolioData.tools.experienced },
              { title: "Currently Learning", items: portfolioData.tools.learning },
            ].map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 hover:border-emerald-400/20 transition-all duration-300"
              >
                <h4 className="mb-3 font-semibold text-white">{group.title}</h4>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.03 }
                    }
                  }}
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-200"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        );
      case "experience":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
          >
            <h4 className="mb-1 text-white font-semibold">{portfolioData.experience[0].role}</h4>
            <p className="mb-4 text-sm text-slate-400">{portfolioData.experience[0].company}</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {portfolioData.experience[0].bullets.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      case "services":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-3 md:grid-cols-2"
          >
            {portfolioData.services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 hover:border-emerald-400/20 hover:bg-slate-950/60 transition-all duration-300"
              >
                <h4 className="mb-2 text-white font-semibold">{service.title}</h4>
                <p className="text-sm text-slate-300">{service.text}</p>
              </motion.div>
            ))}
          </motion.div>
        );
      case "contact":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4"
          >
            <h4 className="mb-3 text-white font-semibold">Contact Jay</h4>
            <p className="mb-3 text-sm text-slate-300">You can reach out through the contact form on this site or use the placeholder links below:</p>
            <motion.div 
              className="flex flex-wrap gap-2 text-sm text-slate-200"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {[
                portfolioData.contact.linkedin,
                portfolioData.contact.github,
                portfolioData.contact.facebook,
                portfolioData.contact.email,
              ].map((item) => (
                <motion.span
                  key={item}
                  className="rounded-full border border-white/10 px-2 py-1 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-200"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        );
      case "automation":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
          >
            <h4 className="mb-3 text-white font-semibold">AI automation ideas Jay can help with</h4>
            <motion.div
              className="grid gap-3 md:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {portfolioData.projects.map((project) => (
                <motion.div
                  key={project.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-emerald-400/20 transition-all duration-200"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -2 }}
                >
                  <p className="text-sm font-medium text-white">{project.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{project.result}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300"
          >
            Jay helps businesses improve workflows, automate repetitive tasks, and build practical AI-powered systems.
          </motion.div>
        );
    }
  }, [activePanel]);

  return (
    <section id="assistant" className="px-4 pb-28 pt-10 sm:px-6 lg:px-8">
      <AnimatePresence>
        {showDiscovery && (
          <ClientDiscoveryAgent
            onClose={() => setShowDiscovery(false)}
            onComplete={handleDiscoveryComplete}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_35px_90px_rgba(15,23,42,0.45)] backdrop-blur-md sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 shadow-lg">
              <AIAvatar state={avatarState} size="md" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">AI Assistant</p>
              <h3 className="text-xl font-semibold text-white">Jay AI</h3>
            </div>
          </div>
          <motion.div 
            className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Online
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-sky-300">
              <BrainCircuit className="h-4 w-4" />
              AI assistant
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Ask me about Jay's experience, skills, projects, automation ideas, or how he can help your business.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <motion.button
                  key={prompt}
                  type="button"
                  onClick={() => handleSubmit(prompt)}
                  disabled={thinking}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-emerald-400/40 hover:bg-emerald-500/10 disabled:opacity-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#050d18]/80 p-4">
            <div className="mb-4 flex min-h-[270px] flex-col gap-3 overflow-hidden rounded-2xl bg-slate-950/60 p-3">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 14, x: message.sender === "user" ? 18 : -18 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.sender === "user"
                        ? "ml-auto bg-gradient-to-r from-emerald-400/20 to-sky-400/20 text-white"
                        : "bg-white/5 text-slate-200"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                >
                  <span className="inline-flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-300 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-300 [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-300 [animation-delay:240ms]" />
                  </span>
                  Thinking...
                </motion.div>
              )}
            </div>

            <div className="mt-3">
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                <Sparkles className="h-3.5 w-3.5" />
                Context response
              </div>
              {panelContent}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              className="mt-5 flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 p-2 transition-all duration-300 hover:border-emerald-400/30 hover:bg-slate-950/95 focus-within:border-emerald-400/50"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={thinking}
                aria-label="Ask Jay AI"
                placeholder="Ask Jay AI..."
                className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={thinking}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
