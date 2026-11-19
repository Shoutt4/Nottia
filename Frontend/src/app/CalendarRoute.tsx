import { lazy, Suspense } from 'react'

import { RouteFallback } from './RouteFallback'

// FullCalendar solo se descarga al entrar al calendario.
const EventsPage = lazy(() =>
  import('@/features/events/pages/EventsPage').then((module) => ({
    default: module.EventsPage,
  })),
)

/** Carga diferida de la página de calendario con su propio placeholder. */
export function CalendarRoute() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <EventsPage />
    </Suspense>
  )
}
