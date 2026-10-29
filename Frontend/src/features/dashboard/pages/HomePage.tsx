import { useEffect, useMemo, useRef, useState } from 'react'

import { PencilIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { useMyBoard } from '@/features/board'
import { useNotebooks } from '@/features/notebooks'
import { NotesRail, useInfiniteNotes } from '@/features/notes'
import { useProfile } from '@/features/profile'
import { getErrorMessage } from '@/lib/errors'
import { toast } from '@/lib/toast'

import { BoardSettingsDialog } from '../components/BoardSettingsDialog'
import { CoverBanner } from '../components/CoverBanner'

/** Inicio: portada editable a sangre + notas del usuario. */
export function HomePage() {
  const { data: profile } = useProfile()
  const notesQuery = useInfiniteNotes()
  const boardQuery = useMyBoard()
  const notebooksQuery = useNotebooks()
  const [settingsOpen, setSettingsOpen] = useState(false)
  /** Evita pedir la misma página varias veces mientras el scroll dispara eventos. */
  const loadingMore = useRef(false)

  // Une las páginas del carrusel sin repetir notas si el backend reordena.
  const notes = useMemo(() => {
    const seen = new Set<string>()

    return (notesQuery.data?.pages.flatMap((page) => page.notes) ?? []).filter((note) => {
      if (seen.has(note.id)) return false
      seen.add(note.id)
      return true
    })
  }, [notesQuery.data])

  const total = notesQuery.data?.pages[0]?.total ?? notes.length
  // Cuaderno por defecto de las notas nuevas: el primero del usuario y, si aún
  // no tiene cuadernos, el de la nota más reciente.
  const defaultNotebookId =
    notebooksQuery.data?.notebooks[0]?.id ??
    notes.find((note) => note.idCuaderno)?.idCuaderno ??
    null
  const boardTitle = boardQuery.data?.titulo?.trim() || 'Home'
  const firstName = profile?.nombre?.trim().split(/\s+/)[0]

  const shownError = useRef<Error | null>(null)
  useEffect(() => {
    if (notesQuery.isError && notesQuery.error !== shownError.current) {
      shownError.current = notesQuery.error
      toast.error(getErrorMessage(notesQuery.error))
    }
  }, [notesQuery.isError, notesQuery.error])

  const loadMore = () => {
    if (!notesQuery.hasNextPage || loadingMore.current) return

    loadingMore.current = true
    void notesQuery.fetchNextPage().finally(() => {
      loadingMore.current = false
    })
  }

  return (
    <div className="note-desk -mb-8 pb-10">
      <CoverBanner />

      <div className="w-full -mt-10 sm:-mt-16">
        <div className="note-paper overflow-hidden rounded-[4px] border border-paper-line px-5 py-6 shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] sm:px-10 sm:py-9">
          <Reveal>
            <div className="flex items-center justify-between gap-4 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
                Tu espacio
              </span>
              <span>Inicio</span>
            </div>

            <div className="mt-7 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="break-words font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink sm:text-5xl">
                  {boardTitle}
                </h1>
                <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-paper-muted">
                  Hola{firstName ? `, ${firstName}` : ''}. Aquí verás todas tus notas.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                disabled={boardQuery.isPending}
                aria-label="Editar tablero"
                title="Editar tablero"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper-line text-paper-muted transition-colors duration-200 hover:border-paper-accent hover:text-paper-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <section className="mt-9 border-t border-paper-line pt-6">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-xl font-semibold text-paper-ink">Notas</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted">
                  {total} {total === 1 ? 'nota' : 'notas'}
                </span>
              </div>

              <NotesRail
                notes={notes}
                defaultNotebookId={defaultNotebookId}
                hasMore={notesQuery.hasNextPage}
                loadingMore={notesQuery.isFetchingNextPage}
                onLoadMore={loadMore}
              />
            </section>
          </Reveal>
        </div>
      </div>

      {settingsOpen && (
        <BoardSettingsDialog board={boardQuery.data} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  )
}
