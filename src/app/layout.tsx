import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { LiquidCursorEffect } from "@/components/UI/LiquidCursorEffect";
import { ScrollProgress } from "@/components/UI/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jay Obedencio | Sales Funnel Builder & Graphic Designer",
  description:
    "Jay Obedencio builds sales funnels, landing pages, lead generation systems, and professional graphic designs for businesses and organizations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050b14]">
        {/*
          MotionConfig: propagates reducedMotion="user" to every Framer Motion
          component in the tree — when the OS preference is set, all animations
          collapse to their final state instantly with no extra per-component code.
        */}
        <MotionConfig reducedMotion="user">
          {/* Scroll progress bar — sits above everything at z-[60] */}
          <ScrollProgress />

          {/* Liquid rainbow cursor — canvas overlay, hidden on touch / reduced motion */}
          <LiquidCursorEffect />

          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
