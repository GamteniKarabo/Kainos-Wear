import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag, MessageCircle } from 'lucide-react'
import { useStore } from '../lib/StoreContext'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

const formatPrice = (n: number) => `R ${n.toLocaleString('en-ZA')}`
const WHATSAPP_NUMBER = '27717506007'

export default function Cart() {
  const { cart, cartCount, cartTotal, updateQty, removeFromCart, clearCart } = useStore()
  const [placed, setPlaced] = useState(false)
  const [waUrl, setWaUrl] = useState('')

  const buildOrderMessage = () => {
    const lines = cart.map(
      (i) => `• ${i.name} (Size ${i.size}) × ${i.qty} — ${formatPrice(i.price * i.qty)}`,
    )
    return `Hello Kainos Wear 👋\n\nI'd like to place this order:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(cartTotal)}\n\nPlease share payment details. Thank you!`
  }

  const handleCheckout = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage())}`
    setWaUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
    setPlaced(true)
  }

  if (placed) {
    return (
      <div className="container-k flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-cream">
          <MessageCircle className="h-7 w-7" />
        </div>
        <h1 className="display mt-6 text-5xl">Head to WhatsApp</h1>
        <p className="mt-4 max-w-sm text-ash">
          We&apos;ve opened a chat with your order summary. Confirm the items and arrange
          payment with Kainos Wear on WhatsApp to complete your purchase.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={() => window.open(waUrl, '_blank', 'noopener,noreferrer')}
            variant="solid"
          >
            Open WhatsApp
          </Button>
          <Link to="/shop" className="eyebrow link-underline text-ash hover:text-ink">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  if (cartCount === 0) {
    return (
      <div className="container-k flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <ShoppingBag className="h-10 w-10 text-ash" />
        <h1 className="display mt-6 text-5xl">Your bag is empty</h1>
        <p className="mt-4 text-ash">Nothing saved yet — the difference awaits.</p>
        <div className="mt-8">
          <Button to="/shop" variant="solid">
            Shop tees
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream pt-28 sm:pt-32">
      <div className="container-k">
        <Reveal>
          <p className="eyebrow text-ash">Your Bag</p>
          <h1 className="display mt-3 text-6xl sm:text-8xl">Cart</h1>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* items */}
          <div className="divide-y divide-line border-t border-line">
            {cart.map((item) => (
              <div key={item.id + item.size} className="flex gap-4 py-6 sm:gap-6">
                <Link
                  to={`/product/${item.id}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden bg-ink sm:h-36 sm:w-28"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover "
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="link-underline text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ash">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      aria-label="Remove"
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-ash transition-colors hover:text-ink"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        aria-label="Decrease"
                        onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                        className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-cream"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="eyebrow link-underline pt-6 text-ash hover:text-ink"
            >
              Clear bag
            </button>
          </div>

          {/* summary */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="border border-line bg-cream-deep p-7">
                <h2 className="eyebrow text-ash">Summary</h2>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/70">Subtotal ({cartCount})</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/70">Shipping</span>
                    <span className="text-ash">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between border-t border-line pt-3 text-base">
                    <span className="font-medium">Total</span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
                <Button onClick={handleCheckout} variant="solid" className="mt-7 w-full">
                  Checkout on WhatsApp
                </Button>
                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-ash">
                  Secure payment via WhatsApp · Free shipping over R 1,500
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
