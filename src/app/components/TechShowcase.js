import React from 'react';
import Link from 'next/link';

// Isometric Minecraft Grass Block SVG
const MinecraftIcon = () => (
  <svg viewBox="0 0 64 64" className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-transform duration-300 group-hover:scale-110">
    {/* Top Face - Grass */}
    <polygon points="32,8 56,20 32,32 8,20" fill="#5c8e32" />
    
    {/* Left Face - Dirt */}
    <polygon points="8,20 32,32 32,56 8,44" fill="#866043" />
    
    {/* Right Face - Darker Dirt */}
    <polygon points="32,32 56,20 56,44 32,56" fill="#573d26" />
    
    {/* Left Grass Side Overhang */}
    <polygon points="8,20 14,23 16,21 20,26 24,24 28,29 32,27 32,32 8,20" fill="#467226" />
    
    {/* Right Grass Side Overhang */}
    <polygon points="32,32 36,30 40,33 44,28 48,31 52,26 56,28 56,20 32,32" fill="#3c6320" />
    
    {/* Grass Detail Highlights on Top */}
    <polygon points="20,14 26,17 32,14 26,11" fill="#7ba33c" opacity="0.6" />
    <polygon points="38,17 44,20 42,16 38,14" fill="#7ba33c" opacity="0.6" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 md:w-24 md:h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-110">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.1 18.099a.082.082 0 0 0 .031.058 19.914 19.914 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.972.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.126 10.293 10.293 0 0 0 .372-.29.077.077 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.077.077 0 0 1 .078.01c.12.098.246.19.373.29a.077.077 0 0 1-.006.126 12.96 12.96 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.972a.077.077 0 0 0 .084.028 19.848 19.848 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.094-.838-9.62-3.939-13.873a.057.057 0 0 0-.034-.024zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 md:w-20 md:h-20 text-[#00d4ff] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform duration-300 group-hover:scale-110">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DotGroup = ({ color, count }) => (
  <div className="flex gap-1.5 mt-4 justify-center">
    {[...Array(count)].map((_, i) => (
      <div key={i} className={`w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_8px_currentColor] animate-pulse`} style={{ animationDelay: `${i * 150}ms` }} />
    ))}
  </div>
);

// High-tech circular HUD ring overlay
const HUDRings = ({ activeColor, glowColor }) => (
  <div className="absolute inset-[-15px] md:inset-[-22px] rounded-full pointer-events-none z-0">
    {/* Outermost rotating ticks */}
    <div className="absolute inset-0 rounded-full border border-dashed opacity-25 animate-hud-spin-cw" style={{ borderColor: activeColor }} />
    {/* Middle counter-rotating accent ring */}
    <div className="absolute inset-[6px] rounded-full border border-[#ffffff]/5 border-t-2 border-b-2 opacity-60 animate-hud-spin-ccw" style={{ borderTopColor: activeColor, borderBottomColor: activeColor }} />
    {/* Innermost soft glow layer */}
    <div className="absolute inset-[12px] rounded-full opacity-40 blur-[8px] transition-all duration-300 group-hover:blur-[14px]" style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }} />
  </div>
);

export default function TechShowcase() {
  return (
    <section className="bg-[#030307] text-white py-28 px-6 font-sans relative overflow-hidden">
      {/* Background radial soft lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff9d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top-Left UI Tag */}
        <div className="absolute top-[-70px] left-0 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff]/3 border border-[#ffffff]/5 backdrop-blur-md">
          <span className="text-[10px] font-mono tracking-widest text-[#a855f7]">03.</span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-gray-400">TRIANGULAR CORE LAYOUT</span>
        </div>

        {/* Outer Flex Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-36 relative min-h-[400px]">
          
          {/* ==================== SVG ENERGY BRIDGES (Desktop only) ==================== */}
          <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bridge-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="bridge-right" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow-purple-beam" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Energy Bridge 1: Minecraft -> Discord */}
              {/* Outer fuzzy glowing base */}
              <path d="M 230 200 Q 370 200, 500 200" stroke="url(#bridge-left)" strokeWidth="18" opacity="0.15" filter="url(#glow-purple-beam)" />
              {/* Mid flowing energy wave */}
              <path d="M 230 200 Q 370 190, 500 200" stroke="url(#bridge-left)" strokeWidth="4" opacity="0.8" strokeDasharray="15, 15" className="animate-energy-flow" />
              {/* Sharp electrical spark path */}
              <path d="M 230 200 Q 370 210, 500 200" stroke="url(#bridge-left)" strokeWidth="1.5" opacity="0.9" />

              {/* Energy Bridge 2: Discord -> Web Dev */}
              {/* Outer fuzzy glowing base */}
              <path d="M 500 200 Q 630 200, 770 200" stroke="url(#bridge-right)" strokeWidth="18" opacity="0.15" filter="url(#glow-purple-beam)" />
              {/* Mid flowing energy wave */}
              <path d="M 500 200 Q 630 210, 770 200" stroke="url(#bridge-right)" strokeWidth="4" opacity="0.8" strokeDasharray="15, 15" className="animate-energy-flow" />
              {/* Sharp electrical spark path */}
              <path d="M 500 200 Q 630 190, 770 200" stroke="url(#bridge-right)" strokeWidth="1.5" opacity="0.9" />
            </svg>
          </div>

          {/* ==================== MINECRAFT BUTTON (Left) ==================== */}
          <Link href="/minecraft" className="flex flex-col items-center z-10 group cursor-pointer transition-all duration-300">
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center bg-[#070c0a]/90 border-2 border-[#00ff9d]/30 shadow-[0_0_30px_rgba(0,255,157,0.15)] transition-all duration-500 group-hover:border-[#00ff9d] group-hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] backdrop-blur-md">
              <HUDRings activeColor="#00ff9d" glowColor="rgba(0, 255, 157, 0.4)" />
              <div className="relative z-10 flex items-center justify-center">
                <MinecraftIcon />
              </div>
            </div>
            <h2 className="text-lg md:text-xl font-black mt-8 tracking-[0.2em] text-[#00ff9d] transition-all duration-300 group-hover:text-white" style={{ fontFamily: "var(--font-heading)" }}>MINECRAFT</h2>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mt-1">Developer</p>
            <DotGroup color="bg-[#00ff9d] text-[#00ff9d]" count={4} />
          </Link>

          {/* ==================== DISCORD BUTTON (Center - Larger) ==================== */}
          <Link href="/discord" className="flex flex-col items-center z-10 group cursor-pointer transition-all duration-300">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center bg-[#0c0812]/95 border-2 border-[#a855f7]/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all duration-500 group-hover:border-[#a855f7] group-hover:shadow-[0_0_60px_rgba(168,85,247,0.55)] backdrop-blur-md">
              <HUDRings activeColor="#a855f7" glowColor="rgba(168, 85, 247, 0.5)" />
              <div className="relative z-10 flex items-center justify-center p-2 bg-[#050308]/60 rounded-full border border-white/5">
                <DiscordIcon />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-black mt-8 tracking-[0.2em] text-[#a855f7] transition-all duration-300 group-hover:text-white" style={{ fontFamily: "var(--font-heading)" }}>DISCORD</h2>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mt-1">Developer</p>
            <DotGroup color="bg-[#a855f7] text-[#a855f7]" count={4} />
          </Link>

          {/* ==================== WEB DEV BUTTON (Right) ==================== */}
          <Link href="/web" className="flex flex-col items-center z-10 group cursor-pointer transition-all duration-300">
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center bg-[#070b12]/90 border-2 border-[#00d4ff]/30 shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-all duration-500 group-hover:border-[#00d4ff] group-hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] backdrop-blur-md">
              <HUDRings activeColor="#00d4ff" glowColor="rgba(0, 212, 255, 0.4)" />
              <div className="relative z-10 flex items-center justify-center p-4 bg-[#03060a]/50 rounded-full">
                <CodeIcon />
              </div>
            </div>
            <h2 className="text-lg md:text-xl font-black mt-8 tracking-[0.2em] text-[#00d4ff] transition-all duration-300 group-hover:text-white" style={{ fontFamily: "var(--font-heading)" }}>WEB DEV</h2>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mt-1">Developer</p>
            <DotGroup color="bg-[#00d4ff] text-[#00d4ff]" count={4} />
          </Link>

        </div>

        {/* Bottom-Left UI Tag */}
        <div className="absolute bottom-[-50px] left-0 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff]/3 border border-[#ffffff]/5 backdrop-blur-md">
          <span className="text-[10px] font-mono tracking-widest text-[#00d4ff]">06.</span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-gray-400">NEON GLASS MICRO CARDS</span>
        </div>

      </div>

      {/* Futuristic skewed floor rings */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[150px] md:h-[200px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-floor-pulse" />
        <div className="absolute inset-6 rounded-full border border-[#00d4ff]/10 animate-floor-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-12 rounded-full border border-dashed border-[#00ff9d]/5 animate-[hudSpinClockwise_25s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030307] via-transparent to-transparent z-10" />
      </div>
    </section>
  );
}
