import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { LogoWordmark } from '@/components/brand/LogoWordmark'
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

/** Estructura compartida por login y registro: portada de cuaderno + hoja. */
export function AuthLayout({ eyebrow, heading, description, perks, children }: AuthLayoutProps) {
  return (
    <div className="note-desk relative min-h-dvh overflow-hidden text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-16 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl"
      />

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to={ROUTES.home}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Nottia, ir al inicio"
        >
          <LogoWordmark size={30} />
        </Link>
        <ThemeToggle />
      </header>

      <div className="mx-auto grid min-h-dvh w-full max-w-6xl items-stretch gap-10 px-5 pb-16 pt-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:pb-14 lg:pt-24">
        <div className="hidden h-full lg:block">
          <Reveal className="h-full">
            <section className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[6px] bg-[#241d38] p-8 text-[#f7f2e8] shadow-[0_35px_80px_-45px_rgba(18,12,34,0.85)] sm:p-10">
              <div aria-hidden className="absolute inset-y-0 left-0 w-2.5 bg-black/25" />
              <div aria-hidden className="absolute inset-y-0 left-2.5 w-px bg-white/10" />
              <div
                aria-hidden
                className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10"
              />
              <div
                aria-hidden
                className="absolute -right-14 top-24 h-56 w-56 rounded-full border border-white/[0.06]"
              />
              <div
                aria-hidden
                className="absolute -right-10 top-32 h-52 w-52 rounded-full bg-accent/20 blur-3xl"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-4 select-none font-serif text-[16rem] leading-none text-white/[0.035]"
              >
                N
              </span>

              <div className="relative flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9afa1]">
                <span>Cuaderno de ideas</span>
                <span>N.º 01</span>
              </div>

              <div className="relative mt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-accent">
                  {eyebrow}
                </p>
                <h2 className="mt-5 max-w-md text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-[#fbf7ee] sm:text-[2.9rem]">
                  {heading}
                </h2>
                <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-[#cfc6b8]">
                  {description}
                </p>
              </div>

              <ul className="relative mt-9 space-y-3.5">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-px w-5 shrink-0 bg-paper-accent/80"
                    />
                    <span className="text-sm leading-relaxed text-[#e7dfd0]">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b9afa1]">
                <span>Nottia</span>
                <span>Para pensar despacio</span>
              </div>
            </section>
          </Reveal>
        </div>

        <Reveal delay={80} className="h-full">
          <div className="note-paper mx-auto h-full w-full max-w-md rounded-[4px] border border-paper-line p-6 shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] sm:p-9">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
                Acceso
              </span>
              <span>N.º 01</span>
            </div>

            {children}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
