import { Link } from 'react-router-dom'

import { PlusIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/config/routes'
import type { CoverDesign } from '@/stores/notebookCoverStore'

import { NotebookCover } from '../components/NotebookCover'

interface ExampleNotebook {
  title: string
  order: number
  author: string
  design: CoverDesign
}

const AUTHOR = 'Richard Collao'

/** Portadas de ejemplo mientras el listado se conecta a los datos reales. */
const EXAMPLE_NOTEBOOKS: ExampleNotebook[] = [
  {
    title: 'A contraluz',
    order: 1,
    author: AUTHOR,
    design: { template: 'nocturno', color: '#5b8def', accent: '#f0b64a', image: null },
  },
  {
    title: 'Diario de viaje',
    order: 2,
    author: AUTHOR,
    design: { template: 'papel', color: '#4caf82', accent: '#b4552d', image: null },
  },
  {
    title: 'Cuaderno de ideas',
    order: 3,
    author: AUTHOR,
    design: { template: 'solar', color: '#e8b04b', accent: '#d3442e', image: null },
  },
  {
    title: 'Notas de campo',
    order: 4,
    author: AUTHOR,
    design: { template: 'lavanda', color: '#9a86c8', accent: '#6b4de6', image: null },
  },
  {
    title: 'Cartas al futuro',
    order: 5,
    author: AUTHOR,
    design: { template: 'minimal', color: '#3f9e8f', accent: '#22201c', image: null },
  },
  {
    title: 'Agenda de otoño',
    order: 6,
    author: AUTHOR,
    design: { template: 'solar', color: '#d97757', accent: '#f3d6a0', image: null },
  },
]

/**
 * Colección de cuadernos. Por ahora es una vista estática: varias tapas de
 * ejemplo, sin títulos ni metadatos debajo, y el acceso para crear una nueva.
 */
export function NotebooksPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Tu colección
            </p>
            <h1
              className="mt-3 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Mis cuadernos
            </h1>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-muted lg:pb-2 lg:text-right">
            Las tapas de tus cuadernos, reunidas en un solo lugar.
          </p>
        </div>

        <div className="mt-8 border-t border-line" />
      </Reveal>

      <Reveal className="mt-8" delay={80}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {EXAMPLE_NOTEBOOKS.length} cuadernos
          </p>

          <Link
            to={ROUTES.notebookNew}
            className={buttonClass('primary', 'group shrink-0 whitespace-nowrap')}
          >
            <PlusIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            Crear cuaderno
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {EXAMPLE_NOTEBOOKS.map((notebook) => (
            <li key={notebook.order} className="min-w-0">
              <figure className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-l-[3px] rounded-r-xl shadow-[0_24px_48px_-26px_rgba(24,18,40,0.5)] transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_36px_64px_-30px_rgba(24,18,40,0.55)]">
                  <NotebookCover
                    title={notebook.title}
                    order={notebook.order}
                    author={notebook.author}
                    design={notebook.design}
                  />

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-black/25 to-transparent"
                  />
                </div>

                <figcaption className="sr-only">
                  {notebook.title}, cuaderno de {notebook.author}.
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
