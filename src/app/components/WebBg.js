"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SpaceStar({ position, size, color }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.scale.x = size * (1 + Math.sin(t * 2 + position[0]) * 0.2);
    mesh.current.scale.y = size * (1 + Math.sin(t * 2 + position[0]) * 0.2);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function FloatingNebula({ position, size, color, speed }) {
  const mesh = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.8;
    mesh.current.rotation.x = t * speed * 0.15;
    mesh.current.rotation.y = t * speed * 0.1;
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

function FloatingPlanet({ position, size, color, speed }) {
  const mesh = useRef();
  const ringRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.3;
    mesh.current.rotation.y = t * speed * 0.1;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * speed * 0.05;
    }
  });

  return (
    <group ref={mesh} position={position}>
      {/* Core Planet */}
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>
      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[size * 1.4, size * 1.8, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Starfield({ count = 300 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00f0ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function WebBg() {
  const stars = useMemo(() => {
    const list = [];
    const colors = ["#00f0ff", "#a855f7", "#ffffff", "#3b82f6"];
    for (let i = 0; i < 40; i++) {
      list.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, -2 - Math.random() * 6],
        size: 0.5 + Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 8, 8]} intensity={0.8} color="#00f0ff" />
        <pointLight position={[-8, -5, 5]} intensity={0.5} color="#a855f7" />
        <fog attach="fog" args={["#0a0a0f", 8, 25]} />

        <Starfield />

        {stars.map((s, i) => (
          <SpaceStar key={i} {...s} />
        ))}

        {/* Floating Planet / Saturn elements */}
        <FloatingPlanet position={[-6, 2, -4]} size={0.8} color="#00f0ff" speed={0.2} />
        <FloatingPlanet position={[6, -2, -5]} size={1.1} color="#a855f7" speed={0.15} />

        {/* Abstract Nebulas */}
        <FloatingNebula position={[0, 4, -6]} size={2.5} color="#00f0ff" speed={0.1} />
        <FloatingNebula position={[2, -4, -4]} size={2} color="#a855f7" speed={0.12} />
      </Canvas>
    </div>
  );
}
