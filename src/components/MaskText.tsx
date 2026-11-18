import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

interface MaskTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  as?: 'span' | 'div'
}

/** Masked line reveal — text rises from behind a clip. */
export default function MaskText({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  as = 'span',
}: MaskTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const Tag = as as 'span'

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { yPercent: 115 },
          { yPercent: 0, duration, delay, ease: 'power4.out' },
        )
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { yPercent: 0 })
      })
    },
    { scope: ref },
  )

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <Tag ref={ref as never} className={`inline-block ${className}`}>
        {children}
      </Tag>
    </span>
  )
}
