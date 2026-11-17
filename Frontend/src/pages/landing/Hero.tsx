import { Link } from 'react-router-dom'

import { PaperclipIcon, PinIcon } from '@/components/ui/icons'
import { buttonClass } from '@/components/ui/buttonStyles'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'

const OUTLINE_LINK =
  'inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-[#f7f2e8] transition duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent sm:w-auto'

const STATS = [
  { value: '05', label: 'formas de ordenar' },
  { value: '01', label: 'cuaderno' },
  { value: '00', label: 'ruido de más' },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#241d38] text-[#f7f2e8]">
      {/* Lomo, anillos y textura de mesa. */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-black/30 sm:w-4" />
      <div aria-hidden className="absolute inset-y-0 left-3 w-px bg-white/10 sm:left-4" />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-4 flex-col justify-around sm:flex"
      >
        {['a', 'b', 'c', 'd', 'e'].map((ring) => (
          <span
            key={ring}
            className="mx-auto h-3 w-3 rounded-full border border-white/15 bg-[#1b1528] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          />
        ))}
      </div>
      <div
        aria-hidden
        className="desk-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute -right-20 top-24 h-[24rem] w-[24rem] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden
        className="absolute -right-14 top-40 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#c98a2b]/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-6 select-none font-serif text-[22rem] leading-none text-white/[0.03]"
      >
        N
      </span>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-28 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:pb-36 lg:pt-24">
        <div>
          <Reveal>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8c9a8]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#e8c9a8]" />
              Nottia · tu cuaderno digital
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-[#fbf7ee] sm:text-5xl md:text-6xl">
              Si está escrito en una nota,{' '}
              <span className="italic text-[#e8c9a8]">debe de ser importante</span>
              <span aria-hidden className="ml-1 inline-block h-5 w-px animate-blink bg-[#e8c9a8] align-middle motion-reduce:animate-none" />
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#cfc6b8] sm:text-lg">
              Notas, listas, calendario, mapas y tableros en un mismo lugar. Un sistema tranquilo
              para que tu cabeza deje de hacer de archivador.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                to={ROUTES.register}
                className={buttonClass('primary', 'w-full px-7 py-3 sm:w-auto')}
              >
                Crear cuenta gratis
              </Link>
              <Link to={ROUTES.login} className={OUTLINE_LINK}>
                Iniciar sesión
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 grid max-w-lg grid-cols-3 gap-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/[0.045] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <p className="font-serif text-2xl font-semibold text-[#fbf7ee]">{stat.value}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase leading-snug tracking-[0.14em] text-[#9d9385]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={390}>
            <p className="mt-7 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#9d9385]">
              <span aria-hidden className="h-px w-8 bg-[#e8c9a8]/70" />
              Sin tarjeta · Sin compromiso · Con calma
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="relative mx-auto w-full max-w-[29rem]">
            <div aria-hidden className="absolute -inset-8 rounded-[2rem] bg-black/30 blur-3xl" />

            <div
              aria-hidden
              className="absolute -left-7 top-12 hidden w-28 rotate-[-8deg] sm:block"
            >
              <div
                className="animate-float rounded-sm border border-[#d9cfbd] bg-[#f5eddc] p-3 shadow-[0_18px_30px_-18px_rgba(0,0,0,0.6)] motion-reduce:animate-none"
                style={{ animationDelay: '1.2s' }}
              >
                <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#8a7f70]">
                  Recordar
                </span>
                <p className="mt-1 font-serif text-[13px] font-semibold leading-tight text-[#2a241d]">
                  Comprar pan
                  <br />y calma.
                </p>
                <span aria-hidden className="mt-2 block h-px w-8 bg-[#b45a39]/50" />
              </div>
            </div>

            <div
              aria-hidden
              className="absolute -right-7 bottom-10 hidden w-32 rotate-[6deg] sm:block"
            >
              <div
                className="animate-float rounded-sm border border-[#c9d8cd] bg-[#e9f0e8] p-3 shadow-[0_18px_30px_-18px_rgba(0,0,0,0.6)] motion-reduce:animate-none"
                style={{ animationDelay: '2.4s' }}
              >
                <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#63836f]">
                  Compartida
                </span>
                <p className="mt-1 font-serif text-[13px] font-semibold leading-tight text-[#2a241d]">
                  Lista de la semana
                </p>
                <span aria-hidden className="mt-2 block h-1 w-12 rounded-full bg-[#3f7d65]/30" />
              </div>
            </div>

            <div aria-hidden className="relative animate-sway motion-reduce:animate-none">
              <span
                aria-hidden
                className="tape absolute -top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 rotate-[-3deg] rounded-[2px]"
              />
              <span
                aria-hidden
                className="absolute -right-2 -top-3 z-20 grid h-9 w-9 rotate-12 place-items-center rounded-full border border-[#e8c9a8]/40 bg-[#3b3152] text-[#e8c9a8] shadow-lg"
              >
                <PinIcon className="h-4 w-4" />
              </span>
              <PaperclipIcon
                aria-hidden
                className="absolute -right-3 top-12 z-20 h-9 w-9 rotate-12 text-[#cfc6b8]/70"
              />

              <article className="relative rotate-[1.5deg] rounded-[3px] border border-[#d9cfbd] bg-[#fbf7ee] p-5 text-[#2a241d] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] sm:p-6">
                <div className="flex items-center justify-between border-b border-[#e1d7c7] pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8a7f70]">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#b45a39]" />
                    Hoy · 09:41
                  </span>
                  <span>N.º 01</span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8a7f70]">
                      Recordar
                    </p>
                    <h2 className="mt-2 max-w-[15rem] text-balance font-serif text-2xl font-semibold leading-tight text-[#241f1a] sm:text-[1.7rem]">
                      Las ideas pequeñas también merecen un lugar.
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#d9cfbd] bg-[#f3ecdf] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.14em] text-[#8a7f70]">
                    Fijada
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#4a4137]">
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b45a39]" />
                    Apuntar lo que no quiero olvidar.
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b45a39]" />
                    Ordenar las listas de la semana.
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b45a39]" />
                    Guardar una idea antes de que se escape.
                  </li>
                </ul>

                <div className="mt-5 flex items-center gap-2 border-t border-[#e1d7c7] pt-3">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((day) => (
                    <span
                      key={day}
                      className="rounded-sm border border-[#e1d7c7] bg-[#f3ecdf] px-1.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-[#6b6156]"
                    >
                      {day}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.14em] text-[#8a7f70]">
                    Semana 47
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#e1d7c7] pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8a7f70]">
                  <span>Nottia</span>
                  <span>Para pensar despacio</span>
                </div>
              </article>
            </div>

            <div
              aria-hidden
              className="absolute -bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#2f2746] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#cfc6b8] shadow-xl sm:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#6fd0c2]" />
              Todo en un mismo cuaderno
            </div>
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent"
      />
    </section>
  )
}
