import type { CalendarEvent } from '../types'

/**
 * Utilidades de fecha en hora local. La API envía `LocalDate` (`yyyy-MM-dd`);
 * por eso nunca usamos `new Date('yyyy-MM-dd')`, que se interpreta como UTC y
 * puede mostrar el día anterior en zonas horarias negativas.
 */

const longDate = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** `Date` local → `yyyy-MM-dd`. */
export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** `yyyy-MM-dd` → `Date` local (mediodía para evitar saltos de horario). */
export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)

  if (!year || !month || !day) return startOfDay(new Date())

  return new Date(year, month - 1, day, 12)
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** «Martes, 17 de noviembre». */
export function longDateLabel(date: Date): string {
  return capitalize(longDate.format(date))
}

/**
 * La API puede devolver `fecha: null` (la columna lo permite). `eventsApi`
 * normaliza y descarta esos eventos, pero blindamos las utilidades por si una
 * caché antigua conserva un dato sin fecha.
 */
function eventDate(event: CalendarEvent): string {
  return typeof event.date === 'string' ? event.date : ''
}

export function sortEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    const aDate = eventDate(a)
    const bDate = eventDate(b)

    if (!aDate && !bDate) return a.title.localeCompare(b.title, 'es')
    if (!aDate) return 1
    if (!bDate) return -1
    if (aDate !== bDate) return aDate.localeCompare(bDate)
    return a.title.localeCompare(b.title, 'es')
  })
}
