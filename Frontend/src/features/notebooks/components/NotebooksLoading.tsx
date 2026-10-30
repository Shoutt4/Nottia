import { Logo } from '@/components/brand/Logo'

interface NotebooksLoadingProps {
  label?: string
}

/**
 * Estado de carga de la colección: una pequeña tapa con la marca de Nottia y
 * hojas apiladas, dentro del lenguaje de papel de la app.
 */
export function NotebooksLoading({ label = 'Preparando tus cuadernos' }: NotebooksLoadingProps) {
  return (
    <div className="mt-8 grid min-h-[340px] place-items-center rounded-3xl border border-line bg-surface px-6 py-14">
      <div className="flex flex-col items-center text-center" role="status" aria-live="polite">
        <div className="relative h-28 w-32" aria-hidden>
          <span className="absolute left-3 top-5 h-20 w-16 -rotate-6 rounded-md border border-line bg-canvas" />
          <span className="absolute right-3 top-4 h-20 w-16 rotate-6 rounded-md border border-line bg-canvas" />

          <span className="absolute left-1/2 top-0 flex h-24 w-[72px] -translate-x-1/2 animate-float flex-col justify-between rounded-md border border-line bg-surface p-2.5 shadow-[0_18px_34px_-22px_rgba(24,18,40,0.55)] motion-reduce:animate-none">
            <Logo size={18} />
            <span className="space-y-1">
              <span className="block h-1 w-full rounded-full bg-line" />
              <span className="block h-1 w-4/5 rounded-full bg-line" />
              <span className="block h-1 w-3/5 rounded-full bg-line" />
            </span>
          </span>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          Nottia · Tu colección
        </p>
        <p className="mt-2 font-serif text-xl font-semibold text-ink">{label}</p>
        <p className="mt-1 text-sm text-muted">Estamos ordenando tus notas.</p>

        <span className="mt-5 flex items-center gap-1.5" aria-hidden>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  )
}
