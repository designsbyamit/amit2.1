import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function MorphMesh() {
  const groupRef = useRef<THREE.Group>(null)

  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(1.9, 4), [])
  const originalPositions = useMemo(() => {
    const arr = new Float32Array(baseGeo.attributes.position.array.length)
    arr.set(baseGeo.attributes.position.array)
    return arr
  }, [baseGeo])

  const lineGeo = useMemo(() => new THREE.EdgesGeometry(baseGeo), [baseGeo])
  const outerEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.0, 2)), [])

  // Shader material — fades from 60% opacity at left (x=-1) to 0% at right (x=+1)
  const innerMat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec3 vWorldPos;
      void main() {
        // x ranges roughly -2 to +2 in world space
        // map to 0-1 where left(-2)=1, right(+2)=0
        float t = clamp((-vWorldPos.x + 2.0) / 4.0, 0.0, 1.0);
        // opacity: 0.28 on left edge, 0.0 on right edge
        float alpha = t * 0.28;
        gl_FragColor = vec4(0.957, 0.949, 0.929, alpha);
      }
    `,
  }), [])

  const outerMat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec3 vWorldPos;
      void main() {
        float t = clamp((-vWorldPos.x + 3.0) / 6.0, 0.0, 1.0);
        float alpha = t * 0.18;
        gl_FragColor = vec4(0.957, 0.949, 0.929, alpha);
      }
    `,
  }), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    const pos = baseGeo.attributes.position
    const count = pos.count
    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]
      const noise =
        Math.sin(ox * 1.3 + t * 0.45) * 0.09 +
        Math.sin(oy * 1.6 + t * 0.32) * 0.08 +
        Math.sin(oz * 1.9 + t * 0.38) * 0.07 +
        Math.sin((ox + oz) * 0.85 + t * 0.24) * 0.06
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const scale = (len + noise) / len
      pos.setXYZ(i, ox * scale, oy * scale, oz * scale)
    }
    pos.needsUpdate = true
    baseGeo.computeVertexNormals()

    const newEdges = new THREE.EdgesGeometry(baseGeo)
    lineGeo.setIndex(newEdges.getIndex())
    lineGeo.setAttribute('position', newEdges.attributes.position)
    newEdges.dispose()

    // Slow rotation
    groupRef.current.rotation.x = t * 0.042
    groupRef.current.rotation.y = t * 0.068
    groupRef.current.rotation.z = t * 0.020
  })

  return (
    <group ref={groupRef}>
      {/* Inner morph mesh — hidden */}
      {/* <lineSegments geometry={lineGeo} material={innerMat} /> */}
      {/* Outer shell only */}
      <lineSegments geometry={outerEdges} material={outerMat} />
    </group>
  )
}

export default function MeshBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [1.2, 0, 6], fov: 46 }}
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
