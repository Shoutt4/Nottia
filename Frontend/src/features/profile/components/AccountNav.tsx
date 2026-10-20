import { CardIcon, ShieldIcon, UserIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const ITEMS = [
  { label: 'Resumen de cuenta', Icon: UserIcon, active: true },
  { label: 'Facturación', Icon: CardIcon, active: false },
  { label: 'Seguridad', Icon: ShieldIcon, active: false },
]

/** Sub-navegación de ajustes de cuenta (solo escritorio). */
export function AccountNav() {
  return (
    <aside className="hidden lg:block">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Ajustes de cuenta
      </p>

      <nav aria-label="Ajustes de cuenta" className="mt-3 space-y-1">
        {ITEMS.map(({ label, Icon, active }) => (
          <div
            key={label}
            aria-current={active ? 'page' : undefined}
            title={active ? undefined : 'Próximamente'}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
              active ? 'bg-accent-soft text-accent' : 'text-muted/70',
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{label}</span>

            {!active && (
              <span className="ml-auto rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Pronto
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
