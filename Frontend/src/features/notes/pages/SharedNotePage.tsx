import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { LoaderIcon } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/config/routes'

import { usePublicNote } from '../hooks/useNotes'
import { decodeShareNoteId } from '../lib/share'

/** Vista pública de solo lectura para una nota compartida. */
export function SharedNotePage() {
  const [searchParams] = useSearchParams()
  const encodedId = searchParams.get('nota')
  const noteId = useMemo(
    () => (encodedId ? decodeShareNoteId(encodedId) : null),
    [encodedId],
  )
  const { data: note, isPending } = usePublicNote(noteId)
  const unavailable = !noteId || (!isPending && !note)

  return (
    <div className="note-desk min-h-dvh text-paper-ink">
      <header className="border-b border-paper-line/70 bg-paper/60 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link to={ROUTES.home} aria-label="Ir a Nottia">
            <LogoWordmark size={26} />
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-paper-line bg-paper px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted sm:inline">
              Nota compartida
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-10">
        {unavailable ? (
          <div className="note-paper mx-auto max-w-md rounded-[3px] border border-paper-line px-7 py-10 text-center shadow-[0_30px_70px_-42px_rgba(35,28,20,0.65)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              Nota compartida
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold">No encontramos esta nota</h1>
            <p className="mx-auto mt-2 max-w-xs text-pretty text-sm leading-relaxed text-paper-muted">
              El enlace está roto o la nota ya no existe.
            </p>
            <Link to={ROUTES.home} className={buttonClass('primary', 'mt-6')}>
              Ir a Nottia
            </Link>
          </div>
        ) : isPending ? (
          <div className="grid min-h-[60dvh] place-items-center">
            <LoaderIcon
              className="h-5 w-5 animate-spin text-paper-muted"
              aria-label="Cargando nota"
            />
          </div>
        ) : note ? (
          <>
            <article className="note-paper relative overflow-hidden rounded-[3px] border border-paper-line px-5 py-8 text-paper-ink shadow-[0_30px_70px_-42px_rgba(35,28,20,0.65)] sm:px-10 sm:py-12">
              <span
                aria-hidden
                className="absolute inset-y-8 left-4 w-px bg-paper-accent/40 sm:inset-y-12 sm:left-8"
              />

              <div className="relative pl-6 sm:pl-12">
                <div className="border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
                  Nota compartida
                </div>

                <h1 className="mt-9 w-full font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink sm:mt-10 sm:text-5xl">
                  {note.title.trim() || 'Sin título'}
                </h1>

                <span aria-hidden className="mt-5 block h-px w-14 bg-paper-accent/70" />

                <div className="mt-6 whitespace-pre-wrap break-words font-serif text-[17px] leading-[1.85] text-paper-ink">
                  {note.content.trim() || (
                    <span className="italic text-paper-muted">Sin contenido</span>
                  )}
                </div>
              </div>
            </article>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted">
              Compartida desde Nottia
            </p>
          </>
        ) : null}
      </main>
    </div>
  )
}
