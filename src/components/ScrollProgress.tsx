import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
  })

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left scale-x-0 bg-ink"
      aria-hidden="true"
    />
  )
}
