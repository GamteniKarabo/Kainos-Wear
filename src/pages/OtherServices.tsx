import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal'
import MaskText from '../components/MaskText'

interface Service {
  title: string
  desc: string
  image: string
  tag: string
}

const services: Service[] = [
  {
    title: 'Custom Apparel',
    desc: 'Bespoke monochrome pieces, cut and weighted to your brief.',
    image: '/images/bespoke.png',
    tag: 'Coming soon',
  },
  {
    title: 'Creative Direction',
    desc: 'Brand worlds, campaigns and the quiet details in between.',
    image: '/images/lookbook-1.jpg',
    tag: 'Coming soon',
  },
  {
    title: 'Hoodies',
    desc: 'Kainos Hoodies for your stylish warmth',
    image: '/images/lookbook3.png',
    tag: 'Coming soon',
  },
  {
    title: 'Kainos Experience',
    desc: 'Physical spaces where the difference gets worn in person.',
    image: '/images/Kainos Experience.png',
    tag: 'In planning',
  },
  {
    title: 'Embroidery & Print',
    desc: 'Embroidery, print and finish for pieces that are yours alone.',
    image: '/images/print.jpg',
    tag: 'Coming soon',
  },
  {
    title: 'Styling Studio',
    desc: 'One-to-one styling for the moments that matter.',
    image: '/images/studio.png',
    tag: 'Coming soon',
  },
]

export default function OtherServices() {
  return (
    <div className="bg-cream pt-28 sm:pt-32">
      {/* hero */}
      <section className="container-k">
        <Reveal>
          <p className="eyebrow text-ash">Other Services</p>
          <h1 className="display mt-3 text-[clamp(3rem,10vw,8rem)] leading-[0.86]">
            <MaskText>More than</MaskText>{' '}
            <MaskText delay={0.1}>tees.</MaskText>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-ink/70">
            Kainos World is a creative enterprise. Tees are where we begin — not where we
            end. A wider suite of premium services is on the way. Here&apos;s what&apos;s
            coming.
          </p>
        </Reveal>
      </section>

      {/* services grid */}
      <section className="container-k py-16 sm:py-24">
        <div className="grid gap-5 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <article className="group relative aspect-[4/5] overflow-hidden bg-ink">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale opacity-70 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
                <span className="absolute right-4 top-4 rounded-full border border-cream/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream/90">
                  {s.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <h3 className="display text-3xl sm:text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-cream/70">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* notify */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="container-k relative z-10 flex flex-col items-center gap-7 py-24 text-center sm:py-32">
          <Reveal>
            <Sparkles className="mx-auto h-7 w-7 text-cream/70" />
            <h2 className="display mt-5 text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95]">
              Be first to the difference.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-cream/70">
              Other services launch soon. Drop your email and we&apos;ll tell you the moment
              they go live.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex w-full max-w-md items-center gap-2 border-b border-cream/30 pb-2"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button type="submit" aria-label="Notify me" className="shrink-0 text-cream/80 hover:text-cream">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-10">
              <Link to="/shop" className="eyebrow link-underline inline-flex items-center gap-2 text-cream/80 hover:text-cream">
                Meanwhile, shop the tees <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
