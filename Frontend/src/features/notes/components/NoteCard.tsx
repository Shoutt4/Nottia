import { Link } from 'react-router-dom'

import { LockIcon } from '@/components/ui/icons'
import { notePath } from '@/config/routes'
import { cn } from '@/lib/utils'

import { formatRelativeDate, noteExcerpt } from '../lib/format'
import type { Note } from '../types'

/** Tarjeta vertical de nota; abre el editor al hacer clic. */
export function NoteCard({ note }: { note: Note }) {
  const untitled = note.title.trim().length === 0
  const excerpt = noteExcerpt(note.content)

  return (
    <Link
      to={notePath(note.id)}
      className="group flex h-80 w-52 shrink-0 snap-start flex-col rounded-2xl border border-line bg-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-30px_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <p className="truncate text-[11px] text-muted">{note.notebook}</p>

      <h3
        className={cn(
          'mt-1.5 line-clamp-2 text-sm font-semibold leading-snug',
          untitled ? 'italic font-medium text-muted' : 'text-ink',
        )}
      >
        {untitled ? 'Sin título' : note.title}
      </h3>

      {excerpt && (
        <p className="mt-2 line-clamp-6 text-pretty text-xs leading-relaxed text-muted">{excerpt}</p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[11px] text-muted">
        <span>{formatRelativeDate(note.updatedAt)}</span>

        {note.locked ? (
          <LockIcon className="h-3.5 w-3.5" />
        ) : (
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent/40 transition-colors duration-300 group-hover:bg-accent"
          />
        )}
      </div>
    </Link>
  )
}
