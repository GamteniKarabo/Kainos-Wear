import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../lib/StoreContext'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

const formatPrice = (n: number) => `R ${n.toLocaleString('en-ZA')}`

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, wishlistCount } = useStore()

  if (wishlistCount === 0) {
    return (
      <div className="container-k flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <Heart className="h-10 w-10 text-ash" />
        <h1 className="display mt-6 text-5xl">No saves yet</h1>
        <p className="mt-4 text-ash">Tap the heart on any piece to keep it here.</p>
        <div className="mt-8">
          <Button to="/shop" variant="solid">
            Browse tees
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream pt-28 sm:pt-32">
      <div className="container-k">
        <Reveal>
          <p className="eyebrow text-ash">Saved</p>
          <h1 className="display mt-3 text-6xl sm:text-8xl">Wishlist</h1>
          <p className="mt-4 text-ash">{wishlistCount} piece{wishlistCount > 1 ? 's' : ''} saved</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {wishlist.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <div className="group relative">
                <ProductCard product={p} index={i} />
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-[10px] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ink-soft"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Add to bag
                  </button>
                  <button
                    aria-label="Remove"
                    onClick={() => removeFromWishlist(p.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ash transition-colors hover:border-ink hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/shop" className="eyebrow link-underline text-ash hover:text-ink">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
