import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { CheckIcon, ImageIcon, XIcon } from '@/components/ui/icons'
import { getCurrentUser } from '@/config'
import { useUpdateBoard } from '@/features/board'
import type { BoardResponse } from '@/features/board'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { useCoverStore } from '@/stores/coverStore'

import { COVER_HEIGHTS, COVER_PRESETS } from '../lib/cover'
import { fileToCover } from '../lib/image'
import { CoverSurface } from './CoverSurface'

const ICON_BUTTON_CLASS =
  'grid h-8 w-8 place-items-center rounded-md text-paper-muted transition-colors duration-200 hover:bg-desk/50 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const SOFT_BUTTON_CLASS =
  'inline-flex items-center gap-1.5 rounded-full border border-paper-line px-3.5 py-1.5 text-xs font-medium text-paper-ink transition-colors duration-200 hover:border-paper-accent/50 hover:bg-paper-accent/10 hover:text-paper-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60'

/** Panel "Editar tablero": título, portada (imagen o preset) y alto de la cabecera. */
export function BoardSettingsDialog({
  board,
  onClose,
}: {
  board?: BoardResponse
  onClose: () => void
}) {
  const cover = useCoverStore((state) => state.cover)
  const setCover = useCoverStore((state) => state.setCover)
  const height = useCoverStore((state) => state.height)
  const setHeight = useCoverStore((state) => state.setHeight)
  const updateBoard = useUpdateBoard()

  const inputRef = useRef<HTMLInputElement>(null)
  const [titulo, setTitulo] = useState(board?.titulo ?? '')
  const [busy, setBusy] = useState(false)

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

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Elige un archivo de imagen.')
      return
    }

    setBusy(true)
    try {
      setCover(await fileToCover(file))
      toast.success('Portada actualizada.')
    } catch {
      toast.error('No pudimos procesar esa imagen.')
    } finally {
      setBusy(false)
    }
  }

  const handleBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  const reset = () => {
    setCover(null)
    setHeight('normal')
    setTitulo('')
    toast.info('Tablero restablecido.')
  }

  /** Guarda título y portada en `PUT /api/tablero/update`. */
  const handleDone = () => {
    const idUsuario = board?.idUsuario ?? getCurrentUser().id

    if (!idUsuario) {
      toast.error('No pudimos identificar tu cuenta. Vuelve a iniciar sesión.')
      return
    }

    updateBoard.mutate(
      {
        idUsuario,
        titulo: titulo.trim() || 'Home',
        tipoPortada: cover ? (cover.startsWith('linear-gradient') ? 'gradiente' : 'imagen') : null,
        portadaValor: cover,
      },
      {
        onSuccess: () => {
          toast.success('Tablero guardado.')
          onClose()
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    )
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b0a12]/55 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="board-settings-title"
        className="note-paper max-h-[92dvh] w-full animate-rise overflow-y-auto rounded-t-[6px] border border-paper-line p-5 shadow-2xl sm:max-w-lg sm:rounded-[6px] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="board-settings-title" className="font-serif text-xl font-semibold text-paper-ink">
              Editar tablero
            </h2>
            <p className="mt-1 text-xs text-paper-muted">Ajusta la portada y el aspecto del inicio.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className={ICON_BUTTON_CLASS}>
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <CoverSurface cover={cover} className="mt-5 aspect-[16/6] rounded-[4px] border border-paper-line" />

        <section className="mt-5">
          <label className="block">
            <span className="text-xs font-semibold text-paper-ink">Título del tablero</span>
            <input
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              placeholder="Mi tablero"
              maxLength={80}
              className="mt-2 w-full rounded-md border border-paper-line bg-desk/40 px-3.5 py-2.5 text-sm text-paper-ink outline-none transition-colors duration-200 placeholder:text-paper-muted/60 focus:border-paper-accent focus:ring-2 focus:ring-paper-accent/20"
            />
          </label>
        </section>

        <section className="mt-5">
          <h3 className="text-xs font-semibold text-paper-ink">Portada</h3>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className={SOFT_BUTTON_CLASS}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              {busy ? 'Procesando…' : 'Subir imagen'}
            </button>

            {cover && (
              <button type="button" onClick={() => setCover(null)} className={SOFT_BUTTON_CLASS}>
                <XIcon className="h-3.5 w-3.5" />
                Quitar
              </button>
            )}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {COVER_PRESETS.map((preset) => {
              const selected = cover === preset.value

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setCover(preset.value)}
                  aria-pressed={selected}
                  className={cn(
                    'group relative overflow-hidden rounded-[4px] border text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    selected
                      ? 'border-paper-accent ring-2 ring-paper-accent/20'
                      : 'border-paper-line hover:border-paper-accent/40',
                  )}
                >
                  <span
                    className={cn('block h-14 w-full', preset.value === null && 'aurora')}
                    style={preset.value ? { backgroundImage: preset.value } : undefined}
                  />

                  <span
                    className={cn(
                      'block px-2 py-1.5 text-[11px] font-medium',
                      selected ? 'text-paper-accent' : 'text-paper-muted',
                    )}
                  >
                    {preset.label}
                  </span>

                  {selected && (
                    <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-paper text-paper-accent shadow-sm">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <p className="mt-2 text-[11px] text-paper-muted">JPG o PNG · la imagen se optimiza al subirla.</p>
        </section>

        <section className="mt-5">
          <h3 className="text-xs font-semibold text-paper-ink">Alto de la portada</h3>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {COVER_HEIGHTS.map((option) => {
              const selected = height === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setHeight(option.id)}
                  aria-pressed={selected}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-md border px-2 py-2 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    selected
                      ? 'border-paper-accent bg-paper-accent/10 text-paper-accent'
                      : 'border-paper-line text-paper-muted hover:border-paper-accent/40 hover:text-paper-ink',
                  )}
                >
                  <span className={cn('w-full rounded bg-paper-accent/30', option.bar)} />
                  {option.label}
                </button>
              )
            })}
          </div>
        </section>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-paper-line pt-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-2 py-1.5 text-xs font-medium text-paper-muted transition-colors duration-200 hover:bg-desk/50 hover:text-danger"
          >
            Restablecer
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={updateBoard.isPending}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateBoard.isPending ? 'Guardando…' : 'Listo'}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </div>,
    document.body,
  )
}
