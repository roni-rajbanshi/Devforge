"use client";
import { useRef, useEffect, useState } from "react";

export default function AntigravityCanvas({ theme = "minecraft", color = "#22c55e" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Define themed item text options
  const itemsPool = {
    minecraft: ["Java", "Paper", "Spigot", "MySQL", "Redis", "Velocity", "API", "Plugin", "SQLite", "BungeeCord", "Item", "Block"],
    discord: ["Discord.js", "Bot", "Node.js", "MongoDB", "OAuth2", "Webhooks", "JSON", "Rest API", "Gateway", "Slash", "Moderation", "Ticket"],
    web: ["Next.js", "React", "TypeScript", "Tailwind", "Three.js", "WebGL", "REST", "Express", "PostgreSQL", "HTML5", "CSS3", "Vercel"],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Physics constants
    const gravity = 0.2;
    const bounce = 0.65;
    const friction = 0.985;
    const mouseRepulsion = 0.6;
    const maxSpeed = 15;

    // Mouse tracking
    let mouse = { x: -1000, y: -1000, px: -1000, py: -1000, vx: 0, vy: 0, active: false };

    // Resize handler
    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = 360; // Fixed interactive height
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particle representation
    class TagParticle {
      constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 4 - 2;
        this.angle = (Math.random() - 0.5) * 0.4;
        this.va = (Math.random() - 0.5) * 0.05;
        this.mass = 1 + text.length * 0.15;

        // Measure text size
        ctx.font = "bold 13px var(--font-mono, monospace)";
        const metrics = ctx.measureText(text);
        this.w = metrics.width + 24; // padding
        this.h = 28; // height
      }

      update() {
        // Apply gravity
        this.vy += gravity;

        // Apply friction
        this.vx *= friction;
        this.vy *= friction;
        this.angle += this.va;
        this.va *= 0.98; // Angular drag

        // Update positions
        this.x += this.vx;
        this.y += this.vy;

        // Wall collisions
        const halfW = this.w / 2;
        const halfH = this.h / 2;

        // Floor
        if (this.y + halfH > height) {
          this.y = height - halfH;
          this.vy = -this.vy * bounce;
          this.vx *= 0.9; // Extra friction on floor
          this.va = -this.vx * 0.03; // Rotate based on sliding friction
        }
        // Ceiling
        if (this.y - halfH < 0) {
          this.y = halfH;
          this.vy = -this.vy * bounce;
        }
        // Left wall
        if (this.x - halfW < 0) {
          this.x = halfW;
          this.vx = -this.vx * bounce;
          this.va = this.vy * 0.03;
        }
        // Right wall
        if (this.x + halfW > width) {
          this.x = width - halfW;
          this.vx = -this.vx * bounce;
          this.va = -this.vy * 0.03;
        }

        // Mouse interaction
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const interactionRadius = 90;

          if (dist < interactionRadius) {
            // Push direction
            const angle = Math.atan2(dy, dx);
            const force = (interactionRadius - dist) / interactionRadius;

            // Add repulsion force
            this.vx += Math.cos(angle) * force * mouseRepulsion * (2 / this.mass);
            this.vy += Math.sin(angle) * force * mouseRepulsion * (2 / this.mass);

            // Transfer mouse movement / "throwing" force
            const speedFactor = 0.15;
            this.vx += mouse.vx * speedFactor * force;
            this.vy += mouse.vy * speedFactor * force;
            this.va += (mouse.vx * 0.02) * force;
          }
        }

        // Speed limit
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const halfW = this.w / 2;
        const halfH = this.h / 2;

        // Draw pill shape background
        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, this.w, this.h, 14);
        ctx.fillStyle = "rgba(10, 10, 15, 0.75)";
        ctx.fill();

        // Draw glowing border
        ctx.strokeStyle = `${color}35`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw inner glow if mouse is close
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          if (Math.hypot(dx, dy) < 120) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.strokeStyle = `${color}75`;
            ctx.stroke();
          }
        }

        // Draw text
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "bold 12px var(--font-mono, monospace)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, 0, 1);

        ctx.restore();
      }
    }

    // Initialize particles
    const pool = itemsPool[theme] || itemsPool.web;
    const particles = [];
    const initialRows = 3;
    const itemsPerRow = Math.ceil(pool.length / initialRows);

    for (let r = 0; r < initialRows; r++) {
      for (let i = 0; i < itemsPerRow; i++) {
        const index = r * itemsPerRow + i;
        if (index >= pool.length) break;
        const text = pool[index];
        // Distribute nicely along width, drop from height
        const startX = (width / (itemsPerRow + 1)) * (i + 1) + (Math.random() - 0.5) * 30;
        const startY = 40 + r * 35;
        particles.push(new TagParticle(text, startX, startY));
      }
    }

    // Loop
    const tick = () => {
      // Calculate mouse speed
      if (mouse.active) {
        mouse.vx = mouse.x - mouse.px;
        mouse.vy = mouse.y - mouse.py;
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        // Slow decay of mouse velocity when stationary
        mouse.vx *= 0.85;
        mouse.vy *= 0.85;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw active field indicator when hovered
      if (isHovered && mouse.active) {
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 90);
        grad.addColorStop(0, `${color}06`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Mouse event handlers
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      if (!mouse.active) {
        mouse.px = currentX;
        mouse.py = currentY;
      }
      
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      setIsHovered(false);
    };

    const onMouseEnter = () => {
      setIsHovered(true);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
        canvas.removeEventListener("mouseenter", onMouseEnter);
      }
    };
  }, [theme, color, isHovered]);

  return (
    <div ref={containerRef} className="w-full relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.01)",
        border: `1.5px dashed ${color}20`,
        height: 360,
      }}>
      <canvas ref={canvasRef} className="block cursor-grab active:cursor-grabbing" />
      
      {/* Decorative center prompt */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-20">
        <span className="text-4xl mb-2">🪐</span>
        <span className="text-[10px] tracking-[4px] uppercase" style={{ color, fontFamily: "var(--font-mono, monospace)" }}>
          Antigravity Sandbox — Hover to Fling Tags
        </span>
      </div>
    </div>
  );
}
