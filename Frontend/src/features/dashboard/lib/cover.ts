import type { Cover, CoverHeight } from '@/stores/coverStore'

/**
 * Alturas en `dvh`: dependen del tamaño de la ventana (y del zoom), no de un
 * valor fijo, y la portada siempre ocupa todo el ancho disponible.
 */
const HEIGHT_CLASS: Record<CoverHeight, string> = {
  compact: 'h-[22dvh] min-h-32',
  normal: 'h-[32dvh] min-h-40',
  wide: 'h-[44dvh] min-h-48',
}

export const COVER_HEIGHTS = [
  { id: 'compact', label: 'Compacta', bar: 'h-2' },
  { id: 'normal', label: 'Normal', bar: 'h-3' },
  { id: 'wide', label: 'Amplia', bar: 'h-4' },
] as const satisfies ReadonlyArray<{ id: CoverHeight; label: string; bar: string }>

export function coverHeightClass(height: CoverHeight): string {
  return HEIGHT_CLASS[height]
}

interface CoverPreset {
  id: string
  label: string
  /** `null` = degradado aurora de la marca. */
  value: Cover
}

/** Portadas listas para usar (degradados de la paleta). */
export const COVER_PRESETS: CoverPreset[] = [
  { id: 'aurora', label: 'Aurora', value: null },
  { id: 'lavanda', label: 'Lavanda', value: 'linear-gradient(135deg, #c9b8ff 0%, #7c5cfc 100%)' },
  { id: 'menta', label: 'Menta', value: 'linear-gradient(135deg, #bef3e0 0%, #3f9e8f 100%)' },
  { id: 'cielo', label: 'Cielo', value: 'linear-gradient(135deg, #d5e4ff 0%, #6e8fff 100%)' },
  {
    id: 'atardecer',
    label: 'Atardecer',
    value: 'linear-gradient(135deg, #ffe0b0 0%, #ff9b7a 55%, #d64545 100%)',
  },
  { id: 'noche', label: 'Noche', value: 'linear-gradient(135deg, #2b2350 0%, #6f5bd6 100%)' },
]
