import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../lib/hooks";

/* Drifting additive particle shell. */
function ParticleField({
  count,
  rMin,
  rMax,
  color,
  size,
  opacity,
  speed,
  reduced,
}: {
  count: number;
  rMin: number;
  rMax: number;
  color: string;
  size: number;
  opacity: number;
  speed: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = rMin + Math.random() * (rMax - rMin);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, rMin, rMax]);

  useFrame((_, delta) => {
    if (!reduced && ref.current) ref.current.rotation.y -= delta * speed;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* The distorted core + wireframe shell + orbital rings. */
function Core({ reduced }: { reduced: boolean }) {
  const parallax = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Group>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    spin.current.rotation.y += delta * 0.09;
    shell.current.rotation.y -= delta * 0.05;
    shell.current.rotation.x += delta * 0.02;
    ringA.current.rotation.z += delta * 0.12;
    ringB.current.rotation.z -= delta * 0.07;
    // mouse parallax + gentle breathing
    parallax.current.rotation.x = THREE.MathUtils.lerp(
      parallax.current.rotation.x,
      state.pointer.y * 0.22,
      0.04
    );
    parallax.current.rotation.y = THREE.MathUtils.lerp(
      parallax.current.rotation.y,
      state.pointer.x * 0.3,
      0.04
    );
    parallax.current.position.y = Math.sin(t * 0.5) * 0.14;
    // nudge right on wide viewports so type keeps the left
    const targetX = state.viewport.width > 13 ? 1.35 : 0;
    parallax.current.position.x = THREE.MathUtils.lerp(parallax.current.position.x, targetX, 0.03);
  });

  return (
    <group ref={parallax}>
      <group ref={spin}>
        <Float speed={reduced ? 0 : 1.3} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.7}>
          <mesh>
            <icosahedronGeometry args={[1.5, 24]} />
            <MeshDistortMaterial
              color="#151b27"
              metalness={0.88}
              roughness={0.22}
              distort={0.38}
              speed={reduced ? 0 : 1.7}
            />
          </mesh>
        </Float>
      </group>

      <mesh ref={shell} scale={1.34}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshBasicMaterial color="#e4ac52" wireframe transparent opacity={0.16} />
      </mesh>

      <mesh ref={ringA} rotation={[1.15, 0.25, 0]}>
        <torusGeometry args={[2.75, 0.012, 8, 180]} />
        <meshBasicMaterial color="#6e8ea0" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB} rotation={[-0.9, -0.4, 0.4]}>
        <torusGeometry args={[3.35, 0.008, 8, 180]} />
        <meshBasicMaterial color="#e4ac52" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function Scene() {
  const reduced = usePrefersReducedMotion();
  return (
    <div id="webgl-scene" className="fixed inset-0 -z-10" aria-hidden>
      {/* ambient layered glows behind the GL layer */}
      <div className="absolute inset-0 bg-ink-900" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 44% at 78% 30%, rgba(228,172,82,0.09), transparent 70%), radial-gradient(46% 40% at 12% 82%, rgba(110,142,160,0.10), transparent 70%), linear-gradient(180deg, #0b0e14 0%, #0a0d12 55%, #06080c 100%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#0b0e14", 9, 18]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 4]} intensity={1.4} color="#f0c678" />
        <pointLight position={[-6, -4, -5]} intensity={1.2} color="#6e8ea0" />
        <Core reduced={reduced} />
        <ParticleField count={520} rMin={4.2} rMax={9} color="#e4ac52" size={0.035} opacity={0.5} speed={0.02} reduced={reduced} />
        <ParticleField count={380} rMin={3.6} rMax={8.4} color="#8fb0bd" size={0.026} opacity={0.4} speed={0.035} reduced={reduced} />
      </Canvas>
    </div>
  );
}
