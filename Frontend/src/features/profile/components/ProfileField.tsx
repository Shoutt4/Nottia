import { PencilIcon } from '@/components/ui/icons'

interface ProfileFieldProps {
  label: string
  value: string
  /** Si se pasa, muestra el botón "Editar". */
  onEdit?: () => void
}

/** Fila de dato de la cuenta: etiqueta, valor y acción opcional. */
export function ProfileField({ label, value, onEdit }: ProfileFieldProps) {
  return (
    <div className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">{label}</p>

      <p className="truncate text-pretty font-serif text-[15px] text-paper-ink" title={value}>
        {value}
      </p>

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Editar ${label}`}
          className="inline-flex shrink-0 items-center gap-1.5 justify-self-start rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-paper-accent transition-colors duration-200 hover:bg-desk/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent sm:justify-self-end"
        >
          <PencilIcon className="h-3 w-3" />
          Editar
        </button>
      )}
    </div>
  )
}
