/**
 * Paleta de colores de cuaderno. El backend guarda el `id` como texto
 * ("azul", "naranja", …); aquí se traduce a un valor CSS para la interfaz.
 */
export interface NotebookColor {
  id: string
  label: string
  /** Color CSS del cuaderno. */
  value: string
}

export const NOTEBOOK_COLORS: NotebookColor[] = [
  { id: 'azul', label: 'Azul', value: '#5b8def' },
  { id: 'naranja', label: 'Naranja', value: '#f59e42' },
  { id: 'verde', label: 'Verde', value: '#4caf82' },
  { id: 'rosa', label: 'Rosa', value: '#e879a8' },
  { id: 'morado', label: 'Morado', value: '#9b7ff0' },
  { id: 'amarillo', label: 'Amarillo', value: '#e0b93c' },
  { id: 'rojo', label: 'Rojo', value: '#e06c75' },
  { id: 'gris', label: 'Gris', value: '#8b8b9e' },
]

export const DEFAULT_NOTEBOOK_COLOR = 'azul'

const FALLBACK_COLOR = '#5b8def'

/** Color CSS para un cuaderno; los valores desconocidos caen al azul. */
export function notebookColor(color: string): string {
  return NOTEBOOK_COLORS.find((item) => item.id === color)?.value ?? FALLBACK_COLOR
}
