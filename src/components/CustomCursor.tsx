import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return

    document.body.classList.add('has-custom-cursor')
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 })

    const xDot = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3' })
    const yDot = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3' })
    const xRing = gsap.quickTo(ringEl, 'x', { duration: 0.45, ease: 'power3' })
    const yRing = gsap.quickTo(ringEl, 'y', { duration: 0.45, ease: 'power3' })

    let hovering = false

    const move = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
      const interactive = !!(e.target as HTMLElement).closest(
        'a, button, [data-cursor="hover"], input, select, textarea',
      )
      if (interactive !== hovering) {
        hovering = interactive
        gsap.to(ringEl, {
          scale: interactive ? 1.9 : 1,
          backgroundColor: interactive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
          duration: 0.3,
          ease: 'power3.out',
        })
      }
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
