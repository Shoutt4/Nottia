import { useEffect, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { CheckIcon, LoaderIcon, XIcon } from '@/components/ui/icons'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { useCreateEvent } from '../hooks/useEvents'
import { longDateLabel, parseDateKey, toDateKey } from '../lib/calendar'
import { eventTone } from '../lib/tone'
import type { CalendarEvent } from '../types'

interface EventDialogProps {
  initialDate: Date
  onClose: () => void
  onCreated: (event: CalendarEvent) => void
}

const FIELD_CLASS =
  'mt-1.5 w-full rounded-md border border-paper-line bg-paper px-3 py-2.5 text-sm text-paper-ink outline-none transition duration-200 placeholder:text-paper-muted/70 focus:border-paper-accent focus:ring-2 focus:ring-paper-accent/20'

const LABEL_CLASS = 'font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted'

/** Formulario para crear un evento en una fecha concreta. */
export function EventDialog({ initialDate, onClose, onCreated }: EventDialogProps) {
  const createMutation = useCreateEvent()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => toDateKey(initialDate))
  const [error, setError] = useState('')
  const saving = createMutation.isPending
  const previewTone = eventTone(title.trim() || 'nottia')

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !saving) onClose()
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, saving])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      setError('Ponle un título al evento.')
      return
    }

    if (!date) {
      setError('Elige una fecha para el evento.')
      return
    }

    setError('')
    createMutation.mutate(
      {
        titulo: title.trim(),
        descripcion: description.trim(),
        fecha: date,
      },
      {
        onSuccess: (created) => {
          toast.success('Evento añadido al calendario.')
          onCreated(created)
          onClose()
        },
        onError: (createError) => toast.error(getErrorMessage(createError)),
      },
    )
  }

  const handleBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !saving) onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b0a12]/55 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-dialog-title"
        className="note-paper flex max-h-[92dvh] w-full animate-rise flex-col overflow-hidden rounded-t-[6px] border border-paper-line shadow-2xl sm:max-w-lg sm:rounded-[6px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-paper-line px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              Calendario
            </p>
            <h2
              id="event-dialog-title"
              className="mt-1 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper-ink"
            >
              Nuevo evento
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-paper-muted">
              {date ? longDateLabel(parseDateKey(date)) : 'Elige la fecha del evento.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Cerrar"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-paper-muted transition-colors duration-200 hover:bg-desk/50 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="scroll-slim min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            <label className="block">
              <span className={LABEL_CLASS}>Título</span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={80}
                autoFocus
                placeholder="Reunión, entrega, cumpleaños…"
                className={FIELD_CLASS}
              />
            </label>

            <label className="block">
              <span className={LABEL_CLASS}>Fecha</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={FIELD_CLASS}
              />
            </label>

            <label className="block">
              <span className={LABEL_CLASS}>Descripción</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Detalles, lugar o notas para ese día."
                className={`${FIELD_CLASS} resize-none leading-relaxed`}
              />
            </label>

            <div className="rounded-md border border-dashed border-paper-line bg-desk/25 px-3 py-2.5">
              <p className={LABEL_CLASS}>Vista previa</p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="event-tone event-dot"
                  data-tone={previewTone}
                  aria-hidden
                />
                <span
                  className="event-tone event-chip max-w-[16rem]"
                  data-tone={previewTone}
                >
                  {title.trim() || 'Título del evento'}
                </span>
              </div>
            </div>

            {error ? <p className="text-xs font-semibold text-danger">{error}</p> : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper-line px-5 py-4 sm:px-6">
            <p className="text-xs text-paper-muted">
              {date ? longDateLabel(parseDateKey(date)) : 'Sin fecha'}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-full px-3.5 py-2 text-xs font-semibold text-paper-muted transition-colors hover:text-paper-ink disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    Guardando…
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    Crear evento
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
