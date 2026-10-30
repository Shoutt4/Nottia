import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface NotebooksPaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  disabled?: boolean
  /** Etiqueta accesible del paginador. */
  label?: string
}

type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

/** Números visibles: primeras/últimas páginas y un tramo alrededor de la actual. */
function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index)
  }

  const items: PageItem[] = [0]
  const first = Math.max(1, page - 1)
  const last = Math.min(totalPages - 2, page + 1)

  if (first > 1) items.push('start-ellipsis')

  for (let index = first; index <= last; index += 1) {
    items.push(index)
  }

  if (last < totalPages - 2) items.push('end-ellipsis')
  items.push(totalPages - 1)

  return items
}

const BUTTON =
  'grid h-9 min-w-9 place-items-center rounded-full font-mono text-[11px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40'

/** Paginación editorial para listados paginados. */
export function NotebooksPagination({
  page,
  totalPages,
  onChange,
  disabled = false,
  label = 'Paginación de cuadernos',
}: NotebooksPaginationProps) {
  if (totalPages <= 1) return null

  const items = getPageItems(page, totalPages)

  return (
    <nav aria-label={label} className="mt-12 border-t border-line pt-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Página {page + 1} de {totalPages}
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Página anterior"
            disabled={disabled || page === 0}
            onClick={() => onChange(page - 1)}
            className={cn(
              BUTTON,
              'border border-line text-muted hover:border-accent hover:text-accent',
            )}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {items.map((item) => {
            if (typeof item !== 'number') {
              return (
                <span key={item} aria-hidden className="px-1 font-mono text-[11px] text-muted">
                  …
                </span>
              )
            }

            const active = item === page

            return (
              <button
                key={item}
                type="button"
                disabled={disabled}
                onClick={() => onChange(item)}
                aria-label={`Página ${item + 1}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  BUTTON,
                  active
                    ? 'bg-accent text-on-accent shadow-[0_10px_24px_-14px_var(--color-accent)]'
                    : 'text-muted hover:bg-surface hover:text-ink',
                )}
              >
                {item + 1}
              </button>
            )
          })}

          <button
            type="button"
            aria-label="Página siguiente"
            disabled={disabled || page >= totalPages - 1}
            onClick={() => onChange(page + 1)}
            className={cn(
              BUTTON,
              'border border-line text-muted hover:border-accent hover:text-accent',
            )}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
