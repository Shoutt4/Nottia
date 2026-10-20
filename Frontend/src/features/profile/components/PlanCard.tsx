import { Button } from '@/components/ui/Button'
import { toast } from '@/lib/toast'

/** Tarjeta del plan actual (sin facturación real todavía). */
export function PlanCard() {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Tu plan</p>

      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold tracking-tight">Nottia Free</h2>
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
            Gratis
          </span>
        </div>

        <Button
          variant="secondary"
          onClick={() => toast.info('La gestión de planes estará disponible pronto.')}
          className="px-4 py-2 text-xs"
        >
          Gestionar plan
        </Button>
      </div>
    </section>
  )
}
