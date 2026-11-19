import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createEventRequest, fetchEvents } from '../api/eventsApi'
import { sortEvents } from '../lib/calendar'
import type { CalendarEvent, EventoRequestDTO } from '../types'

export const eventsKeys = {
  all: ['events'] as const,
  list: () => [...eventsKeys.all, 'list'] as const,
}

/** Agenda completa del usuario (`GET /api/evento/all`). */
export function useEvents() {
  return useQuery({
    queryKey: eventsKeys.list(),
    queryFn: fetchEvents,
    staleTime: 30_000,
  })
}

/** Crea un evento y lo pinta de inmediato en el calendario. */
export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: EventoRequestDTO) => createEventRequest(payload),
    onSuccess: (event) => {
      queryClient.setQueryData<CalendarEvent[]>(eventsKeys.list(), (current) =>
        sortEvents([...(current ?? []), event]),
      )
      void queryClient.invalidateQueries({ queryKey: eventsKeys.list() })
    },
  })
}
