import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'outline' | 'solid' | 'light'

interface Props {
  children: ReactNode
  to?: string
  onClick?: () => void
  variant?: Variant
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-500'

const variants: Record<Variant, string> = {
  outline: 'border border-ink text-ink hover:text-cream',
  solid: 'bg-ink text-cream hover:text-ink',
  light: 'border border-cream text-cream hover:text-ink',
}

const fillFor: Record<Variant, string> = {
  outline: 'bg-ink',
  solid: 'bg-cream',
  light: 'bg-ink',
}

export default function Button({
  children,
  to,
  onClick,
  variant = 'outline',
  className = '',
  type = 'button',
  ariaLabel,
}: Props) {
  const content = (
    <>
      <span
        className={`absolute inset-0 z-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${fillFor[variant]}`}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  )

  const cls = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
