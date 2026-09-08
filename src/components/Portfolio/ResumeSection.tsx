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


      </div>
    </section>
  );
}
