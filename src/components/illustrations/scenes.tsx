import type { ReactNode } from 'react'
import { Arrow, Books, Bubble, Check, Desk, Envelope, Figure, Ground, INK, Magnifier, PAPER, Pill, SIGNAL, Sheet, Screen, Spark, SW } from './kit'

/* Scenes: one idea each, 480 x 360, floor at y = 316. Lime on two shapes or fewer. */
const stroke = { stroke: INK, strokeWidth: SW, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const FLOOR = 316

/** Leadership: one person points at the road ahead, the team faces it. */
const Leadership = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <g {...stroke} fill="none"><path d="M262 232 L250 316 M410 232 L422 316" /></g>
    <rect x={226} y={52} width={216} height={180} rx={12} fill={PAPER} {...stroke} />
    <Arrow x1={262} y1={196} x2={300} y2={172} dashed />
    <Arrow x1={310} y1={160} x2={350} y2={128} dashed />
    <Arrow x1={362} y1={116} x2={394} y2={96} dashed />
    <circle cx={262} cy={200} r={11} fill={PAPER} {...stroke} />
    <circle cx={314} cy={156} r={11} fill={PAPER} {...stroke} />
    <circle cx={414} cy={84} r={15} fill={SIGNAL} {...stroke} />
    <Figure x={160} y={FLOOR} pose="point" hair="short" top="signal" />
    <Figure x={96} y={FLOOR} s={0.86} hair="bun" top="paper" />
    <Figure x={44} y={FLOOR} s={0.8} hair="long" top="paper" />
  </g>
)

/** Mentoring: a hand held out from the floor to the next step. */
const Mentoring = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <path d="M250 316 V276 H322 V236 H394 V196 H456 V316" fill={PAPER} {...stroke} />
    <Arrow x1={346} y1={176} x2={420} y2={150} dashed />
    <Figure x={196} y={FLOOR} pose="point" hair="long" top="paper" armF={{ to: [68, -128], c: [50, -112] }} />
    <Figure x={358} y={236} hair="short" top="signal" dir={-1} pose="stand" armF={{ to: [34, -82], c: [30, -100] }} />
  </g>
)

/** Community: people in a row, speaking to each other. */
const Community = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <Bubble x={84} y={62} w={96} h={54} dots={3} />
    <Bubble x={300} y={96} w={96} h={54} dots={3} flip fill={SIGNAL} />
    <Figure x={74} y={FLOOR} s={0.92} hair="short" top="paper" />
    <Figure x={178} y={FLOOR} s={0.92} hair="long" top="signal" dir={-1} />
    <Figure x={304} y={FLOOR} s={0.92} hair="bun" top="paper" />
    <Figure x={408} y={FLOOR} s={0.92} hair="cap" top="paper" dir={-1} />
  </g>
)

/** Learning: knowledge stacks into a staircase. */
const Learn = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <Books x={130} y={FLOOR} w={100} n={1} />
    <Books x={230} y={FLOOR} w={100} n={2} />
    <Books x={330} y={FLOOR} w={100} n={4} signal />
    <Figure x={392} y={FLOOR - 88} dir={-1} pose="sit" hair="long" top="paper" armF={{ to: [46, -58], c: [30, -76] }} armB={{ to: [44, -52], c: [14, -66] }} />
    <path d="M326 188 Q342 178 356 188 V212 Q342 202 326 212 Z M356 188 Q370 178 384 188 V212 Q370 202 356 212 Z" fill={PAPER} {...stroke} />
  </g>
)

/** Resources: a toolbox of frameworks. */
const Resources = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <Sheet x={150} y={110} w={74} h={110} lines={4} />
    <Sheet x={230} y={78} w={74} h={120} lines={4} accent />
    <Sheet x={310} y={118} w={74} h={100} lines={3} />
    <path d="M120 206 H360 L352 316 H128 Z" fill={PAPER} {...stroke} />
    <path d="M120 206 L98 178 M360 206 L382 178" fill="none" {...stroke} />
    <rect x={190} y={236} width={100} height={30} rx={8} fill={SIGNAL} {...stroke} />
  </g>
)

/** Reflections: writing it down, then looking at it again. */
const Reflections = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <Figure x={150} y={FLOOR} pose="sit" chair hair="bun" top="signal" />
    <Desk x={190} y={252} w={210} />
    <rect x={226} y={226} width={64} height={26} rx={4} fill={PAPER} {...stroke} />
    <path d="M238 240 H274" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
    <circle cx={226} cy={120} r={4} fill={PAPER} {...stroke} />
    <circle cx={240} cy={98} r={6} fill={PAPER} {...stroke} />
    <Bubble x={262} y={34} w={120} h={72} dots={0} />
    <path d="M300 70 A22 22 0 1 1 324 92" fill="none" {...stroke} />
    <path d="M314 94 L324 92 L326 82" fill="none" {...stroke} />
  </g>
)

/** About: a body of work, laid out on the wall. */
const About = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    {[0, 1, 2].map(i => (
      <g key={i}>
        <rect x={186 + i * 90} y={70} width={76} height={110} rx={10} fill={i === 1 ? SIGNAL : PAPER} {...stroke} />
        <path d={`M${200 + i * 90} ${92} H${248 + i * 90} M${200 + i * 90} ${110} H${240 + i * 90}`} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={224 + i * 90} cy={148} r={9} fill={i === 1 ? PAPER : PAPER} {...stroke} />
      </g>
    ))}
    <Figure x={96} y={FLOOR} pose="point" hair="short" top="paper" armF={{ to: [70, -142], c: [48, -128] }} />
  </g>
)

/** Contact: say hello, expect a reply. */
const Contact = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <Figure x={118} y={FLOOR} pose="wave" hair="short" top="paper" />
    <Envelope x={240} y={196} w={150} h={100} fill={SIGNAL} />
    <Bubble x={310} y={60} w={110} h={60} dots={3} flip />
    <Arrow x1={336} y1={184} x2={346} y2={150} dashed />
  </g>
)

/** Craft: a rough sketch becomes a working screen. */
const Craft = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <rect x={44} y={130} width={104} height={140} rx={8} fill={PAPER} {...stroke} strokeDasharray="2 7" />
    <rect x={60} y={148} width={72} height={18} rx={4} fill="none" {...stroke} strokeDasharray="2 7" />
    <rect x={60} y={178} width={32} height={60} rx={4} fill="none" {...stroke} strokeDasharray="2 7" />
    <rect x={100} y={178} width={32} height={26} rx={4} fill="none" {...stroke} strokeDasharray="2 7" />
    <Arrow x1={162} y1={200} x2={214} y2={200} />
    <Screen x={228} y={104} w={208} h={146}>
      <rect x={244} y={120} width={176} height={18} rx={5} fill={PAPER} {...stroke} />
      <rect x={244} y={150} width={80} height={84} rx={6} fill={PAPER} {...stroke} />
      <rect x={336} y={150} width={84} height={34} rx={6} fill={SIGNAL} {...stroke} />
      <rect x={336} y={194} width={84} height={40} rx={6} fill={PAPER} {...stroke} />
    </Screen>
  </g>
)

/** Design system: small parts that always fit together. */
const DesignSystem = () => (
  <g>
    <rect x={64} y={48} width={352} height={236} rx={14} fill={PAPER} {...stroke} />
    <path d="M240 48 V284 M64 166 H416" stroke={INK} strokeWidth={1.5} />
    <Pill x={110} y={92} w={86} h={34} filled />
    <Pill x={290} y={96} w={72} h={26} />
    <circle cx={348} cy={109} r={9} fill={INK} />
    <rect x={106} y={200} width={96} height={56} rx={10} fill={PAPER} {...stroke} />
    <path d="M118 218 H170 M118 234 H150" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
    <rect x={282} y={198} width={22} height={22} rx={6} fill={PAPER} {...stroke} />
    <rect x={282} y={232} width={22} height={22} rx={6} fill={SIGNAL} {...stroke} />
    <path d="M288 243 L293 248 L300 238" fill="none" {...stroke} />
    <path d="M318 209 H376 M318 243 H366" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
  </g>
)

/** Agentic: the agent reads and prepares, a person decides. */
const Agentic = () => (
  <g>
    <Ground x1={340} x2={456} y={FLOOR} />
    <Envelope x={26} y={160} w={92} h={62} />
    <Arrow x1={128} y1={191} x2={168} y2={191} />
    <rect x={178} y={148} width={88} height={88} rx={18} fill={PAPER} {...stroke} />
    <Spark x={222} y={192} r={24} />
    <Arrow x1={276} y1={191} x2={316} y2={191} />
    <Sheet x={326} y={110} w={66} h={112} lines={4} />
    <Check x={384} y={222} />
    <Figure x={430} y={FLOOR} s={0.8} dir={-1} pose="stand" hair="short" top="paper" armF={{ to: [34, -86], c: [30, -100] }} />
  </g>
)

/** Search: the right document, found. */
const Search = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <Sheet x={76} y={86} w={118} h={170} lines={4} />
    <Sheet x={126} y={110} w={118} h={170} lines={4} />
    <Sheet x={176} y={134} w={118} h={170} lines={5} accent />
    <Magnifier x={330} y={178} r={46} />
    <path d="M308 178 H352 M308 194 H340" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
  </g>
)

/** People systems: a person, their profile, their time. */
const People = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <rect x={56} y={64} width={170} height={230} rx={14} fill={PAPER} {...stroke} />
    <circle cx={141} cy={122} r={26} fill={PAPER} {...stroke} />
    <path d="M100 196 Q141 150 182 196" fill={SIGNAL} {...stroke} />
    <path d="M86 230 H196 M86 252 H166" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
    <rect x={262} y={64} width={170} height={150} rx={14} fill={PAPER} {...stroke} />
    {[0, 1, 2].map(r => [0, 1, 2].map(c => <rect key={`${r}${c}`} x={282 + c * 46} y={86 + r * 40} width={34} height={28} rx={6} fill={r === 1 && c === 1 ? SIGNAL : PAPER} {...stroke} />))}
  </g>
)

/** Nothing here (yet). */
const Empty = () => (
  <g>
    <Ground x1={24} x2={456} y={FLOOR} />
    <path d="M200 232 H400 L392 316 H208 Z" fill={PAPER} {...stroke} />
    <path d="M200 232 L176 204 M400 232 L424 204" fill="none" {...stroke} />
    <Figure x={120} y={FLOOR} pose="hold" hair="long" top="signal" armF={{ to: [48, -92], c: [34, -108] }} armB={{ to: [46, -84], c: [18, -86] }} />
    <Bubble x={90} y={40} w={90} h={52} dots={3} />
  </g>
)

export const SCENES = {
  leadership: Leadership, mentoring: Mentoring, community: Community, learn: Learn, resources: Resources, reflections: Reflections,
  about: About, contact: Contact, craft: Craft, 'design-system': DesignSystem, agentic: Agentic, search: Search, people: People, empty: Empty,
} as const satisfies Record<string, () => ReactNode>
export type IllustrationName = keyof typeof SCENES
