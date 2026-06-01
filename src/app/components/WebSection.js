"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { SectionHeader, SkillGrid, ProjectCard, ContactCard } from "./SectionParts";

const ACCENT = "#00f0ff";

const skills = [
  "React", "Next.js", "Tailwind CSS", "Node.js",
  "MongoDB", "REST APIs", "UI/UX Design", "Performance Optimization",
  "TypeScript", "Three.js", "GraphQL", "Vercel",
];

const projects = [
  {
    title: "NexusUI Dashboard",
    description: "A real-time analytics dashboard with interactive charts, dark mode, and live data streaming via WebSockets.",
    tags: ["Next.js", "TypeScript", "D3.js"],
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with Stripe payments, product management, and mobile-first responsive design.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Portfolio Generator",
    description: "AI-powered portfolio builder that creates stunning personal sites from simple prompts with customizable themes.",
    tags: ["Next.js", "AI", "Tailwind"],
  },
];

const contacts = [
  { platform: "email",    label: "Email",   value: "hello@roni.dev",  sub: "Response < 24H",   href: "mailto:hello@roni.dev", accent: "#06b6d4" },
  { platform: "github",   label: "GitHub",  value: "github.com/roni", sub: "50+ Repositories", href: "#",                     accent: "#3b82f6" },
];

function FloatingScreens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const screens = useMemo(() => [...Array(6)].map(() => ({
    width: 80 + Math.random() * 100,
    height: 50 + Math.random() * 70,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    duration: 7 + Math.random() * 4,
    delay: Math.random() * 3,
  })), []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {inView && screens.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-xl"
          style={{
            width: s.width,
            height: s.height,
            left: s.left,
            top: s.top,
            background: `linear-gradient(135deg, ${ACCENT}05, ${ACCENT}02)`,
            border: `1px solid ${ACCENT}08`,
            backdropFilter: "blur(4px)",
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [-2, 2, -2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          {/* Fake screen content lines */}
          <div className="p-3 space-y-1.5">
            <div className="h-1 rounded-full w-3/4" style={{ background: `${ACCENT}15` }} />
            <div className="h-1 rounded-full w-1/2" style={{ background: `${ACCENT}10` }} />
            <div className="h-1 rounded-full w-2/3" style={{ background: `${ACCENT}08` }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function WebSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="web" className="relative py-32 overflow-hidden">
      <FloatingScreens />

      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full opacity-8 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT}25, transparent 70%)` }}
      />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)` }}
      />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Web Developer"
          title="DESIGNING"
          titleAccent="EXPERIENCES"
          subtitle="Creating pixel-perfect, high-performance web applications with cutting-edge technologies and an obsession for clean, elegant design."
          accentColor={ACCENT}
        />

        {/* About */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-strong p-8 sm:p-10 rounded-3xl mb-20 max-w-4xl mx-auto"
          style={{ borderColor: `${ACCENT}15` }}
        >
          <div className="flex items-start gap-5">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center shrink-0"
              style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}>
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-heading)" }}>
                About <span style={{ color: ACCENT }}>Me</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                I&apos;m a creative full-stack web developer who bridges the gap between stunning design
                and robust engineering. Every project I build is a blend of aesthetic excellence
                and technical performance.
              </p>
              <p className="text-gray-500 leading-relaxed">
                From interactive 3D experiences to blazing-fast e-commerce platforms, I leverage
                modern technologies to create web applications that are both beautiful and functional.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <div className="mb-20">
          <h3 className="text-center text-lg font-semibold mb-8 tracking-wider uppercase"
            style={{ fontFamily: "var(--font-heading)", color: `${ACCENT}aa` }}>
            Skills & Technologies
          </h3>
          <SkillGrid skills={skills} accentColor={ACCENT} />
        </div>

        {/* Projects */}
        <div className="mb-20">
          <h3 className="text-center text-lg font-semibold mb-10 tracking-wider uppercase"
            style={{ fontFamily: "var(--font-heading)", color: `${ACCENT}aa` }}>
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} {...p} accentColor={ACCENT} index={i} />
            ))}
          </div>
        </div>

        {/* Contact */}
        <ContactCard contacts={contacts} accentColor={ACCENT} />
      </div>
    </section>
  );
}
