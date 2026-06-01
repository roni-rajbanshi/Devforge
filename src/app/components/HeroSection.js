"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-end overflow-x-hidden px-6 pb-12">
      {/* Background Image - Static for performance */}
      <div
        className="absolute inset-0 z-0 origin-top"
        style={{
          backgroundImage: "url('/home-bg-v3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Background Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, transparent 50%)",
        }}
      />

      {/* Accent Beams */}
      <div
        className="absolute top-0 left-1/4 w-px h-[40vh] opacity-[0.04] z-[1]"
        style={{
          background: "linear-gradient(to bottom, #00f0ff, transparent)",
        }}
      />

      <div
        className="absolute top-0 right-1/3 w-px h-[55vh] opacity-[0.03] z-[1]"
        style={{
          background: "linear-gradient(to bottom, #a855f7, transparent)",
        }}
      />

      <div className="relative z-[2] max-w-7xl w-full mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-4 text-[#00f0ff] uppercase tracking-[0.3em] font-bold text-sm" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="text-[#00f0ff] opacity-80 text-xs">❖</span>
            <span className="h-[1px] w-8 bg-[#00f0ff]/50" />
            <span className="tracking-[0.4em] text-xs">Developer Collective</span>
            <span className="h-[1px] w-8 bg-[#00f0ff]/50" />
            <span className="text-[#00f0ff] opacity-80 text-xs">❖</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="leading-[0.88] mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            <span 
              className="block text-[clamp(2.5rem,7vw,6rem)] font-black text-white tracking-wider" 
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
            >
              WE ARE
            </span>

            <span
              className="block text-[clamp(3.5rem,11vw,9.5rem)] font-black tracking-tighter"
              style={{
                background: "linear-gradient(to right, #00f0ff, #3b82f6, #a855f7, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.9)) drop-shadow(0 15px 25px rgba(0,0,0,0.6))",
                transform: "scaleY(1.05)",
                marginTop: "-0.5rem"
              }}
            >
              DEVFORGE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-col items-center">
            <p 
              className="text-gray-200 text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] uppercase leading-relaxed text-center max-w-4xl px-4 mb-4" 
              style={{ fontFamily: "var(--font-mono)" }}
            >
              THREE MINDS. THREE CRAFTS. ONE RELENTLESS PURSUIT OF
              <br className="hidden sm:block" />
              BUILDING EXTRAORDINARY DIGITAL EXPERIENCES.
            </p>
            
            {/* Bottom Decoration */}
            <div className="flex items-center gap-3">
               <span className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-[#8b5cf6]" />
               <span className="text-[#8b5cf6] text-[10px] shadow-[0_0_10px_#8b5cf6]">❖</span>
               <span className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-[#8b5cf6]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}