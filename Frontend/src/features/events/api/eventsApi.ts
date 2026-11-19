import { isAxiosError } from 'axios'

import { getCurrentUser, http } from '@/config'

import { sortEvents } from '../lib/calendar'
import { eventTone } from '../lib/tone'
import type { CalendarEvent, EventoRequestDTO, EventoResponseDTO } from '../types'

function toEvent(dto: EventoResponseDTO, fallbackDate?: string): CalendarEvent | null {
  const date =
    normalizeDate(dto.fecha) ?? normalizeDate(fallbackDate) ?? normalizeDate(dto.createAt)

  if (!date) return null

  return {
    id: dto.idEvento,
    title: dto.titulo?.trim() || 'Evento sin título',
    description: dto.descripcion?.trim() ?? '',
    date,
    tone: eventTone(dto.idEvento),
    createdAt: dto.createAt ?? '',
  }
}

/** Normaliza `yyyy-MM-dd` o un ISO con hora; devuelve `null` si no es una fecha. */
function normalizeDate(value: string | null | undefined): string | null {
  if (!value) return null

  const date = value.slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null
}

/** El backend permite `fecha = null`; esos eventos no se pueden situar en el mes. */
function isEvent(event: CalendarEvent | null): event is CalendarEvent {
  return event !== null
}

/**
 * `GET /api/evento/all`.
 * El backend responde **404** cuando el usuario todavía no tiene eventos; para
 * el calendario eso es una agenda vacía, no un error.
 */
export async function fetchEvents(): Promise<CalendarEvent[]> {
  try {
    const { data } = await http.get<EventoResponseDTO[]>('/api/evento/all')
    // El backend comprueba los eventos del usuario pero hoy devuelve `findAll`.
    // Filtramos por el id del token para no pintar eventos de otras cuentas.
    const currentUserId = getCurrentUser().id
    const own = currentUserId
      ? data.filter((event) => event.idUsuario === currentUserId)
      : data

    return sortEvents(own.map((event) => toEvent(event)).filter(isEvent))
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return []
    throw error
  }
}

/** `POST /api/evento/save` — crea un evento en el usuario del token. */
export async function createEventRequest(payload: EventoRequestDTO): Promise<CalendarEvent> {
  const { data } = await http.post<EventoResponseDTO>('/api/evento/save', payload)
  const event = toEvent(data, payload.fecha)

  if (!event) {
    throw new Error('El evento se guardó sin una fecha válida.')
  }

  return event
}
