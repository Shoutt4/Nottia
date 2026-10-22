type Unit = 'year' | 'month' | 'day' | 'hour' | 'minute'

const RELATIVE = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

const UNITS: Array<[Unit, number]> = [
  ['year', 365 * 24 * 60 * 60 * 1000],
  ['month', 30 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
]

/** Fecha relativa en español: "hace 2 min", "ayer", "hace 3 días"… */
export function formatRelativeDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const diff = date.getTime() - Date.now()
  const abs = Math.abs(diff)

  for (const [unit, ms] of UNITS) {
    if (abs >= ms) return RELATIVE.format(Math.round(diff / ms), unit)
  }

  return 'ahora'
}

/** Vista previa en texto plano (colapsa saltos de línea y espacios). */
export function noteExcerpt(content: string): string {
  return content.replace(/\s+/g, ' ').trim()
}

const DAY = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' })
const DAY_YEAR = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', year: 'numeric' })

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Encabezado del listado: "Hoy", "Ayer", "12 oct" o "12 oct 2025". */
export function formatDayLabel(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Sin fecha'

  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (sameDay(date, now)) return 'Hoy'
  if (sameDay(date, yesterday)) return 'Ayer'

  return date.getFullYear() === now.getFullYear() ? DAY.format(date) : DAY_YEAR.format(date)
}
