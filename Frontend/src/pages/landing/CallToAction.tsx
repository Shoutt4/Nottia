import { Link } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'

export function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
      <Reveal>
        <div className="note-paper relative overflow-hidden rounded-[4px] border border-paper-line px-6 py-12 text-center shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] sm:px-12 sm:py-16">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-paper-accent/60" />

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-accent">
            Empieza hoy
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink sm:text-4xl">
            Empieza a escribir lo que importa
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-paper-muted">
            Crea tu cuenta gratis y ten tus notas, listas y recordatorios siempre sincronizados.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={ROUTES.register}
              className={buttonClass('primary', 'w-full px-7 py-3 sm:w-auto')}
            >
              Crear cuenta gratis
            </Link>
            <Link
              to={ROUTES.login}
              className={buttonClass(
                'secondary',
                'w-full border-paper-line bg-transparent px-7 py-3 text-paper-ink hover:border-paper-accent hover:bg-transparent hover:text-paper-accent sm:w-auto',
              )}
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
