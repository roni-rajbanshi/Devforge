"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 800 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00f0ff"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#22c55e"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function FloatingGeo() {
  const group = useRef();
  const geoData = useMemo(() => {
    return [...Array(6)].map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const r = 5 + Math.random() * 3;
      return {
        position: [Math.cos(angle) * r, (Math.random() - 0.5) * 4, Math.sin(angle) * r],
        size: 0.3 + Math.random() * 0.3,
        altSize: 0.25 + Math.random() * 0.2,
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      {geoData.map((g, i) => (
        <mesh key={i} position={g.position}>
          {i % 3 === 0 ? (
            <octahedronGeometry args={[g.size, 0]} />
          ) : i % 3 === 1 ? (
            <icosahedronGeometry args={[g.altSize, 0]} />
          ) : (
            <boxGeometry args={[0.3, 0.3, 0.3]} />
          )}
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00f0ff" : "#a855f7"}
            emissive={i % 2 === 0 ? "#00f0ff" : "#a855f7"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        <Particles count={600} />
        <FloatingGeo />
      </Canvas>
    </div>
  );
}
