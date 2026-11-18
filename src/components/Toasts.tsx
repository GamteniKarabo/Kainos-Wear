import { useStore } from '../lib/StoreContext'

export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-cream shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
