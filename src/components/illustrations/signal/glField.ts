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
out vec4 o;
void main(){
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d2 = dot(p, p);
  if (d2 > 1.0) discard;
  float k = mix(3.2, 18.0, vHard);
  float a = exp(-d2 * k) * (1.0 - smoothstep(0.85, 1.0, d2));
  o = vec4(vCol.rgb * vCol.a * a, 0.0);
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
  const uRes = gl.getUniformLocation(prog, 'uRes'), uDpr = gl.getUniformLocation(prog, 'uDpr'), uMax = gl.getUniformLocation(prog, 'uMax')
  const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array
  let W = 1, H = 1, D = 1
  return {
    resize(w, h, dpr) { W = w; H = h; D = dpr; canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr) },
    draw(buf, count) {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(prog); gl.bindVertexArray(vao)
      gl.uniform2f(uRes, W, H); gl.uniform1f(uDpr, D); gl.uniform1f(uMax, range[1])
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
      gl.bufferData(gl.ARRAY_BUFFER, buf.subarray(0, count * STRIDE), gl.DYNAMIC_DRAW)
      gl.drawArrays(gl.POINTS, 0, count)
    },
    dispose() { gl.deleteBuffer(vbo); gl.deleteVertexArray(vao); gl.deleteProgram(prog); gl.getExtension('WEBGL_lose_context')?.loseContext() },
  }
}

function make2D(canvas: HTMLCanvasElement): LightRenderer {
  const x = canvas.getContext('2d')!
  let D = 1
  return {
    resize(w, h, dpr) { D = Math.min(dpr, 1.5); canvas.width = Math.round(w * D); canvas.height = Math.round(h * D) },
    draw(buf, count) {
      x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, canvas.width, canvas.height)
      x.setTransform(D, 0, 0, D, 0, 0); x.globalCompositeOperation = 'lighter'
      for (let i = 0; i < count; i++) {
        const o = i * STRIDE, a = buf[o + 6]
        if (a < 0.02) continue
        const s = buf[o + 2], hard = buf[o + 7]
        x.fillStyle = `rgba(${(buf[o + 3] * 255) | 0},${(buf[o + 4] * 255) | 0},${(buf[o + 5] * 255) | 0},${a * (hard > 0.5 ? 0.9 : 0.35)})`
        x.beginPath(); x.arc(buf[o], buf[o + 1], Math.max(0.6, s * (hard > 0.5 ? 0.22 : 0.3)), 0, 6.283); x.fill()
      }
    },
    dispose() {},
  }
}

export function createLight(canvas: HTMLCanvasElement): LightRenderer {
  try { const g = makeGL(canvas); if (g) return g } catch { /* fall through */ }
  return make2D(canvas)
}
