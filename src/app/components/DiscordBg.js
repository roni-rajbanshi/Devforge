"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DiscordShape({ position, scale, speed }) {
  const mesh = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.6;
    mesh.current.rotation.z = Math.sin(t * speed * 0.5 + offset) * 0.15;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <circleGeometry args={[1, 32]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.3}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingPanel({ position, width, height, speed }) {
  const mesh = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    mesh.current.rotation.x = Math.sin(t * speed * 0.3) * 0.05;
    mesh.current.rotation.y = Math.sin(t * speed * 0.2 + offset) * 0.08;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color="#5b21b6"
        emissive="#7c3aed"
        emissiveIntensity={0.2}
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function BotHead({ position, speed }) {
  const group = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.5;
    group.current.rotation.y = t * speed * 0.2;
  });

  return (
    <group ref={group} position={position}>
      {/* Head */}
      <mesh>
        <boxGeometry args={[0.8, 0.7, 0.6]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.25} transparent opacity={0.5} />
      </mesh>
      {/* Left eye */}
      <mesh position={[-0.18, 0.05, 0.31]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.18, 0.05, 0.31]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Particles({ count = 200 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a855f7" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function DiscordBg() {
  const panels = useMemo(() => {
    return [...Array(6)].map(() => ({
      position: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, -3 - Math.random() * 8],
      width: 1.5 + Math.random() * 2,
      height: 1 + Math.random() * 1.5,
      speed: 0.15 + Math.random() * 0.2,
    }));
  }, []);

  const shapes = useMemo(() => {
    return [...Array(8)].map(() => ({
      position: [(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 14, -5 - Math.random() * 10],
      scale: 0.3 + Math.random() * 0.8,
      speed: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 8, 8]} intensity={0.6} color="#7c3aed" />
        <pointLight position={[-6, -4, 6]} intensity={0.4} color="#a855f7" />
        <pointLight position={[0, 0, 10]} intensity={0.3} color="#5b21b6" />
        <fog attach="fog" args={["#0a0a0f", 10, 28]} />

        <Particles />

        {/* Floating bot heads */}
        <BotHead position={[-5, 2, -3]} speed={0.3} />
        <BotHead position={[6, -1, -5]} speed={0.25} />
        <BotHead position={[2, 3, -4]} speed={0.35} />

        {/* Holographic panels */}
        {panels.map((p, i) => (
          <FloatingPanel key={i} {...p} />
        ))}

        {/* Discord-like circles */}
        {shapes.map((s, i) => (
          <DiscordShape key={i} {...s} />
        ))}
      </Canvas>
    </div>
  );
}
