import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { products } from '../lib/products'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MaskText from '../components/MaskText'
import Marquee from '../components/Marquee'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'

const featured = products.slice(0, 4)
const values = ['Innovation', 'Individuality', 'Premium Expression']

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const heroImg = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          heroImg.current,
          { scale: 1.18 },
          {
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
        gsap.to(heroImg.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: heroRef },
  )

  return (
    <div className="bg-cream">
      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        className="grain relative flex min-h-[100svh] w-full overflow-hidden bg-ink"
      >
        <img
          ref={heroImg}
          src="/images/hero.jpg"
          alt="Kainos Wear campaign"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/80" />

        <div className="container-k relative z-10 flex h-full min-h-[100svh] flex-col justify-between pb-10 pt-24 text-cream">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-cream/70">
            <span>Kainos Wear</span>
            <span>Est. 2026</span>
          </div>

          <div>
            <h1 className="display uppercase leading-[0.84] text-[clamp(3rem,12vw,11rem)]">
              <MaskText>Wear Your</MaskText>{' '}
              <MaskText delay={0.12}>Difference</MaskText>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              Rare, premium monochrome tees. Built for those who refuse the uniform.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/shop" variant="light">
                Shop the drop
              </Button>
              <Button to="/about" variant="light" className="!border-cream/40">
                Our story
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-cream/60">
            <span>Scroll</span>
            <span className="block h-12 w-px animate-pulse bg-cream/40" />
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <div className="border-y border-line bg-cream py-5 sm:py-7">
        <Marquee text="Wear Your Difference|Kainos Wear|Est. 2026|Monochrome|Premium" />
      </div>

      {/* ---------------- STATEMENT ---------------- */}
      <section className="container-k py-24 sm:py-36">
        <Reveal>
          <p className="mx-auto max-w-4xl text-balance text-center display text-[clamp(1.8rem,4.5vw,3.6rem)] leading-[1.08]">
            We make rare, premium black &amp; white — so you can wear your difference,
            not someone else&apos;s.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {values.map((v) => (
              <span key={v} className="eyebrow text-ash">
                {v}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- FEATURED COLLECTION ---------------- */}
      <section className="container-k pb-24 sm:pb-36">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-ash">The Drop</p>
            <h2 className="display text-5xl sm:text-7xl">The Collection</h2>
          </div>
          <Link
            to="/shop"
            className="eyebrow link-underline hidden items-center gap-2 sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link to="/shop" className="eyebrow link-underline flex items-center gap-2">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- EDITORIAL SPLIT ---------------- */}
      <section className="grid items-stretch md:grid-cols-2">
        <div className="relative min-h-[60vh] overflow-hidden bg-ink">
          <img
            src="/images/lookbook3.png"
            alt="Editorial"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
        </div>
        <div className="flex flex-col justify-center bg-cream-deep px-6 py-20 sm:px-14 lg:px-20">
          <Reveal>
            <p className="eyebrow mb-5 text-ash">Individuality</p>
            <h2 className="display text-5xl leading-[0.95] sm:text-6xl">
              One colour
              <br />
              system.
              <br />
              Infinite you.
            </h2>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-ink/70">
              Every Kainos piece starts from a single idea: strip it back to black, white
              and bone — then let the wearer do the talking. No logos shouting. Just cut,
              weight and intent.
            </p>
            <div className="mt-9">
              <Button to="/shop">Explore tees</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- LOOKBOOK ---------------- */}
      <section className="container-k py-24 sm:py-36">
        <Reveal>
          <p className="eyebrow mb-3 text-ash">Lookbook</p>
          <h2 className="display text-5xl sm:text-7xl">In Frame</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <img
                src="/images/lookbook1.png"
                alt="Look 01"
                className="h-full w-full object-cover grayscale transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              />
            </div>
            <p className="mt-3 eyebrow text-ash">Look 01 </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative mt-0 aspect-[4/5] overflow-hidden bg-ink md:mt-16">
              <img
                src="/images/lookbook2.jpg"
                alt="Look 02"
                className="h-full w-full object-cover grayscale transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              />
            </div>
            <p className="mt-3 eyebrow text-ash">Look 02 </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- OTHER SERVICES TEASER ---------------- */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <img
          src="/images/services.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-k relative z-10 flex flex-col items-start gap-8 py-24 sm:py-36">
          <Reveal>
            <p className="eyebrow text-cream/60">Coming soon</p>
            <h2 className="display mt-4 max-w-3xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">
              More than tees.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              Other services are on the way — custom apparel, creative direction and
              limited collaborations. The difference is expanding.
            </p>
            <div className="mt-9">
              <Button to="/services" variant="light">
                See what&apos;s next
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-k py-24 text-center sm:py-32">
        <Reveal>
          <p className="eyebrow mb-5 text-ash">Join the difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,6vw,5rem)] leading-[0.95]">
            Wear it before
            <br />
            everyone else.
          </h2>
          <div className="mt-10 flex justify-center">
            <Button to="/shop" variant="solid">
              Enter the shop
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
