// API pública de la feature `activities` (planificación semanal).
export { ActivityDialog } from './components/ActivityDialog'
export { ScheduleBoard } from './components/ScheduleBoard'
export { activitiesKeys, useActivities, useCreateActivities, useUpdateActivity } from './hooks/useActivities'
export { ActivitySharePage } from './pages/ActivitySharePage'
export { ActivitiesPage } from './pages/ActivitiesPage'
export { API_DAYS, WEEK_DAYS, dayLabel, isApiDay, weekDay } from './lib/days'
export { ACTIVITY_COLORS, activityColor } from './lib/colors'
export type {
  Activity,
  ActivityPage,
  ActivitySchedulePayload,
  ActivityScheduleResponse,
  ApiDay,
  DisplayDay,
  PageResponse,
} from './types'
