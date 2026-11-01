// A denser, driving bed for the leadership film, in the family of the designsbyamit reference:
// 124 bpm, minor, deep sub, warm pad, four-on-the-floor kick, clap on 2 and 4, rolling 16th hats, 8th-note bass and plucked arps,
// with risers and impacts on the section changes. Rendered offline to public/audio/agentic-film-lead-score.mp3.
import { tone, pad, pluck, bell, kick, hat, riser, impact, type Out } from './score'

export const BPM2 = 124
const BEAT = 60 / BPM2, BAR = BEAT * 4
const MIN = [0, 3, 7, 12], MAJ = [0, 4, 7, 12], MAJ7 = [0, 4, 7, 11]
type Chord = { root: number; q: number[] }
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

function clap(o: Out, t0: number, level: number) {
  const { ctx, out, noise } = o
  for (let k = 0; k < 3; k++) {
    const at = t0 + k * 0.012
    const src = ctx.createBufferSource(); src.buffer = noise
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1600; f.Q.value = 0.9
    const g = ctx.createGain(); g.gain.setValueAtTime(level * (k === 2 ? 1 : 0.6), at); g.gain.exponentialRampToValueAtTime(0.0001, at + (k === 2 ? 0.2 : 0.03))
    src.connect(f); f.connect(g); g.connect(out); src.start(at, Math.random() * 0.4); src.stop(at + 0.24)
  }
}
function snare(o: Out, t0: number, level: number) {
  const { ctx, out, noise } = o
  const src = ctx.createBufferSource(); src.buffer = noise
  const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 1400
  const g = ctx.createGain(); g.gain.setValueAtTime(level, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14)
  src.connect(f); f.connect(g); g.connect(out); src.start(t0, Math.random() * 0.4); src.stop(t0 + 0.16)
  tone(o, 'triangle', 190, t0, 0.1, 0.002, level * 0.5, { lp: 1200 })
}

/** Section plan, in bars (64 bars at 124 bpm = 123.9 s). */
const S = { intro: 0, problem: 4, concept: 12, arch: 28, flow: 34, auto: 52, close: 58, end: 64 }

export function scheduleBeat(ctx: BaseAudioContext, out: AudioNode, base: number, key = 38) {
  const nb = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const o: Out = { ctx: ctx as AudioContext, out, noise: nb }
  // i - VI - III - VII, with a lift in the peak
  const P: Chord[] = [{ root: key, q: MIN }, { root: key - 4, q: MAJ7 }, { root: key - 9 + 12, q: MAJ }, { root: key - 2, q: MAJ }]
  const ARP = [0, 2, 1, 3, 2, 1, 3, 2, 0, 2, 3, 1, 2, 3, 1, 3]
  const bars = S.end + 2

  for (let bar = 0; bar < bars; bar++) {
    const b0 = base + bar * BAR
    const ch = bar >= S.close + 2 ? { root: key, q: MIN } : P[bar % 4]
    const live = bar < S.end
    const inIntro = bar < S.problem
    const beatOn = bar >= S.problem && bar < S.close + 4
    const breakBar = bar === 43 || bar === S.auto - 1 || bar === S.arch - 1 // short drops before the peaks
    const peak = bar >= S.flow && bar < S.auto
    const heavy = (bar >= S.concept && bar < S.arch) || peak
    const lift = Math.min(1, bar / 4)

    // pad and sub
    pad(o, { root: ch.root + 12, q: ch.q }, b0, BAR + 0.3, 0.3 * (0.55 + 0.45 * lift) + (peak ? 0.06 : 0), peak ? 3800 : 2400)
    tone(o, 'sine', mtof(ch.root - 12), b0, BAR, 0.02, inIntro ? 0.16 : 0.27, { lp: 160 })

    if (beatOn && live && !breakBar) {
      const fadeOut = bar >= S.close + 2 ? 0.55 : 1
      for (let b = 0; b < 4; b++) {
        kick(o, b0 + b * BEAT, 0.4 * fadeOut)
        hat(o, b0 + b * BEAT + BEAT / 2, 0.11 * fadeOut, 7500, 0.09) // open off-beat hat
      }
      for (const b of [1, 3]) { clap(o, b0 + b * BEAT, 0.2 * fadeOut); if (heavy) snare(o, b0 + b * BEAT, 0.06) }
      // 16th hats, accented, ghost notes thicker in the heavy sections
      for (let s = 0; s < 16; s++) hat(o, b0 + s * BEAT / 4, (s % 4 === 0 ? 0.045 : s % 2 === 0 ? 0.06 : heavy ? 0.04 : 0.025) * fadeOut, 9000, 0.03)
      // 8th-note bass pulse with octave jumps
      for (let s = 0; s < 8; s++) {
        const up = s % 4 === 3 ? 12 : 0
        tone(o, 'sawtooth', mtof(ch.root - 12 + up), b0 + s * BEAT / 2, BEAT * 0.42, 0.008, (s % 2 ? 0.1 : 0.15) * fadeOut, { lp: peak ? 520 : 380 })
      }
    }
    // fills every 4th bar before a change: snare roll
    if (beatOn && bar % 4 === 3 && bar < S.close) for (let s = 0; s < 8; s++) snare(o, b0 + 3 * BEAT + s * BEAT / 8, 0.035 + s * 0.012)

    // arps
    if (bar >= 2 && live) {
      for (let s = 0; s < 16; s++) {
        if (!beatOn && s % 2) continue
        if (breakBar && s % 4) continue
        const iv = ch.q[ARP[s] % ch.q.length]
        pluck(o, ch.root + 24 + iv, b0 + s * BEAT / 4, (peak ? 0.1 : heavy ? 0.085 : 0.06) * (s % 4 === 0 ? 1.3 : 1), peak ? 6500 : 4000)
      }
    }
    // lead hook in the peak: two plucked notes per bar
    if (peak) { pluck(o, ch.root + 36, b0 + BEAT * 1.5, 0.09, 7000); pluck(o, ch.root + 36 + (ch.q[2] ?? 7), b0 + BEAT * 3, 0.08, 7000) }

    // risers and impacts on the section changes
    for (const s of [S.problem, S.concept, S.arch, S.flow, S.auto, S.close]) if (bar === s && bar > 0) { riser(o, b0 - 2.4, 2.4, 0.09); impact(o, b0, bar === S.flow ? 0.2 : 0.13) }
    if (bar === 44) impact(o, b0, 0.16)
    if (!beatOn) bell(o, ch.root + 40 + (bar % 3) * 3, b0 + BEAT * 2.5, 0.05)
    if (bar >= S.close + 2 && bar % 2 === 0) bell(o, ch.root + 36 + (bar % 4) * 2, b0 + BEAT * 1.5, 0.06)
  }
}
