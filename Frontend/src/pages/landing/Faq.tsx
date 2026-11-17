import { PlusIcon, SparkleIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'

import { SectionHeading } from './SectionHeading'
import { faqs } from './data'

export function Faq() {
  return (
    <section id="preguntas" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Lo que suele preguntarse antes de empezar."
              description="Si te queda alguna duda, escríbenos. Leemos todo, incluso lo que llega un martes a las 23:40."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mt-8 max-w-sm rotate-[-1deg] rounded-[3px] border border-[#d9c3b6] bg-[#f4e7dd] p-5 shadow-[0_18px_34px_-26px_rgba(35,28,20,0.6)]">
              <span
                aria-hidden
                className="tape absolute -top-2 right-6 h-5 w-16 rotate-[3deg] rounded-[2px]"
              />
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#a85b3d]">
                <SparkleIcon className="h-3.5 w-3.5" />
                ¿No está tu pregunta?
              </p>
              <p className="mt-2 font-serif text-lg font-semibold leading-tight text-[#2a241d]">
                Escríbenos y la añadimos a la lista.
              </p>
              <a
                href="#contacto"
                className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#a85b3d] underline decoration-[#a85b3d]/40 underline-offset-4 transition-colors hover:text-[#2a241d]"
              >
                Ir a contacto
              </a>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-paper-line">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 80}>
              <details className="group border-b border-paper-line py-4">
                <summary className="flex cursor-pointer list-none items-start gap-4 rounded-[3px] px-1 py-1 text-left transition-colors hover:bg-paper/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                  <span className="mt-1 font-mono text-[9px] tracking-[0.14em] text-paper-accent/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-serif text-lg font-semibold leading-snug text-paper-ink">
                    {faq.question}
                  </span>
                  <span className="faq-plus mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-paper-line bg-paper/70 text-paper-accent transition-transform duration-300 motion-reduce:transition-none">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="ml-8 mt-2 max-w-xl text-sm leading-relaxed text-paper-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
