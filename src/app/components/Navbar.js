"use client";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-hide navbar logic
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      <div className="fixed top-[12px] sm:top-[20px] left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none">
        <motion.nav
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringNav(true)}
          onMouseLeave={() => {
            setIsHoveringNav(false);
            setHoveredTab(null);
          }}
          className="group/nav pointer-events-auto relative flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 h-[60px] sm:h-[68px] rounded-full border border-[#00d4ff]/30 bg-[#020205]/70 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,212,255,0.15),inset_0_0_20px_rgba(0,212,255,0.1)] overflow-hidden w-full max-w-[960px] lg:w-[90%]"
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: -100, opacity: 0 }
          }}
          initial="hidden"
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Faint moving light sweep across entire navbar (Very slow) */}
          <motion.div
            className="absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent skew-x-[-30deg]"
            animate={{ x: [-300, 1400] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />

          {/* Mouse-Responsive Cursor Glow */}
          <AnimatePresence>
            {isHoveringNav && !isMobileMenuOpen && (
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
              {/* Rotating outer ring */}
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
          <div className="hidden md:flex absolute left-1/2 md:left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 sm:gap-2 z-20 whitespace-nowrap">
            {/* Background Energy Line connecting all nav items */}
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
                    {/* Active Indicator */}
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

                    {/* Hover Underline Beam */}
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
          {/* RIGHT: DECORATOR NODE / BURGER */}
          {/* ============================== */}
          <div className="flex items-center gap-2 z-20 mr-1 sm:mr-2">
            {/* Desktop Decorator Node */}
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-[56px] sm:h-[56px] pointer-events-none opacity-100 hidden md:flex">
              <motion.div 
                className="w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_25px_#00f0ff,0_0_40px_#00f0ff]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-[8px] rounded-full border-[2px] border-[#00d4ff]/60 shadow-[inset_0_0_15px_rgba(0,212,255,0.6),0_0_15px_rgba(0,212,255,0.5)]" />
              
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

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#00d4ff]/40 bg-[#020205]/80 pointer-events-auto active:scale-95 transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <div className="relative w-5 h-5 flex flex-col justify-between py-1.5">
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[2px] bg-[#00f0ff] shadow-[0_0_5px_#00f0ff] rounded-full"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                  className="w-5 h-[2px] bg-[#00f0ff] shadow-[0_0_5px_#00f0ff] rounded-full origin-left transition-all"
                />
                <motion.span 
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[2px] bg-[#00f0ff] shadow-[0_0_5px_#00f0ff] rounded-full"
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ============================== */}
      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      {/* ============================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-screen bg-[#020205]/98 backdrop-blur-3xl z-[9990] flex flex-col items-center justify-center p-6 pointer-events-auto"
          >
            {/* Background Matrix/Grid Line overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
            
            {/* Cyber Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a855f7]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Cyber Frame Lines */}
            <div className="absolute top-10 left-10 right-10 bottom-10 border border-[#00f0ff]/10 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
            </div>

            <div className="flex flex-col items-center gap-10 z-10 w-full max-w-[280px]">
              {/* HUD Subtitle */}
              <span className="text-[10px] tracking-[0.4em] font-black text-[#00f0ff] uppercase opacity-70">
                // SYSTEM NAV MAP //
              </span>

              <div className="flex flex-col items-center gap-6 w-full">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="w-full flex items-center justify-center"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full text-center py-3 relative group"
                      >
                        {/* Glowing text */}
                        <span
                          className="text-2xl sm:text-3xl font-bold tracking-[0.25em] uppercase transition-colors duration-300"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: isActive ? "#ffffff" : "#9ca3af",
                            textShadow: isActive ? "0 0 15px rgba(0,212,255,0.8)" : "none"
                          }}
                        >
                          {link.label}
                        </span>
                        
                        {/* Active Indicators */}
                        {isActive && (
                          <motion.div 
                            layoutId="mobileActiveBorder"
                            className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Logo or HUD Footer */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-[#00f0ff]/30 flex items-center justify-center bg-[#020205]">
                  <span className="text-xs font-black text-white tracking-widest drop-shadow-[0_0_8px_#00f0ff]" style={{ fontFamily: "var(--font-heading)" }}>DF</span>
                </div>
                <span className="text-[8px] font-mono text-gray-500 tracking-wider uppercase">// DESIGNED BY DEEPFLOW //</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
