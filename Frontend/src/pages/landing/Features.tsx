import { Link } from 'react-router-dom'

import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { features } from './data'
import type { Feature } from './data'

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { title, description, action, Icon, iconClass, tintClass } = feature

  return (
    <article className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-[4px] border border-paper-line bg-desk/45 p-5 text-left shadow-[0_10px_24px_-22px_rgba(35,28,20,0.55)] transition duration-300 hover:-translate-y-1 hover:rotate-[-0.4deg] hover:border-paper-accent/40 hover:bg-desk/70 hover:shadow-[0_18px_34px_-24px_rgba(35,28,20,0.65)]">
      <span
        aria-hidden
        className="absolute right-0 top-0 h-7 w-7 border-b border-l border-paper-line bg-paper/80 [clip-path:polygon(100%_0,100%_100%,0_0)] transition-colors group-hover:border-paper-accent/30 group-hover:bg-paper-accent/10"
      />
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-muted/70">
        Capítulo {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className={cn(
          'grid h-11 w-11 place-items-center rounded-full border border-paper-line shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]',
          tintClass,
        )}
      >
        <Icon className={cn('h-5 w-5', iconClass)} />
      </span>

      <h3 className="font-serif text-lg font-semibold text-paper-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-paper-muted">{description}</p>

      <Link
        to={ROUTES.register}
        className="mt-auto inline-flex items-center gap-1 pt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-accent transition-colors hover:text-paper-ink"
      >
        {action}
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  )
}

export function Features() {
  return (
    <section id="funciones" className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
      <div className="note-paper relative rounded-[4px] border border-paper-line px-5 py-8 shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] sm:px-10 sm:py-12">
        <span
          aria-hidden
          className="tape absolute -top-2.5 left-8 h-6 w-28 -rotate-3 rounded-[2px] sm:left-12"
        />
        <span
          aria-hidden
          className="stamp absolute -right-3 -top-4 hidden rotate-[-8deg] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-paper-accent sm:block"
        >
          05 formas
        </span>

        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
              El cuaderno
            </span>
            <span>Capítulos 01—05</span>
          </div>

          <div className="mt-7 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-accent">
              Funciones
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink sm:text-4xl">
              Todo lo que puedes hacer.
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-paper-muted">
              Cinco formas de ordenar lo que importa, todas en el mismo cuaderno. Sin cambiar de
              aplicación para cada idea.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, index) => (
            <Reveal
              key={feature.id}
              delay={index * 70}
              className={cn('h-full', index < 2 ? 'lg:col-span-3' : 'lg:col-span-2')}
            >
              <FeatureCard feature={feature} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 border-t border-paper-line pt-6">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
                Privado
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#3f7d65]" />
                Compartido
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#4a6f9f]" />
                Sincronizado
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-center text-pretty text-sm leading-relaxed text-paper-muted">
              Tus notas, tus reglas: privadas, compartidas o públicas. Crea blocs y listas con
              recordatorios, colores, etiquetas y contraseñas, y organízalas en el calendario, el
              mapa o el kanban.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
