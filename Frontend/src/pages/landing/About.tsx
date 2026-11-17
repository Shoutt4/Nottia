import { ArrowRightIcon, PaperclipIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'

import { values } from './data'

const STATS = [
  { value: '05', label: 'formas de ordenar' },
  { value: '01', label: 'lugar para todo' },
  { value: '100%', label: 'tuyo' },
]

export function About() {
  return (
    <section id="nosotros" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-lg lg:mx-0">
            <div
              aria-hidden
              className="absolute inset-0 -rotate-2 rounded-[4px] border border-paper-line bg-desk/70 shadow-[0_18px_40px_-30px_rgba(35,28,20,0.6)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 rotate-1 rounded-[4px] border border-paper-line bg-paper/60"
            />

            <article className="note-paper relative rotate-[-0.6deg] rounded-[4px] border border-paper-line p-6 shadow-[0_34px_60px_-38px_rgba(35,28,20,0.6)] sm:p-8">
              <span
                aria-hidden
                className="tape absolute -top-2.5 left-8 h-6 w-24 -rotate-3 rounded-[2px]"
              />
              <PaperclipIcon
                aria-hidden
                className="absolute -top-4 right-7 h-8 w-8 rotate-12 text-paper-muted/60"
              />
              <span
                aria-hidden
                className="stamp absolute right-5 top-5 hidden rotate-[7deg] px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-paper-accent sm:block"
              >
                Desde 2026
              </span>

              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-accent">
                Sobre nosotros
              </p>
              <h2 className="mt-3 max-w-md text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-paper-ink sm:text-4xl">
                Nottia nació de una libreta llena de cosas importantes.
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-paper-muted">
                <p>
                  De esas que se pierden entre pestañas, mensajes y notas del móvil. Queríamos un
                  lugar que se sintiera como papel, pero que estuviera siempre contigo.
                </p>
                <p>
                  No somos una herramienta para hacer más. Somos una herramienta para hacer lo que
                  importa, con menos ruido.
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between gap-4 border-t border-paper-line pt-4">
                <p className="font-serif text-sm italic text-paper-ink/75">— El equipo de Nottia</p>
                <span aria-hidden className="font-serif text-3xl leading-none text-paper-accent/30">
                  N
                </span>
              </div>
            </article>
          </div>
        </Reveal>

        <div>
          <Reveal delay={100}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-accent">
              Lo que nos mueve
            </p>
            <h3 className="mt-3 max-w-md text-balance font-serif text-2xl font-semibold leading-tight tracking-[-0.02em] text-paper-ink sm:text-3xl">
              Un lugar tranquilo para pensar.
            </h3>
          </Reveal>

          <div className="mt-8 divide-y divide-paper-line border-y border-paper-line">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={150 + index * 80}>
                <div className="group flex gap-4 py-4">
                  <span className="mt-1 font-mono text-[9px] tracking-[0.16em] text-paper-accent/70">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-paper-ink">{value.title}</h4>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-paper-muted">
                      {value.description}
                    </p>
                  </div>
                  <ArrowRightIcon
                    aria-hidden
                    className="ml-auto mt-2 h-4 w-4 shrink-0 text-paper-muted/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper-accent"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420}>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[3px] border border-paper-line bg-paper/65 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                >
                  <p className="font-serif text-xl font-semibold text-paper-ink">{stat.value}</p>
                  <p className="mt-1 font-mono text-[7px] uppercase leading-snug tracking-[0.14em] text-paper-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={480}>
            <a href="#como-funciona" className={buttonClass('secondary', 'mt-6 inline-flex')}>
              Ver cómo funciona
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
