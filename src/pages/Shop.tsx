import { useMemo, useState } from 'react'
import { products, type ProductColor } from '../lib/products'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

type Filter = 'All' | ProductColor
type Sort = 'featured' | 'low' | 'high'

const filters: Filter[] = ['All', 'Black', 'White', 'Powder blue', 'Cream White']
const formatPrice = (n: number) => `R ${n.toLocaleString('en-ZA')}`

export default function Shop() {
  const [filter, setFilter] = useState<Filter>('All')
  const [sort, setSort] = useState<Sort>('featured')

  const list = useMemo(() => {
    let r = products.filter((p) => filter === 'All' || p.color === filter)
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price)
    return r
  }, [filter, sort])

  return (
    <div className="bg-cream pt-28 sm:pt-32">
      {/* header */}
      <div className="container-k">
        <Reveal>
          <p className="eyebrow text-ash">The Shop</p>
          <h1 className="display mt-3 text-6xl sm:text-8xl">Tees</h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70">
            Premium monochrome essentials. Heavyweight cotton, considered cuts, made to be
            worn differently.
          </p>
        </Reveal>
      </div>

      {/* controls */}
      <div className="container-k sticky top-16 z-40 -mx-5 mt-10 border-y border-line bg-cream/90 px-5 py-4 backdrop-blur-md sm:top-20 sm:mx-0 sm:rounded-none">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${filter === f
                  ? 'border-ink bg-ink text-cream'
                  : 'border-line text-ink hover:border-ink'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ash">
            <span className="hidden sm:inline">{list.length} items</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-line bg-transparent px-3 py-2 text-ink focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price · Low</option>
              <option value="high">Price · High</option>
            </select>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="container-k py-12 sm:py-16">
        {list.length === 0 ? (
          <p className="py-20 text-center text-ash">No pieces in this tone yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <div className="container-k pb-24 text-center text-xs uppercase tracking-[0.2em] text-ash">
        Prices in ZAR · Free shipping over R 1,500
      </div>
    </div>
  )
}
