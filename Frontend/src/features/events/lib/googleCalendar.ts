import type { CalendarEvent } from '../types'
import { addDays, parseDateKey, toDateKey } from './calendar'

/**
 * Enlace de plantilla de Google Calendar. No necesita OAuth ni API key: abre
 * el formulario de Google con el evento ya rellenado (todo el día).
 * `dates` usa el formato `YYYYMMDD/YYYYMMDD`, con el día final exclusivo.
 */
export function googleCalendarUrl(event: CalendarEvent): string {
  const start = parseDateKey(event.date)
  const startKey = toDateKey(start).replaceAll('-', '')
  const endKey = toDateKey(addDays(start, 1)).replaceAll('-', '')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    dates: `${startKey}/${endKey}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
