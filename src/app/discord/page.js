"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveBackgroundZone from "../components/InteractiveBackgroundZone";
import FloatingContactCards from "../components/FloatingContactCards";

const CONTACT_CARDS = [
  { platform: "discord", label: "Discord", value: "NEXORA LABS", sub: "Community 24/7 Active", href: "https://discord.gg/n9gQqRAVsh", accent: "#7c3aed" },
  { platform: "email", label: "Email", value: "hello@dev", sub: "Response < 24H", href: "mailto:devplayer4863@gmail.com", accent: "#06b6d4" },
];

const AC = "#7c3aed";

function ClientOnly({ children, fallbackHeight = 540 }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ height: fallbackHeight }} />;
  return children;
}

const skills = [
  { name: "Discord Bots", level: 78 },
  { name: "Server Architecture", level: 95 },
  { name: "Verification Systems", level: 90 },
  { name: "API Integrations", level: 89 },
  { name: "Community Management", level: 92 },
  { name: "Automation Tools", level: 96 },
];

const projects = [
  { title: "GuardianBot", desc: "Advanced moderation bot in 150+ communities. AI content filtering, automated verification, custom logging, and ticket moderation.", tags: ["Node.js", "Discord.js", "AI", "MongoDB"], servers: "150+", status: "Active" },
  { title: "TicketForge Dashboard", desc: "Complete support desk with custom ticket categories, automated channel generation, staff transcript logging, and SLA performance stats.", tags: ["TypeScript", "PostgreSQL", "Next.js"], servers: "80+", status: "Active" },
  { title: "CommunityHub Leveler", desc: "Engagement-boosting XP and role reward system with leaderboard views, invite verification, and multi-guild synchronization.", tags: ["Python", "Redis", "FastAPI"], servers: "300+", status: "Active" },
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

/* Fake Discord UI panel as a decorative element */
function DiscordPanel({ style }) {
  return (
    <div style={{
      background: "rgba(30, 27, 75, 0.85)", backdropFilter: "blur(12px)",
      border: `1px solid ${AC}30`, borderRadius: 14, padding: "12px 16px",
      boxShadow: `0 0 30px ${AC}18, 0 10px 40px rgba(0,0,0,0.5)`, ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#23d18b" }} />
        <span style={{ color: "#a78bfa", fontSize: 10, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>System Online</span>
      </div>
      {["API", "Gateway", "Database", "Servers"].map((item, i) => (
        <div key={item} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ color: "#6d6d8a", fontSize: 10, fontFamily: "monospace" }}>{item}</span>
          <span style={{ color: "#23d18b", fontSize: 10, fontFamily: "monospace" }}>● ONLINE</span>
        </div>
      ))}
    </div>
  );
}

/* ── Discord About Scene ── */
function DiscordAboutScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 100, damping: 26, mass: 0.5 });
  const sy = useSpring(mouseY, { stiffness: 100, damping: 26, mass: 0.5 });

  const l1x = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const l1y = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const l2x = useTransform(sx, [-0.5, 0.5], [-20, 20]);
  const l2y = useTransform(sy, [-0.5, 0.5], [-20, 20]);
  const l3x = useTransform(sx, [-0.5, 0.5], [-38, 38]);
  const l3y = useTransform(sy, [-0.5, 0.5], [-38, 38]);
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
        x: l1x, y: l1y, position: "absolute", top: "15%", left: "15%",
        width: 280, height: 280, borderRadius: "50%", filter: "blur(60px)",
        background: `radial-gradient(circle, ${AC}30, transparent 70%)`, zIndex: 0
      }} />

      {/* Main image – slightly tilted */}
      <motion.div style={{
        x: l2x, y: l2y, rotateX: rotX, rotateY: rotY,
        position: "absolute", top: "8%", left: "5%", transformStyle: "preserve-3d", zIndex: 5
      }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{
          width: 400, height: 300, borderRadius: 22, overflow: "hidden",
          border: `1.5px solid ${AC}40`, boxShadow: `0 0 60px ${AC}22, 0 30px 80px rgba(0,0,0,0.65)`,
          transform: "rotate(3deg)"
        }}>
          <img src="/discord-about.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.45))" }} />
          <div style={{
            position: "absolute", top: 0, left: 20, right: 20, height: 2,
            background: `linear-gradient(90deg, transparent, ${AC}, transparent)`
          }} />
        </div>
      </motion.div>

      {/* Secondary image top-right */}
      <motion.div style={{ x: l3x, y: l3y, position: "absolute", top: "0%", right: "0%", zIndex: 10 }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{
          width: 150, height: 112, borderRadius: 16, overflow: "hidden",
          border: `1.5px solid ${AC}40`, boxShadow: `0 0 30px ${AC}20, 0 16px 40px rgba(0,0,0,0.55)`,
          transform: "rotate(-8deg)"
        }}>
          <img src="/discord-bg.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `${AC}18` }} />
        </div>
      </motion.div>

      {/* Discord UI Panel floating bottom-right */}
      <motion.div style={{ x: l3x, y: l3y, position: "absolute", bottom: "2%", right: "3%", zIndex: 15 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <DiscordPanel style={{ width: 170, transform: "rotate(-5deg)" }} />
      </motion.div>

      {/* Small skills image bottom-left */}
      <motion.div style={{ x: l2x, y: l2y, position: "absolute", bottom: "5%", left: "3%", zIndex: 8 }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}>
        <div style={{
          width: 145, height: 105, borderRadius: 14, overflow: "hidden",
          border: `1.5px solid ${AC}35`, boxShadow: `0 0 28px ${AC}18, 0 12px 35px rgba(0,0,0,0.5)`,
          transform: "rotate(6deg)"
        }}>
          <img src="/discord-skills.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Discord Skills Visual ── */
function DiscordSkillsVisual() {
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
        background: `radial-gradient(ellipse, ${AC}20, transparent 70%)`, filter: "blur(50px)"
      }} />

      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d",
          width: 380, height: 460, borderRadius: 24, overflow: "hidden",
          border: `2px solid ${AC}50`, boxShadow: `0 0 80px ${AC}22, 0 40px 80px rgba(0,0,0,0.7)`
        }}>
        <img src="/discord-skills.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${AC}10, transparent 55%, rgba(0,0,0,0.3))` }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent, ${AC}, transparent)`
        }} />
      </motion.div>
    </motion.div>
  );
}

export default function DiscordPage() {
  return (
    <>
      <div className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 z-0 hero-bg-discord"
            style={{
              backgroundImage: "url('/discord-bg.png')",
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
          <div className="relative z-[2] min-h-screen flex items-center px-4 sm:px-10 md:px-20">
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
              className="w-full max-w-[900px] mt-16 md:mt-0 hero-text-discord"
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
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: AC }}
                />

                <span
                  className="text-[10px] sm:text-[12px] md:text-[12px] tracking-[3px] sm:tracking-[6px] uppercase"
                  style={{
                    color: AC,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Discord Developer
                </span>
              </div>

              {/* Heading */}
              <h1
                className="font-black leading-[1.0] sm:leading-[0.9] mb-4 break-words text-[clamp(2.5rem,8vw,3.5rem)] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                <span className="block text-white">
                  BUILDING
                </span>

                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, ${AC}, #a855f7, #c084fc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 40px ${AC}30)`,
                  }}
                >
                  COMMUNITIES
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed max-w-[600px] break-words"
              >
                Developing intelligent Discord ecosystems with advanced moderation
                bots, automation workflows, verification systems, and scalable
                community infrastructure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Zone wrapped in Matter.js InteractiveBackgroundZone */}
        <InteractiveBackgroundZone theme="discord" color={AC}>
          {/* About */}
          <section className="relative py-16 sm:py-28 px-4 sm:px-6 overflow-visible">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(${AC}60 1px, transparent 1px), linear-gradient(90deg, ${AC}60 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-4 items-center">
                {/* Desktop 3D scene */}
                <div className="hidden lg:block">
                  <ClientOnly fallbackHeight={540}><FadeIn><DiscordAboutScene /></FadeIn></ClientOnly>
                </div>
                {/* Mobile / Tablet responsive replacement */}
                <div className="block lg:hidden w-full relative aspect-[4/3] max-w-[400px] mx-auto rounded-2xl overflow-hidden border border-[#7c3aed]/40 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                  <img src="/discord-about.png" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col gap-6 lg:pl-8">
                  <FadeIn>
                    <span className="text-[13px] tracking-[5px] uppercase block mb-2" style={{ color: `${AC}80`, fontFamily: "var(--font-mono)" }}>About Me</span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      Automating <span style={{ color: AC }}>Interactions</span>
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.15}>
                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed">I design robust automation setups to help web and gaming communities run effortlessly — from channel structures to specialized verification portals linked to external APIs.</p>
                    <p className="text-gray-500 leading-relaxed mt-2 sm:mt-4">I build secure digital zones where thousands of users connect, interact, and thrive.</p>
                  </FadeIn>
                  <FadeIn delay={0.25}>
                    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-2">
                      {[{ num: "20+", label: "Custom Bots" }, { num: "100K+", label: "Members Guarded" }, { num: "4+", label: "Years Exp." }].map((s) => (
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
                  <ClientOnly fallbackHeight={520}><FadeIn delay={0.2}><DiscordSkillsVisual /></FadeIn></ClientOnly>
                </div>
                {/* Mobile / Tablet responsive replacement */}
                <div className="block lg:hidden w-full relative aspect-[3/4] max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-[#7c3aed]/40 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                  <img src="/discord-skills.png" alt="" className="w-full h-full object-cover" />
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
                          Bots &amp; Setups
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
                        className="rounded-3xl p-5 sm:p-8 md:p-10 text-center transition-all duration-300 hover:-translate-y-1"
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
                          className="text-xl sm:text-3xl font-bold text-white mb-3 break-words"
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
                            {p.servers} servers
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-5 break-words">
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
          <section className="relative py-16 sm:py-24 pb-24 sm:pb-32 px-4 sm:px-6">
            <div className="w-full max-w-4xl mx-auto text-center">
              <FadeIn>
                <span className="text-[13px] tracking-[5px] uppercase block mb-3" style={{ color: `${AC}80`, fontFamily: "var(--font-mono)" }}>Get In Touch</span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 break-words" style={{ fontFamily: "var(--font-heading)" }}>Let&apos;s <span style={{ color: AC }}>Connect</span></h2>
                <p className="text-gray-500 mb-10 sm:mb-12 text-sm sm:text-lg">Need a custom Discord bot or high-level server setup? Reach out below.</p>
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