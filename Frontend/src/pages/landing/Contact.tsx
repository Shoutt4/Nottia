import { useState } from 'react'

import { ArrowRightIcon, MailIcon, SparkleIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'

import { SectionHeading } from './SectionHeading'
import { contactReasons } from './data'

const EMAIL = 'hola@nottia.app'

function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = mailto('Hola Nottia')
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden bg-[#241d38] text-[#f7f2e8]">
      <div
        aria-hidden
        className="desk-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#c98a2b]/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Contacto"
              title="¿Tienes una idea, una duda o una nota que no te cabe?"
              description="Escríbenos. No hay formularios eternos ni respuestas automáticas: hay una persona al otro lado, con una libreta y café."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={mailto('Hola Nottia')}
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-[#fbf7ee] transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
              >
                <MailIcon className="h-4 w-4 text-[#e8c9a8]" />
                {EMAIL}
                <ArrowRightIcon className="h-4 w-4 text-[#9d9385] transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={buttonClass('ghost', 'border border-white/10 text-[#cfc6b8] hover:text-white')}
              >
                {copied ? 'Copiado' : 'Copiar correo'}
              </button>
            </div>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-8 flex max-w-md items-start gap-3 border-t border-white/10 pt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-[#9d9385]">
              <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#e8c9a8]" />
              <p>
                Respondemos en 1–2 días.
                <br />
                Si es urgente, dilo en el asunto.
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#9d9385]">
              <span aria-hidden className="h-px w-8 bg-[#e8c9a8]/70" />
              Hecho para personas, no para métricas
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="relative mx-auto w-full max-w-xl">
            <span
              aria-hidden
              className="tape absolute -top-2.5 left-8 h-6 w-28 -rotate-3 rounded-[2px]"
            />
            <div className="note-paper relative rotate-[0.8deg] rounded-[4px] border border-[#d9cfbd] bg-[#fbf7ee] p-5 text-[#2a241d] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#e1d7c7] pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8a7f70]">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#b45a39]" />
                  Bandeja de entrada
                </span>
                <span>N.º 01</span>
              </div>

              <p className="mt-4 font-serif text-xl font-semibold leading-tight text-[#241f1a]">
                Elige un motivo y te llevamos al correo.
              </p>

              <div className="mt-4 space-y-2">
                {contactReasons.map((reason) => {
                  const { Icon } = reason

                  return (
                    <a
                      key={reason.id}
                      href={mailto(reason.subject)}
                      className="group flex items-start gap-3 rounded-[3px] border border-[#e1d7c7] bg-[#f8f2e7]/70 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#b45a39]/40 hover:bg-[#f3ecdf]"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#e1d7c7] bg-[#fbf7ee] text-[#b45a39]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 font-serif text-sm font-semibold text-[#241f1a]">
                          {reason.title}
                          <ArrowRightIcon className="h-3.5 w-3.5 text-[#8a7f70] transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-[#6b6156]">
                          {reason.description}
                        </span>
                      </span>
                    </a>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#e1d7c7] pt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8a7f70]">
                <span>Sin prisa</span>
                <span>Con intención</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
