import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import MaskText from '../components/MaskText'
import Button from '../components/Button'

const pillars = [
  {
    k: 'Innovation',
    v: 'We treat apparel as a creative medium — new cuts, new weights, new ways to say something without saying much.',
  },
  {
    k: 'Individuality',
    v: 'Every piece is a blank, considered canvas. The difference is yours to wear, not ours to dictate.',
  },
  {
    k: 'Premium Expression',
    v: 'Rare, refined, monochrome. We obsess over fabric and finish so the expression feels effortless.',
  },
]

export default function About() {
  return (
    <div className="bg-cream pt-28 sm:pt-32">
      {/* hero */}
      <section className="container-k">
        <Reveal>
          <p className="eyebrow text-ash">Our Story · Est. 2026</p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.88]">
            <MaskText>Wear Your</MaskText>{' '}
            <MaskText delay={0.1}>Difference.</MaskText>
          </h1>
        </Reveal>
      </section>

      {/* founder */}
      <section className="container-k grid gap-10 py-20 sm:py-28 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-ink">
          <img
            src="/images/About.jpg"
            alt="Kainos Wear"
            className="h-full w-full object-cover grayscale"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow text-ash">Founded by Ntshembho Maluleke</p>
          <h2 className="display mt-4 text-4xl leading-tight sm:text-5xl">
            A South African creative enterprise.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70">
            Kainos World was founded in 2026 by Ntshembho Maluleke — an emerging South
            African creative enterprise focused on innovation, individuality, and premium
            creative expression.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
            We started with the tee because it&apos;s the most honest garment there is:
            simple, personal, and impossible to hide behind. Strip it to black, white and
            bone, and what remains is you.
          </p>
          <Link
            to="/shop"
            className="eyebrow link-underline mt-9 inline-flex items-center gap-2"
          >
            Shop the collection <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* pillars */}
      <section className="border-y border-line bg-cream-deep">
        <div className="container-k py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow mb-12 text-ash">What we stand for</p>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.1}>
                <div>
                  <span className="display text-6xl text-ash">0{i + 1}</span>
                  <h3 className="display mt-4 text-3xl">{p.k}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="container-k py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,6vw,5rem)] leading-[0.95]">
            The difference starts here.
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
