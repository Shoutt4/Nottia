import { Link } from 'react-router-dom'

import { ArrowRightIcon, PaperclipIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { SectionHeading } from './SectionHeading'
import { steps } from './data'

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Cómo funciona"
            title="De la cabeza al papel en tres pasos."
            description="Nottia no te pide aprender un sistema nuevo. Te pide una idea y te devuelve un lugar donde encontrarla."
          />
          <div className="hidden shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted sm:flex">
            <span aria-hidden className="h-px w-8 bg-paper-accent/60" />
            Menos de un minuto
          </div>
        </div>
      </Reveal>

      <div className="relative mt-12">
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-16 hidden border-t border-dashed border-paper-accent/35 lg:block"
        />
        <div
          aria-hidden
          className="absolute left-[16%] top-[3.65rem] hidden h-2 w-2 -translate-x-1/2 rotate-45 border-r border-t border-paper-accent/40 bg-desk lg:block"
        />
        <div
          aria-hidden
          className="absolute right-[16%] top-[3.65rem] hidden h-2 w-2 translate-x-1/2 rotate-45 border-r border-t border-paper-accent/40 bg-desk lg:block"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const { Icon } = step

            return (
              <Reveal key={step.id} delay={index * 110} className="h-full">
                <article className="group relative flex h-full flex-col rounded-[4px] border border-paper-line bg-paper/85 p-6 shadow-[0_22px_45px_-34px_rgba(35,28,20,0.55)] transition duration-300 hover:-translate-y-1 hover:border-paper-accent/35 hover:shadow-[0_30px_55px_-36px_rgba(35,28,20,0.6)]">
                  <span
                    aria-hidden
                    className="tape absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-2deg] rounded-[2px]"
                  />
                  <PaperclipIcon
                    aria-hidden
                    className="absolute -top-3 right-5 h-7 w-7 rotate-12 text-paper-muted/60 transition-transform duration-300 group-hover:-rotate-6"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-paper-line bg-desk/70 text-paper-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden
                      className="stamp grid h-11 w-11 rotate-[-4deg] place-items-center rounded-full font-mono text-[11px] font-semibold tracking-[0.08em] text-paper-accent"
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-xl font-semibold text-paper-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-muted">{step.description}</p>

                  <div className="mt-auto flex items-center gap-2 border-t border-dashed border-paper-line pt-4">
                    <span aria-hidden className="h-1 w-1 rotate-45 bg-paper-accent/70" />
                    <p className="font-serif text-sm italic text-paper-ink/75">{step.note}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Reveal delay={160}>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-paper-line pt-6 sm:flex-row">
          <p className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted sm:text-left">
            Sin configuración eterna. Sin manual de 40 páginas.
          </p>
          <Link
            to={ROUTES.register}
            className={cn(
              buttonClass('secondary', 'border-paper-line bg-paper/70 text-paper-ink'),
              'group',
            )}
          >
            Crear mi cuaderno
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
