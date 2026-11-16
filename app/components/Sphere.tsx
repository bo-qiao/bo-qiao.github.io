"use client";

import { useEffect, useSyncExternalStore, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    vPosition = position;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPosition;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    vec3 L = normalize(vec3(-0.55, 0.72, 0.42));

    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(reflect(-L, N), V), 0.0), 90.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);

    // Fine angular ridges, warped slightly by latitude for an organic feel.
    float angle = atan(vPosition.x, vPosition.z);
    float warp = sin(vPosition.y * 5.0 + uTime * 0.25) * 0.5;
    float ridge = sin(angle * 72.0 + warp);
    ridge = smoothstep(0.45, 1.0, ridge);

    // Faint latitude banding.
    float lat = sin(vPosition.y * 34.0 - uTime * 0.15);
    lat = smoothstep(0.6, 1.0, lat) * 0.4;

    float shade = 0.35 + 0.65 * diff;

    vec3 color = vec3(0.015);
    color += diff * vec3(0.075);
    color += fres * vec3(0.42);
    color += spec * vec3(0.95);
    color += (ridge * 0.55 + lat * 0.3) * shade * vec3(0.8);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function SphereMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const tiltRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const tilt = tiltRef.current;
    if (!mesh || !tilt) return;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = reduced.current
        ? 0
        : state.clock.elapsedTime;
    }

    if (reduced.current) {
      mesh.rotation.set(0.15, 0.6, 0);
      tilt.rotation.set(0, 0, 0);
      tilt.position.y = 0;
      return;
    }

    const t = state.clock.elapsedTime;
    mesh.rotation.y += delta * 0.12;
    mesh.rotation.x = Math.sin(t * 0.45) * 0.06;
    tilt.rotation.x = THREE.MathUtils.lerp(
      tilt.rotation.x,
      pointer.current.y * 0.18,
      0.06
    );
    tilt.rotation.y = THREE.MathUtils.lerp(
      tilt.rotation.y,
      pointer.current.x * 0.28,
      0.06
    );
    tilt.position.y = Math.sin(t * 0.85) * 0.07;
  });

  return (
    <group ref={tiltRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}

let cachedSupport: boolean | null = null;

function webglSupported() {
  if (cachedSupport !== null) return cachedSupport;
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    cachedSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

function subscribe() {
  return () => {};
}

export default function Sphere() {
  const supported = useSyncExternalStore(
    subscribe,
    () => webglSupported(),
    () => false
  );

  if (!supported) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <SphereMesh />
    </Canvas>
  );
}
