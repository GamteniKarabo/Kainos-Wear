import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from './products'

export interface CartItem extends Product {
  qty: number
  size: string
}

interface Toast {
  id: number
  message: string
}

interface StoreContextValue {
  cart: CartItem[]
  wishlist: Product[]
  cartCount: number
  cartTotal: number
  wishlistCount: number
  addToCart: (p: Product, size?: string, qty?: number) => void
  removeFromCart: (id: string, size: string) => void
  updateQty: (id: string, size: string, qty: number) => void
  clearCart: () => void
  addToWishlist: (p: Product) => void
  removeFromWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  toasts: Toast[]
  notify: (message: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)
const STORAGE_KEY = 'kainos-store-v1'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastId = useRef(0)

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw) as { cart?: CartItem[]; wishlist?: Product[] }
        setCart(data.cart ?? [])
        setWishlist(data.wishlist ?? [])
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }))
    } catch {
      /* ignore */
    }
  }, [cart, wishlist])

  const notify = (message: string) => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, message }])
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2600)
  }

  const addToCart = (p: Product, size?: string, qty = 1) => {
    const s = size ?? p.sizes[Math.floor(p.sizes.length / 2)] ?? 'M'
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id && i.size === s)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { ...p, size: s, qty }]
    })
    notify(`${p.name} · size ${s} added`)
  }

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
  }

  const updateQty = (id: string, size: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0),
    )
  }

  const clearCart = () => setCart([])

  const addToWishlist = (p: Product) => {
    if (wishlist.some((i) => i.id === p.id)) return
    setWishlist((prev) => [...prev, p])
    notify(`${p.name} saved to wishlist`)
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id))
  }

  const isWishlisted = (id: string) => wishlist.some((i) => i.id === id)

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)
  const cartTotal = cart.reduce((n, i) => n + i.qty * i.price, 0)
  const wishlistCount = wishlist.length

  const value: StoreContextValue = {
    cart,
    wishlist,
    cartCount,
    cartTotal,
    wishlistCount,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    toasts,
    notify,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
