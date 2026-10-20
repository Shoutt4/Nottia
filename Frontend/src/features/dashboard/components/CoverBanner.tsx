import { cn } from '@/lib/utils'
import { useCoverStore } from '@/stores/coverStore'

import { coverHeightClass } from '../lib/cover'
import { CoverSurface } from './CoverSurface'

/**
 * Portada del inicio a sangre: ocupa todo el ancho del contenido y su alto es
 * proporcional, así se adapta al redimensionar o al hacer zoom.
 */
export function CoverBanner() {
  const cover = useCoverStore((state) => state.cover)
  const height = useCoverStore((state) => state.height)

  return <CoverSurface cover={cover} className={cn('-mt-8', coverHeightClass(height))} />
}
