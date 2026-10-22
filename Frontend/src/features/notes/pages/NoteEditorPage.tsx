import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandIcon,
  ListIcon,
  LoaderIcon,
  MinimizeIcon,
  MoreIcon,
  NoteIcon,
  PaperclipIcon,
  PlusIcon,
  SlidersIcon,
  SparkleIcon,
} from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'

import { NoteListItem } from '../components/NoteListItem'
import { ShareButton } from '../components/ShareButton'
import { useFullscreen } from '../hooks/useFullscreen'
import { useNewNote } from '../hooks/useNewNote'
import { useUpdateNote } from '../hooks/useNoteMutations'
import { useNote, useNotes } from '../hooks/useNotes'
import { formatRelativeDate } from '../lib/format'
import { groupNotesByDay } from '../lib/groupNotes'
import { aiPrompts } from '../lib/prompts'
import type { Note } from '../types'

const ICON_BUTTON_CLASS =
  'grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const TOOLBAR_BUTTON_CLASS =
  'grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50'

const CHIP_CLASS =
  'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink transition-colors duration-200 hover:border-accent/50 hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const soon = () => toast.info('Esta acción estará disponible pronto.')

/** Editor de una nota: menú de la app + lista de notas + lienzo de escritura. */
export function NoteEditorPage() {
  const { noteId } = useParams<{ noteId: string }>()
  const { data: note, isPending } = useNote(noteId)

  if (isPending) {
    return (
      <div className="grid h-full place-items-center bg-canvas text-ink">
        <LoaderIcon className="h-5 w-5 animate-spin text-muted" aria-label="Cargando nota" />
      </div>
    )
  }

  if (!note) return <NoteNotFound />

  // `key` reinicia el estado local (título/cuerpo) al cambiar de nota.
  return <NoteEditor key={note.id} note={note} />
}

function NoteEditor({ note }: { note: Note }) {
  const notesQuery = useNotes()
  const notes = useMemo(() => notesQuery.data?.notes ?? [], [notesQuery.data])
  const groups = useMemo(() => groupNotesByDay(notes), [notes])
  const updateNote = useUpdateNote(note.id)
  const { create: createNote, isPending: creatingNote } = useNewNote(note.idCuaderno)

  // Pantalla completa sobre el lienzo: oculta menú y lista.
  const editorRef = useRef<HTMLElement>(null)
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(editorRef)

  const [listOpen, setListOpen] = useState(true)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [saveState, setSaveState] = useState<'saved' | 'dirty' | 'saving' | 'error'>('saved')

  /** Cuenta los cambios locales para no marcar "guardado" si se escribió durante el envío. */
  const revision = useRef(0)

  const save = () => {
    if (saveState === 'saved' || saveState === 'saving') return

    const snapshot = revision.current
    setSaveState('saving')

    updateNote.mutate(
      {
        idCuaderno: note.idCuaderno,
        titulo: title,
        contenido: content,
        bloqueado: note.locked,
        fijado: note.pinned,
      },
      {
        onSuccess: () => {
          setSaveState(revision.current === snapshot ? 'saved' : 'dirty')
        },
        onError: (error) => {
          setSaveState('error')
          toast.error(getErrorMessage(error))
        },
      },
    )
  }

  // Ctrl+S / ⌘S guarda sin abrir el diálogo del navegador.
  const saveRef = useRef(save)
  useEffect(() => {
    saveRef.current = save
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        saveRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    revision.current += 1
    setSaveState('dirty')
  }

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    revision.current += 1
    setSaveState('dirty')
  }

  const empty = content.trim().length === 0

  return (
    <div className="flex h-full overflow-hidden bg-canvas text-ink">
      {listOpen && (
        <aside className="hidden w-80 shrink-0 flex-col border-r border-line bg-canvas lg:flex">
          <div className="flex h-14 shrink-0 items-center gap-2 border-b border-line px-4">
            <h1 className="min-w-0 truncate text-sm font-semibold">{note.notebook}</h1>
            <span className="shrink-0 text-xs text-muted">
              {notesQuery.data?.total ?? notes.length}
            </span>

            <div className="ml-auto flex shrink-0 items-center">
              <button
                type="button"
                onClick={createNote}
                disabled={creatingNote}
                title="Nueva nota"
                aria-label="Nueva nota"
                className={TOOLBAR_BUTTON_CLASS}
              >
                {creatingNote ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <PlusIcon className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={soon}
                title="Filtrar notas"
                aria-label="Filtrar notas"
                className={TOOLBAR_BUTTON_CLASS}
              >
                <SlidersIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={soon}
                title="Ordenar notas"
                aria-label="Ordenar notas"
                className={TOOLBAR_BUTTON_CLASS}
              >
                <ListIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={soon}
                title="Más acciones"
                aria-label="Más acciones"
                className={TOOLBAR_BUTTON_CLASS}
              >
                <MoreIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-2">
            {groups.map((group) => (
              <div key={group.label} className="pb-1.5">
                <h2 className="px-3 pb-1 pt-2 text-[11px] font-medium text-muted">{group.label}</h2>

                <div className="space-y-0.5">
                  {group.notes.map((item) => (
                    <NoteListItem key={item.id} note={item} active={item.id === note.id} />
                  ))}
                </div>
              </div>
            ))}

            {!notesQuery.isPending && notes.length === 0 && (
              <p className="px-3 py-4 text-xs text-muted">Aún no tienes notas.</p>
            )}
          </nav>
        </aside>
      )}

      <section ref={editorRef} className="flex min-w-0 flex-1 flex-col bg-surface">
        <header className="flex h-14 shrink-0 items-center gap-1 border-b border-line px-2 sm:px-3">
          {!isFullscreen && (
            <button
              type="button"
              onClick={() => setListOpen((open) => !open)}
              aria-label={listOpen ? 'Ocultar lista de notas' : 'Mostrar lista de notas'}
              title={listOpen ? 'Ocultar lista de notas' : 'Mostrar lista de notas'}
              className={cn(ICON_BUTTON_CLASS, 'hidden lg:grid')}
            >
              {listOpen ? (
                <ChevronLeftIcon className="h-[18px] w-[18px]" />
              ) : (
                <ChevronRightIcon className="h-[18px] w-[18px]" />
              )}
            </button>
          )}

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
            <Link
              to={ROUTES.dashboard}
              className="truncate text-muted transition-colors duration-200 hover:text-ink"
            >
              {note.notebook}
            </Link>
            <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-muted/60" />
            <span className="truncate font-medium text-ink">{title.trim() || 'Sin título'}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ShareButton noteId={note.id} title={title} content={content} />
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
            className="hidden rounded-lg px-2.5 py-1.5 text-xs text-muted transition-colors duration-200 hover:bg-canvas hover:text-ink sm:inline-flex"
          >
            Añadir etiqueta
          </button>

          <button
            type="button"
            onClick={save}
            disabled={saveState === 'saved' || saveState === 'saving'}
            title="Guardar cambios (Ctrl+S)"
            aria-keyshortcuts="Control+S Meta+S"
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saveState === 'saving' ? (
              <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckIcon className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">Guardar cambios</span>
            <span className="sm:hidden">Guardar</span>
          </button>

          <span
            aria-live="polite"
            className="inline-flex shrink-0 items-center gap-1.5 pl-2 pr-1 text-xs text-muted"
          >
            {saveState === 'error' ? (
              <>
                <AlertIcon className="h-3.5 w-3.5 text-danger" />
                No se pudo guardar
              </>
            ) : saveState === 'saving' ? (
              <>
                <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
                Guardando…
              </>
            ) : saveState === 'dirty' ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="hidden sm:inline">Cambios sin guardar</span>
                <span className="sm:hidden">Sin guardar</span>
              </>
            ) : (
              <>
                <CheckIcon className="h-3.5 w-3.5 text-accent-2" />
                <span className="hidden sm:inline">Todos los cambios guardados</span>
                <span className="sm:hidden">Guardado</span>
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
    <div className="grid h-full place-items-center bg-canvas px-6 text-center text-ink">
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
