"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ value, suffix = "", label, accentColor, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      delay: delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center px-6 py-8"
    >
      <div className="text-4xl sm:text-5xl font-black mb-2" style={{ fontFamily: "var(--font-heading)", color: accentColor }}>
        {display}{suffix}
      </div>
      <div className="text-sm text-gray-500 tracking-wider uppercase" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered", accentColor: "#00f0ff" },
    { value: 200, suffix: "K+", label: "Users Served", accentColor: "#a855f7" },
    { value: 99, suffix: "%", label: "Client Satisfaction", accentColor: "#22c55e" },
    { value: 5, suffix: "+", label: "Years Experience", accentColor: "#ec4899" },
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[4px] uppercase text-gray-600" style={{ fontFamily: "var(--font-mono)" }}>
            Our Impact
          </span>
        </motion.div>

        <div className="glass-strong rounded-3xl p-4 max-w-4xl mx-auto" style={{ borderColor: "rgba(0,240,255,0.08)" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {stats.map((s, i) => (
              <Counter key={s.label} {...s} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
