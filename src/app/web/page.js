"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveBackgroundZone from "../components/InteractiveBackgroundZone";
import FloatingContactCards from "../components/FloatingContactCards";

const CONTACT_CARDS = [
  { platform: "discord", label: "Discord", value: "COZY HUB", sub: "Community 24/7 Active", href: "https://discord.gg/S4WhSnVRGK", accent: "#7c3aed" },
  { platform: "email", label: "Email", value: "hello@roni", sub: "Response < 24H", href: "mailto:ronirajbanshi2008@gmail.com", accent: "#06b6d4" },
  { platform: "github", label: "GitHub", value: "github.com/roni", sub: "50+ Repositories", href: "https://github.com/roni-rajbanshi", accent: "#3b82f6" },
];

const AC = "#00f0ff";

function ClientOnly({ children, fallbackHeight = 540 }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ height: fallbackHeight }} />;
  return children;
}

const skills = [
  { name: "React / Next.js", level: 96 },
  { name: "TypeScript", level: 93 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Three.js / WebGL", level: 85 },
  { name: "Node.js / Express", level: 88 },
  { name: "GraphQL & REST APIs", level: 90 },
  { name: "PostgreSQL / MongoDB", level: 86 },
  { name: "UI/UX Design", level: 92 },
];

const projects = [
  { title: "Apex Crypto Terminal", desc: "Futuristic crypto trading dashboard with real-time WebSockets, 3D portfolio visualizers, and custom order book mechanics.", tags: ["Next.js", "Three.js", "WebSockets", "Tailwind"], visits: "45K+", status: "Live" },
  { title: "Vortex CMS Engine", desc: "Headless content management builder with real-time visual collaboration, custom layout generation, and edge static builds.", tags: ["React", "GraphQL", "Node.js", "Vercel"], visits: "10K+", status: "Production" },
  { title: "Nebula UI Package", desc: "Open-source library of glassmorphic React primitives with spring animations and full accessibility support.", tags: ["TypeScript", "CSS Modules", "Storybook"], visits: "100K+ DL", status: "Active" },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}>
      {children}
    </motion.div>
  );
}

function AnimatedBar({ level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className="h-1.5 rounded-full overflow-hidden" style={{ background: `${color}18` }}>
      <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : {}}
        transition={{ duration: 1.0, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }} />
    </div>
  );
}

/* Glassmorphism browser window decoration */
function BrowserCard({ style }) {
  return (
    <div style={{
      background: "rgba(0, 240, 255, 0.04)", backdropFilter: "blur(14px)",
      border: `1px solid ${AC}25`, borderRadius: 14,
      boxShadow: `0 0 30px ${AC}15, 0 10px 40px rgba(0,0,0,0.5)`, ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: `1px solid ${AC}15` }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginLeft: 6 }} />
      </div>
      <div style={{ padding: "10px 14px" }}>
        {[80, 60, 70, 45].map((w, i) => (
          <div key={i} style={{
            height: 5, width: `${w}%`, borderRadius: 3,
            background: i % 2 ? `${AC}25` : "rgba(255,255,255,0.08)", marginBottom: 7
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Web About Scene ── */
function WebAboutScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 100, damping: 26, mass: 0.5 });
  const sy = useSpring(mouseY, { stiffness: 100, damping: 26, mass: 0.5 });

  const l1x = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const l1y = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const l2x = useTransform(sx, [-0.5, 0.5], [-20, 20]);
  const l2y = useTransform(sy, [-0.5, 0.5], [-20, 20]);
  const l3x = useTransform(sx, [-0.5, 0.5], [-36, 36]);
  const l3y = useTransform(sy, [-0.5, 0.5], [-36, 36]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div className="relative w-full" style={{ height: 540 }}
      onMouseMove={onMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>

      {/* BG glow */}
      <motion.div style={{
        x: l1x, y: l1y, position: "absolute", top: "15%", left: "10%",
        width: 300, height: 300, borderRadius: "50%", filter: "blur(70px)",
        background: `radial-gradient(circle, ${AC}22, transparent 70%)`, zIndex: 0
      }} />

      {/* Main image */}
      <motion.div style={{
        x: l2x, y: l2y, rotateX: rotX, rotateY: rotY,
        position: "absolute", top: "6%", left: "5%", transformStyle: "preserve-3d", zIndex: 5
      }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{
            width: 400, height: 295, borderRadius: 22, overflow: "hidden",
            border: `1.5px solid ${AC}35`, boxShadow: `0 0 60px ${AC}20, 0 30px 80px rgba(0,0,0,0.65)`,
            transform: "rotate(-2deg)"
          }}>
          <img src="/web-about.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4))" }} />
          <div style={{
            position: "absolute", top: 0, left: 20, right: 20, height: 2,
            background: `linear-gradient(90deg, transparent, ${AC}, transparent)`
          }} />
        </div>
      </motion.div>

      {/* Top-right browser card */}
      <motion.div style={{ x: l3x, y: l3y, position: "absolute", top: "0%", right: "0%", zIndex: 10 }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <BrowserCard style={{ width: 168, transform: "rotate(8deg)" }} />
      </motion.div>

      {/* Bottom-right secondary image */}
      <motion.div style={{ x: l3x, y: l3y, position: "absolute", bottom: "2%", right: "2%", zIndex: 15 }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{
            width: 165, height: 122, borderRadius: 16, overflow: "hidden",
            border: `1.5px solid ${AC}40`, boxShadow: `0 0 35px ${AC}20, 0 16px 40px rgba(0,0,0,0.55)`,
            transform: "rotate(6deg)"
          }}>
          <img src="/web-skills.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${AC}12, transparent)` }} />
        </div>
      </motion.div>

      {/* Bottom-left browser card */}
      <motion.div style={{ x: l2x, y: l2y, position: "absolute", bottom: "5%", left: "3%", zIndex: 8 }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}>
        <BrowserCard style={{ width: 145, transform: "rotate(-6deg)" }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Skills Visual ── */
function WebSkillsVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const sy = useSpring(mouseY, { stiffness: 80, damping: 22 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  return (
    <motion.div className="relative flex items-center justify-center" style={{ height: 520, perspective: 1000 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mouseX.set((e.clientX - r.left) / r.width - 0.5); mouseY.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>

      <div style={{
        position: "absolute", inset: "10%", borderRadius: "50%",
        background: `radial-gradient(ellipse, ${AC}18, transparent 70%)`, filter: "blur(50px)"
      }} />

      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d",
          width: 380, height: 460, borderRadius: 24, overflow: "hidden",
          border: `2px solid ${AC}45`, boxShadow: `0 0 80px ${AC}20, 0 40px 80px rgba(0,0,0,0.7)`
        }}>
        <img src="/web-skills.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${AC}10, transparent 55%, rgba(0,0,0,0.25))` }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent, ${AC}, transparent)`
        }} />
      </motion.div>
    </motion.div>
  );
}

export default function WebPage() {
  return (
    <>
      <div className="overflow-x-hidden">

        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 z-0 hero-bg-web"
            style={{
              backgroundImage: "url('/web-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, rgba(10,10,15,0.92) 70%)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-[2] min-h-screen flex items-center px-6 sm:px-12 md:px-20">
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full max-w-[900px] mt-16 md:mt-0 hero-text-web"
              style={{
                willChange: "transform, opacity",
              }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full mb-6 sm:mb-8"
                style={{
                  background: `${AC}08`,
                  border: `1px solid ${AC}20`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: AC }}
                />

                <span
                  className="text-[10px] sm:text-[12px] md:text-[14px] tracking-[3px] sm:tracking-[6px] uppercase"
                  style={{
                    color: AC,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Web Developer
                </span>
              </div>

              {/* Heading */}
              <h1
                className="font-black leading-[0.9] sm:leading-[0.85] mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 8vw, 8rem)",
                }}
              >
                <span className="block text-white">
                  DESIGNING
                </span>

                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, ${AC}, #3b82f6, #60a5fa)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 40px ${AC}30)`,
                  }}
                >
                  EXPERIENCES
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed ml-0 sm:ml-4">
                Building immersive digital landscapes combining
                precise interactive design, solid system
                architecture, and robust front-end layers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Zone wrapped in Matter.js InteractiveBackgroundZone */}
        <InteractiveBackgroundZone theme="web" color={AC}>
          {/* About */}
          <section className="relative py-16 sm:py-28 px-4 sm:px-6 overflow-visible">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(${AC}60 1px, transparent 1px), linear-gradient(90deg, ${AC}60 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-4 items-center">
                {/* Desktop 3D scene */}
                <div className="hidden lg:block">
                  <ClientOnly fallbackHeight={540}><FadeIn><WebAboutScene /></FadeIn></ClientOnly>
                </div>
                {/* Mobile / Tablet responsive replacement */}
                <div className="block lg:hidden w-full relative aspect-[4/3] max-w-[400px] mx-auto rounded-2xl overflow-hidden border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <img src="/web-about.png" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col gap-6 lg:pl-8">
                  <FadeIn>
                    <span className="text-[13px] tracking-[5px] uppercase block mb-2" style={{ color: `${AC}80`, fontFamily: "var(--font-mono)" }}>About Me</span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      Crafting Modern <span style={{ color: AC }}>Webscapes</span>
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.15}>
                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed">I build premium digital experiences with custom layout styles, interactive React interfaces, and efficient cloud architectures.</p>
                    <p className="text-gray-500 leading-relaxed mt-2 sm:mt-4">By merging aesthetic visual principles with clean code, I build high-performance web products that feel lightweight, performant, and premium.</p>
                  </FadeIn>
                  <FadeIn delay={0.25}>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2">
                      {[{ num: "15+", label: "Projects" }, { num: "10k+", label: "Monthly Visits" }, { num: "3+", label: "Years Exp." }].map((s) => (
                        <div key={s.label} className="text-center p-3 sm:p-4 rounded-xl" style={{ background: `${AC}06`, border: `1px solid ${AC}12` }}>
                          <div className="text-lg sm:text-2xl font-black mb-1" style={{ color: AC, fontFamily: "var(--font-heading)" }}>{s.num}</div>
                          <div className="text-[8px] sm:text-[10px] tracking-wider uppercase text-gray-600" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="relative py-16 sm:py-24 px-4 sm:px-6">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-12 lg:gap-12 items-center">
                <div>
                  <FadeIn>
                    <span className="text-[13px] tracking-[5px] uppercase block mb-3" style={{ color: `${AC}80`, fontFamily: "var(--font-mono)" }}>Expertise</span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 sm:mb-10" style={{ fontFamily: "var(--font-heading)" }}>Skills &amp; <span style={{ color: AC }}>Technologies</span></h2>
                  </FadeIn>
                  <div className="flex flex-col gap-4">
                    {skills.map((skill, i) => (
                      <FadeIn key={skill.name} delay={i * 0.055}>
                        <div className="p-4 sm:p-5 rounded-2xl transition-all duration-300"
                          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${AC}30`; e.currentTarget.style.boxShadow = `0 0 30px ${AC}10`; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.boxShadow = "none"; }}>
                          <div className="flex justify-between mb-3">
                            <span className="text-sm sm:text-base font-semibold text-gray-200">{skill.name}</span>
                            <span className="text-xs sm:text-sm font-mono" style={{ color: `${AC}90` }}>{skill.level}%</span>
                          </div>
                          <AnimatedBar level={skill.level} color={AC} delay={i * 0.055} />
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
                {/* Desktop 3D scene */}
                <div className="hidden lg:block">
                  <ClientOnly fallbackHeight={520}><FadeIn delay={0.2}><WebSkillsVisual /></FadeIn></ClientOnly>
                </div>
                {/* Mobile / Tablet responsive replacement */}
                <div className="block lg:hidden w-full relative aspect-[3/4] max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <img src="/web-skills.png" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Spacer */}
          <div className="h-8 sm:h-16 md:h-24 lg:h-32"></div>

          {/* Projects */}
          <section className="relative py-16 sm:py-24 px-4 sm:px-6">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">

                {/* Left Side Heading */}
                <FadeIn className="w-full">
                  <div className="flex items-center justify-center lg:justify-start lg:h-[450px] h-auto mb-6 lg:mb-0">
                    <div className="text-center lg:text-left">
                      <span
                        className="text-[13px] tracking-[5px] uppercase block mb-3"
                        style={{
                          color: `${AC}80`,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        Portfolio
                      </span>

                      <h2
                        className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        Featured <br className="hidden lg:block" />
                        <span style={{ color: AC }}>
                          Web Apps
                        </span>
                      </h2>
                    </div>
                  </div>
                </FadeIn>

                {/* Right Side Cards */}
                <div className="flex flex-col gap-6">
                  {projects.map((p, i) => (
                    <FadeIn key={p.title} delay={i * 0.12}>
                      <div
                        className="rounded-3xl p-10 text-center transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${AC}25`;
                          e.currentTarget.style.boxShadow = `0 0 50px ${AC}10`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <h3
                          className="text-3xl font-bold text-white mb-3"
                          style={{
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {p.title}
                        </h3>

                        <div className="flex justify-center gap-3 mb-4">
                          <span
                            className="text-xs px-3 py-1 rounded-full"
                            style={{
                              background: `${AC}15`,
                              color: AC,
                            }}
                          >
                            {p.status}
                          </span>

                          <span className="text-xs text-gray-500">
                            {p.visits} pageviews
                          </span>
                        </div>

                        <p className="text-gray-400 text-base leading-relaxed max-w-2xl mx-auto mb-5">
                          {p.desc}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase"
                              style={{
                                background: `${AC}08`,
                                color: `${AC}99`,
                                border: `1px solid ${AC}12`,
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>


                      </div>
                    </FadeIn>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Spacer */}
          <div className="h-16 md:h-24 lg:h-15"></div>

          {/* Contact */}
          <section className="relative py-24 pb-32 px-6">
            <div className="w-full max-w-7xl mx-auto text-center">
              <FadeIn>
                <span className="text-[13px] tracking-[5px] uppercase block mb-3" style={{ color: `${AC}80`, fontFamily: "var(--font-mono)" }}>Get In Touch</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Let&apos;s <span style={{ color: AC }}>Connect</span></h2>
                <p className="text-gray-500 mb-12 text-lg">Looking to build a premium web app or interactive portfolio? Connect below.</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <FloatingContactCards contacts={CONTACT_CARDS} />
              </FadeIn>
            </div>
          </section>
          <div className="h-24 md:h-32 lg:h-10"></div>
        </InteractiveBackgroundZone>
      </div>
      <Footer />
    </>
  );
}