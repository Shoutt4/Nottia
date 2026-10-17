import { Link } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'

export function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
          <div aria-hidden className="aurora pointer-events-none absolute inset-0 -z-10 opacity-80" />

          <h2 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Empieza a escribir lo que importa
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted">
            Crea tu cuenta gratis y ten tus notas, listas y recordatorios siempre sincronizados.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={ROUTES.register} className={buttonClass('primary', 'w-full px-7 py-3 sm:w-auto')}>
              Crear cuenta gratis
            </Link>
            <Link to={ROUTES.login} className={buttonClass('secondary', 'w-full px-7 py-3 sm:w-auto')}>
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
