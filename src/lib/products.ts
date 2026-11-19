export type ProductColor = 'Black' | 'White' | 'Cream White' | 'Powder blue'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  color: ProductColor
  fit: string
  fabric: string
  description: string
  badge?: string
  sizes: string[]
}

export const products: Product[] = [
  {
    id: 'monochrome-tee',
    name: 'KAINOS Tee',
    price: 399,
    image: '/images/black K Tee.jpg',
    color: 'Black',
    fit: 'Oversized',
    fabric: '300gsm combed cotton',
    description:
      'Features a striking monochrome classical sculputre graphic highlighted by a radiant starburst design, paired with the bold "KAINOS" wordmark and the tagline "Elegance Without Limits"',
    badge: 'Bestseller',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'obsidian-premium',
    name: 'KAINOS Smoke',
    price: 349.99,
    image: '/images/KAINOS Smoke B.jpg',
    color: 'Black',
    fit: 'Oversized',
    fabric: '300gsm /50% cotton & 50% polyster with metallic silver design',
    description:
      'Deep, matte, uncompromising. A slim-cut essential in pure obsidian for the night you own.',
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'Kc',
    name: 'KAINOS Kc',
    price: 399.99,
    image: '/images/KAINOS KC CW.jpg',
    color: 'Cream White',
    fit: 'Oversized',
    fabric: '300gsm heavyweight cotton',
    description:
      'When the light goes out, you stay visible. A drop-shoulder heavyweight built for presence.',
    badge: 'Limited',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'bone-classic',
    name: 'KAINOS Smoke W',
    price: 349.99,
    image: '/images/KAINOS Smoke W.jpg',
    color: 'White',
    fit: 'Oversized',
    fabric: '300gsm organic cotton',
    description:
      'Soft as bone, loose as freedom. Our most-worn silhouette — oversized, breathable, effortless.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'eclipse-oversized',
    name: 'Kainos "Elegance Without Limits" Tee',
    price: 399.99,
    image: '/images/Kainos Elegance.jpg',
    color: 'White',
    fit: 'Oversized',
    fabric: '300gsm heavyweight cotton',
    description:
      'When the light goes out, you stay visible. A drop-shoulder heavyweight built for presence.',
    badge: 'Limited',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ash-minimal',
    name: 'KAINOS Smoke',
    price: 349.99,
    image: '/images/KAINOS Smoke PB.jpg',
    color: 'Powder blue',
    fit: 'Oversized',
    fabric: '300gsm brushed cotton',
    description:
      'The in-between tone. A brushed grey that sits quietly between black and white — and speaks loudest.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'noir-heavyweight',
    name: 'KAINOS KC',
    price: 399.99,
    image: '/images/KAINOS KC OV W.jpg',
    color: 'White',
    fit: 'Oversized',
    fabric: '300gsm Tee',
    description:
      'Structure without noise. A boxy 300gsm tee that holds its shape and your intention.',
    badge: 'Premium',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ivory-statement',
    name: 'KAINOS KC',
    price: 399.99,
    image: '/images/KAINOS KC w.jpg',
    color: 'White',
    fit: 'Oversized',
    fabric: '300gsm pima cotton',
    description:
      'Warm ivory, cool confidence. Pima cotton with a hand-feel that earns the second glance.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'carbon-boxfit',
    name: 'KAINOS Smoke',
    price: 349.99,
    image: '/images/KAINOS Smoke OV1 B.jpg',
    color: 'Black',
    fit: 'Oversized',
    fabric: '300gsm carbon-wash cotton',
    description:
      'Washed to a graphite calm. A boxy black cut for those who move differently.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
