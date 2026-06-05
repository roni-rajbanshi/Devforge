"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Platform SVG Icons ───────────────────────────────────────────────────────
function PlatformIcon({ platform, color = "#fff", size = 28 }) {
  const s = size;
  switch (platform) {
    case "discord":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case "email":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "spigot":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
      );
  }
}

// ─── Single 3D Floating Card ──────────────────────────────────────────────────
function FloatingCard({ contact, index, inView }) {
  const cardRef = useRef(null);
  const reflectionRef = useRef(null);
  const accent = contact.accent || "#00f0ff";

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 12;
    cardRef.current.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale(1.02)`;
    if (reflectionRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      reflectionRef.current.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.10) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    if (reflectionRef.current) reflectionRef.current.style.background = "transparent";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ position: "relative" }}
    >
      {/* Soft glow underneath card */}
      <div style={{
        position: "absolute",
        bottom: "-20px",
        left: "12%",
        right: "12%",
        height: "42px",
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${accent}55 0%, transparent 75%)`,
        filter: "blur(14px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      <a
        href={contact.href}
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 52px ${accent}50, 0 18px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)`;
          e.currentTarget.style.borderColor = `${accent}75`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = `0 0 26px ${accent}22, 0 10px 34px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)`;
          e.currentTarget.style.borderColor = `${accent}38`;
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "18px 20px",
          borderRadius: "22px",
          position: "relative",
          zIndex: 1,
          textDecoration: "none",
          transition: "transform 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.3s ease",
          transformStyle: "preserve-3d",
          background: "rgba(8,8,18,0.60)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: `1px solid ${accent}38`,
          boxShadow: `0 0 26px ${accent}22, 0 10px 34px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)`,
          minHeight: "88px",
        }}
      >
        {/* Cursor light reflection layer */}
        <div
          ref={reflectionRef}
          style={{
            position: "absolute", inset: 0, borderRadius: "22px",
            pointerEvents: "none", transition: "background 0.08s ease", zIndex: 2,
          }}
        />

        {/* Floating Orb */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.45 }}
          style={{
            position: "relative",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(circle at 32% 28%, ${accent}60, ${accent}1a 55%, transparent 80%)`,
            boxShadow: `0 0 32px ${accent}65, 0 0 64px ${accent}28, inset 0 1px 0 rgba(255,255,255,0.28)`,
            border: `1.5px solid ${accent}55`,
            zIndex: 3,
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Specular highlight on orb */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.24), transparent 58%)",
            pointerEvents: "none",
          }} />
          {/* Shadow beneath orb */}
          <div style={{
            position: "absolute",
            bottom: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50px",
            height: "14px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${accent}52 0%, transparent 75%)`,
            filter: "blur(7px)",
            pointerEvents: "none",
          }} />
          <PlatformIcon platform={contact.platform} color="#fff" size={30} />
        </motion.div>

        {/* Text */}
        <div style={{ zIndex: 3, flex: 1, minWidth: 0, textAlign: "left" }}>
          <div style={{
            fontSize: "10.5px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "2.8px",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "5px",
            opacity: 0.85,
          }}>
            {contact.label}
          </div>
          <div style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {contact.value}
          </div>
          {contact.sub && (
            <div style={{
              fontSize: "11.5px",
              color: `${accent}95`,
              marginTop: "4px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "1px",
            }}>
              {contact.sub}
            </div>
          )}
        </div>

        {/* Pulsing status dot */}
        <motion.div
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{
            width: "9px", height: "9px", borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 12px ${accent}`,
            flexShrink: 0, zIndex: 3,
          }}
        />
      </a>
    </motion.div>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────────
export default function FloatingContactCards({ contacts }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  let gridClass = "w-full mx-auto grid gap-5 ";
  if (contacts.length === 1) gridClass += "grid-cols-1 max-w-[400px]";
  else if (contacts.length === 2) gridClass += "grid-cols-1 md:grid-cols-2 max-w-[820px]";
  else gridClass += "grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 max-w-[1100px]";

  // Force 3 columns on medium screens and up
  if (contacts.length > 2) gridClass = "w-full mx-auto grid gap-5 grid-cols-1 md:grid-cols-3 max-w-[1100px]";

  return (
    <div ref={ref} className={gridClass}>
      {contacts.map((c, i) => (
        <FloatingCard key={c.label} contact={c} index={i} inView={inView} />
      ))}
    </div>
  );
}
