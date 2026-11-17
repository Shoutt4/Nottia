import { Link } from 'react-router-dom'

import { PaperclipIcon, PinIcon } from '@/components/ui/icons'
import { buttonClass } from '@/components/ui/buttonStyles'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'

export function CallToAction() {
  return (
    <section id="empezar" className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 rotate-[1.2deg] rounded-[4px] border border-paper-line bg-desk/65 shadow-[0_20px_40px_-30px_rgba(35,28,20,0.6)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -rotate-[0.8deg] rounded-[4px] border border-paper-line bg-paper/55"
        />

        <Reveal>
          <div className="note-paper relative rounded-[4px] border border-paper-line px-6 py-12 text-center shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] sm:px-12 sm:py-16">
            <span
              aria-hidden
              className="tape absolute -top-2 left-1/2 h-6 w-32 -translate-x-1/2 -rotate-2 rounded-[2px]"
            />
            <PaperclipIcon
              aria-hidden
              className="absolute -top-4 right-8 h-8 w-8 rotate-12 text-paper-muted/55"
            />
            <span
              aria-hidden
              className="stamp absolute left-7 top-6 hidden rotate-[-8deg] animate-stamp px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-paper-accent motion-reduce:animate-none sm:block"
            >
              Gratis
            </span>
            <span
              aria-hidden
              className="absolute -bottom-3 right-8 grid h-9 w-9 rotate-12 place-items-center rounded-full border border-paper-line bg-desk/85 text-paper-accent shadow-md"
            >
              <PinIcon className="h-4 w-4" />
            </span>

            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-paper-accent/60" />

            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-accent">
              Empieza hoy
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-balance font-serif text-3xl font-semibold tracking-[-0.02em] text-paper-ink sm:text-4xl">
              Empieza a escribir lo que importa.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-paper-muted">
              Crea tu cuenta gratis y ten tus notas, listas y recordatorios siempre sincronizados.
              Sin tarjeta, sin compromiso, con calma.
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

            <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.18em] text-paper-muted/80">
              Tu cuaderno · tus reglas · tu ritmo
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
