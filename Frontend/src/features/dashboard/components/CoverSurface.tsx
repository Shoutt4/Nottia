import { cn } from '@/lib/utils'
import type { Cover } from '@/stores/coverStore'

/** Pinta la portada: imagen, degradado de preset o el aurora por defecto. */
export function CoverSurface({ cover, className }: { cover: Cover; className?: string }) {
  const isGradient = cover?.startsWith('linear-gradient') ?? false
  const hasImage = cover !== null && !isGradient

  return (
    <div
      className={cn('relative overflow-hidden bg-surface', !cover && 'aurora', className)}
      style={isGradient && cover ? { backgroundImage: cover } : undefined}
    >
      {hasImage && (
        <img src={cover} alt="Portada del tablero" className="h-full w-full object-cover" />
      )}

      {/* Lomo y profundidad: la portada se lee como un cuaderno, no como un banner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 via-black/10 to-transparent sm:w-4"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-3 w-px bg-white/15 sm:left-4"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
      />
    </div>
  )
}
