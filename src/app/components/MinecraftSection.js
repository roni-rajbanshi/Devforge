"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { SectionHeader, SkillGrid, ProjectCard, ContactCard } from "./SectionParts";

const ACCENT = "#22c55e";

const skills = [
  "Custom Plugins", "Server Optimization", "Mini-games", "PvP Systems",
  "Economy Systems", "Java", "Spigot / Paper", "Bukkit",
  "Database Integration", "World Generation", "Anti-Cheat", "Scoreboard Systems",
];

const projects = [
  {
    title: "SkyBlock Engine",
    description: "A fully custom SkyBlock experience with island progression, custom challenges, and dynamic economy.",
    tags: ["Java", "Spigot", "MySQL"],
  },
  {
    title: "BattleArena Pro",
    description: "Advanced PvP arena system with ELO rankings, tournaments, and spectator mode.",
    tags: ["Paper", "Redis", "API"],
  },
  {
    title: "CraftEconomy",
    description: "Complete server economy with shops, auctions, trading, and anti-inflation mechanics.",
    tags: ["Bukkit", "MongoDB", "GUI"],
  },
];

const contacts = [
  { platform: "discord", label: "Discord",  value: "CRAFT HUB",            sub: "5K+ Members",      href: "#",                             accent: "#7c3aed" },
  { platform: "spigot",  label: "SpigotMC", value: "github.com/roni",       sub: "50+ Repositories", href: "#",                             accent: "#f97316" },
];

function FloatingCubes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const cubes = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    size: 20 + Math.random() * 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 5,
    opacity: 0.03 + Math.random() * 0.05,
  })), []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {inView && cubes.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-md"
          style={{
            width: c.size,
            height: c.size,
            left: `${c.x}%`,
            top: `${c.y}%`,
            background: `${ACCENT}`,
            opacity: c.opacity,
            border: `1px solid ${ACCENT}20`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MinecraftSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="minecraft" className="relative py-32 overflow-hidden">
      <FloatingCubes />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT}40, transparent 70%)` }}
      />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Minecraft Developer"
          title="CRAFTING"
          titleAccent="WORLDS"
          subtitle="Building immersive Minecraft server experiences with custom plugins, optimized performance, and engaging gameplay systems that keep players coming back."
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
              <span className="text-2xl">⛏️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-heading)" }}>
                About <span style={{ color: ACCENT }}>Me</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                I&apos;m a passionate Minecraft server developer with 5+ years of experience building custom
                plugins and server infrastructure. From small survival servers to large-scale networks,
                I craft unique gameplay experiences.
              </p>
              <p className="text-gray-500 leading-relaxed">
                My expertise spans plugin development, server optimization, database architecture,
                and creating engaging game mechanics that turn players into communities.
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
