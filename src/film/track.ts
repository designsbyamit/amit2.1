/**
 * Pre-rendered score played through a plain <audio> element.
 * Phones load audio lazily and refuse to seek before the file's metadata is in, so a position set too early is lost and the
 * score starts from 0. This waits for metadata, never re-seeks while the file is still buffering, and retries a play()
 * that the browser interrupted.
 */
export class Track {
  el: HTMLAudioElement
  private want = 0
  private wantPlay = false
  private lastDrift = 0
  constructor(src: string) {
    this.el = new Audio()
    this.el.preload = 'auto'
    this.el.setAttribute('playsinline', '')
    this.el.src = src
    this.el.addEventListener('loadedmetadata', () => { if (this.wantPlay) this.start() })
    this.el.addEventListener('canplay', () => { if (this.wantPlay && this.el.paused) void this.el.play().catch(() => {}) })
    this.el.load()
  }
  private seekTo(t: number) { try { this.el.currentTime = t } catch { /* not ready yet, applied on loadedmetadata */ } }
  private start() {
    if (this.el.readyState >= 1) this.seekTo(this.want)
    void this.el.play().catch(() => {})
  }
  play(t: number) { this.want = t; this.wantPlay = true; this.start() }
  stop() { this.wantPlay = false; this.el.pause() }
  seek(t: number, playing: boolean) {
    this.want = t
    if (this.el.readyState >= 1) this.seekTo(t)
    if (playing) { this.wantPlay = true; if (this.el.paused) void this.el.play().catch(() => {}) }
  }
  setMuted(m: boolean) { this.el.muted = m }
  /** Keep the score with the picture. Only corrects a real gap, only when the audio can actually play, at most every 2 seconds. */
  drift(t: number) {
    if (!this.wantPlay) return
    const now = performance.now()
    if (now - this.lastDrift < 2000) return
    if (this.el.paused) { void this.el.play().catch(() => {}); this.lastDrift = now; return }
    if (this.el.readyState < 3 || this.el.seeking) return
    if (Math.abs(this.el.currentTime - t) > 0.8) { this.lastDrift = now; this.seekTo(t) }
  }
}
