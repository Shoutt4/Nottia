import { Link } from 'react-router-dom'

import { ArrowLeftIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

/** Pantalla para un id de nota que no existe o no es del usuario. */
export function NoteNotFound() {
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
