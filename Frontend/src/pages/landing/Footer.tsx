import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { MailIcon } from '@/components/ui/icons'
import { ROUTES } from '@/config/routes'

const PRODUCT_LINKS = [
  { href: '#funciones', label: 'Funciones' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#detalles', label: 'Detalles' },
]

const COMPANY_LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-paper-line bg-paper/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-accent/35 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr]">
          <div>
            <LogoWordmark size={30} withTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-muted">
              Un cuaderno tranquilo para notas, listas, fechas y todo lo que no quieres dejar
              escapar.
            </p>
            <a
              href="mailto:hola@nottia.app"
              className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted transition-colors hover:text-paper-accent"
            >
              <MailIcon className="h-3.5 w-3.5" />
              hola@nottia.app
            </a>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-accent">
              Producto
            </p>
            <nav aria-label="Producto" className="mt-4 flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-paper-muted transition-colors hover:text-paper-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-accent">
              Nottia
            </p>
            <nav aria-label="Nottia" className="mt-4 flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-paper-muted transition-colors hover:text-paper-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-accent">
              Cuenta
            </p>
            <nav aria-label="Cuenta" className="mt-4 flex flex-col gap-2.5">
              <Link
                to={ROUTES.register}
                className="w-fit text-sm text-paper-muted transition-colors hover:text-paper-ink"
              >
                Crear cuenta
              </Link>
              <Link
                to={ROUTES.login}
                className="w-fit text-sm text-paper-muted transition-colors hover:text-paper-ink"
              >
                Iniciar sesión
              </Link>
              <a
                href="#empezar"
                className="w-fit text-sm text-paper-muted transition-colors hover:text-paper-ink"
              >
                Empezar ahora
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-dashed border-paper-line pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">
            © {year} Nottia · Todo lo importante, en su sitio.
          </p>
          <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
              Hecho con papel y calma
            </span>
            <a
              href="#inicio"
              className="transition-colors hover:text-paper-ink"
              aria-label="Volver arriba"
            >
              ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
