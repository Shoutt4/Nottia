import { Link } from 'react-router-dom'

import { LockIcon } from '@/components/ui/icons'
import { notePath } from '@/config/routes'
import { cn } from '@/lib/utils'

import { formatRelativeDate, noteExcerpt } from '../lib/format'
import type { Note } from '../types'

interface NotebookNoteCardProps {
  note: Note
  /** Acento de la portada del cuaderno, para el detalle editorial. */
  accent?: string
}

/** Tarjeta de una nota dentro de la vista de un cuaderno. */
export function NotebookNoteCard({ note, accent = 'var(--color-accent)' }: NotebookNoteCardProps) {
  const title = note.title.trim()
  const excerpt = noteExcerpt(note.content)
  const date = formatRelativeDate(note.createdAt || note.updatedAt)

  return (
    <Link
      to={notePath(note.id)}
      className="group relative flex h-full min-h-[184px] flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_24px_48px_-32px_rgba(24,18,40,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {note.pinned ? 'Fijada' : 'Nota'}
        </span>

        {note.locked && <LockIcon className="h-3.5 w-3.5" />}
      </div>

      <h2
        className={cn(
          'mt-3 line-clamp-2 font-serif text-xl font-semibold leading-snug',
          title ? 'text-ink' : 'italic font-medium text-muted',
        )}
      >
        {title || 'Sin título'}
      </h2>

      {excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{excerpt}</p>
      ) : (
        <p className="mt-2 text-sm italic text-muted/70">Sin contenido</p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
        <span>{date || 'Sin fecha'}</span>
        <span className="text-accent/80 transition-colors duration-300 group-hover:text-accent">
          Abrir
        </span>
      </div>
    </Link>
  )
}
