import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  ChevronRightIcon,
  ExpandIcon,
  LinkIcon,
  LoaderIcon,
  MinimizeIcon,
  MoreIcon,
  NoteIcon,
  PaperclipIcon,
  SlidersIcon,
  SparkleIcon,
} from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'

import { NoteListItem } from '../components/NoteListItem'
import { useFullscreen } from '../hooks/useFullscreen'
import { formatRelativeDate } from '../lib/format'
import { aiPrompts } from '../lib/prompts'
import { useNotesStore } from '../store/notesStore'
import type { Note } from '../types'

const ICON_BUTTON_CLASS =
  'grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const CHIP_CLASS =
  'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink transition-colors duration-200 hover:border-accent/50 hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const soon = () => toast.info('Esta acción estará disponible pronto.')

/** Editor de una nota: lista lateral + lienzo de escritura. */
export function NoteEditorPage() {
  const { noteId } = useParams<{ noteId: string }>()
  const note = useNotesStore((state) => state.notes.find((item) => item.id === noteId))

  if (!note) return <NoteNotFound />

  // `key` reinicia el estado local (título/cuerpo) al cambiar de nota.
  return <NoteEditor key={note.id} note={note} />
}

function NoteEditor({ note }: { note: Note }) {
  const notes = useNotesStore((state) => state.notes)
  const updateNote = useNotesStore((state) => state.updateNote)

  const rootRef = useRef<HTMLDivElement>(null)
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(rootRef)

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [status, setStatus] = useState<'saved' | 'saving'>('saved')

  const timer = useRef<number | null>(null)
  const pending = useRef<{ title?: string; content?: string }>({})

  /** Guarda con un pequeño retardo para no escribir en el store en cada tecla. */
  const schedule = (patch: { title?: string; content?: string }) => {
    pending.current = { ...pending.current, ...patch }
    setStatus('saving')

    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      updateNote(note.id, pending.current)
      pending.current = {}
      setStatus('saved')
    }, 600)
  }

  // Al salir, vuelca lo que quedó pendiente.
  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
      if (Object.keys(pending.current).length > 0) updateNote(note.id, pending.current)
    }
  }, [note.id, updateNote])

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    schedule({ title: event.target.value })
  }

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    schedule({ content: event.target.value })
  }

  const empty = content.trim().length === 0

  return (
    <div ref={rootRef} className="flex h-dvh overflow-hidden bg-canvas text-ink">
      <aside className="hidden w-80 shrink-0 flex-col border-r border-line lg:flex">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4">
          <h1 className="text-sm font-semibold">Notas</h1>
          <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-muted">
            {notes.length}
          </span>
          <div className="ml-auto flex items-center">
            <button
              type="button"
              onClick={soon}
              title="Filtrar notas"
              aria-label="Filtrar notas"
              className={ICON_BUTTON_CLASS}
            >
              <SlidersIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
          {notes.map((item) => (
            <NoteListItem key={item.id} note={item} active={item.id === note.id} />
          ))}
        </nav>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col bg-surface">
        <header className="flex h-14 shrink-0 items-center gap-1 border-b border-line px-2 sm:px-3">
          <Link
            to={ROUTES.dashboard}
            aria-label="Volver al inicio"
            title="Volver al inicio"
            className={ICON_BUTTON_CLASS}
          >
            <ArrowLeftIcon className="h-[18px] w-[18px]" />
          </Link>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            aria-pressed={isFullscreen}
            className={ICON_BUTTON_CLASS}
          >
            {isFullscreen ? (
              <MinimizeIcon className="h-[18px] w-[18px]" />
            ) : (
              <ExpandIcon className="h-[18px] w-[18px]" />
            )}
          </button>

          <span aria-hidden className="mx-1 h-5 w-px bg-line" />

          <div className="flex min-w-0 items-center gap-1.5 text-[13px]">
            <span className="truncate text-muted">{note.notebook}</span>
            <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-muted/60" />
            <span className="truncate font-medium text-ink">{title.trim() || 'Sin título'}</span>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={soon}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <LinkIcon className="h-3.5 w-3.5" />
              Compartir
            </button>
            <button
              type="button"
              onClick={soon}
              title="Más acciones"
              aria-label="Más acciones"
              className={ICON_BUTTON_CLASS}
            >
              <MoreIcon className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:px-10">
            <p className="text-xs text-muted">Editado {formatRelativeDate(note.updatedAt)}</p>

            <input
              value={title}
              onChange={handleTitle}
              placeholder="Título"
              aria-label="Título de la nota"
              className="mt-8 w-full bg-transparent text-3xl font-bold tracking-tight text-ink placeholder:text-muted/45 focus:outline-none sm:text-4xl"
            />

            <textarea
              value={content}
              onChange={handleContent}
              placeholder="Empieza a escribir, arrastra archivos o usa una plantilla…"
              aria-label="Contenido de la nota"
              rows={4}
              className="mt-3 min-h-36 w-full resize-none bg-transparent text-[15px] leading-relaxed text-ink placeholder:text-muted/50 focus:outline-none field-sizing-content"
            />

            {empty && (
              <div className="mt-8 space-y-7">
                <section>
                  <h2 className="text-xs font-medium text-muted">Empieza con un prompt de IA</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiPrompts.map((prompt) => (
                      <button key={prompt.label} type="button" onClick={soon} className={CHIP_CLASS}>
                        <span aria-hidden>{prompt.emoji}</span>
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={soon} className={cn(CHIP_CLASS, 'mt-2')}>
                    <SparkleIcon className="h-3.5 w-3.5" />
                    Más prompts de IA
                  </button>
                </section>

                <section>
                  <h2 className="text-xs font-medium text-muted">Empieza desde una plantilla</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={soon} className={CHIP_CLASS}>
                      <NoteIcon className="h-3.5 w-3.5" />
                      Mis plantillas
                    </button>
                    <button type="button" onClick={soon} className={CHIP_CLASS}>
                      Descubrir más plantillas
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        <footer className="flex shrink-0 items-center gap-1 border-t border-line px-2 py-2 sm:px-3">
          <button
            type="button"
            onClick={soon}
            title="Adjuntar archivo"
            aria-label="Adjuntar archivo"
            className={ICON_BUTTON_CLASS}
          >
            <PaperclipIcon className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={soon}
            title="Añadir recordatorio"
            aria-label="Añadir recordatorio"
            className={ICON_BUTTON_CLASS}
          >
            <BellIcon className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={soon}
            className="rounded-lg px-2.5 py-1.5 text-xs text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink"
          >
            Añadir etiqueta
          </button>

          <span
            aria-live="polite"
            className="ml-auto inline-flex items-center gap-1.5 pr-1 text-xs text-muted"
          >
            {status === 'saving' ? (
              <>
                <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
                Guardando…
              </>
            ) : (
              <>
                <CheckIcon className="h-3.5 w-3.5 text-accent-2" />
                Todos los cambios guardados
              </>
            )}
          </span>
        </footer>
      </section>
    </div>
  )
}

function NoteNotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas px-6 text-center text-ink">
      <div>
        <p className="text-xs font-medium text-muted">Notas</p>
        <h1 className="mt-2 text-xl font-semibold">Esta nota no existe</h1>
        <p className="mx-auto mt-2 max-w-xs text-pretty text-sm text-muted">
          Puede que la hayas eliminado o que el enlace esté roto.
        </p>
        <Link
          to={ROUTES.dashboard}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
