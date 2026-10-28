import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'

import { XIcon } from '@/components/ui/icons'
import { getCurrentUser } from '@/config'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'

import { useCreateNotebook, useUpdateNotebook } from '../hooks/useNotebooks'
import { DEFAULT_NOTEBOOK_COLOR, NOTEBOOK_COLORS } from '../lib/colors'
import type { Notebook } from '../types'

const INPUT_CLASS =
  'mt-2 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25'

interface NotebookDialogProps {
  /** Si viene, edita ese cuaderno; si no, crea uno nuevo. */
  notebook?: Notebook
  onClose: () => void
}

/** Alta y edición de cuadernos (`POST /api/cuaderno/create` y `PUT /update/{id}`). */
export function NotebookDialog({ notebook, onClose }: NotebookDialogProps) {
  const createNotebook = useCreateNotebook()
  const updateNotebook = useUpdateNotebook(notebook?.id ?? '')
  const editing = Boolean(notebook)
  const saving = createNotebook.isPending || updateNotebook.isPending

  const [nombre, setNombre] = useState(notebook?.nombre ?? '')
  const [color, setColor] = useState(notebook?.color ?? DEFAULT_NOTEBOOK_COLOR)
  const [orden, setOrden] = useState(String(notebook?.orden ?? 1))

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const idUsuario = notebook?.idUsuario ?? getCurrentUser().id
    if (!idUsuario) {
      toast.error('No pudimos identificar tu cuenta. Vuelve a iniciar sesión.')
      return
    }

    const name = nombre.trim()
    if (!name) {
      toast.error('Ponle un nombre al cuaderno.')
      return
    }

    const order = Number.parseInt(orden, 10)
    const payload = {
      idUsuario,
      nombre: name,
      color,
      orden: Number.isFinite(order) ? Math.max(0, order) : 0,
    }

    const onSuccess = () => {
      toast.success(editing ? 'Cuaderno actualizado.' : 'Cuaderno creado.')
      onClose()
    }
    const onError = (error: Error) => toast.error(getErrorMessage(error))

    if (notebook) updateNotebook.mutate(payload, { onSuccess, onError })
    else createNotebook.mutate(payload, { onSuccess, onError })
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b0a12]/55 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="notebook-dialog-title"
        onSubmit={handleSubmit}
        className="max-h-[92dvh] w-full animate-rise overflow-y-auto rounded-t-3xl border border-line bg-surface p-5 shadow-2xl sm:max-w-md sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="notebook-dialog-title" className="text-base font-semibold text-ink">
              {editing ? 'Editar cuaderno' : 'Nuevo cuaderno'}
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              {editing
                ? 'Cambia el nombre, el color o el orden.'
                : 'Agrupa tus notas por tema o proyecto.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <label className="mt-5 block">
          <span className="text-xs font-semibold text-ink">Nombre</span>
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Universidad, Trabajo…"
            maxLength={60}
            autoFocus
            className={INPUT_CLASS}
          />
        </label>

        <fieldset className="mt-5">
          <legend className="text-xs font-semibold text-ink">Color</legend>

          <div className="mt-2 grid grid-cols-4 gap-2">
            {NOTEBOOK_COLORS.map((option) => {
              const selected = color === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setColor(option.id)}
                  aria-pressed={selected}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border px-2 py-2 text-[11px] font-medium transition-colors duration-200',
                    selected
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line text-muted hover:border-accent/40',
                  )}
                >
                  <span
                    aria-hidden
                    className="h-3.5 w-3.5 shrink-0 rounded-full"
                    style={{ backgroundColor: option.value }}
                  />
                  <span className="truncate">{option.label}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className="mt-5 block max-w-[8rem]">
          <span className="text-xs font-semibold text-ink">Orden</span>
          <input
            type="number"
            min={0}
            value={orden}
            onChange={(event) => setOrden(event.target.value)}
            className={INPUT_CLASS}
          />
        </label>

        <div className="mt-6 flex justify-end gap-2 border-t border-line pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Guardando…' : editing ? 'Guardar' : 'Crear cuaderno'}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  )
}
