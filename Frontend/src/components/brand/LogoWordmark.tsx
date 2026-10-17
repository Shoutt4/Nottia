import { Logo } from './Logo'

interface LogoWordmarkProps {
  size?: number
  /** Muestra el lema debajo del nombre. */
  withTagline?: boolean
  className?: string
}

/** Marca + nombre "Nottia" (y lema opcional). Úsalo en headers, footer y auth. */
export function LogoWordmark({ size = 34, withTagline = false, className }: LogoWordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <Logo size={size} />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight text-ink">Nottia</span>
        {withTagline && (
          <span className="mt-1 text-[11px] font-medium text-muted">
            Notas <span className="text-accent">·</span> Recordatorios{' '}
            <span className="text-accent">·</span> Organización
          </span>
        )}
      </span>
    </span>
  )
}
