import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/config/routes'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

import { features } from './data'
import type { Feature } from './data'

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, description, action, Icon, iconClass, tintClass } = feature

  return (
    <article className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-line bg-surface px-6 py-9 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_var(--color-accent)]">
      <span className={cn('grid h-14 w-14 place-items-center rounded-2xl', tintClass)}>
        <Icon className={cn('h-7 w-7', iconClass)} />
      </span>

      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-muted">{description}</p>

      <Link
        to={ROUTES.register}
        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        {action}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -bottom-16 h-16 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
    </article>
  )
}

export function Features() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 pb-20">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
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
        <p className="mx-auto mt-16 max-w-2xl text-center text-pretty leading-relaxed text-muted">
          Tus notas, tus reglas: privadas, compartidas en tiempo real o públicas. Crea blocs de
          notas y listas interactivas con recordatorios, colores, etiquetas y contraseñas.
          Organízalas en el Calendario, el Mapa o el Kanban, y disfruta de ver cómo todo encaja.
        </p>
      </Reveal>
    </section>
  )
}
