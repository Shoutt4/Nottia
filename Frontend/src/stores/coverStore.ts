import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Data URL de una imagen o un `linear-gradient(...)` de los presets. */
export type Cover = string | null

export type CoverHeight = 'compact' | 'normal' | 'wide'

interface CoverState {
  /** Portada; `null` usa el degradado `.aurora` por defecto. */
  cover: Cover
  /** Alto proporcional de la portada. */
  height: CoverHeight
  setCover: (cover: Cover) => void
  setHeight: (height: CoverHeight) => void
}

/**
 * Portada del inicio. Se guarda bajo `nottia-cover` — clave aparte de
 * `nottia-ui` para que el data URL no engorde la lectura del tema al arrancar.
 */
export const useCoverStore = create<CoverState>()(
  persist(
    (set) => ({
      cover: null,
      height: 'normal',
      setCover: (cover) => set({ cover }),
      setHeight: (height) => set({ height }),
    }),
    { name: 'nottia-cover' },
  ),
)
