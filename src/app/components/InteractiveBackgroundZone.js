"use client";
import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

export default function InteractiveBackgroundZone({ children, theme = "minecraft", color = "#22c55e" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Scaled-down themed items (set to empty to remove floating tags)
  const themedItems = {
    minecraft: [],
    discord: [],
    web: [],
  };

  useEffect(() => {
    // Intersection Observer to enable/disable physics based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Matter.js Module aliases
    const { Engine, World, Bodies, Body } = Matter;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });

    let width = container.clientWidth;
    let height = container.clientHeight;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Create outer bounds (walls)
    const wallThickness = 100;
    const offset = wallThickness / 2;

    const topWall = Bodies.rectangle(width / 2, -offset, width, wallThickness, { isStatic: true });
    const bottomWall = Bodies.rectangle(width / 2, height + offset, width, wallThickness, { isStatic: true });
    const leftWall = Bodies.rectangle(-offset, height / 2, wallThickness, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + offset, height / 2, wallThickness, height, { isStatic: true });

    World.add(engine.world, [topWall, bottomWall, leftWall, rightWall]);

    // Exclusion Zones (Content Rectangles)
    let exclusionZones = [];

    const updateExclusionZones = () => {
      const containerRect = container.getBoundingClientRect();
      const zones = [];

      // Query elements representing visible content layout blocks
      const elements = container.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, button, a, img, input, form, footer, .grid, [class*='rounded'], [class*='card'], [class*='Section']"
      );

      elements.forEach((el) => {
        if (el === canvas || el === container) return;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const x = rect.left - containerRect.left;
        const y = rect.top - containerRect.top;

        // Safety margin buffer around content
        const padding = 25;
        zones.push({
          x1: x - padding,
          y1: y - padding,
          x2: x + rect.width + padding,
          y2: y + rect.height + padding,
        });
      });

      exclusionZones = zones;
    };

    // Helper: sample free coordinate outside content blocks
    const getFreeRandomPoint = (w, h, zones, maxAttempts = 15) => {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;

        let inside = false;
        for (let i = 0; i < zones.length; i++) {
          const z = zones[i];
          if (rx >= z.x1 && rx <= z.x2 && ry >= z.y1 && ry <= z.y2) {
            inside = true;
            break;
          }
        }
        if (!inside) return { x: rx, y: ry };
      }
      // Fallback: spawn close to side margins
      const side = Math.random() < 0.5 ? 0.05 : 0.95;
      return { x: w * side, y: Math.random() * h };
    };

    // Initial content scan
    updateExclusionZones();

    // Create ambient background particles (representing tiny stars/embers, count increased to 380 on behalf of the tags)
    const bgParticles = [];
    const particleCount = 380;
    for (let i = 0; i < particleCount; i++) {
      bgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 - 0.1,
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.55 + 0.2,
        depth: Math.random() * 0.8 + 0.2,
      });
    }

    // Energy sparks / trails
    const sparks = [];

    // Initialize physics bodies
    const items = themedItems[theme] || themedItems.web;
    const bodies = [];

    items.forEach((item) => {
      const spawnPoint = getFreeRandomPoint(width, height, exclusionZones);
      const homeX = spawnPoint.x;
      const homeY = spawnPoint.y;

      let body;
      if (item.type === "orb" || item.type === "rune") {
        body = Bodies.circle(homeX, homeY, item.w / 2, {
          restitution: 0.8,
          friction: 0.05,
          frictionAir: 0.03,
          density: 0.001,
        });
      } else {
        body = Bodies.rectangle(homeX, homeY, item.w, item.h, {
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.04,
          density: 0.001,
        });
      }

      body.pluginData = {
        name: item.name,
        type: item.type,
        color: item.color,
        w: item.w,
        h: item.h,
        homeX,
        homeY,
      };

      bodies.push(body);
    });

    World.add(engine.world, bodies);

    // Mouse tracking (with scroll tracking and raw client mapping)
    let mouse = { x: -1000, y: -1000, px: -1000, py: -1000, vx: 0, vy: 0, active: false, isDown: false };
    let lastClientX = -1000;
    let lastClientY = -1000;
    let draggedBody = null;
    let dragOffset = { x: 0, y: 0 };

    const updateMouseCoords = () => {
      const rect = container.getBoundingClientRect();
      const relX = lastClientX - rect.left;
      const relY = lastClientY - rect.top;

      // Restrict interaction bounds: mouse must be inside the container coordinates
      const isInside = lastClientX > -500 && relX >= 0 && relX <= width && relY >= 0 && relY <= height;

      if (isInside) {
        if (!mouse.active) {
          mouse.px = relX;
          mouse.py = relY;
        }
        mouse.vx = relX - mouse.x;
        mouse.vy = relY - mouse.y;
        mouse.x = relX;
        mouse.y = relY;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handleMouseMove = (e) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      updateMouseCoords();

      if (draggedBody && mouse.active) {
        Body.setPosition(draggedBody, {
          x: mouse.x - dragOffset.x,
          y: mouse.y - dragOffset.y,
        });
        Body.setVelocity(draggedBody, { x: mouse.vx * 0.8, y: mouse.vy * 0.8 });
      }
    };

    const handleScroll = () => {
      updateMouseCoords();
    };

    const handleMouseDown = (e) => {
      if (!mouse.active) return;

      const clickX = mouse.x;
      const clickY = mouse.y;

      // Avoid interception on standard clickable/interactive tags
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        return;
      }

      // Find if we hit a body
      for (let i = bodies.length - 1; i >= 0; i--) {
        const body = bodies[i];
        const dx = clickX - body.position.x;
        const dy = clickY - body.position.y;

        let hit = false;
        if (body.pluginData.type === "orb" || body.pluginData.type === "rune") {
          hit = Math.hypot(dx, dy) < body.pluginData.w / 2;
        } else {
          const cos = Math.cos(-body.angle);
          const sin = Math.sin(-body.angle);
          const rx = dx * cos - dy * sin;
          const ry = dx * sin + dy * cos;
          hit = Math.abs(rx) < body.pluginData.w / 2 && Math.abs(ry) < body.pluginData.h / 2;
        }

        if (hit) {
          draggedBody = body;
          dragOffset = { x: dx, y: dy };
          mouse.isDown = true;
          // Spawn click sparks
          for (let s = 0; s < 15; s++) {
            sparks.push({
              x: clickX,
              y: clickY,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              size: Math.random() * 3 + 1,
              color: body.pluginData.color,
              life: 1.0,
            });
          }
          break;
        }
      }
    };

    const handleMouseUp = () => {
      draggedBody = null;
      mouse.isDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Resize handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Re-position walls
      Body.setPosition(topWall, { x: width / 2, y: -offset });
      Body.setPosition(bottomWall, { x: width / 2, y: height + offset });
      Body.setPosition(leftWall, { x: -offset, y: height / 2 });
      Body.setPosition(rightWall, { x: width + offset, y: height / 2 });

      updateExclusionZones();
    };

    window.addEventListener("resize", handleResize);

    // Render Helpers
    const drawProcessorChip = (c, w, h, name, col) => {
      c.fillStyle = "rgba(180, 180, 180, 0.7)";
      const pinW = 5;
      const pinH = 3;
      const pinSpacing = 10;

      for (let y = -h / 2 + 10; y < h / 2 - 5; y += pinSpacing) {
        c.fillRect(-w / 2 - pinW, y, pinW, pinH);
        c.fillRect(w / 2, y, pinW, pinH);
      }
      for (let x = -w / 2 + 10; x < w / 2 - 5; x += pinSpacing) {
        c.fillRect(x, -h / 2 - pinH, pinH, pinW);
        c.fillRect(x, h / 2, pinH, pinW);
      }

      c.beginPath();
      c.roundRect(-w / 2, -h / 2, w, h, 6);
      c.fillStyle = "rgba(22, 22, 28, 0.95)";
      c.fill();
      c.strokeStyle = `${col}70`;
      c.lineWidth = 1.5;
      c.stroke();

      c.beginPath();
      c.roundRect(-w / 4, -h / 4, w / 2, h / 2, 3);
      c.fillStyle = "rgba(10, 10, 12, 0.9)";
      c.fill();
      c.strokeStyle = col;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "#ffffff";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    const drawTechPanel = (c, w, h, name, col) => {
      c.beginPath();
      c.roundRect(-w / 2, -h / 2, w, h, 8);
      c.fillStyle = "rgba(15, 15, 20, 0.85)";
      c.fill();
      c.strokeStyle = `${col}50`;
      c.lineWidth = 1.2;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "rgba(255,255,255,0.9)";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    const drawRuneArtifact = (c, size, name, col) => {
      const radius = size / 2;
      c.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        c.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      c.closePath();
      c.fillStyle = "rgba(10, 10, 15, 0.9)";
      c.fill();
      c.strokeStyle = col;
      c.lineWidth = 2;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "rgba(255,255,255,0.92)";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    const drawDataOrb = (c, size, name, col) => {
      const r = size / 2;
      const grad = c.createRadialGradient(0, 0, 3, 0, 0, r);
      grad.addColorStop(0, `${col}25`);
      grad.addColorStop(0.8, `${col}08`);
      grad.addColorStop(1, `${col}70`);

      c.beginPath();
      c.arc(0, 0, r, 0, Math.PI * 2);
      c.fillStyle = grad;
      c.fill();
      c.strokeStyle = col;
      c.lineWidth = 1.2;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "#ffffff";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    const drawNeonCube = (c, w, h, name, col) => {
      c.beginPath();
      c.roundRect(-w / 2, -h / 2, w, h, 4);
      c.fillStyle = "rgba(10, 10, 15, 0.9)";
      c.fill();
      c.strokeStyle = `${col}80`;
      c.lineWidth = 2;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "rgba(255,255,255,0.9)";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    const drawHolographicCard = (c, w, h, name, col) => {
      c.beginPath();
      c.roundRect(-w / 2, -h / 2, w, h, 10);
      c.fillStyle = "rgba(10, 20, 30, 0.8)";
      c.fill();
      c.strokeStyle = `${col}60`;
      c.lineWidth = 1.5;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "#ffffff";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    const drawDefaultCard = (c, w, h, name, col) => {
      c.beginPath();
      c.roundRect(-w / 2, -h / 2, w, h, 8);
      c.fillStyle = "rgba(10, 10, 12, 0.9)";
      c.fill();
      c.strokeStyle = col;
      c.stroke();

      c.font = "bold 9px var(--font-mono, monospace)";
      c.fillStyle = "#ffffff";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(name, 0, 0);
    };

    // Main animation loop
    let lastTime = performance.now();
    let lastZoneUpdate = 0;
    let animId;

    const tick = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      // Periodically scan and refresh exclusion zones (every 1.5s) to stay synced with layout shifts
      if (now - lastZoneUpdate > 1500) {
        updateExclusionZones();
        lastZoneUpdate = now;
      }

      // Update Matter.js Engine
      Engine.update(engine, Math.min(delta, 30));

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient background particles (with deep parallax and exclusion checks)
      ctx.save();
      bgParticles.forEach((p) => {
        p.y += p.vy * p.depth;
        p.x += p.vx * p.depth;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Mouse repulsion deflection
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            const push = (120 - d) * 0.05 * p.depth;
            p.x += (dx / d) * push;
            p.y += (dy / d) * push;
          }
        }



        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 2. Draw mouse force field indicator
      const hoverRadius = 160;
      if (mouse.active) {
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, hoverRadius);
        grad.addColorStop(0, `${color}08`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.arc(mouse.x, mouse.y, hoverRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Update & apply forces to physics bodies (Exclusion push + restoring forces)
      bodies.forEach((body) => {
        const data = body.pluginData;
        const bx = body.position.x;
        const by = body.position.y;
        const bw = data.w / 2;
        const bh = data.h / 2;

        // Apply physical push away from exclusion zones to prevent overlapping content
        exclusionZones.forEach((zone) => {
          if (bx + bw > zone.x1 && bx - bw < zone.x2 && by + bh > zone.y1 && by - bh < zone.y2) {
            const zCenterX = (zone.x1 + zone.x2) / 2;
            const zCenterY = (zone.y1 + zone.y2) / 2;
            const dx = bx - zCenterX;
            const dy = by - zCenterY;
            const dist = Math.hypot(dx, dy) || 1;

            const repulsionForce = 0.0006;
            Body.applyForce(body, body.position, {
              x: (dx / dist) * repulsionForce,
              y: (dy / dist) * repulsionForce,
            });
          }
        });

        // Spring pulling back to home coordinate
        if (body !== draggedBody) {
          const homeForceX = (data.homeX - body.position.x) * 0.00002;
          const homeForceY = (data.homeY - body.position.y) * 0.00002;
          Body.applyForce(body, body.position, { x: homeForceX, y: homeForceY });

          // Mouse attraction/repulsion field
          if (mouse.active) {
            const mdx = body.position.x - mouse.x;
            const mdy = body.position.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < hoverRadius) {
              const pushForce = ((hoverRadius - mdist) / hoverRadius) * 0.0002;
              const angle = Math.atan2(mdy, mdx);
              Body.applyForce(body, body.position, {
                x: Math.cos(angle) * pushForce,
                y: Math.sin(angle) * pushForce,
              });

              // Spark trail
              if (Math.random() < 0.1) {
                sparks.push({
                  x: body.position.x,
                  y: body.position.y,
                  vx: Math.cos(angle) * 3 + (Math.random() - 0.5) * 2,
                  vy: Math.sin(angle) * 3 + (Math.random() - 0.5) * 2,
                  size: Math.random() * 2 + 1,
                  color: data.color,
                  life: 0.8,
                });
              }
            }
          }
        }

        // Draw physical connection wire to cursor if close (enhancing snappy physics feel)
        if (mouse.active) {
          const mdx = body.position.x - mouse.x;
          const mdy = body.position.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < hoverRadius) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(body.position.x, body.position.y);
            ctx.strokeStyle = `${data.color}20`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Render physics body shape
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        // Hover glow
        if (mouse.active) {
          const dist = Math.hypot(body.position.x - mouse.x, body.position.y - mouse.y);
          if (dist < 180) {
            ctx.shadowColor = data.color;
            ctx.shadowBlur = 15 * (1 - dist / 180);
          }
        }

        if (body === draggedBody) {
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 20;
        }

        switch (data.type) {
          case "chip":
            drawProcessorChip(ctx, data.w, data.h, data.name, data.color);
            break;
          case "panel":
            drawTechPanel(ctx, data.w, data.h, data.name, data.color);
            break;
          case "rune":
            drawRuneArtifact(ctx, data.w, data.name, data.color);
            break;
          case "orb":
            drawDataOrb(ctx, data.w, data.name, data.color);
            break;
          case "cube":
            drawNeonCube(ctx, data.w, data.h, data.name, data.color);
            break;
          case "card":
            drawHolographicCard(ctx, data.w, data.h, data.name, data.color);
            break;
          default:
            drawDefaultCard(ctx, data.w, data.h, data.name, data.color);
        }

        ctx.restore();
      });

      // 4. Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.life -= 0.02;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [isActive, theme, color]);

  return (
    <div ref={containerRef} className="relative w-full overflow-visible">
      {/* Absolute canvas spanning the entire height of the content wrapper */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: isActive ? 1 : 0, transition: "opacity 1.5s ease" }}
      />
      {/* Content wrapper sits on top */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
