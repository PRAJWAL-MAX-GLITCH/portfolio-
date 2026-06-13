import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function PrajwalAvatar({ speaking }) {
  const groupRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const mouthRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Idle floating
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.04;
      // Subtle head sway
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
    }

    // Eye glow pulse
    if (leftEyeRef.current && rightEyeRef.current) {
      const intensity = speaking
        ? 1.0 + Math.sin(t * 12) * 0.5
        : 0.6 + Math.sin(t * 2) * 0.2;
      leftEyeRef.current.material.emissiveIntensity = intensity;
      rightEyeRef.current.material.emissiveIntensity = intensity;
    }

    // Mouth open/close when speaking
    if (mouthRef.current) {
      const targetScale = speaking ? 0.8 + Math.abs(Math.sin(t * 8)) * 0.6 : 0.3;
      mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetScale, 0.2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ── HEAD ── */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshStandardMaterial color="#0f1629" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* ── VISOR / FACE PLATE ── */}
      <mesh position={[0, 0.58, 0.3]}>
        <boxGeometry args={[0.52, 0.28, 0.06]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* ── EYES ── */}
      <mesh ref={leftEyeRef} position={[-0.13, 0.62, 0.39]}>
        <sphereGeometry args={[0.055, 32, 32]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.13, 0.62, 0.39]}>
        <sphereGeometry args={[0.055, 32, 32]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.8} />
      </mesh>

      {/* ── MOUTH ── */}
      <mesh ref={mouthRef} position={[0, 0.47, 0.4]} scale={[1, 0.3, 1]}>
        <boxGeometry args={[0.18, 0.06, 0.04]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={0.6} />
      </mesh>

      {/* ── NECK ── */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.28, 24]} />
        <meshStandardMaterial color="#0d1225" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* ── BODY / TORSO ── */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.26, 0.34, 0.85, 32]} />
        <meshStandardMaterial color="#0a1020" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* ── CHEST ACCENT STRIPE ── */}
      <mesh position={[0, -0.3, 0.27]}>
        <boxGeometry args={[0.28, 0.55, 0.04]} />
        <meshStandardMaterial
          color="#D4A017"
          emissive="#D4A017"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* ── CHEST CORE ── */}
      <mesh position={[0, -0.28, 0.31]}>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={speaking ? 2.0 : 1.0}
        />
      </mesh>

      {/* ── LEFT SHOULDER ── */}
      <mesh position={[-0.42, -0.15, 0]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#0a1020" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* ── LEFT ARM ── */}
      <mesh position={[-0.46, -0.5, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.09, 0.11, 0.55, 16]} />
        <meshStandardMaterial color="#0d1530" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* ── RIGHT SHOULDER ── */}
      <mesh position={[0.42, -0.15, 0]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#0a1020" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* ── RIGHT ARM ── */}
      <mesh position={[0.46, -0.5, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.09, 0.11, 0.55, 16]} />
        <meshStandardMaterial color="#0d1530" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* ── HEAD TECH RING ── */}
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.015, 16, 100]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function Avatar3D({ speaking = false }) {
  return (
    <div style={{ width: '100%', height: '360px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0.2, 2.6], fov: 46 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[6, 8, 6]} angle={0.2} penumbra={1} intensity={1.4} castShadow />
        <directionalLight position={[-3, 4, 3]} intensity={0.5} color="#D4A017" />
        <pointLight position={[0, 1, 2]} intensity={0.6} color="#10B981" />

        <PrajwalAvatar speaking={speaking} />

        <Environment preset="city" />
        <ContactShadows position={[0, -1.0, 0]} opacity={0.4} scale={6} blur={2.5} far={3} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Speaking sound-wave indicator */}
      {speaking && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '3px',
          alignItems: 'center',
        }}>
          {[6, 12, 18, 12, 6].map((h, i) => (
            <div key={i} style={{
              width: '3px',
              height: `${h}px`,
              background: '#10B981',
              borderRadius: '2px',
              animation: `soundBar 0.5s ease-in-out ${i * 0.08}s infinite alternate`,
            }} />
          ))}
          <style>{`
            @keyframes soundBar {
              from { transform: scaleY(0.4); opacity: 0.5; }
              to { transform: scaleY(1.6); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
