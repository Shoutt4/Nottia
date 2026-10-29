import { ListIcon, LoaderIcon, MoreIcon, PlusIcon, SlidersIcon } from '@/components/ui/icons'

import type { NoteGroup } from '../lib/groupNotes'
import { TOOLBAR_BUTTON_CLASS } from '../lib/editorClasses'
import { soon } from '../lib/soon'
import { NoteListItem } from './NoteListItem'

interface NoteEditorListProps {
  notebook: string
  activeId: string
  groups: NoteGroup[]
  total: number
  isPending: boolean
  creating: boolean
  onCreate: () => void
}

/** Lista de notas del editor, agrupada por día. */
export function NoteEditorList({
  notebook,
  activeId,
  groups,
  total,
  isPending,
  creating,
  onCreate,
}: NoteEditorListProps) {
  const empty = !isPending && groups.length === 0

  return (
    <aside className="hidden w-80 shrink-0 flex-col border-r border-paper-line bg-desk lg:flex">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-paper-line px-4">
        <h1 className="min-w-0 truncate font-serif text-[15px] font-semibold text-paper-ink">
          {notebook}
        </h1>
        <span className="shrink-0 font-mono text-[10px] text-paper-muted">{total}</span>

        <div className="ml-auto flex shrink-0 items-center">
          <button
            type="button"
            onClick={onCreate}
            disabled={creating}
            title="Nueva nota"
            aria-label="Nueva nota"
            className={TOOLBAR_BUTTON_CLASS}
          >
            {creating ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={soon}
            title="Filtrar notas"
            aria-label="Filtrar notas"
            className={TOOLBAR_BUTTON_CLASS}
          >
            <SlidersIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={soon}
            title="Ordenar notas"
            aria-label="Ordenar notas"
            className={TOOLBAR_BUTTON_CLASS}
          >
            <ListIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={soon}
            title="Más acciones"
            aria-label="Más acciones"
            className={TOOLBAR_BUTTON_CLASS}
          >
            <MoreIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="scroll-slim flex-1 overflow-y-auto px-2 py-2">
        {groups.map((group) => (
          <div key={group.label} className="pb-1.5">
            <h2 className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted">
              {group.label}
            </h2>

            <div className="space-y-0.5">
              {group.notes.map((item) => (
                <NoteListItem key={item.id} note={item} active={item.id === activeId} />
              ))}
            </div>
          </div>
        ))}

        {empty && <p className="px-3 py-4 text-xs text-paper-muted">Aún no tienes notas.</p>}
      </nav>
    </aside>
  )
}
