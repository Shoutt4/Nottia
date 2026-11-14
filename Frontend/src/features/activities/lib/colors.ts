export interface ActivityColor {
  id: string
  label: string
  /** Fondo pastel de la tarjeta. */
  soft: string
  /** Borde y acento. */
  border: string
  /** Texto legible sobre `soft`. */
  ink: string
}

/** El backend guarda el id como texto («amarillo», «naranja», …). */
export const ACTIVITY_COLORS: ActivityColor[] = [
  { id: 'amarillo', label: 'Amarillo', soft: '#F8E9B0', border: '#D8B24B', ink: '#665014' },
  { id: 'naranja', label: 'Naranja', soft: '#F9D8BD', border: '#E09A57', ink: '#6B3B12' },
  { id: 'rojo', label: 'Rojo', soft: '#F6C9C9', border: '#D96A6A', ink: '#6A2222' },
  { id: 'rosa', label: 'Rosa', soft: '#F6CEE0', border: '#D97BA5', ink: '#67233F' },
  { id: 'morado', label: 'Morado', soft: '#DED2FA', border: '#9B7FF0', ink: '#3F2C72' },
  { id: 'azul', label: 'Azul', soft: '#CFE0FA', border: '#6B97DF', ink: '#1F3A66' },
  { id: 'verde', label: 'Verde', soft: '#CFE8D8', border: '#5AA47C', ink: '#1E4B34' },
  { id: 'gris', label: 'Gris', soft: '#E0DFE8', border: '#9A98A8', ink: '#3D3B47' },
]

export const DEFAULT_ACTIVITY_COLOR = 'amarillo'

export function activityColor(id: string): ActivityColor {
  return ACTIVITY_COLORS.find((color) => color.id === id) ?? ACTIVITY_COLORS[0]
}
