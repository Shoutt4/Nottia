import { useState } from 'react'

import { PlusIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'
import { getErrorMessage } from '@/lib/errors'

import { ActivitiesLoading } from '../components/ActivitiesLoading'
import { ActivityDialog } from '../components/ActivityDialog'
import { ScheduleBoard } from '../components/ScheduleBoard'
import { ScheduleShareMenu } from '../components/ScheduleShareMenu'
import { useActivities } from '../hooks/useActivities'
import type { Activity } from '../types'

type DialogState = { mode: 'create' } | { mode: 'edit'; activity: Activity } | null

/** Planificación semanal de actividades del usuario. */
export function ActivitiesPage() {
  const activitiesQuery = useActivities()
  const [dialog, setDialog] = useState<DialogState>(null)

  const activities = activitiesQuery.data?.activities ?? []
  const total = activitiesQuery.data?.total ?? activities.length
  const days = new Set(activities.map((activity) => activity.day)).size
  const isBusy = activitiesQuery.isFetching && !activitiesQuery.isPending

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Tu semana
            </p>
            <h1
              className="mt-3 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Actividades
            </h1>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted lg:pb-2 lg:text-right">
            Organiza tus días y horarios en una sola vista. Toca un bloque para editarlo.
          </p>
        </div>

        <div className="mt-8 border-t border-line" />
      </Reveal>

      <Reveal className="mt-8" delay={80}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {activitiesQuery.isPending
              ? 'Cargando…'
              : activitiesQuery.isError
                ? 'No disponible'
                : `${total} ${total === 1 ? 'actividad' : 'actividades'} · ${days} ${
                    days === 1 ? 'día' : 'días'
                  }`}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {activities.length > 0 && !activitiesQuery.isError ? (
              <ScheduleShareMenu activities={activities} />
            ) : null}
            <button
              type="button"
              onClick={() => setDialog({ mode: 'create' })}
              className={buttonClass('primary', 'group shrink-0 whitespace-nowrap')}
            >
              <PlusIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Nueva actividad
            </button>
          </div>
        </div>

        {activitiesQuery.isError ? (
          <div className="mt-8 rounded-3xl border border-line bg-surface px-5 py-10 text-center">
            <p className="text-sm font-semibold text-ink">No pudimos cargar tus actividades</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-muted">
              {getErrorMessage(activitiesQuery.error)}
            </p>
            <button
              type="button"
              onClick={() => void activitiesQuery.refetch()}
              disabled={activitiesQuery.isFetching}
              className={buttonClass('secondary', 'mt-5')}
            >
              {activitiesQuery.isFetching ? 'Reintentando…' : 'Reintentar'}
            </button>
          </div>
        ) : activitiesQuery.isPending ? (
          <ActivitiesLoading />
        ) : activities.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-line bg-surface px-5 py-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Semana libre
            </p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Aún no hay actividades
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-pretty text-muted">
              Crea tu primera actividad y asígnala a uno o varios días de la semana.
            </p>
            <button
              type="button"
              onClick={() => setDialog({ mode: 'create' })}
              className={buttonClass('primary', 'mt-6')}
            >
              Crear actividad
            </button>
          </div>
        ) : (
          <div className={isBusy ? 'mt-8 opacity-70 transition-opacity' : 'mt-8'}>
            <ScheduleBoard
              activities={activities}
              onEdit={(activity) => setDialog({ mode: 'edit', activity })}
            />
          </div>
        )}
      </Reveal>

      {dialog ? (
        <ActivityDialog
          key={dialog.mode === 'edit' ? dialog.activity.id : 'new-activity'}
          activity={dialog.mode === 'edit' ? dialog.activity : undefined}
          onClose={() => setDialog(null)}
        />
      ) : null}
    </div>
  )
}
