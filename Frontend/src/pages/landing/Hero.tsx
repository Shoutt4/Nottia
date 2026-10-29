import { Link } from 'react-router-dom'

import { buttonClass } from '@/components/ui/buttonStyles'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'

const OUTLINE_LINK =
  'inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-[#f7f2e8] transition duration-200 hover:border-white/35 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent sm:w-auto'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#241d38] text-[#f7f2e8]">
      {/* La portada del cuaderno: lomo, anillos y una nota de papel. */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-black/30 sm:w-4" />
      <div aria-hidden className="absolute inset-y-0 left-3 w-px bg-white/10 sm:left-4" />
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
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-6 select-none font-serif text-[22rem] leading-none text-white/[0.03]"
      >
        N
      </span>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-28 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-36 lg:pt-24">
        <div>
          <Reveal>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-accent">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
              Nottia · organiza lo que importa
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-[#fbf7ee] sm:text-5xl md:text-6xl">
              Si está escrito en una nota,{' '}
              <span className="italic text-paper-accent">debe de ser importante</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#cfc6b8] sm:text-lg">
              Organiza tu vida de múltiples maneras y accede a todo aquello que quieres recordar
              desde un único lugar.
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
            <p className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#9d9385]">
              <span aria-hidden className="h-px w-8 bg-paper-accent/70" />
              Notas · Listas · Recordatorios
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-[22rem]">
            <div aria-hidden className="absolute -inset-6 rounded-[10px] bg-black/25 blur-2xl" />

            <div
              aria-hidden
              className="absolute -right-3 -top-4 rotate-[-4deg] rounded-[3px] border border-[#d9cfbd] bg-[#f3ecdf] px-4 py-3 shadow-lg"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#8a7f70]">
                Cuaderno N.º 01
              </span>
            </div>

            <article className="relative rotate-[1.5deg] rounded-[3px] border border-[#d9cfbd] bg-[#fbf7ee] p-5 text-[#2a241d] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] sm:p-6">
              <div className="flex items-center justify-between border-b border-[#e1d7c7] pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8a7f70]">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#b45a39]" />
                  Hoy · 09:41
                </span>
                <span>N.º 01</span>
              </div>

              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8a7f70]">
                Recordar
              </p>
              <h2 className="mt-2 text-balance font-serif text-2xl font-semibold leading-tight text-[#241f1a] sm:text-[1.7rem]">
                Las ideas pequeñas también merecen un lugar.
              </h2>

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

              <div className="mt-6 flex items-center justify-between border-t border-[#e1d7c7] pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8a7f70]">
                <span>Nottia</span>
                <span>Para pensar despacio</span>
              </div>
            </article>
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
