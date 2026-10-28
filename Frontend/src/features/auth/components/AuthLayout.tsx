import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
import { CheckIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ROUTES } from '@/config/routes'

interface AuthLayoutProps {
  eyebrow: string
  heading: string
  description: string
  perks: string[]
  children: ReactNode
}

/** Estructura compartida por login y registro: fondo, marca, columna y tarjeta. */
export function AuthLayout({ eyebrow, heading, description, perks, children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-canvas text-ink">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 -z-10 opacity-90" />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-accent-2/15 blur-3xl [animation-delay:-7s]"
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
        <Link
          to={ROUTES.home}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Nottia, ir al inicio"
        >
          <LogoWordmark size={30} />
        </Link>
        <ThemeToggle />
      </div>

      <div className="mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-24 lg:grid-cols-2 lg:pt-16">
        <section className="hidden lg:block">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight">
              {heading}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-muted">{description}</p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {perks.map((perk, index) => (
              <li key={perk}>
                <Reveal delay={120 + index * 90}>
                  <span className="flex items-center gap-3 text-sm text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-accent">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    {perk}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <Reveal delay={80}>
          <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-surface/90 p-7 shadow-[0_45px_90px_-55px_rgba(0,0,0,0.6)] backdrop-blur sm:p-9">
            {children}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
