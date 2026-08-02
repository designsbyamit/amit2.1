import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Morphing icosphere using LineSegments + EdgesGeometry — true thin elegant lines
function MorphMesh() {
  const groupRef = useRef<THREE.Group>(null)

  // We'll use a higher subdivision for density but EdgesGeometry for thin lines
  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(1.9, 4), [])
  const originalPositions = useMemo(() => {
    const pos = baseGeo.attributes.position
    const orig = new Float32Array(pos.array.length)
    orig.set(pos.array)
    return orig
  }, [baseGeo])

  const lineGeo = useMemo(() => new THREE.EdgesGeometry(baseGeo), [baseGeo])

  // Outer sparse shell
  const outerBase = useMemo(() => new THREE.IcosahedronGeometry(3.0, 2), [])
  const outerEdges = useMemo(() => new THREE.EdgesGeometry(outerBase), [outerBase])

  // Line materials
  const innerMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#F5F2ED',
    transparent: true,
    opacity: 0.45,
    linewidth: 1, // capped at 1 in WebGL but sets intent
  }), [])

  const outerMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#F5F2ED',
    transparent: true,
    opacity: 0.08,
    linewidth: 1,
  }), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // Morph inner sphere vertices
    const pos = baseGeo.attributes.position
    const count = pos.count
    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]

      const noise =
        Math.sin(ox * 1.3 + t * 0.48) * 0.10 +
        Math.sin(oy * 1.6 + t * 0.35) * 0.09 +
        Math.sin(oz * 1.9 + t * 0.41) * 0.08 +
        Math.sin((ox + oz) * 0.85 + t * 0.26) * 0.07

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const scale = (len + noise) / len
      pos.setXYZ(i, ox * scale, oy * scale, oz * scale)
    }
    pos.needsUpdate = true
    baseGeo.computeVertexNormals()

    // Rebuild edges from morphed base
    const newEdges = new THREE.EdgesGeometry(baseGeo)
    lineGeo.setIndex(newEdges.getIndex())
    lineGeo.setAttribute('position', newEdges.attributes.position)
    newEdges.dispose()

    // Rotation
    groupRef.current.rotation.x = t * 0.048
    groupRef.current.rotation.y = t * 0.075
    groupRef.current.rotation.z = t * 0.024
  })

  return (
    <group ref={groupRef}>
      {/* Inner morphing mesh */}
      <lineSegments geometry={lineGeo} material={innerMat} />
      {/* Outer static shell */}
      <lineSegments geometry={outerEdges} material={outerMat} />
    </group>
  )
}

export default function MeshBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1} />
        <MorphMesh />
      </Canvas>
    </div>
  )
}
