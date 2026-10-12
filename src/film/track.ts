/** Pre-rendered score played through a plain <audio> element (reliable across browsers). */
export class Track {
  el: HTMLAudioElement
  constructor(src: string) {
    this.el = new Audio(src)
    this.el.preload = 'auto'
  }
  play(t: number) { try { this.el.currentTime = t } catch { /* not ready */ } void this.el.play().catch(() => {}) }
  stop() { this.el.pause() }
  seek(t: number, playing: boolean) { try { this.el.currentTime = t } catch { /* not ready */ } if (playing && this.el.paused) void this.el.play().catch(() => {}) }
  setMuted(m: boolean) { this.el.muted = m }
  drift(t: number) { if (!this.el.paused && Math.abs(this.el.currentTime - t) > 0.3) { try { this.el.currentTime = t } catch { /* */ } } }
}
