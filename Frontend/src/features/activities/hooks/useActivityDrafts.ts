import { useCallback, useMemo, useState } from 'react'

import { DEFAULT_ACTIVITY_COLOR } from '../lib/colors'
import { timeToMinutes, toApiTime, toInputTime } from '../lib/time'
import type { Activity, ActivitySchedulePayload, ApiDay } from '../types'

export interface ActivityDraft {
  id: string
  name: string
  description: string
  color: string
  days: ApiDay[]
  start: string
  end: string
}

export interface DraftErrors {
  name?: string
  description?: string
  days?: string
  start?: string
  end?: string
}

export type DraftErrorMap = Record<string, DraftErrors>

const makeId = () => `draft-${Date.now()}-${Math.random().toString(36).slice(2)}`

function emptyDraft(previous?: ActivityDraft): ActivityDraft {
  return {
    id: makeId(),
    name: '',
    description: '',
    color: previous?.color ?? DEFAULT_ACTIVITY_COLOR,
    days: [],
    start: previous?.start ?? '09:00',
    end: previous?.end ?? '10:00',
  }
}

function draftFromActivity(activity: Activity): ActivityDraft {
  return {
    id: makeId(),
    name: activity.name,
    description: activity.description,
    color: activity.color,
    days: [activity.day],
    start: toInputTime(activity.start),
    end: toInputTime(activity.end),
  }
}

function validateDraft(draft: ActivityDraft): DraftErrors {
  const errors: DraftErrors = {}
  const name = draft.name.trim()

  if (!name) errors.name = 'Escribe el nombre de la actividad.'
  else if (name.length > 80) errors.name = 'El nombre no puede superar 80 caracteres.'

  if (draft.description.trim().length > 300) {
    errors.description = 'La descripción no puede superar 300 caracteres.'
  }

  if (draft.days.length === 0) errors.days = 'Elige al menos un día.'

  if (!draft.start) errors.start = 'Indica la hora de inicio.'
  if (!draft.end) errors.end = 'Indica la hora de fin.'
  else if (timeToMinutes(draft.end) <= timeToMinutes(draft.start)) {
    errors.end = 'La hora de fin debe ser posterior a la de inicio.'
  }

  return errors
}

/**
 * Borradores del formulario. Cada borrador es una actividad con uno o varios
 * días; al guardar se convierte en un bloque por día. Para una misma actividad
 * con horarios distintos se duplica el borrador y se cambia el horario.
 */
export function useActivityDrafts(activity?: Activity) {
  const [drafts, setDrafts] = useState<ActivityDraft[]>(() => [
    activity ? draftFromActivity(activity) : emptyDraft(),
  ])
  const [errors, setErrors] = useState<DraftErrorMap>({})

  const clearError = useCallback((id: string) => {
    setErrors((current) => {
      if (!current[id]) return current
      const next = { ...current }
      delete next[id]
      return next
    })
  }, [])

  const updateDraft = useCallback(
    (id: string, patch: Partial<ActivityDraft>) => {
      setDrafts((current) =>
        current.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)),
      )
      clearError(id)
    },
    [clearError],
  )

  const toggleDay = useCallback(
    (id: string, day: ApiDay) => {
      setDrafts((current) =>
        current.map((draft) => {
          if (draft.id !== id) return draft
          if (activity) return { ...draft, days: [day] }

          const selected = draft.days.includes(day)
          return {
            ...draft,
            days: selected
              ? draft.days.filter((value) => value !== day)
              : [...draft.days, day],
          }
        }),
      )
      clearError(id)
    },
    [activity, clearError],
  )

  const addDraft = useCallback(() => {
    setDrafts((current) => [...current, emptyDraft(current[current.length - 1])])
  }, [])

  const duplicateDraft = useCallback((id: string) => {
    setDrafts((current) => {
      const source = current.find((draft) => draft.id === id)
      return source ? [...current, { ...source, id: makeId() }] : current
    })
  }, [])

  const removeDraft = useCallback((id: string) => {
    setDrafts((current) =>
      current.length > 1 ? current.filter((draft) => draft.id !== id) : current,
    )
    clearError(id)
  }, [clearError])

  const payloads = useMemo<ActivitySchedulePayload[]>(
    () =>
      drafts.flatMap((draft) =>
        draft.days.map((day) => ({
          actividad: {
            nombreActividad: draft.name.trim(),
            descripcionActividad: draft.description.trim(),
            color: draft.color,
          },
          diaSemana: day,
          horaInicio: toApiTime(draft.start),
          horaFin: toApiTime(draft.end),
        })),
      ),
    [drafts],
  )

  const validate = useCallback(() => {
    const next: DraftErrorMap = {}

    for (const draft of drafts) {
      const draftErrors = validateDraft(draft)
      if (Object.keys(draftErrors).length > 0) next[draft.id] = draftErrors
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }, [drafts])

  return {
    drafts,
    errors,
    payloads,
    updateDraft,
    toggleDay,
    addDraft,
    duplicateDraft,
    removeDraft,
    validate,
    editing: Boolean(activity),
  }
}
