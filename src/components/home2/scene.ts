import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** One easing for the whole page: a calm, premium deceleration. */
export const EASE = 'expo.out'

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Builds a scroll scene inside `ref` and tears it down on unmount. With reduced motion nothing is built:
 *  every scene is written so its resting state is its finished state. */
export function useScene(ref: RefObject<HTMLElement | null>, build: (root: HTMLElement) => void) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReduced()) return
    const ctx = gsap.context(() => build(root), root)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
