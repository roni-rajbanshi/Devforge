"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <footer
      ref={ref}
      className="relative pt-24 pb-10 overflow-hidden"
    >
      {/* Top Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.25), rgba(168,85,247,0.25), transparent)",
        }}
      />

      {/* Background Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.07] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,240,255,0.25), transparent 70%)",
        }}
      />

      {/* Extra Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle at center, #00f0ff 0%, transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #00f0ff, #a855f7)",
                boxShadow:
                  "0 0 35px rgba(0,240,255,0.25)",
              }}
            >
              <span
                className="text-white font-black text-2xl"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                D
              </span>
            </div>

            <span
              className="text-4xl font-black tracking-[0.15em]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#00f0ff",
                textShadow:
                  "0 0 20px rgba(0,240,255,0.35)",
              }}
            >
              DEVFORGE
            </span>
          </div>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="text-gray-400 text-lg sm:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-14"
            style={{
              textShadow:
                "0 0 18px rgba(255,255,255,0.04)",
            }}
          >
            Three developers. Three domains. One unified vision for
            creating extraordinary digital experiences.
          </motion.p>

          {/* Divider */}
          <div
            className="w-full max-w-4xl h-px mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          {/* Copyright */}
          <p
            className="text-gray-600 text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
            }}
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} DEVFORGE — Crafted with
            passion and precision.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}