import { cn } from '@/lib/utils'
import type { Cover } from '@/stores/coverStore'

/** Pinta la portada: imagen, degradado de preset o el aurora por defecto. */
export function CoverSurface({ cover, className }: { cover: Cover; className?: string }) {
  const isGradient = cover?.startsWith('linear-gradient') ?? false
  const hasImage = cover !== null && !isGradient

  return (
    <div
      className={cn('overflow-hidden bg-surface', !cover && 'aurora', className)}
      style={isGradient && cover ? { backgroundImage: cover } : undefined}
    >
      {hasImage && (
        <img src={cover} alt="Portada del tablero" className="h-full w-full object-cover" />
      )}
    </div>
  )
}
