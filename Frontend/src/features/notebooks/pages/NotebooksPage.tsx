import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { PencilIcon, PlusIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'
import { notebookEditPath, notebookNotesPath, ROUTES } from '@/config/routes'
import { fullName, useProfile } from '@/features/profile'
import { getErrorMessage } from '@/lib/errors'
import { useNotebookCoverStore } from '@/stores/notebookCoverStore'

import { NotebookCover } from '../components/NotebookCover'
import { NotebooksLoading } from '../components/NotebooksLoading'
import { NotebooksPagination } from '../components/NotebooksPagination'
import { NOTEBOOKS_PAGE_SIZE, useNotebooks } from '../hooks/useNotebooks'
import { coverDesignFrom } from '../lib/covers'

/**
 * Colección de cuadernos del usuario. Lee `/api/cuaderno/all` paginado (6 por
 * página) y pinta la tapa con el diseño del backend; si el diseñador guardó una
 * tapa local, esa se mantiene como preferencia del navegador.
 */
export function NotebooksPage() {
  const [page, setPage] = useState(0)
  const listTopRef = useRef<HTMLDivElement>(null)
  const notebooksQuery = useNotebooks(page, NOTEBOOKS_PAGE_SIZE)
  const storedCovers = useNotebookCoverStore((state) => state.covers)
  const { data: profile } = useProfile()

  const notebooks = notebooksQuery.data?.notebooks ?? []
  const total = notebooksQuery.data?.total ?? notebooks.length
  const totalPages = notebooksQuery.data?.totalPages ?? 0
  const author = fullName(profile) || 'Tu nombre'

  const changePage = (next: number) => {
    if (next === page || notebooksQuery.isFetching) return

    setPage(next)
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Tu colección
            </p>
            <h1
              className="mt-3 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Mis cuadernos
            </h1>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-muted lg:pb-2 lg:text-right">
            Las tapas de tus cuadernos, reunidas en un solo lugar.
          </p>
        </div>

        <div className="mt-8 border-t border-line" />
      </Reveal>

      <Reveal className="mt-8" delay={80}>
        <div ref={listTopRef} className="scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {notebooksQuery.isPending
                ? 'Cargando…'
                : notebooksQuery.isError
                  ? 'No disponible'
                  : `${total} ${total === 1 ? 'cuaderno' : 'cuadernos'}`}
            </p>

            <Link
              to={ROUTES.notebookNew}
              className={buttonClass('primary', 'group shrink-0 whitespace-nowrap')}
            >
              <PlusIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Crear cuaderno
            </Link>
          </div>

          {notebooksQuery.isError ? (
            <div className="mt-8 rounded-3xl border border-line bg-surface px-5 py-10 text-center">
              <p className="text-sm font-semibold text-ink">No pudimos cargar tus cuadernos</p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-pretty text-muted">
                {getErrorMessage(notebooksQuery.error)}
              </p>
              <button
                type="button"
                onClick={() => void notebooksQuery.refetch()}
                disabled={notebooksQuery.isFetching}
                className={buttonClass('secondary', 'mt-5')}
              >
                {notebooksQuery.isFetching ? 'Reintentando…' : 'Reintentar'}
              </button>
            </div>
          ) : notebooksQuery.isPending ? (
            <NotebooksLoading
              label={page > 0 ? `Abriendo la página ${page + 1}` : 'Preparando tus cuadernos'}
            />
          ) : notebooks.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-line bg-surface px-5 py-12 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Sin cuadernos
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Aún no hay tapas
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-pretty text-muted">
                Crea tu primer cuaderno para empezar tu colección.
              </p>
              <Link to={ROUTES.notebookNew} className={buttonClass('primary', 'mt-6 inline-flex')}>
                Crear cuaderno
              </Link>
            </div>
          ) : (
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {notebooks.map((notebook) => {
                const design =
                  storedCovers[notebook.id] ?? coverDesignFrom(notebook.design, notebook.color)

                return (
                  <li key={notebook.id} className="min-w-0">
                    <figure className="group">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-l-[3px] rounded-r-xl shadow-[0_24px_48px_-26px_rgba(24,18,40,0.5)] transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_36px_64px_-30px_rgba(24,18,40,0.55)]">
                        <NotebookCover
                          title={notebook.nombre}
                          order={notebook.orden}
                          author={author}
                          design={design}
                        />

                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-black/25 to-transparent"
                        />

                        <Link
                          to={notebookNotesPath(notebook.id)}
                          aria-label={`Ver las notas de ${notebook.nombre || 'este cuaderno'}`}
                          className="absolute inset-0 z-10 rounded-l-[3px] rounded-r-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-[7%]">
                          <Link
                            to={notebookEditPath(notebook.id)}
                            aria-label={`Editar ${notebook.nombre}`}
                            onClick={(event) => event.stopPropagation()}
                            className="pointer-events-auto inline-flex translate-y-0 items-center gap-1.5 rounded-full border border-line bg-surface/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink opacity-100 shadow-[0_10px_24px_-14px_rgba(20,16,28,0.7)] backdrop-blur transition duration-300 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:pointer-events-none lg:translate-y-4 lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:pointer-events-auto lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100"
                          >
                            <PencilIcon className="h-3.5 w-3.5 shrink-0" />
                            <span className="hidden sm:inline">Editar</span>
                          </Link>
                        </div>
                      </div>

                      <figcaption className="sr-only">
                        {notebook.nombre}, cuaderno de {author}.
                      </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>
          )}

          {!notebooksQuery.isError && !notebooksQuery.isPending ? (
            <NotebooksPagination
              page={page}
              totalPages={totalPages}
              onChange={changePage}
              disabled={notebooksQuery.isFetching}
            />
          ) : null}
        </div>
      </Reveal>
    </div>
  )
}
