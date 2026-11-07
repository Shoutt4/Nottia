import type { AdminUser } from '../types'

type NameParts = Pick<AdminUser, 'nombre' | 'apellido'>

/** Nombre completo de una cuenta, sin espacios sobrantes. */
export function adminFullName(user?: NameParts | null): string {
  if (!user) return ''

  return [user.nombre, user.apellido]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' ')
}

/** Fecha corta en español; "Sin fecha" cuando el backend no la envía. */
export function formatAdminDate(value?: string | null): string {
  if (!value) return 'Sin fecha'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Sin fecha'

  return new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(date)
}

/** Identificador corto para la tabla; el completo queda en el `title`. */
export function shortId(value: string): string {
  return value.length > 8 ? `${value.slice(0, 8)}…` : value
}
