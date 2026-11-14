import type { ApiDay, DisplayDay } from '../types'

export interface WeekDay {
  key: DisplayDay
  label: string
  short: string
  /** `null` = el enum del backend todavía no tiene ese día. */
  apiDay: ApiDay | null
}

/**
 * Orden visual de la semana. `MIRCOLES` conserva la grafía del backend y se
 * muestra como «Miércoles». El backend actual no incluye `JUEVES`, así que la
 * columna se dibuja vacía y el formulario no permite asignarle actividades.
 */
export const WEEK_DAYS: WeekDay[] = [
  { key: 'LUNES', label: 'Lunes', short: 'Lun', apiDay: 'LUNES' },
  { key: 'MARTES', label: 'Martes', short: 'Mar', apiDay: 'MARTES' },
  { key: 'MIRCOLES', label: 'Miércoles', short: 'Mié', apiDay: 'MIRCOLES' },
  { key: 'JUEVES', label: 'Jueves', short: 'Jue', apiDay: null },
  { key: 'VIERNES', label: 'Viernes', short: 'Vie', apiDay: 'VIERNES' },
  { key: 'SABADO', label: 'Sábado', short: 'Sáb', apiDay: 'SABADO' },
  { key: 'DOMINGO', label: 'Domingo', short: 'Dom', apiDay: 'DOMINGO' },
]

/** Días que acepta el backend y que puede usar el formulario. */
export const API_DAYS: ApiDay[] = WEEK_DAYS.flatMap((day) => (day.apiDay ? [day.apiDay] : []))

const BY_KEY = new Map<DisplayDay, WeekDay>(
  WEEK_DAYS.map((day) => [day.key, day] as const),
)

export function weekDay(day: DisplayDay): WeekDay {
  return BY_KEY.get(day) ?? WEEK_DAYS[0]
}

export function dayLabel(day: string): string {
  return BY_KEY.get(day as DisplayDay)?.label ?? day
}

export function dayShort(day: string): string {
  return BY_KEY.get(day as DisplayDay)?.short ?? day.slice(0, 3)
}

export function isApiDay(value: string): value is ApiDay {
  return API_DAYS.includes(value as ApiDay)
}
