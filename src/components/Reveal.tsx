import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  start?: string
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 42,
  duration = 1.1,
  start = 'top 88%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start },
          },
        )
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { autoAlpha: 1, y: 0 })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}
