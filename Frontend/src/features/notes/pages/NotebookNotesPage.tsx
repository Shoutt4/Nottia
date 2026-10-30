import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ChevronLeftIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/config/routes'
import {
  coverDesignFrom,
  NotebookCover,
  NotebooksPagination,
  useNotebook,
} from '@/features/notebooks'
import { fullName, useProfile } from '@/features/profile'
import { getErrorMessage } from '@/lib/errors'
import { useNotebookCoverStore } from '@/stores/notebookCoverStore'

import { NotebookNoteCard } from '../components/NotebookNoteCard'
import { NotebookNotesSkeleton } from '../components/NotebookNotesSkeleton'
import { NOTEBOOK_NOTES_PAGE_SIZE, useNotebookNotes } from '../hooks/useNotes'

/** Enlace de regreso a la colección de cuadernos. */
function BackToNotebooks() {
  return (
    <Link
      to={ROUTES.notebooks}
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <ChevronLeftIcon className="h-3.5 w-3.5" />
      Mis cuadernos
    </Link>
  )
}

/**
 * Notas de un cuaderno (`GET /api/notas/by/cuaderno/{id}`), paginadas de 10 en
 * 10. Cada tarjeta abre la nota en el editor existente.
 */
export function NotebookNotesPage() {
  const { notebookId } = useParams<{ notebookId: string }>()
  const [page, setPage] = useState(0)
  const notesTopRef = useRef<HTMLDivElement>(null)
  const notebookQuery = useNotebook(notebookId)
  const notesQuery = useNotebookNotes(notebookId, page, NOTEBOOK_NOTES_PAGE_SIZE)
  const storedCovers = useNotebookCoverStore((state) => state.covers)
  const { data: profile } = useProfile()

  const notebook = notebookQuery.data
  const design = notebook
    ? storedCovers[notebook.id] ?? coverDesignFrom(notebook.design, notebook.color)
    : null
  const author = fullName(profile) || 'Tu nombre'
  const notes = notesQuery.data?.notes ?? []
  const total = notesQuery.data?.total ?? notes.length
  const totalPages = notesQuery.data?.totalPages ?? 0

  const notebookError = !notebookId
    ? 'No encontramos el cuaderno que buscas.'
    : notebookQuery.isError
      ? getErrorMessage(notebookQuery.error)
      : null

  const changePage = (next: number) => {
    if (next === page || notesQuery.isFetching) return

    setPage(next)
    notesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (notebookError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <BackToNotebooks />

        <div className="mt-8 rounded-3xl border border-line bg-surface px-5 py-10 text-center">
          <p className="text-sm font-semibold text-ink">No pudimos abrir este cuaderno</p>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-muted">
            {notebookError}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {notebookId ? (
              <button
                type="button"
                onClick={() => void notebookQuery.refetch()}
                disabled={notebookQuery.isFetching}
                className={buttonClass('primary', '')}
              >
                {notebookQuery.isFetching ? 'Reintentando…' : 'Reintentar'}
              </button>
            ) : null}
            <Link to={ROUTES.notebooks} className={buttonClass('secondary', '')}>
              Volver a mis cuadernos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <BackToNotebooks />

      <Reveal className="mt-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-l-[3px] rounded-r-lg shadow-[0_24px_48px_-26px_rgba(24,18,40,0.45)] sm:w-28">
            {notebook && design ? (
              <>
                <NotebookCover
                  title={notebook.nombre}
                  order={notebook.orden}
                  author={author}
                  design={design}
                  variant="card"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-black/25 to-transparent"
                />
              </>
            ) : (
              <div className="h-full w-full animate-pulse bg-surface" />
            )}
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Cuaderno
              {notebook ? ` · N.º ${String(notebook.orden).padStart(2, '0')}` : ''}
            </p>

            {notebook ? (
              <h1
                className="mt-2 text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-ink sm:text-5xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {notebook.nombre.trim() || 'Sin título'}
              </h1>
            ) : (
              <div className="mt-3 h-10 w-64 max-w-full animate-pulse rounded-full bg-line" />
            )}

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Las notas de este cuaderno, ordenadas por fecha de creación.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-line" />
      </Reveal>

      <Reveal className="mt-8" delay={80}>
        <div ref={notesTopRef} className="scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {notesQuery.isPending
                ? 'Cargando…'
                : notesQuery.isError
                  ? 'No disponible'
                  : `${total} ${total === 1 ? 'nota' : 'notas'}`}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
              Creación · ascendente
            </p>
          </div>

          {notesQuery.isError ? (
            <div className="mt-6 rounded-3xl border border-line bg-surface px-5 py-10 text-center">
              <p className="text-sm font-semibold text-ink">No pudimos cargar las notas</p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-muted">
                {getErrorMessage(notesQuery.error)}
              </p>
              <button
                type="button"
                onClick={() => void notesQuery.refetch()}
                disabled={notesQuery.isFetching}
                className={buttonClass('secondary', 'mt-5')}
              >
                {notesQuery.isFetching ? 'Reintentando…' : 'Reintentar'}
              </button>
            </div>
          ) : notesQuery.isPending ? (
            <NotebookNotesSkeleton />
          ) : notes.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-line bg-surface px-5 py-12 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Sin notas
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Este cuaderno está en blanco
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-pretty text-muted">
                Las notas que agregues a este cuaderno aparecerán aquí.
              </p>
            </div>
          ) : (
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {notes.map((note) => (
                <li key={note.id} className="min-w-0">
                  <NotebookNoteCard note={note} accent={design?.accent} />
                </li>
              ))}
            </ul>
          )}

          {!notesQuery.isError && !notesQuery.isPending ? (
            <NotebooksPagination
              page={page}
              totalPages={totalPages}
              onChange={changePage}
              disabled={notesQuery.isFetching}
              label="Paginación de notas"
            />
          ) : null}
        </div>
      </Reveal>
    </div>
  )
}
