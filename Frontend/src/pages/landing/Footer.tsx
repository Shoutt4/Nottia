import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { ROUTES } from '@/config/routes'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-paper-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <LogoWordmark size={28} />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted">
          © {year} Nottia · Todo lo importante, en su sitio.
        </p>
        <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-muted">
          <Link to={ROUTES.register} className="transition-colors hover:text-paper-ink">
            Crear cuenta
          </Link>
          <Link to={ROUTES.login} className="transition-colors hover:text-paper-ink">
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </footer>
  )
}
