import { Button } from '@/components/ui/Button'
import { toast } from '@/lib/toast'

/** Tarjeta del plan actual (sin facturación real todavía). */
export function PlanCard() {
  return (
    <section className="relative overflow-hidden rounded-[4px] border border-paper-line bg-desk/40 p-5 sm:p-6">
      <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-paper-accent/70" />

      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted">Tu plan</p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <h2 className="font-serif text-2xl font-semibold tracking-[-0.01em] text-paper-ink">
            Nottia Free
          </h2>
          <span className="rounded-full border border-paper-accent/30 bg-paper-accent/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-accent">
            Gratis
          </span>
        </div>

        <Button
          variant="secondary"
          onClick={() => toast.info('La gestión de planes estará disponible pronto.')}
          className="rounded-md border-paper-line bg-paper px-4 py-2 text-xs text-paper-ink hover:border-paper-accent hover:text-paper-accent focus-visible:outline-paper-accent"
        >
          Gestionar plan
        </Button>
      </div>
    </section>
  )
}
