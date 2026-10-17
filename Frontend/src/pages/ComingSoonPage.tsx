import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES } from '@/config/routes'

interface ComingSoonPageProps {
  title: string
  message?: string
}

/** Página provisional para rutas aún no implementadas y el 404. */
export function ComingSoonPage({ title, message }: ComingSoonPageProps) {
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-canvas px-5 text-ink">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-80" />

      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      <div className="relative flex max-w-md flex-col items-center gap-5 text-center">
        <LogoWordmark size={40} withTagline />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-pretty text-muted">
          {message ?? 'Estamos trabajando en esta sección. Vuelve pronto.'}
        </p>
        <Link to={ROUTES.home} className={buttonClass('secondary')}>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
