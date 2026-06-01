"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/minecraft", label: "Minecraft" },
  { href: "/discord", label: "Discord" },
  { href: "/web", label: "Web Dev" },
];

// High-tech Cyberpunk Separator
const NavSeparator = () => (
  <div className="flex items-center justify-center pointer-events-none px-1 sm:px-3 opacity-80 group-hover/nav:opacity-100 transition-opacity duration-500 z-10">
    <div className="w-2 sm:w-4 h-[1.5px] bg-gradient-to-r from-transparent to-[#00f0ff]/90" />
    <motion.div 
      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff,0_0_4px_#ffffff] mx-1 sm:mx-1.5"
      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="w-2 sm:w-4 h-[1.5px] bg-gradient-to-l from-transparent to-[#00f0ff]/90" />
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="fixed top-[12px] sm:top-[20px] left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none">
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => {
          setIsHoveringNav(false);
          setHoveredTab(null);
        }}
        // Reduced height slightly (68px) and tightened max-width (960px) to close empty gaps
        className="group/nav pointer-events-auto relative flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 h-[60px] sm:h-[68px] rounded-full border border-[#00d4ff]/30 bg-[#020205]/70 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,212,255,0.15),inset_0_0_20px_rgba(0,212,255,0.1)] overflow-hidden w-full max-w-[960px] lg:w-[90%]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Faint moving light sweep across entire navbar (Very slow) */}
        <motion.div
          className="absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent skew-x-[-30deg]"
          animate={{ x: [-300, 1400] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />

        {/* Mouse-Responsive Cursor Glow */}
        <AnimatePresence>
          {isHoveringNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute pointer-events-none rounded-full blur-[24px] z-0"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0) 70%)",
                width: 200,
                height: 200,
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
              }}
            />
          )}
        </AnimatePresence>

        {/* Inner Glass Layer Reflection */}
        <div className="absolute top-[2px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent opacity-80" />
        <div className="absolute bottom-[2px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

        {/* ============================== */}
        {/* LEFT: LOGO WITH CONNECTOR      */}
        {/* ============================== */}
        <div className="flex items-center z-10 relative">
          <Link href="/" className="interactive relative flex items-center justify-center w-12 h-12 sm:w-[56px] sm:h-[56px] rounded-full group outline-none">
            {/* Rotating outer ring - kept strictly inside the container to prevent clipping */}
            <motion.svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="15 10 5 10" filter="url(#glow-logo)" />
              <circle cx="50" cy="4" r="4" fill="#ffffff" filter="url(#glow-logo)" />
              <circle cx="50" cy="96" r="4" fill="#ffffff" filter="url(#glow-logo)" />
              <defs>
                <filter id="glow-logo" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
            </motion.svg>
            
            {/* Logo Inner Glow */}
            <div className="absolute inset-2 rounded-full bg-[#00d4ff]/20 blur-[5px] group-hover:bg-[#00d4ff]/50 transition-all duration-300 shadow-[0_0_20px_#00d4ff]" />
            
            <span className="relative z-10 text-[13px] font-black text-[#ffffff] tracking-widest drop-shadow-[0_0_10px_#00f0ff]" style={{ fontFamily: "var(--font-heading)" }}>DF</span>
          </Link>
          
          {/* Visual Connector Line from Logo extending into Navbar */}
          <div className="flex items-center h-[2px] w-4 sm:w-8 ml-2 sm:ml-3 bg-gradient-to-r from-[#00f0ff] to-transparent shadow-[0_0_10px_#00f0ff] opacity-80" />
        </div>

        {/* ============================== */}
        {/* CENTER: HIGH-DENSITY TABS      */}
        {/* ============================== */}
        {/* Shifted left to 48% to perfectly balance visual weight */}
        <div className="absolute left-1/2 sm:left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2 z-20 whitespace-nowrap">
          
          {/* Background Energy Line connecting all nav items (Strengthened & Pulsing) */}
          <div className="absolute left-[0%] right-[0%] h-[2px] top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00f0ff]/80 to-transparent pointer-events-none z-[-1] overflow-hidden shadow-[0_0_8px_rgba(0,240,255,0.5)]">
             {/* Traveling energy pulse through the line */}
             <motion.div 
               className="absolute top-0 bottom-0 w-[120px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff,0_0_5px_#ffffff]"
               animate={{ left: ["-20%", "120%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
             />
          </div>

          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredTab === link.href;

            return (
              <div key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  onMouseEnter={() => setHoveredTab(link.href)}
                  className="interactive relative px-4 py-2 sm:px-7 sm:py-3.5 rounded-full outline-none group overflow-hidden transition-transform duration-300 ease-out"
                  style={{ transform: (isActive || isHovered) ? 'scale(1.03)' : 'scale(1)' }}
                >
                  {/* Active Indicator (Softer Glow) */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveBg"
                      className="absolute inset-0 rounded-full border border-[#00d4ff]/40 bg-gradient-to-b from-[#00d4ff]/20 to-[#00d4ff]/5 shadow-[inset_0_0_20px_rgba(0,212,255,0.4),0_0_15px_rgba(0,212,255,0.2)] z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      {/* Active Breathing Inner Glow */}
                      <motion.div 
                        className="absolute inset-0 rounded-full"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.4) 0%, transparent 70%)" }}
                      />
                      
                      {/* Active Tab Light Sweep */}
                      <motion.div
                        className="absolute top-0 bottom-0 w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                        animate={{ x: [-60, 160] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      />
                      
                      {/* Active Tab Local Particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-[2px] h-[2px] bg-[#ffffff] shadow-[0_0_6px_#00d4ff,0_0_10px_#00d4ff] rounded-full"
                            style={{ left: `${15 + i * 18}%`, bottom: 0 }}
                            animate={{ y: [0, -25], opacity: [1, 0] }}
                            transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, delay: i * 0.3 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Bottom Active Connector Node */}
                  {isActive && (
                    <motion.div 
                      layoutId="navActiveBottom"
                      className="absolute -bottom-[2px] left-0 right-0 flex justify-center items-center z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      <div className="absolute w-[90%] h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_12px_#00f0ff]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#00f0ff,0_0_20px_#00f0ff] relative" />
                    </motion.div>
                  )}

                  {/* Hover Underline Beam (For Inactive Tabs) */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navHoverLine"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "60%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Text Label */}
                  <span
                    className="relative z-10 text-[10px] sm:text-[12px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 inline-block"
                    style={{ 
                      fontFamily: "var(--font-heading)", 
                      color: isActive ? "#ffffff" : isHovered ? "#f3f4f6" : "#9ca3af", 
                      textShadow: isActive ? "0 0 15px rgba(0,212,255,0.9)" : isHovered ? "0 0 10px rgba(0,212,255,0.6)" : "none" 
                    }}
                  >
                    {link.label}
                  </span>
                </Link>

                {/* Separator Node between links */}
                {i < navLinks.length - 1 && <NavSeparator />}
              </div>
            );
          })}
        </div>

        {/* ============================== */}
        {/* RIGHT: DECORATOR NODE          */}
        {/* ============================== */}
        {/* Adjusted sizing and inner density to perfectly balance the visual weight of the left "DF" node */}
        <div className="relative flex items-center justify-center w-12 h-12 sm:w-[56px] sm:h-[56px] ml-2 mr-1 sm:mr-2 hidden sm:flex pointer-events-none opacity-100 z-10">
          {/* Intense Center Node */}
          <motion.div 
            className="w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_25px_#00f0ff,0_0_40px_#00f0ff]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Static Inner Ring */}
          <div className="absolute inset-[8px] rounded-full border-[2px] border-[#00d4ff]/60 shadow-[inset_0_0_15px_rgba(0,212,255,0.6),0_0_15px_rgba(0,212,255,0.5)]" />
          
          {/* Animated Outer Dashed Ring - Fit inside container to prevent clipping */}
          <motion.svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
             <circle cx="50" cy="50" r="46" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="10 15" filter="url(#glow-ring)" />
             <defs>
               <filter id="glow-ring" x="-50%" y="-50%" width="200%" height="200%">
                 <feGaussianBlur stdDeviation="3" result="blur" />
                 <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
               </filter>
             </defs>
          </motion.svg>
        </div>
        
      </motion.nav>
    </div>
  );
}
