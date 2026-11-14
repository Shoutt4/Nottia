import { Logo } from '@/components/brand/Logo'

/** Estado de carga de la planificación, con el mismo lenguaje de papel. */
export function ActivitiesLoading() {
  return (
    <div className="note-paper mt-8 grid min-h-[360px] place-items-center rounded-[6px] border border-paper-line px-6 py-14">
      <div className="flex flex-col items-center text-center" role="status" aria-live="polite">
        <div className="relative h-24 w-28" aria-hidden>
          <span className="absolute left-2 top-5 h-16 w-20 -rotate-6 rounded-md border border-paper-line bg-canvas" />
          <span className="absolute right-2 top-4 h-16 w-20 rotate-6 rounded-md border border-paper-line bg-canvas" />
          <span className="absolute left-1/2 top-0 flex h-20 w-20 -translate-x-1/2 animate-float flex-col justify-between rounded-md border border-paper-line bg-paper p-2.5 shadow-[0_18px_34px_-22px_rgba(24,18,40,0.55)] motion-reduce:animate-none">
            <Logo size={18} />
            <span className="space-y-1">
              <span className="block h-1 w-full rounded-full bg-paper-line" />
              <span className="block h-1 w-4/5 rounded-full bg-paper-line" />
              <span className="block h-1 w-3/5 rounded-full bg-paper-line" />
            </span>
          </span>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-accent">
          Nottia · Tu semana
        </p>
        <p className="mt-2 font-serif text-xl font-semibold text-paper-ink">
          Ordenando tus actividades
        </p>
        <p className="mt-1 text-sm text-paper-muted">Estamos preparando el cuadro semanal.</p>

        <span className="mt-5 flex items-center gap-1.5" aria-hidden>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-accent" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-accent [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-accent [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  )
}
