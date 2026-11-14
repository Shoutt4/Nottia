import { useMemo } from 'react'

import { activityColor } from '../lib/colors'
import { WEEK_DAYS } from '../lib/days'
import {
  activityPosition,
  getScheduleRange,
  HOUR_HEIGHT,
  hourMarks,
  MIN_ACTIVITY_HEIGHT,
  positionActivities,
} from '../lib/layout'
import { formatHour, formatTimeRange, timeToMinutes } from '../lib/time'
import type { Activity } from '../types'

interface ScheduleBoardProps {
  activities: Activity[]
  onEdit?: (activity: Activity) => void
}

const DAY_COUNT = WEEK_DAYS.length
const DAY_GRID = { gridTemplateColumns: `repeat(${DAY_COUNT}, minmax(0, 1fr))` }
const DAY_HEADER_HEIGHT = 60

/** Tabla semanal: horas en el eje Y y días de la semana en el eje X. */
export function ScheduleBoard({ activities, onEdit }: ScheduleBoardProps) {
  const range = useMemo(() => getScheduleRange(activities), [activities])
  const marks = useMemo(() => hourMarks(range), [range])
  const days = useMemo(
    () =>
      WEEK_DAYS.map((day) => ({
        day,
        layout: positionActivities(activities.filter((activity) => activity.day === day.key)),
      })),
    [activities],
  )
  const trackHeight = (range.endHour - range.startHour) * HOUR_HEIGHT

  return (
    <div className="note-paper overflow-hidden rounded-[6px] border border-paper-line shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] [print-color-adjust:exact] print:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
          Semana
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted">
          {activities.length} {activities.length === 1 ? 'actividad' : 'actividades'}
        </p>
      </div>

      <div className="grid grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[84px_minmax(0,1fr)]">
        <div className="border-r border-paper-line">
          <div
            className="flex items-end justify-end border-b border-paper-line bg-paper px-2 py-2"
            style={{ height: DAY_HEADER_HEIGHT }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted">
              Hora
            </p>
          </div>

          <div className="relative border-b border-paper-line bg-paper" style={{ height: trackHeight }}>
            {marks.map((hour) => {
              const percent = ((hour - range.startHour) / (range.endHour - range.startHour)) * 100
              const transform =
                percent === 0
                  ? 'none'
                  : percent === 100
                    ? 'translateY(-100%)'
                    : 'translateY(-50%)'

              return (
                <span
                  key={hour}
                  className="absolute right-2 font-mono text-[10px] text-paper-muted"
                  style={{ top: `${percent}%`, transform }}
                >
                  {formatHour(hour)}
                </span>
              )
            })}
          </div>
        </div>

        <div className="min-w-0 overflow-x-auto print:overflow-visible">
          <div className="min-w-[808px] print:min-w-0">
            <div
              className="grid overflow-hidden border-b border-paper-line bg-paper"
              style={{ ...DAY_GRID, height: DAY_HEADER_HEIGHT }}
            >
              {WEEK_DAYS.map((day) => (
                <div
                  key={day.key}
                  className="flex h-full flex-col items-center justify-center border-r border-paper-line px-1 text-center last:border-r-0"
                >
                  <p className="w-full truncate font-serif text-[11px] font-semibold leading-tight text-paper-ink sm:text-sm">
                    {day.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-muted">
                    {day.short}
                  </p>
                  {!day.apiDay ? (
                    <p className="mt-0.5 text-[8px] leading-tight text-paper-muted/70">
                      No disponible
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div
              className="relative overflow-hidden border-b border-paper-line"
              style={{ height: trackHeight }}
            >
              {marks.map((hour) => {
                const percent =
                  ((hour - range.startHour) / (range.endHour - range.startHour)) * 100
                return (
                  <span
                    key={hour}
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 border-t border-paper-line/60"
                    style={{ top: `${percent}%` }}
                  />
                )
              })}

              <div className="absolute inset-0 grid auto-rows-fr" style={DAY_GRID}>
                {days.map(({ day, layout }) => {
                  const laneWidth = 100 / layout.lanes

                  return (
                    <div
                      key={day.key}
                      className="relative min-w-0 border-r border-paper-line/60 last:border-r-0"
                    >
                      {layout.items.map(({ activity, lane }) => {
                        const position = activityPosition(activity, range)
                        const color = activityColor(activity.color)
                        const duration = timeToMinutes(activity.end) - timeToMinutes(activity.start)
                        const showTime = duration >= 45
                        const style = {
                          top: `calc(${position.offset}% + 2px)`,
                          height: `calc(${position.length}% - 4px)`,
                          left: `calc(${lane * laneWidth}% + 2px)`,
                          width: `calc(${laneWidth}% - 4px)`,
                          minHeight: MIN_ACTIVITY_HEIGHT,
                          backgroundColor: color.soft,
                          borderColor: color.border,
                          color: color.ink,
                        }

                        const content = (
                          <>
                            <span
                              aria-hidden
                              className="absolute inset-x-0 top-0 h-1"
                              style={{ backgroundColor: color.border }}
                            />
                            <span className="line-clamp-2 break-words text-[10px] font-semibold leading-tight sm:text-[11px]">
                              {activity.name}
                            </span>
                            {showTime ? (
                              <span className="truncate font-mono text-[9px] leading-tight opacity-75">
                                {formatTimeRange(activity.start, activity.end)}
                              </span>
                            ) : null}
                          </>
                        )

                        if (!onEdit) {
                          return (
                            <div
                              key={activity.id}
                              title={activity.description || activity.name}
                              className="absolute z-10 flex flex-col justify-between gap-0.5 overflow-hidden rounded-[5px] border px-1.5 py-1 shadow-sm"
                              style={style}
                            >
                              {content}
                            </div>
                          )
                        }

                        return (
                          <button
                            key={activity.id}
                            type="button"
                            onClick={() => onEdit(activity)}
                            aria-label={`Editar ${activity.name}`}
                            title={activity.description || activity.name}
                            className="absolute z-10 flex flex-col justify-between gap-0.5 overflow-hidden rounded-[5px] border px-1.5 py-1 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            style={style}
                          >
                            {content}
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-paper-line px-4 py-3 sm:px-5">
        <p className="text-[11px] text-paper-muted">
          {onEdit ? 'Toca una actividad para editarla.' : 'Vista de solo lectura.'}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted/70">
          Horario semanal
        </p>
      </div>
    </div>
  )
}
