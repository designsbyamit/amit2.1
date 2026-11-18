/**
 * A tiny additive light renderer for the Signal home scene.
 * Every mark on screen (the point, the forces, dust, paths, rims) is a soft round sprite. Sprites add up where they overlap,
 * so crossings glow brighter, the way light does. WebGL2 when available, a Canvas 2D fallback otherwise (fewer, simpler sprites).
 *
 * Buffer layout per sprite, 8 floats: x, y (CSS px), size (CSS px, diameter), r, g, b (0..1), alpha (0..1), hardness (0 soft glow .. 1 crisp core).
 */
export const STRIDE = 8

export interface LightRenderer {
  resize(w: number, h: number, dpr: number): void
  draw(buf: Float32Array, count: number): void
  /** Light mode: the light is drawn as ink on paper instead of glowing on black. */
  setLight(on: boolean): void
  dispose(): void
}

const VS = `#version 300 es
layout(location=0) in vec2 aPos;
layout(location=1) in float aSize;
layout(location=2) in vec4 aCol;
layout(location=3) in float aHard;
uniform vec2 uRes;
uniform float uDpr;
uniform float uMax;
out vec4 vCol;
out float vHard;
void main(){
  vec2 c = aPos / uRes * 2.0 - 1.0;
  gl_Position = vec4(c.x, -c.y, 0.0, 1.0);
  gl_PointSize = min(aSize * uDpr, uMax);
  vCol = aCol;
  vHard = aHard;
}`

const FS = `#version 300 es
precision mediump float;
in vec4 vCol;
in float vHard;
uniform float uLight;
out vec4 o;
void main(){
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d2 = dot(p, p);
  if (d2 > 1.0) discard;
  float k = mix(3.2, 26.0, vHard);
  float a = exp(-d2 * k) * (1.0 - smoothstep(0.85, 1.0, d2));
  vec3 col = vCol.rgb;
  // On paper, colours deepen and white marks become ink.
  float sat = max(col.r, max(col.g, col.b)) - min(col.r, min(col.g, col.b));
  col = mix(col, mix(vec3(0.07, 0.08, 0.1), col * 0.62, smoothstep(0.08, 0.3, sat)), uLight);
  float s = vCol.a * a * mix(1.0, 1.2, uLight);
  vec3 c = col * s;
  // A real alpha keeps the colour valid as premultiplied, so every browser composites it (Safari drops colour with zero alpha).
  // Dark: light adds up. Light: ink lays over the paper.
  o = vec4(c, mix(max(c.r, max(c.g, c.b)), s, uLight));
}`

function makeGL(canvas: HTMLCanvasElement): LightRenderer | null {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'high-performance' })
  if (!gl) return null
  const sh = (t: number, src: string) => { const s = gl.createShader(t)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader'); return s }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  const vao = gl.createVertexArray()!; const vbo = gl.createBuffer()!
  gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  const B = STRIDE * 4
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, B, 0)
  gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 1, gl.FLOAT, false, B, 8)
  gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, B, 12)
  gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 1, gl.FLOAT, false, B, 28)
  const uLight = gl.getUniformLocation(prog, 'uLight'), uRes = gl.getUniformLocation(prog, 'uRes'), uDpr = gl.getUniformLocation(prog, 'uDpr'), uMax = gl.getUniformLocation(prog, 'uMax')
  const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array
  let W = 1, H = 1, D = 1, LT = 0
  return {
    resize(w, h, dpr) { W = w; H = h; D = dpr; canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr) },
    draw(buf, count) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(prog); gl.bindVertexArray(vao)
      gl.uniform2f(uRes, W, H); gl.uniform1f(uDpr, D); gl.uniform1f(uMax, range[1]); gl.uniform1f(uLight, LT)
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, LT ? gl.ONE_MINUS_SRC_ALPHA : gl.ONE)
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
      gl.bufferData(gl.ARRAY_BUFFER, buf.subarray(0, count * STRIDE), gl.DYNAMIC_DRAW)
      gl.drawArrays(gl.POINTS, 0, count)
    },
    setLight(on) { LT = on ? 1 : 0 },
    dispose() { gl.deleteBuffer(vbo); gl.deleteVertexArray(vao); gl.deleteProgram(prog) },
  }
}

function make2D(canvas: HTMLCanvasElement): LightRenderer {
  const x = canvas.getContext('2d')
  if (!x) return { resize() {}, draw() {}, setLight() {}, dispose() {} }
  let D = 1, LT = false
  return {
    resize(w, h, dpr) { D = Math.min(dpr, 1.5); canvas.width = Math.round(w * D); canvas.height = Math.round(h * D) },
    draw(buf, count) {
      x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, canvas.width, canvas.height)
      x.setTransform(D, 0, 0, D, 0, 0); x.globalCompositeOperation = LT ? 'source-over' : 'lighter'
      for (let i = 0; i < count; i++) {
        const o = i * STRIDE, a = buf[o + 6]
        if (a < 0.02) continue
        const s = buf[o + 2], hard = buf[o + 7]
        const k = LT ? 0.62 : 1, inkish = LT && Math.max(buf[o + 3], buf[o + 4], buf[o + 5]) - Math.min(buf[o + 3], buf[o + 4], buf[o + 5]) < 0.15
        const cr = inkish ? 18 : (buf[o + 3] * 255 * k) | 0, cg = inkish ? 20 : (buf[o + 4] * 255 * k) | 0, cb = inkish ? 26 : (buf[o + 5] * 255 * k) | 0
        x.fillStyle = `rgba(${cr},${cg},${cb},${a * (hard > 0.5 ? 0.9 : 0.35)})`
        x.beginPath(); x.arc(buf[o], buf[o + 1], Math.max(0.6, s * (hard > 0.5 ? 0.22 : 0.3)), 0, 6.283); x.fill()
      }
    },
    setLight(on) { LT = on },
    dispose() {},
  }
}

export function createLight(canvas: HTMLCanvasElement): LightRenderer {
  // Try WebGL on a throwaway canvas first: once a canvas has a WebGL context it can never give a 2D one,
  // so a shader that fails to build must not touch the real canvas.
  let ok: boolean
  try { const probe = makeGL(document.createElement('canvas')); ok = !!probe; probe?.dispose() } catch { ok = false }
  if (ok) { try { const g = makeGL(canvas); if (g) return g } catch { /* fall through */ } }
  return make2D(canvas)
}
