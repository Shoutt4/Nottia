import { Link } from 'react-router-dom'

import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'

import { features } from './data'
import type { Feature } from './data'

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, description, action, Icon, iconClass, tintClass } = feature

  return (
    <article className="group relative flex h-full flex-col items-start gap-3 rounded-[4px] border border-paper-line bg-desk/40 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-paper-accent/40 hover:bg-desk/60">
      <span
        className={cn(
          'grid h-11 w-11 place-items-center rounded-full border border-paper-line',
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
    <section className="mx-auto -mt-10 w-full max-w-6xl px-4 sm:-mt-16 sm:px-6">
      <div className="note-paper rounded-[4px] border border-paper-line px-5 py-8 shadow-[0_30px_70px_-42px_rgba(35,28,20,0.55)] sm:px-10 sm:py-12">
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-paper-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper-accent" />
              El cuaderno
            </span>
            <span>Capítulos 01—05</span>
          </div>

          <div className="mt-7 max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-[-0.02em] text-paper-ink sm:text-4xl">
              Todo lo que puedes hacer.
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-paper-muted">
              Cinco formas de ordenar lo que importa, todas en el mismo cuaderno.
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
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-2xl border-t border-paper-line pt-6 text-center text-pretty text-sm leading-relaxed text-paper-muted">
            Tus notas, tus reglas: privadas, compartidas en tiempo real o públicas. Crea blocs de
            notas y listas interactivas con recordatorios, colores, etiquetas y contraseñas.
            Organízalas en el Calendario, el Mapa o el Kanban, y disfruta de ver cómo todo encaja.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
