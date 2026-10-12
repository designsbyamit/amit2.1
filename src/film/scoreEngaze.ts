// Score for the Engaze teaser: bright, light and moving, no heavy kick. Rendered offline into public/audio/engaze-teaser-score.mp3.
// 112 bpm; 26 bars = 55.7 s plus tail. The film is 57.6 s, so bars run to 27.
import { tone, pad, pluck, bell, hat, riser, impact, type Out } from './score'

export const EBPM = 100
export const EBEAT = 60 / EBPM
export const EBAR = EBEAT * 4
export const EDURATION = EBAR * 24

const D = 38, B = 35, G = 43, A = 45
const MIN = [0, 3, 7, 12], MAJ = [0, 4, 7, 12], MAJ7 = [0, 4, 7, 11], SUS = [0, 2, 7, 12]
type Chord = { root: number; q: number[] }
const prog = (bar: number): Chord => {
  const l: Chord[] = bar < 2 ? [{ root: D, q: MAJ7 }] : bar < 6 ? [{ root: D, q: MIN }, { root: B + 12, q: MAJ7 }, { root: G, q: MAJ7 }, { root: A, q: SUS }] : [{ root: G, q: MAJ7 }, { root: D, q: MAJ }, { root: A, q: SUS }, { root: B + 12, q: MIN }]
  return l[bar % l.length]
}
// motif: scale degrees (semitones above chord root) for the bright lead
const MOTIF = [12, 16, 19, 16, 14, 19, 21, 19]

export function scheduleEngaze(ctx: BaseAudioContext, out: AudioNode, base = 0.08) {
  const nb = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const o: Out = { ctx: ctx as AudioContext, out, noise: nb }
  const at = (t: number) => base + t
  const S = EBEAT / 4 // sixteenth
  for (let bar = 0; bar < 24; bar++) {
    const ch = prog(bar), b0 = bar * EBAR
    const ph = bar < 2 ? 'hook' : bar < 6 ? 'problem' : bar < 10 ? 'principles' : bar < 20 ? 'proto' : 'end'
    // airy pad, always short of heavy
    pad(o, { root: ch.root + 12, q: ch.q }, at(b0), EBAR + 0.3, ph === 'proto' ? 0.4 : 0.32, ph === 'proto' ? 4200 : 2600)
    // light plucked bass on off-beats, an octave up from before
    if (ph === 'principles' || ph === 'proto') for (const b of [0.5, 1.5, 2.5, 3.5]) pluck(o, ch.root, at(b0 + b * EBEAT), ph === 'proto' ? 0.13 : 0.1, 900)
    // sixteenth arpeggio
    const steps = ph === 'proto' ? 16 : ph === 'principles' ? 8 : ph === 'problem' ? 8 : 0
    for (let s = 0; s < steps; s++) {
      const dur = EBAR / steps
      const tt = b0 + s * dur
      const iv = ch.q[[0, 1, 2, 3, 2, 1, 3, 2][s % 8] % ch.q.length]
      pluck(o, ch.root + 24 + iv, at(tt), (ph === 'proto' ? 0.11 : 0.08) * (s % 4 === 0 ? 1.25 : 1), ph === 'proto' ? 6500 : 4200)
    }
    // lead motif in the story's peak
    if (ph === 'proto' && bar >= 12) for (let k = 0; k < 8; k++) if (bar % 2 === 0 || k % 2 === 0) pluck(o, ch.root + 12 + MOTIF[k] - 12 + 12, at(b0 + k * EBEAT / 2), 0.13, 7000)
    // percussion: shaker 16ths, light claps on 2 and 4, no kick
    if (ph === 'problem') for (let s = 0; s < 8; s++) hat(o, at(b0 + s * EBEAT / 2), 0.03 + (bar - 2) * 0.012, 9500, 0.025)
    if (ph === 'principles' || ph === 'proto') {
      for (let s = 0; s < 16; s++) hat(o, at(b0 + s * S), s % 4 === 2 ? 0.05 : 0.025, 9500, 0.02)
      for (const b of [1, 3]) { hat(o, at(b0 + b * EBEAT), 0.11, 1800, 0.07); hat(o, at(b0 + b * EBEAT), 0.06, 4500, 0.05) }
      if (ph === 'proto') tone(o, "sine", 150, at(b0), 0.08, 0.002, 0.04)
    }
    if (ph === 'end' && bar % 2 === 0) { bell(o, ch.root + 36, at(b0 + EBEAT), 0.08); bell(o, ch.root + 43, at(b0 + EBEAT * 2.5), 0.06) }
    if (ph === 'hook') for (const b of [1, 2.5, 3.5]) bell(o, ch.root + 40 + (b > 2 ? 3 : 0), at(b0 + b * EBEAT), 0.05)
  }
  impact(o, at(4.8), 0.1); impact(o, at(24), 0.12); impact(o, at(48), 0.1)
  riser(o, at(21), 3, 0.1); riser(o, at(44), 4, 0.12)
  bell(o, 86, at(50.5), 0.1)
  const tick = (t: number, l = 0.05) => { hat(o, at(t), l, 4500, 0.02); tone(o, 'sine', 1900 + Math.random() * 300, at(t), 0.04, 0.002, l * 0.5) }
  for (let i = 0; i < 30; i++) tick(26.0 + i / 16)
  for (const c of [31.4, 36.8]) { hat(o, at(c), 0.14, 2500, 0.05); tone(o, 'sine', 900, at(c), 0.08, 0.002, 0.06) }
  ;[72, 76, 79, 84].forEach((m, i) => bell(o, m + 12, at(34.4 + i * 0.12), 0.08))
}
