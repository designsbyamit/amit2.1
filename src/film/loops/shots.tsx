import { Stage, Float, Ico, W, H, fade, type Cam, type Cur, type Look } from './kit'
import { SHOTS } from './shotsData'

/* Previews cut from the working prototypes themselves: each frame is a real screen of the prototype,
   the camera leans toward the control that moves the story on, the cursor presses it, and the next screen fades in. */
const B = `${import.meta.env.BASE_URL}images/loops/`
const D = 3.4, ZOOM = 1.32
export const shotDuration = (id: string) => SHOTS[id].length * D

const LOOKS: Record<string, Look> = {
  agentic: { mesh: 'sap-agentic', a: '#5B3FE0', tint: '#F1EEFE', dark: '#1B1440', ui: '#F6F6F4' },
  engaze: { mesh: 'engaze', a: '#5B3FE0', tint: '#F1EEFE', dark: '#2A1B78', ui: '#F6F6F4' },
}
/** The moment the still cover is cut from, and the note that sits beside it. */
const COVER: Record<string, { frame: number; title: string; sub: string; icon: string; cam: [number, number, number] }> = {
  agentic: { frame: 2, cam: [1.16, 646, 330], title: 'A person at every gate', sub: 'The agent recommends. People decide.', icon: 'user' },
  engaze: { frame: 3, cam: [1.16, 646, 300], title: 'Sick leave applied for today', sub: 'Checked with Esha first, with an undo', icon: 'check' },
}

export function ShotLoop({ id, t }: { id: string; t: number }) {
  const F = SHOTS[id]
  const cover = (window as unknown as { __cover?: boolean }).__cover
  const at = cover ? COVER[id].frame * D + D * 0.7 : t
  const cam: Cam[] = [], cur: Cur[] = [], clicks: number[] = []
  F.forEach((f, i) => {
    const a = i * D, [x, y] = f.to ?? [W / 2, H / 2]
    const zx = f.to ? x : W / 2, zy = f.to ? y : H * 0.42
    cam.push({ t: a, s: 1, x: W / 2, y: H / 2 }, { t: a + 0.5, s: 1, x: W / 2, y: H / 2 }, { t: a + 1.9, s: ZOOM, x: zx, y: zy }, { t: a + D - 0.35, s: ZOOM, x: zx, y: zy })
    if (f.to) { cur.push([a + 0.6, x + 220, y + 140], [a + 2.2, x, y], [a + D - 0.4, x, y]); clicks.push(a + 2.6) }
  })
  const caps: [number, string][] = F.map((f, i) => [i * D, f.cap])
  const fc = COVER[id]
  const accent = <Float x={1200} y={660} w={460} h={116} s={{ padding: '0 26px', display: 'flex', alignItems: 'center', gap: 18 }}>
    <span style={{ width: 52, height: 52, borderRadius: 26, background: '#F1EEFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico n={fc.icon} s={26} c="#4326C4" w={2} /></span>
    <span style={{ lineHeight: '30px' }}><span style={{ display: 'block', fontSize: 23, fontWeight: 500 }}>{fc.title}</span><span style={{ fontSize: 17, color: '#666A74' }}>{fc.sub}</span></span>
  </Float>
  const cc = COVER[id].cam
  return <Stage look={LOOKS[id]} t={at} cam={cover ? [{ t: 0, s: cc[0], x: cc[1], y: cc[2] }] : cam} cur={cur} clicks={clicks} caps={caps} accent={accent}>
    {F.map((f, i) => {
      const o = i === 0 ? 1 : fade(at, i * D - 0.35, i * D + 0.15)
      return <img key={f.img} src={B + f.img} alt="" width={W} height={H} draggable={false} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, opacity: o, display: 'block' }} />
    })}
  </Stage>
}
