import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface AdminUsersPaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  disabled?: boolean
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
  'grid h-9 min-w-9 place-items-center rounded-full font-mono text-[11px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-accent disabled:cursor-not-allowed disabled:opacity-40'

/** Paginación editorial del directorio de usuarios. */
export function AdminUsersPagination({
  page,
  totalPages,
  onChange,
  disabled = false,
}: AdminUsersPaginationProps) {
  if (totalPages <= 1) return null

  const items = getPageItems(page, totalPages)

  return (
    <nav aria-label="Paginación de usuarios" className="mt-8 border-t border-paper-line pt-5">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted">
          Página {page + 1} de {totalPages}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
          <button
            type="button"
            aria-label="Página anterior"
            disabled={disabled || page === 0}
            onClick={() => onChange(page - 1)}
            className={cn(
              BUTTON,
              'border border-paper-line text-paper-muted hover:border-paper-accent hover:text-paper-accent',
            )}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {items.map((item) => {
            if (typeof item !== 'number') {
              return (
                <span
                  key={item}
                  aria-hidden
                  className="px-1 font-mono text-[11px] text-paper-muted"
                >
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
                    ? 'bg-paper-accent text-paper shadow-[0_10px_24px_-14px_var(--color-paper-accent)]'
                    : 'text-paper-muted hover:bg-paper hover:text-paper-ink',
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
              'border border-paper-line text-paper-muted hover:border-paper-accent hover:text-paper-accent',
            )}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
