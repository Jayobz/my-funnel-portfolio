"use client";

import { motion } from "framer-motion";
import { Download, FileText, ExternalLink } from "lucide-react";

export function ResumeSection() {
  return (
    <section id="resume" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Resume</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            Get My Resume
          </h2>
        </motion.div>

        {/* Action buttons */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Download */}
          <motion.a
            href="/Obedencio-Jay-Web-Developer-Resume.pdf"
            download="Obedencio-Jay-Web-Developer-Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#24324A] bg-[#0D1628] p-8 transition-all duration-300 hover:border-blue-500/35 hover:bg-blue-500/4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 p-3">
                <Download className="h-5 w-5 text-blue-400" />
              </div>
              <motion.div whileHover={{ x: 3 }}>
                <ExternalLink className="h-4 w-4 text-orange-400" />
              </motion.div>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Download Resume</h3>
            <p className="text-sm text-slate-300">
              Get my complete resume in PDF format with all my experience, skills, and education.
            </p>
          </motion.a>

          {/* View */}
          <motion.a
            href="/Obedencio-Jay-Web-Developer-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#24324A] bg-[#0D1628] p-8 transition-all duration-300 hover:border-blue-500/35 hover:bg-blue-500/4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 p-3">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <motion.div whileHover={{ x: 3 }}>
                <ExternalLink className="h-4 w-4 text-orange-400" />
              </motion.div>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">View Resume</h3>
            <p className="text-sm text-slate-300">
              View my resume online in your browser. Perfect for a quick preview.
            </p>
          </motion.a>
        </div>

        {/* Embedded PDF preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 overflow-hidden rounded-2xl border border-[#24324A] bg-[#0D1628]"
        >
          <div className="flex items-center justify-between border-b border-[#24324A] px-5 py-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-slate-400">Obedencio-Jay-Web-Developer-Resume.pdf</span>
            </div>
            <a
              href="/Obedencio-Jay-Web-Developer-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
            >
              Open <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <iframe
            src="/Obedencio-Jay-Web-Developer-Resume.pdf"
            className="h-[780px] w-full"
            title="Jay Obedencio Resume"
          />
        </motion.div>

      </div>
    </section>
  );
}
