import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Estilos de tapa del diseñador de cuadernos. */
export type CoverTemplate = 'papel' | 'nocturno' | 'solar' | 'lavanda' | 'minimal'

/**
 * Diseño de portada de un cuaderno.
 *
 * El backend solo guarda `nombre`, `color` y `orden`; el estilo, el acento y la
 * imagen viven en el navegador bajo `nottia-notebook-covers` hasta que la API
 * tenga soporte para portadas.
 */
export interface CoverDesign {
  template: CoverTemplate
  /** Color principal de la tapa (hex). */
  color: string
  /** Color secundario para el arte y los detalles (hex). */
  accent: string
  /** Imagen de fondo opcional (data URL). */
  image: string | null
}

interface NotebookCoverState {
  covers: Record<string, CoverDesign>
  setCover: (id: string, cover: CoverDesign) => void
  removeCover: (id: string) => void
}

export const useNotebookCoverStore = create<NotebookCoverState>()(
  persist(
    (set) => ({
      covers: {},
      setCover: (id, cover) =>
        set((state) => ({ covers: { ...state.covers, [id]: cover } })),
      removeCover: (id) =>
        set((state) => {
          const covers = { ...state.covers }
          delete covers[id]
          return { covers }
        }),
    }),
    { name: 'nottia-notebook-covers' },
  ),
)
