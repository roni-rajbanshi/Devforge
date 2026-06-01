"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionHeader({ badge, title, titleAccent, subtitle, accentColor = "#00f0ff" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
        style={{
          background: `${accentColor}10`,
          border: `1px solid ${accentColor}25`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: accentColor }} />
        <span className="text-xs tracking-[3px] uppercase" style={{ color: accentColor, fontFamily: "var(--font-mono)" }}>
          {badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <span className="text-white">{title} </span>
        <span style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {titleAccent}
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

export function SkillGrid({ skills, accentColor = "#00f0ff" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
      {skills.map((skill, i) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="skill-pill interactive"
          style={{
            background: `${accentColor}08`,
            border: `1px solid ${accentColor}20`,
            color: accentColor,
          }}
          whileHover={{
            boxShadow: `0 0 20px ${accentColor}30`,
            borderColor: `${accentColor}50`,
          }}
        >
          {skill}
        </motion.div>
      ))}
    </div>
  );
}

export function ProjectCard({ title, description, tags, accentColor = "#00f0ff", index = 0 }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="interactive glass p-6 rounded-2xl group relative overflow-hidden"
        style={{
          borderColor: `${accentColor}15`,
          transition: "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 40px ${accentColor}20, 0 20px 60px rgba(0,0,0,0.4)`;
          e.currentTarget.style.borderColor = `${accentColor}40`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = `${accentColor}15`;
        }}
      >
        {/* Hover glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}08, transparent 60%)` }}
        />

        {/* Thumbnail area with animated gradient */}
        <div className="w-full h-44 rounded-xl mb-5 overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${accentColor}0a, ${accentColor}04)` }}
        >
          {/* Animated scan line */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute w-full h-[2px] animate-[scanline_2s_ease-in-out_infinite]"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)` }}
            />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(${accentColor}10 1px, transparent 1px), linear-gradient(90deg, ${accentColor}10 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}30`,
                boxShadow: `0 0 30px ${accentColor}15`,
              }}
            >
              <span className="text-2xl" style={{ color: accentColor }}>⚡</span>
            </div>
          </div>

          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase"
            style={{
              background: `${accentColor}15`,
              color: accentColor,
              fontFamily: "var(--font-mono)",
              backdropFilter: "blur(10px)",
            }}
          >
            Featured
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-300"
          style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] tracking-wider uppercase"
              style={{
                background: `${accentColor}08`,
                color: `${accentColor}cc`,
                fontFamily: "var(--font-mono)",
                border: `1px solid ${accentColor}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>


      </div>
    </motion.div>
  );
}

// ─── Platform SVG icons ──────────────────────────────────────────────────────
function PlatformIcon({ platform, color, size = 28 }) {
  const s = size;
  switch (platform) {
    case "discord":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      );
    case "email":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      );
    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case "spigot":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      );
  }
}

// ─── Single 3D Floating Card ──────────────────────────────────────────────────
function FloatingCard({ contact, index, inView }) {
  const cardRef = useRef(null);
  const reflectionRef = useRef(null);
  const accent = contact.accent || contact.accentColor || "#00f0ff";

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 12;

    cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale(1.02)`;

    if (reflectionRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      reflectionRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.10) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    if (reflectionRef.current) reflectionRef.current.style.background = "transparent";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ position: "relative" }}
    >
      {/* Soft gradient glow underneath */}
      <div style={{
        position: "absolute",
        bottom: "-18px",
        left: "10%",
        right: "10%",
        height: "40px",
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${accent}55 0%, transparent 75%)`,
        filter: "blur(12px)",
        zIndex: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }} className="card-underline-glow" />

      <a
        href={contact.href}
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "22px 26px",
          borderRadius: "20px",
          position: "relative",
          zIndex: 1,
          textDecoration: "none",
          cursor: "none",
          transition: "transform 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
          background: "rgba(10,10,20,0.55)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${accent}35`,
          boxShadow: `0 0 24px ${accent}20, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`,
          minHeight: "96px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 48px ${accent}45, 0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`;
          e.currentTarget.style.borderColor = `${accent}70`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = `0 0 24px ${accent}20, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`;
          e.currentTarget.style.borderColor = `${accent}35`;
        }}
      >
        {/* Cursor light reflection */}
        <div ref={reflectionRef} style={{
          position: "absolute", inset: 0, borderRadius: "20px",
          pointerEvents: "none", transition: "background 0.08s ease", zIndex: 2,
        }} />

        {/* Floating Orb */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          style={{
            position: "relative",
            width: "66px",
            height: "66px",
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(circle at 35% 30%, ${accent}55, ${accent}18 55%, transparent 80%)`,
            boxShadow: `0 0 28px ${accent}60, 0 0 60px ${accent}25, inset 0 1px 0 rgba(255,255,255,0.25)`,
            border: `1.5px solid ${accent}50`,
            zIndex: 3,
            transition: "box-shadow 0.3s ease",
          }}
          className="contact-orb"
        >
          {/* Inner orb shimmer */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 60%)",
            pointerEvents: "none",
          }} />
          {/* Drop shadow beneath orb */}
          <div style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "48px",
            height: "12px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${accent}50 0%, transparent 75%)`,
            filter: "blur(6px)",
            pointerEvents: "none",
          }} />
          <PlatformIcon platform={contact.platform} color="#fff" size={30} />
        </motion.div>

        {/* Text content */}
        <div style={{ zIndex: 3, flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "4px",
            opacity: 0.9,
          }}>
            {contact.label}
          </div>
          <div style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {contact.value}
          </div>
          {contact.sub && (
            <div style={{
              fontSize: "12px",
              color: `${accent}99`,
              marginTop: "3px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "1px",
            }}>
              {contact.sub}
            </div>
          )}
        </div>

        {/* Status dot */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 10px ${accent}`,
            flexShrink: 0, zIndex: 3,
          }}
        />
      </a>
    </motion.div>
  );
}

// ─── Contact Card (exported — used by all sections) ───────────────────────────
export function ContactCard({ contacts, accentColor = "#00f0ff" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-white mb-10 text-center"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Let&apos;s <span style={{ color: accentColor }}>Connect</span>
      </motion.h3>
      <div className={`grid gap-5 max-w-3xl mx-auto ${contacts.length === 1 ? "grid-cols-1" : contacts.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        {contacts.map((c, i) => (
          <FloatingCard key={c.label} contact={c} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}
