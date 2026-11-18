import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Check, ArrowLeft } from 'lucide-react'
import { getProduct, products } from '../lib/products'
import { useStore } from '../lib/StoreContext'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

const formatPrice = (n: number) => `R ${n.toLocaleString('en-ZA')}`

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = id ? getProduct(id) : undefined
  const { addToCart, addToWishlist, removeFromWishlist, isWishlisted } = useStore()
  const [size, setSize] = useState<string>(product?.sizes[1] ?? 'M')
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container-k flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="display text-5xl">Not found</h1>
        <p className="mt-4 text-ash">That piece isn&apos;t in the collection.</p>
        <Link to="/shop" className="eyebrow link-underline mt-8">
          Back to shop
        </Link>
      </div>
    )
  }

  const wished = isWishlisted(product.id)
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addToCart(product, size)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="bg-cream pt-24 sm:pt-28">
      <div className="container-k">
        <button
          onClick={() => navigate(-1)}
          className="eyebrow link-underline mb-6 flex items-center gap-2 text-ash hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* image */}
          <Reveal y={0} className="relative aspect-[3/4] overflow-hidden bg-ink">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover grayscale"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink">
                {product.badge}
              </span>
            )}
          </Reveal>

          {/* info */}
          <Reveal delay={0.1} className="flex flex-col">
            <p className="eyebrow text-ash">
              {product.color} · {product.fit}
            </p>
            <h1 className="display mt-3 text-5xl leading-none sm:text-6xl">{product.name}</h1>
            <p className="mt-5 text-2xl font-medium">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70">
              {product.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-line pt-6 text-sm">
              <dt className="text-ash">Fabric</dt>
              <dd className="text-right">{product.fabric}</dd>
              <dt className="text-ash">Fit</dt>
              <dd className="text-right">{product.fit}</dd>
              <dt className="text-ash">Colour</dt>
              <dd className="text-right">{product.color}</dd>
            </dl>

            {/* size */}
            <div className="mt-8">
              <p className="eyebrow mb-3 text-ash">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 w-11 rounded-full border text-xs font-medium transition-colors ${
                      size === s
                        ? 'border-ink bg-ink text-cream'
                        : 'border-line hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* actions */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button onClick={handleAdd} variant="solid" className="flex-1">
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to bag
                  </>
                )}
              </Button>
              <Button
                onClick={() => (wished ? removeFromWishlist(product.id) : addToWishlist(product))}
                variant="outline"
                className="flex-1"
              >
                <Heart className={`h-4 w-4 ${wished ? 'fill-ink' : ''}`} />
                {wished ? 'Saved' : 'Wishlist'}
              </Button>
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-ash">
              Free shipping over R 1,500 · 30-day returns
            </p>
          </Reveal>
        </div>
      </div>

      {/* related */}
      <section className="container-k py-24 sm:py-32">
        <Reveal>
          <h2 className="display mb-10 text-4xl sm:text-5xl">You may also like</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
