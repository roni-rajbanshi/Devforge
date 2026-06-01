"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider({ fromColor = "#00f0ff", toColor = "#a855f7" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-10 overflow-hidden">
      {/* Animated line */}
      <motion.div
        className="relative h-px mx-auto max-w-5xl"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          background: `linear-gradient(90deg, transparent, ${fromColor}50, ${toColor}50, transparent)`,
          transformOrigin: "center",
        }}
      />

      {/* Center diamond */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: 0 }}
        animate={inView ? { scale: 1, rotate: 45 } : {}}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      >
        <div
          className="w-3 h-3 rounded-sm"
          style={{
            background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
            boxShadow: `0 0 15px ${fromColor}40, 0 0 30px ${toColor}20`,
          }}
        />
      </motion.div>

      {/* Side dots */}
      {[-120, -60, 60, 120].map((offset, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
          style={{
            left: `calc(50% + ${offset}px)`,
            background: i < 2 ? fromColor : toColor,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
        />
      ))}
    </div>
  );
}
