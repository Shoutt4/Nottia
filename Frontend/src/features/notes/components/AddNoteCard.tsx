import { LoaderIcon, PlusIcon } from '@/components/ui/icons'

import { useNewNote } from '../hooks/useNewNote'

interface AddNoteCardProps {
  /** Cuaderno por defecto (el de la nota más reciente) para la nueva nota. */
  defaultNotebookId?: string | null
}

/** Tarjeta final del carrusel: crea la nota en la API y abre el editor. */
export function AddNoteCard({ defaultNotebookId }: AddNoteCardProps) {
  const { create, isPending } = useNewNote(defaultNotebookId)

  return (
    <button
      type="button"
      onClick={create}
      disabled={isPending}
      className="group flex h-80 w-52 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-paper-line bg-transparent px-5 text-center transition duration-300 hover:-translate-y-1 hover:border-paper-accent/50 hover:bg-desk/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-paper-accent text-[#fbf8f0] shadow-[0_12px_30px_-14px_rgba(180,90,57,0.8)] transition duration-300 group-hover:scale-105">
        {isPending ? (
          <LoaderIcon className="h-5 w-5 animate-spin" />
        ) : (
          <PlusIcon className="h-5 w-5" />
        )}
      </span>
      <span className="font-serif text-lg font-semibold text-paper-ink">
        {isPending ? 'Creando…' : 'Nueva nota'}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">
        Captura una idea
      </span>
    </button>
  )
}
