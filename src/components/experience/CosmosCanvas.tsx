"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense } from "react";

export function CosmosCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden opacity-70 lg:block">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Stars radius={60} depth={40} count={800} factor={3} saturation={0} fade speed={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
