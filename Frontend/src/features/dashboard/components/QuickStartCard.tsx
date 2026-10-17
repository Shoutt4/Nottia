import { cn } from '@/lib/utils'

import type { QuickAction } from '../types'

/** Tarjeta de acceso rápido (sin acción todavía: la función aún no existe). */
export function QuickStartCard({ action }: { action: QuickAction }) {
  const { title, description, Icon, iconClass, tintClass } = action

  return (
    <div className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-34px_var(--color-accent)]">
      <span className={cn('grid h-12 w-12 place-items-center rounded-xl', tintClass)}>
        <Icon className={cn('h-6 w-6', iconClass)} />
      </span>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      <span className="mt-auto w-fit rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
        Próximamente
      </span>
    </div>
  )
}
