import type { ReactNode } from 'react'

interface DesignerSectionProps {
  /** Letra o símbolo del encabezado, como en el diseño editorial. */
  badge: string
  title: string
  hint?: string
  children: ReactNode
}

/** Bloque del panel de diseño con su encabezado numerado/lettered. */
export function DesignerSection({ badge, title, hint, children }: DesignerSectionProps) {
  return (
    <section className="border-b border-line pb-6">
      <div className="flex items-start gap-3">
        <span className="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line bg-canvas font-serif text-[11px] font-semibold text-accent">
          {badge}
        </span>
        <div>
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {hint ? <p className="mt-0.5 text-xs text-muted">{hint}</p> : null}
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </section>
  )
}
