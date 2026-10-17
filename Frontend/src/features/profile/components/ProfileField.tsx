import type { ReactNode } from 'react'

interface ProfileFieldProps {
  icon: ReactNode
  label: string
  value: string
}

/** Fila de dato del perfil: ícono, etiqueta y valor. */
export function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate text-sm font-medium text-ink" title={value}>
          {value}
        </p>
      </div>
    </div>
  )
}
