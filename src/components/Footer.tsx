import { Link } from 'react-router-dom'
import { Instagram, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-k py-16 sm:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-5xl sm:text-7xl font-semibold leading-none">
              KAINOS
              <span className="block text-cream/50 text-2xl sm:text-3xl tracking-[0.3em] mt-2">
                WEAR
              </span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              An emerging South African creative enterprise. Premium monochrome apparel for
              those who wear their difference.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-cream/40">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/shop" className="link-underline text-cream/80 hover:text-cream">
                  Shop Tees
                </Link>
              </li>
              <li>
                <Link to="/services" className="link-underline text-cream/80 hover:text-cream">
                  Other Services
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="link-underline text-cream/80 hover:text-cream">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline text-cream/80 hover:text-cream">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-cream/40">Stay in the know</p>
            <p className="mt-5 text-sm text-cream/60">
              Drops are rare. Join the list — no noise.
            </p>
            <form
              className="mt-4 flex items-center gap-2 border-b border-cream/30 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="shrink-0 text-cream/80 hover:text-cream">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-8 flex gap-5 text-cream/70">
              <a href="#" aria-label="Instagram" className="hover:text-cream">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Email" className="hover:text-cream">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/15 pt-6 text-[11px] uppercase tracking-[0.2em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kainos World · Est. 2026</span>
          <span>Wear Your Difference</span>
          <span>South Africa</span>
        </div>
      </div>
    </footer>
  )
}
