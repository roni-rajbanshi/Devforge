"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// SVG ICONS
// ==========================================

const MinecraftIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] z-10 relative">
    {/* Top Face - Grass */}
    <polygon points="32,12 56,24 32,36 8,24" fill="#4ade80" />
    {/* Left Face - Dirt */}
    <polygon points="8,24 32,36 32,60 8,48" fill="#78350f" />
    {/* Right Face - Darker Dirt */}
    <polygon points="32,36 56,24 56,48 32,60" fill="#451a03" />
    {/* Left Grass Side Overhang */}
    <polygon points="8,24 14,27 16,25 20,30 24,28 28,33 32,31 32,36 8,24" fill="#22c55e" />
    {/* Right Grass Side Overhang */}
    <polygon points="32,36 36,34 40,37 44,32 48,35 52,30 56,32 56,24 32,36" fill="#16a34a" />
    {/* Grass Detail Highlights on Top */}
    <polygon points="20,18 26,21 32,18 26,15" fill="#86efac" opacity="0.6" />
    <polygon points="38,21 44,24 42,20 38,18" fill="#86efac" opacity="0.6" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 sm:w-14 sm:h-14 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] z-10 relative">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.1 18.099a.082.082 0 0 0 .031.058 19.914 19.914 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.972.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.126 10.293 10.293 0 0 0 .372-.29.077.077 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.077.077 0 0 1 .078.01c.12.098.246.19.373.29a.077.077 0 0 1-.006.126 12.96 12.96 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.972a.077.077 0 0 0 .084.028 19.848 19.848 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.094-.838-9.62-3.939-13.873a.057.057 0 0 0-.034-.024zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-[0_0_15px_rgba(0,212,255,1)] z-10 relative">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);


// ==========================================
// CORE GLASS ORB COMPONENT
// ==========================================

const CoreOrb = ({ color, icon: Icon, isHovered }) => {
  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 flex items-center justify-center">
      
      {/* Outer Orbiting SVG HUD Ring */}
      <motion.svg 
        viewBox="0 0 100 100" 
        className="absolute inset-[0%] w-[100%] h-[100%] pointer-events-none scale-[1.35]"
        animate={{ rotate: isHovered ? 180 : 360 }}
        transition={{ duration: isHovered ? 4 : 20, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke={`${color}40`} strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={`${color}30`} strokeWidth="1" />
        
        {/* Orbital nodes (The 4 glowing dots on the ring) */}
        <circle cx="50" cy="4" r="2.5" fill={color} filter="url(#glow)" />
        <circle cx="50" cy="96" r="2.5" fill={color} filter="url(#glow)" />
        <circle cx="4" cy="50" r="2.5" fill={color} filter="url(#glow)" />
        <circle cx="96" cy="50" r="2.5" fill={color} filter="url(#glow)" />

        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>

      {/* Inner counter-rotating ring */}
      <motion.svg 
        viewBox="0 0 100 100" 
        className="absolute inset-[0%] w-[100%] h-[100%] pointer-events-none scale-[1.15]"
        animate={{ rotate: isHovered ? -180 : -360 }}
        transition={{ duration: isHovered ? 5 : 25, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="44" fill="none" stroke={`${color}70`} strokeWidth="0.75" strokeDasharray="30 15 10 15" />
      </motion.svg>

      {/* The 3D Glass Sphere */}
      <motion.div 
        className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-md"
        style={{
          background: `radial-gradient(circle at 40% 30%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)`,
          border: `1px solid rgba(255,255,255,0.1)`
        }}
        animate={{ 
          boxShadow: isHovered 
            ? `inset 0 0 50px ${color}90, 0 0 45px ${color}70` 
            : `inset 0 0 30px ${color}50, 0 0 25px ${color}30`,
          borderColor: isHovered ? `rgba(255,255,255,0.3)` : `rgba(255,255,255,0.1)`
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Specular Top Highlight (Glass Reflection) */}
        <div className="absolute top-[8%] left-[15%] w-[65%] h-[28%] rounded-[100%] bg-gradient-to-b from-white/30 to-transparent blur-[1.5px] -rotate-12 z-0" />
        
        {/* Deep Ambient Bottom Glow */}
        <motion.div 
          className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[60%] rounded-[100%] blur-[16px] z-0"
          style={{ backgroundColor: color }}
          animate={{ opacity: isHovered ? 0.9 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Center Icon Wrapper */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            animate={{ scale: isHovered ? 1.15 : 1, y: isHovered ? -2 : 0 }} 
            transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
          >
            <Icon />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
};


// ==========================================
// NAVIGATION NODE (FLOATING PORTAL)
// ==========================================

const NavNode = ({ title, subtitle, href, color, icon: Icon, floatDelay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const particles = React.useMemo(() => {
    if (!mounted) return [];
    return [...Array(6)].map(() => ({
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * -10,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }));
  }, [mounted]);

  return (
    <div className="relative group perspective-[1000px]">
      <Link href={href} passHref>
        <motion.div 
          className="flex flex-col items-center justify-center gap-6 relative cursor-pointer outline-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.92 }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        >
          {/* Individual Particle Field */}
          <div className="absolute inset-[-40px] pointer-events-none overflow-visible">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: color,
                  top: p.top,
                  left: p.left,
                  boxShadow: `0 0 10px ${color}`
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <CoreOrb color={color} icon={Icon} isHovered={isHovered} />

          {/* Text Container */}
          <div className="relative flex flex-col items-center justify-center pt-2 z-10 text-center">
            {/* Title */}
            <motion.h3 
              className="text-xl sm:text-2xl font-black tracking-[0.1em] z-10 uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
              animate={{ color: isHovered ? '#ffffff' : '#d1d5db', textShadow: isHovered ? `0 0 20px ${color}` : `0 0 0px ${color}` }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p 
              className="text-[10px] sm:text-xs tracking-[0.35em] uppercase z-10 font-bold mt-2"
              style={{ fontFamily: "var(--font-mono)", color: isHovered ? '#f3f4f6' : '#6b7280' }}
              animate={{ textShadow: isHovered ? '0 0 8px rgba(255,255,255,0.4)' : 'none' }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Individual Floor Glow beneath the node */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-6 rounded-[100%] blur-[12px] z-[-1] pointer-events-none"
            style={{ backgroundColor: color }}
            animate={{ opacity: isHovered ? 0.6 : 0.2, scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />

        </motion.div>
      </Link>
    </div>
  );
};


// ==========================================
// MAIN NAVIGATION SECTION
// ==========================================

export default function CyberNav() {
  return (
    <section className="relative w-full py-16 sm:py-24 flex justify-center items-center overflow-visible z-20">
      
      {/* Background Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vh] bg-[#00ff9d]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[40vw] h-[40vh] bg-[#a855f7]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[40vw] h-[40vh] bg-[#00d4ff]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-32 xl:gap-40 max-w-[1400px] w-full mx-auto px-4 z-10 relative mt-8">
        <NavNode 
          title="MINECRAFT" 
          subtitle="Developer" 
          href="/minecraft" 
          color="#00ff9d" 
          icon={MinecraftIcon} 
          floatDelay={0}
        />
        <NavNode 
          title="DISCORD" 
          subtitle="Developer" 
          href="/discord" 
          color="#a855f7" 
          icon={DiscordIcon} 
          floatDelay={2}
        />
        <NavNode 
          title="WEB DEV" 
          subtitle="Developer" 
          href="/web" 
          color="#00d4ff" 
          icon={CodeIcon} 
          floatDelay={4}
        />
      </div>
    </section>
  );
}
