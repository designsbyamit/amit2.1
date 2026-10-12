// A generative score, synthesised live with the Web Audio API: no audio files.
// 96 bpm, 4/4, 48 bars = exactly 120 seconds. The harmony follows the story:
// quiet and open → tense and ticking → steady and building → full peak → resolved.

export const BPM = 96
export const BEAT = 60 / BPM
export const BAR = BEAT * 4
export const DURATION = BAR * 48 // 120 s

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

// chords as MIDI roots (A minor world, resolving to C major)
const A = 45, F = 41, C = 48, G = 43, E = 40, D = 38
const MINOR = [0, 3, 7, 12], MAJOR = [0, 4, 7, 12], MAJ7 = [0, 4, 7, 11], SUS = [0, 2, 7, 12]

type Chord = { root: number; q: number[] }
const prog = (bar: number): Chord => {
  if (bar < 4) return { root: A, q: MINOR }
  if (bar < 11) return [{ root: A, q: MINOR }, { root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: G, q: SUS }][(bar - 4) % 4]
  if (bar < 22) return [{ root: A, q: MINOR }, { root: E, q: MINOR }, { root: F, q: MAJ7 }, { root: D, q: MINOR }][(bar - 11) % 4] // tension
  if (bar < 38) return [{ root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: G, q: SUS }, { root: A, q: MINOR }][(bar - 22) % 4]
  if (bar < 43) return [{ root: F, q: MAJ7 }, { root: G, q: SUS }, { root: A, q: MINOR }, { root: C, q: MAJOR }][(bar - 38) % 4]
  return [{ root: C, q: MAJOR }, { root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: C, q: MAJ7 }][(bar - 43) % 4]
}

export interface Out { ctx: AudioContext; out: AudioNode; noise: AudioBuffer }

export function env(_ctx: AudioContext, g: GainNode, t0: number, a: number, peak: number, d: number, sus = 0, r = 0.1) {
  g.gain.cancelScheduledValues(t0)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.linearRampToValueAtTime(peak, t0 + a)
  g.gain.exponentialRampToValueAtTime(Math.max(sus, 0.0001), t0 + a + d)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d + r)
}

export function tone(o: Out, type: OscillatorType, freq: number, t0: number, len: number, a: number, peak: number, opts: { detune?: number; lp?: number; sus?: number } = {}) {
  const { ctx, out } = o
  const osc = ctx.createOscillator(); osc.type = type; osc.frequency.value = freq; if (opts.detune) osc.detune.value = opts.detune
  const g = ctx.createGain(); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = opts.lp ?? 2400; f.Q.value = 0.7
  osc.connect(f); f.connect(g); g.connect(out)
  env(ctx, g, t0, a, peak, Math.max(0.05, len - a), opts.sus ?? 0.0001, 0.25)
  osc.start(t0); osc.stop(t0 + len + 0.4)
}

export function pad(o: Out, ch: Chord, t0: number, len: number, level: number, bright = 1800) {
  ch.q.forEach((iv, i) => {
    const f = mtof(ch.root + 12 + iv)
    tone(o, 'sawtooth', f, t0, len, len * 0.35, level / 5, { detune: i % 2 ? 6 : -6, lp: bright })
    tone(o, 'sine', f / 2, t0, len, len * 0.3, level / 6)
  })
}

export function bass(o: Out, root: number, t0: number, len: number, level: number) {
  tone(o, 'triangle', mtof(root), t0, len, 0.01, level, { lp: 500 })
  tone(o, 'sine', mtof(root - 12), t0, len, 0.01, level * 0.8)
}

export function pluck(o: Out, midi: number, t0: number, level: number, lp = 3200) {
  tone(o, 'triangle', mtof(midi), t0, 0.5, 0.004, level, { lp })
  tone(o, 'sine', mtof(midi + 12), t0, 0.3, 0.004, level * 0.35)
}

export function bell(o: Out, midi: number, t0: number, level: number) {
  tone(o, 'sine', mtof(midi), t0, 2.4, 0.005, level)
  tone(o, 'sine', mtof(midi) * 2.76, t0, 1.2, 0.005, level * 0.2)
}

export function kick(o: Out, t0: number, level: number) {
  const { ctx, out } = o
  const osc = ctx.createOscillator(); const g = ctx.createGain()
  osc.frequency.setValueAtTime(140, t0); osc.frequency.exponentialRampToValueAtTime(42, t0 + 0.14)
  g.gain.setValueAtTime(level, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28)
  osc.connect(g); g.connect(out); osc.start(t0); osc.stop(t0 + 0.3)
}

export function hat(o: Out, t0: number, level: number, hp = 7000, len = 0.05) {
  const { ctx, out, noise } = o
  const src = ctx.createBufferSource(); src.buffer = noise
  const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp
  const g = ctx.createGain(); g.gain.setValueAtTime(level, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + len)
  src.connect(f); f.connect(g); g.connect(out); src.start(t0, Math.random() * 0.5); src.stop(t0 + len + 0.02)
}

export function riser(o: Out, t0: number, len: number, level: number) {
  const { ctx, out, noise } = o
  const src = ctx.createBufferSource(); src.buffer = noise; src.loop = true
  const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2
  f.frequency.setValueAtTime(300, t0); f.frequency.exponentialRampToValueAtTime(7000, t0 + len)
  const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(level, t0 + len); g.gain.linearRampToValueAtTime(0.0001, t0 + len + 0.12)
  src.connect(f); f.connect(g); g.connect(out); src.start(t0); src.stop(t0 + len + 0.2)
  // pitched sweep
  const osc = ctx.createOscillator(); osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(110, t0); osc.frequency.exponentialRampToValueAtTime(880, t0 + len)
  const og = ctx.createGain(); og.gain.setValueAtTime(0.0001, t0); og.gain.exponentialRampToValueAtTime(level * 0.35, t0 + len); og.gain.linearRampToValueAtTime(0.0001, t0 + len + 0.1)
  const of = ctx.createBiquadFilter(); of.type = 'lowpass'; of.frequency.setValueAtTime(400, t0); of.frequency.exponentialRampToValueAtTime(5000, t0 + len)
  osc.connect(of); of.connect(og); og.connect(out); osc.start(t0); osc.stop(t0 + len + 0.2)
}

export function impact(o: Out, t0: number, level: number) {
  kick(o, t0, level)
  const { ctx, out, noise } = o
  const src = ctx.createBufferSource(); src.buffer = noise
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1800
  const g = ctx.createGain(); g.gain.setValueAtTime(level * 0.5, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.6)
  src.connect(f); f.connect(g); g.connect(out); src.start(t0); src.stop(t0 + 1.7)
}

/** Schedule the whole score from `from` seconds into the film. Returns nothing; stop by disconnecting `out`. */
export function scheduleScore(ctx: AudioContext, out: AudioNode, from: number) {
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const o: Out = { ctx, out, noise: noiseBuf }
  const now = ctx.currentTime + 0.08
  const at = (film: number) => now + (film - from) // film time → audio time
  const ok = (film: number, len = 0) => film + len > from && film < DURATION

  for (let bar = 0; bar < 48; bar++) {
    const ch = prog(bar)
    const b0 = bar * BAR
    const phase = bar < 4 ? 'hook' : bar < 11 ? 'setup' : bar < 22 ? 'problem' : bar < 30 ? 'process' : bar < 38 ? 'arch' : bar < 43 ? 'peak' : 'end'

    // pads: one per bar (hook: every 2 bars)
    if (ok(b0, BAR) && (phase !== 'hook' || bar % 2 === 0)) {
      const bright = phase === 'hook' ? 900 : phase === 'problem' ? 1300 : phase === 'peak' ? 3200 : phase === 'end' ? 1400 : 2000
      const lvl = phase === 'hook' ? 0.5 : phase === 'peak' ? 0.8 : phase === 'end' ? 0.42 : 0.65
      pad(o, ch, at(Math.max(b0, from)), BAR * (phase === 'hook' ? 2 : 1) + 0.4, lvl, bright)
    }

    // bass
    if (phase !== 'hook' && phase !== 'end') {
      for (const beat of phase === 'peak' || phase === 'arch' ? [0, 1.5, 2, 3] : [0, 2]) {
        const tt = b0 + beat * BEAT
        if (ok(tt, 0.5)) bass(o, ch.root - 12 + 12 * 0, at(tt), BEAT * 0.9, phase === 'peak' ? 0.34 : 0.24)
      }
    }
    if (phase === 'end' && bar % 2 === 0 && ok(b0, BAR)) bass(o, ch.root - 12, at(Math.max(b0, from)), BAR * 1.8, 0.2)

    // arpeggio / pulse
    const steps = phase === 'peak' ? 16 : phase === 'arch' ? 8 : phase === 'process' ? 8 : phase === 'setup' ? 4 : phase === 'problem' ? 4 : 0
    if (steps) {
      for (let s = 0; s < steps; s++) {
        const tt = b0 + (s / steps) * BAR
        if (!ok(tt)) continue
        const iv = ch.q[(phase === 'problem' ? [0, 2, 1, 3] : [0, 1, 2, 3, 2, 1, 2, 3])[s % (phase === 'problem' ? 4 : 8)] % ch.q.length]
        const oct = phase === 'peak' ? 24 : 12
        pluck(o, ch.root + oct + iv, at(tt), phase === 'peak' ? 0.16 : phase === 'problem' ? 0.1 : 0.12, phase === 'peak' ? 5200 : 2600)
      }
    }

    // rhythm
    if (phase === 'problem') {
      // ticking clock, quickening
      const per = bar < 15 ? 4 : bar < 19 ? 8 : 16
      for (let s = 0; s < per; s++) { const tt = b0 + (s / per) * BAR; if (ok(tt)) hat(o, at(tt), 0.07 + (bar - 11) * 0.006, 9000, 0.03) }
    }
    if (phase === 'process') {
      for (let s = 0; s < 8; s++) { const tt = b0 + s * BEAT / 2; if (ok(tt) && s % 2) hat(o, at(tt), 0.05, 8000) }
      if (ok(b0)) kick(o, at(b0), 0.28)
    }
    if (phase === 'arch' || phase === 'peak') {
      for (let b = 0; b < 4; b++) { const tt = b0 + b * BEAT; if (ok(tt)) kick(o, at(tt), phase === 'peak' ? 0.4 : 0.3) }
      for (let s = 0; s < 8; s++) { const tt = b0 + s * BEAT / 2; if (ok(tt)) hat(o, at(tt + (s % 2 ? 0 : 0)), s % 2 ? 0.07 : 0.035, 8500) }
    }

    // bells in the denouement and hook
    if (phase === 'end' && ok(b0)) { bell(o, ch.root + 36, at(Math.max(b0, from)), 0.08); if (ok(b0 + BEAT * 2)) bell(o, ch.root + 31 + (ch.q[2] ?? 7) - 7, at(b0 + BEAT * 2), 0.06) }
    if (phase === 'hook' && bar % 2 === 1 && ok(b0 + BEAT)) bell(o, 81, at(b0 + BEAT), 0.06)
  }

  // storytelling accents (film time, seconds)
  const hits: [number, () => void][] = [
    [28, () => impact(o, at(28), 0.18)],        // problem lands
    [42, () => impact(o, at(42), 0.2)],         // severity
    [55, () => impact(o, at(55), 0.22)],        // process
    [75, () => impact(o, at(75), 0.24)],        // architecture
    [95, () => impact(o, at(95), 0.3)],        // PEAK
    [108, () => bell(o, 84, at(108), 0.12)],     // resolve
  ]
  hits.forEach(([tt, fn]) => { if (ok(tt)) fn() })
  if (ok(90, 5)) riser(o, at(Math.max(90, from)), 5 - Math.max(0, from - 90), 0.5)
  if (ok(50, 5)) riser(o, at(Math.max(50, from)), 5 - Math.max(0, from - 50), 0.18)
}

/** Owns the AudioContext and a master gain that can be swapped on seek. */
export class Score {
  ctx: AudioContext | null = null
  master: GainNode | null = null
  muted = false
  start() {
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      this.ctx = new AC()
    }
    void this.ctx.resume()
  }
  private fresh(from: number) {
    if (!this.ctx) return
    if (this.master) { const m = this.master; m.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03); setTimeout(() => m.disconnect(), 400) }
    const g = this.ctx.createGain(); g.gain.value = this.muted ? 0 : 0.9
    const comp = this.ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3
    g.connect(comp); comp.connect(this.ctx.destination)
    this.master = g
    scheduleScore(this.ctx, g, from)
  }
  play(from: number) { this.start(); this.fresh(from) }
  seek(from: number, playing: boolean) { if (playing) this.fresh(from); else this.stop() }
  stop() { if (this.ctx && this.master) { const m = this.master; m.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03); setTimeout(() => m.disconnect(), 400); this.master = null } }
  setMuted(m: boolean) { this.muted = m; if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.9, this.ctx.currentTime, 0.05) }
}
