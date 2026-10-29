import {
  AlertIcon,
  BellIcon,
  CheckIcon,
  LoaderIcon,
  PaperclipIcon,
} from '@/components/ui/icons'

import { ICON_BUTTON_CLASS } from '../lib/editorClasses'
import { soon } from '../lib/soon'
import type { SaveState } from '../hooks/useNoteEditor'

interface NoteEditorFooterProps {
  saveState: SaveState
  onSave: () => void
}

/** Pie del editor: adjuntos y guardado manual con su estado. */
export function NoteEditorFooter({ saveState, onSave }: NoteEditorFooterProps) {
  return (
    <footer className="flex shrink-0 items-center gap-1 border-t border-paper-line bg-paper px-2 py-2 sm:px-3">
      <button
        type="button"
        onClick={soon}
        title="Adjuntar archivo"
        aria-label="Adjuntar archivo"
        className={ICON_BUTTON_CLASS}
      >
        <PaperclipIcon className="h-[18px] w-[18px]" />
      </button>
      <button
        type="button"
        onClick={soon}
        title="Añadir recordatorio"
        aria-label="Añadir recordatorio"
        className={ICON_BUTTON_CLASS}
      >
        <BellIcon className="h-[18px] w-[18px]" />
      </button>
      <button
        type="button"
        onClick={soon}
        className="hidden rounded-lg px-2.5 py-1.5 text-xs text-paper-muted transition-colors duration-200 hover:bg-desk hover:text-paper-ink sm:inline-flex"
      >
        Añadir etiqueta
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saveState === 'saved' || saveState === 'saving'}
        title="Guardar cambios (Ctrl+S)"
        aria-keyshortcuts="Control+S Meta+S"
        className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saveState === 'saving' ? (
          <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <CheckIcon className="h-3.5 w-3.5" />
        )}
        <span className="hidden sm:inline">Guardar cambios</span>
        <span className="sm:hidden">Guardar</span>
      </button>

      <span
        aria-live="polite"
        className="inline-flex shrink-0 items-center gap-1.5 pl-2 pr-1 text-xs text-paper-muted"
      >
        {saveState === 'error' ? (
          <>
            <AlertIcon className="h-3.5 w-3.5 text-danger" />
            No se pudo guardar
          </>
        ) : saveState === 'saving' ? (
          <>
            <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
            Guardando…
          </>
        ) : saveState === 'dirty' ? (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
            <span className="hidden sm:inline">Cambios sin guardar</span>
            <span className="sm:hidden">Sin guardar</span>
          </>
        ) : (
          <>
            <CheckIcon className="h-3.5 w-3.5 text-paper-accent" />
            <span className="hidden sm:inline">Todos los cambios guardados</span>
            <span className="sm:hidden">Guardado</span>
          </>
        )}
      </span>
    </footer>
  )
}
