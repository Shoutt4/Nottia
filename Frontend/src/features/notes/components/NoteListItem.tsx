import { Link } from 'react-router-dom'

import { notePath } from '@/config/routes'
import { cn } from '@/lib/utils'

import { formatRelativeDate, noteExcerpt } from '../lib/format'
import type { Note } from '../types'

/** Fila de la lista lateral del editor. */
export function NoteListItem({ note, active }: { note: Note; active: boolean }) {
  const untitled = note.title.trim().length === 0
  const excerpt = noteExcerpt(note.content)

  return (
    <Link
      to={notePath(note.id)}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'block rounded-xl px-3 py-2.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        active ? 'bg-surface shadow-sm ring-1 ring-line' : 'hover:bg-surface/70',
      )}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-muted">
        <span className="truncate">{note.notebook}</span>
        <span aria-hidden>·</span>
        <span className="shrink-0">{formatRelativeDate(note.updatedAt)}</span>
      </div>

      <p
        className={cn(
          'mt-1 truncate text-sm font-semibold',
          untitled ? 'italic font-medium text-muted' : 'text-ink',
        )}
      >
        {untitled ? 'Sin título' : note.title}
      </p>

      {excerpt && (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{excerpt}</p>
      )}
    </Link>
  )
}
