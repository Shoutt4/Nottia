import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createActivitiesRequest,
  createActivityRequest,
  fetchActivities,
  fetchPublicActivities,
  updateActivityRequest,
} from '../api/activitiesApi'
import type { ActivitySchedulePayload } from '../types'

export const activitiesKeys = {
  all: ['activities'] as const,
  list: () => [...activitiesKeys.all, 'list'] as const,
  public: (userId: string | null) => [...activitiesKeys.all, 'public', userId] as const,
}

/** Planificación completa del usuario (`GET /api/planificacion/all`). */
export function useActivities() {
  return useQuery({
    queryKey: activitiesKeys.list(),
    queryFn: fetchActivities,
    staleTime: 30_000,
  })
}

/** Planificación pública de un usuario (`GET /api/public/panificacion/{id}`). */
export function usePublicActivities(userId: string | null) {
  return useQuery({
    queryKey: activitiesKeys.public(userId),
    queryFn: () => fetchPublicActivities(userId ?? ''),
    enabled: userId !== null,
    staleTime: 30_000,
  })
}

/**
 * Crea uno o varios bloques. Si el formulario genera un solo bloque usa
 * `/save`; si genera varios, `/save/all`.
 */
export function useCreateActivities() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payloads: ActivitySchedulePayload[]) =>
      payloads.length === 1
        ? createActivityRequest(payloads[0]).then((activity) => [activity])
        : createActivitiesRequest(payloads),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.all })
    },
  })
}

/** Edita un bloque concreto (`PUT /api/planificacion/update/{id}`). */
export function useUpdateActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ActivitySchedulePayload }) =>
      updateActivityRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.all })
    },
  })
}
