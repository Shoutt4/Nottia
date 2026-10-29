import { Link } from 'react-router-dom'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandIcon,
  MinimizeIcon,
  MoreIcon,
} from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { ICON_BUTTON_CLASS } from '../lib/editorClasses'
import { soon } from '../lib/soon'
import type { Note } from '../types'
import { ShareButton } from './ShareButton'

interface NoteEditorHeaderProps {
  note: Note
  title: string
  content: string
  listOpen: boolean
  isFullscreen: boolean
  onToggleList: () => void
  onToggleFullscreen: () => void
}

/** Barra superior del editor: lista, pantalla completa, ruta y compartir. */
export function NoteEditorHeader({
  note,
  title,
  content,
  listOpen,
  isFullscreen,
  onToggleList,
  onToggleFullscreen,
}: NoteEditorHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-1 border-b border-paper-line bg-paper/90 px-2 backdrop-blur-xl sm:px-3">
      {!isFullscreen && (
        <button
          type="button"
          onClick={onToggleList}
          aria-label={listOpen ? 'Ocultar lista de notas' : 'Mostrar lista de notas'}
          title={listOpen ? 'Ocultar lista de notas' : 'Mostrar lista de notas'}
          className={cn(ICON_BUTTON_CLASS, 'hidden lg:grid')}
        >
          {listOpen ? (
            <ChevronLeftIcon className="h-[18px] w-[18px]" />
          ) : (
            <ChevronRightIcon className="h-[18px] w-[18px]" />
          )}
        </button>
      )}

      <button
        type="button"
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        aria-pressed={isFullscreen}
        className={ICON_BUTTON_CLASS}
      >
        {isFullscreen ? (
          <MinimizeIcon className="h-[18px] w-[18px]" />
        ) : (
          <ExpandIcon className="h-[18px] w-[18px]" />
        )}
      </button>

      <span aria-hidden className="mx-1 h-5 w-px bg-paper-line" />

      <div className="flex min-w-0 items-center gap-2 text-[13px]">
        <Link
          to={ROUTES.dashboard}
          className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted transition-colors duration-200 hover:text-paper-ink"
        >
          {note.notebook}
        </Link>
        <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-paper-muted/60" />
        <span className="truncate font-serif font-semibold text-paper-ink">
          {title.trim() || 'Sin título'}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ShareButton noteId={note.id} title={title} content={content} />
        <button
          type="button"
          onClick={soon}
          title="Más acciones"
          aria-label="Más acciones"
          className={ICON_BUTTON_CLASS}
        >
          <MoreIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
