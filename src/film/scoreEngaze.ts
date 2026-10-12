// Score for the Engaze teaser. Rendered offline into public/audio/engaze-teaser-score.mp3. 100 bpm, 24 bars = 57.6 s.
import { tone, pad, bass, pluck, bell, kick, hat, riser, impact, type Out } from './score'

export const EBPM = 100
export const EBEAT = 60 / EBPM
export const EBAR = EBEAT * 4
export const EDURATION = EBAR * 24

const D = 38, B = 35, G = 43, A = 45
const MIN = [0, 3, 7, 12], MAJ = [0, 4, 7, 12], MAJ7 = [0, 4, 7, 11], SUS = [0, 2, 7, 12]
type Chord = { root: number; q: number[] }
const prog = (bar: number): Chord => {
  const l: Chord[] = bar < 2 ? [{ root: D, q: MIN }] : bar < 6 ? [{ root: D, q: MIN }, { root: B + 12, q: MAJ7 }, { root: G, q: MAJ7 }, { root: A, q: SUS }] : bar < 10 ? [{ root: G, q: MAJ7 }, { root: D, q: MAJ }, { root: A, q: SUS }, { root: D, q: MIN }] : bar < 20 ? [{ root: D, q: MAJ7 }, { root: G, q: MAJ7 }, { root: B + 12, q: MIN }, { root: A, q: SUS }] : [{ root: G, q: MAJ7 }, { root: D, q: MAJ }, { root: G, q: MAJ7 }, { root: D, q: MAJ7 }]
  return l[bar % l.length]
}

export function scheduleEngaze(ctx: BaseAudioContext, out: AudioNode, base = 0.08) {
  const nb = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const o: Out = { ctx: ctx as AudioContext, out, noise: nb }
  const at = (t: number) => base + t
  for (let bar = 0; bar < 24; bar++) {
    const ch = prog(bar), b0 = bar * EBAR
    const ph = bar < 2 ? 'hook' : bar < 6 ? 'problem' : bar < 10 ? 'principles' : bar < 20 ? 'proto' : 'end'
    pad(o, ch, at(b0), EBAR + 0.4, ph === 'hook' ? 0.45 : ph === 'proto' ? 0.65 : ph === 'end' ? 0.45 : 0.55, ph === 'proto' ? 2600 : 1400)
    if (ph !== 'hook' && ph !== 'end') for (const b of ph === 'proto' ? [0, 1.5, 2, 3] : [0, 2]) bass(o, ch.root - 12, at(b0 + b * EBEAT), EBEAT * 0.9, ph === 'proto' ? 0.28 : 0.2)
    const steps = ph === 'proto' ? 8 : ph === 'principles' ? 8 : ph === 'problem' ? 4 : 0
    for (let s = 0; s < steps; s++) { const pat = [0, 1, 2, 3, 2, 1, 3, 2]; pluck(o, ch.root + 12 + ch.q[pat[s % 8] % ch.q.length], at(b0 + (s / steps) * EBAR), 0.12, ph === 'proto' ? 3800 : 2400) }
    if (ph === 'problem') for (let s = 0; s < 8; s++) hat(o, at(b0 + s * EBEAT / 2), 0.04 + (bar - 2) * 0.01, 9000, 0.03)
    if (ph === 'principles' || ph === 'proto') { for (let b = 0; b < 4; b++) if (ph === 'proto' || b % 2 === 0) kick(o, at(b0 + b * EBEAT), ph === 'proto' ? 0.3 : 0.2); for (let s = 1; s < 8; s += 2) hat(o, at(b0 + s * EBEAT / 2), 0.05, 8500) }
    if (ph === 'end' && bar % 2 === 0) bell(o, ch.root + 36, at(b0 + EBEAT), 0.08)
    if (ph === 'hook' && bar === 1) bell(o, 81, at(b0 + EBEAT), 0.06)
  }
  impact(o, at(4.8), 0.16); impact(o, at(24), 0.2); impact(o, at(48), 0.18)
  riser(o, at(20), 4, 0.16); riser(o, at(43), 5, 0.2)
  bell(o, 86, at(50.5), 0.1)
  const tick = (t: number, l = 0.05) => { hat(o, at(t), l, 4500, 0.02); tone(o, 'sine', 1900 + Math.random() * 300, at(t), 0.04, 0.002, l * 0.5) }
  for (let i = 0; i < 30; i++) tick(26.0 + i / 16)
  for (const c of [31.4, 36.8]) { hat(o, at(c), 0.14, 2500, 0.05); tone(o, 'sine', 900, at(c), 0.08, 0.002, 0.06) }
  ;[72, 76, 79, 84].forEach((m, i) => bell(o, m + 12, at(34.4 + i * 0.12), 0.08))
}
