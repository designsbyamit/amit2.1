// Score for the Search film. It is rendered offline (see tools/render-score) into public/audio/search-film-score.mp3;
// the film plays that file. 104 bpm, 72 bars ≈ 166.2 s.
import { tone, pad, bass, pluck, bell, kick, hat, riser, impact, type Out } from './score'

export const SBPM = 104
export const SBEAT = 60 / SBPM
export const SBAR = SBEAT * 4
export const SDURATION = SBAR * 72

const A = 45, F = 41, C = 48, G = 43, E = 40, D = 38
const MINOR = [0, 3, 7, 12], MAJOR = [0, 4, 7, 12], MAJ7 = [0, 4, 7, 11], SUS = [0, 2, 7, 12]
type Chord = { root: number; q: number[] }
const cyc = (bar: number, from: number, list: Chord[]) => list[(bar - from) % list.length]
const prog = (bar: number): Chord => {
  if (bar < 4) return { root: A, q: MINOR }
  if (bar < 11) return cyc(bar, 4, [{ root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: G, q: SUS }, { root: A, q: MINOR }])
  if (bar < 22) return cyc(bar, 11, [{ root: A, q: MINOR }, { root: E, q: MINOR }, { root: F, q: MAJ7 }, { root: D, q: MINOR }])
  if (bar < 32) return cyc(bar, 22, [{ root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: G, q: SUS }, { root: A, q: MINOR }])
  if (bar < 41) return cyc(bar, 32, [{ root: C, q: MAJ7 }, { root: A, q: MINOR }, { root: F, q: MAJ7 }, { root: G, q: SUS }])
  if (bar < 51) return cyc(bar, 41, [{ root: F, q: MAJ7 }, { root: G, q: SUS }, { root: A, q: MINOR }, { root: C, q: MAJOR }])
  if (bar < 66) return cyc(bar, 51, [{ root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: G, q: SUS }, { root: A, q: MINOR }])
  return cyc(bar, 66, [{ root: C, q: MAJOR }, { root: F, q: MAJ7 }, { root: C, q: MAJOR }, { root: C, q: MAJ7 }])
}

export function scheduleSearch(ctx: BaseAudioContext, out: AudioNode, base = 0.08) {
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const o: Out = { ctx: ctx as AudioContext, out, noise: noiseBuf }
  const at = (film: number) => base + film

  for (let bar = 0; bar < 72; bar++) {
    const ch = prog(bar), b0 = bar * SBAR
    const phase = bar < 4 ? 'hook' : bar < 11 ? 'setup' : bar < 22 ? 'problem' : bar < 32 ? 'process' : bar < 41 ? 'craft' : bar < 51 ? 'inter' : bar < 66 ? 'peak' : 'end'
    if (phase !== 'hook' || bar % 2 === 0) {
      const bright = phase === 'hook' ? 900 : phase === 'problem' ? 1300 : phase === 'peak' ? 3000 : phase === 'end' ? 1400 : 1900
      const lvl = phase === 'hook' ? 0.5 : phase === 'peak' ? 0.75 : phase === 'end' ? 0.42 : 0.6
      pad(o, ch, at(b0), SBAR * (phase === 'hook' ? 2 : 1) + 0.4, lvl, bright)
    }
    if (phase !== 'hook' && phase !== 'end') {
      const beats = phase === 'peak' ? [0, 1.5, 2, 3] : phase === 'inter' ? [0, 1.5, 2.5] : [0, 2]
      for (const b of beats) bass(o, ch.root - 12, at(b0 + b * SBEAT), SBEAT * 0.9, phase === 'peak' ? 0.32 : 0.22)
    }
    if (phase === 'end' && bar % 2 === 0) bass(o, ch.root - 12, at(b0), SBAR * 1.8, 0.2)

    const steps = phase === 'peak' ? 16 : phase === 'inter' ? 8 : phase === 'craft' ? 8 : phase === 'process' ? 8 : phase === 'setup' ? 4 : phase === 'problem' ? 4 : 0
    for (let s = 0; s < steps; s++) {
      const tt = b0 + (s / steps) * SBAR
      const pattern = phase === 'problem' ? [0, 2, 1, 3] : phase === 'inter' ? [0, 2, 3, 1, 2, 3, 1, 2] : [0, 1, 2, 3, 2, 1, 2, 3]
      const iv = ch.q[pattern[s % pattern.length] % ch.q.length]
      pluck(o, ch.root + (phase === 'peak' ? 24 : 12) + iv, at(tt), phase === 'peak' ? 0.15 : phase === 'problem' ? 0.1 : 0.12, phase === 'peak' ? 5000 : 2600)
    }
    if (phase === 'problem') {
      const per = bar < 15 ? 4 : bar < 19 ? 8 : 16
      for (let s = 0; s < per; s++) hat(o, at(b0 + (s / per) * SBAR), 0.07 + (bar - 11) * 0.006, 9000, 0.03)
    }
    if (phase === 'process' || phase === 'craft') {
      kick(o, at(b0), phase === 'process' ? 0.26 : 0.2)
      for (let s = 1; s < 8; s += 2) hat(o, at(b0 + s * SBEAT / 2), 0.045, 8000)
    }
    if (phase === 'inter' || phase === 'peak') {
      for (let b = 0; b < 4; b++) kick(o, at(b0 + b * SBEAT), phase === 'peak' ? 0.38 : 0.22)
      for (let s = 0; s < 8; s++) hat(o, at(b0 + s * SBEAT / 2), s % 2 ? 0.07 : 0.035, 8500)
    }
    if (phase === 'end') { bell(o, ch.root + 36, at(b0), 0.08); bell(o, ch.root + 31 + (ch.q[2] ?? 7) - 7, at(b0 + SBEAT * 2), 0.06) }
    if (phase === 'hook' && bar % 2 === 1) bell(o, 81, at(b0 + SBEAT), 0.06)
  }

  // story accents
  impact(o, at(25), 0.18); impact(o, at(36), 0.14); impact(o, at(51), 0.22); impact(o, at(74), 0.2); impact(o, at(95), 0.2); impact(o, at(117), 0.3)
  bell(o, 84, at(152.4), 0.12)
  riser(o, at(46), 5, 0.18); riser(o, at(110), 7, 0.5)

  // UI foley: typing ticks, clicks, hand-off whoosh, success chime
  const tick = (tt: number, lvl = 0.05) => { hat(o, at(tt), lvl, 4500, 0.02); tone(o, 'sine', 1900 + Math.random() * 300, at(tt), 0.04, 0.002, lvl * 0.5) }
  const typing = (a: number, chars: number, cps: number, every = 1) => { for (let i = 0; i < chars; i += every) tick(a + i / cps) }
  for (let i = 0; i < 4; i++) typing(12.4 + i * 2.85, 19, 18)
  typing(101.0, 28, 14); typing(107.4, 9, 6); typing(119.6, 9, 5); typing(124.0, 150, 48, 3)
  for (const c of [99.2, 118.8, 123.2, 130.0, 143.4]) { hat(o, at(c), 0.14, 2500, 0.05); tone(o, 'sine', 900, at(c), 0.08, 0.002, 0.06) }
  riser(o, at(130.4), 1.6, 0.07)
  ;[72, 76, 79, 84].forEach((m, i) => bell(o, m + 12, at(145.6 + i * 0.12), 0.09))
}
