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
      className="group flex h-80 w-52 shrink-0 snap-start flex-col overflow-hidden rounded-[4px] border border-paper-line bg-desk/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-paper-accent/40 hover:bg-desk/70 hover:shadow-[0_24px_50px_-30px_rgba(35,28,20,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">
        <span className="truncate">{note.notebook}</span>

        {note.locked ? (
          <LockIcon className="h-3.5 w-3.5 shrink-0" />
        ) : (
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-paper-accent/40 transition-colors duration-300 group-hover:bg-paper-accent"
          />
        )}
      </div>

      <h3
        className={cn(
          'mt-3 line-clamp-2 font-serif text-[17px] font-semibold leading-snug',
          untitled ? 'italic font-medium text-paper-muted' : 'text-paper-ink',
        )}
      >
        {untitled ? 'Sin título' : note.title}
      </h3>

      {excerpt && (
        <p className="mt-2 line-clamp-6 text-pretty text-[11.5px] leading-relaxed text-paper-muted">
          {excerpt}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-paper-line pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-paper-muted">
        <span>{formatRelativeDate(note.updatedAt)}</span>
        <span className="text-paper-accent/70 transition-colors duration-300 group-hover:text-paper-accent">
          Abrir
        </span>
      </div>
    </Link>
  )
}
