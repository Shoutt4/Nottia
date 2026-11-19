import { useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'
import { getErrorMessage } from '@/lib/errors'

import { CalendarSkeleton } from '../components/CalendarSkeleton'
import { EventDetailsDialog } from '../components/EventDetailsDialog'
import { EventDialog } from '../components/EventDialog'
import { EventsCalendar } from '../components/EventsCalendar'
import { useEvents } from '../hooks/useEvents'
import { startOfDay, toDateKey } from '../lib/calendar'
import type { CalendarEvent } from '../types'

const EMPTY_EVENTS: CalendarEvent[] = []

/** Calendario de eventos del usuario (`/api/evento`). */
export function EventsPage() {
  const eventsQuery = useEvents()
  const [dialogDate, setDialogDate] = useState<Date | null>(null)
  const [detailsEvent, setDetailsEvent] = useState<CalendarEvent | null>(null)
  const events = eventsQuery.data ?? EMPTY_EVENTS

  const openCreate = (date: Date) => {
    setDetailsEvent(null)
    setDialogDate(startOfDay(date))
  }

  return (
    <div className="w-full px-3 pb-8 sm:px-6 lg:px-8">
      <h1 className="sr-only">Calendario</h1>

      <Reveal>
        <div className="note-paper rounded-[6px] border border-paper-line p-2 shadow-[0_24px_60px_-42px_rgba(35,28,20,0.6)] sm:p-4">
          {eventsQuery.isError ? (
            <div className="rounded-[4px] border border-paper-line bg-paper px-5 py-12 text-center">
              <p className="font-serif text-xl font-semibold text-paper-ink">
                No pudimos cargar el calendario
              </p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-paper-muted">
                {getErrorMessage(eventsQuery.error)}
              </p>
              <button
                type="button"
                onClick={() => void eventsQuery.refetch()}
                disabled={eventsQuery.isFetching}
                className={buttonClass('secondary', 'mt-5')}
              >
                {eventsQuery.isFetching ? 'Reintentando…' : 'Reintentar'}
              </button>
            </div>
          ) : eventsQuery.isPending ? (
            <CalendarSkeleton />
          ) : (
            <EventsCalendar
              events={events}
              onCreateDay={openCreate}
              onOpenEvent={setDetailsEvent}
            />
          )}
        </div>
      </Reveal>

      {dialogDate ? (
        <EventDialog
          key={toDateKey(dialogDate)}
          initialDate={dialogDate}
          onClose={() => setDialogDate(null)}
          onCreated={() => setDialogDate(null)}
        />
      ) : null}

      {detailsEvent ? (
        <EventDetailsDialog event={detailsEvent} onClose={() => setDetailsEvent(null)} />
      ) : null}
    </div>
  )
}
