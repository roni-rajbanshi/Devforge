"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function VoxelBlock({ position, color, speed }) {
  const mesh = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.5;
    mesh.current.rotation.x = t * speed * 0.3;
    mesh.current.rotation.y = t * speed * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        roughness={0.6}
        metalness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function GrassBlock({ position }) {
  const mesh = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + offset) * 0.2;
  });

  return (
    <group ref={mesh} position={position}>
      {/* Dirt */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial color="#6b4226" roughness={0.9} transparent opacity={0.5} />
      </mesh>
      {/* Grass top */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function MinecraftScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const blocks = useMemo(() => {
    const items = [];
    const colors = ["#22c55e", "#16a34a", "#4ade80", "#166534", "#15803d"];
    for (let i = 0; i < 30; i++) {
      items.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 15 - 5],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  const grassBlocks = useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        position: [(Math.random() - 0.5) * 18, -4 + Math.random() * 2, (Math.random() - 0.5) * 12 - 3],
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {blocks.map((b, i) => (
        <VoxelBlock key={i} {...b} />
      ))}
      {grassBlocks.map((b, i) => (
        <GrassBlock key={`g${i}`} {...b} />
      ))}
    </group>
  );
}

export default function MinecraftBg() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[8, 8, 8]} intensity={0.8} color="#22c55e" />
        <pointLight position={[-8, -5, 5]} intensity={0.4} color="#4ade80" />
        <directionalLight position={[0, 10, 5]} intensity={0.3} color="#ffffff" />
        <fog attach="fog" args={["#0a0a0f", 10, 30]} />
        <MinecraftScene />
      </Canvas>
    </div>
  );
}
