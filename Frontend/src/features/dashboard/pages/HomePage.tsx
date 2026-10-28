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
    <div>
      <CoverBanner />

      <div className="mx-auto mt-7 w-full max-w-5xl space-y-10 px-5 sm:px-8">
        <Reveal>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{boardTitle}</h1>
              <p className="mt-1 text-pretty text-sm text-muted">
                Hola{firstName ? `, ${firstName}` : ''} 👋 Aquí verás todas tus notas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              disabled={boardQuery.isPending}
              aria-label="Editar tablero"
              title="Editar tablero"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <section>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-semibold text-ink">Notas</h2>
              <span className="text-xs text-muted">
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

      {settingsOpen && (
        <BoardSettingsDialog board={boardQuery.data} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  )
}
