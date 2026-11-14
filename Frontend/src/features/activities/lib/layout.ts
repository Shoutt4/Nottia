import type { Activity } from '../types'
import { timeToMinutes } from './time'

/** Altura de una hora en la tabla y en la imagen exportada. */
export const HOUR_HEIGHT = 64
/** Altura mínima de un bloque para que el texto siga siendo legible. */
export const MIN_ACTIVITY_HEIGHT = 26

export interface ScheduleRange {
  startHour: number
  endHour: number
  startMinute: number
  endMinute: number
  totalMinutes: number
}

export interface PositionedActivity {
  activity: Activity
  lane: number
}

export interface DayLayout {
  items: PositionedActivity[]
  lanes: number
}

/**
 * Horas visibles: desde la hora de la primera actividad hasta la hora en que
 * termina la última. Si no hay actividades se usa una semana de 8:00 a 18:00.
 */
export function getScheduleRange(activities: Activity[]): ScheduleRange {
  let startHour = 8
  let endHour = 18

  if (activities.length > 0) {
    const starts = activities.map((activity) => timeToMinutes(activity.start))
    const ends = activities.map((activity) => timeToMinutes(activity.end))
    startHour = Math.floor(Math.min(...starts) / 60)
    endHour = Math.ceil(Math.max(...ends) / 60)
  }

  startHour = Math.max(0, Math.min(23, startHour))
  endHour = Math.max(startHour + 1, Math.min(24, endHour))

  return {
    startHour,
    endHour,
    startMinute: startHour * 60,
    endMinute: endHour * 60,
    totalMinutes: (endHour - startHour) * 60,
  }
}

export function hourMarks(range: ScheduleRange): number[] {
  return Array.from(
    { length: range.endHour - range.startHour + 1 },
    (_, index) => range.startHour + index,
  )
}

/** Posición vertical (en %) de una actividad dentro del eje de horas. */
export function activityPosition(activity: Activity, range: ScheduleRange) {
  const start = timeToMinutes(activity.start)
  const end = Math.max(start + 15, timeToMinutes(activity.end))
  const offset = ((start - range.startMinute) / range.totalMinutes) * 100
  const length = ((end - start) / range.totalMinutes) * 100

  return {
    offset: Math.max(0, Math.min(100, offset)),
    length: Math.max(0.8, Math.min(100 - Math.max(0, offset), length)),
  }
}

/** Asigna carriles a actividades que se solapan en el mismo día. */
export function positionActivities(activities: Activity[]): DayLayout {
  const sorted = [...activities].sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start),
  )
  const laneEnds: number[] = []

  const items = sorted.map((activity) => {
    const start = timeToMinutes(activity.start)
    const end = Math.max(start + 15, timeToMinutes(activity.end))
    let lane = laneEnds.findIndex((laneEnd) => start >= laneEnd)

    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(end)
    } else {
      laneEnds[lane] = end
    }

    return { activity, lane }
  })

  return { items, lanes: Math.max(1, laneEnds.length) }
}

