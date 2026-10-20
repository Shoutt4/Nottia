import type { UserProfile } from '../types'

type NameParts = Pick<UserProfile, 'nombre' | 'apellido'>

/** Nombre completo, sin espacios sobrantes. */
export function fullName(profile?: NameParts | null): string {
  if (!profile) return ''

  return [profile.nombre, profile.apellido]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' ')
}

/** Fecha larga en español; "No disponible" si falta o es inválida. */
export function formatDate(value?: string | null): string {
  if (!value) return 'No disponible'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No disponible'

  return new Intl.DateTimeFormat('es', { dateStyle: 'long' }).format(date)
}
