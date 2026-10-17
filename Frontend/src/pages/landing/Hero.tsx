import { Link } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { SparkleIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'

const gradientText = {
  backgroundImage: 'linear-gradient(115deg, var(--color-accent), var(--color-accent-2) 70%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo aurora + manchas flotantes (usan tokens Lavanda) */}
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 -z-10 opacity-90" />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-28 top-6 -z-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-accent-2/20 blur-3xl [animation-delay:-6s]"
      />

      <div className="mx-auto max-w-3xl px-5 pb-14 pt-20 text-center sm:pt-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <SparkleIcon className="h-4 w-4 text-accent" />
            Nottia · organiza lo que importa
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Si está escrito en una nota, <span style={gradientText}>debe de ser importante</span>
          </h1>
        </Reveal>

        <Reveal delay={170}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg">
            Organiza tu vida de múltiples maneras y accede a todo aquello que quieres recordar
            desde un único lugar.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={ROUTES.register} className={buttonClass('primary', 'w-full px-7 py-3 sm:w-auto')}>
              Crear cuenta gratis
            </Link>
            <Link to={ROUTES.login} className={buttonClass('secondary', 'w-full px-7 py-3 sm:w-auto')}>
              Iniciar sesión
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
