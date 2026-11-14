import { http } from '@/config'

import { DEFAULT_ACTIVITY_COLOR } from '../lib/colors'
import { API_DAYS } from '../lib/days'
import { timeToMinutes } from '../lib/time'
import type {
  Activity,
  ActivityPage,
  ActivitySchedulePayload,
  ActivityScheduleResponse,
  PageResponse,
} from '../types'

const PAGE_SIZE = 200
const DAY_ORDER = new Map(API_DAYS.map((day, index) => [day, index] as const))

function toActivity(dto: ActivityScheduleResponse): Activity {
  return {
    id: dto.idPlanificacionSemana,
    name: dto.actividad.nombreActividad?.trim() || 'Actividad sin nombre',
    description: dto.actividad.descripcionActividad?.trim() ?? '',
    color: dto.actividad.color ?? DEFAULT_ACTIVITY_COLOR,
    day: dto.diaSemana,
    start: dto.horaInicio,
    end: dto.horaFin,
  }
}

function sortActivities(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    const dayDiff = (DAY_ORDER.get(a.day) ?? 99) - (DAY_ORDER.get(b.day) ?? 99)
    if (dayDiff !== 0) return dayDiff
    return timeToMinutes(a.start) - timeToMinutes(b.start)
  })
}

async function fetchActivitiesPage(page: number): Promise<PageResponse<ActivityScheduleResponse>> {
  const { data } = await http.get<PageResponse<ActivityScheduleResponse>>('/api/planificacion/all', {
    params: { page, size: PAGE_SIZE, sort: 'diaSemana,asc' },
  })

  return data
}

/** `GET /api/planificacion/all`: recorre las páginas para no dejar actividades fuera. */
export async function fetchActivities(): Promise<ActivityPage> {
  const first = await fetchActivitiesPage(0)
  const rows = [...first.content]

  for (let page = 1; page < first.totalPages; page += 1) {
    const next = await fetchActivitiesPage(page)
    rows.push(...next.content)
  }

  const activities = sortActivities(rows.map(toActivity))

  return {
    activities,
    page: first.number,
    size: first.size,
    total: first.totalElements,
    totalPages: first.totalPages,
  }
}

/** `POST /api/planificacion/save`. */
export async function createActivityRequest(
  payload: ActivitySchedulePayload,
): Promise<Activity> {
  const { data } = await http.post<ActivityScheduleResponse>('/api/planificacion/save', payload)
  return toActivity(data)
}

/** `POST /api/planificacion/save/all`: crea varios bloques en una sola llamada. */
export async function createActivitiesRequest(
  payloads: ActivitySchedulePayload[],
): Promise<Activity[]> {
  const { data } = await http.post<ActivityScheduleResponse[]>(
    '/api/planificacion/save/all',
    payloads,
  )

  return sortActivities(data.map(toActivity))
}

/** `PUT /api/planificacion/update/{id}`. */
export async function updateActivityRequest(
  id: string,
  payload: ActivitySchedulePayload,
): Promise<Activity> {
  const { data } = await http.put<ActivityScheduleResponse>(
    `/api/planificacion/update/${encodeURIComponent(id)}`,
    payload,
  )

  return toActivity(data)
}
