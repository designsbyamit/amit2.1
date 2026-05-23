import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useScrollProgress(offset?: ['start end', 'end start']): {
  ref: React.RefObject<HTMLElement | null>
  progress: MotionValue<number>
} {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: progress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: offset ?? ['start end', 'end start'],
  })
  return { ref, progress }
}

export function useParallax(
  progress: MotionValue<number>,
  range: [number, number] = [-80, 80]
): MotionValue<number> {
  return useTransform(progress, [0, 1], range)
}
