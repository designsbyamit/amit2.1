// Beat-driven bed in the style of the Engaze reference track: ~118 bpm, minor, deep sub, warm pad, soft kick/clap/hats, plucked arps.
// Used offline to render the Agentic and Search film scores.
import { tone, pad, pluck, bell, kick, hat, riser, impact, type Out } from './score'

export const VBPM = 118
const BEAT = 60 / VBPM, BAR = BEAT * 4
const MIN = [0, 3, 7, 12], MAJ = [0, 4, 7, 12], MAJ7 = [0, 4, 7, 11]
type Chord = { root: number; q: number[] }
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

export function scheduleVibe(ctx: BaseAudioContext, out: AudioNode, base: number, seconds: number, key = 42, variant = 0) {
  const nb = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const o: Out = { ctx: ctx as AudioContext, out, noise: nb }
  const bars = Math.floor(seconds / BAR)
  const P: Chord[] = variant === 0
    ? [{ root: key, q: MIN }, { root: key - 4, q: MAJ7 }, { root: key - 9 + 12, q: MAJ }, { root: key - 2, q: MAJ }]
    : [{ root: key, q: MIN }, { root: key - 2, q: MAJ }, { root: key - 4, q: MAJ7 }, { root: key - 7 + 12, q: MIN }]
  const ARP = variant === 0 ? [0, 2, 1, 3, 2, 1, 3, 2] : [0, 1, 2, 3, 1, 2, 3, 2]
  const intro = 6, outro = 4
  for (let bar = 0; bar < bars; bar++) {
    const ch = P[bar % 4], b0 = base + bar * BAR
    const beatOn = bar >= intro && bar < bars - outro
    const peak = bar >= Math.floor(bars * 0.55) && bar < bars - outro - 2
    const lift = Math.min(1, bar / intro)
    pad(o, { root: ch.root + 12, q: ch.q }, b0, BAR + 0.3, 0.34 * (0.6 + 0.4 * lift) + (peak ? 0.06 : 0), peak ? 3600 : 2400)
    // deep sub, one note per beat pair
    tone(o, 'sine', mtof(ch.root - 12), b0, BAR, 0.02, bar < 2 ? 0.16 : 0.26, { lp: 160 })
    if (beatOn) {
      for (let b = 0; b < 4; b++) {
        kick(o, b0 + b * BEAT, 0.34)
        tone(o, 'sine', mtof(ch.root), b0 + b * BEAT + BEAT * 0.5, BEAT * 0.45, 0.01, 0.11, { lp: 400 })
      }
      for (const b of [1, 3]) { hat(o, b0 + b * BEAT, 0.1, 1800, 0.08); hat(o, b0 + b * BEAT, 0.05, 4500, 0.06) }
      for (let s = 0; s < 8; s++) hat(o, b0 + (s + 0.5) * BEAT / 2, s % 2 ? 0.035 : 0.05, 9000, 0.03)
    }
    if (bar >= 2 && bar < bars - 1) {
      for (let s = 0; s < 16; s++) {
        if (!beatOn && s % 2) continue
        const iv = ch.q[ARP[s % 8] % ch.q.length]
        pluck(o, ch.root + 24 + iv, b0 + s * BEAT / 4, (peak ? 0.1 : 0.07) * (s % 4 === 0 ? 1.3 : 1), peak ? 6000 : 3800)
      }
    }
    if (bar % 8 === 0 && bar > 0) { riser(o, b0 - 2.2, 2.2, 0.08); impact(o, b0, 0.12) }
    if (!beatOn) bell(o, ch.root + 40 + (bar % 3) * 3, b0 + BEAT * 2.5, 0.05)
  }
}
