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
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="mt-1 truncate text-pretty text-sm text-muted" title={value}>
          {value}
        </p>
      </div>

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-accent transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <PencilIcon className="h-3.5 w-3.5" />
          Editar
        </button>
      )}
    </div>
  )
}
