import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useStore } from '../lib/StoreContext'
import { gsap, useGSAP } from '../lib/gsap'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/services', label: 'Other Services' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { cartCount, wishlistCount } = useStore()
  const location = useLocation()
  const overlay = useRef<HTMLDivElement>(null)
  const menuItems = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useGSAP(
    () => {
      if (!overlay.current) return
      const mm = gsap.matchMedia()
      mm.add('(max-width: 767px)', () => {
        if (open) {
          gsap.set(overlay.current, { display: 'flex' })
          gsap.fromTo(
            overlay.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
          )
          gsap.fromTo(
            menuItems.current?.children ?? [],
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, delay: 0.1, ease: 'power3.out' },
          )
        } else {
          gsap.to(overlay.current, {
            autoAlpha: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => gsap.set(overlay.current, { display: 'none' }),
          })
        }
      })
    },
    { dependencies: [open] },
  )

  const solid = scrolled || open || location.pathname !== '/'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-colors duration-500 ${
          solid ? 'bg-cream/90 backdrop-blur-md border-b border-line' : 'bg-transparent'
        }`}
      >
        <nav className="container-k flex h-16 items-center justify-between sm:h-20">
          <Link
            to="/"
            className={`flex items-baseline gap-2 ${solid ? 'text-ink' : 'text-cream'}`}
          >
            <span className="display text-2xl sm:text-3xl font-semibold tracking-tight">
              KAINOS
            </span>
            <span className="text-[10px] uppercase tracking-[0.34em] opacity-70">Wear</span>
          </Link>

          {/* desktop links */}
          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `eyebrow link-underline transition-colors ${
                    solid ? 'text-ink' : 'text-cream'
                  } ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* actions */}
          <div
            className={`flex items-center gap-3 sm:gap-5 ${
              solid ? 'text-ink' : 'text-cream'
            }`}
          >
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative transition-opacity hover:opacity-70"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-semibold text-cream">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative transition-opacity hover:opacity-70"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-semibold text-cream">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Menu"
              className="md:hidden transition-opacity hover:opacity-70"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile overlay menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[64] hidden flex-col items-center justify-center bg-ink text-cream md:hidden"
        style={{ display: 'none' }}
      >
        <ul ref={menuItems} className="flex flex-col items-center gap-7 text-center">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="display text-5xl font-light tracking-tight hover:opacity-70"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/cart" className="display text-5xl font-light tracking-tight hover:opacity-70">
              Bag ({cartCount})
            </Link>
          </li>
        </ul>
        <p className="eyebrow absolute bottom-10 text-cream/50">Wear Your Difference</p>
      </div>
    </>
  )
}
