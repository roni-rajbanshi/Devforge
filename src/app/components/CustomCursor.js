"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    let speed = 0.35; // smooth trailing physics

    const updatePosition = () => {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      requestAnimationFrame(updatePosition);
    };
    requestAnimationFrame(updatePosition);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Text state
      if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'INPUT', 'TEXTAREA'].includes(target.tagName)) {
        if (window.getComputedStyle(target).cursor === 'text' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
           cursor.classList.add("text-state");
        }
      }
      
      // Link state
      if (target.tagName === 'A' || target.closest('a')) {
        cursor.classList.add("link-state");
      }
      
      // Hover state
      if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('interactive') || target.closest('.interactive')) {
        cursor.classList.add("hover-state");
      }
      
      // Drag state
      if (target.closest('.draggable') || target.tagName === 'CANVAS' || target.closest('canvas')) {
        cursor.classList.add("drag-state");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("text-state", "link-state", "hover-state", "drag-state");
    };

    const handleMouseDown = () => {
      cursor.classList.add("click-state");
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple-effect";
      cursor.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    const handleMouseUp = () => {
      cursor.classList.remove("click-state");
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Simulated loading state during route change
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.classList.add("loading-state");
    const timeout = setTimeout(() => {
      cursor.classList.remove("loading-state");
    }, 800);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div ref={cursorRef} className="cursor-wrapper hidden md:block">
      <svg className="cursor-arrow" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2L20 12L12 14L8 22L4 2Z" stroke="var(--color-neon-cyan)" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.1)"/>
        <circle cx="10" cy="12" r="2.5" fill="var(--color-neon-cyan)" />
      </svg>
      
      <div className="cursor-brackets"></div>
      <div className="cursor-ring"></div>
      <div className="cursor-ibeam"></div>
      <div className="cursor-loader"></div>
    </div>
  );
}
