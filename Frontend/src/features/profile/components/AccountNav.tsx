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
    <aside className="hidden lg:sticky lg:top-8 lg:block lg:self-start">
      <p className="flex items-center gap-2 border-b border-paper-line pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted">
        <span>Ajustes de cuenta</span>
        <span aria-hidden className="h-px flex-1 bg-paper-line" />
      </p>

      <nav aria-label="Ajustes de cuenta" className="mt-3 space-y-1">
        {ITEMS.map(({ label, Icon, active }) => (
          <div
            key={label}
            aria-current={active ? 'page' : undefined}
            title={active ? undefined : 'Próximamente'}
            className={cn(
              'relative flex items-center gap-2.5 rounded-md px-2.5 py-2.5 text-sm transition-colors',
              active ? 'bg-desk/60 text-paper-ink' : 'text-paper-muted/70',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-paper-accent transition-opacity',
                active ? 'opacity-100' : 'opacity-0',
              )}
            />

            <Icon
              className={cn('h-4 w-4 shrink-0', active && 'text-paper-accent')}
            />

            <span className="truncate font-serif text-[15px]">{label}</span>

            {!active && (
              <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.12em] text-paper-muted">
                Pronto
              </span>
            )}

            {active && (
              <span aria-hidden className="ml-auto h-1.5 w-1.5 rounded-full bg-paper-accent" />
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
