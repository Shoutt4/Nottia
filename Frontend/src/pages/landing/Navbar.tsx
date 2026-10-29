import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES } from '@/config/routes'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper-line/70 bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          to={ROUTES.home}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Nottia, ir al inicio"
        >
          <LogoWordmark size={30} />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            to={ROUTES.login}
            className={buttonClass(
              'ghost',
              'hidden text-paper-muted hover:text-paper-ink sm:inline-flex',
            )}
          >
            Iniciar sesión
          </Link>
          <Link to={ROUTES.register} className={buttonClass('primary', 'px-4 py-2')}>
            Crear cuenta
          </Link>
        </div>
      </nav>
    </header>
  )
}
