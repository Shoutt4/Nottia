/**
 * Tipos de `/api/planificacion`, copiados de los DTO del backend.
 * El backend escribe `MIRCOLES` (sin la i) en su enum; se conserva igual
 * porque es el valor que viaja en el JSON.
 */

export type ApiDay =
  | 'LUNES'
  | 'MARTES'
  | 'MIRCOLES'
  | 'VIERNES'
  | 'SABADO'
  | 'DOMINGO'

/** Días que se muestran en la tabla, incluido el que el backend aún no admite. */
export type DisplayDay = ApiDay | 'JUEVES'

/** `ActividadRequestDTIO`: cuerpo anidado en cada planificación. */
export interface ActivityDetailsPayload {
  nombreActividad: string
  descripcionActividad: string
  color: string
}

/** `PlanificacionSemanaRequestDTO`. */
export interface ActivitySchedulePayload {
  actividad: ActivityDetailsPayload
  diaSemana: ApiDay
  /** `HH:mm:ss`; el backend lo convierte a `LocalTime`. */
  horaInicio: string
  /** `HH:mm:ss`. */
  horaFin: string
}

/** `ActividadResponseDTO`. */
export interface ActivityDetailsResponse {
  idActividad: string
  nombreActividad: string | null
  descripcionActividad: string | null
  color: string | null
  createdAt: string | null
  updatedAt: string | null
}

/** `PlanificacionSemanaResponseDTO`. */
export interface ActivityScheduleResponse {
  idPlanificacionSemana: string
  actividad: ActivityDetailsResponse
  diaSemana: ApiDay
  usuario: string | null
  horaInicio: string
  horaFin: string
  createAt: string | null
  updateAt: string | null
}

/** Modelo que consumen los componentes. */
export interface Activity {
  id: string
  name: string
  description: string
  color: string
  day: ApiDay
  start: string
  end: string
}

/** Página de Spring (`Page<PlanificacionSemanaResponseDTO>`). */
export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface ActivityPage {
  activities: Activity[]
  page: number
  size: number
  total: number
  totalPages: number
}
