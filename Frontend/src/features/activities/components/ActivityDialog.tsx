import { useEffect } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { CheckIcon, LoaderIcon, PlusIcon, XIcon } from '@/components/ui/icons'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { useCreateActivities, useUpdateActivity } from '../hooks/useActivities'
import { useActivityDrafts } from '../hooks/useActivityDrafts'
import type { Activity } from '../types'
import { ActivityDraftCard } from './ActivityDraftCard'

interface ActivityDialogProps {
  activity?: Activity
  onClose: () => void
}

const ICON_BUTTON_CLASS =
  'grid h-8 w-8 place-items-center rounded-md text-paper-muted transition-colors duration-200 hover:bg-desk/50 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

/** Formulario para crear uno o varios bloques, o editar un bloque existente. */
export function ActivityDialog({ activity, onClose }: ActivityDialogProps) {
  const {
    drafts,
    errors,
    payloads,
    updateDraft,
    toggleDay,
    addDraft,
    duplicateDraft,
    removeDraft,
    validate,
    editing,
  } = useActivityDrafts(activity)
  const createMutation = useCreateActivities()
  const updateMutation = useUpdateActivity()
  const saving = createMutation.isPending || updateMutation.isPending

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
    if (!validate()) return

    const [first] = payloads
    if (!first) return

    if (activity) {
      updateMutation.mutate(
        { id: activity.id, payload: first },
        {
          onSuccess: () => {
            toast.success('Actividad actualizada.')
            onClose()
          },
          onError: (error) => toast.error(getErrorMessage(error)),
        },
      )
      return
    }

    createMutation.mutate(payloads, {
      onSuccess: (created) => {
        toast.success(
          created.length === 1
            ? 'Actividad creada.'
            : `${created.length} bloques de actividades creados.`,
        )
        onClose()
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    })
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
        aria-labelledby="activity-dialog-title"
        className="note-paper flex max-h-[92dvh] w-full animate-rise flex-col overflow-hidden rounded-t-[6px] border border-paper-line shadow-2xl sm:max-w-2xl sm:rounded-[6px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-paper-line px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              {editing ? 'Editar bloque' : 'Planificación'}
            </p>
            <h2
              id="activity-dialog-title"
              className="mt-1 font-serif text-2xl font-semibold tracking-[-0.02em] text-paper-ink"
            >
              {editing ? 'Edita la actividad' : 'Nueva actividad'}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-paper-muted">
              {editing
                ? 'Ajusta el día, el horario o los detalles de este bloque.'
                : 'Un día seleccionado se convierte en un bloque. Duplica una actividad si necesita otro horario.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Cerrar"
            className={`${ICON_BUTTON_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4 sm:px-6">
            {drafts.map((draft, index) => (
              <ActivityDraftCard
                key={draft.id}
                draft={draft}
                index={index}
                editing={editing}
                canRemove={drafts.length > 1}
                errors={errors[draft.id] ?? {}}
                onChange={updateDraft}
                onToggleDay={toggleDay}
                onDuplicate={duplicateDraft}
                onRemove={removeDraft}
              />
            ))}

            {!editing ? (
              <button
                type="button"
                onClick={addDraft}
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-paper-line px-3.5 py-2 text-xs font-semibold text-paper-muted transition-colors duration-200 hover:border-paper-accent hover:text-paper-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <PlusIcon className="h-4 w-4" />
                Añadir otra actividad
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper-line px-5 py-4 sm:px-6">
            <p className="text-xs text-paper-muted">
              {editing
                ? 'Se guardará este bloque.'
                : `${drafts.length} ${drafts.length === 1 ? 'actividad' : 'actividades'} · ${payloads.length} ${payloads.length === 1 ? 'bloque' : 'bloques'}`}
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
                    {editing ? 'Guardar cambios' : 'Crear actividades'}
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
