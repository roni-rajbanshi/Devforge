"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { SectionHeader, SkillGrid, ProjectCard, ContactCard } from "./SectionParts";

const ACCENT = "#7c3aed";

const skills = [
  "Discord Bots", "Server Setup", "Moderation Systems", "Verification Systems",
  "Ticket Systems", "Automation", "Community Management", "API Integrations",
  "Webhook Systems", "Role Management", "Custom Commands", "Dashboard UIs",
];

const projects = [
  {
    title: "GuardianBot",
    description: "Advanced moderation bot with AI-powered content filtering, auto-moderation, and detailed analytics dashboard.",
    tags: ["Discord.js", "Node.js", "AI"],
  },
  {
    title: "TicketForge",
    description: "Streamlined ticket system with categories, transcripts, staff management, and SLA tracking.",
    tags: ["TypeScript", "PostgreSQL", "API"],
  },
  {
    title: "CommunityHub",
    description: "All-in-one community management suite with leveling, events, polls, and engagement tracking.",
    tags: ["Python", "Redis", "OAuth"],
  },
];

const contacts = [
  { platform: "discord", label: "Discord",  value: "COZY HUB",             sub: "2.5K+ Members",    href: "#",                             accent: "#7c3aed" },
  { platform: "email",   label: "Email",    value: "hello@roni.dev",        sub: "Response < 24H",   href: "mailto:hello@roni.dev",         accent: "#06b6d4" },
];

function HoloPanels() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const panels = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    w: 60 + Math.random() * 120,
    h: 30 + Math.random() * 60,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 6 + Math.random() * 4,
  })), []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {inView && panels.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg"
          style={{
            width: p.w,
            height: p.h,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `linear-gradient(135deg, ${ACCENT}08, ${ACCENT}03)`,
            border: `1px solid ${ACCENT}10`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function DiscordSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="discord" className="relative py-32 overflow-hidden">
      <HoloPanels />

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT}30, transparent 70%)` }}
      />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)` }}
      />

      <div className="section-container relative z-10">
        <SectionHeader
          badge="Discord Developer"
          title="BUILDING"
          titleAccent="COMMUNITIES"
          subtitle="Creating powerful Discord bots and server infrastructure that automate, moderate, and elevate online communities to the next level."
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
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-heading)" }}>
                About <span style={{ color: ACCENT }}>Me</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                I specialize in building intelligent Discord bots and setting up world-class servers.
                With a deep understanding of community dynamics and automation, I create tools
                that make server management effortless.
              </p>
              <p className="text-gray-500 leading-relaxed">
                From advanced moderation to custom verification systems, my solutions are designed
                to scale with your community while maintaining security and engagement.
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
