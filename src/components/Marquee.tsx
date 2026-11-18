import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

interface MarqueeProps {
  text: string
  className?: string
  duration?: number
  separator?: string
}

/** Infinite horizontal marquee. Duplicates content for a seamless loop. */
export default function Marquee({
  text,
  className = '',
  duration = 26,
  separator = '✳',
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const track = ref.current?.querySelector('.marquee-track') as HTMLElement | null
      if (!track) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(track, { xPercent: -50, ease: 'none', duration, repeat: -1 })
      })
    },
    { scope: ref },
  )

  const items = text.split('|')

  const Group = ({ aria }: { aria: boolean }) => (
    <span className="inline-flex items-center" aria-hidden={aria}>
      {items.map((t, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-6 sm:px-10 font-display text-[clamp(2.5rem,7vw,6rem)] leading-none italic">
            {t}
          </span>
          <span className="text-ash text-2xl sm:text-4xl">{separator}</span>
        </span>
      ))}
    </span>
  )

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="marquee-track">
        <Group aria={false} />
        <Group aria={true} />
      </div>
    </div>
  )
}
