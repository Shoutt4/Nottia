import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { ROUTES } from '@/config/routes'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <LogoWordmark size={28} />
        <p className="text-sm text-muted">© {year} Nottia. Todo lo importante, en su sitio.</p>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link to={ROUTES.register} className="transition-colors hover:text-ink">
            Crear cuenta
          </Link>
          <Link to={ROUTES.login} className="transition-colors hover:text-ink">
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </footer>
  )
}
