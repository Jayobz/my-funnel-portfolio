"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

export type DiscoveryStep = 
  | "init"
  | "business_type"
  | "process"
  | "tools"
  | "repetitive_tasks"
  | "people_involved"
  | "desired_outcome"
  | "result";

export interface ClientDiscoveryAnswers {
  businessType?: string;
  process?: string;
  tools?: string;
  repetitiveTasks?: string;
  peopleInvolved?: string;
  desiredOutcome?: string;
}

interface ClientDiscoveryProps {
  onClose?: () => void;
  onComplete?: (answers: ClientDiscoveryAnswers) => void;
}

export function ClientDiscoveryAgent({ onClose, onComplete }: ClientDiscoveryProps) {
  const [step, setStep] = useState<DiscoveryStep>("init");
  const [answers, setAnswers] = useState<ClientDiscoveryAnswers>({});
  const [customAnswer, setCustomAnswer] = useState("");

  const questions: Record<DiscoveryStep, { question: string; placeholder: string; hint?: string }> = {
    init: { question: "", placeholder: "", hint: "" },
    business_type: {
      question: "What type of business do you have?",
      placeholder: "e.g., SaaS, E-commerce, Agency, Consulting...",
      hint: "Help me understand your business model",
    },
    process: {
      question: "What process do you want to automate?",
      placeholder: "e.g., Customer support, Lead handling, Scheduling...",
      hint: "What's your main pain point?",
    },
    tools: {
      question: "What tools are you currently using?",
      placeholder: "e.g., HubSpot, Airtable, Google Sheets, Slack...",
      hint: "Tell me about your current tech stack",
    },
    repetitive_tasks: {
      question: "What repetitive tasks take the most time?",
      placeholder: "e.g., Sending follow-up emails, Data entry, Scheduling...",
      hint: "What would you like to stop doing manually?",
    },
    people_involved: {
      question: "How many people are involved in this process?",
      placeholder: "e.g., 2-3 people, a whole team...",
      hint: "Understanding your team size helps",
    },
    desired_outcome: {
      question: "What result are you hoping to achieve?",
      placeholder: "e.g., Save 10 hours/week, Improve response time, Scale without hiring...",
      hint: "What's your ideal outcome?",
    },
    result: { question: "", placeholder: "", hint: "" },
  };

  const handleNext = () => {
    const stepOrder: DiscoveryStep[] = [
      "business_type",
      "process",
      "tools",
      "repetitive_tasks",
      "people_involved",
      "desired_outcome",
      "result",
    ];

    const currentIndex = stepOrder.indexOf(step as DiscoveryStep);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
      setCustomAnswer("");
    } else {
      setStep("result");
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  const handleAnswer = (value: string) => {
    setCustomAnswer(value);
  };

  const handleSubmitAnswer = () => {
    if (!customAnswer.trim()) return;

    const answerMap: Record<DiscoveryStep, keyof ClientDiscoveryAnswers> = {
      init: "businessType",
      business_type: "businessType",
      process: "process",
      tools: "tools",
      repetitive_tasks: "repetitiveTasks",
      people_involved: "peopleInvolved",
      desired_outcome: "desiredOutcome",
      result: "businessType",
    };

    setAnswers((prev) => ({
      ...prev,
      [answerMap[step]]: customAnswer,
    }));

    handleNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-4 w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl"
      >
        {step === "init" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-white">Automation Discovery</h2>
            <p className="mb-8 text-lg text-slate-300">
              Let me help you identify automation opportunities for your business. This takes just 2 minutes.
            </p>
            <motion.button
              onClick={() => {
                setStep("business_type");
                setCustomAnswer("");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-8 py-3 font-semibold text-slate-950 transition hover:brightness-110"
            >
              Start Discovery <ArrowRight className="ml-2 inline h-4 w-4" />
            </motion.button>
          </motion.div>
        )}

        {step !== "init" && step !== "result" && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-2 text-2xl font-semibold text-white">
                {questions[step].question}
              </h3>
              {questions[step].hint && (
                <p className="text-sm text-slate-400">{questions[step].hint}</p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitAnswer();
              }}
              className="space-y-4"
            >
              <input
                autoFocus
                type="text"
                value={customAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={questions[step].placeholder}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none focus:bg-white/10"
              />
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:border-white/20 hover:bg-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={!customAnswer.trim()}
                  className="flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <ArrowRight className="ml-1 inline h-3 w-3" />
                </motion.button>
              </div>
            </form>

            <div className="flex justify-between border-t border-white/10 pt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    i <= ["business_type", "process", "tools", "repetitive_tasks", "people_involved", "desired_outcome"].indexOf(step as DiscoveryStep) + 1
                      ? "bg-emerald-400"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle className="h-16 w-16 text-emerald-400" />
              </motion.div>
            </div>

            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">Automation Opportunity Identified</h2>
              <p className="text-slate-300">
                Based on your answers, here's what I found:
              </p>
            </div>

            <motion.div
              className="space-y-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-sm text-slate-400">Business</p>
                <p className="font-semibold text-white">{answers.businessType}</p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-sm text-slate-400">Current Problem</p>
                <p className="font-semibold text-white">{answers.process}</p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-sm text-slate-400">Desired Outcome</p>
                <p className="font-semibold text-white">{answers.desiredOutcome}</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p className="mb-3 font-semibold text-white">Suggested Workflow</p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">1</span>
                  Trigger Event
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">↓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">2</span>
                  AI Agent Processing
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">↓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">3</span>
                  Decision Making
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">↓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">4</span>
                  Automation Execution
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">↓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">5</span>
                  Notification / CRM Update
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={onClose}
              className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Talk to Jay About This Project
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
