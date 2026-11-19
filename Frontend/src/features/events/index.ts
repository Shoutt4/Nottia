// API pública de la feature `events` (calendario de eventos).
export { EventDetailsDialog } from './components/EventDetailsDialog'
export { EventDialog } from './components/EventDialog'
export { EventsCalendar } from './components/EventsCalendar'
export { eventsKeys, useCreateEvent, useEvents } from './hooks/useEvents'
export { googleCalendarUrl } from './lib/googleCalendar'
export { EventsPage } from './pages/EventsPage'
export type {
  CalendarEvent,
  EventoRequestDTO,
  EventoResponseDTO,
} from './types'
