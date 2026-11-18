import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  const line = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()
        tl.fromTo(
          word.current,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' },
        )
          .fromTo(
            line.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
            '-=0.4',
          )
          .to(el, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '+=0.5')
          .set(el, { display: 'none' })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { display: 'none' })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="preloader flex items-center justify-center">
      <div className="overflow-hidden px-6 text-center">
        <span
          ref={word}
          className="display block text-cream text-[clamp(2.5rem,9vw,6rem)] leading-none"
        >
          KAINOS
        </span>
        <span
          ref={line}
          className="mx-auto mt-4 block h-px w-40 origin-left bg-cream/60"
        />
        <span className="mt-4 block text-[10px] uppercase tracking-[0.5em] text-cream/70">
          Wear Your Difference
        </span>
      </div>
    </div>
  )
}
