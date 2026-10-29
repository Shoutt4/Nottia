import { Link } from 'react-router-dom'

import { ArrowLeftIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

/** Pantalla para un id de nota que no existe o no es del usuario. */
export function NoteNotFound() {
  return (
    <div className="note-desk grid h-full place-items-center px-6 text-center text-paper-ink">
      <div className="note-paper w-full max-w-sm rounded-[3px] border border-paper-line px-8 py-10 shadow-[0_30px_70px_-42px_rgba(35,28,20,0.65)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
          Notas
        </p>
        <h1 className="mt-3 font-serif text-2xl font-semibold">Esta nota no existe</h1>
        <p className="mx-auto mt-2 max-w-xs text-pretty text-sm leading-relaxed text-paper-muted">
          Puede que la hayas eliminado o que el enlace esté roto.
        </p>
        <Link
          to={ROUTES.dashboard}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
