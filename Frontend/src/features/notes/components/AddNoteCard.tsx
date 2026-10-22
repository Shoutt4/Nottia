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
      className="group flex h-80 w-52 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface/50 px-5 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface hover:shadow-[0_24px_50px_-30px_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-on-accent shadow-[0_12px_30px_-14px_var(--color-accent)] transition duration-300 group-hover:scale-105">
        {isPending ? (
          <LoaderIcon className="h-5 w-5 animate-spin" />
        ) : (
          <PlusIcon className="h-5 w-5" />
        )}
      </span>
      <span className="text-sm font-semibold text-ink">
        {isPending ? 'Creando…' : 'Nueva nota'}
      </span>
      <span className="text-[11px] leading-relaxed text-muted">Captura una idea en segundos.</span>
    </button>
  )
}
