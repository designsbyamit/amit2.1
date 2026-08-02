import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Morphing organic mesh — a displaced icosphere that breathes
function MorphMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Store original positions for morphing
  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 5)
    const pos = geo.attributes.position
    const orig = new Float32Array(pos.array.length)
    orig.set(pos.array)
    return { geometry: geo, originalPositions: orig }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current || !geometry) return
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position
    const count = pos.count

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]

      // Noise-like displacement using multiple sine waves
      const noise =
        Math.sin(ox * 1.2 + t * 0.52) * 0.12 +
        Math.sin(oy * 1.5 + t * 0.38) * 0.10 +
        Math.sin(oz * 1.8 + t * 0.44) * 0.09 +
        Math.sin((ox + oz) * 0.9 + t * 0.28) * 0.08

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const scale = (len + noise) / len

      pos.setXYZ(i, ox * scale, oy * scale, oz * scale)
    }

    pos.needsUpdate = true
    geometry.computeVertexNormals()

    // Slow continuous rotation
    meshRef.current.rotation.x = t * 0.055
    meshRef.current.rotation.y = t * 0.082
    meshRef.current.rotation.z = t * 0.028
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#F5F2ED"
        wireframe
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  )
}

// Outer sparse wireframe shell — larger, slower
function OuterShell() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => new THREE.IcosahedronGeometry(3.4, 2), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = -t * 0.022
    meshRef.current.rotation.y = t * 0.035
  })

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial
        color="#F5F2ED"
        wireframe
        transparent
        opacity={0.035}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function MeshBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#F5F2ED" />
        <pointLight position={[-4, -2, 2]} intensity={0.5} color="#8888ff" />
        <OuterShell />
        <MorphMesh />
      </Canvas>
    </div>
  )
}
