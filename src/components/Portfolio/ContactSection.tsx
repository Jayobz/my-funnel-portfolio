"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";

const inputClass =
  "w-full rounded-xl border border-[#24324A] bg-[#0D1628] px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:bg-[#111C30] transition-all duration-200";

const selectClass =
  "w-full rounded-xl border border-[#24324A] bg-[#0D1628] px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none focus:bg-[#111C30] transition-all duration-200 appearance-none";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", business: "", website: "",
    service: "", goal: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", business: "", website: "", service: "", goal: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1.5">
            <Mail className="h-4 w-4 text-orange-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-300">
              Start a Project
            </span>
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Let's Build Something That Converts.
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Whether you need a sales funnel, landing page, lead generation
            system, or professional graphic design, let's discuss your project.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-[#24324A] bg-[#0D1628] p-8 sm:p-12"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} viewport={{ once: true }}>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Name <span className="text-orange-400">*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Email <span className="text-orange-400">*</span>
                  </label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
                </motion.div>
              </div>

              {/* Business + Website */}
              <div className="grid gap-6 sm:grid-cols-2">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} viewport={{ once: true }}>
                  <label className="mb-2 block text-sm font-medium text-white">Business / Brand</label>
                  <input type="text" name="business" value={formData.business} onChange={handleChange} className={inputClass} placeholder="Your business or brand" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} viewport={{ once: true }}>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Website <span className="text-slate-500 text-xs font-normal">(optional)</span>
                  </label>
                  <input type="url" name="website" value={formData.website} onChange={handleChange} className={inputClass} placeholder="https://yoursite.com" />
                </motion.div>
              </div>

              {/* Service + Goal */}
              <div className="grid gap-6 sm:grid-cols-2">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} viewport={{ once: true }}>
                  <label className="mb-2 block text-sm font-medium text-white">What do you need?</label>
                  <select name="service" value={formData.service} onChange={handleChange} className={selectClass}>
                    <option value="">Select a service…</option>
                    <optgroup label="Sales Funnels">
                      <option value="sales-funnel">Sales Funnel</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="lead-generation">Lead Generation</option>
                      <option value="booking-funnel">Booking Funnel</option>
                    </optgroup>
                    <optgroup label="Graphic Design">
                      <option value="graphic-design">Graphic Design</option>
                      <option value="event-poster">Event Poster</option>
                      <option value="social-media-graphics">Social Media Graphics</option>
                      <option value="marketing-design">Marketing Design</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="automation">Automation</option>
                      <option value="other">Other</option>
                    </optgroup>
                  </select>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.31 }} viewport={{ once: true }}>
                  <label className="mb-2 block text-sm font-medium text-white">Project Goal</label>
                  <select name="goal" value={formData.goal} onChange={handleChange} className={selectClass}>
                    <option value="">Select a goal…</option>
                    <option value="generate-leads">Generate Leads</option>
                    <option value="get-bookings">Get More Bookings</option>
                    <option value="sell-product">Sell a Product / Service</option>
                    <option value="customer-journey">Improve Customer Journey</option>
                    <option value="promote-event">Promote an Event</option>
                    <option value="visual-branding">Improve Visual Branding</option>
                    <option value="automate-process">Automate a Process</option>
                  </select>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} viewport={{ once: true }}>
                <label className="mb-2 block text-sm font-medium text-white">
                  Message <span className="text-orange-400">*</span>
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className={inputClass}
                  placeholder="Tell me about your project — what you need, your audience, and any details that will help…"
                />
              </motion.div>

              {/* Submit — orange CTA */}
              <motion.button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3 font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,0.30)] transition hover:brightness-110"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Project Request <ArrowUpRight className="ml-2 inline h-4 w-4" />
              </motion.button>

              <p className="text-center text-xs text-slate-500">
                I'll get back to you within 24 hours to discuss your project.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <h3 className="mb-2 text-2xl font-semibold text-white">Thanks for reaching out!</h3>
              <p className="text-slate-300">Your project request has been sent. I'll be in touch soon.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-[#24324A] bg-[#0D1628] p-6">
            <p className="mb-2 text-sm text-slate-500">Email</p>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="font-semibold text-white hover:text-orange-400 transition-colors duration-200"
            >
              {portfolioData.contact.email}
            </a>
          </div>
          <div className="rounded-2xl border border-[#24324A] bg-[#0D1628] p-6">
            <p className="mb-2 text-sm text-slate-500">Location</p>
            <p className="font-semibold text-white">{portfolioData.profile.location}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
