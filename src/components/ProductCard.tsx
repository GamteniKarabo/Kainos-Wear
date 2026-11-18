import { Link } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import type { Product } from '../lib/products'
import { useStore } from '../lib/StoreContext'

interface Props {
  product: Product
  index?: number
}

const formatPrice = (n: number) => `R ${n.toLocaleString('en-ZA')}`

export default function ProductCard({ product }: Props) {
  const { addToCart, addToWishlist, removeFromWishlist, isWishlisted } = useStore()
  const wished = isWishlisted(product.id)

  return (
    <article className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-deep">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />

          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink">
              {product.badge}
            </span>
          )}

          {/* wishlist */}
          <button
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={(e) => {
              e.preventDefault()
              wished ? removeFromWishlist(product.id) : addToWishlist(product)
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink backdrop-blur transition-transform hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${wished ? 'fill-ink' : ''}`} />
          </button>

          {/* quick add */}
          <button
            aria-label="Quick add to bag"
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-ink/90 py-3 text-[11px] uppercase tracking-[0.2em] text-cream opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink"
          >
            <Plus className="h-4 w-4" /> Quick Add
          </button>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${product.id}`} className="link-underline text-base font-medium">
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ash">
            {product.color} · {product.fit}
          </p>
        </div>
        <span className="shrink-0 text-sm font-medium">{formatPrice(product.price)}</span>
      </div>
    </article>
  )
}
