import { useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import type { EventClickArg, EventContentArg, EventInput } from '@fullcalendar/core'
import type { DateClickArg } from '@fullcalendar/interaction'

import { parseDateKey } from '../lib/calendar'
import type { CalendarEvent } from '../types'

interface EventsCalendarProps {
  events: CalendarEvent[]
  /** Se llama al pulsar una casilla del mes: abre el formulario de creación. */
  onCreateDay: (date: Date) => void
  /** Se llama al pulsar un evento: abre su detalle. */
  onOpenEvent: (event: CalendarEvent) => void
}

/** Lee el tono guardado en `extendedProps` sin salir del tipado de la librería. */
function toneOf(arg: EventContentArg): number {
  const tone = arg.event.extendedProps['tone']
  return typeof tone === 'number' ? tone : 0
}

function renderEventContent(arg: EventContentArg) {
  return (
    <span
      className="event-tone event-chip"
      data-tone={toneOf(arg)}
      title={arg.event.title}
    >
      {arg.event.title}
    </span>
  )
}

/** Calendario FullCalendar (mes + agenda) con la estética de Nottia. */
export function EventsCalendar({ events, onCreateDay, onOpenEvent }: EventsCalendarProps) {
  const calendarEvents = useMemo<EventInput[]>(
    () =>
      events
        .filter((event) => Boolean(event.date))
        .map((event) => ({
          id: event.id,
          title: event.title,
          start: event.date,
          allDay: true,
          extendedProps: { tone: event.tone },
        })),
    [events],
  )

  const handleDateClick = (info: DateClickArg) => {
    onCreateDay(parseDateKey(info.dateStr))
  }

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault()
    const event = events.find((item) => item.id === info.event.id)
    if (event) onOpenEvent(event)
  }

  return (
    <div className="notebook-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()}
        locale={esLocale}
        firstDay={1}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        buttonText={{ today: 'Hoy' }}
        height="auto"
        fixedWeekCount
        showNonCurrentDates
        dayMaxEvents={2}
        navLinks={false}
        eventDisplay="block"
        displayEventTime={false}
        events={calendarEvents}
        eventContent={renderEventContent}
        eventClassNames={() => ['fc-event-paper']}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        moreLinkContent={(arg) => `+${arg.num} más`}
        longPressDelay={250}
      />
    </div>
  )
}
