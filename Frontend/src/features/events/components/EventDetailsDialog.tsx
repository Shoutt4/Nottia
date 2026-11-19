import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { ExternalLinkIcon, XIcon } from '@/components/ui/icons'

import { longDateLabel, parseDateKey } from '../lib/calendar'
import { googleCalendarUrl } from '../lib/googleCalendar'
import type { CalendarEvent } from '../types'

interface EventDetailsDialogProps {
  event: CalendarEvent
  onClose: () => void
}

/** Detalle de un evento, al estilo de la vista de mes de Google Calendar. */
export function EventDetailsDialog({ event, onClose }: EventDetailsDialogProps) {
  useEffect(() => {
    const handleKey = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const handleBackdrop = (mouseEvent: MouseEvent<HTMLDivElement>) => {
    if (mouseEvent.target === mouseEvent.currentTarget) onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b0a12]/55 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
        className="note-paper flex max-h-[92dvh] w-full animate-rise flex-col overflow-hidden rounded-t-[6px] border border-paper-line shadow-2xl sm:max-w-md sm:rounded-[6px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-paper-line px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              <span className="event-tone event-dot" data-tone={event.tone} aria-hidden />
              Evento
            </p>
            <h2
              id="event-details-title"
              className="mt-1 break-words font-serif text-2xl font-semibold leading-tight tracking-[-0.02em] text-paper-ink"
            >
              {event.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-paper-muted">
              {longDateLabel(parseDateKey(event.date))}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-paper-muted transition-colors duration-200 hover:bg-desk/50 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="scroll-slim min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {event.description ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-paper-ink">
              {event.description}
            </p>
          ) : (
            <p className="text-sm text-paper-muted">Este evento no tiene descripción.</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-paper-line px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3.5 py-2 text-xs font-semibold text-paper-muted transition-colors hover:text-paper-ink"
          >
            Cerrar
          </button>
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            className={buttonClass('primary', 'px-4 py-2 text-xs')}
          >
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            Añadir a Google Calendar
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
